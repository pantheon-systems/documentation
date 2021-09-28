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

### (Optional) Run upgrade_status to Confirm That the Site Is Ready to Be Upgraded

<Partial file="drupal-9/drupal-upgrade-status.md" />

<Partial file="drupal-8-convert-to-composer.md" />

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

## Change Upstreams

Your Pantheon site is no longer compatible with traditional upstream updates. Avoid confusion by moving your site to an empty upstream:

```bash{promptUser:user}
terminus site:upstream:set $site empty
```

Note that only the [User in Charge](/change-management#site-level-roles-and-permissions) can set the Upstream.

## Ongoing Core Updates

Core updates are carried out via Composer:

```bash{promptUser:user}
git pull origin master
composer update drupal/core --with-dependencies
composer prepare-for-pantheon
composer install --no-dev
```

Review and commit file changes, then push back to Pantheon.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
