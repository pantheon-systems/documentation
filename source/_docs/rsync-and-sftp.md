---
title: rsync and SFTP
description: Transfer large files using an SFTP client or rsync using Drupal 6, Drupal 7, or WordPress for Pantheon.
tags: [sftpfiles]
categories: []
---
If you have more than 500 MB of content to be transferred to your `/files` directory (`sites/default/files` for Drupal and `wp-content/uploads` for WordPress), you won't be able to use your Pantheon Dashboard to import. Instead, you'll need to use a SFTP client or rsync to transfer.

This allows you to transfer unlimited data "server-to-server", which is much faster than transferring from your workstation. Files can be transferred to and from any Pantheon site environment (Dev, Test, and Live).

There are two mechanisms for transferring files: SFTP and rsync.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>You will not be able to use SFTP or rsync to add any file or directory listed in a <code>.gitignore</code> file to your Git repository. Any file uploaded in this way cannot be committed and will not be available for deployment.</p>
</div>

{% include("content/auth.html")%}

## SFTP

There are a number of GUI SFTP clients available, such as [FileZilla](https://filezilla-project.org), [WinSCP](https://winscp.net/eng/index.php), and [Cyberduck](https://cyberduck.io/). In your SFTP client, be sure to limit the number of simultaneous connections to one.

[Connection information](/docs/sftp#sftp-connection-information) for SFTP is available in each site environment. From your Pantheon Dashboard, click **Connection Info** to see your credentials.

Here's an example of using a command-line SFTP client to connect to a site environment's file directory. Substitute your target environment and [site UUID](/docs/sites#site-uuid) to connect; copy/pasting this example exactly as is will not work.

    export ENV=dev
    # Usually dev, test, or live
    export SITE=c9beeb22-63f9-498a-942b-6ac0edcd4c29
    # Site UUID from dashboard URL: https://dashboard.pantheon.io/sites/<UUID>


    sftp -oPort=2222 $ENV.$SITE@appserver.$ENV.$SITE.drush.in
    Connected to appserver.$ENV.$SITE.drush.in
    sftp> cd files
    sftp> put [your file or files]


## rsync

rsync is also available, but it is a more advanced tool that requires experience with the command line.

Substitute your target environment and site UUID to connect; copying/pasting this example exactly as is will not work.

    export ENV=dev
    # Usually dev, test, or live
    export SITE=[YOUR SITE UUID]
    # Site UUID from dashboard URL: https://dashboard.pantheon.io/sites/<UUID>

    # To Upload/Import
    rsync -rLvz --size-only --ipv4 --progress -e 'ssh -p 2222' ./files/. --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/

    # To Download
    rsync -rLvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/ ~/files


    # -r: Recurse into subdirectories
    # -L: Check links
    # -v: Verbose output
    # -z: Compress during transfer
    # Other rsync flags may or may not be supported
    # (-a, -p, -o, -g, -D, etc are not).

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Regardless of framework, WordPress or Drupal, your files need to be in the `/files` directory. This directory maps to `sites/default/files` for Drupal and `wp-content/uploads` for WordPress. Adjust paths as needed to include `web` (e.g., `web/wp-content/uploads`) for [sites configured to use a nested docroot](/docs/nested-docroot/).</p>
</div>

## Examples

Before you begin, make sure you have the following information:

**Site URL:** https://dashboard.pantheon.io/sites/3ef6264e-51d9-43b9-a60b-6cc22c3129308as83<br />
**Environment (ENV):** Dev<br />
**Site (SITE):** 3ef6264e-51d9-43b9-a60b-6cc22c3129308as83

### Download a Drupal Directory from Pantheon
Download the contents of the `sites/default/files` directory into a folder on your local environment in the `files` home folder:

```nohighlight
$: export ENV=dev
$: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
$: rsync -rLvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/default/files/ ~/files
```
### Download a WordPress Directory from Pantheon
Download the contents of the `wp-content/uploads` directory into a folder on your local environment in the `files` home folder:

```nohighlight
$: export ENV=dev
$: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
$: rsync -rLvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/wp-content/uploads ~/files
```

### Download a Drupal File from Pantheon
Download the `sites/default/settings.php` file into a Drupal installation called _Foo_ on your local environment in a  `sites/default/files` folder:

```nohighlight
$: export ENV=dev
$: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
$: rsync -rLvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/default/settings.php ~/Foo/sites/default
```
### Download a WordPress File from Pantheon
Download the `index.php` file into a WordPress installation called _Foo_ on your local environment in a `wp-content/uploads` folder:

```nohighlight
$: export ENV=dev
$: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
$: rsync -rLvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/wp-content/uploads/index.php ~/Foo/sites/wp-content/uploads
```

### Upload a Directory to Pantheon
If you need to upload the files directory from a local installation called Foo in your home directory to a Pantheon site's Test environment `sites/default/files` directory, use the following commands:

<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p>Always use the <code>temp-dir flag</code> when using rsync for uploads. Removing the flag will result in broken files after cloning from one environment to another.</p></div>

```nohighlight
$: export ENV=test
$: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
$: rsync -rLvz --size-only --ipv4 --progress -e 'ssh -p 2222' ~/files/. --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/
```
### Upload a Single File to Pantheon
This example shows how to upload the logo.png file into a Pantheon site's theme folder.

```nohighlight
$: export ENV=dev
$: export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
$: rsync -rLvz --size-only --ipv4 --progress -e 'ssh -p 2222' ~/Foo/sites/all/themes/foo/logo.png --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/all/themes/foo
```
## Known Issues

If you're uploading many files, and your Live environment has [multiple application containers](/docs/application-containers/#multiple-application-containers), upload to an environment other than Live (e.g. Dev), then use the clone operation in the Dashboard or [Terminus](/docs/terminus) to move the files to Live. Uploading a large amount of files into a multi-container Live environment may fail silently.
