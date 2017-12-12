---
title: Migrate Sites to Pantheon: Manual Method
description: Learn how to manually migrate a Drupal or WordPress site to Pantheon
tags: [migratemanual]
categories: []
---

The following conditions can necessitate a manual migration to Pantheon:

* **Large Drupal Site Archive**: Site archive is greater than the guided migration import limit of 500MB.
* **Preserve Git History**: You'd like to preserve your site's existing Git commit history.
* **[WordPress Site Networks](/docs/guides/multisite/)**
* **Plugin install unavailable on existing WordPress site**: For example, if your existing site is hosted on WordPress.com, you'll be unable to install the Pantheon Migrations plugin.
* **Debug Failed Migration**: It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.

If your current configuration doesn't fall into any of these categories, we strongly suggest you attempt a [guided migration](/docs/migrate) first.

## Create a New Pantheon Site

From your Pantheon Dashboard:

1. Choose **Migrate Existing Site**.

    ![The Migrate Existing Site Button](/source/docs/assets/images/dashboard/migrate-existing-site.png)

2. Enter your current website URL, choose your site type (Drupal 7, Drupal 8, or WordPress,), and click **Continue**:

    ![Choose the Starting State for your Migrated Site](/source/docs/assets/images/dashboard/migrate-step2.png)

3. Name your new Pantheon site, select an organization for the site (optional), and click **Create Site**:

    ![Name the Migrated Site and Optionally Choose an Organization](/source/docs/assets/images/dashboard/migrate-step3.png)

4.  The manual migration process differs from this point on based on your selection of WordPress or Drupal:

   <!-- Nav tabs -->
   <ul class="nav nav-tabs" role="tablist">
      <!-- Active tab -->
      <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

      <!-- 2nd Tab Nav -->
      <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal</a></li>

   </ul>

   <!-- Tab panes -->
   <div class="tab-content">
     <!-- Active pane content -->
     <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
     Click **Manually Migrate Your Site** and select **Yes** in the confirmation box.:

     ![Choose Manual WordPress Migration](/source/docs/assets/images/dashboard/migrate-manual-wp.png)
      </div>

     <!-- 2nd pane content -->
     <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
     **Drupal**: Find the line "If your site archive is larger than 500MB it must be **manually migrated**." Click the link, then select **Yes** in the confirmation box.

     ![Choose Manual Drupal Migration](/source/docs/assets/images/dashboard/migrate-manual-drops.png)
    </div>

   </div>


## Import your Code

Your **code** is all custom and contributed modules or plugins, themes, and libraries. Code *does not* include files not under version control, like images uploaded to `sites/default/files` or `wp-content/uploads`.

### Import With Git

If your codebase is already under version control with Git, and you wish to preserve your commit history. If you're not already under version control, you can still use this method to import your code, our skip down to [Import With SFTP](#import-code-with-sftp).

Before you begin, we strongly suggest you first [configure SSH keys](/docs/ssh-keys) between your local computer and Pantheon.

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">Check the contents of your current codebase for existing `.gitignore` files.  To be compatible with the platform, using the Pantheon version is advised.  Otherwise, attempts to import files to restricted paths could break the import process. See the platform-provided versions for [Wordpress](https://github.com/pantheon-systems/WordPress/blob/master/.gitignore), [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore), and [Drupal 8](https://github.com/pantheon-systems/drops-8).
</p>
</div>

1. Navigate to your existing site's code directory in a local terminal. If your existing code is not version controlled with Git, create a repository and add an initial commit:

    ```bash
    git init
    git add .
    git commit -m "initial commit"
    ```

2. From the Dev environment of the Site Dashboard, set the site's connection mode to [git](/docs/git).

3. Copy the SSH URL for the site repository, found in the <a href="/docs/git/#step-2-copy-the-git-clone-command" data-proofer-ignore>clone command</a>. *Do not copy* `git clone` or the site name.

  If you're familiar with [Terminus](/docs/terminus), you can use it to retrieve the URL as well. Replace `<sitename>` with the Site Name created earlier:

  ```bash
  terminus connection:info <sitename>.dev --field=git_url
  ```

  The URL should look similar to the following:

  ```bash
  ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
  ```

