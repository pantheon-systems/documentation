---
title: Get Started with Pantheon
subtitle: Add a Site
description: Create or Migrate a Site
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

There are literally dozens of ways to add a site on Pantheon.  This page will cover the most common scenarios for new users: creating a new CMS site, or migrating an existing WordPress or Drupal site.  For additional scenarios, see the More Resources section at the end of this document.

## Create a New CMS Site

A CMS site is a site that runs either WordPress or Drupal as the content management system (CMS).  There are four steps in creating a site:

1. Create the site framework
1. Configure configure the Dev CMS app.
1. Set up the Test environment, and configure the Test CMS app.
1. Set up the Live environment, and configure the Live CMS app.


To create a CMS site:

1. Create the site: 

   1. Select <Icon icon="plus" text="Create New Site"/>. 

   1. Select WordPress, Drupal with Composer, or Drupal 7.

   1. Enter the name and select a region for this site.

   1. If this site is to be part of a Professional Workspace, select a Workspace from **Choose a Workspace for the Site**.

   1. Click **Continue**. It can take several minutes to create a new site on Pantheon. 

      <Alert title="Note" type="info" >
      
      You can navigate away from this page during this process, but later, you'll have to go to the **Sites** tab to access your site.  If possible, stay on this tab to simplify accessing the site when the creation is complete.
      
      </Alert>

   1. Click **Visit your Pantheon Site Dashboard** when the process is complete. 

1. Finish setting up your Dev environment:

   1. Click **Site Admin** and complete the installation process for the selected framework.

    <Alert title="Note" type="info">

    Record your new username and password. You’ll need this information again soon.

    </Alert>

1. Create your Test environment:

   1. Go to your Site Dashboard and click the <Icon icon="equalizer" text="Test"/> tab. Here you’ll have access to your Test environment, though it hasn’t been created yet. 

   1. Click **Initialize Test Environment** to create your Test environment.

     This takes a few moments.

   1. Click **Site Admin** and complete the installation process for the selected framework.

    <Alert title="Note" type="info">

    Record your new username and password. You’ll need this information again soon.

    </Alert>

1. Create your Live environment:

   1. Go back to your Site Dashboard, and click the <Icon icon="cardio" text="Live"/> tab. Here you’ll have access to your Live environment, though it hasn’t been created yet.

   1. Click **Initialize Live Environment** to create your Live environment.

   1. Click **Site Admin** and complete the installation process for the selected framework.

    <Alert title="Note" type="info">

    Record your new username and password. You’ll need this information again soon.

    </Alert>

## Migrate an Existing Site

If you already have a site hosted elsewhere, you can move it over to Pantheon with minimal effort.

<Alert title="Warning" type="danger" >

If your migration needs include any of the following, **do not use this process**, and instead refer to the specified documentation:

| Scenario  | Use this document  |
|---|---|
| You are moving a Drupal site **and** want to upgrade to the latest version of Drupal **and** your site is Composer-managed | [Migrate a Composer Managed Drupal Site from Another Platform](/guides/drupal-unhosted-composer) or  [Import Drush Site Archives with Terminus](/guides/drush/drush-import) |
| You are moving a Drupal site **and** want to upgrade to the latest version of Drupal **and** your site is *not* Composer-managed  | [Migrate a Drupal Site from Another Platform](/guides/drupal-unhosted)|
| You are using WordPress Multisite | [Manually Migrate Sites to Pantheon](/migrate-manual)  |
| You are migrating a site that is only on your local machine  | [Manually Migrate Sites to Pantheon](/migrate-manual) |
| The site or site archive is greater than 500MB | [Manually Migrate Sites to Pantheon](/migrate-manual) |

</Alert>

### Before you Begin

1. Reference your plugins and/or modules against [Modules and Plugins with Known Issues](/modules-plugins-known-issues).

1. Make sure your code is compatible with the latest recommended version of PHP for your CMS. If not, be prepared to [adjust PHP versions](/guides/php/php-versions/#configure-php-version).

1. Remove unneeded code, database tables, and files.

### Perform the Migration

<Partial file="migrate/migrate-all.md" />


## More Resources

* [Migrate a Composer Managed Drupal Site from Another Platform](/guides/drupal-unhosted-composer)
* [Import Drush Site Archives with Terminus](/guides/drush/drush-import)
* [Migrate a Drupal Site from Another Platform](/guides/drupal-unhosted)
* [Manually Migrate Sites to Pantheon](/migrate-manual)
* [Create a Static Site Using an Empty Upstream](/static-site-empty-upstream)
* [Create a Drupal Site Using a Drupal Distribution](/guides/drupal-from-dist)
* [Using Terminus to Create and Update Drupal Sites on Pantheon](/terminus-drupal-site-management/)
* [Create a WordPress Site with Terminus and WP-CLI](/guides/create-wp-site)