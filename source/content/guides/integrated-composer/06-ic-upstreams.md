---
title: Integrated Composer
subtitle: Custom Upstream Usage
description: Learn how to use an Upstream with Integrated Composer.
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

This section provides usage and maintanenance information for composer-managed [Custom Upstreams](/custom-upstreams) on Pantheon, including steps to add upstream dependencies.


## Custom Upstreams

An Upstream refers to the source code in Git that shares a Git history with "downstream" individual sites made from it. Upstreams includes the core code for [Drupal](https://github.com/pantheon-upstreams/drupal-composer-managed), [WordPress](https://github.com/pantheon-upstreams/wordpress-project), and some customizations for the Pantheon platform.

### Custom Upstream and Site Structure

<Partial file="ic-upstream-structure.md" />

<Partial file="upstream-management-dependencies.md" />

## More Resources

- [Custom Upstreams](/guides/custom-upstream)

- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)

- [Migrate a Custom Upstream to Drupal](/guides/drupal-hosted-createcustom)

- [Pantheon YAML Configuration Files](/pantheon-yml)
