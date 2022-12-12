---
title: SFTP on Pantheon
subtitle: Large File Transfers with rsync and SFTP
description: Transfer large files using an SFTP client or rsync.
tags: [files, sftp, rsync]
categories: [sftp]
newcms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [--]
layout: guide
showtoc: true
permalink: docs/guides/sftp/rsync-and-sftp
anchorid: rsync-and-sftp
---

This section provides information on how to use your SFTP client or rsync to transfer large files.

## File Size Limits

You can't use your Pantheon Dashboard to import files over 500 MB. You must use an SFTP client or rsync to transfer files larger than 500 MB to your `/files` directory.

- **Drupal:** (`sites/default/files`
- **WordPress:** `wp-content/uploads`

An SFTP client or rsync allows you to transfer unlimited data server-to-server, which is faster than transferring from your workstation. Files can be transferred to and from any Pantheon site environment (Dev, Test, and Live).

<Alert title="Notes" type="info">

 - This section covers copying [files](/files), excluding database files. You cannot directly access the database files. Refer to [Use the Pantheon WebOps Workflow](/pantheon-workflow) for more information on how code moves up and content moves down.

 - You will not be able to use SFTP or rsync to add any file or directory listed in a `.gitignore` file to your Git repository. Any file uploaded in this way cannot be committed and will not be available for deployment.

</Alert>

There are two mechanisms for transferring files: SFTP and rsync.

## SFTP

There are a number of GUI SFTP clients available, such as [WinSCP](https://winscp.net/eng/index.php) and [Cyberduck](https://cyberduck.io/). Do not use simultaneous connections.

1. Navigate to your Site dashboard.

1. Click **Connection Info** to access your credentials. 

1. Connect to your SFTP client. The example belows uses a command-line SFTP client to connect to a site environment's file directory.

    <Alert title="Note" type="info">

    You must replace `[env]` with the target environment and `[uuid]` with the [Site UUID](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuid) to connect. The values are case sensitive and must be lower case (for example, dev, test, live).

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

rsync is an advanced tool that requires experience with the command line. You can also use the [Terminus rsync plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) as a shortcut to rsync files to your Pantheon sites. rsync is highly customizable. Refer to [rsync documentation](https://linux.die.net/man/1/rsync) to learn more.

<Alert title="Note" type="info">

Your files must be in the `/files` directory for both Drupal and WordPress sites. This directory maps to `sites/default/files` for Drupal and `wp-content/uploads` for WordPress. Adjust paths as needed to include `web` (for example, `web/wp-content/uploads`) for [sites configured to use a nested docroot](/nested-docroot).

</Alert>

### Transfer Files with rsync

1. Ensure that source or the destination is a local file or directory. **The source and destination cannot both be remote.**

1. Replace `[env]` with the target environment and `[uuid]` with the [Site UUID](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuid) before you run the code below to connect. The values are case sensitive and must be lower case (for example, dev, test, live).

    ```bash{outputLines:2,4-6,8-9,11-20}
    export ENV=[env]
    # Usually dev, test, or live
    export SITE=[uuid]
    # Site UUID from dashboard URL: https://dashboard.pantheon.io/sites/[uuid]

    # To Upload/Import
    rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' . --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/

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

## Examples

<Alert title="Exports" type="export">

The examples below use the variables `$ENV` and `$SITE`. You must replace these variables with your site UUID and environment, or set them before you begin:

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

If you need to upload the file directory from a local installation called *Foo* in your home directory to a Pantheon site's Test environment `sites/default/files` directory, use the command below. If you are migrating a site or otherwise overwriting an existing site, remove `--ignore-existing` before running the command.

<Alert title="Warning" type="danger">

Always use the `temp-dir flag` when using rsync for uploads. Removing the flag will result in broken files after cloning from one environment to another.

</Alert>

```bash{promptUser: user}
rsync --ignore-existing -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' ~/files/. --temp-dir=~/tmp/ 
$ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/
```

### Upload a Single File to Pantheon

This example shows how to upload the `logo.png` file into a Pantheon site's theme folder.

```bash{promptUser: user}
rsync -rLvz --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' ~/Foo/sites/all/themes/foo/logo.png --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:code/sites/all/themes/foo
```

### Empty a Folder Recursively Using rsync

The `rm -r` command is not available over SFTP on Pantheon. An alternative way to recursively empty a folder is to use the rsync `--delete` flag. This example shows how to empty the remote folder `files/remote_folder_to_empty` (change this to match the remote directory you want to empty).

Create an empty folder with `mkdir empty_folder` on your local machine. The folder can be named anything, as long as it's empty.

```bash{outputLines:3}
export ENV=env # Replace with the site environment, usually dev, test, or live
export SITE=uuid # Replace with the site UUID, which you can find from the Site Dashboard URL or terminus site:info $sitename --field=id

rsync -rLvz --size-only --checksum --ipv4 --progress -a --delete -e 'ssh -p 2222' empty_folder/ --temp-dir=~/tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/remote_folder_to_empty
```

Now you can use `rmdir` over SFTP to remove the empty directory itself.

## Known Issues

Uploading a large number of files into a multi-container Live environment may fail silently. Follow the steps below if you're uploading many files, and your Live environment has [multiple application containers](/application-containers/#multiple-application-containers).

1. Upload to an environment other than Live (for example, Dev).

1. Use the clone operation in the Dashboard or [Terminus](/terminus/commands/local-clone) to move the files to Live.

## More Resources

- [SFTP Connection Info and Authentication](/guides/sftp/sftp-connection-info)
- [Pantheon Filesystem](/files)
- [Platform Files and Directories](/guides/platform-considerations/files-directories)
- [Environment Configuration on Pantheon](/guides/environment-configuration)