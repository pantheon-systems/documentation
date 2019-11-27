#!/bin/bash
set -e

# This script is designed to run as part of the CircleCI build process. To run it locally, you must first have $GITHUB_TOKEN defined in your session, and run it from the project root.

cd $BUILD_PATH

echo "Generate a new Terminus commands.json file"
terminus list --format=json > source/data/commands.json

echo "Ajusting output..."
sed -i 's/site_env/site>\.<env/g' source/data/commands.json
sed -i 's/drush_command/command/g' source/data/commands.json
sed -i 's/wp_command/command/g' source/data/commands.json

echo "Update releases"
curl -v -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/pantheon-systems/terminus/releases > source/data/releases.json
