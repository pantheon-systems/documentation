---
title: Scoping a Migration - Professional Services
description: On of the services offered by Pantheon Professional Services is a smooth migration of existing sites. This doc outlines what you can expect.
tags: [services, migration]
categories: [develop]
reviewed: "2021-02-01"
---

## Migration Project Scope Statement

If you are currently working with Pantheon Professional Services Migrations, please reach out to your Migration Engagement Manager via Slack with any questions or concerns regarding this document.

Our goal is to migrate your site without any loss of functionality.

**As such the following are included in your migration:**

- Bringing over your site code, database, and user upload files
- Resyncing your database and user upload files as a part of the site launch
- Disabling unneeded/unsupported modules/plugins
- Moving [redirects](/redirects/) from `htaccess` into `settings.php` or `wp-config`
- Setting up external [SMTP](/smtp) to work with the provider of your choice
- Implement [cron](/drupal-cron) triggering services, via New Relic (on any non-Basic plan site)
- For sites using Acquia Search, Pantheon will switch you to Pantheon Solr
  - Please be certain to review our documentation on [known limitations](/solr#known-limitations-of-pantheons-solr-service) first
- Ensuring your site is configured for [HTTPS](/https) at launch or as soon as the domain certificates have been provisioned

Each site migration includes up to **5 hours** to be used researching issues or implementing [known solutions](/modules-plugins-known-issues/). These hours **do not** roll over for use on other sites. If we mention that we are out of hours, it means we have already used up these 5 hours.

**This includes handling core considerations, for example:**

- As part of the migration, if you will be using:
  - **Pantheon Default Upstreams**: Before Pantheon hands the site off to you for User Acceptance Testing, it will be brought up to the most current release. If this causes issues, we will roll it back to the current version on your production server
  - **Nested Docroot or Composer**: Your sites will be migrated at their current version
  - **Custom or Alternative Upstream**: Your sites will be brought over using the most current release in your upstream

**Examples of things that may be considered out of scope:**

- Pantheon may not be able to migrate functionality if the site relies on resources that are not available on the platform, such as:
  - Issues that arise as a result of [Pantheon platform configurations](/platform-considerations)
  - Issues that arise as a result of Plugins or Modules that are found to be [problematic](/modules-plugins-known-issues/)
  - Code that relies on specific PHP extensions
  - Code that relies on specific server packages that are not currently on Pantheon
  - Anything dependent on languages not available on the platform (Java, Python, Perl, etc)
- Performance optimization
- Additional resync of database & files
- Updating custom or contributed modules/plugins
- Fixing issues that already existed on source server
- Resolving caching issues
  - Pantheon recommends that you [verify Varnish caching](https://varnishcheck.pantheon.io/) on each site
- Deployment workflow configuration, updates, or changes
- Adding any new functionality that didn't previously exist on the site, which includes:
  - Enabling or disabling S3 or other CDN configurations
  - Switching to Solr from another search platform
  - Any code changes made to the site after the initial migration begins. You may add any code changes to a Multidev and merge them in post-launch - or take ownership of the site and move them in before launch

**You may elect to purchase Custom Application Service (CAS) hours (minimum: 4 hours) for the Pantheon Migration Team to complete additional work, including:**

- Creating a Custom Upstream for you
- Creating cron-related custom modules
- Performing additional database/files syncs
- Configuring or decommissioning S3 (existing S3 integrations are fine, this is just for changes to the file structures in the application)
- Ensuring your applications are working with any required Secure Integrations
- Working on your custom or contrib modules/plugins to troubleshoot issues your team is unable to resolve
- Re-configuring your application layer SSO
