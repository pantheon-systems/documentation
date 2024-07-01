---
title: Major Version Drupal Upgrades
description: Instructions on how to upgrade your Pantheon site to the next major version of Drupal.
contenttype: [doc]
innav: [true]
categories: [update]
cms: [drupal]
audience: [development]
product: [--]
integration: [--]
tags: [migrate, workflow]
reviewed: "2020-07-21"
---

<Alert title="Deprecated" type="info" icon="drupal">

The steps in this doc help bring your site to Drupal 8 which reached End of Life status in November, 2021.

Visit the [Drupal Update and Migration Guide](/drupal-migration) to find the best path to Drupal for your site.

</Alert>

## Overview

To upgrade Drupal to a new major version (e.g. version 7 to version 9) you must create a new site. Do not perform a major version upgrade from within the original site. If you have a Drupal 7 site that you want to upgrade to the latest version of Drupal, create a new Drupal site and add content, files and modules from the old site into the new site.

Migrating to a new site on the platform will provide you with the QA and deployment processes you need to test your upgrade and ensure everything works properly. It also ensures that your site will receive [upstream updates](/core-updates) once the upgrade is complete.

<Alert title="Warning" type="danger">
If you have already created a site and want to upgrade it to a new major version, you must start by creating a new site with the new Drupal version you want to use. We do not support upgrading to a new major version from within an existing site.
</Alert>

## About the Latest Version of Drupal

Since the latest version of Drupal currently has the same end-user features as [Drupal 8.9](https://www.drupal.org/project/drupal/releases/8.9.0), and because many contrib modules are not yet compatible with the latest version of Drupal, we recommend that users upgrade their Drupal sites to the latest version of Drupal first. 

### Content and configuration

Drupal migrations automatically create the needed content types and establish the mappings between the old and new fields by default. You should review the configuration produced by these migrations by exporting your configuration to `yml` files ([a best practice for any Drupal site](/drupal-configuration-management)).

### Customizing migrations

If needed, you can customize your migration using hooks and plugins. See the [drupal.org developer documentation](https://www.drupal.org/node/2127611) for more details.

### Scripting migrations

Depending on the complexity of your site, there is a good chance you will need to script and rerun migrations.
We have [an example repository](https://github.com/stevector/migrate_pantheon) that shows how all the steps of a migration (from first configuring the migration to running it) can be done with Drush.

The critical commands are:

```bash{promptUser: user}
terminus drush my-drupal-8-site.dev -- migrate-upgrade --legacy-db-key=drupal_7 --configure-only --legacy-root=https://drupal7.example.com
```

This command configures (but does not run) the migrations from Drupal 7 to Drupal 8. In this example, the Drupal 8 site is named `my-drupal-8-site` and the command is running on the `dev` environment. The `--legacy-db-key` parameter indicates how to get the login credentials to the source Drupal 7 database. In our example, we use the [Terminus secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) plugin to supply the connection info. [See our blog post for more information on how this flag is used](https://pantheon.io/blog/running-drupal-8-data-migrations-pantheon-through-drush). The `--legacy-root` flag lets Drupal 8 know from where it can grab images and other uploaded media assets.

The following command generates a report on how many items have been imported by each migration:

```bash{promptUser: user}
terminus drush my-drupal-8-site.dev -- migrate-status
```

The following command runs the migration configured via `drush migrate-upgrade --configure-only`:

```bash{promptUser: user}
terminus drush my-drupal-8-site.dev -- migrate-import --all
```

### Content and Configuration

While you can try to get Drupal to handle all the data architecture changes between major revisions (importing the old database and running update.php), this is often not a complete solution. Depending on the specific module stack and configuration of your current site, it may be faster and more direct to plan and execute a content migration to the new site rather than trying to use the built-in update tools.

If you are not having much luck with update.php, consider setting up the new site and using tools like the [migrate module](https://www.drupal.org/project/migrate) to import your existing content. While this might initially seem like more work, it can often lead to a cleaner result more quickly, especially if your new site includes major architectural changes, features, or a redesign.

## Updating DNS

If your source site is on Pantheon and has your domain name pointing to it, you will need to follow special steps to move the domain name to the new site. For details, see [Relaunch Existing Pantheon Site](/relaunch). Otherwise, follow instructions within the Site Dashboard when [adding a domain](/guides/launch/domains).

## Troubleshooting

### Timeouts or Max Memory Errors

Migrations of particularly large sites to updated Drupal versions can sometimes hit the limits of memory allocated to sites on Pantheon. When possible, large site upgrade migrations should be performed locally, where the full system resources can be allocated to the task.

## More Resources

- [Drupal on Pantheon](/drupal)
- [Commonly implemented Migration methods](https://www.drupal.org/node/1132582)
- [Performing Drupal Content Migrations on Pantheon](https://pantheon.io/blog/performing-drupal-content-migrations-pantheon)
