---
title: Migrate a Site From WP Engine to Pantheon Using Guided Migration
subtitle: Troubleshooting
description: Resolve issues that may occur during migration.
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/wpengine/troubleshooting
anchorid: troubleshooting
editpath: migrate/wpengine/07-troubleshooting.md
reviewed: "2021-06-15"
---

<Partial file="migrate/troubleshooting-migrate-general.md" />

### Migration Fails

WP Engine blocks the Let's Encrypt challenge file, so you should schedule a [maintenance window](/guides/launch/domains/#maintenance-window) for HTTPS. If your migration fails, you can try the following workaround:

1. Create and download a backup point from WP Engine.

2. Unzip your site's backup point on your local machine.

3. Remove the WP Engine remnants. There are a few files you'll need to remove:

   - Drop-in plugins (e.g. `wpengine-common`) located at: `\wp-content\mu-plugins`

   - `.gitattributes` and `.gitignore` from the root folder

   - If object caching is enabled, remove the `object-cache.php` file located in `/wp-content`

4. Replace the existing `wp-config.php` with [Pantheon's `wp-config.php`](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php) file. Preserve necessary logic from your existing file.

5. Move the `mysql.sql` database from the `wp-content` directory and place it in the project's root directory.

6. Follow the procedure to [manually migrate](/migrate-manual) your site.

<Partial file="migrate/troubleshooting-wordpress.md" />
