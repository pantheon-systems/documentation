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

If you are running Drupal 10.2 or higher, [New Relic’s Browser Agent](https://docs.newrelic.com/docs/browser/browser-monitoring/getting-started/introduction-browser-monitoring/) auto-instrumentation is disabled by default. 

<Alert title="Note" type="info">

WordPress sites and older versions of Drupal (pre-10.2) do not enforce this header strictly. Auto-instrumentation of New Relic’s Browser agent continues to work out-of-the-box for those frameworks.

</Alert>

### The Context: Why is Auto-Instrumentation disabled?
Starting in version 10.2, Drupal automatically calculates and sets a `Content-Length` HTTP header for most page responses to optimize web server performance.

Normally, New Relic’s server-side PHP Agent acts as a middleman, automatically injecting the Browser Agent into your HTML before it reaches the user. However, this injection increases the total size of the file. This creates a mismatch between the originally declared `Content-Length` and the new, larger payload size. This mismatch can cause modern browsers to truncate (cut off) the page before it fully loads, breaking your site's layout and functionality.

In order to avoid this, **we automatically disable the Browser auto-injection feature for sites using Drupal 10.2+**. This is in line with New Relic’s official documentation, and your PHP agent instrumentation remains unchanged.

Instead, one option provided by New Relic is to [manually instrument your site](#option-1-manual-theme-instrumentation-recommended) by pasting the Browser Agent snippets directly into your page templates. This should restore the previous metrics collection, but can be a tedious process.

Another option is to [enable Pantheon’s automatic Browser Agent injection](#option-2-platform-auto-injection-via-pantheonyml), which will automatically add the Browser Agent headers and footers on demand via PHP prepend files behind the scenes. Because removing this header can negatively impact edge caching and how browsers download your site's assets, we do not strip this header or auto-inject the script by default for Drupal 10.2+ environments.

### How to Enable Browser Monitoring
You have two options to enable the New Relic Browser Agent. You **must only choose one**. Using both methods simultaneously will result in double-counted metrics and skewed performance data.

<Alert title="Important Considerations" type="danger">

* If you have previously implemented [Option 1 (manual instrumentation)](#option-1-manual-theme-instrumentation-recommended), you must not use [Option 2 (Pantheon's auto-inject)](#option-2-platform-auto-injection-via-pantheonyml) as it may result in incorrect recording of Browser metrics. Instead, leave `nr_browser_auto_inject` set to `false` (or omit it entirely) within your site's `pantheon.yml` configuration file.

* If you choose [Option 2 (Pantheon's auto-inject)](#option-2-platform-auto-injection-via-pantheonyml), be aware that stripping the `Content-Length` header modifies core Drupal HTTP behavior. While generally safe, if you utilize highly customized edge caching rules that strictly rely on this header, you may experience unexpected caching behavior. If this occurs, revert to [Option 1](#option-1-manual-theme-instrumentation-recommended).

</Alert>

#### Option 1: Manual Theme Instrumentation (Recommended)
This is New Relic’s officially recommended workaround. By manually placing the JavaScript snippet into your theme, you avoid header conflicts entirely.

1. Log into your New Relic dashboard.
1. Navigate to your APM application.
1. In the left-hand menu, click **Browser/Views** > **Application Settings**.
1. Select the option to copy the JavaScript snippet.
1. Paste this snippet directly into your Drupal theme's header file (typically `html.html.twig`), placing it as high up in the `<head>` tag as possible.
1. Commit and deploy your code.

#### Option 2: Platform Auto-Injection via `pantheon.yml`
If you prefer not to edit your theme files, you can instruct our platform to forcefully handle the injection for you. Enabling this setting tells our platform to intercept the Drupal response, strip the `Content-Length` header, and safely inject the New Relic script.

1. Open your project's code repository.
1. Locate the `pantheon.yml` file in the root directory.
1. Look for the following configuration flag and set it to `true`:

    ```yml:title=pantheon.yml
    # NEW RELIC BROWSER AGENT AUTO-INJECT - For Drupal 10.2+
    # Warning: Setting this to 'true' will remove Drupal's default Content-Length headers for responses.
    # DO NOT enable this if you have already manually pasted the New Relic snippet into your theme.
    nr_browser_auto_inject: true
    ```

1. Commit and push the `pantheon.yml` file to your environment.
1. Changes will take effect within 24 hours and you should see data populating in the Browser section in your site’s New Relic.

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
