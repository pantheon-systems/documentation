---
title: Reducing Large Repositories
description: Learn how to reduce the size of large Drupal or WordPress site repositories for optimized performance and reliability on Pantheon.
categories: [develop]
tags: [files, git, local, workflow]
contributors: [alexfornuto]
---

<Alert type="danger" title="Caution">

The content in this guide is advanced, and may not work in every case. For issues with cloning large repositories, you can simply clone the latest commit only using the `depth` flag:

```bash{promptUser: user}
git clone --depth 1 ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
```

</Alert>

Repositories that exceed 2GB may experience failures or degraded performance when interacting with code via Git on Pantheon. We recommend reducing the repository size by removing objects that are no longer referenced using [`git prune`](https://git-scm.com/docs/git-prune) in addition to optimizing via [`git gc`](https://git-scm.com/docs/git-gc). You may also want to review the repository for large files, then exclude them as needed.


<Alert title="Note" type="info">

Due to the use of Perl and the Bash shell, the following process is supported on Linux and Mac machines only. Windows users should work within a virtual machine.

If your default shell is something other than Bash (Zsh, for example), switch to a Bash environment before you continue.

</Alert>

## Determine Repository File Size

You can output the size of your repository by running [`git count-objects -vH`](https://git-scm.com/docs/git-count-objects) or `du -sh .git/` from within the root directory of your site's codebase.

## Prune and Optimize Large Repositories

1. [Clone the site's codebase](/git#clone-your-site-codebase), if you haven't already.

1. Set the connection mode for each environment (excluding Test and Live) to git. You can do this with Terminus:

  ```bash{promptUser: user}
  for i in $(terminus env:list $SITENAME --format=list | grep -v 'test|live'); do terminus connection:set $SITENAME.$i git; done
  ```

1. Navigate to the root directory of your site's codebase (e.g. `cd site-name`).

1. Create local copies of all remote branches:

 ```bash{promptUser: user}
 for BRANCH in `git branch -r | grep -vE "HEAD|master"`; do git branch --track ${BRANCH#origin/} $BRANCH; done
 ```

1. Write all local branch names to the `$BRANCHES` variable, to be used in later steps:

 ```bash{promptUser: user}
 BRANCHES=$(for BRANCH in $(git branch --list | grep -v master); do echo "${BRANCH}"; done; echo master)
 ```

1. Generate a list of large files existing on any branch, then write output to `../large_files.txt`:

 ```bash{outputLines:2-8}
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

1. Review patterns that occur within `large_files.txt` and determine what should be excluded. Patterns may be a path to a single file, the path of a directory by name, or an expandable path.

  **Example Patterns**:
    - Single file name: `myfile.txt`
    - Directory. This will also match on all files under that directory: `my_directory`
    - Expandable path pattern that matches all SQL files within `my_directory`: `my_directory\/*.sql`

1. Filter out files and directories according to problematic patterns. In the example below, replace `my_directory\/*.sql myfile.txt` with the patterns you want to filter for:

 ```bash{promptUser: user}
 git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch my_directory\/*.sql myfile.txt' --prune-empty --tag-name-filter cat -- --all
 ```

 This may take hours to complete.

1. Push your local changes to Pantheon:

  ```bash{promptUser: user}
  git push origin --force --all
  git push origin --force --tags
  ```

  In some scenarios, `git push origin --force --tags` may throw an error. Note that the following type of message is *not* an error:

  ```git
  remote: PANTHEON NOTICE:
  remote:
  remote: The creation of tag "pantheon_test_9" has triggered a deployment of code on test.
  remote:
  ```

  The current workaround is to delete the tags remotely using `git push origin :refs/tags/[tag]`

1. Recover local disk space and optimize your local repository with the following:

  ```bash{promptUser: user}
  git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
  git reflog expire --expire=now --all
  git gc --prune=now
  ```
