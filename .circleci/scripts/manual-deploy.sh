#!/bin/bash
# Manual deploys
# This script must be run from the project root, and requires a local Gatsby setup. See https://github.com/pantheon-systems/documentation/blob/master/README.md
# User defines ENV, SITE_NAME, and SITE_UUID

echo Provide the target environment for manual deploy, then press [ENTER]:
read ENV
echo Provide the target site UUID for manual deploy, then press [ENTER]:
read SITE_UUID
echo Provide the target site name for manual deploy, then press [ENTER]:
read SITE_NAME

# Checks to ensure that we don't manually deploy to live
if [[ $ENV == "live" && $SITE_UUID == "72e163bd-0054-4332-8bf8-219c50b78581" ]]; then
  echo Deploys to the live site should only be done by an internal team member via CircleCI upon committing to master. For questions, ping @alexfornuto
else
  echo Deploying to the $ENV environment on the $SITE_NAME site...

  # Move to the Gatsby directory
  cd gatsby

  # Ask user if they want to regenerate Gatsby output
  read -p "Would you like to rebuild the Docs site? (Yy/Nn)" -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    # remove any existing generated output files
    gatsby clean

    # Generate Production files
    gatsby build --prefix-paths
  fi

  # Push HTML to the multidev
  rsync --delete-after -chrlzv --ipv4 --progress --log-file=multidev-log.txt -e 'ssh -p 2222' public/* --temp-dir=../../tmp/ $ENV.$SITE_UUID@appserver.$ENV.$SITE_UUID.drush.in:files/docs/
  if [ "$?" -eq "0" ]
  then
      echo "Success: Deployed to http://"$ENV"-$SITE_NAME.pantheonsite.io/docs"
  else
      echo "Error: Deploy failed, review rsync status"
  fi
fi
