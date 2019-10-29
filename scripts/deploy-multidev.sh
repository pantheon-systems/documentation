#!/bin/bash
# Deploy branch to multidev on commit
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables
# Note: PRs from forks not yet supported, see: https://circleci.com/docs/fork-pr-builds

printf "Create a slug from $CIRCLE_BRANCH \n"
CIRCLE_BRANCH_SLUG=$(echo "$CIRCLE_BRANCH" | iconv -t ascii//TRANSLIT | sed -r s/[^a-zA-Z0-9]+/-/g | sed -r s/^-+\|-+$//g | tr A-Z a-z)

printf "slug created as: "
echo $CIRCLE_BRANCH_SLUG

# Deploy any branch except master, dev, test, or live
printf "Checking slug against protected names... \n"
if [ "$CIRCLE_BRANCH_SLUG" != "master" ] && [ "$CIRCLE_BRANCH_SLUG" != "dev" ] && [ "$CIRCLE_BRANCH_SLUG" != "test" ] && [ "$CIRCLE_BRANCH_SLUG" != "live" ] && ! [[ $CIRCLE_BRANCH_SLUG =~ (pull\/.*) ]]; then
  # Normalize branch name to adhere with Multidev requirements
  export normalize_branch="$CIRCLE_BRANCH_SLUG"
  export valid="^[-0-9a-z]" # allows digits 0-9, lower case a-z, and -
  if [[ $normalize_branch =~ $valid ]]; then
    export normalize_branch="${normalize_branch:0:11}"
    #Remove - to avoid failures
    export normalize_branch="${normalize_branch//[-_]}"
    export normalize_branch="${normalize_branch,,}"
    echo "Success: "$normalize_branch" is a valid branch name."
  else
    echo "Error: Multidev cannot be created due to invalid branch name: $normalize_branch"
    exit 1
  fi


  printf "Authenticate Terminus \n"
  terminus auth:login --machine-token $PANTHEON_TOKEN


  printf "Write existing environments for the static docs site to a text file \n"
  terminus env:list --format list --field=ID static-docs > ./env_list.txt

  printf "Check env_list.txt, create environment if one does not already exist \n"
  if grep -Fxq "$normalize_branch" ./env_list.txt; then
    echo "Existing environment found for $normalize_branch"
    # Get the environment hostname and URL
    export url=`terminus env:view static-docs.$normalize_branch --print`
    export url=https://${url:7: -1}
    export hostname=${url:8: -1}
    export docs_url=${url}/docs
  else
    printf "Creating multidev environment... \n"
    terminus multidev:create static-docs.dev $normalize_branch

    # Get the environment hostname and identify deployment URL
    printf "Identifying environment hostname... \n"
    export url=`terminus env:view static-docs.$normalize_branch --print`
    export url=https://${url:7: -1}
    export hostname=${url:8}
    export docs_url=${url}/docs

  fi

#  printf "Create json dump of terminus help for docs/terminus/commands \n"
#  ~/.composer/vendor/pantheon-systems/terminus/bin/terminus list --format=json > ~/build/output_prod/docs/assets/terminus/commands.json
#  curl -v -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/pantheon-systems/terminus/releases > ~/build/output_prod/docs/assets/terminus/releases.json
  # rsync output_prod/* to Valhalla

  printf "Copy docs to multidev environment.. \n"
  touch ./multidev-log.txt
  while true
  do
    if ! rsync --delete-delay -chrltz --ipv4 -e 'ssh -p 2222 -oStrictHostKeyChecking=no' gatsby/public/ --temp-dir=../../tmp/ $normalize_branch.$STATIC_DOCS_UUID@appserver.$normalize_branch.$STATIC_DOCS_UUID.drush.in:files/docs/ | tee multidev-log.txt; then
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
  terminus env:cc static-docs.$normalize_branch
fi
