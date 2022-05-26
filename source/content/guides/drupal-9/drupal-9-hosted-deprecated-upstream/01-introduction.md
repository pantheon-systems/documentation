---
title: Migrate a Site That Was Created Using a Deprecated Upstream to Drupal 9
subtitle: Introduction
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted-deprecated-upstream
anchorid: drupal-9-hosted-deprecated-upstream
editpath: drupal-9/drupal-9-hosted-deprecated-upstream/01-introduction.md
reviewed: "2021-03-31"
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Pantheon                    |                                                                     Dashboard                                                                      |                                                                                   Created using drupal-project or drupal-recommended upstream                                                                                   |

<Partial file="drupal-9/see-landing.md" />

<Alert title="Note" type="info" >

This upgrade will not maintain your site’s commit history.

</Alert>

- Drupal 9 sites created on the platform prior to November 30, 2021 use the [Drupal 9](https://github.com/pantheon-upstreams/drupal-project) upstream. 
- Drupal 9 sites created on the platform prior to May 2022 use the [Drupal Recommended](https://github.com/pantheon-upstreams/drupal-recommended) upstream.
- We now recommend using the [Drupal 9 Composer Managed](https://github.com/pantheon-upstreams/drupal-composer-managed) upstream.

## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
