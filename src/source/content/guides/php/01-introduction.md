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

| Version                                          | Available   | Recommended | End of Sale | End of Support | Removal Date |
| ------------------------------------------------ | :---------: | :---------: | :---------: | :------------: | :----------: |
| <span style="font-weight: bold">Fully Supported</span> |       |             |             |                |              |
| [8.5](https://v85-php-info.pantheonsite.io/) | <span style="color:green">✔</span> | <span style="color:green">✔</span> | TBD | TBD | TBD |
| [8.4](https://v84-php-info.pantheonsite.io/) | <span style="color:green">✔</span> | <span style="color:green">✔</span> | TBD | TBD | TBD |
| [8.3](https://v83-php-info.pantheonsite.io/) | <span style="color:green">✔</span> | <span style="color:green">✔</span> | TBD | TBD | TBD |
| [8.2](https://v82-php-info.pantheonsite.io/) | <span style="color:green">✔</span> | <span style="color:green">✔</span> | TBD | TBD | TBD |
| [7.4](https://v74-php-info.pantheonsite.io/) | <span style="color:green">✔</span> | ❌ | December 31, 2026 | TBD | TBD |
| <span style="font-weight: bold">End of Sale</span> |           |             |             |                |              |
| [8.1](https://v81-php-info.pantheonsite.io/) | Existing sites only | ❌ | September 30, 2026 | TBD | TBD |
| <span style="font-weight: bold">End of Support and planned for Removal</span> - Grace period in effect | | | |             |
| [8.0](https://v80-php-info.pantheonsite.io/) | Existing sites only | ❌ | May 1, 2026 | September 30, 2026 | Grace Period |
| [7.3](https://v73-php-info.pantheonsite.io/) | Existing sites only | ❌ | May 1, 2026 | September 30, 2026 | Grace Period |
| [7.2](https://v72-php-info.pantheonsite.io/) | Existing sites only | ❌ | May 1, 2026 | September 30, 2026 | Grace Period |
| [7.1](https://v71-php-info.pantheonsite.io/) | Existing sites only | ❌ | May 15, 2024 | September 30, 2026 | Grace Period |
| [7.0](https://v70-php-info.pantheonsite.io/) | Existing sites only | ❌ | May 15, 2024 | September 30, 2026 | Grace Period |
| [5.6](https://v56-php-info.pantheonsite.io/) | Existing sites only | ❌ | May 15, 2024 | September 30, 2026 | Grace Period |


- <span style="font-weight: bold">Fully Supported</span> — Available, recommended, and receives upstream security patches automatically.
- <span style="font-weight: bold">End of Sale</span> — No longer available for new sites. Existing sites continue; patches still provided where available.
- <span style="font-weight: bold">End of Support</span> — No longer supported upstream. Customers assume additional security risk by staying on these versions.
- <span style="font-weight: bold">Removal Date</span> — This PHP version will no longer be available on the platform. Sites still running a removed version will be automatically upgraded to the oldest available PHP version, which may result in broken functionality if the site's code has not been updated for compatibility.
- <span style="font-weight: bold">Grace Period</span> - Removal from the Pantheon platform is imminent. While Pantheon still receives some updates to these EOS versions, we strongly recommend upgrading sites to supported versions. As of September 30, 2026, Pantheon will no longer provide software patches for these versions unless available in upstream open source repositories or from Pantheon contracted vendors, and future platform features will not be backward compatible. By remaining on this version, you accept the risk of unpatched vulnerabilities and release Pantheon from associated liability.  Pantheon will provide 90 days advance notice before requiring removal of a PHP version from the Pantheon platform.

While sites previously configured with unlisted versions of PHP may continue running those versions, a site with a listed PHP version cannot be configured to an older, unlisted PHP version.

## Drush Compatibility

Refer to [Managing Drush Versions on Pantheon](/guides/drush/drush-versions) for detailed compatibility information.

## Terminus Compatibility

Refer to [Version Updates](/terminus/updates#php-version-compatibility-matrix) for detailed compatibility information.

## More Resources

- [PHP Slow Log](/guides/php/php-slow-log)

- [PHP Errors](/guides/php/php-errors)

- [Securely Working with phpinfo](/guides/secure-development/phpinfo)
