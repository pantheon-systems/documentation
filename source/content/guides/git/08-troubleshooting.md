---
title: Git on Pantheon Guide
subtitle: Troubleshooting
description: Get solutions to common Git troubleshooting scenarios.
tags: [git, iterate, local, workflow]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/git/troubleshooting
anchorid: troubleshooting
contenttype: [guide]
categories: [git]
newcms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [git]
---

This section provides solutions to common Git troubleshooting scenarios.

### Reduce Large Repositories

Repositories that exceed 2GB may experience failures or degraded performance when interacting with code via Git on Pantheon. We recommend that you reduce the repository size by removing objects that are no longer referenced. You can output the size of your repository by running [`git count-objects -vH`](https://git-scm.com/docs/git-count-objects) or `du -sh .git/` from within the root directory of your site's codebase.

We recommend that you use [git filter-repo](https://github.com/newren/git-filter-repo/) to reduce the size of your repository.

<Alert type="danger" title="Caution">

The instructions for `git-filter-repo` are advanced, and may not work in every case. You should only attempt the steps to reduce repository size if you are an experienced Git user.

</Alert>

1. Make sure you have a remote in Github, Bitbucket, or Gitlab with a full copy of your repository.

1. Follow the steps in the [`git-filter-repo INSTALL.md`](https://github.com/newren/git-filter-repo/blob/main/INSTALL.md) file to download and install `git-filter-repo`.

1. Refer to the [`git-filter-repo` User manual](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html) for instructions on how to reduce the size of your repository.

You should be able to run commands similar to the example below after you install `git-filter-repo`.

Example to remove one file:

```bash
git filter-repo --path wp-content/themes/mytheme/assets/images/largefile.mp4 --invert-paths
```

<Partial file="host-keys.md" />

### Checking Out Code using GUI Clients

Git GUI clients generally prompt for a Source URL using HTTP or HTTPS to the repository to check out the site code. Pantheon does not provide Git repository access over HTTP(s), and instead provides a "Git over SSH" command. For example: 

```bash
git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
```

However, some Git GUI clients, including SourceTree, also support the use of
 `ssh://` URLs to clone the code base. Follow the steps below to configure the URL.

1. Navigate to your Pantheon **Dev** environment > click  **Connection Info** > copy the **SSH clone URL**.

1. Navigate to SourceTree > click **Clone a repository**.

1. Paste the URL into the **Source URL** field.

   1. Remove `git clone` from the beginning of the URL. 

   1. Remove the trailing space and `my-site` name from the end of the URL provided in the **Connection Info** section of your Pantheon Dashboard.

      Your Source URL should look like this:

      ```
      ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git
      ```

1. Enter the local path where you want to clone the repository in the **Destination Path** field. 

1. Enter your site name in the the **Name** field.

![SourceTree git Configuration](../../../images/sourcetree-config.png)

Alternatively, you can simply clone the repository using `git clone` and then use the "Add Existing Local Repository" option in SourceTree to point to the checked out directory.

### Blocked Port

You'll see an error like the one below when attempting to run `git clone`, `git push`, or `git pull` if your local network is blocking port 2222.

```none
ssh: connect to host codeserver.dev.xxx.drush.in port 2222: Operation timed out
fatal: Could not read from remote repository.
```

To clear this up, you may need to work with your network administrators to unblock this port. If this isn't an option, you may need to try a [Port 2222 Blocked Workaround](/guides/sftp/port-2222).

## More Resources

We recommend the following resources for further learning:

- [Git Documentation](https://git-scm.com/documentation)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [First Aid Git](https://github.com/magalhini/firstaidgit)
- [Git Reference](http://gitref.org/)
- [Git Cheatsheet](https://ndpsoftware.com/git-cheatsheet.html)
- [Git Immersion](http://gitimmersion.com/)
- [Code School - Try Git](https://try.github.io/levels/1/challenges/1)
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
- [SourceTree - Git GUI Client](https://www.sourcetreeapp.com/)
- [GitKraken - Git GUI Client](https://www.gitkraken.com/)
- [GitHub Desktop - Git GUI Client](https://desktop.github.com/)
- [Repository mirroring](https://docs.gitlab.com/ee/workflow/repository_mirroring.html)

For Pantheon-specific Git questions, see the following:

- [Git FAQs](/guides/git/faq-git)

- [Undo Git Commits](/guides/git/undo-commits)

- [Useful Git Commands](/guides/git/useful-commands)
