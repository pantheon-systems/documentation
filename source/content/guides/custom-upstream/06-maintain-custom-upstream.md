---
title: Best Practices for Maintaining Custom Upstreams
subtitle: Custom Upstream Best Practices
description: Detailed information on how to maintain Custom Upstreams.
categories: [develop]
tags: [git, upstreams, workflow]
layout: guide
showtoc: true
permalink: docs/guides/custom-upstream/maintain-custom-upstream
anchorid: maintain-custom-upstream
---

This section provides information to help you manage and maintain your Custom Upstream.

## Upstream Configuration File

Use the `pantheon.upstream.yml` file when working with Custom Upstreams to set default values for advanced site configurations to be used downstream. Review the [Pantheon YAML Configuration Files](/pantheon-yml) documentation for details.

## Redirects

We normally suggest [PHP redirects](/guides/redirect) be placed into `wp-config.php` for WordPress and `settings.php` for Drupal. You will lose any customizations to your PHP files every time you update your Custom Upstream. It will also be difficult to implement site-specific configurations added on these files.

You can use a `require_once` statement to point to an external file since this file is shared on all environments, including Multidevs. It is also separate from the Custom Upstream and unique to each site:

```php
if ( file_exists( dirname( __FILE__ ) . '/guides/redirect.php' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  require_once( dirname( __FILE__ ) . '/guides/redirect.php' );
}
```

Remember that this file is not included in the Custom Upstream and must exist uniquely on each site. You can then expand the conditional statement to load on specific environments using the FAQ section in the [wp-config-php doc](/guides/php/wp-config-php#how-can-i-write-logic-based-on-the-pantheon-server-environment).

WordPress sites can also store redirects in an [MU-Plugin](/mu-plugin).

## More Resources

- [Clear Upstream Cache](/terminus/commands/site-upstream-clear-cache)

- [Troubleshoot a Custom Upstream](/guides/custom-upstream/troubleshooting)

- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)
