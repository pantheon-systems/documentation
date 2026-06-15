---
title: Pantheon Secrets Guide
subtitle: Introduction
description: Securely store secrets in the Pantheon Platform.
contributors: [stovak, jazzs3quence]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets
reviewed: "2026-06-15"
showtoc: true
---
Pantheon Secrets is key to maintaining industry best practices for secure builds and application implementation. This feature provides a convenient mechanism for you to manage your secrets and API keys directly on the Pantheon platform.

This guide covers features and use cases of Pantheon Secrets, which you can manage via the Site Dashboard or via [Terminus](/terminus).

## Features
Key features include:
* **Secure**: Secrets are encrypted at rest and securely hosted on Pantheon.
* **Easy to use**: Create and update secrets via the Site Dashboard or Terminus.
* **Governable**: Secrets can be set at organization level and shared with all the sites owned by that organization.
* **Overridable**: Secrets can be overridden at environment level when needed.

This feature also supports:
* The use of private repositories in Integrated Composer builds.
* The ability to set a `COMPOSER_AUTH` environment variable and/or a Composer `auth.json` authentication file.
* The ability to define the degree of secrecy for each managed item.

## Access & Availability
Pantheon Secrets is available to all Pantheon users at no additional cost. Secrets management commands are built into [Terminus](/terminus) 4.2.0 and later — no additional plugin installation is required.

### Installation
To get started:
1. [Install & authenticate Terminus](/terminus/install) if you have not done so already.
1. You can now use Terminus commands such as `secret:site:set` to manage secrets securely on Pantheon, or manage site-owned secrets directly from the **Secrets** tab in your [Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).

To see all available Terminus secrets commands, refer to the [Terminus command reference](/terminus/commands).

### Older plugins now deprecated
Terminus 4.2.0 integrates secrets management directly into Terminus core. If you previously installed the [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) separately, you no longer need it — the same commands are available in Terminus 4.2.0 and later without any plugin installation.

The Terminus Secrets Manager Plugin itself replaced the older [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin), which wrote unencrypted values to a JSON file in `/files/private`. If you still use the older plugin, we strongly encourage you to upgrade by adopting Pantheon Secrets.

## Support
[Terminus](https://github.com/pantheon-systems/terminus), the [PHP Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk), and the [Pantheon Secrets](https://github.com/pantheon-systems/pantheon_secrets) Drupal module are open source. You can view the projects, file issues and feature requests, and contribute in their respective repositories on GitHub.

* [Terminus](https://github.com/pantheon-systems/terminus)
* [Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk)
* Pantheon Secrets Drupal module
  * [github repo](https://github.com/pantheon-systems/pantheon_secrets) for issues & PRs
  * [drupal.org](https://www.drupal.org/project/pantheon_secrets) for releases

[Contact Support](https://dashboard.pantheon.io/#support/support/all) if you have questions or need help with Terminus.