4. Add Pantheon as a remote destination, replacing `<ssh_url>` with the SSH URL copied in step 3:

  ```bash
  git remote add pantheon <ssh_url>
  ```

5. **Drupal only**: To preserve the database connection credentials for a site built on a local development environment, and to exclude them from version control, move your `settings.php` file to `settings.local.php` and add it to `.gitignore` so that it will be ignored by Git and included from Pantheon's `settings.php` when working on your site locally. Make sure that you can modify it, and restore the protections after the move:

  ```bash
  chmod u+w sites/default/{.,settings.php}
  mv sites/default/{settings.php,settings.local.php}
  chmod u-w sites/default/{settings.local.php,.}
  ```
 Drupal 8 sites running on Pantheon come with a bundled `settings.php` that includes the `settings.local.php` file, so no additional steps are required. However, sites running Drupal 6 or 7 must add a `settings.php` file that includes `settings.local.php`, as this file is not bundled on Pantheon.

6. Select the appropriate version of Git running on your local machine (`git --version`), then pull in the upstream's code (which may have Pantheon-specific optimizations) to your existing site's codebase:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#28-step6" aria-controls="28-step6" role="tab" data-toggle="tab">Git 2.8 and Below</a></li>
     <li role="presentation"><a href="#29-step6" aria-controls="29-step6" role="tab" data-toggle="tab">Git 2.9 and Above</a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
     <div role="tabpanel" class="tab-pane active" id="28-step6">
     <pre><code class="bash hljs">git pull --no-rebase --squash -Xtheirs pantheon master</code></pre>
    </div>
     <div role="tabpanel" class="tab-pane" id="29-step6">
      <pre><code class="bash hljs">git pull --no-rebase --squash -Xtheirs pantheon master --allow-unrelated-histories</code></pre>
     </div>
    </div>

  The output will resemble:

  ```bash
  Squash commit -- not updating HEAD
  Automatic merge went well; stopped before committing as requested
  ```

  If you haven't already configured [SSH Keys](/docs/ssh-keys), authenticate using your Pantheon Dashboard credentials when prompted for a password.

7. Run git commit to prepare the Pantheon core merge for pushing to the repository:

  ```bash
  git commit -m "Adding Pantheon core files"
  ```
8. Align your local branch with its remote counterpart on Pantheon:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#28-step8" aria-controls="28-step8" role="tab" data-toggle="tab">Git 2.8 and Below</a></li>
     <li role="presentation"><a href="#29-step8" aria-controls="29-step8" role="tab" data-toggle="tab">Git 2.9 and Above</a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
     <div role="tabpanel" class="tab-pane active" id="28-step8">
     <pre><code class="bash hljs">git pull pantheon master --no-rebase</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="29-step8">
      <pre><code class="bash hljs">git pull pantheon master --no-rebase --allow-unrelated-histories</code></pre>
     </div>
    </div>

9. Push your newly merged codebase up to your Pantheon site repository:

    ```bash
    git push pantheon master
    ```

10. Go to the Code tab of your Dev environment on the Site Dashboard. You will see your site's pre-existing code commit history and the most recent commit adding Pantheon's core files.


### Import Code with SFTP
If you've already imported your code using git in the section above, you can skip to the [Add Database](#add-database) section.

If you already have the codebase on your local computer, you can upload it directly over SFTP. Find the **Connection Info** from the Dev environment and use an SFTP client to add your code. You'll want to only add plugins, modules, and themes and not overwrite WordPress or Drupal core. For more information, see [Developing on Pantheon Directly with SFTP Mode](/docs/sftp/).

The codebase hierarchy for WordPress and Drupal is:

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="wp-code-id" role="presentation" class="active"><a href="#wp-code" aria-controls="wp-code" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="drops-code-id" role="presentation"><a href="#drops-code" aria-controls="drops-code" role="tab" data-toggle="tab">Drupal</a></li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="wp-code" markdown="1">
```php
├── index.php
├── wp-activate.php
├── wp-config.php
├── wp-comments-post.php
├── wp-blog-header.php
├── wp-admin
├── wp-cron.php
├── wp-load.php
├── wp-links-opml.php
├── wp-includes
├── xmlrpc.php
├── wp-trackback.php
├── wp-signup.php
├── wp-settings.php
├── wp-mail.php
├── wp-login.php
├── wp-content
    ├── index.php
    ├── mu-plugins
    ├── themes
    ├── plugins 
```
 </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="drops-code" markdown="1">
