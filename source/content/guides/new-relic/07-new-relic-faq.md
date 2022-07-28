---
title: New Relic Performance Monitoring
subtitle: New Relic FAQ
description: Get answers to your New Relic questions.
categories: [automate]
tags: [code, newrelic, quicksilver, workflow]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/new-relic/new-relic-faq
anchorid: new-relic-faq
---

This section provides answers to frequently asked New Relic questions.

## How do I change the New Relic site owner now that our Pantheon site has a new site owner?

A New Relic account can have only one owner at any time. You must be the current account owner to change your role to someone who currently has an Admin role for the account. For more information, see [New Relic's documentation](https://docs.newrelic.com/docs/accounts-partnerships/accounts/account-billing-usage/change-account-owner).

### How can I share a link to a particular metric?

Click **Permalink** at the bottom of any page.  This will preserve the current time window and take the link recipient to the same page you're currently looking at.

### How much does New Relic&reg; Performance Monitoring cost?

Pantheon provides New Relic&reg; Performance Monitoring at no cost for all site plans except Basic. Purchase additional services or upgrade your New Relic account by reaching out to [sales@newrelic.com](mailto:sales@newrelic.com).

### Will turning on New Relic&reg; Performance Monitoring slow my site down?

No, New Relic will not make your site slower. The overhead is small enough to be almost imperceptible. The amount of available metrics useful for debugging and improving performance far outstrips the negligible difference.

### What is the difference between app server response time and browser page load time?

App server response time measures how the page was built on Pantheon, including PHP execution, database, and Redis (if used). Browser page load time measures the additional time of client-side page rendering, DOM processing, and how long it took to transfer to the client. While a fast app server response time is optimal, a slow browser page load time indicates a bad user experience. Some causes are unaggregated or uncompressed scripts and stylesheets, invalid markup, or unoptimized client-side code (like JavaScript).

### Can I use my existing New Relic license with my Pantheon site?

Yes. If you have a [Supported Site Plan](#supported-site-plans), you can bring your own New Relic&reg; Performance Monitoring license. [Activate New Relic&reg; Performance Monitoring](#activate-new-relic-performance-monitoring) for your site, then [contact support](/guides/support/contact-support/). Be sure to provide:

- Your Site ID

- Your New Relic [License Key](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key#finding)

- Your New Relic [Account ID](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/account-id#finding)

**Note:** Pantheon SSO cannot be used to sign in to New Relic for sites using their own license. You will not be able to sign in to New Relic directly from the Pantheon Dashboard.

### Why are servers listed in New Relic with no data?

Because Pantheon's runtime matrix runs your application across many containers simultaneously, it's common to see old containers with no reporting data as your application shifts around. This is not a cause for concern.

### Can I disable New Relic for a specific environment?

We don't recommend turning off New Relic for any one environment as it makes troubleshooting errors and performance issues more difficult. However, you can [disable the New Relic Browser agent](#disable-new-relic-browser-monitoring-agent) if you encounter a situation where it is interfering with other systems, and you can also [write logic based on the environment](/wp-config-php/#how-can-i-write-logic-based-on-the-pantheon-server-environment).

### Can I use the New Relic One Logs feature?

New Relic&reg; Performance Monitoring logs are available at `/logs/newrelic.log`. The New Relic provided with your Pantheon account does not include the new **Logs** feature found in the **Events** section of New Relic's left-side menu.

See [Log Files on Pantheon](/logs) for more information on accessing your logs.

## More Resources

-  [MySQL Troubleshooting with New Relic Performance Monitoring](/guides/new-relic/debug-mysql-new-relic)

- [Troubleshoot New Relic](/guides/new-relic/troubleshoot-new-relic)