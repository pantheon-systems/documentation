---
title: 'Migrate to Pantheon: WordPress Site Networks'
description: Learn how to import a WordPress Site Network into Pantheon.
cms: "WordPress"
categories: [get-started]
tags: [migrate, site-networks]
---

<Alert title="Note" type="info">

Before you can migrate a WordPress Site Network, you must be a contract customer, and a Pantheon employee must create a [WordPress Site Network](/guides/multisite) for you.

</Alert>

## Requirements

* [Download](https://git-scm.com/downloads) and install [Git](/git)
* [Rsync or SFTP Client](/rsync-and-sftp)
* [MySQL Client](/mysql-access)

## Import the Codebase
**Codebase** - all executable code, including core, plugins, themes, and libraries; stored in the `~/code` directory.

Move blog-specific uploads directories located outside of `wp-content/uploads` into `wp-content/uploads`, and replace the original directories with symlinks to their new homes. In more recent versions of WordPress multisite, blog-specific uploads are stored in `wp-content/uploads/sites/<id>`.

Import your existing code and commit history via Git. If you don’t have a Git version controlled codebase, the following will walk you through the initialization process.

1. Navigate to your existing site's code directory in a local terminal. If your existing code is not version controlled with Git, run:

  ```bash{promptUser: user}
  git init
  git add .
  git commit -m "initial commit"
  ```

1. From the Dev environment of the Site Dashboard, set the site's connection mode to [git](/git).
1. Copy the SSH URL for the site repository, found in the [clone command](/git/#step-2-copy-the-git-clone-command). **Do not copy `git clone` or the site name.** The URL should look similar to the following:

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

This directory is a shared filesystem and is stored separately from the site's codebase. If your WordPress Site Network stores uploads in another directory, you must reconcile the archive as part of the import process. For information on highly populated directories, see [Platform Considerations](/platform-considerations/#highly-populated-directories).

File archives can be imported via the Site Dashboard on **Workflow** > **Import**; however, the archive must be within the size limits for the upload method in use (100MB for file uploads, 500MB for URL uploads).

For larger file transfers, we recommend running rsync from the old environment directly to your new environment on Pantheon to forgo downloading all the files locally. However, if the files already exist on your local machine you can transfer them to Pantheon with this handy script and avoid connectivity issues:

```bash:title=transfer-files.sh
ENV='dev'
SITE='SITEID'

read -sp "Your Pantheon Password: " PASSWORD
if [[ -z "$PASSWORD" ]]; then
echo "Woops, need password"
exit
fi

while [ 1 ]
do
sshpass -p "$PASSWORD" rsync --partial -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222'  $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/* --temp-dir=../tmp/  ./files/
if [ "$?" = "0" ] ; then
echo "rsync completed normally"
exit
else
echo "Rsync failure. Backing off and retrying..."
sleep 180
fi
done
```

This script connects to your Pantheon site's Dev environment and starts uploading your files. If an error occurs during transfer, rather than stopping, it waits 180 seconds and picks up where it left off.

If you are unfamiliar or uncomfortable with bash and rsync, an [FTP client that supports SFTP](/sftp/#sftp-clients), such as FileZilla, is a good option. Find your Dev environment's SFTP connection info and connect with your SFTP client. Navigate to `~/code/wp-content/uploads/`. You can now start your file upload.

## Database

<dl>

<dt>Database</dt>

<dd>

A single `.sql` dump that contains the content and active state of the site's configurations.

</dd>

</dl>

If your `.sql` file is less than 500MB, you can use the Import tool in the <span class="glyphicons glyphicons-server" aria-hidden="true"></span> **Database/Files** section of the Site Dashboard to import the database from a URL. If it is less than 100MB, you can upload the file directly. Importing an `.sql` file larger than 500MB require the use of the command line:

1. From the Dev environment on the Site Dashboard, click **Connection Info** and copy the database connection string. It will look similar to this:

  ```bash
  mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon
  ```

1. From your terminal, `cd` into the directory containing your `.sql` archive. Paste the connection string and append it with:
`< database.sql`
Your command will now look like:

 ```bash{promptUser: user}
 mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
 ```

1. After you run the command, the .sql file is imported into your Pantheon Dev database.

You should now have all three of the major components of your site imported into Pantheon.

## WP Search and Replace

When you imported your database, all of the URLs remained active at the previous site's domain name. Visiting the site at this point should return an incorrect connection information error message. To resolve it, the last step of the import process is to change the URLs to match the development environment using the WP-CLI command `wp search-replace`. In the example below, replace `example.com` with the domain your site currently runs at.

**Pro Tip**: Include the `--dry-run` flag to get a preview of the changes without destructively transforming the database and use `--verbose` to receive additional details in the output (optional).

```bash{promptUser: user}
terminus wp <site>.<env> -- search-replace example.com dev-example-network.pantheonsite.io --url=example.com --all-tables
```

Note that we replaced the usual `--network` flag with `--all-tables`. After the migration is complete, use `--network` for subsequent commands.

Visit the Development environment and confirm your site was imported correctly!

When you re-import the database with current content (prior to going live on Pantheon) you will need to run `wp search-replace` again.

## See Also

* [Migrate Sites to Pantheon](/migrate)
* [Guided WordPress Migrations (video)](/videos/migrate-wordpress)
* [WordPress Launch Check](/wordpress-launch-check)
