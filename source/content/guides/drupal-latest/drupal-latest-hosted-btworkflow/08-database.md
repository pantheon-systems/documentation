---
title: Migrate a Site Created With the Pantheon Dashboard to drupal:latest + Build Tools
subtitle: Add Database
description: 
<<<<<<< HEAD:source/content/guides/drupal-latest/drupal-latest-hosted-btworkflow/08-database.md
cms: "Drupal"
=======
cms: "drupal:latest"
>>>>>>> eec42263af4cf5e002bae842ccae64ea51704a74:source/content/guides/drupal-latest/drupal-latest-hosted-btworkflow/08-database.md
tags: [code, launch, migrate, site, updates, D8, D9]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-hosted-btworkflow/database
anchorid: database
editpath: drupal-latest/drupal-latest-hosted-btworkflow/08-database.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate, database]
newcms: [drupal]
audience: [development]
product: [terminus]
integration: [--]
---

The **Database** import requires a single `.sql` dump that contains the site's content and configurations.

1. Navigate to your existing site's Dashboard.

1. In the Live environment, select **<span class="fa fa-server"></span> Database / Files**.

1. Click **Export Database**.

1. Download the resulting file, or copy the URL for archives over 500 MB.

Import the archive:

<Partial file="drupal-latest/migrate-add-database-part2.md" />
