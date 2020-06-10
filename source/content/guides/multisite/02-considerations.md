---
title: WordPress Site Networks
subtitle: Considerations
description: Overview of WordPress multisite support on the Pantheon Platform.
anchorid: considerations
layout: guide
type: guide
cms: "WordPress"
categories: [develop]
tags: [multisite]
multisite: true
generator: pagination
pagination:
    provider: data.multisitepages
use:
    - multisitepages
permalink: docs/guides/multisite/considerations/
nexturl: guides/multisite/config/
previousurl: guides/multisite/
editpath: multisite/02-considerations.md
image: multisite
---
Before you get started using WordPress Site Networks, there are a few key details to keep in mind:

* [The decision is permanent](#the-decision-is-permanent).
* [Choose between subdirectories and subdomains](#choose-between-subdirectories-and-subdomains).
* [Users are shared](#users-are-shared).
* [Themes and plugins are shared](#themes-and-plugins-are-shared).

Let's review each point at depth.

## The Decision is Permanent
The choice between running classic single-site WordPress or a WordPress Site Network is permanent. Once you perform the initial configuration (which is relatively straightforward to do), it's technically challenging to switch back to single-site, and not supported on Pantheon.

## Choose Between Subdirectories and Subdomains
When configuring a WordPress Site Network, you'll need to choose between using subdirectories or subdomains.

Given two new sites with slugs <Popover title="Slugs" content="Generally, <a class='external' href='https://codex.wordpress.org/Glossary#Slug'>slugs</a> are URL friendly descriptions for a post or a page in WordPress. In the context of WordPress Site Networks, a slug is a URL friendly description for a network site." /> `first-site` and `second-site`, each configuration will result in the following URLs:

* Subdirectories: `example.com/first-site` and `example.com/second-site`.
* Subdomains: `first-site.example.com` and `second-site.example.com`.

The key functional differences are:

- Custom domains can be mapped to sites on subdomains or in subdirectories, but subdirectories can't be mapped to sites on subdomains.
- Using subdomains will require you to set up your own DNS and add each custom domain to the Pantheon Dashboard for your site. Pantheon cannot provide separate subdomains in the `*.<env>-<site>.pantheonsite.io` namespace for Site Networks.
- Serving subdomains over SSL requires a wildcard SSL certificate, or individual SSL certificates for each subdomain. In choosing subdirectories, all sites share the same domain and SSL certificate.

## Users are Shared
User data is shared among all sites on a WordPress Site Network. If you were to create a user with a username of `janedoe`, she will have the only `janedoe` username across all of the sites. If you were to change her display name from “Jane Doe” to “J. Doe”, the change would apply everywhere her name is displayed, regardless of the site.

User roles are a bit more complex. Because all sites on a WordPress Site Network share the same `wp_users` table, a given user can be assigned a user role on any site, and can have different user roles between sites (e.g. an Editor on one site, and an Administrator on another site).

By default, a user on a WordPress Site Network has no role on any site, unless explicitly added. However, if the user is considered logged in on one site in the network, they're logged in on all sites on the WordPress Site Network. Users can't access the WordPress Dashboard for a site unless they have a role on the site, but they will see the toolbar when logged in on a site they don't have a role on. For more details, see [Multisite Network Administration (WordPress Codex)](https://codex.wordpress.org/Multisite_Network_Administration).

## Themes and Plugins are Shared
The code for themes and plugins are shared among all sites on a WordPress Site Network. Themes can be enabled for activation on a per-site basis, or **network enabled** for activation on any network site. Plugins can be activated individually on each site, or **network activated** for activation across all sites.

Note the difference between enabling and activating. Themes can be enabled for an entire network by the **super user** (network administrator), which then allows **site administrators** to activate the theme on individual sites they manage. When plugins are network enabled but not network activated, the site administrator has the ability to activate the plugin.

Super users can also choose to activate plugins across the entire network; however, site administrators cannot override that activation. Plugins active across the entire network are stored within the `wp-content/plugins` and/or `wp-content/mu-plugins` directories and are **not** displayed within an individual site's plugins list. For more details, see [Multisite Network Administration: Plugins (WordPress Codex)](https://codex.wordpress.org/Multisite_Network_Administration#Plugins).

Now that you understand all of the important aspects to running a Site Network, the next section will take you through the full process of configuring one.
