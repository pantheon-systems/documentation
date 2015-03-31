---
title: Running a Custom Upstream on Pantheon
description: Detailed information about running custom distributions.
category:
  - getting-started
  - managing

---

An **upstream** is a specific package of your base web application. Drupal has several publicly maintained packages that can be used as an upstream for any project. WordPress does not have publicly maintained uptreams, however, privately maintained ones can be created. An example of this would be a package containing the WordPress Core, plus your company's collection of default plugins and themes.

Pantheon provides support for running three types of custom distribution on the platform:

1. **Public Distributions** - These are high quality distributions like [Commerce Kickstart](http://drupal.org/project/commerce_kickstart) or [Open Atrium](http://drupal.org/project/openatrium) which are released on [drupal.org](https://drupal.org/) and are supported by their distribution authors for everyone to use. Public distributions are options available to all users of Pantheon as part of their site creation page. WordPress does not have any known publicly maintained upstream packages.

2. **Organizational Upstreams** - These are organizational specific distributions like [OpenBerkeley](http://vcaf.berkeley.edu/initiatives/vcio-projects/open-berkeley) developed and supported for our Pantheon One customers. Organizational distributions are private to the members of each organizations.

3. **Partner Upstreams** - These are company specific Upstreams built and supported by our [Pantheon Partners](https://www.getpantheon.com/partners/program) for their internal development. Partner upstreams are private to the members of each partner organization. For more information, check out [our blog post about how this can work](https://www.getpantheon.com/blog/building-sites-common-codebases-pantheon-one-agencies).

**Note** You are not able to switch upstreams after creating a site. You will need to export your files, create a new site, and select a new upstream.

Organizational and Partner upstreams are available under contractual terms. Please [create your agency profile](/docs/articles/organizations/pantheon-for-agencies/#create-your-agency-profile) to start the process.

When you are ready to start, please follow the instructions at [Adding Your Custom Upstream](/docs/articles/organizations/adding-a-custom-upstream).  

If you already have an upstream on the platform, see our guidance for   [Managing Upstreams](/docs/articles/organizations/managing-upstreams).
