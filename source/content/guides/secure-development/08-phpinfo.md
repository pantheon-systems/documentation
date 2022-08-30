---
title: Secure Development on Pantheon
subtitle: Securely Working with phpinfo
description: Important security considerations when working with phpinfo on your Pantheon Drupal site.
cms: "Drupal"
categories: [develop]
tags: [cms, security, cdn]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/secure-development/phpinfo
anchorid: phpinfo
reviewed: "2022-07-21"
---

This section provides information on steps you can take to obscure your [phpinfo](https://secure.php.net/manual/en/function.phpinfo.php) online.

Pantheon provisions isolated Linux containers with an optimized PHP stack. The `php.ini` is part of a highly tuned configuration and is not user-configurable. We continually deploy new builds of PHP and you also have the ability to [upgrade PHP versions](/guides/php/php-versions).

You can use `phpinfo` to see a comprehensive list of what's installed with the version of PHP in use by a particular environment. We also have [example PHP info](/guides/php/php-versions/#available-php-versions) for each version of PHP on the platform.

## Important Security Notes

- `phpinfo` exposes sensitive information, including the password to connect to the DB

- Delete any `phpinfo` file you create immediately after review

### Drupal Note

Drupal makes the `phpinfo` available to privileged users at `https://example.com/admin/reports/status/php`

## Review phpinfo

Follow the steps below to keep your `phpinfo` file secure.

1. [Lock environment](/guides/secure-development/security-tool) (if the environment does not currently need to be publicly accessible).

1. Create a php file with an obscure filename that uses `phpinfo`.

1. Omit sensitive sections from the `phpinfo` output to minimize the information exposed over the web. The recommended way to call `phpinfo` is:

   ```php
   phpinfo(INFO_GENERAL | INFO_CREDITS | INFO_MODULES | INFO_LICENSE);
   ```

1. Visit the file in a web browser to view `phpinfo`.

  ![obscure-phpinfo-filename](../../../images/obscure-phpinfo-delete-immediately.png)

1. Delete the file immediately so you do not expose sensitive information, such as the password used to connect to the DB.

## Terminus

You can use [Terminus](/terminus) to check your `phpinfo` values as an alternative to exposing information on a web-accessible URL:

```bash{promptUser: user}
terminus remote:drush <SITE>.<ENV> -- ev "print(phpinfo())"
```

## More Resources

- [Upgrade PHP Versions](/guides/php/php-versions)

- [PHP Errors and Exceptions](/guides/php/php-errors)

- [Configuring Settings.php](/guides/php/settings-php)
