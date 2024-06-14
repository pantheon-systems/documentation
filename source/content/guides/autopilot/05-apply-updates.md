---
title: Pantheon Autopilot
subtitle: Apply Updates
description: Learn how to apply Autopilot updates.
tags: [iterate, autopilot, testing, webops, D8, D9, D10]
type: guide
showtoc: true
permalink: docs/guides/autopilot/apply-updates/
editpath: autopilot/05-apply-updates.md
reviewed: "2022-12-14"
contenttype: [guide]
innav: [false]
categories: [automate, test, update, faq]
cms: [--]
audience: [development]
product: [autopilot]
integration: [--]
---

Autopilot updates and visually tests a copy of your site on a [Multidev](/guides/multidev) so it can detect issues before it tries to apply updates.

Autopilot can manage updates for any site that can [apply updates via the Site Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard).

## Apply Available Updates

1. Navigate to the **Autopilot Status** screen.

1. Click **Queue Updates**.

   - The platform adds the request to a queue, and will apply updates and deploy them to the chosen environments as quickly as possible, depending on the current platform load.

1. Track the update status from the site's Autopilot **Activity** page.

You can also apply updates from the site list on the **<Icon icon="robot"/> Autopilot** page:

1. Click the **Actions** <Icon icon="angleDown" /> drop-down menu next to each site name, and then click **Start Applying Updates**.

   - The platform adds the request to a queue, and will apply updates and deploy them to the chosen environments as quickly as possible, depending on the current platform load.

1. Track the update status from the site's Autopilot **Activity** page.

### Autopilot and Drupal with Integrated Composer

Autopilot can manage updates for Pantheon Sites using the Pantheon-supported [Drupal](/drupal) Upstream with [Integrated Composer](/guides/integrated-composer).

## More Resources

- [Autopilot Setup and Configuration](/guides/autopilot/enable-autopilot)

- [Autopilot Custom Upstream Guide](/guides/autopilot-custom-upstream)

- [Autopilot FAQs](/guides/autopilot/autopilot-faq)

- [WordPress and Drupal Core Updates](/core-updates)
