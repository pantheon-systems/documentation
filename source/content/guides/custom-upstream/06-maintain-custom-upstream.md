---
title: Best Practices for Maintaining Custom Upstreams
subtitle: Custom Upstream Best Practices
description: Detailed information on how to maintain Custom Upstreams.
tags: [git, upstreams, workflow, D8, D9, D10]
layout: guide
showtoc: true
permalink: docs/guides/custom-upstream/maintain-custom-upstream
anchorid: maintain-custom-upstream
contenttype: [guide]
categories: [git, test, updates]
newcms: [drupal, wordpress]
audience: [development]
product: [custom-upstream]
integration: [--]
reviewed: "2022-12-13"
---

This section provides information to help you manage and maintain your Custom Upstream.

## Upstream Configuration File

Use the `pantheon.upstream.yml` file when working with Custom Upstreams to set default values for advanced site configurations to be used downstream. Review the [Pantheon YAML Configuration Files](/pantheon-yml) documentation for details.

## How to Add Dependencies to Your Upstream

1. Clone the Git repository for your upstream.

1. Run the `composer upstream-require` command for each dependency:

    ```bash{promptUser: user}
    composer upstream-require drupal/pkg-name [--no-update]
    ```

     - `--no-update` tells Composer to disable automatic updates of the dependency. This makes Composer faster when adding dependencies to the Upstream as shown here. This is useful if you don't want to pin versions for your dependencies. Do not include this option if you want to pin specific versions for your dependencies.

1. Commit and push your changes.

## How to Update Dependencies in Your Upstream

You may have the need to pin specific (usually tested) versions of your dependencies in your upstream. This is normally done with the composer.lock file but including this file in the root of the upstream will cause tons of merge conflicts with your downstream sites. To solve this problem, you could use the `update-upstream-dependencies` composer command.

This command will:

1. Create or update a `upstream-configuration/composer.lock` file
1. Create or update a `upstream-configuration/locked/composer.json` file with all of the packages from composer.lock and their pinned versions
1. Update top-level `composer.json` repositories section for `upstream-configuration` to use `upstream-configuration/locked` instead of just `upstream-configuration` (if not done previously)

This will allow you to make sure that you use tested versions for the packages in your upstream.

## Redirects

We normally suggest [PHP redirects](/guides/redirect) be placed into `wp-config.php` for WordPress and `settings.php` for Drupal. You will lose any customizations to your PHP files every time you update your Custom Upstream. It will also be difficult to implement site-specific configurations added on these files.

You can use a `require_once` statement to point to an external file since this file is shared on all environments, including Multidevs. It is also separate from the Custom Upstream and unique to each site:

```php
if ( file_exists( dirname( __FILE__ ) . '/guides/redirect.php' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  require_once( dirname( __FILE__ ) . '/guides/redirect.php' );
}
```

Remember that this file is not included in the Custom Upstream and must exist uniquely on each site. You can then expand the conditional statement to load on specific environments using the FAQ section in the [wp-config-php doc](/guides/php/wp-config-php#how-can-i-write-logic-based-on-the-pantheon-server-environment).

WordPress sites can also store redirects in an [MU-Plugin](/guides/wordpress-configurations/mu-plugin).

## More Resources

- [Clear Upstream Cache](/terminus/commands/site-upstream-clear-cache)

- [Troubleshoot a Custom Upstream](/guides/custom-upstream/troubleshooting)

- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)
