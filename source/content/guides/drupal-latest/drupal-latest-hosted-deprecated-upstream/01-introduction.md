---
title: Migrate a Site That Was Created Using a Deprecated Upstream to Drupal:latest
subtitle: Introduction
description: 
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-hosted-deprecated-upstream
anchorid: drupal-latest-hosted-deprecated-upstream
editpath: drupal-latest/drupal-latest-hosted-deprecated-upstream/01-introduction.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [overview, migrate]
newcms: [drupal9, drupal, drupal8, drupal10]
audience: [development]
product: []
integration: []
---

This guide will show you how to migrate a site that meets the following criteria to drupal:latest:

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Pantheon                    |                                                                     Dashboard                                                                      |                                                                                   Created using drupal-project or drupal-recommended upstream                                                                                   |

<Partial file="drupal-latest/see-landing.md" />

<Alert title="Note" type="info" >

This upgrade will not maintain your site’s commit history.

</Alert>

- drupal:latest sites created on the platform prior to November 30, 2021 use the [drupal:latest](https://github.com/pantheon-upstreams/drupal-project) upstream. 
- drupal:latest sites created on the platform prior to May 2022 use the [Drupal Recommended](https://github.com/pantheon-upstreams/drupal-recommended) upstream.
- We now recommend using the [drupal:latest Composer Managed](https://github.com/pantheon-upstreams/drupal-composer-managed) upstream.

## More Resources

- [Composer Fundamentals and Workflows](/guides/composer)
