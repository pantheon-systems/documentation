---
title: PHP on Pantheon
subtitle: Introduction
description: Learn more about using PHP on Pantheon.
contenttype: [guide]
innav: [true]
categories: [php]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [webops, workflow]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/php
---

PHP is a scripting language that facilitates server-side web development. The PHP code in your Pantheon account is executed at runtime whenever a request is received from the web server the same way it is on other platforms.

## Supported PHP Versions

Pantheon supports the following PHP versions:

Click the links below to display complete PHP information for each version, including details of supported PHP extensions.

| Version                                          | Available   | Recommended |
| ------------------------------------------------ | :---------: | :---------: |
| [8.3](https://v83-php-info.pantheonsite.io/)   | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           |
| [8.2](https://v82-php-info.pantheonsite.io/)   | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           |
| [8.1](https://v81-php-info.pantheonsite.io/)   | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           |
| [8.0](https://v80-php-info.pantheonsite.io/) | <span style="color:green">✔</span>         | ❌          |
| [7.4](https://v74-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>         | ❌          |
| [7.3](https://v73-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>         | ❌           |
| [7.2](https://v72-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>         | ❌           |
| [7.1](https://v71-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>          | ❌           |
| [7.0](https://v70-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>         | ❌           |
| [5.6](https://v56-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>         | ❌           |

Sites that run older PHP versions not listed above will continue to serve pages. However, new development cannot be done because the development environment behavior is undefined and no longer supported. You can [upgrade your PHP version](/guides/php/php-versions) in the development environment to resume development on your site.

<Alert title="PHP 8.3 New Relic compatibility" type="info">

Currently, New Relic does not support PHP 8.3. As such, you will not be able to view your New Relic dashboard on any site that has been updated to PHP 8.3. We will be updating our platform to support New Relic on PHP 8.3 sites as soon as a compatible New Relic release is available to us.

</Alert>

## Drush Compatibility

Refer to [Managing Drush Versions on Pantheon](/guides/drush/drush-versions) for detailed compatibility information.

## Terminus Compatibility

Refer to [Version Updates](/terminus/updates#php-version-compatibility-matrix) for detailed compatibility information.

## More Resources

- [PHP Slow Log](/guides/php/php-slow-log)

- [PHP Errors](/guides/php/php-errors)

- [Securely Working with phpinfo](/guides/secure-development/phpinfo)
