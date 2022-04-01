---
title: WordPress Site Networks
subtitle: Multisite Governance
description: Overview of WordPress multisite support on the Pantheon Platform.
layout: guide
type: guide
cms: "WordPress"
categories: [develop]
tags: [multisite]
permalink: docs/guides/multisite/multisite-governance/
editpath: multisite/04-multisite-governance.md
image: multisite
---

## Multisite on Pantheon

There are two primary layers involved in the governance system when you own a multisite on Pantheon.

**Pantheon**

- Organization admin (full portfolio)

    - Site owner (specific WP site)

**WordPress**

- Network site admin (all sites)

    - Site admin (individual site)

This means that both Pantheon and you manage your multisite.

Pantheon's responsibilities:

- Managing themes
- Administration
- Other technical aspects

Your responsibilities:

- Content creation and editing
- Content accessibility
- Creating pages (site administrator)
- Managing site settings (site administrator)
- Managing pages and posts
- Uploading media
- Editing menus

## Multiple, Single Site Governance

Each WordPress site is owned or maintained by a different group at the Pantheon level. There is a management difference between who owns the Pantheon account and can update code versus who manages the application with content and site-specific configuration.

- Site Owner US owns the US Pantheon site

    - Manager X manages WordPress

- Site Owner UK owns UK the Pantheon site

    - Manger Y manages WordPress

![Site Governance](../../../images/site-governance-multisite.png)

## Multisite Governance

A multisite setup setup can be more efficient for teams as long as roles and responsibilities are defined.

**1 Pantheon Owner**
- Pays for account
- Manages users who manage the platform, such as adding plugins, running backups, etc.

**2 WordPress Network Administrator**

- Manages the core WP site
- Assigns users to country-specific subsites.

**3 - 5 Individual Network Site Owners**

- Manages content and plugin settings for an individual multisite. 

![Multisite Governance Example](../../../images/multisite-governance-example.png)
