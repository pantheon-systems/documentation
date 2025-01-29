---
title: Pantheon Secrets Guide
subtitle: Introduction
description: Securely store secrets in the Pantheon Platform.
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets
reviewed: "2024-08-22"
showtoc: true
---
Pantheon Secrets is key to maintaining industry best practices for secure builds and application implementation. This feature provides a convenient mechanism for you to manage your secrets and API keys directly on the Pantheon platform.

This guide covers features and use cases of the Pantheon Secrets feature; it could also be referred as Secrets Manager because that is the Terminus plugin name.

## Features
Key features include:
* **Secure**: Secrets are encrypted at rest and securely hosted on Pantheon.
* **Easy to use**: Create and update secrets via Terminus.
* **Governable**: Secrets can be set at organization level and shared with all the sites owned by that organization.
* **Overridable**: Secrets can be overridden at environment level when needed.

This feature also supports:
* The use of private repositories in Integrated Composer builds.
* The ability to set a `COMPOSER_AUTH` environment variable and/or a Composer `auth.json` authentication file.
* The ability to define the degree of secrecy for each managed item.

## Access & Availability
This feature is available for anyone to use today at no additional cost. Currently released for Limited Availability, the [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) will eventually be merged into Terminus core once released for General Availability in the future.

### Installation
How to get started and use this feature:
1. [Install & authenticate Terminus](/terminus/install) if you have not done so already.
1. Install the [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin):

  ```bash{promptUser: user}
  terminus self:plugin:install terminus-secrets-manager-plugin
  ```

1. You can now use the newly installed Terminus commands, such as `secret:site:set`, to manage secrets securely on Pantheon.

To see all available commands added by this plugin, refer to the [plugin's README file](https://github.com/pantheon-systems/terminus-secrets-manager-plugin?tab=readme-ov-file#site-secrets-commands).

### Older plugin now deprecated
The new [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) replaces the older [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin).  The key differences are:

- The new Terminus Secrets Manager Plugin stores secrets in an encrypted backend service.
- The older secrets plugin simply writes unencrypted values to a json file in `/files/private`.

Once the Pantheon Secrets service becomes generally available and merged into Terminus core, the older `terminus-secrets-plugin` will be discontinued. If you use the older plugin to manage secrets today, we strongly encourage you to upgrade your security and experience by adopting this new feature.

## Support
The [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin), [PHP Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk), and [Pantheon Secrets](https://github.com/pantheon-systems/pantheon_secrets) Drupal module are open source. You can view the projects, file issues and feature requests, and contribute in their respective repositories on GitHub.

* [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)
* [Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk)
* Pantheon Secrets Drupal module
  * [github repo](https://github.com/pantheon-systems/pantheon_secrets) for issues & PRs
  * [drupal.org](https://www.drupal.org/project/pantheon_secrets) for releases

[Contact Support](https://dashboard.pantheon.io/#support/support/all) if you have questions or need help with Terminus.
