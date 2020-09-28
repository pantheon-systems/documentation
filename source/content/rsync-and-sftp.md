---
title: rsync and SFTP
description: Transfer large files using an SFTP client or rsync using Drupal 6, Drupal 7, or WordPress for Pantheon.
categories: [develop]
tags: [files, sftp, rsync]
---
If you have more than 500 MB of content to be transferred to your `/files` directory (`sites/default/files` for Drupal and `wp-content/uploads` for WordPress), you won't be able to use your Pantheon Dashboard to import. Instead, you'll need to use a SFTP client or rsync to transfer.

This allows you to transfer unlimited data "server-to-server", which is much faster than transferring from your workstation. Files can be transferred to and from any Pantheon site environment (Dev, Test, and Live).

<Alert title="Notes" type="info">

 - This document covers copying [files](/files), excluding database files. You cannot directly access the database files. See [Use the Pantheon WebOps Workflow](/pantheon-workflow) for more information on how code moves up and content moves down.

 - You will not be able to use SFTP or rsync to add any file or directory listed in a `.gitignore` file to your Git repository. Any file uploaded in this way cannot be committed and will not be available for deployment.

</Alert>

There are two mechanisms for transferring files: SFTP and rsync.

<Partial file="auth.md" />

## SFTP

There are a number of GUI SFTP clients available, such as [FileZilla](https://filezilla-project.org), [WinSCP](https://winscp.net/eng/index.php), and [Cyberduck](https://cyberduck.io/). In your SFTP client, be sure to limit the number of simultaneous connections to one.

[Connection information](/sftp#sftp-connection-information) for SFTP is available in each site environment. From your Pantheon Dashboard, click **Connection Info** to see your credentials.

Here's an example of using a command-line SFTP client to connect to a site environment's file directory.

<Alert title="Note" type="info">

You must replace `[env]` with the target environment and `[uuid]` with the [Site UUID](/sites#site-uuid) to connect. The values are case sensitive and should be lower case (e.g., dev, test, live).

</Alert>

```bash{outputLines: 2,4-5,7-9}
export ENV=[env]
# Usually dev, test, or live
export SITE=[uuid]
# Site UUID from dashboard URL: https://dashboard.pantheon.io/sites/[uuid]

sftp -oPort=2222 $ENV.$SITE@appserver.$ENV.$SITE.drush.in
Connected to appserver.$ENV.$SITE.drush.in
sftp> cd files
sftp> put [your file or files]
```

## rsync

rsync is available, but it is a more advanced tool that requires experience with the command line. You can also use the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) as a shortcut to rsync files to your Pantheon sites.

<Alert title="Note" type="info">

Either the source or the destination must be a local file or directory; both cannot be remote. You must replace `[env]` with the target environment and `[uuid]` with the [Site UUID](/sites#site-uuid) to connect. The values are case sensitive and should be lower case (e.g., dev, test, live).

</Alert>

```bash{outputLines:2,4-6,8-9,11-20}
export ENV=[env]
# Usually dev, test, or live
export SITE=[uuid]
# Site UUID from dashboard URL: https://dashboard.pantheon.io/sites/[uuid]

# To Upload/Import
rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' ./files/. --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/

# To Download
rsync -rvlz --copy-unsafe-links --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/ ~/files


# -r: Recurse into subdirectories
# -v: Verbose output
# -l: copies symlinks as symlinks
# -L: transforms symlinks into files.
# -z: Compress during transfer
# --copy-unsafe-links: transforms symlinks into files when the symlink target is outside of the tree being copied
# Other rsync flags may or may not be supported
# (-a, -p, -o, -g, -D, etc are not).
```

Rsync is highly customizable. See the [man page](https://linux.die.net/man/1/rsync) to learn more.

<Alert title="Note" type="info">

Regardless of framework, WordPress or Drupal, your files need to be in the `/files` directory. This directory maps to `sites/default/files` for Drupal and `wp-content/uploads` for WordPress. Adjust paths as needed to include `web` (e.g., `web/wp-content/uploads`) for [sites configured to use a nested docroot](/nested-docroot).

</Alert>

## Examples

<Alert title="Exports" type="export">

The examples below use the variables `$ENV` and `$SITE`. You can replace these variables with your site UUID and environment, or set them before you begin:

```bash{promptUser: user}
export ENV=dev
export SITE=3ef6264e-51d9-43b9-a60b-6cc22c3129308as83
```

Replace the example values above with the environment you're working with and your site UUID. You can find the UUID in your Site Dashboard URL:

https://dashboard.pantheon.io/sites/**3ef6264e-51d9-43b9-a60b-6cc22c3129308as83**

</Alert>

### Download a Drupal Directory from Pantheon

Download the contents of the `sites/default/files` directory into a folder on your local environment in the `files` home folder:

```bash{promptUser: user}
rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/default/files/ ~/files
```

### Download a WordPress Directory from Pantheon

Download the contents of the `wp-content/uploads` directory into a folder on your local environment in the `files` home folder:

```bash{promptUser: user}
rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/wp-content/uploads ~/files
```

### Download a Drupal File from Pantheon

Download the `sites/default/settings.php` file into a Drupal installation called _Foo_ on your local environment in a  `sites/default/files` folder:

```bash{promptUser: user}
rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/default/settings.php ~/Foo/sites/default
```

### Download a WordPress File from Pantheon

Download the `index.php` file into a WordPress installation called _Foo_ on your local environment in a `wp-content/uploads` folder:

```bash{promptUser: user}
rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/wp-content/uploads/index.php ~/Foo/sites/wp-content/uploads
```

### Upload a Directory to Pantheon

If you need to upload the files directory from a local installation called Foo in your home directory to a Pantheon site's Test environment `sites/default/files` directory, use the following commands:

<Alert title="Warning" type="danger">

Always use the `temp-dir flag` when using rsync for uploads. Removing the flag will result in broken files after cloning from one environment to another.

</Alert>

```bash{promptUser: user}
rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' ~/files/. --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/
```

### Upload a Single File to Pantheon

This example shows how to upload the logo.png file into a Pantheon site's theme folder.

```bash{promptUser: user}
rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' ~/Foo/sites/all/themes/foo/logo.png --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/all/themes/foo
```

### Empty a Folder Recursively Using rsync

Since the `rm -r` command is not available over SFTP on Pantheon, an alternative way to recursively empty a folder is to use the rsync `--delete` flag. This example shows how to empty the remote folder `files/remote_folder_to_empty` (change this to match the remote directory you want to empty).

On your local machine, you must first create an empty folder with `mkdir empty_folder`. The folder can be named anything, as long as it's empty.

```bash{outputLines:3}
export ENV=env # Replace with the site environment, usually dev, test, or live
export SITE=uuid # Replace with the site UUID, which you can find from the Site Dashboard URL or terminus site:info $sitename --field=id

rsync -rLvz --size-only --checksum --ipv4 --progress -a --delete -e 'ssh -p 2222' empty_folder/ --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/remote_folder_to_empty
```

Now you can use `rmdir` over SFTP to remove the empty directory itself.

## Known Issues

If you're uploading many files, and your Live environment has [multiple application containers](/application-containers/#multiple-application-containers), upload to an environment other than Live (e.g. Dev), then use the clone operation in the Dashboard or [Terminus](/terminus) to move the files to Live. Uploading a large amount of files into a multi-container Live environment may fail silently.
