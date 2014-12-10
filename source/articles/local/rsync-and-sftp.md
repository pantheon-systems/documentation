---
title: rsync and SFTP
description: Transfer large files using an SFTP client or rsync.
categories:
  - getting-started
/rsync-and-sftp/
Metadata
filename: source/_tools/rsync-and-sftp.md
---

 ## Overview

 **Note: Due to the nature of our platform architecture, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check this with the dashboard periodically or when you find that you can’t connect.**  

If you have more than 500 MB of content to be transferred to sites/default/files, you won't be able to use the dashboard to import. Instead, you'll need to use a SFTP client or rsync to transfer.

This method allows for transfer of (for all intents and purposes) unlimited data "server-to-server", which is much faster than transferring from your workstation. Additionally, files can be transferred to and from any Pantheon site environment (Dev, Test, and Live).

There are two mechanisms for transferring files; SFTP and rsync.

## Pantheon Academy
​<iframe allowfullscreen="" frameborder="0" height="315" src="http://www.youtube.com/embed/BqatUtBlHGI?rel=0" width="650"></iframe>

**Note: You will not be able to use SFTP or rsync to add any file or directory listed in a `.gitignore` file to your git repository. Any file uploaded in this manner cannot be committed and will not be persistent or available for deployment.**

## SFTP

There are a number of GUI SFTP clients available, such as FileZilla, WinSCP, and Cyberduck. Make sure that your SFTP client is set to limit the number of simultaneous connections, and make sure the limit is one connection at a time.

Connection information for SFTP is available in each site environment; from your dashboard, click the "Connection Info" for credentials.

Here's an example of using a command-line SFTP client to connect to a site environment's file directory. Substitute your target environment and site UUID to connect; copy/pasting this example exactly will not work.

    ENV=dev
    # Usually dev, test, or live
    export SITE=c9beeb22-63f9-498a-942b-6ac0edcd4c29
    # Site UUID from dashboard URL: https://dashboard.getpantheon.com/sites/<UUID>


    sftp -oPort=2222 $ENV.$SITE@appserver.$ENV.$SITE.drush.in
    Connected to appserver.$ENV.$SITE.drush.in
    sftp> cd files
    sftp> put [your file or files]

## rsync

rsync is also available, but is a more advanced tool that requires experience with the command line.

Substitute your target environment and site UUID to connect; copy/pasting this example exactly will not work.

    export ENV=dev
    # Usually dev, test, or live
    export SITE=[YOUR SITE UUID]
    # Site UUID from dashboard URL: https://dashboard.getpantheon.com/sites/<UUID>

    # To Upload/Import
    rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' \
       ./files/* --temp-dir=../tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/

    # To Download
    rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' \
      $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/ ~/files


    # -r: Recurse into subdirectories
    # -l: Check links
    # -v: Verbose output
    # -z: Compress during transfer
    # Other rsync flags may or may not be supported
    # (-a, -p, -o, -g, -D, etc are not).

## Examples

We will take a look at performing some basic actions using RSYNC on Pantheon.

**Note:** For long commands that may not fit on one line they will be separated by a `\` ( Backslash) which you can delete before you try the command so it fits on one line in your console or terminal

Before we get started let us make sure we have everything you need:

**Site URL:** _https://dashboard.getpantheon.com/sites/3ef6264e-51d9-43b9-a60b-6cc22c3129308as83_  
**Environment (ENV):** _Dev_  
**Site (SITE):** _3ef6264e-51d9-43b9-a60b-6cc22c3129308as83_

## Download a Directory from Pantheon

Next we will download the contents of the `sites/default/files` directory into a folder on our local environment in our home folder called `files`

    $: export ENV=dev  
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' \
       $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/default/files/ ~/files

## Download a File from Pantheon

Next we will download the `sites/default/settings.php` file into a Drupal installation called _Foo_ on our local environment in a folder called `sites/default/files`

    $: export ENV=dev  
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' \
       $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/default/settings.php ~/Foo/sites/default

## Upload a Directory to Pantheon

If you need to upload the files directory from a local Drupal installation called Foo in our home directory to a Pantheon site's Test environment `sites/default/files` directory we can use the following commands.

    $: export ENV=test  
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' \
       ~/files/* --temp-dir=../tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/

## Upload a File to Pantheon

Some cases will require you to update a single file on your Pantheon site. Here we will upload the `logo.png` file into a Pantheon site's theme folder.

    $: export ENV=dev  
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' \
       ~/Foo/sites/all/themes/foo/logo.png \
       $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/all/themes/foo

## Known Issues

If you're using rsync to upload a large amount of files, and your _Live_ environment has multiple app-containers, we recommend first uploading to your _Dev_ environment, then using the clone operation in the dashboard to move the files into the other environments. There's a known issue with uploading a large amount of files into a multi-container _Live_ environment where some transfers may fail and temporary files are left in place. Unfortunately this is a silent failure; rsync reports everything transferred successfully.
