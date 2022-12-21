---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal + Build Tools
subtitle: Add Database
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-hosted-btworkflow/database
anchorid: database
editpath: drupal/drupal-hosted-btworkflow/08-database.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate, database]
newcms: [drupal8, drupal9, drupal10]
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

<Partial file="drupal/migrate-add-database-part2.md" />
