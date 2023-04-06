---
title: WordPress Multisite
subtitle: Considerations
description: Review important WordPress Multisite considerations.
type: guide
contenttype: [guide]
innav: [false]
categories: [cms]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [multisite]
permalink: docs/guides/multisite/considerations/
editpath: multisite/02-considerations.md
---

Switching from a single-site to a WordPress Multisite requires migrating the code, database, and files of the single-site into a new WordPress Multisite.

Before you start using WordPress Multisite, keep these key details in mind:

* [The decision is permanent](#the-decision-is-permanent).
* [Choose between subdirectories and subdomains](#choose-between-subdirectories-and-subdomains).
* [Users are shared](#users-are-shared).
* [Themes and plugins are shared](#themes-and-plugins-are-shared).

This section provides important information to review if you are considering a WordPress Multisite.

## The Decision is Permanent

The choice between running classic single-site WordPress or a WordPress Multisite is permanent. Once you perform the initial configuration (which is relatively straightforward to do), it's technically challenging to switch back to single-site, and not supported on Pantheon.

## Choose Between Subdirectories and Subdomains
You must choose between using subdirectories or subdomains when configuring a WordPress Multisite. 

Given two new sites with slugs <Popover title="Slugs" content="Generally, <a class='external' href='https://wordpress.org/documentation/article/wordpress-glossary/#slug'>slugs</a> are URL friendly descriptions for a post or a page in WordPress. In the context of WordPress Multisites, a slug is a URL friendly description for a network site." /> `first-site` and `second-site`, each configuration will result in the following URLs:

* Subdirectories: `example.com/first-site` and `example.com/second-site`.
* Subdomains: `first-site.example.com` and `second-site.example.com`.

The key functional differences are:

- Custom domains can be mapped to sites on subdomains or in subdirectories, but subdirectories can't be mapped to sites on subdomains.
- Using subdomains will require you to set up your own DNS and add each custom domain to the Pantheon Dashboard for your site. Pantheon cannot provide separate subdomains in the `*.<env>-<site>.pantheonsite.io` namespace for WordPress Multisites.
- Serving subdomains over SSL requires a wildcard SSL certificate, or individual SSL certificates for each subdomain. In choosing subdirectories, all sites share the same domain and SSL certificate.

## Users are Shared
User data is shared among all sites on a WordPress Multisite. If you were to create a user with a username of `janedoe`, she will have the only `janedoe` username across all of the sites. If you were to change her display name from “Jane Doe” to “J. Doe”, the change would apply everywhere her name is displayed, regardless of the site.

User roles are a bit more complex. Because all sites on a WordPress Multisite share the same `wp_users` table, a given user can be assigned a user role on any site, and can have different user roles between sites (e.g. an Editor on one site, and an Administrator on another site).

By default, a user on a WordPress Multisite has no role on any site, unless explicitly added. However, if the user is considered logged in on one site in the network, they're logged in on all sites on the WordPress Multisite. Users can't access the WordPress Dashboard for a site unless they have a role on the site, but they will see the toolbar when logged in on a site they don't have a role on. For more details, see [Multisite Network Administration (WordPress docs)](https://wordpress.org/documentation/article/multisite-network-administration/).

## Themes and Plugins are Shared
The code for themes and plugins are shared among all sites on a WordPress Multisite. Themes can be enabled for activation on a per-site basis, or **network enabled** for activation on any network site. Plugins can be activated individually on each site, or **network activated** for activation across all sites.

Note the difference between enabling and activating. Themes can be enabled for an entire network by the **super user** (network administrator), which then allows **site administrators** to activate the theme on individual sites they manage. When plugins are network enabled but not network activated, the site administrator has the ability to activate the plugin.

Super users can also choose to activate plugins across the entire network; however, site administrators cannot override that activation. Plugins active across the entire network are stored within the `wp-content/plugins` and/or `wp-content/mu-plugins` directories and are **not** displayed within an individual site's plugins list. For more details, see [Multisite Network Administration: Plugins (WordPress docs)](https://wordpress.org/documentation/article/multisite-network-administration/).

Now that you understand all of the important aspects to running a WordPress Multisite, the next section will take you through the full process of configuring one.

## More Resources

- [WordPress Known Issues](/wordpress-known-issues)

- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)

- [Why WordPress Multisite?](https://pantheon.io/blog/why-wordpress-multisite)