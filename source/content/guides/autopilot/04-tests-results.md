---
title: Pantheon Autopilot
subtitle: Tests and Results
description: Autopilot visual regression testing (VRT) results and how to deal with failing tests.
tags: [iterate, autopilot, testing, webops]
type: guide
layout: guide
showtoc: true
anchorid: tests-results
permalink: docs/guides/autopilot/tests-results/
editpath: autopilot/03-tests-results.md
reviewed: "2021-08-09"
contenttype: guide
categories: [deploy, test, update]
newcms: []
audience: [development]
product: [autopilot]
integration: [quicksilver]
---

---

Autopilot updates and visually tests a copy of your site on a [Multidev](/guides/multidev) so it can detect issues before it applies updates to your Dev, Test or Live environment.

## Understanding Test Results

To review your test results, go to your Autopilot overview page.  Here you can see what sites passed testing and are up to date, as well as sites that need your manual review. 

![Autopilot overview page shows the testing status of all sites](../../../images/autopilot/autopilot-sites-overview.png)


## Successful Tests

Autopilot can automatically apply updates and deploy to the Live environment.

If you’re not comfortable with Autopilot deploying all the way to the Live environment, you can have Autopilot only deploy updates to Dev or Test and stop. You can proceed with other manual or automated QA processes, and deploy from the Test to Live environment when ready.

You can specify the environments to which Autopilot deploys. When all tests pass, it can deploy to the:

- Dev environment only: A good choice for a site under continual active development
- Test environment (after Dev): A good choice for a high traffic site that needs an extra level of manual quality assurance (QA) or automated CI
- Live environment (after Dev and Test)

## Failing Tests

Autopilot can report failures via email or [Quicksilver hooks](/guides/quicksilver/hooks) immediately, and send a weekly email report summarizing all Autopilot activity.

If an error is detected during an update attempt, the **Autopilot Status** shows **Needs Attention** with two options to **Review Test Results** or to **View Update Details**.

1. Click **View Update Details** for details:

 ![Autopilot Update Details shows a list of updates and the versions](../../../images/autopilot/autopilot-status-what-changed.png)

1. Click **Review Test Results** to compare changes.

1. Click **Approve** to accept the changes or click **More Actions** <i className="fa fa-chevron-down fa-w-14"></i> to view the Multidev, or adjust the threshold for acceptable changes.

### Acknowledge All Failed Test Results Before You Run Another Test

When a failed test requires review, no new tests can be run on the site until the results have been approved or discarded through Autopilot.

## More Resources

- [Autopilot Setup and Configuration](/guides/autopilot/enable-autopilot)

- [Autopilot FAQs](/guides/autopilot/autopilot-faq)

