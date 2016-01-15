#!/bin/bash
# Deploy to Live
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables

#=====================================================#
# Build prod env and create backup dirs on Circle     #
#=====================================================#
sculpin generate --env=prod
mkdir ../docs-backups
mkdir ../docs-backups/`date +%F-%I%p`
echo "rsync log - deploy to Live environment on `date +%F-%I%p`" > ../docs-backups/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log


#===============================================================#
# Deploy modified files to production, create log and backups   #
#===============================================================#
rsync -bv --backup-dir=docs-backups/`date +%F-%I%p` --log-file=../docs-backups/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log --human-readable --size-only --checksum --delete-after -rlvz --ipv4 --progress -e 'ssh -p 2222' output_prod/* --temp-dir=../tmp/ live.$STATIC_DOCS_UUID@appserver.live.$STATIC_DOCS_UUID.drush.in:files/
if [ "$?" -eq "0" ]
then
    echo "Success: Deployed to https://live-static-docs.pantheon.io/docs"
else
    # If rsync returns an error code the build will fail and send notifications for review
    echo "Error: Deploy failed, review rsync status"
    exit 1
fi
# Upload log and backups to Valhalla on Live
rsync -rlvz --temp-dir=../../../tmp/ --size-only --progress -e 'ssh -p 2222' ../docs-backups/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log live.$STATIC_DOCS_UUID@appserver.live.$STATIC_DOCS_UUID.drush.in:files/docs-backups/`date +%F-%I%p`
if [ "$?" -eq "0" ]
then
    echo "Success: Log file uploaded to files/docs-backups/"
else
    echo "Error: Log file failed to upload"
    exit 1
fi


#===============================================================#
# Authenticate Terminus and clear caches on panther Live env    #
#===============================================================#
~/documentation/bin/terminus auth login $PANTHEON_EMAIL --password=$PANTHEON_PASS
~/documentation/bin/terminus site clear-cache --site=static-docs --env=live


#=====================================================#
# Delete Multidev environment from static-docs site   #
#=====================================================#
# Identify existing environments for the static-docs site
~/documentation/bin/terminus site environments --site=static-docs > ./env_list.txt
echo "Existing environments:"
tail -n +2 env_list.txt | cut -f1 | tee ./filtered_env_list.txt
# Identify branches merged into master - ignore master, dev, test, and live
git remote prune origin # Delete outdated remote references
git branch -r --merged | awk -F'/' '/^ *origin/{if(!match($0, /(>|master)/) && (!match($0, /(>|dev)/)) && (!match($0, /(>|test)/)) && (!match($0, /(>|live)/))){print $2}}' | xargs > merged-branches.txt
#
readarray branch < merged-branches.txt
# Loop to read branches, reduce to 11 characters and check against environment list
while read branch; do
    # Using the first 11 characters, check against existing environments
    if grep -Fxq "${branch:0:11}" ./filtered_env_list.txt; then
        # If result is not master, dev, test, or live, delete branch and multidev
        if [ "${branch:0:11}" != "master" ] && [ "${branch:0:11}" != "foomaster" ] && [ "${branch:0:11}" != "dev" ] && [ "${branch:0:11}" != "test" ] && [ "${branch:0:11}" != "live" ]; then
            echo "Deleting the ${branch:0:11} Multidev environment and branch on Pantheon..."
            ~/documentation/bin/terminus site delete-env --site=static-docs --env=${branch:0:11} --remove-branch
        fi
    fi
done < merged-branches.txt
