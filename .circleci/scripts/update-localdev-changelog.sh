#!/bin/bash
set -e

# This script pulls the LocalDev changelog from https://pantheon-localdev.s3.amazonaws.com/changelog.yml to be consumed by Gatsby

cd $BUILD_PATH

echo "Downloading Localdev changelog..."
wget -O ./source/data/localdev/changelog.yml https://pantheon-localdev.s3.amazonaws.com/changelog.yml

echo "Apply md//"
sed -i -e 's/|/!markdown |/g' source/data/localdev/changelog.yml
