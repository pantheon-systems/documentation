---
title: WordPress Multisite
subtitle: Troubleshoot
description: Review common WordPress Multisite troubleshooting scenarios.
type: guide
contenttype: [guide]
innav: [false]
categories: [cms, troubleshooting]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [multisite]
permalink: docs/guides/multisite/debug/
editpath: multisite/06-debug.md
---

This section provides information on common WordPress Multisite troubleshooting scenarios.

## WP-CLI Tips and Tricks

### Manage Multisites

The `wp site *` class of WP-CLI commands ([full documentation](https://developer.wordpress.org/cli/commands/site/)) for managing the sites on your Multisite installation. Here are some helpful ones:

- `wp site create` - Create a new site on the Multisite.
- `wp site list` - See all available sites on the Multisite.
- `wp site empty` - Clear a site of its posts and comments, while retaining options, users and other configuration details.

### Update the Database

WordPress sometimes includes database schema changes in releases. When you update WordPress to the latest version, you might see a notification in the WordPress dashboard to run the database update process. Use `wp core update-db --network` ([full documentation](https://developer.wordpress.org/cli/commands/core/update-db/)) to run the database upgrade procedure across all sites on your Multisite.

### Add and Remove Super Admins

“Super admin” is a special designation for select users on a WordPress Multisite. While a user's role may vary between sites, any user can be a super admin which gives them unrestricted access to every site on the WordPress Multisite install.

Use `wp super-admin list` to list current super admins, and `wp super-admin add` or `wp super-admin remove` to add or remove them, respectively.

## Troubleshooting

### Error: Cookies are blocked or not supported by your browser

**Solution 1:** Follow the steps in the [Basic Troubleshooting](/basic-troubleshooting#error-cookies-are-blocked-or-not-supported-by-your-browser) cookies section.

**Solution 2:** Your WPMS installation might be serving cookies from a single domain. Try serving individually:

```bash
define('ADMIN_COOKIE_PATH', '/');
define('COOKIE_DOMAIN', '');
define('COOKIEPATH', '');
define('SITECOOKIEPATH', '');
```

### Error: "Error establishing a database connection"

You may see this error when moving a WordPress Multisite database between environments. The most common cause is either using `wp search-replace` incorrectly (or having forgotten to use it at all).

Because it's a confusing error, it's helpful to understand how it's caused. This error can be reproduced by following the steps below:


1. Create a new WordPress multisite instance with one site.
1. Set the domain value in the `wp_blogs` table to `mstest.org` manually.
1. Edit the `DOMAIN_CURRENT_SITE` constant to `mstest.dev` manually.

When you visit `mstest.dev` in your browser, you'll see the “Error establishing database connection” message. Essentially, WordPress displays an error message because it couldn't find the requested site in the `wp_blogs` table.

Check out the [open WordPress.org Trac ticket](https://core.trac.wordpress.org/ticket/41424) where this message is being discussed, and will hopefully be improved in the future.

<Partial file="configure-wp-site-networks-with-integrated-composer.md" />

## More Resources

- [Troubleshooting WordPress](/guides/wordpress-pantheon/troubleshooting)

- [WordPress Known Issues](/wordpress-known-issues)

- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
