#!/bin/bash
set -e

# This script pulls the Drush changelog entry from https://github.com/drush-ops/drush/releases to be consumed by Gatsby

cd $BUILD_PATH

echo "Downloading Localdev changelog..."
curl https://api.github.com/repos/drush-ops/drush/releases -o ./source/data/drush.json

echo "Convert local Issue and Pull references to Markdown links"
sed -i -E "s/(#)([0-9][0-9][0-9][0-9])/\[#\2\]\(https:\/\/github.com\/drush-ops\/drush\/issues\/\2)/g" ./source/data/drush.json
sleep 1
echo "Convert local commit refs to links"
sed -i -E "s/(body\"\:.*)([a-fA-F0-9]{7})\ /\1\[\2\]\(https:\/\/github.com\/drush-ops\/drush\/commit\/\2\)/g" ./source/data/drush.json
