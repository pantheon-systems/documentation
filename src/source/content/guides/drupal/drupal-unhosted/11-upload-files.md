---
title: Migrate a Drupal Site from Another Platform
subtitle: Upload Files
description: 
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-unhosted/upload-files
editpath: drupal/drupal-unhosted/11-upload-files.md
contenttype: [guide]
innav: [false]
categories: [migrate]
cms: [drupal9, drupal, drupal8, drupal10]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-12-13"
---

Now that you've added your database, you need to add your files.

<Partial file="drupal/migrate-add-files-part1.md" />

1. Navigate to your Drupal site's root directory to run this command:

  <TabList>

  <Tab title="With Nested Docroot" id="code-docroot" active={true}>

  ```bash{promptUser:user}
  cd web/sites/default/files
  tar -czf ~/files.tar.gz .
  ```

  </Tab>

  <Tab title="Without Nested Docroot" id="code-nodocroot">

  ```bash{promptUser:user}
  cd sites/default/files
  tar -czf ~/files.tar.gz .
  ```

  </Tab>

  </TabList>

  Now you have created an archive file in your user's home directory.

<Partial file="drupal/migrate-add-files-part3.md" />