```php
├── includes
├── index.php
├── misc
├── modules
├── profiles
├── scripts
├── sites
    └── all
       ├── modules
       └── themes
    └── default
       └── settings.php
└── themes
```
  </div>
</div>

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">Check the contents of your current codebase for existing `.gitignore` files.  To be compatible with the platform, using the Pantheon version is advised.  Otherwise, attempts to import files to restricted paths could break the import process. See the platform-provided versions for [Wordpress](https://github.com/pantheon-systems/WordPress/blob/master/.gitignore), [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore), and [Drupal 8](https://github.com/pantheon-systems/drops-8).
</p>
</div>


## Add Database

**Database** - a single `.sql` dump that contains the content and active state of the site's configurations.

Your site's database should already be backed up into a single `.sql` dump that contains the content and active state of the site's configuration. If you haven't done so already, we recommend that you remove data from cache tables to make the `.sql` file smaller, which helps ensure a quick and successful import. If you're using WP-CLI, you can flush the cache easily with `wp cache flush` before creating the dump file.

You can use either the Pantheon Dashboard or a MySQL client to add your site's database.

If your `.sql` file is less than 500MB, you can use the Import tool on the Workflow tab to import the database from a URL. If it is less than 100MB, you can upload the file directly. Importing an `.sql` file larger than 500MB require the use of the command line:

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
`< database.sql`. Your command will look like:

 ```
 mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
 ```

   If you encounter a connection-related error, the DB server could be in sleep mode. To resolve this, load the site in your browser to wake it up, and try again. For more information, see [Troubleshooting MySQL Connections](/docs/mysql-access/#troubleshooting-mysql-connections).

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

Rsync is an excellent method for transferring a large number of files. After performing an initial rsync, subsequent jobs will only transfer the latest changes. This can help minimize the amount of time a site is in an unpredictable state (or offline) during the final step of migration, as it allows you to bring over only new content rather than re-copying every single file.

We recommend looking into the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) as a helper when doing these operations, as the number of command line arguments and specifics of directory structure make it easy for human error to impact your operation.

To sync your current directory to Pantheon:

```bash
terminus rsync . my_site.dev:files
```

When using Rsync manually, the script below is useful for dealing with transfers being interrupted due to connectivity issues. It uploads files to your Pantheon site's Dev environment. If an error occurs during transfer, it waits 180 seconds and picks up where it left off:


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
You can import a WordPress or Drupal site archive via URL (within file size limits) by uploading the archive to a web-accessible location (like DropBox or Google Drive), and using [Terminus](/docs/terminus):

```bash
terminus site:import <site> <url>
```

#### How do I migrate a Drupal 6 site to Pantheon?
Anyone wishing to migrate a Drupal 6 site to Pantheon can work with one of our Long Term Support (LTS) partners: [Tag1 Consulting](https://tag1consulting.com/) or [myDropWizard](https://www.mydropwizard.com/drupal-6-lts). Both of these partners are experienced in supporting sites on the Pantheon platform and specialize in maintaining security and site functionality for Drupal 6 sites. Should you need to keep your site running on D6, you will be in excellent hands working with them.

## See Also
* <a href="https://pantheon.io/resources/quickstart-guide-migrating-wordpress-site" target="blank">The Quickstart Guide to Migrating a WordPress Site <span class="glyphicons glyphicons-new-window-alt"></span></a>
* [Developing on Pantheon Directly with SFTP Mode](/docs/sftp/)
* [Starting with Git](/docs/git/)
* [Accessing MySQL Databases](/docs/mysql-access/)
* [rsync and SFTP](/docs/rsync-and-sftp/)
* [Using the Pantheon Workflow](/docs/pantheon-workflow)
