---
title: Local Development on Pantheon
subtitle: Introduction
description: Learn more about developing your Pantheon site locally.
categories: [develop]
tags: [git, lando, local, sftp, workflow]
reviewed: "2022-03-10"
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/local-development
anchorid: local-development
---

Pantheon's [Localdev](/guides/localdev/troubleshoot-support) has been deprecated. However, there are many local development options for the Pantheon platform available for use on Pantheon. This guide provides an overview of several popular local development tools to help you get started.

Pantheon provides several options for on-server development, however, local development has a number of advantages, especially if continuous internet access is a concern. Pantheon provides powerful local development tools, including [Terminus](/terminus) and [Multidev](/guides/multidev). Pantheon's platform can also be integrated with:

- Lando
- Jenkins
- JetBrains PhpStorm for WordPress
- JetBrains PhpStorm for Drupal
- Drush
- WP-CLI

## Before You Begin

- You must transfer each file from Pantheon to your local environment. There are three parts to any dynamic website that contain important files:

    1. **Code**: The application, modules or plugins, and themes.

    1. **Database**: The content.

    1. **Files**: User uploaded or application generated.

- Ensure that your local stack is capable of running Drupal or WordPress, such as:
    - [Lando](https://github.com/lando/lando)
    - [MAMP](https://www.mamp.info/en/)
    - [WAMP](http://www.wampserver.com/)
    - [XAMPP](https://www.apachefriends.org/index.html)

-  Confirm that your configuration solution supports a minimum of PHP 5.3 and MySQL. Pantheon uses a [particular architecture to maximize performance and availability](/application-containers).

- Verify that your local stack's PHP version matches the [PHP version set for the target site on Pantheon](/guides/php/php-versions/#verify-current-php-versions).

- Install a Git client for tracking code changes.

- Install an SFTP client or IDE, such as [WinSCP](/guides/sftp/winscp) or [Visual Studio Code](/guides/local-development/visual-studio-code), for transferring files or Rsync.

- Install [Terminus](/terminus).

- Review [Multidev](/guides/multidev) documentation. Multidev is recommended for large teams.

- Install [Drush](/guides/drush) (recommended for Drupal sites).

- Install [WP-CLI](/guides/wp-cli) (recommended for WordPress sites).

## Support

Pantheon does not offer [support for local development](/guides/support/#local-development) solutions or troubleshooting. This guide provides some suggestions and known working solutions.

## Pantheon Developer Resources

Review the resources below for additional developer tools and knowledge specific to Pantheon.

- [Secure Development on Pantheon](/guides/secure-development)
- [PHP on Pantheon](/guides/php)
- [WP-CLI on the Pantheon Platform](/guides/wp-cli)
- [Drupal Drush Command-Line Utility on Pantheon](/guides/drush)
- [MariaDB and MySQL on Pantheon](/guides/mariadb-mysql)
- [Multidev](/guides/multidev)
- [Terminus](/terminus)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Git on Pantheon](/guides/git)
- [Developing on Pantheon Directly with SFTP Mode](/sftp)