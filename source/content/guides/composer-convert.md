---
title: Convert a Standard Drupal 8 Site to a Composer Managed Site
description: Upgrade a standard Drupal 8 site, by converting it to a Composer-managed Drupal 8 site on the new Integrated Composer framework. 
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
categories: [develop]
tags: [composer, site, workflow]
contributors: [dustinleblanc, greg-1-anderson, stovak]
reviewed: "2021-10-23"
---

In this guide, we'll convert a standard Drupal 8 site to use Composer to manage deployments and dependencies, then switch from `drops-8` to the new Integrated Composer `drupal9` upstream while remaining on Drupal 8.

## Overview

Drupal 9 sites on Pantheon have [Integrated Composer](/integrated-composer) built-in to manage site dependencies.

The goals of this conversion are: 

1. Remove dependencies that Composer will manage from the existing Drupal 8 site's Git repository, and have Composer manage those dependencies instead.

1. Switch to the `drupal9` Integrated Composer upstream. 

The `drupal9` Integrated Composer upstream works with Drupal 8, and following the `drupal9` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon. 

1. Add Drupal 8 core dependency instructions to `drupal/core-recommended`, to keep the site on Drupal 8 until you are ready to upgrade to Drupal 9.

## Will This Guide Work for Your Site?

<Partial file="drupal-9/upgrade-site-requirements.md" />

## Before You Begin

- This guide requires [User in Charge](/change-management#site-level-roles-and-permissions) permissions to set the Upstream.

- This guide is written for users with access to Pantheon's [Multidev](/multidev) feature. Pantheon support is not available to users who avoid the Multidev steps.

- The site owner should ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

- **Commit history note**: The steps in this process migrate a site, so the new site will no longer maintain its existing commit history.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

## Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

## Add the Integrated Composer Upstream in a New Local Branch

<Partial file="drupal-8-convert-to-composer.md" />

### Troubleshooting: Provided host name not valid

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

## Change Upstreams

Your Pantheon site is now set up to use the Drupal 9 Integrated Composer upstream. To continue tracking additional changes to the Pantheon upstream, change the upstream your site is tracking with Composer:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal9
```

Following the `drupal9` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon. The dependency you added above on `drupal/core-recommended` will keep you on Drupal 8 until you are ready to upgrade to Drupal 9.

Note that only the [User in Charge](/change-management#site-level-roles-and-permissions) can set the Upstream.

## Working With Dependency Versions

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
