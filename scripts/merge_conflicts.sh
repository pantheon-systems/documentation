#!/bin/bash
set -e
path=$(dirname "$0")
base=$(cd $path/.. && pwd)

cd $base/source/
if grep -q --exclude="git-faq.md" --exclude="core-updates.md" --exclude="maintain-custom-upstream.md" "<<<<<<< HEAD" $(find . -type f); then
  echo 'Merge HEAD hash: fail with >>>>' && exit 1
elif grep -q --exclude="git-faq.md" --exclude="core-updates.md" --exclude="maintain-custom-upstream.md" ">>>>>>>" $(find . -type f); then
  echo 'Merge HEAD hash: fail with <<<<' && exit 1
elif grep -q --exclude="docs/*" --exclude="git-faq.md" --exclude="core-updates.md" --exclude="maintain-custom-upstream.md" --exclude="mysql-slow-log.md" "=======" $(find . -type f ); then
  echo 'Merge equal signs: fail with ====' && exit 1
else
  echo 'Merge conflict: pass' && exit 0
fi
