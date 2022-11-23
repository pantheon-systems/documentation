---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9 + Build Tools
subtitle: Add Database
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted-btworkflow/database
anchorid: database
editpath: drupal-9/drupal-9-hosted-btworkflow/08-database.md
reviewed: "2021-03-31"
contenttype: guide
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

<Partial file="drupal-9/migrate-add-database-part2.md" />
