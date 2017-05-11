---
title: Pantheon Agency Tips
description: Tips for agencies working on Pantheon.
tags: [tools]
categories: []
contributors: [davidneedham]
---
We've compiled some great tips for agencies working on Pantheon. They are loosely ordered from basic to advanced and cover a variety of topics. If you would like to see something added to this doc, please use the **Contribute** link at the top of this article.

## Supporting Organizations
When working with a client who has ownership of their Pantheon site, either through an individual account or another organization, make sure your agency is added as a [supporting organization](/docs/team-management/#add-a-supporting-organization) to the site. This will add the site to your agency dashboard and also grant all users of your organization permissions to the site. This makes it easy for the client to add your agency for a project and allows you to manage permissions for your team in one place, your agency dashboard, without needing to add or remove users from sites one at a time.

## Training Resources for New Team Members
Pantheon strives to maintain accurate and up-to-date documentation. Some docs worth noting, and good for new members of your team, are:

- [Pantheon platform consideration](/docs/platform-considerations/)
- [Advanced caching](/docs/caching-advanced-topics/)
- [Non-standard file locations](/docs/non-standard-file-paths/)
- [Unsupported modules and plugins](/docs/unsupported-modules-plugins/)
- [Pantheon FAQs](/docs/faq/)
- [Pricing comparison](https://pantheon.io/pricing-comparison)

## Power Users Group
The [Power Users](/docs/power-users) group is a great place to read about advanced Pantheon topics, post questions, and stay up to date on Pantheon developments.

## Pantheon For Agencies Webinar Series
The Agency and Community team at Pantheon produced a [six part training series](https://pantheon.io/agency-training-series-part-1) that starts with an introduction and moves into power tools and advanced workflows.

## HTTPS
There are currently two ways to enable HTTPS for a site on Pantheon. The first is to obtain a static IP address for the site and upload an SSL certificate. For details, see [Enable Secure HTTPS Communication](/docs/enable-https/). The second is to terminate HTTPS with a third-party service, such as a CDN. For details, see [Adding HTTPS For Free With Cloudflare](/docs/guides/cloudflare-enable-https/).


## Solr
All plans except for the Personal plan can enable [Solr](/docs/solr) for search indexing. For installation instructions and additional details, see [Enabling Solr for WordPress](/docs/wordpress-solr), [Enabling Solr with Drupal](/docs/solr-drupal) or [Enabling Solr on Drupal 8](/docs/solr-drupal-8).

## Redis
All plans except for the Personal plan can enable Redis for object caching. For installation instructions and additional details, see [Redis](/docs/redis) or [Redis with WordPress](/docs/wordpress-redis/).

## WordPress

The following tools are specifically for WordPress.

### PHP Sessions
In order to use PHP Sessions with a WordPress site you will need to install the [WordPress Native PHP Sessions plugin](https://wordpress.org/plugins/wp-native-php-sessions/). For details, see [WordPress and PHP Sessions](/docs/wordpress-sessions/).

### WordPress Multisite
Running a WordPress Site Network requires a special configuration that is only available on Elite plans. These sites can only be created by Pantheon employees. For details, see [WordPress Site Networks](/docs/wordpress-site-networks/).

### Migration
The guided migration process for WordPress is baked into the Pantheon User Dashboard - simply click **Migrate Existing Site** and select WordPress to get started. For details, see [Migrate to Pantheon: WordPress](/docs/migrate-wordpress).

## Drupal 8 and Composer
Drupal 8 is the first version of Drupal to include Composer usage within Drupal Core itself. For details, see [Using Drupal 8 and Composer](/docs/composer-drupal-8/).

## Advanced Tools

### Terminus
[Terminus](/docs/terminus), the Pantheon command-line interface, has a near 1:1 parity with the Pantheon Dashboard. After installing this tool locally, login using a [machine token](/docs/machine-tokens). This allows for passwordless authentication, which is often necessary for bots, scripts and continuous integration.

You can [extend Terminus and add new commands](/docs/terminus/plugins/) by installing or creating third-party plugins. For a complete list of supported plugins, see our [Plugin Directory](/docs/terminus/plugins/directory). Two favorites are [Filer](https://github.com/sean-e-dietrich/terminus-filer), which assists with opening Pantheon sites in many popular SFTP GUI clients, and [Pancakes](https://github.com/derimagia/terminus-pancakes), which open any Pantheon site database using a SQL GUI client. These two plugins eliminate logging into the Pantheon dashboard and copying/pasting credentials into your client.

### Quicksilver
Quicksilver Platform Hooks allow you to automate actions in response to activity on the Dashboard. You can hook into various workflows and execute PHP scripts before or after the workflow's been triggered. For details, see [Automating and Integrating your Pantheon Workflow with Quicksilver Platform Hooks](/docs/quicksilver).

### Pantheon Configuration File
Use the `pantheon.yml` file to set up platform hooks and advanced site configurations such as PHP version, [nested docroot](/docs/nested-docroot/) and more. For details, see [The pantheon.yml Configuration File](/docs/pantheon-yml/).

### New Relic APM Pro

New Relic APM Pro is an advanced tool for application monitoring and troubleshooting, provided to all sites on Pantheon for free. For details, see [New Relic APM Pro](/docs/new-relic/). The following blog posts are also a great reference:

- [Getting Started with New Relic APM Pro](https://pantheon.io/blog/getting-started-new-relic-apm-pro)
- [New Relic &amp; Drupal: Find Your Site&#39;s Slow Spots](https://pantheon.io/blog/new-relic-drupal-find-site-slow-spots)
- [Troubleshooting WordPress Performance with New Relic](https://pantheon.io/blog/troubleshooting-wordpress-performance-new-relic)

## Cron
Pantheon does not provide a way to set custom scheduling for cron jobs. For details, see [Cron for Drupal](/docs/drupal-cron) and [Cron for WordPress](/docs/wordpress-cron).

## Kalabox

[Kalabox](/docs/kalabox) is a local development tool that mirrors Pantheon environments with excellent integration to sync work back and forth.

## Advanced Workflows

### Custom Upstreams
In addition to the [frameworks offered by Pantheon during the site creation process](/docs/start-state), Custom Upstreams add a private installation option for all team members of an organization. A Custom Upstream is a remotely hosted repository that your agency manages, and can include shared code used on many sites, such as a starter theme or plugins/modules, in addition to the WordPress or Drupal core. When an update is pushed to the upstream it will show up in the dashboard for all sites created from that upstream. For details, see [Introduction to Custom Upstreams](/docs/custom-upstream/). You can see an example WordPress Upstream workflow in this [blog post](https://pantheon.io/blog/pantheon-custom-upstream-wordpress-workflow).

### Build Steps

Pantheon currently does not support a code build step, which includes tasks such as installing dependencies with Composer or Git submodules, using JavaScript task runners such as Grunt or gulp, etc.

If a project needs a build step the recommended method is a two repository model where you have an external Git repository hosted outside of Pantheon with an intermittent build step, then deploy the build artifact to Pantheon. Some samples are:

- Host a Git repository on GitLab and use their [continuous integration tools](http://docs.gitlab.com/ce/ci/yaml/README.html).
- Host a Git repository externally and use a tool such as [DeployBot to manage the build step](https://deploybot.com/guides/building-assets-with-grunt-or-gulp-during-deployment) and deployment to Pantheon
- Host a repository on GitHub and manage the build step and deployment with a continuous integration server. An example repository with GitHub, WordPress and CircleCI can be found [here](https://github.com/ataylorme/Advanced-WordPress-on-Pantheon/).

### Advanced Git Workflows
Pantheon provides a git repository for every site. If you wish to use GitHub's pull requests or other external tooling, you can automate pushes from outside systems to Pantheon. The recommended method is a two repository model. Details can be found in the [Build Steps](#build-steps) section above.
