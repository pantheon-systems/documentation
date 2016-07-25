---
title: Migrating a Drupal Gardens Site to Pantheon
description: Get all the details you need to know to successfully migrate your site away from Drupal Gardens.
categories: [drupal]
tags: [migrate]
keywords: drupal, pantheon, drupal gardens, import
---
Drupal Gardens is ending support on August 1, 2016. This article walks you through exporting and migrating your site from Drupal Gardens to Pantheon.

## Export a Site from Drupal Gardens

1. Log in to your [Drupal Gardens account](https://www.drupalgardens.com/user/login).
2. Go to **My Sites**.
3. From the Actions menu next to the site you want to export, select **Export site**.
4. Select "Want to host it on a 3rd party hosting company" as the reason for exporting, and enter an explanation.
5. Click **Export**. This may take some time depending on the size of your site.
6. Once it's finished exporting, save the file (.tar.gz archive) to your computer.
7. Verify that all files are included in the site archive. If any files are missing, download them from Drupal Gardens as instructed in their [export documentation](https://www.drupalgardens.com/documentation/site-export).

Drupal Gardens may include one or more copies of the file `settings.php` in the archive. Pantheon does not need the settings.php file to import the site; to prevent import problems, it is best to simply remove settings.php using the following steps:

- tar xzvf gardenssite.tar.gz 
- rm docroot/sites/default/settings.php 
- tar cvzf gardenssite-for-pantheon.tar.gz docroot/

## Import Your Site to Pantheon
There are two ways to import your site: using our Importer tool in the Dashboard or manually importing the site. 

### Use the Importer Tool
Using our Importer during the site creation process has the following effects on the codebase:

 - New Git history
 - Replacement and upgrade to the latest core version from our [Drops-8](https://github.com/pantheon-systems/drops-8), [Drops-7](https://github.com/pantheon-systems/drops-7), or [Drops-6](https://github.com/pantheon-systems/drops-6) repository
 - Assignment of the appropriate site framework (listed above) as the code upstream, used for core updates

<div class="alert alert-info" role="alert">
<h4>Note</h4>Importing automatically upgrades to the latest version of core. It's a best practice to keep core up-to-date to benefit from security and bug fixes, but if you use a site or distribution that relies on an outdated version of core, you may experience incompatibilities. If you experience issues, see the troubleshooting documentation for <a href="https://www.drupal.org/troubleshooting"> Drupal sites</a>.</div>

The importer accepts single file site archives. It accepts file uploads up to 100MB, and can download publicly-accessible archives up to 500MB. Acceptable file types include `.tar`, `.zip`, `.gzip`, and `.sql`.

See [Migrate to Pantheon](/docs/migrate/) for detailed instructions.

### Manual Site Import

Manually import the site outside of our importer tool if any of the following apply:

- Your site exceeds file size limit for uploads.
- Your site requires an upstream to an organizational or public distribution.
- You would like to preserve the site's existing Git history.

Import code, database, and files after creating the site using a combination of command line tools (Git, mysql-cli, and rsync) or with Git and the Site Dashboard's Workflow tool. See [Migrate to Pantheon: Manual Site Import](/docs/manual-import) for detailed instructions.
