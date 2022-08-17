---
title: Migrate a Custom Upstream to Drupal 9
subtitle: Introduction
description: Learn how to migrate a Custom Upstream to Drupal 9
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted-createcustom
anchorid: drupal-9-v8
editpath: drupal-9/drupal-9-hosted-createcustom/01-introduction.md
reviewed: "2021-03-31"
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Pantheon                    |                                                                  Custom Upstream                                                                   |                                                                                             --                                                                                             |

 Working in a new branch, you will replace the entire file structure with the code from Pantheon's Integrated Composer upstream, then re-add your contrib and custom code to the new codebase. Then, you will create multidev environments on individual sites for testing and to apply any site-specific code customizations. 


<Partial file="drupal-9/see-landing.md" />

