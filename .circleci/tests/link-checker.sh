#! /bin/bash
# This script takes as an argument a target URL to test, then checks recursively for broken (relative) links.
set -e

# Import Functions
source $BUILD_PATH/.circleci/scripts/functions.sh

# Exits if no target is provided as an argument.
if [ "$1" = "" ]; then
  echo "You forgot to provide a target."
  exit 1
fi

echo "Checking for broken links on ${1} .."

if try3 blc -q -r -e -o $1
then
  echo "No broken internal links!"
else
  exit 1
fi
