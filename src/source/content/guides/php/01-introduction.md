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

| Version                                          | Available   | Recommended | End of Sale | Removal Date |
| ------------------------------------------------ | :---------: | :---------: | :---------: | :----------: |
| [8.5](https://v85-php-info.pantheonsite.io/)   | <span style="color:green">✔</span> <Popover title="Note" content="Setting PHP version to 8.5 will automatically upgrade your site to the new <a href='/php-runtime-generation-2'>PHP Runtime Generation 2</a>."/> | <span style="color:green">✔</span>     | TBD | TBD |
| [8.4](https://v84-php-info.pantheonsite.io/)   | <span style="color:green">✔</span> <Popover title="Note" content="Setting PHP version to 8.4 will automatically upgrade your site to the new <a href='/php-runtime-generation-2'>PHP Runtime Generation 2</a>."/> | <span style="color:green">✔</span>     | TBD | TBD |
| [8.3](https://v83-php-info.pantheonsite.io/)   | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           | TBD | TBD |
| [8.2](https://v82-php-info.pantheonsite.io/)   | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           | TBD | TBD |
| [8.1](https://v81-php-info.pantheonsite.io/)   | <span style="color:green">✔</span>         | ❌           | September 30, 2026 | TBD |
| [8.0](https://v80-php-info.pantheonsite.io/) | <span style="color:green">✔</span>         | ❌          | May 1, 2026 | September 30, 2026 |
| [7.4](https://v74-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>         | ❌          | TBD | TBD |
| [7.3](https://v73-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>         | ❌           | May 1, 2026 | September 30, 2026 |
| [7.2](https://v72-php-info.pantheonsite.io/)     | <span style="color:green">✔</span>         | ❌           | May 1, 2026 | September 30, 2026 |

- **End of Sale** — No new sites can be created with this PHP version. Existing sites already running the version will continue to operate.
- **Removal Date** — This PHP version will no longer be available on the platform. Sites still running a removed version will be automatically upgraded to the oldest available PHP version, which may result in broken functionality if the site's code has not been updated for compatibility.
- **TBD** — Pantheon guarantees at least **9 months of advance notice** before any PHP version is removed from the platform.

While sites previously configured with unlisted versions of PHP may continue running those versions, a site with a listed PHP version cannot be configured to an older, unlisted PHP version.

## Drush Compatibility

Refer to [Managing Drush Versions on Pantheon](/guides/drush/drush-versions) for detailed compatibility information.

## Terminus Compatibility

Refer to [Version Updates](/terminus/updates#php-version-compatibility-matrix) for detailed compatibility information.

## More Resources

- [PHP Slow Log](/guides/php/php-slow-log)

- [PHP Errors](/guides/php/php-errors)

- [Securely Working with phpinfo](/guides/secure-development/phpinfo)
