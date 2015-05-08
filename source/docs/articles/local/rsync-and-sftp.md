---
title: rsync and SFTP
description: Transfer large files using an SFTP client or rsync.
category:
  - getting-started
keywords: rsync, sftp, files, transfer, file transfer, drupal, wordpress
---
<div class="alert alert-danger" role="alert">
<strong>Warning</strong>: Due to the nature of our platform architecture, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check this with the dashboard periodically or when you find that you can’t connect.</div>


If you have more than 500 MB of content to be transferred to your `/files` directory (`sites/default/files` for Drupal and `wp-content/uploads` for WordPress), you won't be able to use your Pantheon Dashboard to import. Instead, you'll need to use a SFTP client or rsync to transfer.

This method allows for transfer of unlimited data "server-to-server", which is much faster than transferring from your workstation. Additionally, files can be transferred to and from any Pantheon site environment (Dev, Test, and Live).

There are two mechanisms for transferring files: SFTP and rsync.

<div class="alert alert-warning" role="alert">
<strong>Note</strong>: You will not be able to use SFTP or rsync to add any file or directory listed in a <code>.gitignore</code> file to your Git repository. Any file uploaded in this manner cannot be committed and will not be available for deployment.</div>

## SFTP

There are a number of GUI SFTP clients available, such as [FileZilla](https://filezilla-project.org), [WinSCP](http://winscp.net), and [Cyberduck](https://cyberduck.io/). Make sure that your SFTP client is set to limit the number of simultaneous connections, and make sure the limit is one connection at a time.

[Connection information](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information) for SFTP is available in each site environment. From your Pantheon Dashboard, click **Connection Info** to see your credentials.

Here's an example of using a command-line SFTP client to connect to a site environment's file directory. Substitute your target environment and site UUID to connect; copy/pasting this example exactly will not work.

```
    export ENV=dev
    # Usually dev, test, or live
    export SITE=c9beeb22-63f9-498a-942b-6ac0edcd4c29
    # Site UUID from dashboard URL: https://dashboard.pantheon.io/sites/<UUID>


    sftp -oPort=2222 $ENV.$SITE@appserver.$ENV.$SITE.drush.in
    Connected to appserver.$ENV.$SITE.drush.in
    sftp> cd files
    sftp> put [your file or files]
```

## rsync

rsync is also available but is a more advanced tool that requires experience with the command line.

Substitute your target environment and site UUID to connect; copying/pasting this example exactly will not work.

    export ENV=dev
    # Usually dev, test, or live
    export SITE=[YOUR SITE UUID]
    # Site UUID from dashboard URL: https://dashboard.pantheon.io/sites/<UUID>

    # To Upload/Import
    rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' ./files/* --temp-dir=../tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/

    # To Download
    rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/ ~/files


    # -r: Recurse into subdirectories
    # -l: Check links
    # -v: Verbose output
    # -z: Compress during transfer
    # Other rsync flags may or may not be supported
    # (-a, -p, -o, -g, -D, etc are not).

<div class="alert alert-info" role="alert">
<strong>Note</strong>: Regardless of which platform you are using, WordPress or Drupal, your files need to be in the <code>/files</code> directory. This directory maps to <code>sites/default/files</code> for Drupal and <code>wp-content/uploads</code> for WordPress.</div>

## Examples

Before we get started let us make sure we have everything you need:

**Site URL:** https://dashboard.pantheon.io/sites/3ef6264e-51d9-43b9-a60b-6cc22c3129308as83<br />
**Environment (ENV):** Dev<br />
**Site (SITE):** 3ef6264e-51d9-43b9-a60b-6cc22c3129308as83

### Download a Drupal Directory from Pantheon
Next we will download the contents of the `sites/default/files` directory into a folder on our local environment in our `files` home folder.

    $: export ENV=dev
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/default/files/ ~/files

### Download a WordPress Directory from Pantheon
Download the contents of the `wp-content/uploads` directory into a folder on our local environment in the `files` home folder.

    $: export ENV=dev
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/wp-content/uploads ~/files


### Download a Drupal File from Pantheon
Download the `sites/default/settings.php` file into a Drupal installation called _Foo_ on our local environment in a  `sites/default/files` folder.

    $: export ENV=dev
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/default/settings.php ~/Foo/sites/default

### Download a WordPress File from Pantheon
Download the `index.php` file into a WordPress installation called _Foo_ on our local environment in a `wp-content/uploads` folder.

    $: export ENV=dev
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/wp-content/uploads/index.php ~/Foo/sites/wp-content/uploads


### Upload a Directory to Pantheon
If you need to upload the files directory from a local installation called Foo in our home directory to a Pantheon site's Test environment `sites/default/files` directory, use the following commands:

    $: export ENV=test
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' ~/files/* --temp-dir=../tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/

### Upload a File to Pantheon
Some cases will require you to update a single file on your Pantheon site. Here we will upload the logo.png file into a Pantheon site's theme folder.

    $: export ENV=dev
    $: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
    $: rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' ~/Foo/sites/all/themes/foo/logo.png $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/all/themes/foo

## Known Issues

If you're using rsync to upload a large amount of files, and your Live environment has multiple app-containers, we recommend first uploading to your Dev environment, then using the clone operation in the dashboard to move the files into the other environments. There's a known issue with uploading a large amount of files into a multi-container Live environment where some transfers may fail and temporary files are left in place. Unfortunately this is a silent failure; rsync reports everything transferred successfully.
