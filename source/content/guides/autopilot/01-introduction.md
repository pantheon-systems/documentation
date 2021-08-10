---
title: Pantheon Autopilot
subtitle: Introduction
description: Visual regression testing (VRT) for your WordPress or Drupal site.
categories: [automate]
tags: [iterate, autopilot, testing, webops]
contributors: [nathantyler, alexfornuto, edwardangert]
type: guide
layout: guide
showtoc: true
anchorid: autopilot
permalink: docs/guides/autopilot
editpath: autopilot/01-introduction.md
reviewed: "2021-08-02"
---

[Autopilot](https://pantheon.io/autopilot?docs) is part of Pantheon's [New Dashboard](/guides/new-dashboard) experience. Pantheon Autopilot automatically detects, performs, and deploys updates for WordPress and Drupal.

## What Autopilot Does

Pantheon's Autopilot:

- Automatically detects when new updates are available
- Performs the updates in an isolated [Multidev](/multidev) environment
- Tests the updates with automated visual regression testing (VRT)
- Optionally deploys the updates

![A gif showing Autopilot visual regression testing](../../../images/dashboard/vrt.gif)

## Get Autopilot

Autopilot is available to Gold Accounts and higher. Check out our [pricing page](https://pantheon.io/pricing?docs) and contact [Sales](https://pantheon.io/earlyaccess/autopilot?docs) to talk through what plan is best for your needs.

## Who is Autopilot For?

If you build or maintain WordPress and Drupal sites, Autopilot is for you.

Site upkeep can be tedious with constant monitoring, building, maintaining websites, and working cross-functionally to deliver digital experiences for customers. Autopilot relieves you of the continual maintenance work it takes to keep sites updated.

Autopilot requires [Multidev](/multidev), and is available to Pantheon Gold Accounts or higher.

Autopilot is enabled for Pantheon sites at the organization level.

## FAQ

### Is Autopilot configurable per site?

Yes. Access to Autopilot is account-based and individual sites in that account can turn Autopilot on and off as desired. See [Enable Autopilot](/guides/autopilot/enable-autopilot)

### Will Autopilot email VRT results?

Yes. Configure [Autopilot activity digests and notifications](/guides/autopilot/enable-autopilot/#enable-autopilot-email-notifications) in your Personal Workspace settings **Notifications** tab.

### Does Autopilot work with Integrated Composer?

Yes. If your site is using [Integrated Composer](/integrated-composer) (`build_step` is `true` in the `pantheon.yml` [file](/pantheon-yml)), Autopilot will be able to update it.

### Does Autopilot work with Build Tools?

Not yet. [Autopilot](/guides/autopilot) is not compatible with [Build Tools](/guides/build-tools/) or other workflows that use external Git repositories.

### What versions of Drush are supported by Autopilot?

Currently, Autopilot only supports Drush 8 for all sites up to Drupal 9. Drupal 9 uses Drush 10 and is compatible with Autopilot.

However, Autopilot does not use Drush when updating an Integrated Composer site; you can use any Drush version when using Integrated Composer. Refer to the documentation on [Drush versions](/drush-versions) for more information.

### Does Autopilot support Terminus actions?

Not yet.

### Does Autopilot automatically deploy changes to the Live environment?

You can specify the environments to which Autopilot deploys. See the next page for [configuration options](/guides/autopilot/enable-autopilot).

### Does the Autopilot Multidev count towards the Multidev limit?

No. If you encounter any issues about Multidev limits, [contact Support](/support).

## See Also

- [Webinar: Put CMS Updates on Cruise Control with Autopilot](https://pantheon.io/put-cms-updates-on-cruise-control-with-autopilot-webinar)
- [Autopilot Makes Open Source CMS a Reality at Scale](https://pantheon.io/blog/open-source-cms-scale-autopilot)
- [Robots, Autopilot, and The Holy Grail of WebOps](https://pantheon.io/blog/robots-autopilot-and-holy-grail-webops)
