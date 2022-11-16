---
title: Local Development on Pantheon
subtitle: Introduction
description: Learn more about working locally on your Pantheon Drupal or WordPress site.
categories: [develop]
tags: [git, lando, local, sftp, workflow]
reviewed: "2022-03-10"
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/local-development
anchorid: local-development
---

Pantheon provides several options for on-server development, however, local development has a number of advantages, especially if continuous Internet access is a concern. Pantheon provides powerful local development tools, including [Terminus](/guides/terminus) and [Multidev](/guides/multidev). Pantheon's platform can also be integrated with:

- Lando
- Jenkins
- JetBrains PhpStorm for WordPress
- JetBrains PhpStorm for Drupal
- [Drush](/guides/drush) (optional)
- [WP-CLI] (/guides/wp-cli)


## Support

Pantheon cannot troubleshoot or [support local development](/guides/support/#local-development) solutions, but we can provide some suggestions and known working solutions. For large teams/sites, we recommend using [Multidev](/guides/multidev).

If you encounter any issues, visit the [Lando GitHub repository](https://github.com/lando/lando#help-troubleshooting--support).

## Before You Begin

There are three parts to any dynamic website:

1. **Code**: The application, modules or plugins, and themes.

1. **Database**: The content.

1. **Files**: User uploaded or application generated.

You will need to transfer each file from Pantheon to your local environment.

Be sure you have:

- A local stack capable of running Drupal or WordPress. [Lando](https://github.com/lando/lando) integrates with the Pantheon platform. Tools such as [MAMP](https://www.mamp.info/en/), [WAMP](http://www.wampserver.com/), and [XAMPP](https://www.apachefriends.org/index.html) are compatible.
  - Pantheon uses a [particular architecture to maximize performance and availability](/application-containers), but it's possible to run the same code on a variety of different configurations. As long as the solution supports a minimum of PHP 5.3 and MySQL, you should be fine.
  - Ensure that your local stack's PHP version matches the [PHP version set for the target site on Pantheon](/guides/php/php-versions/#verify-current-php-versions).
- Git client for tracking code changes
- SFTP client or IDE, such as [WinSCP](/winscp) or [Visual Studio Code](/visual-studio-code), for transferring files OR Rsync
- [Terminus](/guides/terminus)
- [Drush](/guides/drush) (optional)
- [WP-CLI] (/guides/wp-cli)
