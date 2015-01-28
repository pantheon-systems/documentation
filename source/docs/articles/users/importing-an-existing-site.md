---
title: Importing an Existing Site to Pantheon
description: Detailed information on how to prepare and import your site to Pantheon.
category:
  - drupal
  - getting-started
---


## Overview

The easiest way to import an existing site into Pantheon is to create a new site and select **Import manually** when asked to choose a Start State.

![Choose your start state](/docs/assets/images/choose-your-start-state.png)

Next, you'll need to determine if your imports will be via one archive, or multiple. By default, you will be provided the option to give a single archive for your entire import.

![Single Archive Import](/docs/assets/images/single-archive-import.png)

Selecting the link to provide separate code, files and database archives will give you the option to import individually.

 ![Separate Archives Import](/docs/assets/images/separate-archives-import.png)​

## Adding a Custom Upstream

### Pull Pantheon Core
If your code requires a custom upstream, create the site with the closest available core such as Drupal 7 or WordPress. Following the steps below, you can pull Pantheon core files into your local repository.

1. Navigate into your code directory within your terminal.
2. If your existing site code is not version controlled with Git, run ```git init``` first.
3. Copy the Upstream location from within the Dev environment (Settings>>About Site).
4. Replace **http** with **git** and append the URL with **.git** so that it resembles the following example for Drupal 7:
git://github.com/pantheon-systems/drops-7.git

The following Git command will pull in purely the Pantheon specific core:

```
git pull --no-rebase -Xtheirs --squash [upstream-location] master
```

**Note**: Be sure and replace [upstream-location] with the Upstream location generated in Step 4 above.

Once executed, that command will pull in the Pantheon core files but not commit them so you
will be able to do a final review yourself before doing so. The following message will show when
it's done:

```
Squash commit -- not updating HEAD
Automatic merge went well; stopped before committing as requested
```
### Push Local Repository to Pantheon
Now that your site has the Pantheon core merged in, the final step is putting it onto your Pantheon environment. On your Pantheon Dashboard, go to the Dev tab and select Code. Make sure your site is on Git mode, and copy the Git connection information found to the right of
the Git tab.

In your terminal, within the site directory, use the ```git remote add``` command with an alias to make sure you know when you are moving code to or from Pantheon. Using the Git information from the previous step, create the following command:

```
git remote add [pantheon-site-git-repo] pantheon-import
```

**Note**: Replace [pantheon-site-git-repo] with the Git information from the previous step. Also, **remove** the site name from the end of the connection information, otherwise you will get an error and the command will fail.

Run a Git add and commit to prepare the Pantheon core merge for pushing to the repository:
```
git add -A
git commit -m "Adding Pantheon core files."
```
Now git pull from your Pantheon repository master branch:
```
git pull pantheon master
```
Handle any conflicts as needed and push back to your Pantheon site repository:
```
git push pantheon master
```
Look in your Dev environment Code tab. You should now see your site's pre-existing code
commit history, plus the most recent commits adding Pantheon's core files.


## Components of a Dynamic Site

There are three major components that make up a dynamic site:

1. **Codebase** - all executable code, including Core, custom and contrib modules, plugins and themes, etc.
2. **Database** - contains the content of the site and some site configurations.
3. **Files** - anything under sites/default/files. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

## Prepare Your Site For Export

When preparing a site for export, there are a few best practices to follow:

* **Put the source site into Drupal maintenance mode** by going to Configuration > Development > Maintenance. This will prevent the contents of your database from getting out of sync while you’re exporting.
* **Clear all Drupal caches**. This will remove unnecessary and out-of-date files from both the database and your filesystem, which will save a lot of time and valuable space.
* Take a look at your codebase and **remove any non-Drupal code from your site** that you aren’t planning on running on Pantheon.
* If you’ve been using the database for things other than Drupal, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

To log back into your imported site that is in maintenance mode, just go to /user/login and login as UID 1 (the first administrative user).

## Export Your Executable Code

Your codebase is required to import your site into Pantheon, as it will be used to create the initial code repository. This archive should include your entire Drupal codebase, including modules, themes, installation profiles, libraries, etc.  

The code archive should not include the "files" directory (e.g. sites/default/files) or any other static assets that should not be tracked in version control.

The code archive should include the following directories:

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

**Note: The "files" directory has been omitted. Remember not to include it in your codebase.**

## Create a Code Archive

Create an archive that is stored outside of your Drupal site root that contains only the executable code associated with your site and skips the contents of sites/default/files.

    # Specify the destination folder.
    TARGET=~/Desktop
    # Specify the source folder.
    SOURCE=~/Projects/mysite
    # Change directory to the source folder.
    cd $SOURCE
    # Create an archive that excludes sites/default/files.
    tar -czf $TARGET/drupal.tar.gz --exclude=sites/default/files* .

## Export the Database

This is optional, but recommended. The easiest method is to use the [mysqldump](http://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.

    # Specify the destination folder.
    TARGET=~/Desktop
    # Create the database backup.
    mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
    # Compress the backup.
    gzip $TARGET/db.sql

## Table Prefixes

Pantheon injects the database configuration dynamically during bootstrap. In the PRESSFLOW\_SETTINGS variable, the appropriate database connection information is passed in based upon the environment (dev/test/live).

You can technically use DB prefixes, but Pantheon will not support database prefixes. As a best practice, allow Pantheon to populate your DB configuration settings. If you need a local configuration included in your settings.php, see [settings.php](/docs/articles/drupal/configuring-settings-php).

## Export Files

This is optional, but recommended. Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they will be stored in Valhalla, our network file system.

    TARGET=~/Desktop
    SOURCE=~/Projects/mysite
    cd $SOURCE/sites/default/files
    tar -czf $TARGET/files.tar.gz .

## Upload Files to Pantheon

The import screen allows you to toggle between uploading your archive files or supplying a remote URL (e.g. Amazon S3, Dropbox, your existing server, etc.) from which the archives can be fetched.  

The max file upload import size is 100MB total. URL imports are limited to 500MB per input.

If you have a large database or a lot of files, you'll need to use the URL option. If you need to load more than 500MB of content, you'll need to use the data migration tools (e.g. [direct MySQL access](/docs/articles/local/accessing-mysql-databases), [rsync or SFTP for files](/docs/articles/local/rsync-and-sftp)) after your codebase is imported.

## Drush Site Archive Format

Drush site archive format is supported when performing site imports using [terminus](https://github.com/pantheon-systems/terminus), the Pantheon command-line tool.
