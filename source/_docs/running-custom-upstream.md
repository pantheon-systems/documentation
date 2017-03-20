---
title: Running a Custom Upstream on Pantheon
description: Detailed information about running custom distributions on Pantheon.
tags: [tools]
categories: []
---
An **upstream** is a specific package of your base web application. Drupal has several publicly maintained packages that can be used as an upstream for any project. WordPress does not have publicly maintained uptreams, however, privately maintained ones can be created. An example of this would be a package containing the WordPress Core, plus your company's collection of default plugins and themes.

Pantheon provides support for running three types of custom distribution on the platform:

1. **Public Distributions** - High quality distributions like [Commerce Kickstart](http://drupal.org/project/commerce_kickstart) or [Open Atrium](http://drupal.org/project/openatrium) which are released on [drupal.org](https://drupal.org/) and are supported by their distribution authors for everyone to use.

2. **Organizational Upstreams** - Organization-specific distributions that are private to the members of each organization, such as [OpenBerkeley](http://open.berkeley.edu).

3. **Partner Upstreams** - Private company specific upstreams built and supported by our [Pantheon Partners](https://www.pantheon.io/partners/program) for their internal development. For more information, check out [our blog post about how this can work](https://www.pantheon.io/blog/building-sites-common-codebases-pantheon-one-agencies).

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>You are not able to switch upstreams after creating a site. You will need to export your files, create a new site, and select a new upstream.</p></div>

When you are ready to start, please follow the instructions at [Adding Your Custom Upstream](/docs/custom-upstream).  
