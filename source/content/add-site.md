---
title: Adding a Site to Pantheon
description: Create or migrate a site on Pantheon.
tags: [migrate, create, site]
contenttype: [doc]
innav: [true]
categories: [migrate, create]
cms: [drupal, wordpress]
audience: [agency, development]
product: [--]
integration: [--]
---

There are many ways you can add a site to Pantheon.  To help you choose the best method for you, answer the questions below.

<Alert title="Note" type="info" >

This list does not include scenarios involving Front-End sites.  For those, see [Front-End Sites on Pantheon](/guides/decoupled)

</Alert>

## Find Your Scenario

**Are you trying to create a brand new site, or do you already have a site you want to migrate to Pantheon?**

<TabList>

<Tab title="I'm starting from scratch" id="add" active={true}>

You can either add a site using the dashboard (which will guide you through the process), or use the command line.

+-------------------------------+-----------------------------------------------------+
| I want to use the Dashboard   | I want to use the command line                      |
+===============================+=====================================================+
| My CMS is:                    | My CMS is:                                          |
| - [Drupal](/add-drupal)       | - [Drupal](/guides/terminus-drupal-site-management) |
| - [WordPress](/add-wp)        | - [WordPress](/guides/create-wp-site)               |
+-------------------------------+-----------------------------------------------------+

</Tab>

<Tab title="I already have a site" id="migrate">

If your existing site meets either of the following criteria, you'll need to [manually migrate your site to Pantheon](/migrate-manual):

- The site or site archive is greater than 500MB

- You are migrating a site that is only on your local machine

**Which CMS are you using?**

<TabList>

<Tab title="Drupal" id="drupal" active={true}>

**Do you want to upgrade your Drupal version during migration?**

- [No, remain at my current version](/guides/guided)

- Yes, upgrade my site to the latest version of Drupal:
  - [My site is Composer-managed, *and* uses Drush](/guides/drush/drush-import)
  - [My site is Composer-managed](/guides/drupal-unhosted-composer)
  - [My site is *not* Composer-managed](/guides/drupal-unhosted)

</Tab>

<Tab title="WordPress" id="wordpress">

[Use our guided migration](/guides/guided), unless:
- [You are using multisite](/migrate-manual)
- [Do not wish to install the plugin necessary for guided migration](/migrate-manual)

</Tab>

</TabList>

</Tab>

</TabList>

## Rare Scenarios

### Clone an existing Pantheon site

Drupal and WordPress sites can use Terminus to clone one Pantheon site to another from the command line. This method requires you to [install and authenticate Terminus](/terminus/install), then install the [Terminus Site Clone](https://github.com/pantheon-systems/terminus-site-clone-plugin) plugin.

Replace `<source>` and `<destination>` with target [site UUIDs](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuis) or site names, and specify target development environment in place of `<env>` (dev or multidev):

```bash
terminus site:clone <source>.<env> <destination>.<env>
```

### Use the Pantheon Migrations plugin with a custom WordPress upstream

If you'd like your existing WordPress site to get one-click updates from your [Custom Upstream](/guides/custom-upstream), then the migration process will be slightly different. The general process will be the same as a vanilla WordPress site with a few differences.

1. Click **Create New Site** instead of **Migrate existing site**.

1. Name your new site, and be sure to add it to the workspace with access to the Custom Upstream you want to use.

1. Choose your Custom Upstream and complete the installation.

You can now proceed with the [standard migration procedure](migrate), starting at Step 8.
