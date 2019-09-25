#! /bin/bash
set -e

# This script assumes you're already serving the site using --prefix-paths

# This sections excludes domains, which will come in handy when it's expanded for all links
#echo "Reading excluded links..."
#exclusions=$(sed -r 's/(.*)/--exclude \1/' scripts/exclude.txt | tr '\n' ' ')

echo "Checking for broken links.."

if ./gatsby/node_modules/broken-link-checker/bin/blc -q -r -e -o http://localhost:9000/docs
then
  echo "No broken internal links!"
else
  exit 1
fi

