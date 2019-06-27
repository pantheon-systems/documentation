#!/bin/bash
# This construction of a branch name is is copied from deploy-multidev.
# This section does not include the error handling present in that file
# because this script would not be reach if deploy-multidev.
# exited with an error on the branch name.

# Create a slug from $CIRCLE_BRANCH_SLUG
CIRCLE_BRANCH_SLUG=$(echo "$CIRCLE_BRANCH" | iconv -t ascii//TRANSLIT | sed -r s/[^a-zA-Z0-9]+/-/g | sed -r s/^-+\|-+$//g | tr A-Z a-z)

# Test any branch except master, dev, test, or live
if [ "$CIRCLE_BRANCH_SLUG" != "master" ] && [ "$CIRCLE_BRANCH_SLUG" != "dev" ] && [ "$CIRCLE_BRANCH_SLUG" != "test" ] && [ "$CIRCLE_BRANCH_SLUG" != "live" ] && ! [[ $CIRCLE_BRANCH_SLUG =~ (pull\/.*) ]]; then
  export normalize_branch="$CIRCLE_BRANCH_SLUG"
  export normalize_branch="${normalize_branch:0:11}"
  # Remove - to avoid failures
  export normalize_branch="${normalize_branch//[-_]}"
  export normalize_branch="${normalize_branch,,}"
  export url=`~/.composer/vendor/pantheon-systems/terminus/bin/terminus env:view static-docs.$normalize_branch --print`docs
  export url=https${url:4}

  # sitespeed expects the input file to contain full urls to s file with
  # production urls is used as a source, the production domain is then replaced
  # with the multdev url.
  sed "s,https://pantheon.io/docs,$url,g" scripts/sitespeed-urls.txt > /tmp/sitespeed-urls-multidev.txt
  /documentation/node_modules/.bin/sitespeed.io $url --no=1 --budget budget.json -b firefox  --suppressDomainFolder --file=/tmp/sitespeed-urls-multidev.txt --skipTest=redirects,textcontent,ycdn,privateheaders,longexpirehead,expiresmod,avoidscalingimages,ycompress,frontEndTime,yminify,domContentLoadedTime
fi
