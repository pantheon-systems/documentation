---
title: Get Started with Pantheon
subtitle: Add a Site
description: Create or migrate a site on Pantheon.
contenttype: [guide]
innav: [false]
categories: [overview]
cms: [--]
audience: [business, sysadmin, development]
product: [--]
integration: [--]
tags: [--]
contributors: [wordsmither]
reviewed: "2024-12-02"
showtoc: true
permalink: docs/guides/getstarted/addsite
editpath: getstarted/addsite.md
image: getting-started-Largethumb.png
---

There are dozens of ways to add a site on Pantheon. This section covers the most common scenarios for new users: creating a new CMS site (a site running WordPress or Drupal), or migrating an existing WordPress or Drupal site.  For additional scenarios, see the [Adding a Site to Pantheon](/guides/getstarted/addsite/) section at the end of this document.

## Create a New CMS Site
Pantheon CMS site contains three components: code, files, and a database containing the content and configurations of your Content Management System (CMS). When you create a site, you are creating each of these components in the Dev environment. Then, when you are ready, you will create your Test and Live environments.

<Wistia src="kprkgaikos" />

### Create the Dev Environment
To create a CMS site:

<Partial file="dashboard-site-creation-1.md" />

#### Install the CMS
<Partial file="cms-dev.md" />

You have successfully finished adding a site in its Dev environment.  Click **Visit Dev Site** to view your site.

### Create the Test environment

<Partial file="test-initialize.md" />

You have successfully finished adding a site in its Test environment.  Click **Visit Test Site** to view your site.

### Create the Live environment

After you [purchase a plan](/guides/getstarted/purchase), you can deploy your site live.  But first, you have to create the Live environment.

<Alert title="Warning" type="danger" >

When you complete this step, your site will be live for anyone to see, at the Pantheon URL. For detailed information about launching your site, refer to our [Launch Essentials](/guides/launch/) guide.

</Alert>

<Partial file="live-initialize.md" />

You have successfully finished adding a site in its Live environment.  Click **Visit Live Site** to view your site.

At this point, you have a live site with a Pantheon URL, like `http://my-site.pantheonsite.io/`. To change that to a more friendly URL, you'll need to purchase a domain from a DNS provider.  Refer to our [Domains on Pantheon Guide](/guides/domains) for more information.

## Migrate an Existing Site

If you already have a site hosted elsewhere, you can move it over to Pantheon with minimal effort.

<Alert title="Warning" type="danger" >

If your migration needs include any of the following, **do not use this process**, and instead refer to the specified documentation:

<Partial file="migrate/manual-when-all.md" />
<Partial file="migrate/manual-when-drupal.md" />
<Partial file="migrate/manual-when-wordpress.md" />

</Alert>

### Before you Begin

1. Check your plugins and/or modules against [Modules and Plugins with Known Issues](/modules-plugins-known-issues).

1. Make sure your code is compatible with the latest recommended version of PHP for your CMS. If not, be prepared to [adjust PHP versions](/guides/php/php-versions/#configure-php-version).

1. Remove unneeded code, database tables, and files.

### Perform the Migration

<TabList>

<Tab title="WordPress" id="tab-1-id" active={true}>

<Partial file="migrate/migrate-wp.md" />

</Tab>

<Tab title="Drupal" id="tab-2-id">

<Partial file="migrate/migrate-drupal.md" />

</Tab>

</TabList>

You have successfully migrated a site to its Dev environment!

Now it's time to purchase a site plan in preparation for launching your site.

## More Resources

* [Migrate a Composer Managed Drupal Site from Another Platform](/guides/drupal-unhosted-composer)
* [Import Drush Site Archives with Terminus](/guides/drush/drush-import)
* [Migrate a Drupal Site from Another Platform](/guides/drupal-unhosted)
* [Manually Migrate Sites to Pantheon](/migrate-manual)
* [Create a Static Site Using an Empty Upstream](/static-site-empty-upstream)
* [Create a Drupal Site Using a Drupal Distribution](/guides/drupal-from-dist)
* [Create a Drupal Site From the Command Line Using Terminus and Drush](/drupal-commandline)
* [Create a WordPress Site with Terminus and WP-CLI](/guides/create-wp-site)
