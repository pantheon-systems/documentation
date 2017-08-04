#!/bin/bash
# This construction of a branch name is is copied from deploy-multidev.
# This section does not include the error handling present in that file
# because this script would not be reach if deploy-multidev.
# exited with an error on the branch name.

# Test any branch except master, dev, test, or live
if [ "$CIRCLE_BRANCH" != "master" ] && [ "$CIRCLE_BRANCH" != "dev" ] && [ "$CIRCLE_BRANCH" != "test" ] && [ "$CIRCLE_BRANCH" != "live" ] && ! [[ $CIRCLE_BRANCH =~ (pull\/.*) ]]; then
  export normalize_branch="$CIRCLE_BRANCH"
  export normalize_branch="${normalize_branch:0:11}"
  # Remove - to avoid failures
  export normalize_branch="${normalize_branch//[-_]}"
  export normalize_branch="${normalize_branch,,}"
  export url=`vendor/pantheon-systems/terminus/bin/terminus env:view static-docs.$normalize_branch --print`docs
  export url=https${url:4}

  # sitespeed expects the input file to contain full urls to s file with
  # production urls is used as a source, the production domain is then replaced
  # with the multdev url.
  sed "s,https://pantheon.io/docs,$url,g" scripts/sitespeed-urls.txt > /tmp/sitespeed-urls-multidev.txt
  sitespeed.io $url --no=1 --budget budget.json -b firefox -r $CIRCLE_ARTIFACTS/sitespeed --suppressDomainFolder --outputFolderName multidev --file=/tmp/sitespeed-urls-multidev.txt --skipTest=redirects,textcontent,ycdn,privateheaders,longexpirehead,expiresmod,avoidscalingimages,ycompress,frontEndTime,yminify,domContentLoadedTime
fi
