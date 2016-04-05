#!/bin/bash
# This construction of a branch name is is copied from deploy-multidev.
# This section does not include the error handling present in that file
# because this script would not be reach if deploy-multidev.
# exited with an error on the branch name.
export normalize_branch="$CIRCLE_BRANCH"
export normalize_branch="${normalize_branch:0:11}"
# Remove - to avoid failures
export normalize_branch="${normalize_branch//[-_]}"
~/documentation/bin/terminus site hostnames list --site=static-docs --env=$normalize_branch > ./env_hostnames.txt
tail -n +2 env_hostnames.txt | cut -f1 | tee filtered_env_hostnames.txt
export url=`head -1 filtered_env_hostnames.txt`
export url=https://$url/docs

# sitespeed expects the input file to contain full urls to s file with
# production urls is used as a source, the production domain is then replaced
# with the multdev url.
sed "s,https://pantheon.io/docs,$url,g" scripts/sitespeed-urls.txt > /tmp/sitespeed-urls-multidev.txt
sitespeed.io -u $url --no=3 --budget budget.json -b firefox -r $CIRCLE_ARTIFACTS/sitespeed --suppressDomainFolder --outputFolderName multidev --file=/tmp/sitespeed-urls-multidev.txt --skipTest=redirects,textcontent,ycdn,privateheaders,longexpirehead,expiresmod,avoidscalingimages,ycompress,frontEndTime,domContentLoadedTime
