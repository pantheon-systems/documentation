---
title: Convert a Standard Drupal 8 Site to a Composer Managed Site
description: Drupal 8 sites often require the usage of Composer to manage site dependencies. The need to begin using Composer for a site build can often surface after a site is in development, necessitating a divergence from the Pantheon managed upstream.
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
categories: [develop]
tags: [composer, site, workflow]
contributors: [dustinleblanc, greg-1-anderson, stovak]
reviewed: "2021-03-31"
---

Drupal 9 sites on Pantheon have [Integrated Composer](/integrated-composer) built-in to manage site dependencies.

For a smooth upgrade experience, and to avoid potential conflicts, this guide shows how to convert a Drupal 8 site to use Composer to manage deployments and dependencies.

The goals of this upgrade are to remove dependencies that Composer will manage from the existing site's Git repository, and have Composer manage those dependencies in the new site instead.

Note that since you are migrating a site through this process, the new site will no longer maintain your existing commit history.

<Alert title="Note" type="info">

To maintain best practice and to avoid difficult, time-consuming repairs to the site, this doc is written for users with access to Pantheon's [Multidev](/multidev) feature.

Pantheon support is not available to users who avoid the Multidev steps.

</Alert>

## Will This Guide Work for Your Site?

<Partial file="drupal-9/upgrade-site-requirements.md" />

The site owner should ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

### Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

<Partial file="drupal-8-convert-to-composer.md" />

**TO BE INSERTED BEFORE** "Copy any existing configuration from the default branch. If no files are copied through this step, that's ok:"

3. Make sure your site remains on Drupal 8

```
$ composer require drupal/core-recommended:^8.9
$ git add composer.*
$ git commit -m "Remain on Drupal 8"
```

4. Prepare for an eventual upgrade to Drupal 9

The Drupal community provides a module called Upgrade Status that will help to determine whether or not your site is ready to upgrade to Drupal 9. Add this module to your site with Composer:

```
$ composer require drupal/upgrade-status
$ git add composer.*
$ git commit -m "Add Upgrade Status module"
```

When you are ready to begin upgrading your site to Drupal 9, you may enable this module and view the status report it provides to find things that need to be done before upgrading. This step is optional; you may wait and add upgrade-status to your site later, if you prefer.

**THEN CONTINUE THE REST OF THE TEMPLATE** drupal-8-convert-to-composer.md (renumber following sections)

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

## Change Upstreams

Your Pantheon site is now set up to use the new Drupal 9 Integrated Composer upstream. To continue tracking additional changes to the Pantheon upstream, change the upstream your site is tracking with Composer:

```bash{promptUser:user}
terminus site:upstream:set $site drupal9
```

Following the `drupal9` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon. The dependency you added above on `drupal/core-recommended` will keep you on Drupal 8 until you are ready to upgrade to Drupal 9.

Note that only the [User in Charge](/change-management#site-level-roles-and-permissions) can set the Upstream.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
