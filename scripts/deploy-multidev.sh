#!/bin/bash
# Deploy branch to multidev on commit
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables
# Note: PRs from forks not yet supported, see: https://circleci.com/docs/fork-pr-builds

# Deploy any branch except master, dev, test, or live
if [ "$CIRCLE_BRANCH" != "master" ] && [ "$CIRCLE_BRANCH" != "dev" ] && [ "$CIRCLE_BRANCH" != "test" ] && [ "$CIRCLE_BRANCH" != "live" ]; then

    # Normalize branch name to adhere with Multidev requirements
    export normalize_branch="$CIRCLE_BRANCH"
    export valid="^[-0-9a-z]" # allows digits 0-9, lower case a-z, and -
    if [[ $normalize_branch =~ $valid ]]; then
        export normalize_branch="${normalize_branch:0:11}"
        echo "Success: "$normalize_branch" is a valid branch name."
    else
        echo "Error: Multidev cannot be created due to invalid branch name: $normalize_branch"
        exit 1
    fi

    # Authenticate Terminus
    ~/documentation/bin/terminus auth login $PANTHEON_EMAIL --password=$PANTHEON_PASS


    # Write existing environments for the static docs site to a text file
    ~/documentation/bin/terminus site environments --site=static-docs > ./env_list.txt


    # Filter env_list.txt into a single column for easier verification
    echo "Existing environments:"
    tail -n +2 env_list.txt | cut -f1 | tee ./filtered_env_list.txt


    # Check env_list.txt, create environment if one does not already exist
    if grep -Fxq "$normalize_branch" ./filtered_env_list.txt; then
        echo "Existing environment found for $normalize_branch: http://"$normalize_branch"-static-docs.pantheon.io"
        export previous_commit=($(git log --format="%H" -n 2))
        #Get comment ID and comment body from last commit comment
        export previous_commit="${previous_commit[1]}"
        curl https://api.github.com/repos/pantheon-systems/documentation/commits/"$previous_commit"/comments  > comment.json
        export last_comment_id=`cat comment.json | jq ".[0].id"`
        export existing_comment_body=`cat comment.json | jq ".[0].body"`
        #Write the existing comment into our update
        echo -n $existing_comment_body >> comment.txt
        #Identify modified files from new commit
        git diff-tree --no-commit-id --name-only -r $CIRCLE_SHA1 > modified_files.txt
        #For docs and site-wide changes
        export doc_file="^(.*\.md)"
        #Add doc link to comment for all docs changed
        while IFS= read -r doc;
        do
          if [[ $doc =~ $doc_file ]]
          then
              echo -n "-\u0020["${doc:7: -3}"](http://"$normalize_branch"-static-docs.pantheon.io/"${doc:7: -3}")\n" >> comment.txt
          else
              echo -n "-\u0020["${doc}"](https://github.com/pantheon-systems/documentation/commit/"$CIRCLE_SHA1"/"$doc")\n" >> comment.txt
          fi
        done < modified_files.txt
        export comment=`cat comment.txt`
        #Delete first comment so the PR isn't overpopulated with bot comments
        curl -u $GITHUB_USER:$GITHUB_TOKEN -X DELETE https://api.github.com/repos/pantheon-systems/documentation/comments/$last_comment_id
        #Create new comment on new commit, so when PR is open only one comment is present
        curl -d '{ "body": "'$comment'" }' -u $GITHUB_USER:$GITHUB_TOKEN -X POST https://api.github.com/repos/pantheon-systems/documentation/commits/$CIRCLE_SHA1/comments
    else
        ~/documentation/bin/terminus site create-env --site=static-docs --from-env=dev --to-env=$normalize_branch
        #Use GitHub's API to post Multidev URL in a comment on the commit
        export url="http://"$normalize_branch"-static-docs.pantheon.io/docs"

        #Identify modified files from commit
        git diff-tree --no-commit-id --name-only -r $CIRCLE_SHA1 > modified_files.txt
        #Begin GH comment
        echo -n "The\u0020following\u0020doc(s)\u0020have\u0020been\u0020deployed\u0020to\u0020the\u0020["$normalize_branch"]("$url")\u0020Multidev\u0020environment:\n" >> comment.txt
        #Only for docs, not for site-wide changes
        export doc_file="^(.*\.md)"
        #Add doc link to comment for all docs changed
        while IFS= read -r doc;
        do
          if [[ $doc =~ $doc_file ]]
          then
              echo -n "-\u0020["${doc:7: -3}"](http://"$normalize_branch"-static-docs.pantheon.io/"${doc:7: -3}")\n" >> comment.txt
          else
              echo -n "-\u0020["${doc}"](https://github.com/pantheon-systems/documentation/commit/"$CIRCLE_SHA1"/"$doc")\n" >> comment.txt
          fi
        done < modified_files.txt
        export comment=`cat comment.txt`
        curl -d '{ "body": "'$comment'" }' -u $GITHUB_USER:$GITHUB_TOKEN -X POST https://api.github.com/repos/pantheon-systems/documentation/commits/$CIRCLE_SHA1/comments

        #Create comment on GH
    fi


    # Update redirect script for the Multidev environment
    export avoid_redirect="window.location.hostname == '$normalize_branch-static-docs.pantheon.io' ||"
    sed -i '9i\'"      ${avoid_redirect}"'\' source/_views/default.html

    # Regenerate sculpin to reflect new redirect logic
    bin/sculpin generate --env=prod

    # Create log dir
    mkdir ../docs-rsync-logs
    echo "rsync log - deploy to $normalize_branch environment on `date +%F-%I%p`" > ../docs-rsync-logs/rsync-`date +%F-%I%p`.log

    # rsync output_prod/* to Valhalla
    rsync --log-file=../docs-rsync-logs/rsync-`date +%F-%I%p`.log --human-readable --size-only --checksum --delete-after -rtlvz --ipv4 --progress -e 'ssh -p 2222' output_prod/docs/* --temp-dir=../../tmp/ $normalize_branch.$STATIC_DOCS_UUID@appserver.$normalize_branch.$STATIC_DOCS_UUID.drush.in:files/docs/
    if [ "$?" -eq "0" ]
    then
        echo "Success: Deployed to http://"$normalize_branch"-static-docs.pantheon.io/docs"
    else
        echo "Error: Deploy failed, review rsync status"
        exit 1
    fi
    # Upload log file to Valhalla
    rsync -vz --progress --temp-dir=../../../tmp/ -e 'ssh -p 2222' ../docs-rsync-logs/rsync-`date +%F-%I%p`.log $normalize_branch.$STATIC_DOCS_UUID@appserver.$normalize_branch.$STATIC_DOCS_UUID.drush.in:files/docs-rsync-logs/
    if [ "$?" -eq "0" ]
    then
        echo "Success: Log file uploaded to files/docs-rsync-logs/"
    else
        echo "Error: Log file failed to upload"
        exit 1
    fi


    # Clear cache on multidev env
    ~/documentation/bin/terminus site clear-cache --site=static-docs --env=$normalize_branch
fi
