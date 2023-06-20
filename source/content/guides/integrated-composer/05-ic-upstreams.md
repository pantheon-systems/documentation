---
title: Integrated Composer
subtitle: Use Upstream with Integrated Composer
description: Learn how to use Upstream with Integrated Composer.
tags: [composer, workflow]
contributors: [ari, edwardangert]
reviewed: "2022-12-13"
showtoc: true
permalink: docs/guides/integrated-composer/ic-upstreams
contenttype: [guide]
innav: [false]
categories: [dependencies]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
---

This section provides information on how to use Upstream with Integrated Composer, including steps to add dependencies to your Upstream.

## Upstream

Upstream refers to the source code that is hosted in the Pantheon code repository and includes the core code for [Drupal](https://github.com/pantheon-upstreams/drupal-composer-managed), [WordPress](https://github.com/pantheon-upstreams/wordpress-project), and some customizations for the Pantheon platform.

### Upstream and Site Structure

<Partial file="ic-upstream-structure.md" />

<Partial file="upstream-management-dependencies.md" />

## More Resources

- [Custom Upstreams](/guides/custom-upstream)

- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)

- [Migrate a Custom Upstream to Drupal](/guides/drupal-hosted-createcustom)

- [Pantheon YAML Configuration Files](/pantheon-yml)
