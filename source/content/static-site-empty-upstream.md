---
title: Static Sites and Empty Upstreams
description: How and when to use empty upstreams to create static sites.
contributors: [michellecolon-pantheon, kyletaylored]
categories: [get-started]
tags: [upstreams, site]
reviewed: "2021-08-05"
---

Learn about what an Empty Upstream is, and how to use one to build a static site. Our standard [support](/support) rules apply.

## Overview

Pantheon supports two of the largest open source content management systems (CMS) on the web, WordPress and Drupal. Occasionally, when customers move their portfolio of sites over to Pantheon, some sites are static and do not need a full CMS, and this is where Empty Upstreams come in.

## What is an Empty Upstream?

An Empty Upstream is a [Custom Upstream](/custom-upstream) repository that is devoid of any content or code. For use cases where a customer needs a blank start state, Pantheon provides an Empty Upstream. A common use case to use Empty Upstreams is our [Build Tools](/guides/build-tools) setup; this can also be used in the case of static HTML or PHP sites.

## Getting Started

There are two ways to create an Empty site: via the [Pantheon Dashboard](/create-sites) and via [Terminus](/terminus).

<Youtube src="PTVqXxwOJ4Q" title="Pantheon Static Site and Empty Upstreams" /><br/>

1. Create a site via the Pantheon Dashboard: [Create Empty Site](https://dashboard.pantheon.io/sites/create?upstream_id=4c7176de-e079-eed1-154d-44d5a9945b65)
1. Create a site via Terminus:

  ```bash{promptUser: user}
terminus site:create my-new-site "My New Site" empty
  ```



<Alert title="Note" type="info">

You can access a list of available upstreams provided by Pantheon, including the Empty Upstream, using the Terminus `upstream:list` command.

```bash{promptUser: user}
terminus upstream:list --filter "type=core"
```

</Alert>

After creating a new site, follow the standard code commit processes by adding files either through [SFTP](/sftp) or [Git](/git).

## Frequently Asked Questions

### Can I create a static site on Pantheon?

Yes! You can start a new static site using an Empty Upstream.

### Can I add static files to an existing WordPress or Drupal site?

Yes, you can commit any static HTML file to your site that is unrelated to the CMS.

### Are there platform features I can/cannot use with this?

An Empty Upstream, behind the scenes, is essentially an empty Drupal environment. All of the tools you would find in the environment, given the site plan, will be available. But, if you are only using static HTML, tools like Redis and New Relic are not being utilized as no requests are being processed by PHP.

### Does traffic count the same way?

Yes, traffic will be counted the same way. Refer to our [Traffic Metrics](/traffic-limits) documentation for more information.

### Can I use this process to host statically generated JAMStack sites?

Yes, compiled static sites compiled that don't require a Drupal or WordPress CMS backend can be hosted on Pantheon using this method. Some customers utilize a two-site approach on Pantheon whereas one site is the CMS backend (headless WordPress or Drupal), and the other site is the decoupled frontend (Frontity, Gatsby, etc). Of course, you will likely have different deployment workflows for updating each site, and you would need to determine the best workflow for you and your team. 

For other Decoupled configurations, please refer to our [Decoupled Sites](/decoupled-sites) documentation.



## More on How Pantheon Uses Upstreams Here:

- [Choosing Your Start State](/start-state)
- [Switch Upstreams](/terminus/examples#switch-upstreams)
- [Introduction to Custom Upstreams](/custom-upstream)
- [Drupal 8 and Composer on Pantheon Without Continuous Integration](/guides/drupal-8-composer-no-ci#creating-the-pantheon-site)