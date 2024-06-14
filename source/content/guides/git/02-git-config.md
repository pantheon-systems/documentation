---
title: Git on Pantheon Guide
subtitle: Install and Configure Git
description: Use Git version control to deploy code to your Drupal or WordPress site's development environment.
tags: [code, git, local, webops, workflow]
showtoc: true
permalink: docs/guides/git/git-config
contenttype: [guide]
innav: [false]
categories: [git]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [git]
---

This section provides steps for installing and configuring Git to work with your Pantheon account.

## Before You Begin

Confirm that you have:

- [Created a site](/guides/legacy-dashboard/create-sites) on Pantheon
- Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account

## Install Git

Download and install Git for your operating system:

- [macOS](https://git-scm.com/download/mac)
- [Windows](https://git-scm.com/download/win)
- [Linux](https://git-scm.com/download/linux)

## Configure Git

Provide a name and email with which your commits will be associated before you can commit your code in Git.

1. Run the following command to enter your own name and email.

    ```bash{promptUser: user}
    git config --global user.name "Anita Pantheon"
    git config --global user.email anita@pantheon.io
    ```

    - The `--global` option sets these values for all projects you manage with Git.

1. Run the command below to set a default editor for commit messages. Replace `nano` with your preferred text editor or IDE. For example, `atom` or `code` (for [Visual Studio Code](/guides/local-development/visual-studio-code)).

    ```bash{promptUser: user}
    git config --global core.editor nano
    ```

## Clone Your Site Codebase

You must create a local copy of your [codebase](/guides/git/collaborative-development#git-repositories-on-pantheon) using the `git clone` command. Follow the steps below to ensure that you create the clone correctly.

1. Navigate to the Terminal directory where you keep your projects.

1. Log in to Pantheon and load the Site Dashboard for the site you want to work on.

1. Click the **<Icon icon="wrench" /> Dev** tab > set the **Development Mode** to **Git** > click **Clone with Git**.

  ![Copy Git Clone Command](../../../images/dashboard/git-string.png)

1. Copy the `git clone` command and paste it into Terminal. Git will create a directory as part of the clone, so you don't need to create one:

  ```bash{promptUser: user}
  git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
  ```

  You should see Git fetching the data:

  ```git
  Cloning into 'anita-wordpress'...
  The authenticity of host '[codeserver.dev.....drush.in]:2222 ([173.255.119.72]:2222)' can't be established.
  RSA key fingerprint is SHA256:yPEkh1Amd9WFBSP5syXD5rhUByTjaKBxQnlb5CahZZE.
  Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
  Warning: Permanently added '[codeserver.dev.....drush.in]:2222,[173.255.119.72]:2222' (RSA) to the list of known hosts.
  remote: Counting objects: 20503, done.
  remote: Compressing objects: 100% (8184/8184), done.
  remote: Total 20503 (delta 12802), reused 19671 (delta 11982)
  Receiving objects: 100% (20503/20503), 46.65 MiB | 15.16 MiB/s, done.
  Resolving deltas: 100% (12802/12802), done.
  ```

- Check your [SSH key](/ssh-keys) setup if you run into permission problems.
  
- Confirm that you have a current version of Git if the clone starts but can't complete.

## Make Changes

You can now edit your site code using your [preferred](https://xkcd.com/378/ "XKCD comic about text editors") text editor or IDE.

1. Run the command below to add a new file to your codebase and have Git track the file.

  ```bash{promptUser: user}
  git add path/to/file.txt
  ```

1. Run the command below to find files in your local clone that Git is not tracking.

    ```bash{promptUser: user}
    git status
    ```

    - Pending changes and files to be added will be listed like this:

    ```git
    On branch master
    Your branch is up to date with 'origin/master'.

    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

          modified:   index.php
          modified:   wp-admin/admin-ajax.php

    Untracked files:
      (use "git add <file>..." to include in what will be committed)

          superdev.php

    no changes added to commit (use "git add" and/or "git commit -a")
    ```

1. Cut and paste the paths to these files when using `git add`. This **stages** the files for the next commit.

## Push Changes to Pantheon

Sending code to Pantheon is a two-step process with Git. First, you need to commit the files locally. Then you need to "push" them to the Pantheon cloud.

1. Commit changed files to let Git know that they are ready to be pushed to the remote.

    - Every commit includes a brief message so you can later remember why the change was made. It is worthwhile to take a moment and create an accurate commit message to help others understand your changes:

    ```bash{promptUser: user}
    git commit -am "Add a great new plugin to increase awesomesauce level of my WordPress site."
    ```

    This command uses a combination of options `-am`: `-a` to include *all* files changed, and `-m` to include a commit *message*:

    <Alert type="info" title="Note">

    Any _new_ (untracked) files not staged with `git add` will not be included by the `-a` flag. Be sure to review what is and isn't staged with `git status` before you commit your work.

    </Alert>

    If you don't specify a message through the command line, Git will open your default text editor and prompt you to create one. If you exit without providing a commit message, Git will abort the commit. You will see something similar to the example below if the commit worked:

    ```git
    [master d2fce4ea] Add a great new plugin to increase awesomesauce level of my WordPress site.
    2 files changed, 3 insertions(+)
    ```

1. Run the `push` command to send the changes of the committed files from the local to Pantheon.

  ```bash{promptUser: user}
  git push origin master
  ```

  This executes a push to the origin location, (which is Pantheon since that's where you cloned the code from), on the branch "master", which is what your Dev environment tracks.

  If you have a passphrase on your SSH key, you may need to enter it to authorize the push. If everything worked, you will see something like this:

  ```git
  Enumerating objects: 9, done.
  Counting objects: 100% (9/9), done.
  Delta compression using up to 8 threads
  Compressing objects: 100% (5/5), done.
  Writing objects: 100% (5/5), 466 bytes | 466.00 KiB/s, done.
  Total 5 (delta 4), reused 0 (delta 0)
  To ssh://codeserver.dev.....drush.in:2222/~/repository.git
    27bf0fca..d2fce4ea  master -> master
  ```

There is a handy list of Git commands (along with a lot of other documentation) [on GitHub](https://github.com/AlexZeitler/gitcheatsheet/blob/master/gitcheatsheet.pdf "Alex Zeitler's Git cheat sheet PDF").

### View the Changes on Pantheon

Pantheon instantly deploys the changes to your development server when the push command completes.

![Image of the Dev tab syncing with a recently pushed git commit](../../../images/dashboard/sync-code.png)

1. Navigate to your site's dashboard > click the **<Icon icon="wrench" /> Dev** tab.

1. Click **Visit Development Site** to see the changes made by your new code.
