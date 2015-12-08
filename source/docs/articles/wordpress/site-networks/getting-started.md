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

If you’re comfortable with the command line, Terminus and WP-CLI let you convert an existing WordPress environment to Multisite in one command: `wp core multisite-convert`

Before you begin, make sure that:

- Your WordPress environment is installed and functioning as expected.

- [Terminus](/docs/articles/local/cli) is configured locally, and you’re authenticated with Pantheon.

Once you’ve confirmed these prerequisites, you can enable WordPress Multisite with one command.

Subdirectory style:
```bash
terminus wp core multisite-convert --site=<pantheon-site> --env=dev
```

Subdomains style:
```bash
terminus wp core multisite-convert --site=<pantheon-site> --env=dev --subdomains
```

Optionally specify --title to use a custom title for your Multisite Network:

```bash
terminus wp core multisite-convert --site=<pantheon-site> --env=dev --title=”My Awesome Multisite Network”
```
### Modify `DOMAIN_CURRENT_SITE`

For compatibility with Pantheon, you’ll need to update `DOMAIN_CURRENT_SITE` to be set conditionally based on environment. Here is an example:

<script src="https://gist.github.com/danielbachhuber/69c44664d4d63a6e19db.js"></script>

### Creating a Network through WordPress Dashboard

WordPress Site Networks can also be created from the WordPress Dashboard by following the [instructions at the codex](http://codex.wordpress.org/Create_A_Network).

Once you’ve created the network, you’ll be taken to a new page:

![WordPress Network Admin Setup](/source/docs/assets/images/wp-network-setup.png)

Copy the first block and add it to your site’s `wp-config.php` file.

Add the constants to your wp-config right below where you added the `WP_ALLOW_MULTISITE` constant.

As in the WP-CLI conversion method example above, instead of defining `DOMAIN_CURRENT_SITE` explicitly, you’ll want to define it conditionally based on environment. Here is an example:

<script src="https://gist.github.com/danielbachhuber/69c44664d4d63a6e19db.js"></script>

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
