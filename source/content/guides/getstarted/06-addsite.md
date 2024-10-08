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
reviewed: "2023-03-21"
showtoc: true
permalink: docs/guides/getstarted/addsite
editpath: getstarted/addsite.md
---

There are dozens of ways to add a site on Pantheon. This section covers the most common scenarios for new users: creating a new CMS site (a site running WordPress or Drupal), or migrating an existing WordPress or Drupal site.  For additional scenarios, see the [Adding a Site to Pantheon](/add-site) section at the end of this document.

## Create a New CMS Site

To create a CMS site:

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces) and select the **Create New Site** button:

   ![Create new site button](../../../images/dashboard/new-dashboard/2024/create-new-site-button.png)

1. Select **WordPress** or **Drupal**.

   ![Select CMS](../../../images/dashboard/new-dashboard/2024/create-new-site-cms.png)

   If you select Drupal, you will have the option to select the Drupal version you want to use.

   ![Select Drupal version](../../../images/dashboard/new-dashboard/2024/create-new-site-cms-drupal-11crop.png)

1. Enter the name and select a region for this site. If this site is to be part of a Professional Workspace, select a Workspace from **Choose a Workspace for the Site**. Click **Continue**. It can take several minutes to create a new site on Pantheon.

   <Alert title="Note" type="info">

   Site names are limited to 51 characters and can contain only numbers, letters, and dashes. Site names cannot start or end with a dash.

   Site names cannot be changed after site creation.

   </Alert>

   ![Enter site information](../../../images/create-new-site-info.png)

   <Alert title="Note" type="info" >

   You can navigate away from this page during this process, but later, you'll have to go to the **Sites** tab to access your site.  If possible, stay on this tab to simplify accessing the site when the creation is complete.

   </Alert>

1. Click **Visit your Pantheon Site Dashboard** when the process is complete.

   ![Site creation completed](../../../images/create-site-done.png)

At this point, you have a Dev environment for your site code, but you do not have a Dev environment for your CMS.  To create that:

<Partial file="cms-dev.md" />

You have successfully finished adding a site in its Dev environment!

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
* [Using Terminus to Create and Update Drupal Sites on Pantheon](/terminus-drupal-site-management/)
* [Create a WordPress Site with Terminus and WP-CLI](/guides/create-wp-site)
