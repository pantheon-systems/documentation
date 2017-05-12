---
title: Migrate Sites to Pantheon: Manual Method
description: Learn how to manually migrate a Drupal or WordPress site to Pantheon
tags: [migratemanual]
categories: []
---
Manually migrate your site to Pantheon when any of the following apply:

* **Large Drupal Site Archive**: Site archive is greater than the guided migration import limit of 500MB.
* **Preserve Git History**: You'd like to preserve your site's existing Git commit history.
* **[WordPress Site Networks](/docs/wordpress-site-networks/)**
* **Plugin install unavailable on existing WordPress site**: For example, if your existing site is hosted on WordPress.com, you'll be unable to install the Pantheon Migrations plugin.
* **Debug Failed Migration**: It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.

For guided migration, see [Migrate Sites to Pantheon](/docs/migrate).

## Step 1: Create a New Pantheon Site

From your Pantheon Dashboard:

1. Choose **Migrate Existing Site**.
2. Enter your current website URL.
3. Choose your site type: Drupal 7, Drupal 8, WordPress, or a [Custom Upstream](/docs/custom-upstream/).
4. Click **Continue**.
5. Name your new Pantheon site.
6. Select an organization for the site (optional).
7. Click **Create Site**.
8. **WordPress**: Click **Migrate Manually** and select **Yes** in the confirmation box.

   **Drupal**: Find the line "If your site archive is larger than 500MB it must be **manually migrated**." Click the link, then select **Yes** in the confirmation box.


## Step 2: Import your Code

Your **code** is all custom and contributed modules or plugins, themes, and libraries. Code **does not** include files not under version control, like images uploaded to `sites/default/files` or `wp-content/uploads`.

You can use either SFTP or Git to import your code. If you'd like to retain existing Git History, then please see [Migrating Sites to Pantheon: Preserve Existing Git History](/docs/migrate-preserve-history).

### Import Code via SFTP
Find the **Connection Info** from the Dev environment and use an SFTP client to add your code. You'll want to only add plugins, modules, and themes and not overwrite WordPress or Drupal core. For more information, see [Developing on Pantheon Directly with SFTP Mode](/docs/sftp/).

### Import Code via Git
Clone the Pantheon site repository and copy your site's plugins, modules and themes, commit, and push. Do not overwrite WordPress or Drupal core. For more information, see [Starting with Git](/docs/git/).

If you'd like to retain existing Git History, see [Migrating Sites to Pantheon: Preserve Existing Git History](/docs/migrate-preserve-history).


## Step 3: Add Database

Your site's database should already be backed up into a single `.sql` dump that contains the content and active state of the site's configuration. If you haven't done so already, we recommend that you remove data from cache tables to make the `.sql` file smaller, which helps ensure a quick and successful import. If you're using WP-CLI, you can flush the cache easily with `wp cache flush` before creating the dump file.

You can use either the Pantheon Dashboard or a MySQL client to add your site's database.

### Import Database using the Pantheon Dashboard

1. Select the **Dev** environment.
2. Select **Database / Files**.
3. Click **Import**.
4. In the **MySQL database** field, paste the URL of the `sql` file or upload a local `sql` file, and press **Import**.

### Import Database using a MySQL Client

The following instructions are for the command line MySQL client, but you can also use a GUI client like Sequel Pro or Navicat. For more information, see [Accessing MySQL Databases](/docs/mysql-access/).

1. From the Dev environment on the Pantheon Site Dashboard, click **Connection Info** and copy the Database connection string. It will look similar to this:

 ```
 mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon
 ```
2. From your terminal, `cd` into the directory containing your `.sql` file. Paste the connection string and append it with:
`< database.sql`
Your command will look like:

 ```
 mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
 ```
3. After you run the command, the `.sql` file is imported into your Pantheon Dev environment database container.

## Step 4: Upload Your Files

Files refer to anything within `sites/default/files` for Drupal or `wp-content/uploads` for WordPress, which typically includes uploaded images, along with generated stylesheets, aggregated scripts, etc. For information on highly populated directories, see [Platform Considerations](/docs/platform-considerations/#highly-populated-directories).

Files are not under Git version control and are stored separately from the site's code.

You can use the Pantheon Dashboard, SFTP, or Rsync to upload your site's files.

### Import Files using the Pantheon Dashboard

1. Select the **Dev** environment.
2. Select **Database / Files**.
3. Click **Import**.
4. In the **Archive of site files** field, paste the URL of your `zip` or `tar.gz` archive, or upload a local file and click **Import**.

### Import Files using SFTP

Use an FTP client that supports SFTP, such as FileZilla. Find your Dev environment's SFTP connection info and connect with your SFTP client. Navigate to `files/` and start your file upload.

### Import Files using Rsync

Rsync is an excellent method for transferring a large number of files. After doing an initial rsync, subsequent rsyncs will only transfer the latest changes.

The rsync script below is useful when dealing with transfers being interrupted due to connectivity issues. It uploads files to your Pantheon site's Dev environment. If an error occurs during transfer, it waits 180 seconds and picks up where it left off.


```bash
ENV='dev'
SITE='SITEID'

read -sp "Your Pantheon Password: " PASSWORD
if [[ -z "$PASSWORD" ]]; then
echo "Whoops, need password"
exit
fi

while [ 1 ]
do
sshpass -p "$PASSWORD" rsync --partial -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' ./files/* --temp-dir=../tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/
if [ "$?" = "0" ] ; then
echo "rsync completed normally"
exit
else
echo "Rsync failure. Backing off and retrying..."
sleep 180
fi
done
```

You should now have all three of the major components of your site imported into Pantheon. Clear your caches on the the Pantheon Dashboard, and you are good to go! Once everything looks good, click **I've Successfully Migrated Manually**.

If something didn't work and you'd like to start over, you can cancel the site migration, delete the site, and try again. We also recommend making use of our **[Backups](/docs/backups/)** tool periodically during migration so you can restore to a known good state of your site.

## Frequently Asked Questions (FAQs)

#### How do I migrate a local site to Pantheon?
You can import a WordPress or Drupal site archive via URL (within file size limits) using [Terminus](/docs/terminus):

```bash
terminus site:import <site> <url>
```

#### How do I migrate a Drupal 6 site to Pantheon?
Anyone wishing to migrate a Drupal 6 site to Pantheon can work with one of our Long Term Support (LTS) partners: [Tag1 Consulting](https://tag1consulting.com/) or [myDropWizard](http://www.mydropwizard.com/drupal-6-lts). Both of these partners are experienced in supporting sites on the Pantheon platform and specialize in maintaining security and site functionality for Drupal 6 sites. Should you need to keep your site running on D6, you will be in excellent hands working with them.

## See Also
* [Migrate Sites to Pantheon: Troubleshooting](/docs/migrate-troubleshooting)
* [Developing on Pantheon Directly with SFTP Mode](/docs/sftp/)
* [Starting with Git](/docs/git/)
* [Accessing MySQL Databases](/docs/mysql-access/)
* [rsync and SFTP](/docs/rsync-and-sftp/)
* [Using the Pantheon Workflow](/docs/pantheon-workflow)
