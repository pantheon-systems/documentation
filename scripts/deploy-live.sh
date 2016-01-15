#!/bin/bash
# Deploy to Live
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables

# Generate docs production files
sculpin generate --env=prod

# Create log dir
mkdir ../docs-backups
mkdir ../docs-backups/`date +%F-%I%p`
echo "rsync log - deploy to Live environment on `date +%F-%I%p`" > ../docs-backups/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log

# rsync output_prod/* to files dir on appserver
rsync -bv --backup-dir=docs-backups/`date +%F-%I%p` --log-file=../docs-backups/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log --human-readable --size-only --checksum --delete-after -rlvz --ipv4 --progress -e 'ssh -p 2222' output_prod/* --temp-dir=../tmp/ live.$PROD_UUID@appserver.live.$PROD_UUID.drush.in:files/
if [ "$?" -eq "0" ]
then
    echo "Success: Deployed to https://pantheon.io/docs"
else
    echo "Error: Deploy failed, review rsync status"
    exit 1
fi

# Send the rysnc log file to remote directory "/docs-backups/`date +%F-%I%p`/"
rsync -rlvz --temp-dir=../../../tmp/ --size-only --progress -e 'ssh -p 2222' ../docs-backups/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log live.$PROD_UUID@appserver.live.$PROD_UUID.drush.in:files/docs-backups/`date +%F-%I%p`
if [ "$?" -eq "0" ]
then
    echo "Success: Log file uploaded to files/docs-backups/"
else
    echo "Error: Log file failed to upload"
    exit 1
fi

# Authenticate Terminus
~/documentation/bin/terminus auth login $PANTHEON_EMAIL --password=$PANTHEON_PASS
# Clear cache on Live env
~/documentation/bin/terminus site clear-cache --site=panther --env=live

# Delete Multidev environment from static-docs site

    # Write existing environments for the static docs site to a text file
    ~/documentation/bin/terminus site environments --site=static-docs > ./env_list.txt
    # Filter env_list.txt into a single column for easier verification
    echo "Existing environments:"
    tail -n +2 env_list.txt | cut -f1 | tee ./filtered_env_list.txt
    # Remove outdated remote references
    git remote prune origin
    # Create list of remote branches that have been merged into master but leave out master, dev, test, and live
    git branch -r --merged | awk -F'/' '/^ *origin/{if(!match($0, /(>|master)/) && (!match($0, /(>|dev)/)) && (!match($0, /(>|test)/)) && (!match($0, /(>|live)/))){print $2}}' | xargs > merged-branches.txt
    # Loop to compare branches already merged into master with existing environments,
        # If merged branch is found to have a corresponding Multidev, both the env and branch are deleted
        readarray line < merged-branches.txt
        # Read branches that have been merged into master one at a time from merged-branches.txt
        while read line; do
            # Using the first 11 characters, check against existing environments
            if grep -Fxq "${line:0:11}" ./filtered_env_list.txt; then
                # If result is not master, dev, test, or live, delete branch and multidev
                if [ "${line:0:11}" != "master" ] && [ "${line:0:11}" != "dev" ] && [ "${line:0:11}" != "test" ] && [ "${line:0:11}" != "live" ]; then
                    echo "Deleting the ${line:0:11} Multidev environment and branch on Pantheon..."
                    ~/documentation/bin/terminus site delete-env --site=static-docs --env=${line:0:11} --remove-branch
                fi
            else
            fi
        done < merged-branches.txt
