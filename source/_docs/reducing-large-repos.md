---
title: Reducing Large Repositories
description: Learn how to reduce the size of large Drupal or WordPress site repositories for optimized performance and reliability on Pantheon.
tags: [git]
categories: [develop, git]
draft: true
contributors: curmudgeon
---
Repositories that exceed 2GB may experience failures or degraded performance when interacting with code via Git on Pantheon. We recommend reducing the repository size by removing objects that are no longer referenced using [`git prune`](https://git-scm.com/docs/git-prune) in addition to optimizing via [`git gc`](https://git-scm.com/docs/git-gc). You may also want to review the repository for large files, then exclude them as needed.


<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>Due to the use of Perl and the Bash shell, the following process is supported on Linux and Mac machines only. Windows users should work within a virtual machine.
</p>
</div>

## Determine Repository File Size
You can output the size of your repository by running [`git count-objects -vH`](https://git-scm.com/docs/git-count-objects) or `du -sh .git/` from within the root directory of your site's codebase.

## Prune and Optimize Large Repositories

1. [Clone the site's codebase](/docs/git/#clone-your-site-codebase), if you haven't already.
2. Navigate to the root directory of your site's codebase (e.g. `cd site-name`).
3. Create local copies of all remote branches:

 ```
 for BRANCH in `git branch -r | grep -vE "HEAD|master"`; do git branch --track ${BRANCH#origin/} $BRANCH; done
 ```

4. Write all local branch names to the `$BRANCHES` variable, to be used in later steps:

 ```
 BRANCHES=$(for BRANCH in $(git branch --list | grep -v master); do echo "${BRANCH}"; done; echo master)
 ```

5. Generate a list of large files existing on any branch, then write output to `../large_files.txt`:

 ```
 git rev-list $BRANCHES -- | while read rev; do git ls-tree -lr $rev | cut -c54- | grep -v '^ '; done | sort -u | perl -e '
 while (<>) {
   chomp;
   @stuff=split("\t");
   $sums{$stuff[1]} += $stuff[0];
 }
 print "$sums{$_} $_\n" for (keys %sums);
 ' | sort -rn > ../large_files.txt
 ```

 This may take several minutes to complete.

6. Review patterns that occur within `large_files.txt` and determine what should be excluded. Patterns may be a path to a single file, the path of a directory by name, or an expandable path.

 **Example Patterns**:
 - Single file name: `myfile.txt`
 - Directory. This will also match on all files under that directory: `my_directory`
 - Expandable path pattern that matches all SQL files within `my_directory`: `my_directory\/*.sql`

7. Filter out files and directories according to problematic patterns:

 ```
 git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch my_directory\/*.sql myfile.txt' --prune-empty --tag-name-filter cat -- --all
 ```

 This may take hours to complete.

8. Push your local changes to Pantheon:

 ```
 git push origin --force --all
 git push origin --force --tags
 ```

 In some scenarios, `git push origin --force --tags` may throw an error. The current workaround is to delete the tags remotely using `git push origin :refs/tags/[tag]`


9. Recover local disk space and optimize your local repository with the following:
 ```
 git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
 git reflog expire --expire=now --all
 git gc --prune=now
 ```
