#!/bin/bash
# Manual deploys
# This script requires running the docs site locally with Vagrant. See https://github.com/pantheon-systems/documentation/blob/master/README.md#option-1-use-vagrant-recommended
# Once you've run `vagrant up` or `vagrant provision`, run `vagrant ssh` and cd into `/vagrant/` to run the script: `bash scripts/manual-deploy.sh`
# User defines ENV and SITE_UUID

echo Provide the target environment for manual deploy, then press [ENTER]:
read ENV
echo Provide the target site UUID for manual deploy, then press [ENTER]:
read SITE_UUID
echo Provide the target site name for manual deploy, then press [ENTER]:
read SITE_NAME

if [[ $ENV == "live" && $SITE_UUID == "72e163bd-0054-4332-8bf8-219c50b78581" ]]; then
  echo Deploys to the live site should only be done by an internal team member via CircleCI upon committing to master. For questions, ping @rachelwhitton
else
  echo Deploying to the $ENV environment on the $SITE_NAME site...
  rm -rf output_prod
  # Update redirect script for the Multidev environment
  export avoid_redirect="window.location.hostname == '$ENV-$SITE_NAME.pantheonsite.io' ||"
  sed -i '9i\'"      ${avoid_redirect}"'\' source/_views/default.html
  sed -i '9i\'"      ${avoid_redirect}"'\' source/_views/taxon.html

  bin/sculpin generate --env=prod

  #rsync docs to target env and site
  mkdir docs-rsync-logs
  mkdir docs-rsync-logs/`date +%F-%I%p`
  echo "rsync log - deploy to Live environment on `date +%F-%I%p`" > ./docs-rsync-logs/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log


  rsync --log-file=./docs-rsync-logs/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log --human-readable --size-only --checksum --delete-after -rtlvz --ipv4 --progress -e 'ssh -p 2222' output_prod/docs/* --temp-dir=../../tmp/ $ENV.$SITE_UUID@appserver.$ENV.$SITE_UUID.drush.in:files/docs/
  if [ "$?" -eq "0" ]
  then
      echo "Success: Deployed to http://"$ENV"-$SITE_NAME.pantheonsite.io/docs"
  else
      echo "Error: Deploy failed, review rsync status"
  fi
  rsync -rlvz --temp-dir=../../../tmp/ --size-only --progress -e 'ssh -p 2222' ./docs-rsync-logs/`date +%F-%I%p`/rsync-`date +%F-%I%p`.log $ENV.$SITE_UUID@appserver.$ENV.$SITE_UUID.drush.in:files/docs-rsync-logs/
  if [ "$?" -eq "0" ]
  then
      echo "Success: Deployed log file to the $ENV environment: files/docs-rsync-logs"
  else
      echo "Error: Log deploy failed, review rsync status"
  fi
  # Delete the log dir made on vagrant vm
  rm -rf docs-rsync-logs
  # Discard redirect modifications in source/_views/default.html and source/_views/taxon.html
  git reset --hard
fi
