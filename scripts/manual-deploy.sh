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

# Checks to ensure that we don't manually deploy to live
if [[ $ENV == "live" && $SITE_UUID == "72e163bd-0054-4332-8bf8-219c50b78581" ]]; then
  echo Deploys to the live site should only be done by an internal team member via CircleCI upon committing to master. For questions, ping @alexfornuto
else
  echo Deploying to the $ENV environment on the $SITE_NAME site...
  # remove any existing generated output files
  rm -rf output_prod
  # Update redirect script for the Multidev environment
  export avoid_redirect="window.location.hostname == '$ENV-$SITE_NAME.pantheonsite.io' ||"
  sed -i '9i\'"      ${avoid_redirect}"'\' source/_views/default.html
  sed -i '11i\'"      ${avoid_redirect}"'\' source/_views/contrib.html

  # Disable contribute button links for manual deployments to avoid confusion for contributors during peer reviews
  # If manual deploy is used, it usually follows that the changes aren't on the public github - so the normal contrib process is not in play
  sed -i '47s/href/class="btn disabled" href/g' source/_views/doc.html
  sed -i '49s/href/class="btn disabled" href/g' source/_views/doc.html
  sed -i '29s/href/class="btn disabled" href/g' source/_views/guide.html
  sed -i '31s/href/class="btn disabled" href/g' source/_views/guide.html
  sed -i '29s/href/class="btn disabled" href/g' source/_views/terminuspage.html
  sed -i '31s/href/class="btn disabled" href/g' source/_views/terminuspage.html
  sed -i '16s/href/class="btn disabled" href/g' source/_views/video.html

  # Generate Production files
  bin/sculpin generate --env=prod

  # Migrate paginated files to avoid .html within the URLs
  for file in output_prod/docs/changelog/page/*html
  do
    name="$(basename "$file" .html)"
    mkdir -p output_prod/docs/changelog/page/"$name"
    mv "$file" "output_prod/docs/changelog/page/"$name"/index.html"
  done

  # Push HTML to the multidev
  rsync --size-only --delete-after -rtlvzi --ipv4 --progress -e 'ssh -p 2222' output_prod/docs/* --temp-dir=../../tmp/ $ENV.$SITE_UUID@appserver.$ENV.$SITE_UUID.drush.in:files/docs/
  if [ "$?" -eq "0" ]
  then
      echo "Success: Deployed to http://"$ENV"-$SITE_NAME.pantheonsite.io/docs"
  else
      echo "Error: Deploy failed, review rsync status"
  fi
  # Discard redirect modifications in source/_views/default.html and source/_views/taxon.html
  git reset --hard
fi
