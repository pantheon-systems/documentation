#!/bin/bash
# Deploy branch to multidev on commit
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables
# Note: PRs from forks not yet supported, see: https://circleci.com/docs/fork-pr-builds

# Import Functions
source $BUILD_PATH/.circleci/scripts/functions.sh

# Deploy any branch except master, dev, test, or live
protected-branches

# Authenticate with Terminus
auth-terminus

# Find existing environments.
printf "Write existing environments for the static docs site to a text file \n"
terminus env:list --format list --field=ID static-docs > ./env_list.txt

# Creating a new one if one doesn't exist for this branch.
printf "Check env_list.txt, create environment if one does not already exist \n"
if grep -Fxq "$MULTIDEV_NAME" ./env_list.txt; then
    echo "Existing environment found for $MULTIDEV_NAME"
    # Get the environment hostname and URL
    export url=`terminus env:view static-docs.$MULTIDEV_NAME --print`
    export url=https://${url:7: -1}
    export hostname=${url:8: -1}
    export docs_url=${url}/docs
else
    printf "Creating multidev environment... \n"
    terminus multidev:create static-docs.dev $MULTIDEV_NAME

    # Get the environment hostname and identify deployment URL
    printf "Identifying environment hostname... \n"
    export url=`terminus env:view static-docs.$MULTIDEV_NAME --print`
    export url=https://${url:7: -1}
    export hostname=${url:8}
    export docs_url=${url}/docs

fi

# Move to working directory.
cd $BUILD_PATH

# Export preview build to the multidev environment.
printf "Copying docs to $docs_url \n"
touch ./multidev-log.txt
while true
do
    if ! rsync --delete-delay -chrltzv --ipv4 -e 'ssh -p 2222 -oStrictHostKeyChecking=no' gatsby/public/ --temp-dir=../../tmp/ $MULTIDEV_NAME.$STATIC_DOCS_UUID@appserver.$MULTIDEV_NAME.$STATIC_DOCS_UUID.drush.in:files/docs/ | tee multidev-log.txt;
    then
        echo "Failed, retrying..."
        sleep 5
    else
        echo "Success: Deployed to $url"
        break
    fi
done


printf "\n Commenting on GitHub... \n"

#Get comment ID and comment body from last commit comment
export previous_commit=($(git log --format="%H" -n 2))
export previous_commit="${previous_commit[1]}"

#Save the body of previous comment for reuse
curl https://api.github.com/repos/pantheon-systems/documentation/commits/$previous_commit/comments?access_token=$GITHUB_TOKEN  > comment.json;
export last_comment_id=`cat comment.json | jq ".[0].id"`
export existing_comment_body=`cat comment.json | jq ".[0].body"`
export null="null"

#If previous comment doesn't exist, start a new one
if [[ $existing_comment_body == $null ]];
then
    echo -n "The\u0020following\u0020doc(s)\u0020have\u0020been\u0020deployed\u0020to\u0020the\u0020["$MULTIDEV_NAME"]("$docs_url")\u0020Multidev\u0020environment:\n" >> comment.txt
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
        export changelog_path="^(.*changelogs.*)(.*\.md)"
        export doc_path="^(.*content.*)(.*\.md)"
        if [[ $doc =~ $doc_path ]]
        then
            export guide=${doc:15: -3}
            if ls -R source/content/guides | grep '^\<'"${guide##*/}"'\>.md$'
            then
                export guide_file=${guide##*/}
                if [[ ${guide_file:0:2}  == 01 ]]
                then
                    grep -- '\<'"${guide##*/}"'\>' comment.txt || echo -n "-\u0020[/docs/"${guide%/*}"]("$url"/docs/"${guide%/*}")\n" >> comment.txt
                elif [[ ${guide_file:0:2}  =~ [0-9] ]]
                then
                    grep -- '\<'"${guide##*/}"'\>' comment.txt || echo -n "-\u0020[/docs/"${guide%/*}"/"${guide_file:3}"]("$url"/docs/"${guide%/*}"/"${guide_file:3}")\n" >> comment.txt
                else
                    grep -- '\<'"${guide##*/}"'\>' comment.txt || echo -n "-\u0020[/docs/"$guide"]("$url"/docs/"$guide")\n" >> comment.txt
                fi
        elif ls -R source/content/dns-providers | grep '^\<'"${doc:29: -3}"'\>.md$'
        then
            grep -- '\<'"${doc:29: -3}"'\>' comment.txt || echo -n "-\u0020[/docs/"${doc:29: -3}"]("$url"/docs/"${doc:29: -3}")\n" >> comment.txt
        else
            grep -- '\<'"${doc:15: -3}"'\>' comment.txt || echo -n "-\u0020[/docs/"${doc:15: -3}"]("$url"/docs/"${doc:15: -3}")\n" >> comment.txt
        fi
    elif [[ $doc =~ $changelog_path ]]
    then
        export changelog=docs/changelog/${doc:18: 4}/${doc:23: 2}
        grep -- ''"${changelog}"'' comment.txt || echo -n "-\u0020[/"$changelog"]("$url"/"$changelog")\n" >> comment.txt
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

printf "Clear cache on multidev env. \n"
terminus env:cc static-docs.$MULTIDEV_NAME
