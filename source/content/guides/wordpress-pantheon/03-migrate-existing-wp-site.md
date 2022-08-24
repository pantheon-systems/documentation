---
title: WordPress on Pantheon Quick Start Guide
subtitle: Migrate an Existing WordPress Site
description: Migrate an existing WordPress site to Pantheon.
categories: [wordpress]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-02"
layout: guide
showtoc: true
permalink: docs/guides/wordpress-pantheon/migrate-existing-wp-site
anchorid: wordpress-pantheon/migrate-existing-wp-site
---

This page provides steps for migrating an existing WordPress site to Pantheon's platform. Review Pantheon's [Managed Migrations](https://pantheon.io/professional-services/website-migrations?docs) page to see if having the Pantheon Professional Services team perform your migration is a better option for you before you migrate your site.

## Prepare Your Site for Migration

Complete the following steps for the current site before beginning the migration to Pantheon.

1. Upgrade to the latest version of WordPress.

1. Fix any broken links.

1. Remove unneeded code, database tables, and files.

1. Clean up your content.

    1. Clear all pending comments. 
    
        - If you don’t check your comments regularly, you likely have thousands of spam comments in your queue.

    1. Navigate to **Posts** > **Tags** > sort by **number of posts** > delete **tags with zero posts** > consolidate tags with only one or two posts into other tags. 
    
        - Tags are important for SEO, but too many can confuse search engines.

1. Reduce your old post revisions. 

    - Post revisions can potentially double the size of your database. 

1. Audit your Plugins and Themes and remove any that you no longer use.

1. Review Pantheon's [WordPress Plugins and Themes with Known Issues](/plugins-known-issues) to see if any of your plugins or themes are listed.

1. Make sure your code is compatible with the latest recommended version of PHP for WordPress, and [adjust PHP versions](/guides/php/php-versions#configure-php-version) if needed.

1. Clear all caches.

1. Configure [SSH Keys](/ssh-keys).

## Migrate Your WordPress Site with Guided Migration

1. Install the [Pantheon Migrations](https://wordpress.org/plugins/bv-pantheon-migration/#installation) plugin.

1. Follow the [Guided WordPress Migrations](/guides/guided/) steps.

## Manually Migrate Your Site to Pantheon

You will need to manually migrate your site to Pantheon when any of the following apply:

- **The WordPress site is large:** WordPress site exceeds 500MB.

- **Git history must be preserved:** You'd like to preserve your site's existing Git commit history.

- You use [WordPress Site Networks](/migrate-wordpress-site-networks)

- **Plugin installs are unavailable on the existing WordPress site:** For example, if your existing site is hosted on WordPress.com, you'll be unable to install the Pantheon Migrations plugin.

- **The WordPress site is local:** If your WordPress site is only on your local machine and not yet live.

- **You want to debug failed migrations:** It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.

- **You use Composer:** Please contact our [Professional Services Migration team](https://pantheon.io/professional-services/website-migrations?docs=) for help.

Follow the steps below to manually migrate your site to Pantheon.

1. Complete the steps in [Prepare for Migration](#prepare-for-the-migration).

1. Complete the steps in [Manual Migration](/migrate-manual#create-pantheon-site).
