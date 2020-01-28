#!/bin/bash
set -e

# This script pulls the Drush changelog entry from https://github.com/drush-ops/drush/releases to be consumed by Gatsby

cd $BUILD_PATH

echo "Downloading Localdev changelog..."
curl https://api.github.com/repos/drush-ops/drush/releases -o ./source/data/drush/drush-changelog.json

echo "Convert local GH references to Markdown links"
sed -i -E "s/(#)([0-9][0-9][0-9][0-9])/\[#\2\]\(https:\/\/github.com\/drush-ops\/drush\/issues\/\2)/g" ./source/data/drush/drush-changelog.json
