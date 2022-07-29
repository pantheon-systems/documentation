---
title: New Relic Performance Monitoring on Pantheon
subtitle: Troubleshoot New Relic
description: Find troubleshooting solutions for your New Relic account.
categories: [automate]
tags: [code, newrelic, quicksilver, workflow]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/new-relic/troubleshoot-new-relic
anchorid: troubleshoot-new-relic
---

This section provides solutions for common New Relic troubleshooting scenarios.

## Common Access Problems

### New Relic Dashboard says "You do not have permission to view this account"

1. Select the User Account in the New Relic Dashboard.

1. Select **Log Out** from the drop-down menu. 

1. Navigate to the Site Dashboard and click the **Go to New Relic** button.

### If you click the Go to New Relic button and are instead sent to a log in screen

1. Log into the Pantheon Dashboard in an [Incognito](https://support.google.com/chrome/answer/95464) or [Private](https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history) window. The New Relic accounts are shared via SSO, so loading the page in a private window will force new sign-in credentials. If you can sign in this way, use the steps below to resolve access for your main browser session.

1. Close all of your open New Relic tabs.

1. Delete all of the New Relic cookies from your browser (support articles for [Chrome](https://support.google.com/chrome/answer/95647) or [Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox#w_clear-cookies-for-any-website)).

1. Reload your Pantheon Dashboard.

1. Click the **Go to New Relic** button.

### If you are prompted to Set Up New Relic

You will be prompted to set up New Relic if you try to access New Relic before any traffic reaches an environment.

1. Visit one of your site pages.

1. Close the tab and wait a few minutes.

1. Click the **Go to New Relic** button.

### If you see "We're sorry, you haven't verified your email address yet."

A confirmation email is sent to the site owner to complete the setup process after activating New Relic&reg; Performance Monitoring. The account must be verified before members of the site can access the New Relic dashboard.

If the New Relic account holder (the site owner or user who activated the New Relic account for the site) did not receive the confirmation email, you can re-send the link by clicking **Forgot your password**:

1. Click **Forgot your password?** on New Relic's login page.

1. Enter the email address of the site owner.

1. Click **Send my reset link**.

1. Open the email and click the reset link.

1. Follow the prompts to access your account.

[Contact support](/guides/support/contact-support/) if you are unsure what user the New Relic account is associated with and are unable to identify where the password reset email has been sent.

## Removing Multidev Environments in New Relic

You must manually [remove a deleted Multidev environment in New Relic](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/remove-applications-servers) after you delete it from your Pantheon site.

1. Navigate to your Dashboard, select the **New Relic** tab, and click **Open New Relic**.

1. Select **APM** and then select **Applications** in the New Relic menu bar.

1. Wait until the color-coded health status turns gray, and then select the app's gear icon.

1. Select **Delete app**, and then click the confirmation button.

## Disable New Relic Browser Monitoring Agent

You might encounter situations where New Relic's Browser agent interferes with other systems. For example, the JavaScript tag might cause [Google AMP validator](https://www.ampproject.org/docs/guides/validate.html) failures, such as `The tag 'script' is disallowed except in specific forms`. You can resolve many errors by disabling New Relic's Browser monitoring agent.

New Relic is disabled on all AMP pages in this example:

```php
$path = $_SERVER['REQUEST_URI'];
$find = '?amp';
$pos = strpos($path, $find);
if ($pos !== false){
  if (function_exists('newrelic_disable_autorum')) {
    newrelic_disable_autorum();
  }
}
```

The code above should be added to `settings.php` for Drupal sites or `wp-config.php` for WordPress sites.

To isolate the disabling of New Relic to only AMP pages, the example logic checks the current request for `?amp`. Adjust this example as needed based on your site's implementation of Google AMP and it's corresponding URL patterns.

It is important to note that this method is sensitive to call location. Most customers find success calling this method early in a transaction. For Drupal 8, this can be done using an event subscriber that listens to the `kernel.request` event for instance.

## APM Availability Monitoring

Availability monitoring from APM is heavily outdated, and will not work with the Pantheon platform. As an alternative, you can use the free New Relic Synthetic Lite service using the [steps provided above](#configure-ping-monitors-for-availability).

## More Resources

-  [MySQL Troubleshooting with New Relic Performance Monitoring](/guides/new-relic/debug-mysql-new-relic)

- [Troubleshooting WordPress Performance with New Relic](https://pantheon.io/blog/troubleshooting-wordpress-performance-new-relic)

- [New Relic&reg; Performance Monitoring and Drupal: Find Your Site's Slow Spots](https://pantheon.io/blog/new-relic-drupal-find-site-slow-spots)

- [New Relic FAQ](/guides/new-relic/new-relic-faq)

