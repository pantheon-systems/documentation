---
title: WordPress Site Networks
subtitle: Troubleshoot
description: Overview of WordPress multisite support on the Pantheon Platform.
multisite: true
anchorid: debug
generator: pagination
layout: guide
type: guide
cms: "WordPress"
categories: [troubleshoot]
tags: [multisite]
permalink: docs/guides/multisite/debug/
editpath: multisite/05-debug.md
image: multisite
getfeedbackform: default
---

## WP-CLI Tips and Tricks

### Managing Site Networks

The `wp site *` class of WP-CLI commands ([full documentation](https://developer.wordpress.org/cli/commands/site/)) for managing the sites installed on your network. Here are some helpful ones:

- `wp site create` - Create a new site on the network.
- `wp site list` - See all available sites on the network.
- `wp site empty` - Clear a site of its posts and comments, while retaining options, users and other configuration details.

### Updating the Database

WordPress sometimes includes database schema changes in releases. When you update WordPress to the latest version, you might see a notification in the WordPress dashboard to run the database update process. Use `wp core update-db --network` ([full documentation](https://developer.wordpress.org/cli/commands/core/update-db/)) to run the database upgrade procedure across all sites on your Site Network.

### Adding and removing super admins

“Super admin” is a special designation for select users on a WordPress Site Network. While a user's role may vary between sites on the network, any user can be a super admin which gives them unrestricted access to every site on the network.

Use `wp super-admin list` to list current super admins, and `wp super-admin add` or `wp super-admin remove` to add or remove them, respectively.

## Troubleshooting

### Error: "Error establishing a database connection"

You may see this error when moving a WordPress Site Network database between environments. The most common cause is either using `wp search-replace` incorrectly (or having forgotten to use it at all).

Because it's a confusing error, it's helpful to understand how it's caused. This error can be reproduced by:


1. Creating a new WordPress multisite instance with one site.
2. Manually setting the domain value in the `wp_blogs` table to `mstest.org`.
3. Manually editing the `DOMAIN_CURRENT_SITE` constant to `mstest.dev`.

When you visit `mstest.dev` in your browser, you'll see the “Error establishing database connection” message. Essentially, WordPress displays an error message because it couldn't find the requested site in the `wp_blogs` table.

Check out the [open WordPress.org Trac ticket](https://core.trac.wordpress.org/ticket/41424) where this message is being discussed, and will hopefully be improved in the future.

### Error: “Site Not Found”

After running `wp search-replace` on a WordPress Site Network with a persistent object cache enabled, you may see a message like this:

```bash
Success: Made 2419 replacements. Please remember to flush your persistent object cache with `wp cache flush`.
```

However, running `wp cache flush` may produce an "Error: site not found" message if the old domain lookup value is still in cache.

You've entered an indeterminate state where you'd expect you could flush cache against the new URL, but the cache still has the old URL, so you need to flush cache against the old URL before the new URL works.

Follow along on [this GitHub issue](https://github.com/wp-cli/cache-command/issues/17) to see when execution is improved in WP-CLI.
