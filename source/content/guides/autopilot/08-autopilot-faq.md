---
title: Pantheon Autopilot
subtitle: Autopilot FAQs
description: Get answers to your Autopilot questions.
tags: [autopilot, webops]
type: guide
layout: guide
showtoc: true
anchorid: autopilot-faq
permalink: docs/guides/autopilot/autopilot-faq/
reviewed: "2022-06-14"
contenttype: guide
categories: [automate]
newcms: []
audience: [development]
product: [autopilot]
integration: []
---

This section provides answers to frequently asked questions about Autopilot.

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

Autopilot does not use Drush when updating an Integrated Composer site; you can use any Drush version when using Integrated Composer. Refer to the documentation on [Drush versions](/guides/drush/drush-versions) for more information.

## Does Autopilot support Terminus actions?

Not yet.

## Does Autopilot automatically deploy changes to the Live environment?

You can specify the environments to which Autopilot deploys. See the [configuration options](/guides/autopilot/enable-autopilot).

## Does Autopilot clone the database from Live to Dev before doing the updates?

Autopilot tests updates against a Multidev cloned from the current Dev environment by default. Opt into the [Sync Environment](/guides/autopilot/enable-autopilot/#schedule) feature in the site's **Configuration** tab to sync your Live environment before Autopilot checks for updates.

## Does the Autopilot Multidev count towards the Multidev limit?

No. If you encounter any issues about Multidev limits, [contact Support](/guides/support/contact-support).

## Does Autopilot perform tests on authenticated pages?

Not yet. Currently, Autopilot only supports tests on anonymous access versions of pages. Support for authenticated (logged-in user) page tests is planned for a future release.

## What does Autopilot specifically check for?

Autopilot only checks for changes and updates to modules, themes, and core. You should take time to carefully review and test changes that fall outside of Autopilot's scope, including:

- Code changes

- PHP changes

- Templates changes

- Other backend changes

## Is there a limit to the number screenshots Autopilot will take?

Yes. Depending on your [Account](/guides/support#support-features-and-response-times), Autopilot can be set for up to 25 pages on each site. It will check for updates once a week, and can also be run on demand.

## More Resources

- [Apply Autopilot Updates](/guides/autopilot/apply-updates)

- [Autopilot Custom Upstream Guide](/guides/autopilot-custom-upstream)
