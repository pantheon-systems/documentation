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

## What is a WordPress Site Network?

Pantheon supports [WordPress Site Networks](https://codex.wordpress.org/Glossary#Network) (also known as WordPress Multisite) which lets you create a network of sites using a single copy of the WordPress codebase and a common database. For those responsible for maintaining several or dozens of similar sites, WordPress Site Networks can make it much easier to fix bugs and deploy new features across all of those sites.

Pantheon's support is meant for the site network use case: a common codebase which powers a set of related sites. Running a WordPress Site Network requires a special configuration that is only available on [Elite plans](https://pantheon.io/pantheon-elite-plans), and only Pantheon employees have the ability to create the sites and add you to the team. [Complete this form](https://pantheon.io/pantheon-elite-plans) if you have questions about the network you’d like to host on Pantheon.

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Setting up a site network on top of a standard WordPress environment is not supported. It must be created by a Pantheon employee.</p>
</div>


## What use-cases work best on Pantheon?

We support clients running a network of functionally-similar sites. This includes, but is not limited to, networks of:

- Blogs for faculty at a university
- Franchise sites under a parent organization site
- Sections within a media publication
## Which use-cases are unsupported?

We do not support uses of WordPress Site Networks that run functionally-different or uniquely-owned sites on the same WordPress installation. This includes, but is not limited to:

- Software as a service (SAAS) products
- Agencies using one WordPress installation to support several customers
