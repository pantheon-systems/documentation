---
title: Migrate a Site That Was Created Before November 2021 to Drupal 9
subtitle: Introduction
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted-pre112021
anchorid: drupal-9-hosted-pre112021
editpath: drupal-9/drupal-9-hosted-pre112021/01-introduction.md
reviewed: "2021-03-31"
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Pantheon                    |                                                                     Dashboard                                                                      |                                                                                   Created before 11/2021                                                                                   |

<Partial file="drupal-9/see-landing.md" />

<Partial file="drupal-9/commit-history.md" />

Drupal 9 sites created on the platform prior to November 30, 2021 use the [Drupal 9](https://github.com/pantheon-upstreams/drupal-project) upstream. Based on community needs, we have released a new upstream. [Drupal with Composer](https://github.com/pantheon-upstreams/drupal-recommended) is now the default Drupal 9 upstream on the platform and users are encouraged to switch to it for improved structure and updates.

## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
