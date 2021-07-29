---
title: Pantheon Professional Services
subtitle: Managed Migration Service
description: Pantheon's Site Migration Service can help ensure a smooth migration of your existing sites.
categories: [develop]
tags: [professional-services, migration]
reviewed: "2021-04-01"
layout: guide
showtoc: true
permalink: docs/guides/professional-services/website-migration-service
anchorid: website-migration-service
editpath: professional-services/02-website-migration-service.md
---

The Managed Migration Service offered by [Pantheon Professional Services](/guides/professional-services) helps ensure a smooth migration of your existing sites to Pantheon.

[Contact us](https://pantheon.io/professional-services/website-migrations?docs) to get started.

The Migrations Team's goal is to migrate your site to our WebOps platform without any loss of functionality. This doc outlines how you can prepare the site and what you can expect from a Professional Services Migration.

For instructions on how to migrate a site yourself, see [Migrate Sites to Pantheon](/migrate).

If you are currently working with Pantheon Professional Services Migrations, reach out to your Migration Engagement Manager with any questions or concerns.

## Standard Migrations

Standard migrations include having our team of experts stand up your site on Pantheon, with everything included in the [Migration Project Scope](#migration-project-scope---whats-included) below.

## Premium Migrations

Premium Migrations are designed for larger and more complex sites - and include everything in the Standard Migrations scope plus one of the following:

- An extra 10 hours of troubleshooting/solutioning

- A Custom Upstream

- For older WP Network sites, conversion from `blogs.dir` to `wp-content/uploads` format

- One additional Code/Content resync

- One Performance Report, with estimates for recommended work

- Cron configurations that require a custom module

## Migration Project Scope - What's Included

You'll meet with a Migration Engagement Manager to outline the Project Requirements that will list the sites that the migration includes.

For all sites identified in the agreed on Project Requirements, the Migrations Team will:

- Transfer site code, database, and files

- Resync the database and user-uploaded files as a part of the site launch

- Split up Drupal Multisites

- Migrate WP Network sites, as networked or standalone sites

- Resync content prior to launch

- Configure Cron New Relic
  - Implement [cron](/drupal-cron) triggering services, via New Relic (on any non-Basic plan site)

### Included Tasks for Plugins, Modules, and Themes

- Plugin/Module audit
  - Disable unnecessary or unsupported modules and plugins

- Pantheon Plugin/Module installation
  - Installation of the Advanced Page Cache module/plugin, Native Sessions plugin, [Redis Object Cache](/object-cache), and/or [Pantheon Search](/solr), as needed

- Plugin & theme workarounds
  - [Implement solutions](#implement-solutions-to-known-existing-incompatibilities) to known existing incompatibilities (includes up to five hours' worth of work)

### Included Configuration Support

-  SSL certificate pre-provisioning
  - Ensure your site is configured for [HTTPS](/https) at launch or as soon as the domain certificates have been provisioned

- Email configuration
  - Set up external [email](/email) to work with the provider of your choice

- Redirect handling
  - Move [redirects](/redirects) from `htaccess` into `settings.php` or `wp-config`

- Search configuration
  - Configure sites that use Acquia Search to use Pantheon Search instead. (Review our documentation on [known limitations](/solr#known-limitations-of-pantheons-solr-service) first.)

Throughout the process, you'll have access to the Migrations Team through a dedicated Slack channel, and launch support when it's time to go live.

### Implement Solutions to Known Existing Incompatibilities

Each site migration includes up to **five hours** of the Migration Team's time for researching issues and implementing [known solutions](/modules-plugins-known-issues) to incompatibilities that have already been identified by our Success teams.

These hours are tracked by the Migrations Team and do not roll over for use on other sites.

### Site Configuration

During the Migration project kick-off, the team will review which of the following will be best for your site:

- Pantheon Default Upstreams
  - Before Pantheon hands the site off to you for User Acceptance Testing (UAT), Pantheon will update the site to use the most current Upstream release.
  - If this causes issues, we will roll it back to the current version on your production server

- Nested Docroot or Composer
  - Your sites will be migrated at their current version

- Custom or Alternative Upstream
  - Your sites will be brought over using the most current release in your upstream

## Out of Scope for Site Migrations

1. Sites not listed in the original migrations agreement
   - Contact your Account Rep to migrate more sites

1. Pantheon may not be able to migrate functionality if the site relies on resources that are not available on the platform, such as:
   - Issues that arise as a result of:

     - [Pantheon platform considerations](/platform-considerations)

     - Plugins or Modules that have been identified as [problematic](/modules-plugins-known-issues/)

   - Code that relies on specific PHP libraries, packages, server applications, or other dependencies not supported by the platform.

   - Anything dependent on languages not available on the platform (Java, Python, Perl, etc.)

1. Performance optimization

1. Additional resync of database and files

1. Updating custom or contributed modules and plugins

1. Fixing issues that already existed on the source server

1. Resolving caching issues

   - Pantheon recommends that you [verify Varnish caching](https://varnishcheck.pantheon.io/) on each site

1. Deployment workflow configuration, updates, or changes

1. Preservation of Git history

1. Adding any new functionality that didn't previously exist on the site, which includes:

   - Enabling or disabling S3 or other CDN configurations

   - Switching to Pantheon Search from another search platform

1. Any code changes made to the site after the initial migration begins.

   - You may add any code changes to a Multidev and merge them in post-launch, or once you take ownership of the site, move changes in before launch

## Professional Services (PS) Hours

You may elect to purchase PS Hours (four hour minimum) for the Pantheon Migrations Team to complete additional work, which can include:

- Creating a Custom Upstream for you

- Creating cron-related custom modules

- Performing additional database or file syncs

- Configuring or decommissioning S3 (existing S3 integrations are fine, this is just for changes to the file structures in the application)

- Ensuring your applications are working with any required [Secure Integrations](/secure-integration)

- Working on your custom or contrib modules and plugins to troubleshoot issues your team is unable to resolve

- Re-configuring your application layer SSO, if there are issues post-migration

These used to be called Custom Application Services (CAS) hours.

## Your Responsibilities

1. Provide a site inventory prior to the migration kick-off meeting

1. Join and participate in the dedicated migration support channel that will be provided in Pantheon’s Slack instance

1. Provide the Pantheon Migrations Team with necessary access to current host or to code, database, and files

1. Initiate a code freeze from the migration's start until the site(s) launch on Pantheon

   - Otherwise you accept responsibility for any code changes made to the source server once migrations have commenced.

1. Perform any User Acceptance Testing (UAT) within the timeline specified by the migrations agreement

1. Communicate content freeze to affected stakeholders

1. Perform DNS cutover within the timeline specified in the migrations agreement

## See Also

- [Migrate Sites to Pantheon](/migrate) and [Manually Migrate Sites to Pantheon](/migrate-manual) to see what it takes to migrate a site yourself
- [Migrate to Pantheon: WordPress Site Networks](/migrate-wordpress-site-networks)
- [Video: Guided WordPress Migrations](/videos/migrate-wordpress)
