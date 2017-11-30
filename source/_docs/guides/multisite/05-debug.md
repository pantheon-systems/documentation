---
title: WordPress Site Networks
subtitle: Troubleshoot
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
{% include("content/notes/multisite.html") %}

## WP-CLI Tips and Tricks
### Managing Site Networks
The `wp site *` class of WP-CLI commands ([full documentation](https://developer.wordpress.org/cli/commands/site/){.external}) for managing the sites installed on your network. Here are some helpful ones:

- `wp site create` - Create a new site on the network.
- `wp site list` - See all available sites on the network.
- `wp site empty` - Clear a site of its posts and comments, while retaining options, users and other configuration details.

### Updating the Database
WordPress sometimes includes database schema changes in releases. When you update WordPress to the latest version, you might see a notification in the WordPress dashboard to run the database update process. Use `wp core update-db --network` ([full documentation](https://developer.wordpress.org/cli/commands/core/update-db/){.external}) to run the database upgrade procedure across all sites on your Site Network.

### Adding and removing super admins
“Super admin” is a special designation for select users on a WordPress Site Network. While a user's role may vary between sites on the network, any user can be a super admin which gives them unrestricted access to every site on the network.

Use `wp super-admin list` to list current super admins, and `wp super-admin add` or `wp super-admin remove` to add or remove them, respectively.


### Mapping custom hostnames to environments
WordPress Site Networks using subdomains will require unique hostnames for each additional site in the network. For those using subdirectories, unique hostnames are optional.

Let's use a hypothetical Pantheon account called `treefarm`. This developer has created a WordPress Site Network in their Dev environment that has the domain `dev-treefarm.pantheonsite.io`. The main site on the network loads, so that works great.

This developer then proceeds to create a second site on the network called “apple”. By default, WordPress will give this site a domain of `apple.dev-treefarm.pantheonsite.io`. However, the `pantheonsite.io` domain doesn't handle sub-sub-domains, so this second site won't load until there's a custom domain mapped to it.

Fortunately, this developer has access to their DNS control panel.

First, this developer creates a `*.dev.treefarm.com` wildcard CNAME record that maps to `dev-treefarm.pantheonsite.io`. Doing so ensures all hostnames mapped to the environment will load without additional DNS records.

Second, this developer maps both domains to the Pantheon Dev environment:


    # terminus domain:add <site>.<env> <domain-to-map>
    terminus domain:add treefarm.dev dev.treefarm.com
    terminus domain:add treefarm.dev apple.treefarm.com

Lastly, this developer updates the conditional `DOMAIN_CURRENT_SITE` definition in their `wp-config.php` file to accommodate the site's new primary domain.

Once these three steps are complete, both sites on the WordPress Site Network live at their new URLs.

## Troubleshooting
### Error: "Error establishing a database connection"
You may see this error when moving a WordPress Site Network database between environments. The most common cause is either using `wp search-replace` incorrectly (or having forgotten to use it at all).

Because it's a confusing error, it's helpful to understand how it's caused. This error can be reproduced by:


1. Creating a new WordPress multisite instance with one site.
2. Manually setting the domain value in the `wp_blogs` table to `mstest.org`.
3. Manually editing the `DOMAIN_CURRENT_SITE` constant to `mstest.dev`.

When you visit `mstest.dev` in your browser, you'll see the “Error establishing database connection” message. Essentially, WordPress displays an error message because it couldn't find the requested site in the `wp_blogs` table.

Check out the [open WordPress.org Trac ticket](https://core.trac.wordpress.org/ticket/41424){.external} where this messaging message is being discussed, and will hopefully be improved in the future.


### Error: “Site Not Found”
After running `wp search-replace` on a WordPress Site Network with a persistent object cache enabled, you may see a message like this:

```bash
Success: Made 2419 replacements. Please remember to flush your persistent object cache with `wp cache flush`.
```

However, running `wp cache flush` may produce an "Error: site not found" message if the old domain lookup value is still in cache.

You've entered an indeterminate state where you'd expect you could flush cache against the new URL, but the cache still has the old URL, so you need to flush cache against the old URL before the new URL works.

Follow along on [this GitHub issue](https://github.com/wp-cli/cache-command/issues/17){.external} to see when execution is improved in WP-CLI.
