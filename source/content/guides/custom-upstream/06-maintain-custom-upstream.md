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

### Upstream Configuration File

Use the `pantheon.upstream.yml` file when working with Custom Upstreams to set default values for advanced site configurations to be used downstream. For details, see [Pantheon YAML Configuration Files](/pantheon-yml).

### Redirects

We normally suggest [PHP redirects](/redirects) be placed into `wp-config.php` for WordPress and `settings.php` for Drupal. If you are using a Custom Upstream, any customizations to these files will be lost with each update. It will also be hard to implement site-specific configurations added on these files.

Since this file is shared on all environments, including Multidevs, you can use a `require_once` statement to point to an external file, separate from the Custom Upstream and unique to each site, that loads all the redirects or customizations:

```php
if ( file_exists( dirname( __FILE__ ) . '/redirects.php' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  require_once( dirname( __FILE__ ) . '/redirects.php' );
}
```

Remember that this file is not included in the Custom Upstream and needs to exist uniquely on each site. You can then expand the conditional statement to load on specific environments using the FAQ section in the [wp-config-php doc](/wp-config-php#how-can-i-write-logic-based-on-the-pantheon-server-environment).

WordPress sites can also store redirects in an [MU-Plugin](/mu-plugin).

## More Resources

- [Clear Upstream Cache](/terminus/commands/site-upstream-clear-cache)

- [Troubleshoot a Custom Upstream](/guides/custom-upstream/troubleshooting)