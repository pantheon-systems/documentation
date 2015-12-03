---
layout: landing
wordpressnetworks: true
use: [wordpressnetworks]
title: WordPress Site Networks
description: Overview of WordPress multisite support on the Pantheon Platform. Includes supported use-cases, links to terms of service, and links to relevant documentation for getting started and managing multisite development within the Pantheon workflow.
---

Pantheon does support [WordPress Site Networks](https://codex.wordpress.org/Glossary#Network) created by WordPress' Multisite feature. The Pantheon WordPress Site Networks product is intended for high-profile site networks with a nearly common codebase. WordPress Site Networks require an [Elite plan](https://pantheon.io/pantheon-elite-plans), and only Pantheon employees have the ability to create the product and add you to the team. [Complete the form](https://pantheon.io/pantheon-elite-plans) if you have questions about the network you’d like to host.

This product combines a specific NGINX configuration with a currently 0-commit-different [fork of Core WordPress](https://github.com/pantheon-systems/wordpress-network). The NGINX modifications to our core version of WordPress are not available to self-service users, and sites running WordPress Multisite on self-service plans remain unsupported. The NGINX configuration attached to [Pantheon WordPress](https://github.com/pantheon-systems/wordpress) lacks the adaptations necessary to allow the Multisite feature to work correctly.

## Supported Use Cases
We support clients running a network of several functionally-similar sites. This includes, but is not limited to, networks of:

 - blogs for faculty at a University
 - sites for academic departments at a University or schools in a district
 - franchise sites under a parent organization site

## Unsupported Use Cases
We do not support uses of Multisite that run functionally-different or uniquely-owned sites on the same WordPress installation. This includes, but is not limited to:

 - Software as a aervice (SAAS) products
 - Agencies using one WordPress installation to support several customers

## About WordPress Site Networks
The WordPress Multisite feature lets you create a network of sites using a single copy of the WordPress codebase and a common database. For those responsible for maintaining several or dozens of similar sites, Multisite can make it much easier to fix bugs and deploy new features across all of those sites. For official documentation on WordPress Site Networks, see [WordPress Codex Network Documentation](https://codex.wordpress.org/Category:Network).

Before you get started using WordPress Multisite, there are a few key technical details to keep in mind.

### 1. Conversion is permanent

Converting an existing single WordPress environment to Multisite is a permanent process. Once you perform the conversion (which is relatively straightforward to do), it’s technically challenging to go back. Please remember to backup your database beforehand.

### 2. Choose between subdirectories and subdomains

When installing WordPress Multisite, you’ll be presented with the option to choose between sites in subdirectories or sites on subdomains. With pantheon.io as your primary domain and a site with slug “second-site”, you’re choosing between pantheon.io/second-site or second-site.pantheon.io.

The key differences are:
- Custom domains can be mapped to sites on subdomains or in subdirectories, but subdirectories can’t be mapped to sites on subdomains.
- Serving subdomains over SSL, even if it’s just the Dashboard, will either require individual SSL certificates for each subdomain or a wildcard SSL certificate.

### 3. Users are shared

User data is shared among all sites on the network. If you were to create a user with a username of “janedoe”, she will have the only “janedoe” username across all of the sites. If you were to change her display name from “Jane Doe” to “J. Doe”, the change would apply everywhere her name is displayed, regardless of site.

User roles are a bit more complex. Because all sites on the network share the same `wp_users` table, a given user can be assigned a user role on any site and can have different user roles between sites (e.g. an Editor on one site, and an Administrator on another site). WordPress’ default behavior is that a user on the network has no role on any site, unless explicitly added. However, if the user is considered logged in on one site in the network, they’re logged in on all sites on the network. Users can’t access the WordPress Dashboard for a site unless they have a role on the site, but they will see the toolbar when logged in on a site they don’t have a role on.

[Read more about site network user roles](https://codex.wordpress.org/Multisite_Network_Administration).

### 4. Sites share themes and plugins

The code for themes and plugins are shared among all sites on the network.

Themes can be enabled for activation on a per-site basis, or network-enabled for activation on any site. Plugins can be activated individually on each site, or network-activated for activation across all sites.

Note the difference between “enabling” and “activating”. Themes can be “enabled” for an entire network by the "super user" (network administrator), which then allows site administrators to activate the theme on individual sites they manage. When Plugins are installed but not network-activated, the site administrator has the ability to activate the plugin. Super users can also choose to activate plugins across the entire network, however site administrators cannot override that activation. Plugins active across the entire network are stored within the `wp-content/plugins` and/or `wp-content/mu-plugins` directories and are **not** displayed within an individual site's plugins list. For more information, see [Multisite Network Administration: Plugins](https://codex.wordpress.org/Multisite_Network_Administration#Plugins).
