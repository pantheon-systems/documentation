---
title: WordPress Site Networks
subtitle: Configuring a New Site Network
description: Overview of WordPress multisite support on the Pantheon Platform.
multisite: true
anchorid: config
generator: pagination
layout: guide
pagination:
    provider: data.multisitepages
use:
    - multisitepages
permalink: docs/guides/multisite/config/
nexturl: guides/multisite/workflow/
previousurl: guides/multisite/considerations/
editpath: multisite/03-config.md
image: multisite
---
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Setting up a site network on top of a vanilla WordPress installation is not supported. It must be created by a Pantheon employee.</p>
</div>

Prior to converting a single-site WordPress install to a WordPress Site Network, there are two important preparation steps you need to take:


1. Contact Pantheon support to make sure your plan supports WordPress Site Networks.
2. Review “Site Network Considerations” to understand the specific decisions you’ll be making.

Already have a WordPress Site Network that you’d like to import into Pantheon? See [Migrate to Pantheon: WordPress Site Networks](https://pantheon.io/docs/wordpress-site-networks/). The instructions below pertain only to new WordPress Site Networks.

## Before you begin

Under the hood, configuring a new WordPress Site Network does two things:


1. Modifies the `wp-config.php` file to include additional constants (e.g. `MULTISITE`  and `DOMAIN_CURRENT_SITE`).
2. Adds new global database tables. Subsequently, each site you add to your WordPress Site Network will create new database tables specific to the site.

For the former, you’ll need to set the [connection mode to SFTP](https://pantheon.io/docs/sftp#sftp-mode) for the Development environment. Doing so will permit the `wp-config.php` file to be modified so that you can eventually commit your changes.


## Creating a Site Network with Terminus and WP-CLI (recommended)

Terminus lets you create a WordPress Site Network with the execution of a single command.

First, make sure that [Terminus](https://pantheon.io/docs/terminus) is configured locally and you’re authenticated with Pantheon.


    $ terminus whoami
    aghost@pantheon.io

Next, you have a small decision tree:


1. If you haven’t yet run the WordPress installer, use the `wp core multisite-install` command ([full documentation](https://developer.wordpress.org/cli/commands/core/multisite-install/)). This command both installs WordPress *and* converts the WordPress install to a WordPress Site Network.
2. If you’ve already installed WordPress, use the `wp core multisite-convert` command ([full documentation](https://developer.wordpress.org/cli/commands/core/multisite-install/)). This command only modifies `wp-config.php` and creates the global database tables.

In both cases, the default behavior is to create a Site Network with the subdirectory configuration. To create your network with the subdomain configuration, add the `--subdomains` flag.

Once you’re ready, install a new WordPress Site Network with Terminus by running:


    terminus wp <site>.<env> -- core multisite-install --url=<url> --title=<site-title> --admin_user=<username> --admin_email=<email>

Or, convert an existing WordPress install to a WordPress Site Network by running:


    terminus wp <site>.<env> -- core multisite-convert

If you install a new WordPress Site Network, you should see output similar to this:

@todo example


## Updating `wp-config.php` to handle multiple environments

By default, WP-CLI will add a `DOMAIN_CURRENT_SITE` constant that fixes your WordPress Site Network to a specific URL. To make it easier for your code to move between environments, you can set the `DOMAIN_CURRENT_SITE` value conditionally based on the environment.

The following code snippet assumes you’ve mapped a custom domain to the Live environment, and have left Test and Dev environments at their default `pantheonsite.io` URL. Replace `<site>` with your Pantheon site name.


```php
/**
 * Define DOMAIN_CURRENT_SITE conditionally.
 */
if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  switch( $_ENV['PANTHEON_ENVIRONMENT'] ) {
    case 'live':
      // Value should be the primary domain for the Site Network
      define( 'DOMAIN_CURRENT_SITE', 'example-network.com' );
      break;
    case 'test':
      define( 'DOMAIN_CURRENT_SITE', 'test-<site>.pantheonsite.io' );
      break;
    case 'dev':
      define( 'DOMAIN_CURRENT_SITE', 'dev-<site>.pantheonsite.io' );
      break;
    default:
      define( 'DOMAIN_CURRENT_SITE', $_ENV['PANTHEON_ENVIRONMENT'] . '-' . $_ENV['PANTHEON_SITE_NAME'] . '.pantheonsite.io' );
      break;
    }
}
```
The astute programmer will notice the ‘test’ and ‘dev’ cases are redundant. Feel free to remove if you don’t need custom primary domain values for those environments.

## Creating a Site Network through the WordPress Dashboard

WordPress Site Networks can also be created from the WordPress Dashboard by following the [instructions at the codex](https://codex.wordpress.org/Create_A_Network).

Once you’ve created the network, you’ll be taken to a new page:

@todo embed screenshot

Copy the first block and add the constants to the `wp-config.php` file, right below where you added the `WP_ALLOW_MULTISITE` constant.

As in the Terminus installation method example, instead of defining `DOMAIN_CURRENT_SITE` explicitly, you’ll want to define it conditionally based on environment. Here is an example:

@todo embed example

Ignore the second block of code (adding new `.htaccess` rules). Pantheon containers use Nginx + PHP-FPM, not Apache, and `.htaccess` files have no effect.

Once you log back in to WordPress, pat yourself on the back — you’ve completed the Multisite installation process.


## Mapping domains to environments


## Helpful plugins
