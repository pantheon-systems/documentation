---
title: Pantheon Agency Tips
description: We've compiled some great tips for agencies working on Pantheon.
tags: [manage]
categories: [manage]
contributors: [davidneedham]
---
We've compiled some great tips for agencies working on Pantheon. They are loosely ordered from basic to advanced and cover a variety of topics. If you would like to see something added to this doc, please contribute using the GitHub link at the top of this article.

## Supporting Organizations
When working with a client who has ownership of their Pantheon site, either through an individual account or another organization, make sure your agency is added as a [supporting organization](https://pantheon.io/docs/team-management/#add-a-supporting-organization) to the site. This will add the site to your agency dashboard and also grant all users of your organization permissions to the site. This makes it easy for the client to add your agency for a project and allows you to manage permissions for your team in one place, your agency dashboard, without needing to add or remove users from sites one at a time.

## Pantheon Docs
Pantheon has a great internal documentation team and our docs are always a great way to get the latest information. Some [docs](https://pantheon.io/docs/) worth noting, and good for new members of your team, are:
- [Pantheon platform consideration](https://pantheon.io/docs/platform-considerations/)
- [Advanced caching](https://pantheon.io/docs/caching-advanced-topics/)
- [Required reading](https://pantheon.io/docs/required-reading/) (aka Pantheon 101)
- [Non-standard file locations](https://pantheon.io/docs/non-standard-file-paths/)
- [Unsupported modules and plugins](https://pantheon.io/docs/unsupported-modules-plugins/)
- [Pantheon FAQs](https://pantheon.io/docs/faq/)
- [Pricing comparison](https://pantheon.io/pricing-comparison)

##Power Users Group

Pantheon has a power user group with a forum on [Google Groups](https://groups.google.com/a/pantheon.io/forum/#!forum/power-users). This is a great place to read about advanced Pantheon topics, post questions, and stay up to date on Pantheon developments. The power users group also has a [Slack channel](http://slackin.pantheon.io/).

##Pantheon For Agencies Webinar Series

The Agency and Community team at Pantheon recorded a [Pantheon for Agencies webinar series](https://pantheon.io/agency-training-series-part-1). This six part series starts with an introduction and moves into power tools and advanced workflows on Pantheon.

##HTTPS

There are currently two ways to enable HTTPS for a site on Pantheon. The first is to obtain a static IP address for the site and upload an SSL certificate. See the [doc on enabling HTTPS](https://pantheon.io/docs/enable-https/) for details. The second is to enable HTTPS with a third-party, such as a CDN. See the [HTTPS for free with CloudFlare doc](https://pantheon.io/docs/guides/cloudflare-enable-https/) for an example.


##Solr

Sites at the Professional plan level and above can have Solr enabled for search indexing. See our docs on [Solr](https://pantheon.io/docs/solr/), [Solr with WordPress](https://pantheon.io/docs/wordpress-solr/) and [Solr with Drupal](https://pantheon.io/docs/solr-drupal/) for details.

##Redis

Sites at the Professional plan level and above can have Redis enabled for object caching. See our docs on [Redis](https://pantheon.io/docs/redis/) and [Redis with WordPress](https://pantheon.io/docs/wordpress-redis/) for details.

##WordPress

###PHP Sessions

In order to use PHP Sessions with a WordPress site you will need to install the [WordPress Native PHP Sessions plugin](https://wordpress.org/plugins/wp-native-php-sessions/). See the [doc on PHP Sessions with WordPress](https://pantheon.io/docs/wordpress-sessions/) for details.

###WordPress Multisite

Running a WordPress Site Network requires a special configuration that is only available on Elite plans, and only Pantheon employees have the ability to create the sites and add you to the team. See the [doc on WordPress site networks](https://pantheon.io/docs/wordpress-site-networks/) for details.

###Migration

Pantheon has a great WordPress plugin to help migrate sites to Pantheon. WordPress migrations are baked into the Pantheon dashboard - simply click _Migrate Existing Site_ and select WordPress to get started.

##Drupal 8 and Composer

Drupal 8 is the first version of Drupal to include Composer usage within Drupal Core itself. We have a dedicated documentation page for [Composer usage with Drupal 8](https://pantheon.io/docs/composer-drupal-8/).

##Pantheon Power Tools

###Terminus

[Terminus](https://github.com/pantheon-systems/terminus) is Pantheon&#39;s command line tool and almost has a 1:1 parity with the Pantheon dashboard. When working with Terminus it is recommended to use a [Terminus machine token](https://pantheon.io/docs/machine-tokens/). This allows for passwordless authentication, which is often necessary for bots, scripts and continuous integration.

Terminus is extendable and has many plugins available. A complete list is on the [Terminus plugins wiki page](https://github.com/pantheon-systems/terminus/wiki/Plugins#known-plugins). Two favorites are [Filer](https://github.com/sean-e-dietrich/terminus-filer), which assists with opening Pantheon sites in many popular SFTP GUI clients, and [Pancakes](https://github.com/derimagia/terminus-pancakes), which open any Pantheon site database using a SQL GUI client. These two plugins eliminate logging into the Pantheon dashboard and copy/pasting SFTP/SQL credentials into your client.

###Quicksilver

Quicksilver is the name of Pantheon&#39;s platform hooks. You can hook into multiple platform actions on Pantheon and run a custom PHP script. See the [Quicksilver doc](https://pantheon.io/docs/quicksilver/) and [Quicksilver examples repository](https://github.com/pantheon-systems/quicksilver-examples) to get started.

###pantheon.yml

Used to configure PHP version, nested docroot and more. See more details on [the doc page](https://pantheon.io/docs/pantheon-yml/).

###New Relic

New Relic is an advanced tool for application monitoring and troubleshooting. Every site on Pantheon has access to New Relic APM Pro. See the [New Relic Pro doc](https://pantheon.io/docs/new-relic/) for details and how to get started. The following blog articles are also a great reference:

- [Getting Started with New Relic APM Pro](https://pantheon.io/blog/getting-started-new-relic-apm-pro)
- [New Relic &amp; Drupal: Find Your Site&#39;s Slow Spots](https://pantheon.io/blog/new-relic-drupal-find-site-slow-spots)
- [Troubleshooting WordPress Performance with New Relic](https://pantheon.io/blog/troubleshooting-wordpress-performance-new-relic)

##Cron

Due to the container infrastructure cron on Pantheon is not reliable. See the docs on [cron with WordPress](https://pantheon.io/docs/wordpress-cron/) and [cron with Drupal](https://pantheon.io/docs/drupal-cron/) for details.

##Kalabox

[Kalabox](http://www.kalabox.io/) is a local development tool that closely matches the Pantheon setup and has integration to push/pull databases and files from Pantheon.

##Advanced Workflows

###Upstreams

By default Pantheon has upstreams for vanilla WordPress and Drupal as well as a few community projects, like Open Atrium. In addition to these new sites can be created from a custom upstream. A custom upstream is a Github or BitBucket repository that your agency hosts and can include shared code used on many sites, such as a starter theme or plugins/modules, in addition to WordPress or Drupal core. When an update is pushed to the upstream it will show up in the dashboard for all sites created from that upstream. See our [doc on creating a custom upstream](https://pantheon.io/docs/custom-upstream/). You can see an example WordPress Upstream workflow in [this blog](https://pantheon.io/blog/pantheon-custom-upstream-wordpress-workflow).

###Build Steps

Pantheon currently does not support a code build step, which includes tasks such as installing dependencies with Composer or Git submodules, using JavaScript task runners such as Grunt or gulp, etc.

If a project needs a build step the recommended method is a two repository model where you have an external Git repository hosted outside of Pantheon with an intermittent build step and deploy the build artifact to Pantheon. Some samples are:

- Host a Git repository on GitLab and use their [continuous integration tools](http://docs.gitlab.com/ce/ci/yaml/README.html).
- Host a Git repository externally and use a tool such as [DeployBot to manage the build step](https://deploybot.com/guides/building-assets-with-grunt-or-gulp-during-deployment) and deployment to Pantheon
- Host a repository on GitHub and manage the build step and deployment with a continuous integration server. An example repository with GitHub, WordPress and CircleCI can be found [here](https://github.com/ataylorme/Advanced-WordPress-on-Pantheon/).

###Advanced Git Workflows

Pantheon provides a git repository for every site. If you wish to use GitHub&#39;s pull requests or other external tooling you can automate pushes from outside systems to Pantheon. The recommended method is a two repository model. Details can be found in the Build Steps section above.
