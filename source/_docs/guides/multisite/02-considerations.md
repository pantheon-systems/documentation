---
title: Guide to WordPress Site Networks
subtitle: Site Network Considerations
description: Overview of WordPress multisite support on the Pantheon Platform.
anchorid: considerations
layout: guide
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
---
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Setting up a site network on top of a vanilla WordPress installation is not supported. It must be created by a Pantheon employee.</p>
</div>

Before you get started using WordPress Site Networks, there are a few key details to keep in mind.

## The decision is permanent

The choice between running classic single-site WordPress or a WordPress Site Network is permanent. Once you perform the initial configuration (which is relatively straightforward to do), it’s technically challenging to switch back to single-site, and not supported on Pantheon.

## Choose between subdirectories and subdomains

When configuring a WordPress Site Network, you’ll need to choose between using subdirectories or subdomains. You’re choosing between `mydomain.com/first-site` / `mydomain.com/second-site` or `first-site.mydomain.com` / `second-site.mydomain.com`.

The key differences are:

- Custom domains can be mapped to sites on subdomains or in subdirectories, but subdirectories can’t be mapped to sites on subdomains.
- Using subdomains will require you to set up your own DNS and add each domain to the Pantheon Dashboard for your site. Pantheon cannot provide separate subdomains in the `pantheon.io` namespace for site networks.
- Serving subdomains over SSL requires a wildcard SSL certificate, or individual SSL certificates for each subdomain. In choosing subdirectories, all sites share the same domain and SSL certificate.


## Users are shared

User data is shared among all sites on a WordPress Site Network. If you were to create a user with a username of “janedoe”, she will have the only “janedoe” username across all of the sites. If you were to change her display name from “Jane Doe” to “J. Doe”, the change would apply everywhere her name is displayed, regardless of the site.

User roles are a bit more complex. Because all sites on a WordPress Site Network share the same `wp_users` table, a given user can be assigned a user role on any site and can have different user roles between sites (e.g. an Editor on one site, and an Administrator on another site).

WordPress’ default behavior is that a user on a WordPress Site Network has no role on any site, unless explicitly added. However, if the user is considered logged in on one site in the network, they’re logged in on all sites on the WordPress Site Network. Users can’t access the WordPress Dashboard for a site unless they have a role on the site, but they will see the toolbar when logged in on a site they don’t have a role on.

[Read more about site network user roles](https://codex.wordpress.org/Multisite_Network_Administration).

## Sites share themes and plugins

The code for themes and plugins are shared among all sites on a WordPress Site Network.
Themes can be enabled for activation on a per-site basis, or network-enabled for activation on any site. Plugins can be activated individually on each site, or network-activated for activation across all sites.

Note the difference between “enabling” and “activating”. Themes can be “enabled” for an entire network by the "super user" (network administrator), which then allows site administrators to activate the theme on individual sites they manage. When plugins are installed but not network-activated, the site administrator has the ability to activate the plugin.

Super users can also choose to activate plugins across the entire network; however, site administrators cannot override that activation. Plugins active across the entire network are stored within the `wp-content/plugins` and/or `wp-content/mu-plugins` directories and are **not** displayed within an individual site's plugins list. For more information, see [Multisite Network Administration: Plugins](https://codex.wordpress.org/Multisite_Network_Administration#Plugins).
