#!/bin/bash
# Manual deploys

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
  bin/sculpin generate --env=prod
  # Update redirect script for the Multidev environment
  export avoid_redirect="window.location.hostname == '$ENV-$SITE_NAME.pantheonsite.io' ||"
  sed -i '9i\'"      ${avoid_redirect}"'\' source/_views/default.html
  sed -i '9i\'"      ${avoid_redirect}"'\' source/_views/taxon.html
  #rsync docs to target env and site
  rsync --size-only --checksum --delete-after -rtlvz --ipv4 --progress -e 'ssh -p 2222' output_prod/docs/* --temp-dir=../../tmp/ $ENV.$SITE_UUID@appserver.$ENV.$SITE_UUID.drush.in:files/docs/
  if [ "$?" -eq "0" ]
  then
      echo "Success: Deployed to http://"$ENV"-$SITE_NAME.pantheonsite.io/docs"
  else
      echo "Error: Deploy failed, review rsync status"
      exit 1
  fi

fi
