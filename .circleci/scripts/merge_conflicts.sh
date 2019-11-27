#!/bin/bash
set -e
path=$(dirname "$0")
base=$(cd $path/../.. && pwd)

cd $base/source/
if grep --binary-files=without-match --exclude="git-faq.md" --exclude="core-updates.md" --exclude="maintain-custom-upstream.md" "<<<<<<< HEAD" $(find . -type f); then
  echo 'Merge HEAD hash: fail with <<<< HEAD' && exit 1
elif grep --binary-files=without-match --exclude="git-faq.md" --exclude="core-updates.md" --exclude="maintain-custom-upstream.md" ">>>>>>>" $(find . -type f); then
  echo 'Merge HEAD hash: fail with >>>>' && exit 1
else
  echo 'Merge conflict: pass' && exit 0
fi
