---
title: WordPress Site Networks
subtitle: Introduction
description: Overview of WordPress multisite support on the Pantheon Platform.
layout: guide
type: guide
contributors: [danielbachhuber]
anchorid: multisite
multisite: true
generator: pagination
pagination:
    provider: data.multisitepages
use:
    - multisitepages
permalink: docs/guides/multisite/
nexturl: guides/multisite/considerations/
editpath: multisite/01-introduction.md
image: multisite
---
## About WordPress Site Networks
Pantheon supports [WordPress Site Networks](https://codex.wordpress.org/Glossary#Network){.external} (also known as WordPress Multisite) which lets you create a network of sites using a single copy of the WordPress codebase and a common database. For those responsible for maintaining several or dozens of similar sites, WordPress Site Networks can make it much easier to fix bugs and deploy new features across all of those sites.

![Multisite diagram](/source/docs/assets/images/Multisite-risk_2.png)

## Supported Use Cases
Pantheon supports the most common use case for site networks: a common codebase which powers a set of related sites. This includes, but is not limited to, networks of:

- Blogs for faculty at a university
- Franchise sites under a parent organization site
- Sections within a media publication

## Unsupported Use Cases
We do not support uses of WordPress Site Networks that run functionally-different or uniquely-owned sites on the same WordPress installation. This includes, but is not limited to:

- Software as a service (SAAS) products
- Agencies using one WordPress installation to support several customers

## Request a WordPress Site Network
Running a WordPress Site Network requires a special configuration that is only available on Elite plans, and only Pantheon employees have the ability to create the sites and add you to the team.

[Complete this form](https://pantheon.io/pantheon-elite-plans){.external} or reach out to your existing account manager to request a new WordPress Site Network be created for you. Once an employee of Pantheon has created the network, you will receive an email informing you that you've been added to the site.

Existing WordPress sites cannot be converted to a network, however they can be [migrated](/docs/migrate-wordpress-site-networks/).
