---
title: Pantheon Agency Tips
description: Tips for agencies working on Pantheon.
tags: [agencies, organizations, collaborate]
contributors: [davidneedham]
searchboost: 90
contenttype: [doc]
innav: [true]
categories: [overview]
cms: [--]
audience: [agency]
product: [--]
integration: [--]
---
We've compiled some great tips for agencies working on Pantheon. They are loosely ordered from basic to advanced and cover a variety of topics. If you would like to see something added to this doc, please use the **Contribute** link at the top of this article.

## Become a Partner Agency / Join the Partner Program

One of the easiest tips we can offer for immediate results. Pantheon Partner Agencies are eligible for additional support options and other exclusive features. Visit the [Partner Program Page](https://pantheon.io/plans/partner-program?docs) to learn more.

Partner Agencies are added to the [Agency Partner Directory](https://directory.pantheon.io/agencies?docs) to make it easier for customers to be matched with the right agency.

## Learn Pantheon through Product Trainings, Resources, and Guides
[Get hands on training](https://pantheon.io/learn-pantheon?docs) from knowledgeable experts at Pantheon. Sign up for a training session, visit our office hours, and access our resources.

## Become a Supporting Workspace
When working with a client who has ownership of their Pantheon site, either through an individual account or another organization, make sure your agency is added as a [Supporting Workspace](/guides/account-mgmt/workspace-sites-teams/teams/#add-a-supporting-organization) to the site. This will add the site to your agency dashboard and also grant all users of your Workspace permissions to the site. This makes it easy for the client to add your agency for a project and allows you to manage permissions for your team in one place, your agency dashboard, without needing to add or remove users from sites one at a time.

## Extend Preferred Pricing to Your Clients
[Qualified agencies](https://pantheon.io/plans/partner-program?docs) have the ability to extend Preferred Pricing to their customers. To unlock Preferred Pricing for a site you are developing, [use our invite to pay method to transfer ownership and billing](/guides/legacy-dashboard/add-client-site/#send-an-invitation-to-pay-to-your-client) of the site to your client.

## Training Resources for New Team Members
Pantheon strives to maintain accurate and up-to-date documentation. Some docs worth noting, and good for new members of your team, are:

- [Pantheon platform consideration](/guides/platform-considerations)
- [Advanced caching](/caching-advanced-topics)
- [Symlinks and Assumed Write Access](/symlinks-assumed-write-access)
- [Modules and Plugins with Known Issues](/modules-plugins-known-issues)
- [Pantheon FAQs](/faq)
- [Pricing comparison](https://pantheon.io/plans/pricing/pantheon-web-hosting-pricing-comparison?docs)
- [Add a Client to Your Agency](/guides/legacy-dashboard/add-client-site) for an all-in-one guide on how to add a client's site to your agency and pass on Preferred Partner pricing.

## Be a Community Member
[Pantheon's community spaces](https://pantheon.io/developer-community) are great places to read about advanced Pantheon topics, post questions, and stay up to date on Pantheon developments.

## HTTPS
Follow our [Launch Essentials](/guides/launch) guide to automatically provision HTTPS for free using [Let's Encrypt](https://letsencrypt.org).

## Pantheon Search
All plans except for the Basic plan can enable [Pantheon Search](/solr) for search indexing. For installation instructions and additional details, see [Enabling Pantheon Search for WordPress](/guides/wordpress-developer/wordpress-solr) or [Enabling Pantheon Search with Drupal 7](/guides/solr-drupal/solr-drupal-7).

## Object Cache
All paid plans, except for the Basic plan, can use Object Cache.

For installation instructions and additional details, see the following:

- [Enable Object Cache Pro for WordPress](/object-cache/wordpress)
- [Enable Object Cache for Drupal](/object-cache/drupal)


## WordPress

The following tools are specifically for WordPress.

### PHP Sessions
In order to use PHP Sessions with a WordPress site you will need to install the [WordPress Native PHP Sessions plugin](https://wordpress.org/plugins/wp-native-php-sessions/). For details, see [WordPress and PHP Sessions](/guides/php/wordpress-sessions).

### WordPress Multisite
Running a WordPress Multisite requires a special configuration that is only available to contract customers. A WordPress Multisite upstream can only be created for your organization by Pantheon employees. For details, see [WordPress Multisite](/guides/multisite).

### Migration
The guided migration process for WordPress is baked into the Pantheon Workspace - simply click **Migrate Existing Site** and select WordPress to get started. For details, see [Migrate Sites to Pantheon](/guides/guided/).

## Drupal and Composer
Drupal now includes Composer usage within Drupal Core itself. For details, see [Composer Fundamentals and Workflows](/guides/composer).

## Advanced Tools

### Terminus
[Terminus](/terminus), the Pantheon command-line interface, has a near 1:1 parity with the Pantheon Dashboard. After installing this tool locally, login using a [machine token](/machine-tokens). This allows for passwordless authentication, which is often necessary for bots, scripts and continuous integration.

You can [extend Terminus and add new commands](/terminus/plugins) by installing or creating third-party plugins. For a complete list of supported plugins, see our [Plugin Directory](/terminus/directory). Two favorites are [Filer](https://github.com/terminus-plugin-project/terminus-filer-plugin), which assists with opening Pantheon sites in many popular SFTP GUI clients, and [Pancakes](https://github.com/derimagia/terminus-pancakes), which open any Pantheon site database using a SQL GUI client. These two plugins eliminate logging into the Pantheon dashboard and copying/pasting credentials into your client.

### Quicksilver
Quicksilver Platform Hooks allow you to automate actions in response to activity on the Dashboard. You can hook into various workflows and execute PHP scripts before or after the workflow's been triggered. For details, see [Automating and Integrating your Pantheon Workflow with Quicksilver Platform Hooks](/guides/quicksilver).

### Pantheon Configuration File
Use the `pantheon.yml` file to set up platform hooks and advanced site configurations such as PHP version, [nested docroot](/nested-docroot) and more. For details, see [The pantheon.yml Configuration File](/pantheon-yml).

### New Relic APM Pro

New Relic APM Pro is an advanced tool for application monitoring and troubleshooting, provided to all sites on Pantheon for free. For details, see [New Relic&reg; Performance Monitoring](/guides/new-relic).

## Cron
Pantheon does not provide a way to set custom scheduling for cron jobs. For details, see [Cron for Drupal](/drupal-cron) and [Cron for WordPress](/guides/wordpress-developer/wordpress-cron).

## Advanced Workflows

### Custom Upstreams
In addition to the [frameworks offered by Pantheon during the site creation process](/start-state), Custom Upstreams add a private installation option for all team members of an Workspace. A Custom Upstream is a remotely hosted repository that your agency manages, and can include shared code used on many sites, such as a starter theme or plugins/modules, in addition to the WordPress or Drupal core. When an update is pushed to the upstream it will show up in the dashboard for all sites created from that upstream. For details, see [Introduction to Custom Upstreams](/guides/custom-upstream). You can see an example WordPress Upstream workflow in this [blog post](https://pantheon.io/blog/pantheon-custom-upstream-wordpress-workflow).

### Build Steps

Pantheon currently does not support a code build step, which includes tasks such as installing dependencies with Composer or Git submodules, using JavaScript task runners such as Grunt or gulp, etc.

If a project needs a build step the recommended method is a two repository model where you have an external Git repository hosted outside of Pantheon with an intermittent build step, then deploy the build artifact to Pantheon. Some samples are:

- Host a Git repository on GitLab and use their [continuous integration tools](https://docs.gitlab.com/ee/ci/).
- Host a Git repository externally and use a tool such as [DeployBot to manage the build step](https://deploybot.com/guides/building-assets-with-grunt-or-gulp-during-deployment) and deployment to Pantheon
- Host a repository on GitHub and manage the build step and deployment with a continuous integration server. An example repository with GitHub, WordPress and CircleCI can be found [here](https://github.com/ataylorme/Advanced-WordPress-on-Pantheon/).

### Advanced Git Workflows
Pantheon provides a git repository for every site. If you wish to use GitHub's pull requests or other external tooling, you can automate pushes from outside systems to Pantheon. The recommended method is a two repository model. Details can be found in the [Build Steps](#build-steps) section above.
