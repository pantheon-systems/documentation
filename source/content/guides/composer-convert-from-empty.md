---
title: Convert an Empty Upstream Drupal Site to a Composer Managed Site
description: Upgrade a Drupal 8 site using an empty upstream by converting it to a Composer-managed Drupal 8 site on the new Integrated Composer framework. 
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
categories: [develop]
tags: [composer, site, workflow]
contributors: [dustinleblanc, greg-1-anderson, stovak, kporras07]
reviewed: "2022-02-21"
---

Use this guide to convert an empty upstream Drupal 8 site to use Composer to manage deployments and dependencies, then switch from `empty` to the new Integrated Composer `drupal-recommended` upstream while remaining on Drupal 8.

## Overview

Drupal 9 sites on Pantheon have [Integrated Composer](/guides/integrated-composer) built-in to manage site dependencies.

By converting an empty upstream Drupal 8 site to a Composer-managed site you will do the following:

1. Remove dependencies that Composer manages from the existing Drupal 8 site's Git repository, and have Composer manage those dependencies instead.

1. Switch to the `drupal-recommended` Integrated Composer upstream.

The `drupal-recommended` Integrated Composer upstream works with Drupal 8, and following the `drupal-recommended` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon.

Add Drupal 8 core dependency instructions to `drupal/core-recommended`, to keep the site on Drupal 8 until you are ready to upgrade to Drupal 9.

## Will This Guide Work for Your Site?

<Partial file="drupal-9/upgrade-site-requirements-from-empty.md" />

- You have not set up Continuous Integration or you no longer need it.

## Before You Begin

- This guide requires [User in Charge](/change-management#site-level-roles-and-permissions) permissions to set the Upstream.

- This guide is written for users with access to Pantheon's [Multidev](/multidev) feature. Pantheon support is not available to users who avoid the Multidev steps.

- The site owner should ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

- Source site may or may not be using a [nested docroot](https://pantheon.io/docs/nested-docroot). If using it, **you should prepend the paths in this document with "web" as needed**.

<Alert title="Note" type="info">

  The steps in this process migrate a site and its content, but not the commit history. The new site will not maintain the site's existing commit history.

</Alert>

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

## Add the Integrated Composer Upstream in a New Local Branch

<Partial file="drupal-8-convert-to-composer-from-empty.md" />

### Troubleshooting

#### Provided host name not valid

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

## Change Upstreams

Your Pantheon site is now set up to use the Drupal 9 Integrated Composer upstream. To continue tracking additional changes to the Pantheon upstream, change the upstream your site is tracking with Composer:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-recommended
```

Following the `drupal-recommended` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon. The dependency you added above on `drupal/core-recommended` will keep you on Drupal 8 until you are ready to upgrade to Drupal 9.

Note that only the [User in Charge](/change-management#site-level-roles-and-permissions) can set the Upstream.

## Working With Dependency Versions

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
