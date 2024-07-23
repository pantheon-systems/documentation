---
title: Pantheon Secrets Guide
subtitle: Introduction
description: Securely store secrets in the Pantheon Platform.
type: terminuspage
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
reviewed: "2024-05-01"
---

Pantheon Secrets is key to maintaining industry best practices for secure builds and application implementation. This feature provides a convenient mechanism for you to manage your secrets and API keys directly on the Pantheon platform.
This guide covers features and use cases of the Pantheon Secrets feature; it could also be referred as Secrets Manager because that is the Terminus plugin name.

### Features:

* **Secure**: secrets are encrypted at rest.
* **Easy to use**: create and update secrets via Terminus.
* **Governable**: secrets could be set at organization level and shared to all the sites owned by that organization.
* **Overridable**: secrets could be overridden at environment level when needed.


### Support
Community-submitted bugs and feature requests can be found in their respective repositories on GitHub.

* [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)
* [Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk)
* [pantheon_secrets (Drupal module)](https://github.com/pantheon-systems/pantheon_secrets)

[Contact Support](https://dashboard.pantheon.io/#support/support/all) if you have questions or need help with Terminus.

### Disambiguation

The [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) should not be confused with the older [secrets plugin](https://github.com/pantheon-systems/terminus-secrets-plugin).  The former stores secrets in an encrypted backend service while the former just stores them in `/files/private/secrets.json` file.  When the Pantheon Secrets service reaches general availability, the terminus-secrets-plugin will be discontinued.

### Contribute to Pantheon Secrets

The plugin, SDK or Drupal module are open source. You can view the projects and contribute, file issues and submit feature requests.

* [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)
* [Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk)
* [pantheon_secrets (Drupal module)](https://github.com/pantheon-systems/pantheon_secrets)

### More Resources

* [Terminus Plugin GitHub Repository](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)
* [PHP SDK GitHub repository](https://github.com/pantheon-systems/customer-secrets-php-sdk)
* [Drupal module GitHub repository](https://github.com/pantheon-systems/pantheon_secrets)
* [Drupal module](https://www.drupal.org/project/pantheon_secrets)
