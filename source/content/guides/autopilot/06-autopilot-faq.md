---
title: Pantheon Autopilot
subtitle: Autopilot Frequently Asked Questions
description: Get answers for your Autopilot questions.
categories: [automate]
tags: [autopilot, webops]
type: guide
layout: guide
showtoc: true
anchorid: autopilot-faq
permalink: docs/guides/autopilot/autopilot-faq/
reviewed: "2022-03-30"
---

This section contains answers to frequently asked questions about Autopilot.

## Is Autopilot configurable per site?

Yes. Access to Autopilot is account-based and individual sites in that account can turn Autopilot on and off as desired. See [Enable Autopilot](/guides/autopilot/enable-autopilot).

## Will Autopilot email VRT results?

Yes. Configure [Autopilot activity digests and notifications](/guides/autopilot/enable-autopilot/#enable-autopilot-email-notifications) in your Personal Workspace settings **Notifications** tab.

## Does Autopilot work with Integrated Composer?

Yes. If your site is using [Integrated Composer](/guides/integrated-composer) (`build_step` is `true` in the `pantheon.yml` [file](/pantheon-yml)), Autopilot will be able to update it.

## Does Autopilot work with Build Tools?

Not yet. [Autopilot](/guides/autopilot) is not compatible with [Build Tools](/guides/build-tools/) or other workflows that use external Git repositories.

## What versions of Drush are supported by Autopilot?

The version(s) of Drush that are supported by Autopilot for sites:
- **Up to (not including) Drupal 9**: Drush 8
- **Drupal 9 with Integrated Composer**: Any; Autopilot will use Composer instead of Drush.
- **Drupal 9 without Integrated Composer**: Drush is not supported. Drupal 9 requires Drush 10 or higher, but Autopilot is not compatible with Drush 10.

Autopilot only supports Drush 8 for all sites up to Drupal 9.

All Drupal 9 sites that use Integrated Composer are compatible with Autopilot.

Autopilot does not use Drush when updating an Integrated Composer site; you can use any Drush version when using Integrated Composer. Refer to the documentation on [Drush versions](/drush-versions) for more information.

## Does Autopilot support Terminus actions?

Not yet.

## Does Autopilot automatically deploy changes to the Live environment?

You can specify the environments to which Autopilot deploys. See the next page for [configuration options](/guides/autopilot/enable-autopilot).

## Does Autopilot clone the database from Live to Dev before doing the updates?

No. Autopilot always tests updates against a Multidev based on the current Dev environment.

For Autopilot to compare updates to the Live environment, keep the Dev environment [synchronized with the Live environment](/pantheon-workflow), to ensure Autopilot test updates against the most up-to-date state of the Live environment.

## Does the Autopilot Multidev count towards the Multidev limit?

No. If you encounter any issues about Multidev limits, [contact Support](/guides/support/contact-support).

## Does Autopilot perform tests on authenticated pages?

Not yet. Currently, Autopilot only supports tests on anonymous access versions of pages. Support for authenticated (logged-in user) page tests is planned for a future release.
