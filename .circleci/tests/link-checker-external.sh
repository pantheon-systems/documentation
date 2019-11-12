#! /bin/bash
set -e

# This script assumes you're already serving the site using --prefix-paths

# This sections excludes domains, which will come in handy when it's expanded for all links
echo "Reading excluded links..."
exclusions=$(sed -r 's/(.*)/--exclude \1/' scripts/exclude.txt | tr '\n' ' ')

echo "Checking for broken links.."

if ./gatsby/node_modules/broken-link-checker/bin/blc -q -r -o --rateLimit=1000 --host-requests=1 --user-agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36' $exclusions http://localhost:9000/docs
then
  echo "No broken internal links!"
else
  exit 1
fi

