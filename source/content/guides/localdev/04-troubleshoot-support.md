---
title: Pantheon Localdev
subtitle: Support & Troubleshooting
description: Best practices for troubleshooting, getting support, and reporting bugs or feature requests.
categories: [develop]
tags: [localdev, local, workflow]
contributors: [edwardangert, alexfornuto]
reviewed: "2020-12-04"
layout: guide
permalink: docs/guides/localdev/troubleshoot-support
anchorid: localdev/troubleshoot-support
editpath: localdev/04-troubleshoot-support.md
---

## FAQ, Troubleshooting, and Support

### What does Localdev do about existing Lando config files?

Localdev will use an existing `.lando` file only when the site is initially cloned. After the initial site clone, there is currently no `lando rebuild` equivalent that will force Localdev to reconsider the landofile. Note that if there are services specified in `.lando`, Localdev will return an error.

While Localdev uses parts of Lando under the hood, they should be considered separate tools. Using Localdev and Lando on the same local site is not recommended.

### Can WordPress Site Networks be developed through Localdev?

At this time, WordPress Site Network (also known as WordPress Multisite) development is not supported through Localdev.

### How do you configure PHP versions for sites in the LocalDev environment?

LocalDev will [respect the changes made to your local `pantheon.yml`](/php-versions#configure-php-version) file.

A force rebuild is required for changes in `pantheon.yml` to take effect:

![Force Rebuild your app in LocalDev](../../../images/localdev/localdev-rebuild.png)

You can verify which version of PHP your site is using by clicking **Launch Terminal**, then running `php -v`:

![Verify your app's version of PHP](../../../images/localdev/localdev-php-version.png)

### Contact Support / File an Issue

Before contacting support, review the [support request best practices](/support#best-practices) to help our team help you resolve the issue, or to report any potential issues in Localdev itself.

1. Navigate to the **Settings** tab and confirm that *Usage and Crash Data* is set to **Allow reports**. This allows the application to automatically submit crash data to Pantheon Support.

   - Application reports are collected and stored locally in `~/.pantheonlocaldev`.

1. Reproduce the error and note the steps taken.

   - If the error is inconsistent, make note of this as well. Multiple reports of an inconsistent error help our team troubleshoot.

1. Report the error:

   - [Contact Support via your Dashboard](https://dashboard.pantheon.io/#support/support/all) or [via Chat](/support/#real-time-chat-support) and include the steps you took to reproduce the error.

### Provide Feedback or Feature Requests

Please submit feedback and feature requests through the [Pantheon Localdev Customer Feedback](https://docs.google.com/forms/d/e/1FAIpQLSdy2WU7H3bSd94YmEuTvGhzmmT_xP3LlCgORXOkTt-M8UIAXw/viewform) form.

### Log out and Reset to Defaults

The steps in this section should only be used as a last resort. This resets Localdev and will remove the machine token and all local copies of your connected sites.

1. Click **Settings**

1. **Reset to defaults**

1. **Proceed with reset**