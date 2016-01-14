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
