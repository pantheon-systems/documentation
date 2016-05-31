---
title: Pruning a Large Git Repository
description: Get instructions on how to prune your Git repository to under 2GB to maintain compatibility with the Pantheon platform.
categories: [developing]
tags: [code, local]
keywords: git, git commands, drupal, wordpress
---
When a code repo is larger than 2GB, it increases the possibility of Git errors when committing code on Pantheon. This article walks you through pruning down a large Git repository so that your site is compatible with all functions on the platform. Please be aware that the steps described below use the BASH shell and Perl extensively. 

### Step 1: Make a local clone of the pantheon repository.
1. Follow [these instructions](https://pantheon.io/docs/git/#clone-your-site-codebase) to create your local clone
2. Change directory to the repository by running: `cd repository-name`

### Step 2: Create local copies of all remote branches.
```
for BRANCH in `git branch -r | grep -v HEAD | grep -v master`; do git branch --track "${BRANCH#origin/}"; done
```

### Step 3: Get a full list of all local branches.
Run the following command to set a variable containing all local branches to be used in later steps. 
```
BRANCHES=$(for BRANCH in $(git branch --list | grep -v master); do echo "${BRANCH}"; done; echo master)
```

### Step 4: Create a list of large files to review.
Get a list of all large files in all branches and add it to a file called "large_files.txt".  This may take several minutes to complete.
```
git rev-list $BRANCHES | while read rev; do git ls-tree -lr $rev | cut -c54- | grep -v '^ '; done | sort -u | perl -e '
while (<>) {
  chomp;
  @stuff=split("\t");
  $sums{$stuff[1]} += $stuff[0];
}
print "$sums{$_} $_\n" for (keys %sums);
' | sort -rn > large_files.txt
```
### Step 5: Determine what patterns to filter out.
Review the patterns in large_files.txt to determine that patterns you need to filter out. A pattern may be the path of a file by name, the path of a directory by name, or an expandable path.

- Example of a pattern for a single file name: `PATTERN1=myfile.txt`

- Example of a pattern for a directory. This will also match on all files under that directory: `PATTERN2=my_directory`

- Example of an expandable path pattern that matches all SQL files with in mydirectory: `PATTERN3=mydirectory/*.sql`

### Step 6: Filter out files and directories that match our patterns.
Run the following command (this may take hours to complete):
```
git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch PATTERN1 PATTERN2 PATTERN3 ...' --prune-empty --tag-name-filter cat -- --all
```

### Step 7: Push your local changes to the Pantheon repository.
Run the following commands to push your changes to the remote repository:
```
git push origin --force --all
git push origin --force --tags
```

### Step 8: Recover local disk space.
Run the following command to reduce the size of your local repository:
```
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now
```
