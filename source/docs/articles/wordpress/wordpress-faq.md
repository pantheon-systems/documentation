---
title: WordPress FAQs
description: Questions to Frequently Asked Questions concerning WordPress on the Pantheon Website Management Platform.
category:
  - getting-started
  - WordPress
keywords: wordpress, faqs, import, configure
---
## Getting Started

### Does Pantheon support WordPress?

Yes. We have complete and total support for WordPress sites and developers.

### Can I import an existing site?

Yes. Please see [Export an Existing WordPress Site](/docs/articles/wordpress/export-an-existing-wordpress-site) for step-by-step instructions.

### How do I configure wp-config?

wp-config.php comes pre-configured to work under normal circumstances right out of the box. Most sites should not need to make modifications.

For detailed instructions, or if you have a need to customize see [Configuring wp-config](/docs/articles/wordpress/configuring-wp-config-php).

## Debugging

### Why isn't my status tab displaying as many details as for my Drupal sites.

We are currently working on extending our Launch Check report to cover WordPress best practices. Stay tuned!

### Can I use PHP Sessions?

If you need to use PHP's native session handling, please install the [WordPress native PHP sessions plugin](https://wordpress.org/plugins/wp-native-php-sessions/), which we maintain just for this purpose. This provides a horizintally scalable storage mechanism for sessions.

If you are seeing errors like this:

```php
Warning: session_start(): user session functions not defined
```

You'll need the plugin. [More info on sessions](/docs/articles/wordpress/wordpress-and-php-sessions/).

## Developing WordPress Sites

### Can I run a custom theme?

Yes. Pantheon gives you total access to your codebase, so you can control every aspect of your design.

### Can I run plugins?

Yes. Pantheon puts the power back in your hands by giving you a best-practice deployment workflow that lets you manage your entire codebase safely. You can make any code changes in the Dev environment, and test your updates before deploying to Live.

### Can I use WordPress Multisite?

No, please see [WordPress Known Limitations: Site Networks / Multisite](/docs/articles/wordpress/wordpress-known-issues/#site-networks-/-multisite)

### Can I install WordPress in my Drupal site (or vice versa)?

No. Attempting anything of the sort will only cause pain and unhappiness; this will also void your warranty.

### Can I use other WordPress services like the JetPack CDN?

Absolutely. Pantheon allows you to integrate with any third-party service (e.g. CDN, search, etc).

## Security

### Why can't I update plugins or WordPress core directly on production

Pantheon's security model restricts the Live environment so that the site cannot changes its own code. This means there is never a chance for a plugin to compromise the site by installing extra software (e.g. malware, backdoors, etc) after the fact.

All changes to the codebase go through the Dev environment, and are tracked in version control.

### What about Core security updates?

Pantheon makes it easy to apply updates to WordPress via our dashboard, and you can take advantage of our deployment workflow to test the update before it goes live. (Just like Drupal.)

## Caching and Performance

### Can I run caching plugins?

You don't need to! Pantheon provides a web-scale infrastructure, which includes a super-tuned PHP environment, horizontal scalability, and caching. You don’t need to worry about messing with buggy or frustrating cache plugins (supercache, batcache, etc).

### Do you support cache backends?

Yes, we support Redis. Please see [Redis as a caching backend](/docs/articles/sites/redis-as-a-caching-backend).

### Which caches do you clear?

You can clear the caches from your site's Pantheon Dashboard. This will take care of clearing Varnish and Redis caches, if applicable. At this time, WordPress database caches are not cleared nor is selective Varnish cache clearing supported.


## Further Reading

- [Export an Existing WordPress Site](/docs/articles/wordpress/export-an-existing-wordpress-site)
- [Importing an Existing Site to Pantheon](/docs/articles/sites/create/importing-an-existing-site)
- [Launching a WordPress Site](/docs/articles/wordpress/starting-wordpress-site/)
