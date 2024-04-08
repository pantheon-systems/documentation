---
title: Updates to WordPress (Composer Managed) Upstream
published_date: "2024-04-08"
categories: [wordpress, action-required]
---

Today we are pushing out an update to the [WordPress (Composer Managed)](/guides/wordpress-composer/pre-ga/wordpress-composer-managed) upstream to resolve a particular log message that started appearing after our [WP-CLI wrapper update](/release-notes/2024/02/wp-cli-changes) in February.

This update adds a new file to the `/config` directory, `application.pantheon.php`. In order to accomodate this new file, a line has been added to `config/application.php` to load the `config/application.pantheon.php` file. If you have made modifications to your `config/application.php`, it's possible you may run into conflicts with this update. If this is the case, you can manually resolve by running the following command:

```bash
git pull -Xtheirs https://github.com/pantheon-upstreams/wordpress-composer-managed.git main
git push origin master
```

### Technical Details

The `application.pantheon.php` file curently contains code to check for a defined `WP_HOME` value in the site's `.env` file. If the value is undefined or no `.env` file is being used, values for `WP_HOME` and `WP_SITEURL` are defined. This can be overridden by either adding values to the site's `.env` file or adding `putenv( 'WP_HOME=https://example.com' );` and `putenv( 'WP_SITEURL=https://example.com' );` to your `application.php` file.

#### Why the change?

[Roots Bedrock](https://roots.io/bedrock/) makes heavy use of [environment variables](https://roots.io/bedrock/docs/environment-variables/). We made an intentional decision to _not_ rely on `.env` files in order to reduce overall complexity. This left `WP_HOME` and `WP_SITEURL` undefined in the `application.php` file except in local development with [Lando](https://lando.dev/). In most cases, WordPress is intelligent enough to use the database values for `home` and `siteurl` for normal interactions, however, this caused problems with WP-CLI-based operations. The addition of a new `application.pantheon.php` file allows us to define those values if they are not already while still allowing them to be overridden for more complex environments. 