---
title: 'Migrate to Pantheon: WordPress Multisite'
description: Learn how to import a WordPress Multisite into Pantheon.
tags: [migrate, multisite]
contenttype: [doc]
innav: [true]
categories: [migrate]
cms: [wordpress]
audience: [agency, development]
product: [--]
integration: [--]
---

This document provides information on how to migrate WordPress Multisites, including configuration requirements and step-by-step instructions.

<Alert title="Note" type="info">

WordPress Multisite requires a special configuration that is only available to select customers. Before you can migrate a WordPress Multisite (WPMS), your Workspace must have the WPMS Upstream configured. This allows you to spin up an empty WPMS site to start the manual migration process.

If you do not have the WPMS Upstream configured under your Workspace, refer to [Pantheon Account Options & Site Hosting Pricing](https://pantheon.io/plans/pricing) to see if you qualify for a WordPress Multisite. A Pantheon employee must create a custom WPMS Upstream in your Workspace before you can create Multisites. Reach out to your account manager to request that a new WPMS Upstream be created for you. If you don't have an account manager, you can [contact sales](https://pantheon.io/contact-us).


</Alert>

## Requirements

* [Download](https://git-scm.com/downloads) and install [Git](/guides/git/git-config)
* [Rsync or SFTP Client](/guides/sftp/rsync-and-sftp)
* [MySQL Client](/guides/mariadb-mysql/mysql-access)
* [SSH Keys](/ssh-keys) set up on your local computer and Pantheon account

## Import the Codebase
**Codebase** - all executable code, including core, plugins, themes, and libraries; stored in the `~/code` directory.

Move blog-specific uploads directories located outside of `wp-content/uploads` into `wp-content/uploads`, and replace the original directories with symlinks to their new homes. In more recent versions of WordPress multisite, blog-specific uploads are stored in `wp-content/uploads/sites/<id>`.

Import your existing code and commit history via Git. If you don’t have a Git version controlled codebase, the following will walk you through the initialization process.

1. Navigate to your existing site's code directory in a local terminal. Run the code below if your existing code is not version controlled with Git.

  ```bash{promptUser: user}
  git init
  git add .
  git commit -m "initial commit"
  ```

1. Navigate to the Dev environment of the Site Dashboard and set the site's connection mode to [git](/guides/git/git-config).
1. Copy the SSH URL for the site repository in the [clone command](/guides/git/git-config#step-2-copy-the-git-clone-command). **Do not copy `git clone` or the site name.** The URL should look similar to the following:

  ```bash{promptUser: user}
  ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
  ```

1. Use Git to pull in the upstream's code (which may have Pantheon-specific optimizations) to your existing site's codebase, replacing `<ssh_url>` with the SSH URL copied in step 3:

  ```bash{promptUser: user}
  git pull --no-rebase --squash -Xtheirs <ssh_url> master
  ```

 This will yield:

  ```bash
  Squash commit -- not updating HEAD
  Automatic merge went well; stopped before committing as requested
  ```

1. Preserve any logic necessary in the original `wp-config.php` and `.gitignore` files. It's important to analyze the differences between our upstream's [`wp-config.php`](https://github.com/pantheon-systems/wordpress-network/blob/master/wp-config.php) and [`.gitignore`](https://github.com/pantheon-systems/wordpress-network/blob/master/.gitignore) and the same file in your site's codebase.

  For compatibility with Pantheon, you’ll need to update `DOMAIN_CURRENT_SITE` to be set conditionally based on environment. Here is an example:

  ```php
  /**
   * Define DOMAIN_CURRENT_SITE conditionally.
   */
  if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
    switch( $_ENV['PANTHEON_ENVIRONMENT'] ) {
      case 'live':
        define( 'DOMAIN_CURRENT_SITE', 'www.example-network.com' );
        break;
      case 'test':
        define( 'DOMAIN_CURRENT_SITE', 'www.test.example-network.com' );
        break;
      case 'dev':
        define( 'DOMAIN_CURRENT_SITE', 'www.dev.example-network.com' );
        break;
       }
  }
  ```

1. Add Pantheon as a remote destination, replacing `<ssh_url>` with the SSH URL copied in step 3:

  ```bash{promptUser: user}
  git remote add pantheon <ssh_url>
  ```

1. Run `git add` and `git commit` to prepare the Pantheon core merge for pushing to the repository:

  ```bash{promptUser: user}
  git add -A
  git commit -m "Adding Pantheon core files"
  ```

1. Push your newly merged codebase up to your Pantheon site repository:

  ```bash{promptUser: user}
  git push pantheon master --force
  ```

  <Alert title="Note" type="info">

  The `--force` option overwrites the site's remote repository on Pantheon with the contents of your local repository. This operation can be especially destructive in distributed team environments and should be used sparingly. For more information, see [`git-push`](https://git-scm.com/docs/git-push).

  </Alert>

1. Go to the Code tab of your Dev environment on the Site Dashboard. The most recent commit adds Pantheon's core files. This process preserves the commit history for site's already utilizing version control and once pushed your pre-existing commits will be visible on the Dashboard.

## Files

**Files** - Any content uploaded through the WordPress Dashboard. These files should be exclusively stored within `wp-content/uploads`, which is a symlink to the `~/files` directory.

This directory is a shared filesystem and is stored separately from the site's codebase. If your WordPress Multisite stores uploads in another directory, you must reconcile the archive as part of the import process. For information on highly populated directories, refer to [Highly Populated Files and Directories](/guides/filesystem/large-files).

File archives can be imported via the Site Dashboard on **Workflow** > **Import**; however, the archive must be within the size limits for the upload method in use (100MB for file uploads, 500MB for URL uploads).

### rsync

We recommend rsync for larger file transfers. If you have SSH access to the old host you can transfer files from the old environment directly to your new environment on Pantheon without downloading files locally. Otherwise, you can transfer them to Pantheon from your local computer. We've provided an optional script below as an example to help you get started.

The example script runs rsync while avoiding connectivity issues and requires familiarity with Bash. The script connects to your specified Pantheon site and environment and starts uploading your files. If an error occurs during transfer, rather than stopping, it waits 180 seconds and picks up where it left off.

Replace `dev` and `SITEID` below with your destination environment. Add this file at the root of a project with files stored in `/wp-content/uploads`.

```bash:title=transfer-files.sh
ENV='dev'
SITE='SITEID'

while [ 1 ]; do
  rsync --partial -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' wp-content/uploads/ --temp-dir=../tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/

  # /wp-content/uploads is a symlink to the /files directory on Pantheon.

  if [ "$?" = "0" ]; then
    echo "rsync completed normally"
    exit
  else
    echo "Rsync failure. Backing off and retrying..."
    sleep 180
  fi
done
```


### SFTP

You can use an [FTP client that supports SFTP](/guides/sftp), such as FileZilla, if you are unfamiliar or uncomfortable with bash and rsync.

1. Find your Dev environment's [SFTP connection info](/guides/sftp/sftp-connection-info#sftp-connection-info) and connect with your SFTP client.

1. Navigate to `~/code/wp-content/uploads/` and start your file upload.

## Database

<dl>

<dt>Database</dt>

<dd>

A single `.sql` dump that contains the content and active state of the site's configurations.

</dd>

</dl>

If your `.sql` file is less than 500MB, you can use the Import tool in the <Icon icon="server" /> **Database/Files** section of the Site Dashboard to import the database from a URL. If it is less than 100MB, you can upload the file directly. Importing an `.sql` file larger than 500MB require the use of the command line:

1. Navigate to the Dev environment on the Site Dashboard, click **Connection Info**, and copy the database connection string. It will look similar to this:

  ```bash
  mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon
  ```

1. Open your terminal and `cd` into the directory containing your `.sql` archive. Paste the connection string and append it with:
`< database.sql`
Your command will now look like:

 ```bash{promptUser: user}
 mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
 ```

1. Run the command to import the .sql file into your Pantheon Dev database.

You should now have all three of the major components of your site imported into Pantheon.

## WP Search and Replace

When you imported your database, all of the URLs remained active at the previous site's domain name. Visiting the site at this point should return an incorrect DB connection information error message. To resolve it, the last step of the import process is to change the URLs to match the development environment using the WP-CLI command `wp search-replace`. In the example below, replace `example.com` with the domain your site currently runs at.

**Pro Tip**: Include the `--dry-run` flag to get a preview of the changes without destructively transforming the database and use `--verbose` to receive additional details in the output (optional).

```bash{promptUser: user}
terminus wp <site>.<env> -- search-replace example.com dev-example-network.pantheonsite.io --url=example.com --all-tables
```

Note that we replaced the usual `--network` flag with `--all-tables`. After the migration is complete, use `--network` for subsequent commands.

Visit the Development environment and confirm your site was imported correctly!

When you re-import the database with current content (prior to going live on Pantheon) you will need to run `wp search-replace` again.


<Alert title="Note" type="info">

For you to be able to access your WPMS in different environments, you need to enable the Search and Replace for WPMS. Refer [here to this guide to configure your `sites.yml` file](/guides/multisite/search-replace/#enable-search-and-replace).

</Alert>


## More Resources

* [Migrate Sites to Pantheon](/guides/guided/)
* [WordPress Launch Check](/guides/wordpress-pantheon/wordpress-launch-check)
