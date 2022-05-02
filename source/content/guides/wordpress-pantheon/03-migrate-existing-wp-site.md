---
title: WordPress on Pantheon Guide
subtitle: Migrate a WordPress Site
description: Migrate an existing WordPress site to Pantheon.
categories: [wordpress]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-02"
layout: guide
permalink: docs/guides/wordpress-pantheon/migrate-existing-wp-site
anchorid: wordpress-pantheon/migrate-existing-wp-site
---

This page provides steps for migrating an existing WordPress site to Pantheon's platform. Review Pantheon's [Managed Migrations](https://pantheon.io/professional-services/website-migrations?docs) page to see if this is a better option for you before you migrate your site.

## Prepare for the Migration

Complete the following steps for the current site before beginning the migration.

1. Upgrade the latest version of WordPress.

1. Review [WordPress Plugins and Themes with Known Issues](/plugins-known-issues) to see if any of your plugins or themes are listed.

1. Make sure your code is compatible with the latest recommended version of PHP for WordPress, and [adjust PHP versions](/php-versions#configure-php-version) if needed.

1. Remove unneeded code, database tables, and files.

1. Clear all caches.

1. Configure [SSH Keys](/ssh-keys).

## Migrate Your WordPress Site

1. Install the [Pantheon Migrations](https://wordpress.org/plugins/bv-pantheon-migration/#installation) plugin.

1. Follow the [Guided WordPress Migrations](/migrate#migrate-existing-sites) steps.

## Manually Migrate a Site to Pantheon

You will need to manually migrate your site to Pantheon when any of the following apply:

- Large WordPress Site: WordPress site exceeds 500MB.

- Preserve Git History: You'd like to preserve your site's existing Git commit history.

- [WordPress Site Networks](/migrate-wordpress-site-networks)

- Plugin install unavailable on existing WordPress site: For example, if your existing site is hosted on WordPress.com, you'll be unable to install the Pantheon Migrations plugin.

- Local WordPress Site: If your WordPress site is only on your local machine and not yet live.

- Debug Failed Migration: It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.

- You use Composer (please contact our [Professional Services Migration team](https://pantheon.io/professional-services/website-migrations?docs=) for help.)

1. Complete the steps in [Prepare for Migration](/guides/wordpress-pantheon/migrate-existing-site/#prepare-for-migration).

1. Complete the steps in [Manual Migration](/migrate-manual#create-pantheon-site).