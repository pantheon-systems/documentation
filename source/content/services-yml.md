---
title: Creating a services.yml File for Drupal 8
description: Learn how to add a services.yml file for your Drupal 8 site.
tags: [workflow]
categories: [drupal8]
---
Drupal 8 allows users to easily define core services and environment-specific settings within the `sites/default/services.yml` configuration file, eliminating the need for hacks to swap functionality. Creating or modifying this file is not required when installing a new Drupal 8 site.

## Production and Pre-production Service Configurations  

Drupal `services.yml` files may contain environment-specific settings, such as debug-mode settings, or they may be used to configure settings that are applicable to all environments, such as configuring cache contexts, or setting the cookie domain.  To avoid the potential for inadvertently deploying debug configuration to production, prior to Drupal 8.2.0, Pantheon placed `sites/default/services.yml` in the `.gitignore` file, to discourage users from committing this file to the repository.

As of Drupal 8.2.0, however, `services.yml` was removed from `.gitignore`, and a new mechanism was introduced to control production vs. pre-production configuration changes. Now, in your `sites/default` folder, you may use `services.pantheon.production.yml` and `services.pantheon.preproduction.yml` to configure your on-Pantheon service configuration parameters for production and pre-production environments.  

The table below illustrates which services file is used in which Pantheon environments:

| Pantheon Environment | Settings Filename                     |
|:-------------------- |:------------------------------------- |
| Test or Live         | `services.pantheon.production.yml`    |
| Dev or any Multidev  | `services.pantheon.preproduction.yml` |
| All environments     | `services.yml`                        |


## Create and Modify services.yml
1.  Before you begin, make sure that you have updated your Drupal site to version 8.2.0 or greater.
2.  From within the `sites/default` directory, create a new `services` file. Name it based on which environment you wish to configure settings for:

    - **All environments:** `services.yml`
    - **Production environment:** `services.pantheon.production.yml`
    - **Pre-production environment:** `services.pantheon.preproduction.yml`

  Consult the existing [`default.services.yml`](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/default.services.yml) and [`default.services.pantheon.preproduction.yml`](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/default.services.pantheon.preproduction.yml) files for example parameters that you may wish to customize for your site.

<Alert title="Note" type="info">

Module specific services should be defined in a separate `.yml` file, located in the root directory of the respective module (e.g. `sites/all/modules/module_name/module_name.services.yml`).

</Alert>

## See Also

View the following [Drupal.org](https://drupal.org) resources for more information:

- [Structure of a service file](https://www.drupal.org/docs/8/api/services-and-dependency-injection/structure-of-a-service-file)
- [Issue: Use container parameters instead of settings](https://www.drupal.org/node/2251113)
- [Services and dependency injection in Drupal 8](https://www.drupal.org/node/2133171)
- [Service Tags](https://www.drupal.org/node/2239393)
- [Structure of a service file](https://www.drupal.org/node/2194463)
