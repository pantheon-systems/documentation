---
title: WordPress Multisite
subtitle: Introduction
description: Deploy a WordPress multisite on the Pantheon Platform.
type: guide
contenttype: [guide]
innav: [true]
categories: [cms]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [multisite]
contributors: [danielbachhuber, whitneymeredith]
permalink: docs/guides/multisite/
editpath: multisite/01-introduction.md
---
This guide covers the process of requesting, configuring, and maintaining a new WordPress Multisite on Pantheon. We'll also explore supported use cases, considerations and some common troubleshooting tips.

## About WordPress Multisite
Pantheon supports [WordPress Multisite](https://wordpress.org/documentation/article/wordpress-glossary/#multisite) which lets you create a network of sites using a single copy of the WordPress codebase and a common database. For those responsible for maintaining several or dozens of similar sites, WordPress Multisite can make it much easier to fix bugs and deploy new features across all of those sites.

![Multisite diagram](../../../images/Multisite-risk_2.png)

## Supported Use Cases
Pantheon supports the most common use case for WordPress Multisites: a common codebase which powers a set of related sites. This includes, but is not limited to, networks of:

- Blogs for faculty at a university
- Franchise sites under a parent organization site
- Sections within a media publication
- [Bedrock based](/guides/wordpress-composer/wordpress-composer-managed) or Composer based WP Multisite is a possibility and can be discussed during onboarding

## Unsupported Use Cases
We do not support uses of WordPress Multisite that run functionally-different or uniquely-owned sites on the same WordPress installation. This includes, but is not limited to:

- Software as a service (SAAS) products
- Agencies using one WordPress installation to support several customers
- A network of one or more multisites on a single instance, commonly achieved via plugins like [WordPress Multi-Network](https://wordpress.org/plugins/wp-multi-network/).
  - The supported alternative for this use case is to maintain a Custom Upstream that is based on Pantheon's WordPress Multisite framework, see the following section.

## Request a WordPress Multisite
WordPress Multisite requires a special configuration that is only available to select customers. Access to WordPress Multisite requires a Gold, Platinum, or Diamond level [Workspace plan](https://pantheon.io/plans/pricing).

Pantheon employees must enable a WordPress Multisite custom upstream on your behalf so your team can create new Multisites self-serve in your professional workspace. This is because WordPress Multisites use the `wordpress_network` [framework](/glossary/#framework), which includes Multisite specific Nginx configurations and differs from the default `wordpress` framework. Reach out to your account manager to get started, or if you don't have an account manager, you can [contact sales](https://pantheon.io/contact-us).


Existing WordPress sites cannot be converted to WordPress Multisites (since they are different frameworks), however you can spin up a new WordPress Multisite and then [manually migrate](/migrate-manual) the code, database and files from your existing site. 



 ## More Resources

- [Migrate a WordPress Multisite onto Pantheon](/migrate-wordpress-multisite)

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon/)

- [Supported WordPress Versions](/supported-wp)

- [Environment-Specific Configuration for WordPress Sites](/guides/environment-configuration/environment-specific-config)
