---
title: WordPress Site Networks
subtitle: Configure
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
2. Review [Considerations](/docs/guides/multisite/considerations/) to understand the specific decisions you'll be making.

Already have a WordPress Site Network that you'd like to import into Pantheon? See [Migrate to Pantheon: WordPress Site Networks](/docs/wordpress-site-networks/). The instructions below pertain only to new WordPress Site Networks.

## Before you begin
Under the hood, configuring a new WordPress Site Network does two things:


1. Modifies the `wp-config.php` file to include additional constants (e.g. `MULTISITE`  and `DOMAIN_CURRENT_SITE`).
2. Adds new global database tables. Subsequently, each site you add to your WordPress Site Network will create new database tables specific to the site.

For the former, you'll need to set the [connection mode to SFTP](/docs/sftp#sftp-mode) for the Development environment. This allows the `wp-config.php` file to be modified.

The expectation is that you haven't yet run the WordPress installer on your Pantheon site. If you visit the dev domain, you should get redirected to the web-based installer.

Also, as we work through this guide, you'll notice Terminus example usage that includes `<site>` and `<env>` as placeholders. There are also other placeholders within `<>` brackets. Whenever you see these, you're expected to replace them with their correct values.

## Creating a Site Network with Terminus and WP-CLI (Recommended)
[Terminus](/docs/terminus) and WP-CLI lets you create a WordPress Site Network with the execution of a single command.

First, make sure that Terminus is configured locally and you're authenticated with Pantheon.

``` bash
$ terminus whoami
aghost@pantheon.io
```

Next, you have a small decision tree:

1. If you haven't yet run the WordPress installer, use the `wp core multisite-install` command ([full documentation](https://developer.wordpress.org/cli/commands/core/multisite-install/){.external}). This command both installs WordPress *and* converts the WordPress install to a WordPress Site Network.
2. If you've already installed WordPress, use the `wp core multisite-convert` command ([full documentation](https://developer.wordpress.org/cli/commands/core/multisite-install/){.external}). This command only modifies `wp-config.php` and creates the global database tables.

In both cases, the default behavior is to create a Site Network with the subdirectory configuration. To create your network with the subdomain configuration, add the `--subdomains` flag to either WP-CLI command.

Once you're ready, install a new WordPress Site Network with Terminus by running:

```bash
terminus wp <site>.<env> -- core multisite-install --url=<url> --title=<site-title> --admin_user=<username> --admin_email=<email>
```

Make sure to include all required arguments, otherwise you'll seen an error.

Or, convert an existing WordPress install to a WordPress Site Network by running:

```bash
  terminus wp <site>.<env> -- core multisite-convert
```

When you install a new WordPress Site Network, you should see output similar to this:

```nohighlight
$ terminus wp sitenetworks.dev -- core multisite-install --url=dev-sitenetworks.pantheonsite.io --title="Site Networks" --admin_user=aghost --admin_email=aghost@pantheon.io
Admin password: abcdefgnotarealpassword
Created single site database tables.
Set up multisite database tables.
Added multisite constants to 'wp-config.php'.
Success: Network installed. Don't forget to set up rewrite rules.
```

Et voila! Your WordPress Site Network is now installed.

## Updating `wp-config.php` to handle multiple environments

By default, WP-CLI will add a `DOMAIN_CURRENT_SITE` constant to your `wp-config.php`  file that fixes your WordPress Site Network to a specific URL. If you go back to your Pantheon dashboard, you'll see the modification made to the `wp-config.php` file.

To make it easier for your code to move between environments, you can set the `DOMAIN_CURRENT_SITE` value conditionally based on the environment. When you use the following code snippet, make sure to replace the existing definition of the `DOMAIN_CURRENT_SITE` constant, and edit the placeholder values with their correct values.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Comment out/remove DOMAIN_CURRENT_SITE set by wp cli install command, otherwise php notice.</p>
</div>

```
/**
 * Define DOMAIN_CURRENT_SITE conditionally.
 */
if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  switch( $_ENV['PANTHEON_ENVIRONMENT'] ) {
    case 'live':
      // Value should be the primary domain for the Site Network.
      define( 'DOMAIN_CURRENT_SITE', 'live-<site>.pantheonsite.io' );
      // Once you map a domain to Live, you can change DOMAIN_CURRENT_SITE
      // define( 'DOMAIN_CURRENT_SITE', 'example-network.com' );
      break;
    case 'test':
      define( 'DOMAIN_CURRENT_SITE', 'test-<site>.pantheonsite.io' );
      break;
    case 'dev':
      define( 'DOMAIN_CURRENT_SITE', 'dev-<site>.pantheonsite.io' );
      break;
    default:
      # Catch-all to accommodate default naming for multi-dev environments.
      define( 'DOMAIN_CURRENT_SITE', $_ENV['PANTHEON_ENVIRONMENT'] . '-' . $_ENV['PANTHEON_SITE_NAME'] . '.pantheonsite.io' );
      break;
    }
}
```

The astute programmer will notice the ‘test' and ‘dev' cases are redundant. Feel free to remove if you don't need custom primary domain values for those environments.

Generally, the key idea is that you're conditionally defining the `DOMAIN_CURRENT_SITE` constant based on the current Pantheon environment (Dev, Test, Live or Multi-Dev).

## Creating a Site Network through the WordPress Dashboard

If you didn't use Terminus to install your WordPress Site Network, it can also be created from the WordPress Dashboard. Really though, you should give Terminus a try. What follows is an abbreviated version of the [WordPress Codex installation instructions](https://codex.wordpress.org/Create_A_Network).

When creating a Site Network through the WordPress Dashboard, the first step is to add the following constant to your `wp-config.php`:


    define( 'WP_ALLOW_MULTISITE', true );

Once you've told WordPress of your intent to create a Site Network, you'll see a new page in your WordPress Dashboard:


![WP Network Setup](/source/docs/assets/images/wp-network-setup.png)

Copy the first block and add the constants to the `wp-config.php` file, right below where you added the `WP_ALLOW_MULTISITE` constant.

As in the Terminus installation method example, instead of defining `DOMAIN_CURRENT_SITE` explicitly, you'll want to define it conditionally based on environment. See the section prior for those details.

Lastly, Ignore the second block of code (adding new `.htaccess` rules). Pantheon containers use Nginx + PHP-FPM, not Apache, and `.htaccess` files have no effect.

Now, go back to your web browser and refresh the page. WordPress will redirect you to the log in screen. Once you log back in to WordPress, pat yourself on the back — you've completed the WordPress Site Network installation process.


## Developing the Site Network

Congratulations again on setting up your first WordPress Site Network. You are on your way to glory!

When logged in to the WordPress Dashboard, you'll see a new “My Sites” menu item in the toolbar.


![Enabling the network](/source/docs/assets/images/wp-network-admin-sites.png)

You will have one site — go ahead and create another if you'd like. If you chose to use WordPress Site Networks with subdirectories, you'll be able to access the site right away. If you chose to use subdomains, you'll need to map a custom hostname to the environment (@todo link to section in best practices) before you can access the new environment. Pantheon doesn't support sub-sub-domains of `pantheonsite.io`.

Spend some additional time exploring the WordPress Network Dashboard to become familiar with the variety of additional settings you now have. Take a look at what options are available for each site you create, how to manage users across WordPress Multisite, and the grab bag of network settings.

Once you're ready to move on, the next section covers using a WordPress Site Network with the Pantheon Workflow.
