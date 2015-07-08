---
title: Importing a WordPress Site
description: Learn how to import an existing WordPress site into the Pantheon Website Management Platform.
category:
  - wordpress
  - getting-started
keywords: wordpress, importing, import site
---

There are three major components that make up a WordPress site:

1. **Codebase** - all executable code, plugins, themes, and so forth.

2. **Database** - contains the content of the site and some site configurations.

3. **Files** - anything under `wp-content/uploads`. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.


## Export WordPress via Plugins
Popular plugins like [Duplicator](/docs/articles/wordpress/clone-a-wordpress-site-with-duplicator-plugin/) and [BackupBuddy](http://ithemes.com/codex/page/BackupBuddy) allow you to create single file archives quickly. For larger imports, pasting in a web-readable url (e.g. Dropbox secret link) will be much faster than manually uploading. Make sure a link goes directly to the file, not a landing page.

For instructions on how to import a large site outside of the Pantheon Dashboard, see [Importing a Large Site](/docs/articles/sites/create/importing-a-large-site/).

<div class="alert alert-info" role="alert"> <strong>Note:</strong> Dropbox URL's need to be modified so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.</div>  
You can simply upload the archive file produced and Pantheon will do the rest.
<div class="alert alert-danger" role="alert">
<strong>Warning</strong>:  Archives cannot contain multiple <code>.sql</code> files, otherwise the import will fail.</div>


## Manually Create Separate Site Archives

Your codebase is required to import your site into Pantheon, as it will be used to create the initial code repository. This archive should include your entire WordPress codebase, including plugins, themes, configuration files etc.

The code archive must include the following files and directories:
```nohighlight
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
### Create Code Archive
Do not include the `wp-content/uploads` or any other static assets that shouldn't be tracked in Git version control. If your codebase contains static files they should be moved to the `wp-content/uploads` directory before export.

```
# Specify the destination folder.
TARGET=~/Desktop
# Specify the source folder.
SOURCE=~/Projects/mysite
# Change directory to the source folder.
cd $SOURCE
# Create an archive that excludes `wp-content/uploads`.
tar -czf $TARGET/wordpress.tar.gz --exclude=wp-content/uploads* .
```
### Create WordPress Database Archive

This is optional, but recommended. The easiest method is to use the [mysqldump](http://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.
```php
# Specify the destination folder.
TARGET=~/Desktop
# Create the database backup.
mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
# Compress the backup.
gzip $TARGET/db.sql
```
### Export WordPress Files
Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they will be stored in Valhalla, our network file system.
```php
TARGET=~/Desktop
SOURCE=~/Projects/mysite
cd $SOURCE/wp-content/uploads
tar -czf $TARGET/files.tar.gz .
```

## Import via Dashboard

From your Pantheon user Dashboard, click **Add a site**. You will first be prompted to name the site. The only valid characters are letters, numbers, and dashes. Enter a name and click **Continue**.


### Choose a Start State
You now have several options. Rather than start with one of our preconfigured start states, we will import our code, database, and files.

Select **Import manually**.<br />
![](/source/docs/assets/images/desk_images/247521.png)  
Once selected, you can upload a single URL or file archive of the site.
<div class="alert alert-info" role="alert">
<strong>Note</strong>: Direct uploads from your desktop can be 100MB max; using a remote URL can be up to 500MB.</div>

![](/source/docs/assets/images/desk_images/259156.png)  
Alternatively, you can provide separate archives for code (required), user files (optional) and database (optional).
![](/source/docs/assets/images/desk_images/247522.png)

#### Relax While We Import Your Site
Click **Import Site** and wait while we import and configure your site.
#### Completed Installation
When complete, just click the button to visit your Pantheon Dashboard.
#### View Your Site Dashboard
Congratulations! Your site has been imported and your Pantheon site environments have been configured. From the Dashboard, you can control your site's settings, manage team members, perform workflow operations, and a lot more.
#### Launch Site
You will eventually have three environments (Dev, Test, and Live), each with a separate version of your website. Click the link at the top left of your Dashboard to launch the your development site.
![](/source/docs/assets/images/desk_images/247528.png)
#### View Your Site
You are ready to start development, or if your site is ready to go, to create your test and live environments!

Currently, we are shipping with one included/recommended plugin, which is designed to make WordPress play well with our high-performance Edge cache layer.

It sets a default cache lifetime of 10 minutes, and will automatically clear post pages (and taxonomy lists) when new content is created or updated. You can also manually flush the whole cache for a site.

## Import Via Terminus
Using the following [Terminus](https://github.com/pantheon-systems/cli) command, you can import a single file archive in URL format that includes your codebase, database, and files:
```nohighlight
$ terminus sites create [--product=<productid>] \  
                        [--name=<name>] \  
                        [--label=<label>] \  
                        [--org=<org>] \  
                        [--import=<url>]  
```


## Troubleshooting
The following warning can appear on newly created sites where the import of your site archive failed:
![Unable to Load Git History](/source/docs/assets/images/unable-to-load-git-history.png)

Verify the steps for preparing your WordPress archives manually and re-create the archive. Return to the site configuration page as instructed above and import the verified archive.

**Further Reading:**

- [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/)
- [Developing with SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode)
- [Going Live](/docs/articles/going-live)
