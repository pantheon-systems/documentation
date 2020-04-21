#! /bin/bash

# This script takes as an argument a target URL to test, then checks recursively for broken (relative) links.

set -e

# Exits if no target is provided as an argument.
if [ "$0" = ""]; then
  echo "You forgot to provide a target."
  exit 1
fi

echo "Checking for broken links.."

if ./node_modules/broken-link-checker/bin/blc -q -r -e -o $0
then
  echo "No broken internal links!"
else
  exit 1
fi

