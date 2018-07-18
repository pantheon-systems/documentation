#!/bin/bash
set -e
path=$(dirname "$0")
base=$(cd $path/.. && pwd)

cd $base/output_prod/docs
if grep -q --exclude="core-updates/index.html" --exclude="maintain-custom-upstream/index.html" "&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD" $(find . -type f); then
  echo 'Merge HEAD hash: fail' && exit 1
elif grep -q --exclude="core-updates/index.html" --exclude="maintain-custom-upstream/index.html" "<<<<<<< HEAD" $(find . -type f); then
  echo 'Merge HEAD hash: fail' && exit 1
elif grep -q --exclude="core-updates/index.html" --exclude="maintain-custom-upstream/index.html" "=======" $(find . -not -path "./assets/*" -type f ); then
  echo 'Merge equal signs: fail' && exit 1
else
  echo 'Merge conflict: pass' && exit 0
fi
