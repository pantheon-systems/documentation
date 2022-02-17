---
title: Pantheon Autopilot
subtitle: Apply Updates
description: descriptions
categories: [automate]
tags: [iterate, autopilot, testing, webops]
type: guide
layout: guide
showtoc: true
anchorid: apply-updates
permalink: docs/guides/autopilot/apply-updates/
editpath: autopilot/04-apply-updates.md
reviewed: "2021-08-09"
---

Autopilot updates and visually tests a copy of your site on a [Multidev](/multidev) so it can detect issues before it tries to apply updates.

Autopilot can manage updates for any site that can [apply updates via the Site Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard).

## Apply Available Updates

From the **Autopilot Status** screen, click **Queue Updates**.

You can also apply updates from the site list on the **<i className="fa fa-robot"></i> Autopilot** page. From the **Actions** <i className="fa fa-chevron-down fa-w-14"></i> dropdown next to each site name, click **Start Applying Updates**.

The platform adds the request to a queue, and will apply updates and deploy them to the chosen environments as quickly as possible, depending on current platform load.

Track the update status from the site's Autopilot **Activity** page.

### Autopilot and Drupal 9 with Integrated Composer

Autopilot can manage updates for Pantheon Sites using the Pantheon-supported [Drupal 9](/drupal-9) Upstream with [Integrated Composer](/guides/integrated-composer).
