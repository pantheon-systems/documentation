---
title: WordPress Multisite
subtitle: Introduction
description: Deploy a WordPress multisite on the Pantheon Platform.
layout: guide
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
anchorid: multisite
permalink: docs/guides/multisite/
nexturl: guides/multisite/considerations/
editpath: multisite/01-introduction.md
image: multisite
guidetoc: true
---
This guide covers the process of requesting, configuring, and maintaining a new WordPress Multisite on Pantheon. We'll also explore supported use cases, considerations and some common troubleshooting tips.

## About WordPress Multisite
Pantheon supports [WordPress Multisite](https://wordpress.org/documentation/article/wordpress-glossary/#multisite) which lets you create a network of sites using a single copy of the WordPress codebase and a common database. For those responsible for maintaining several or dozens of similar sites, WordPress Multisite can make it much easier to fix bugs and deploy new features across all of those sites.

![Multisite diagram](../../../images/Multisite-risk_2.png)

## Supported Use Cases
Pantheon supports the most common use case for site networks: a common codebase which powers a set of related sites. This includes, but is not limited to, networks of:

- Blogs for faculty at a university
- Franchise sites under a parent organization site
- Sections within a media publication
- [Bedrock based](https://carlalexander.ca/using-bedrock-with-pantheon/) or Composer based WP Multi-site is a possibility and can be discussed during onboarding

## Unsupported Use Cases
We do not support uses of WordPress Multisite that run functionally-different or uniquely-owned sites on the same WordPress installation. This includes, but is not limited to:

- Software as a service (SAAS) products
- Agencies using one WordPress installation to support several customers
- [WordPress Multi-Network](https://wordpress.org/plugins/wp-multi-network/) installations where multiple domains can be added aside from subdomains and subdirectories.

## Request a WordPress Multisite
WordPress Multisite requires a special configuration that is only available to select customers. Refer to [Pantheon Account Options & Site Hosting Pricing](https://pantheon.io/plans/pricing) to see if you qualify for a WordPress Multisite. A Pantheon employee must create a custom WordPress Multisite upstream in your organization for you to be able to create Multisites. Existing WordPress sites cannot be converted to a multisite, however they can be [migrated](/migrate-wordpress-multisite).

Reach out to your account manager to request that a new WordPress Multisite upstream be created for you. Once an employee of Pantheon has created the upstream, you will be able to use it create Multisites in your org. If you don't have an account manager, you can [contact sales](https://pantheon.io/contact-us).

 ## More Resources

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon/)

- [Supported WordPress Versions](/supported-wp)

- [Environment-Specific Configuration for WordPress Sites](/guides/environment-configuration/environment-specific-config)
