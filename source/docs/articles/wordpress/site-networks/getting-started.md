---
title: Up and Running with WordPress Site Networks
description: Get started with WordPress Site Networks. Learn about the Pantheon WordPress Site Network support, start developing, or import existing networks.
---

Once a Pantheon employee has given you access to your WordPress Site Network site, you can import an existing network or start from scratch and begin developing your project on the platform.

## Migrating Site Networks to Pantheon

If your network already exists, see [Migrate to Pantheon: WordPress Site Networks](/docs/articles/sites/migrate/wordpress-site-networks/). The instructions below pertain only to new WordPress Site Networks.

## Create a Network

Before you begin, set the [connection mode to SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-mode) for the Development environment. This is required when making modifications through the WordPress Dashboard or via WP-CLI.

### Create a Network with WP-CLI (Recommended)

**Before you begin, make sure that [Terminus](/docs/articles/local/cli) is configured locally, and you’re authenticated with Pantheon.**

You can install WordPress and enable the Multisite feature with the [`wp core multisite-install`](http://wp-cli.org/commands/core/multisite-install/) command.

If you've already installed WordPress, convert an the existing site to a network in one command: `wp core multisite-convert`

This example will install and enable multisite in the subdirectory-style. Add the `--subdomains` option to the command.
```bash
terminus wp core multisite-install --site=<example-network> --title=<site-title> --admin_user=<username> --admin_password=<password> --andmin-email=<email> --url=<url> --env=dev
```
## Add Custom Domains to Dev, Test, and Live

<div class="alert alert-info" role="alert">
<h4>Note</h4>
If you’re using the subdomain configuration, you must add the domain for each site you create to the Pantheon Dashboard, and configure requisite DNS settings) in order for the site to be accessible, for each environment you intend on serving it from.</div>
<div class="alert alert-info" role="alert">
<h4>Subdirectory Note</h4>
Custom primary domains are not required for plain Subdirectory configurations, until the site network goes live.</div>
If you are running a subdomain-style site network, and need to add sites to the network on the dev environment before cloning it to Test and Live, you must add custom domains, with the `www.` subdomain, to all environments. For the site, `www.example-network.com`, use the following Terminus commands to prepare the site.

```bash
terminus site hostnames add www.dev.example-network.com --site=example-network --env=dev
terminus site hostnames add www.test.example-network.com --site=example-network --env=test
# Until you actually go live, you'll likely want to use a subdomain like beta.example-network.com.
terminus site hostnames add beta.example-network.com --site=example-network --env=live
# If you're ready to launch
terminus site hostnames add www.example-network.com --site=example-network --env=live
terminus site hostnames add example-network.com --site=example-network --env=live
```
Add the above subdomains to your DNS for the domain, using the recommended settings from the site dashboard's domain panel for each environment.

For subdomain-style networks, it is also useful to add the following wildcard DNS entries,

- `*.dev` CNAME to `dev-example-network.pantheon.io`,
- `*.test` CNAME to `test-example-network.pantheon.io`, and
- `*.` CNAME to `live-example-network.pantheon.io`.

### Modify `DOMAIN_CURRENT_SITE`

For compatibility with Pantheon, you’ll need to update `DOMAIN_CURRENT_SITE` to be set conditionally based on environment. Here is an example:

<script src="https://gist-it.appspot.com/https://github.com/pantheon-systems/documentation/blob/master/source/docs/articles/wordpress/site-networks/switch.php"></script>

### Creating a Network through WordPress Dashboard

WordPress Site Networks can also be created from the WordPress Dashboard by following the [instructions at the codex](http://codex.wordpress.org/Create_A_Network).

Once you’ve created the network, you’ll be taken to a new page:

![WordPress Network Admin Setup](/source/docs/assets/images/wp-network-setup.png)

Copy the first block and add it to your site’s `wp-config.php` file.

Add the constants to your wp-config right below where you added the `WP_ALLOW_MULTISITE` constant.

As in the WP-CLI conversion method example above, instead of defining `DOMAIN_CURRENT_SITE` explicitly, you’ll want to define it conditionally based on environment. Here is an example:

<script src="https://gist-it.appspot.com/https://github.com/pantheon-systems/documentation/blob/master/source/docs/articles/wordpress/site-networks/switch.php"></script>

Ignore the second block of code. Pantheon containers use Nginx + PHP-FPM, not Apache, and `.htaccess` files have no effect.

Once you log back in to WordPress, pat yourself on the back — you’ve completed the Multisite installation process.

## Develop the Site Network

Now that you’ve made it through the installation process, congratulations on setting up your first WordPress Multisite environment. You are on your way to glory!

When logged in to the WordPress Dashboard, you'll see a new “My Sites” menu item in the Toolbar. Use that create your first site via the Network Admin:

![WordPress Site Network Dashboard](/source/docs/assets/images/wp-network-admin-sites.png)

<div class="alert alert-info" role="alert">
<h4>Note</h4>
If you’re using the subdomain configuration, you must add the domain for each site you create to the Pantheon Dashboard (as well as configuring requisite DNS settings) in order for the site to be accessible. </div>

Spend a little time exploring the WordPress Network Dashboard to become familiar with the variety of additional settings you now have. Take a look at what options are available for each site you create, how to manage users across WordPress Multisite, and the grab bag of Network Settings.

Once you feel comfortable with the WordPress Network Dashboard, you’ll be ready to learn how to use the [Pantheon Workflow with WordPress Multisite](/docs/articles/wordpress/site-networks/managing/), and pick up a few additional [tips and tricks](/docs/articles/wordpress/site-networks/managing#tips-and-tricks/).

## Wipe Development Environment to Start Over

If you find you need to start over and reinstall WordPress, you can:

1. Wipe the Development environment’s database and files. This operation leaves the codebase in tact. Visit the Pantheon Site Dashboard’s Development environment, and select the Workflow tool's “Wipe” function. From the command line: `terminus site wipe --env=dev`

2. Remove the Multisite constant definitions block you added from `wp-config.php`.

3. Visit the Development environment URL to reinstall WordPress.
