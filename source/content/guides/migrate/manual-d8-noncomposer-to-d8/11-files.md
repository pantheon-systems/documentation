---
title: Migrate a Drupal 8 Site That Is Not Managed With Composer From Another Platform
subtitle: Upload Your Files
description: 
cms: "Drupal 8"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
permalink: docs/guides//manual-d8-noncomposer-to-d8/files
anchorid: files
editpath: migrate/manual-d8-noncomposer-to-d8/11-files.md
reviewed: "2021-06-22"
---

Now that you've added your database, you need to add your files.

**Files** refer to anything within `sites/default/files`, which typically includes uploaded images, along with generated stylesheets, aggregated scripts, etc. Files are not under Git version control and are stored separately from the site's code.

You can use the Pantheon Dashboard, SFTP, or Rsync to upload your site's files.

1. Export a `tar.gz` or `.zip` file of your files directory:

  Navigate to your Drupal site's root directory to run this command, which will create an archive file in your user's home directory:

  ```bash{promptUser: user}
  cd sites/default/files
  tar -czf ~/files.tar.gz .
  ```

1. Select the **<span class="fa fa-wrench"></span> Dev** environment in the Site Dashboard.

1. Select **<span class="fa fa-server"></span> Database / Files**.

1. Click **Import** and add your archive accordingly (based on file size):

  <TabList>

  <Tab title="Up to 100MBs" id="100mbs" active={true}>

  If your archive is under 100MB, you can upload the file directly:

   1. Click **File** in the **MySQL database** field > **Choose File**.

   1. Select your local archive file and click **Import**.

     ![Import MySQL database from file](../../../../images/dashboard/import-mysql-file.png)

  **Note:** If you recently imported the database and need to re-import, refresh the page and use a new filename for the database file.

  </Tab>

  <Tab title="Up to 500MBs" id="500mbsfiles">

  If your archive is less than 500MB, you can import it from URL:

   1. Click **URL** in the **Archive of site files** field.

   1. Paste a publicly accessible URL for the archive and click **Import**.

      - Change the end of the Dropbox URLs from `dl=0` to `dl=1` to ensure that your archive imports correctly.

  </Tab>

  <Tab title="Over 500MBs" id="500mbsplusfiles">

  Rsync is an excellent method for transferring a large number of files. After performing an initial rsync, subsequent jobs will only transfer the latest changes. This can help minimize the amount of time a site is in an unpredictable state (or offline) during the final step of a migration, as it allows you to bring over only new content, rather than re-copying every single file.

  We recommend looking into the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) as a helper when doing these operations, as the number of command line arguments and specifics of directory structure make it easy for human error to impact your operation.

  To sync your current directory to Pantheon, run the following command:

  ```bash{promptUser: user}
  terminus rsync . my_site.dev:files
  ```

  When using Rsync manually, the script below is useful for dealing with transfers that are interrupted due to connectivity issues. It uploads files to your Pantheon site's **<span class="glyphicons glyphicons-wrench"></span> Dev** environment. If an error occurs during transfer, it waits two minutes and picks up where it left off:

  <Download file="manual-rsync-script.sh" />

  GITHUB-EMBED https://github.com/pantheon-systems/documentation/blob/main/source/scripts/manual-rsync-script.sh.txt bash GITHUB-EMBED

  </Tab>

  </TabList>
