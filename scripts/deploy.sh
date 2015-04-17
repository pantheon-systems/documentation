#!/bin/bash
cd ../panther
git checkout docs
git pull origin docs
rm -rf docs/
cd ../documentation
rm -rf output_prod/docs
sculpin generate --env=prod
mv output_prod/docs ../panther/
cd ../panther
git add --all
git commit
git push origin docs
open https://dashboard.pantheon.io/sites/72e163bd-0054-4332-8bf8-219c50b78581#docs
