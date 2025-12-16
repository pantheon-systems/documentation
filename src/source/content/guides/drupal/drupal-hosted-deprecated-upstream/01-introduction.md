---
title: Upgrade a Site That Was Created Using a Deprecated Upstream to the Latest Version of Drupal
subtitle: Introduction
description:
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-hosted-deprecated-upstream
editpath: drupal/drupal-hosted-deprecated-upstream/01-introduction.md
reviewed: "2022-12-13"
contenttype: [guide]
innav: [true]
categories: [overview, migrate]
cms: [drupal9, drupal, drupal8, drupal10]
audience: [development]
product: []
integration: []
draft: true
---

This guide will show you how to migrate a site that meets the following criteria to the latest version of Drupal:

|  Current Host | How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
| :-------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                   Pantheon                    |                                                                  Dashboard                                                                   |                                                                Created using drupal-project or drupal-recommended upstream                                                                 |

<Partial file="drupal/see-landing.md" />

<Alert title="Note" type="info" >

This upgrade will not maintain your site’s commit history.

</Alert>

- Drupal sites created on the platform prior to November 30, 2021 use the [Drupal Project](https://github.com/pantheon-upstreams/drupal-project) upstream.
- Drupal sites created on the platform prior to May 2022 use the [Drupal Recommended](https://github.com/pantheon-upstreams/drupal-recommended) upstream.
- We now recommend using the [Drupal Composer Managed](https://github.com/pantheon-upstreams/drupal-composer-managed) upstream.

## More Resources

- [Composer Fundamentals and Workflows](/guides/composer)
