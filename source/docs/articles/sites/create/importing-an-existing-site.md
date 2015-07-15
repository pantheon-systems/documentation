---
title: Importing an Existing Site to Pantheon
description: Detailed information on how to prepare and import your existing Drupal or WordPress site to Pantheon.
category:
  - drupal
keywords: import, importing site, pantheon, new site, drupal
---
Once you have exported your [WordPress](/docs/articles/wordpress/export-an-existing-wordpress-site) or [Drupal](/docs/articles/drupal/prepare-drupal-for-export) site archives, you can easily import the site to Pantheon using the Dashboard.

<div class="alert alert-danger" role="alert"><strong>Warning: </strong>Importing automatically upgrades to the latest version of core. It's a best practice to keep core up-to-date to benefit from security and bug fixes, but if you use a site or distribution that relies on an outdated version of core, you may experience incompatibilities. If you experience issues, see the troubleshooting documentation for your <a href="https://codex.wordpress.org/Updating_WordPress#Troubleshooting">WordPress</a> or <a href="https://www.drupal.org/troubleshooting"> Drupal</a> upstream.</div>

## Add and Name a Site

After you have created an account, you can log in and will be directed to your Dashboard. Click **Add a site**. You will first be prompted to name the site. The only valid characters are letters, numbers, and dashes. Enter a name and click **Create Site**.
![](/source/docs/assets/images/desk_images/247523.png)
## Wait While It's Configured
You will then have a short wait while Pantheon creates and allocates the resources for your site's environments. This takes only a few minutes under normal circumstances.
![](/source/docs/assets/images/desk_images/247524.png)
## Choose a Start State
You now have several options. Rather than start with one of our preconfigured start states, we will import our code, database, and files.

Select **Import manually**.<br />
![](/source/docs/assets/images/desk_images/247521.png)  
Once selected, you can upload a single URL or file archive of the site.  
![](/source/docs/assets/images/desk_images/259156.png)  
Alternatively, you can enter the URL to your site code (required), user files (optional) and database (optional).
![](/source/docs/assets/images/desk_images/247522.png)

## Distributions

If your site uses a distribution powered by an alternate upstream, such as Commerce Kickstart, you'll want to create a new site instead of using the import an existing site tool. This will allow you to get the upstream's updates on your site as they become available.

First, choose your distribution and visit your site's Dashboard once it's been created. You'll need to clone your new site using Git. Once cloned, synchronize the code locally and merge in favor of the Pantheon master branch for any conflicts. Then, push the code back up to your Pantheon site repository. For instructions on how to clone using Git, see [Starting with Git](/docs/articles/local/starting-with-git/).

Finally, use the import tools within your Pantheon site's Dashboard to import your database and site files into the Dev environment (Workflow > Import).
 ![Import tool for database and files](/source/docs/assets/images/import-tool-db-and-files.png)



## Upload Files to Pantheon

The import screen allows you to toggle between uploading your archive files or supplying a remote URL (e.g. Amazon S3, Dropbox, your existing server, etc.) from which the archives can be fetched.

<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Dropbox URL's need to be modified so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.  </div>

The max file upload import size is 100MB total. URL imports are limited to 500MB per input.

If you have a large database or a lot of files, you'll need to use the URL option. If you need to load more than 500MB of content, use the data migration tools (e.g. [direct MySQL access](/source/docs/articles/local/accessing-mysql-databases), [rsync or SFTP for files](/source/docs/articles/local/rsync-and-sftp)) after your codebase is imported.

## Import Single-File Archives

If your single-file site archives are hosted at a public URL, you can use [Terminus](https://github.com/pantheon-systems/cli), the Pantheon command-line tool, to create a site and import everything in one command.

In order to import a Drush archive, use:
```bash
terminus sites create [--name=<name>] [--label=<label>] [--org=<org>] [--import=<url>]
```
## Test Your Site
The following warning can appear on newly created site Dashboards where the import of your archive failed:
![Unable to Load Git History](/source/docs/assets/images/unable-to-load-git-history.png)

Verify the steps for preparing your [WordPress](/docs/articles/wordpress/export-an-existing-wordpress-site) or [Drupal](/docs/articles/drupal/prepare-drupal-for-export) archives manually and re-create the archive. Return to the site configuration page as instructed above and import the verified archive.

We advocate using a behavioral testing framework to automate user acceptance testing. Please test your site on the platform. We recommend:

 - Using the Launch Check tool in the site Dashboard
 - Enabling our free New Relic Add on
 - Automated user acceptance testing with Behat, Selenium, or Casper.js
 - Load testing using tools like [Blazemeter](/docs/guides/load-testing-with-blazemeter/)
 - Logging in and clicking around your site.


## Go Live
Read our [Going Live Documentation](/docs/articles/going-live).
