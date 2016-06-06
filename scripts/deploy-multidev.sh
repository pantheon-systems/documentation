#!/bin/bash
# Deploy branch to multidev on commit
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables
# Note: PRs from forks not yet supported, see: https://circleci.com/docs/fork-pr-builds

# Deploy any branch except master, dev, test, or live
if [ "$CIRCLE_BRANCH" != "master" ] && [ "$CIRCLE_BRANCH" != "dev" ] && [ "$CIRCLE_BRANCH" != "test" ] && [ "$CIRCLE_BRANCH" != "live" ] && ! [[ $CIRCLE_BRANCH =~ (pull\/.*) ]]; then
  # Normalize branch name to adhere with Multidev requirements
  export normalize_branch="$CIRCLE_BRANCH"
  export valid="^[-0-9a-z]" # allows digits 0-9, lower case a-z, and -
  if [[ $normalize_branch =~ $valid ]]; then
    export normalize_branch="${normalize_branch:0:11}"
    #Remove - to avoid failures
    export normalize_branch="${normalize_branch//[-_]}"
    echo "Success: "$normalize_branch" is a valid branch name."
  else
    echo "Error: Multidev cannot be created due to invalid branch name: $normalize_branch"
    exit 1
  fi


  # Authenticate Terminus
  ~/documentation/bin/terminus auth login --machine-token=$PANTHEON_TOKEN


  # Write existing environments for the static docs site to a text file
  ~/documentation/bin/terminus site environments --site=static-docs > ./env_list.txt


  # Filter env_list.txt into a single column for easier verification
  echo "Existing environments:"
  tail -n +2 env_list.txt | cut -f1 | tee ./filtered_env_list.txt


  # Check env_list.txt, create environment if one does not already exist
  if grep -Fxq "$normalize_branch" ./filtered_env_list.txt; then
    echo "Existing environment found for $normalize_branch"
    # Get the environment hostname and URL
    ~/documentation/bin/terminus site hostnames list --site=static-docs --env=$normalize_branch > ./env_hostnames.txt
    tail -n +2 env_hostnames.txt | cut -f1 | tee filtered_env_hostnames.txt
    export url=https://`head -1 filtered_env_hostnames.txt`
    export hostname=`head -1 filtered_env_hostnames.txt`
    export docs_url=$url/docs
  else
    # Create multidev
    ~/documentation/bin/terminus site create-env --site=static-docs --from-env=dev --to-env=$normalize_branch

    # Get the environment hostname and identify deployment URL
    ~/documentation/bin/terminus site hostnames list --site=static-docs --env=$normalize_branch > ./env_hostnames.txt
    tail -n +2 env_hostnames.txt | cut -f1 | tee filtered_env_hostnames.txt
    export url=https://`head -1 filtered_env_hostnames.txt`
    export hostname=`head -1 filtered_env_hostnames.txt`
    export docs_url=$url/docs

  fi

  # Update redirect logic for the Multidev environment
  export avoid_redirect="window.location.hostname == '$hostname' ||"
  sed -i '9i\'"      ${avoid_redirect}"'\' source/_views/default.html
  sed -i '9i\'"      ${avoid_redirect}"'\' source/_views/taxon.html

  # Update CTA edit link so that the current branch is used
  sed -i '39s/master/'"$CIRCLE_BRANCH"'/g' source/_views/doc.html
  sed -i '42i\'"<li><a href="https://github.com/pantheon-systems/documentation/upload/$CIRCLE_BRANCH" target="blank">Upload New Images</a></li>"'\' source/_views/doc.html


  # Regenerate sculpin to reflect new redirect logic
  bin/sculpin generate --env=prod

  # rsync output_prod/* to Valhalla
  rsync --size-only --checksum --delete-after -rtlvz --ipv4 --progress -e 'ssh -p 2222' output_prod/docs/ --temp-dir=../../tmp/ $normalize_branch.$STATIC_DOCS_UUID@appserver.$normalize_branch.$STATIC_DOCS_UUID.drush.in:files/docs/
  if [ "$?" -eq "0" ]
  then
    echo "Success: Deployed to $url"
  else
    echo "Error: Deploy failed, review rsync status"
    exit 1
  fi

  #Get comment ID and comment body from last commit comment
  export previous_commit=($(git log --format="%H" -n 2))
  export previous_commit="${previous_commit[1]}"
  #Save the body of previous comment for reuse
  curl https://api.github.com/repos/pantheon-systems/documentation/commits/$previous_commit/comments?access_token=$GITHUB_TOKEN  > comment.json;
  export last_comment_id=`cat comment.json | jq ".[0].id"`
  export existing_comment_body=`cat comment.json | jq ".[0].body"`
  export null="null"
  #If previous comment doesn't exist, start a new one
  if [[ $existing_comment_body == $null ]]; then
    echo -n "The\u0020following\u0020doc(s)\u0020have\u0020been\u0020deployed\u0020to\u0020the\u0020["$normalize_branch"]("$docs_url")\u0020Multidev\u0020environment:\n" >> comment.txt
  else
    #Write the existing comment into our update
    echo -n $existing_comment_body >> comment.txt
    #Convert into valid json value
    sed  -i 's/ /\\u0020/g' comment.txt
    sed -i 's/\"//g' comment.txt
    export comment=`cat comment.txt`
    #Delete first comment so the PR isn't overpopulated with bot comments
    curl -X DELETE https://api.github.com/repos/pantheon-systems/documentation/comments/$last_comment_id?access_token=$GITHUB_TOKEN
  fi

  #Identify modified files from new commit
  git diff-tree --no-commit-id --name-only -r $CIRCLE_SHA1 > modified_files.txt
  #For docs and site-wide changes
  export doc_file="(source.*\.md)"
  #Add multidev link to comment for all md content types, otherwise link to source file of the diff
  while IFS= read -r doc;
  do
    if [[ $doc =~ $doc_file ]]
    then
      export changelog_path="^(.*_changelogs.*)(.*\.md)"
      export doc_path="^(.*_docs.*)(.*\.md)"
      if [[ $doc =~ $doc_path ]]
      then
        export guide=${doc:13: -3}
        if ls -a output_dev/docs/guides | grep "$guide"
        then
          grep -- ''"$guide"'' comment.txt || echo -n "-\u0020[docs/guides/"$guide"]("$url"/docs/guides/"$guide")\n" >> comment.txt
        else
          grep -- ''"${doc:8: -3}"'' comment.txt || echo -n "-\u0020["${doc:8: -3}"]("$url"/"${doc:8: -3}")\n" >> comment.txt
        fi
      elif [[ $doc =~ $changelog_path ]]
      then
        export changelog=docs/changelog/${doc:19: 4}/${doc:24: 2}
        grep -- ''"${changelog}"'' comment.txt || echo -n "-\u0020["$changelog"]("$url"/"$changelog")\n" >> comment.txt
      else
        grep -- ''"${doc}"'' comment.txt || echo -n "-\u0020["${doc}"](https://github.com/pantheon-systems/documentation/commit/"$CIRCLE_SHA1"/"$doc")\n" >> comment.txt
      fi
    else
      grep -- ''"${doc}"'' comment.txt || echo -n "-\u0020["${doc}"](https://github.com/pantheon-systems/documentation/commit/"$CIRCLE_SHA1"/"$doc")\n" >> comment.txt
    fi
    done < modified_files.txt

  #Create new comment on new commit, so when PR is open only one comment is present
  export comment=`cat comment.txt`
  curl -d '{ "body": "'$comment'" }' -X POST https://api.github.com/repos/pantheon-systems/documentation/commits/$CIRCLE_SHA1/comments?access_token=$GITHUB_TOKEN

  # Clear cache on multidev env
  ~/documentation/bin/terminus site clear-cache --site=static-docs --env=$normalize_branch
fi
