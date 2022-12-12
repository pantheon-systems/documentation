---
title: Managing Drupal and WordPress Subsites Under a Single Domain
description: Best practices for having Drupal or WordPress subsites on one domain.
tags: [multisite, redirects]
contenttype: [doc]
categories: [domains, overview]
newcms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

Pantheon only supports one application codebase and one database per site. We do not support database prefixes or Drupal multisite. Our workflow, backup, and deployment tools only perform as expected given the standard Pantheon setup.

## Best Practice Recommendations
We can't provide specific recommendations for your sites. However, we can provide general best practices if you have two sites under one domain. This is a common CMS problem, but there are strategies and workarounds available. Refer to [Multi-headed Drupal](https://www.palantir.net/blog/multi-headed-drupal) for more information.

### What Works on Pantheon

- Separate installs with [redirection to a subdomain](/guides/domains)
- Features-based installs with [Custom Upstreams](/guides/custom-upstream) and [redirection to a subdomain](/guides/domains)
- Domain access on a single site install. For a Drupal site, try the [Subfolders Domain (sub domains)](https://www.drupal.org/project/subfolders_domain) module but there is no guarantee it will work.
- [Organic Groups](https://www.drupal.org/project/og)  

## More Resources

- [Why Drupal Multisite Is Not Enterprise Grade](https://pantheon.io/blog/why-drupal-multisite-not-enterprise-grade)  
- [Drupal Multisite: Much Ado About Drupal Multisite](https://pantheon.io/blog/drupal-multisite-much-ado-about-drupal-multisite)  
