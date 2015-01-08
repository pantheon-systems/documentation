SITE_UUID="739913fa-0df2-4766-ac99-4ac57c819f28"
cd ..
git clone ssh://codeserver.dev.$SITE_UUID@codeserver.dev.$SITE_UUID.drush.in:2222/~/repository.git get-pantheon-v3
cd get-pantheon-v3
git checkout docs
cd ..
cd documentation
cd documentation sculpin generate --env=prod 
mv output_prod/docs ~get-pantheon-v3/
cd ../get-pantheon-v3
git add --all
git commit -m “Deploy build x.y.”
git push origin docs 
