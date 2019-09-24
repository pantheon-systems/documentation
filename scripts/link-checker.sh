#! /bin/bash
set -e

# This script assumes you're already serving the site using --prefix-paths
echo "Reading excluded links..."
exclusions=$(sed -r 's/(.*)/--exclude \1/' scripts/exclude.txt | tr '\n' ' ')

echo "Checking for broken links:"
./gatsby/node_modules/broken-link-checker/bin/blc -q -r -e -o ${exclusions} --user-agent='broken-link-checker/0.8.0 Node.js/8.9.4 (OS X; x64)' http://localhost:9000/docs

