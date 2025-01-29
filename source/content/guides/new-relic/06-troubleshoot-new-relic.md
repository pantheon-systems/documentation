---
title: New Relic Performance Monitoring on Pantheon
subtitle: Troubleshoot New Relic
description: Find troubleshooting solutions for your New Relic account.
contenttype: [guide]
innav: [false]
categories: [track, troubleshooting]
cms: [--]
audience: [development, sysadmin]
product: [newrelic]
integration: [--]
tags: [code, newrelic, quicksilver, workflow]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/new-relic/troubleshoot-new-relic
---

This section provides solutions for common New Relic troubleshooting scenarios.

## Common Access Problems

### New Relic Dashboard says "You do not have permission to view this account"

1. Select the User Account in the New Relic Dashboard.

1. Select **Log Out** from the drop-down menu.

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) and click the **Go to New Relic** button.

### If You Click the Go to New Relic Button and Are Instead Sent to a Log in Screen

Log into the Pantheon Dashboard in an [Incognito](https://support.google.com/chrome/answer/95464) or [Private](https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history) window. The New Relic accounts are shared via SSO, so loading the page in a private window will force new sign-in credentials. If you can sign in this way, use the steps below to resolve access for your main browser session.

1. Close all of your open New Relic tabs.

1. Delete all of the New Relic cookies from your browser (support articles for [Chrome](https://support.google.com/chrome/answer/95647) or [Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox#w_clear-cookies-for-any-website)).

1. Reload your Pantheon Dashboard.

1. Click the **Go to New Relic** button.

### If You Are Prompted to Set Up New Relic

You will be prompted to set up New Relic if you try to access New Relic before any traffic reaches an environment.

1. Visit one of your site pages.

1. Close the tab and wait a few minutes.

1. Click the **Go to New Relic** button.

### If you see "We're sorry, you haven't verified your email address yet."

A confirmation email is sent to the site owner to complete the setup process after activating New Relic; Performance Monitoring. The account must be verified before members of the site can access the New Relic dashboard.

If the New Relic account holder (the site owner or user who activated the New Relic&reg; account for the site) did not receive the confirmation email, you can re-send the link by clicking **Forgot your password**:

1. Click **Forgot your password?** on New Relic's login page.

1. Enter the email address of the site owner.

1. Click **Send my reset link**.

1. Open the email and click the reset link.

1. Follow the prompts to access your account.

[Contact support](/guides/support/contact-support/) if you are unsure what user the New Relic account is associated with and are unable to identify where the password reset email has been sent.

## Remove Multidev Environments in New Relic

You must manually [remove a deleted Multidev environment in New Relic](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/remove-applications-servers) after you [delete the Multidev from your Pantheon site](/guides/multidev/delete-multidev).

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard), select the **New Relic** tab, and click **Open New Relic** to see **APM & Services**.

1. Select the specific APM (application) you want to remove from the **APM** list, then click the **Application** tab in the left menu.

1. Navigate to the bottom of the page, click the **Delete application** button, then click the **Confirmation** button when prompted.

## Enable Browser Monitoring for Drupal 10.2+

With the release of Drupal 10.2, [a change to http headers in Drupal core](https://www.drupal.org/node/3298551) prevents automatic injection of New Relic Browser Monitoring code. To continue using this feature, manually insert the tracking script into your templates. [Visit the New Relic documentation for an example configuration](https://docs.newrelic.com/docs/apm/agents/php-agent/features/browser-monitoring-php-agent/#manual_drupal).

## Disable New Relic Browser Monitoring Agent

You might encounter situations where New Relic's Browser agent interferes with other systems. For example, the JavaScript tag might cause [Google AMP validator](https://www.ampproject.org/docs/guides/validate.html) failures, such as `The tag 'script' is disallowed except in specific forms`. You can resolve many errors by disabling New Relic's browser monitoring agent.

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

It is important to note that this method is sensitive to call location. Most customers find success calling this method early in a transaction. For Drupal, this can be done using an event subscriber that listens to the `kernel.request` event, for instance.

## APM Availability Monitoring

Availability monitoring from APM is heavily outdated, and will not work with the Pantheon platform. You can use the free New Relic Synthetic Lite service as an alternative. Refer to [Configure Ping Monitors for Availability](/guides/new-relic/monitor-new-relic#configure-ping-monitors-for-availability) for more information.

## More Resources

- [MySQL Troubleshooting with New Relic Performance Monitoring](/guides/new-relic/debug-mysql-new-relic)
- [New Relic FAQ](/guides/new-relic/new-relic-faq)
