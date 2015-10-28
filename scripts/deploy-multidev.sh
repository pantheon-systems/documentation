#!/bin/bash
# Note: Clear cache on $ENV after executing this script

# Define env and site UUID
export ENV=docs-files
export SITE=72e163bd-0054-4332-8bf8-219c50b78581
# Create local directory and file to log rsync output (local path: "$HOME/sites/docs-backups")
mkdir ../docs-backups
mkdir ../docs-backups/`date +%F-%I%p`
echo "rsync log - deploy to docsfiles Multidev environment on `date +%F-%I%p`" > ../docs-backups/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log
# Build prod
rm -rf output_prod/docs
sculpin generate --env=prod
cd output_prod

### Get path for deploy from user and deploy only specified doc
read -p "What doc or directory? (e.g. docs/articles/users/index.html or docs/articles/users/): " path
[ -z "${path}" ] && path='docs'
if [ ! -e $path ]
    then
    echo "The doc '$path' does not exist. Check file path and try again."
    exit 1
else
    # rsync file path provided by user.
    rsync --temp-dir=~/tmp --log-file=../../docs-backups/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log --human-readable --size-only --checksum --delete-after -rlvz --ipv4 --progress -e 'ssh -p 2222' $path $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/$path
fi
open http://$ENV-panther.pantheon.io/$path
