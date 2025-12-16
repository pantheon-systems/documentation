---
title: Upgrade a Drupal Site Created With the Pantheon Dashboard to the Latest Version of Drupal + Build Tools
subtitle: Upload Files
description: 
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-hosted-btworkflow/upload-files
editpath: drupal/drupal-hosted-btworkflow/11-upload-files.md
reviewed: "2022-12-12"
contenttype: [guide]
innav: [false]
categories: [update]
cms: [drupal, drupal9, drupal10]
audience: [development]
product: [--]
integration: [--]
---

<Partial file="drupal/migrate-add-files-part1.md" />

1. Navigate to your Drupal site's root directory to run this command:

   ```bash{promptUser:user}
   cd sites/default/files
   tar -czf ~/files.tar.gz .
   ```
   Now you have created an archive file in your user's home directory.
   
<Partial file="drupal/migrate-add-files-part3.md" />
