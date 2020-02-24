#!/bin/bash
set -e

# This script is designed to run as part of the CircleCI build process. To run it locally, you must first have $GITHUB_TOKEN defined in your session, and run it from the project root.

cd $BUILD_PATH

## Import Terminus releases and command reference
echo "Generate a new Terminus commands.json file"
touch source/data/commands.json
terminus list --format=json > source/data/commands.json

echo "Ajusting output..."
sed -i 's/site_env/site>\.<env/g' source/data/commands.json
sed -i 's/drush_command/command/g' source/data/commands.json
sed -i 's/wp_command/command/g' source/data/commands.json

echo "Update Terminus releases"
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/pantheon-systems/terminus/releases > source/data/terminusReleases.json
head source/data/terminusReleases.json


## Import Localdev releases
echo "Downloading Localdev changelog..."
wget -O source/data/localdev/changelog.yml https://pantheon-localdev.s3.amazonaws.com/changelog.yml

echo "Apply markdown callout"
sed -i -e 's/|/!markdown |/g' source/data/localdev/changelog.yml

## Import Drush releases
echo "Downloading Localdev changelog..."
curl  -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/drush-ops/drush/releases -o source/data/drushReleases.json

echo "Convert local Issue and Pull references to Markdown links"
sed -i -E "s/(#)([0-9][0-9][0-9][0-9])/\[#\2\]\(https:\/\/github.com\/drush-ops\/drush\/issues\/\2)/g" source/data/drushReleases.json
echo "Convert local commit refs to links"
sed -i -E "s/\ ([a-fA-F0-9]{7})([^0-9,])/\ \[\1\]\(https:\/\/github.com\/drush-ops\/drush\/commit\/\1\)\2/g" source/data/drushReleases.json


## Import Build Tools Releases
echo "Downloading Build Tools Changelog"
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/pantheon-systems/terminus-build-tools-plugin/releases > source/data/buildToolsReleases.json
echo "Convert local Issue and Pull references to Markdown links"
sed -i -E "s/(#)([0-9]{3})/\[#\2\]\(https:\/\/github.com\/pantheon-systems\/terminus-build-tools-plugin\/issues\/\2)/g" source/data/buildToolsReleases.json


# Build the WordPress API reference JSON
.circleci/scripts/constructWPApiRef.sh
