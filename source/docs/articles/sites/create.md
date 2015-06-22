---
title: Creating Sites
description:  How to create sites on the Pantheon platform.
category:
  - managing
keywords: create a site, how to create a site, creating sites, how to create a site on pantheon, import a site
---
On your User Dashboard, click  **Create your first site** or **Create a new site** to access **[sites/create](https://dashboard.pantheon.io/sites/create)**.

There are three ways that you can create a site:  

* Start from scratch by selecting a distribution.  
* Import an existing site.  
* Start with a custom upstream.  

###Start from Scratch

You can choose a base Drupal or WordPress version to quickly create a site on Pantheon. See [Getting Started](/docs/articles/getting-started) for detailed instructions on creating a new site.

###Import a Site to Pantheon
Manually import an existing Drupal or WordPress site archive via a file upload or by providing a web-accessible URL. See [Importing an Existing Site](https://pantheon.io/docs/articles/sites/create/importing-an-existing-site/) for detailed instructions.

###Start with a Custom Upstream
Pantheon provides support for running three types of custom distribution on the platform:

1. **Public Distributions** - These are high quality distributions like [Commerce Kickstart](http://drupal.org/project/commerce_kickstart) or [Open Atrium](http://drupal.org/project/openatrium) which are released on [drupal.org](https://drupal.org/) and are supported by their distribution authors for everyone to use. Public distributions are options available to all users of Pantheon as part of their site creation page. WordPress does not have any known publicly maintained upstream packages.

2. **Organizational Upstreams** - These are organizational specific distributions like [OpenBerkeley](http://vcaf.berkeley.edu/initiatives/vcio-projects/open-berkeley) developed and supported for our Pantheon One customers. Organizational distributions are private to the members of each organizations.

3. **Partner Upstreams** - These are company specific Upstreams built and supported by our [Pantheon Partners](https://www.getpantheon.com/partners/program) for their internal development. Partner upstreams are private to the members of each partner organization. For more information, check out [our blog post about how this can work](https://www.getpantheon.com/blog/building-sites-common-codebases-pantheon-one-agencies).

<div class="alert alert-warning" role="alert">
<strong>Note</strong>: You are not able to switch upstreams after creating a site. You will need to export your files, create a new site, and select a new upstream.</div>

Organizational and Partner upstreams are available under contractual terms. Please [create your agency profile](/docs/articles/organizations/pantheon-for-agencies/#create-your-agency-profile) to start the process.

When you are ready to start, please follow the instructions at [Adding Your Custom Upstream](/docs/articles/organizations/adding-a-custom-upstream).  

## See Also
 - [Developing Directly with SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode/)
 - [Going Live](/docs/articles/going-live/)
 - [Starting with Git](/docs/articles/local/starting-with-git/)
