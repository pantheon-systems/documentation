#!/bin/bash
set -e
path=$(dirname "$0")
base=$(cd $path/.. && pwd)

cd $base/output_dev
if grep -q "&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD" $(find . -type f); then
  echo 'Merge HEAD hash: fail' && exit 1
elif grep -q "<<<<<<< HEAD" $(find . -type f); then
  echo 'Merge HEAD hash: fail' && exit 1
elif grep -q "=======" $(find . -not -path "./assets/*" -type f ); then
  echo 'Merge equal signs: fail' && exit 1
else
  echo 'Merge conflict: pass' && exit 0
fi
