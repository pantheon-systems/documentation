---
title: Upgrade a Custom Upstream to the Latest Version of Drupal
subtitle: Introduction
description: Learn how to migrate a Custom Upstream to the latest version of Drupal
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-hosted-createcustom
editpath: drupal/drupal-hosted-createcustom/01-introduction.md
reviewed: "2022-12-12"
contenttype: [guide]
innav: [true]
categories: [update, custom-upstreams]
cms: [drupal8, drupal9, drupal10]
audience: [development]
product: [dashboard, custom-upstreams]
integration: [--]
---

This guide will show you how to migrate a site that meets the following criteria to the latest version of Drupal:

| Current Host | How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> |  Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
| :-------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                   Pantheon                    |                                                               Custom Upstream                                                                |                                                                                             --                                                                                             |

During this process, you will work in a new branch to replace the entire file structure with the code from Pantheon's Integrated Composer upstream, and then re-add your contrib and custom code to the new codebase. Then, you will create Multidev environments on individual sites for testing and to apply any site-specific code customizations.

<Partial file="drupal/see-landing.md" />
