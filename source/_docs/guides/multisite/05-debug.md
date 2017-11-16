---
title: WordPress Site Networks
subtitle: Best Practices and Common Issues
description: Overview of WordPress multisite support on the Pantheon Platform.
multisite: true
anchorid: debug
generator: pagination
layout: guide
pagination:
    provider: data.multisitepages
use:
    - multisitepages
permalink: docs/guides/multisite/debug/
previousurl: guides/multisite/workflow/
editpath: multisite/05-debug.md
image: multisite
---

## Using Composer with WordPress in nested docroot


## Error: "Error establishing a database connection"

You may see this error when moving a WordPress Site Network database between environments. The most common cause is either using `wp search-replace` incorrectly (or having forgotten to use it at all).

Because it’s a confusing error, it’s helpful to understand how it’s caused. This error can be reproduced by:


1. Creating a new WordPress multisite instance with one site.
2. Manually setting the domain value in the `wp_blogs` table to `mstest.org`.
3. Manually editing the `DOMAIN_CURRENT_SITE` constant to `mstest.dev`.

When you visit `mstest.dev` in your browser, you’ll see the “Error establishing database connection” message. Essentially, WordPress displays an error message because it couldn't find the requested site in the `wp_blogs` table.

Check out the [open WordPress.org Trac ticket](https://core.trac.wordpress.org/ticket/41424) where this messaging will hopefully be improved in the future.


## Error: “Site Not Found”

After running `wp search-replace` on a WordPress Site Network with a persistent object cache enabled, you may see a message like this:


    Success: Made 2419 replacements. Please remember to flush your persistent object cache with `wp cache flush`.

However, running `wp cache flush` may produce a "Error: site not found" message if the old domain lookup value is still in cache.

Et voila! You've entered an indeterminate state where you'd expect you could flush cache against the new URL, but the cache still has the old URL, so you need to flush cache against the old URL before the new URL works.

Follow along on [this GitHub issue](https://github.com/wp-cli/cache-command/issues/17) to see when execution is improved in WP-CLI.
