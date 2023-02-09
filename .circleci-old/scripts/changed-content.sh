#! /bin/bash

# Checks to see if any of the files modified in this branch change content in the docs.

if git --no-pager diff --name-only origin/main | grep "source/"
then
  echo "Files changed in /source"
else
  echo "No files changed in /source"
fi

