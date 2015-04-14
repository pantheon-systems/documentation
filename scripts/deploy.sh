#!/bin/bash
cd ../panther
git checkout docs
git pull origin docs
rm -rf docs/
cd ../documentation
rm -rf output_prod/docs
sculpin generate --env=prod
mv output_prod/docs ~/sites/panther/
cd ../panther
git add --all
git commit
