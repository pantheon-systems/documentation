---
title: Pantheon Autopilot
subtitle: Tests and Results
description: Autopilot visual regression testing (VRT) results and how to deal with failing tests.
tags: [iterate, autopilot, testing, webops]
type: guide
showtoc: true
permalink: docs/guides/autopilot/tests-results/
editpath: autopilot/03-tests-results.md
reviewed: "2021-08-09"
contenttype: [guide]
innav: [false]
categories: [automate, test, update, faq]
cms: [--]
audience: [development]
product: [autopilot]
integration: [quicksilver]
---

Autopilot updates and visually tests a copy of your site on a [Multidev](/guides/multidev) so it can detect issues before it applies updates to your Dev, Test or Live environment. Autopilot does this by taking before and after screenshots to check for changes. Before screenshots are taken from the Dev environment and After screenshots are taken from the Multidev environment. You also have the option to pull down your site's live content to the Dev environment before taking the Before screenshot so that it is in parity with your Live environment.

<Wistia src="67b5343pz4" />

## View Test Results

1. Navigate to your Autopilot **Overview** page and click the VRT results under **Autopilot Sites**. This section displays which sites passed testing and are up to date, as well as sites that need your manual review.

   ![Autopilot overview page shows the testing status of all sites](../../../images/autopilot/autopilot-sites-overview.png)

1. Click **More Actions** in the **Review Test Results** page to see Autopilot data for a specific site.

1. Click **Visit Autopilot Site** under the **Autopilot** tab in the Workspace to view the site preview in a new browser tab.

   ![Autopilot Review Test Results](../../../images/autopilot/autopilot-review-test-results.png)

## Successful Tests

Autopilot can automatically apply updates and deploy to the Live environment.

If you’re not comfortable with Autopilot deploying all the way to the Live environment, you can have Autopilot only deploy updates to Dev or Test and stop. You can proceed with other manual or automated QA processes, and deploy from the Test to Live environment when ready.

You can specify the environments to which Autopilot deploys. When all tests pass, it can deploy to the:

- Dev environment only: A good choice for a site under continual active development
- Test environment (after Dev): A good choice for a high traffic site that needs an extra level of manual quality assurance (QA) or automated CI
- Live environment (after Dev and Test)
- Do Not Deploy: This is a good option if you want to stop updates at the Multidev. Refer to [Update Destination & Frequency](/guides/autopilot/enable-autopilot/#update-destination--frequency) for more information.

## Failing Tests

Autopilot can report failures via email or [Quicksilver hooks](/guides/quicksilver/hooks) immediately, and send a weekly email report summarizing all Autopilot activity.

If an error is detected during an update attempt, the **Autopilot Status** shows **Needs Attention** with two options to **Review Test Results** or to **View Update Details**.

1. Click **View Update Details** for details:

![Autopilot Update Details shows a list of updates and the versions](../../../images/autopilot/autopilot-status-what-changed.png)

1. Click **Review Test Results** to compare changes.

1. Click **Approve** to accept the changes or click **More Actions** <Icon icon="angleDown" /> to view the Multidev, or adjust the threshold for acceptable changes.

### Acknowledge All Failed Test Results Before You Run Another Test

When a failed test requires review, no new tests can be run on the site until the results have been approved or discarded through Autopilot.

## More Resources

- [Autopilot Setup and Configuration](/guides/autopilot/enable-autopilot)

- [Autopilot FAQs](/guides/autopilot/autopilot-faq)
