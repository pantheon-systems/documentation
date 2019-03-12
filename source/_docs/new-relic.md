---
title: New Relic APM Pro
description: Learn how to enable and use New Relic performance metrics and reports for your Drupal or WordPress site.
tags: [newrelic, addons]
categories: []
---
[New Relic APM Pro](https://newrelic.com/){.external} offers a wide array of metrics that provide a nearly real-time look into the performance of a web application. Using New Relic not only makes it easy for you to monitor your performance, but it can also speed up the support process by helping our support team visualize corresponding performance and symptoms.

<div class="enablement">
  <h4 class="info" markdown="1">[Agency DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Get the most out of New Relic with help from the experts at Pantheon. We deliver custom workshops to help development teams master the platform and improve internal DevOps.</p>
</div>

## Supported Site Plans
All plans except for a Basic plan can use New Relic APM Pro. New Relic APM Pro is available to Sandbox site plans for developmental purposes, but New Relic APM Pro will not be available going live on a Basic plan.

| Plans         | New Relic APM Pro Support <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-content="Available across all environments, including Multidevs."><em class="fa fa-info-circle"></em></a> |
| ------------- | ------- |
| Sandbox       | ✓       |
| Basic         |         |
| Performance   | ✓       |
| Elite         | ✓       |

## Activate New Relic APM Pro
Select the **New Relic** tab on your Site Dashboard, and click **Activate New Relic Pro**. Visit your site in the browser a couple of times to generate data in New Relic. After a few minutes pass, go to the New Relic workspace on your Dashboard, and click **Go to New Relic**.

New Relic is automatically enabled for all application containers added to the site, including Multidev environments.

## Configure Ping Monitors for Availability
New Relic provides a free availability monitoring service within their Synthetics tool suite at the Lite service level. This basic monitoring check sends a request to designated URLs from configured locations at given intervals and alerts you via email when a response fails. To configure this service:

1. Click **New Relic** > **Go to New Relic**  from the target environment within the Site Dashboard on Pantheon.
2. Select **Synthetics** from the menu bar at the top of the page.
3. From the **Monitors** tab (default), click **Add new**, and enter the details for the URL you want to monitor.
4. Select the locations you wish to check the site from. We recommend picking locations that correspond to your site's visitors to reduce the risk of false-positives due to long-distance networking snafus.
5. Set the frequency for checks. We suggest 5 minutes.
6. Provide an email address for notifications.
7. Click **Create my monitor**.

Pantheon can provide New Relic ping monitoring for free as part of the service. However, more advanced monitoring — full browser testing, or scripted interactions — is only available to customers on an annual contract and requires an additional cost. Contact our sales team or your dedicated account manager for details.

## Monitoring and Improving Performance

New Relic's Dashboard starts with a high-level breakdown of application performance by dividing response time into three segments in its main graph:

1. PHP Execution
2. Database Queries (MySQL or Redis)
3. External Requests (e.g. calls to third-party APIs)

Depending on which area you need to optimize, you will dig in to different areas of data. For instance, a lot of [time spent in the database](/docs/debug-mysql-new-relic/) could be the result of slow queries, or an elevated volume of queries overall.

For more information on using New Relic's features, we encourage you to read  the [New Relic APM](https://docs.newrelic.com/docs/apm){.external} docs, especially the pages on [transactions](https://docs.newrelic.com/docs/apm/transactions){.external} and [slow query details](https://docs.newrelic.com/docs/apm/applications-menu/monitoring/viewing-slow-query-details){.external}. You can find more information on using New Relic to investigate specific areas of performance below:

- [Measuring PHP7 Performance with New Relic](https://pantheon.io/blog/measuring-php-7-performance-new-relic-nobsbenchmarks){.external}
- [MySQL Troubleshooting With New Relic Pro](/docs/debug-mysql-new-relic/){.external}
- [New Relic and Drupal: Find Your Site's Slow Spots](https://pantheon.io/blog/new-relic-drupal-find-site-slow-spots){.external}
- [Troubleshooting WordPress Performance with New Relic](https://pantheon.io/blog/troubleshooting-wordpress-performance-new-relic){.external}

## Focusing on Authenticated Users Only

If your site consists of mostly authenticated traffic, it can be useful to exclude anonymous users who are using your site's page cache. This technique will still capture form submissions, including logins and contact pages. Similar logic can be used to disable New Relic on certain paths, such as `/admin` in Drupal or `/wp-admin` in WordPress.

### Drupal
To disable New Relic for anonymous traffic on Drupal-based sites, add the following to your `sites/default/settings.php`:

```
// Disable New Relic for anonymous users.
if (function_exists('newrelic_ignore_transaction')) {
  $skip_new_relic = TRUE;
  // Capture all transactions for users with a PHP session.
  // (SSESS is the session cookie prefix when PHP session.cookie_secure is on.)
  foreach (array_keys($_COOKIE) as $cookie) {
    if (substr($cookie, 0, 4) == 'SESS' || substr($cookie, 0, 5) == 'SSESS') {
      $skip_new_relic = FALSE;
    }
  }
  // Capture all POST requests so we include anonymous form submissions.
  if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $skip_new_relic = FALSE;
  }
  if ($skip_new_relic) {
    newrelic_ignore_transaction();
  }
}
```

### WordPress
To disable New Relic for anonymous traffic on WordPress sites, add the following to your `templates/<your_template>/functions.php`:

```
// Disable New Relic for anonymous users.
if (function_exists('newrelic_ignore_transaction')) {
    $skip_new_relic = !is_user_logged_in();

    // Capture all POST requests so we include anonymous form submissions.
    if (isset($_SERVER['REQUEST_METHOD']) &&
        $_SERVER['REQUEST_METHOD'] == 'POST') {
        $skip_new_relic = FALSE;
    }

    if ($skip_new_relic) {
        newrelic_ignore_transaction();
    }
}
```

{% include("content/monitor-alerts.html")%}


## New Relic Access

Your first visit to New Relic must be via the **Go to New Relic** button. Once you have successfully accessed the New Relic Dashboard, you may use the environment links to go directly to their corresponding New Relic page.

### If you go to the New Relic Dashboard and see "You do not have permission to view this account"
1. From the New Relic Dashboard, click on the User Account to the right.
2. From the Dropdown, click **Log Out**.
3. Back on the Pantheon Site Dashboard, click the **Go to New Relic** button.

### If you click the Go to New Relic button and are instead sent to a log in screen

To troubleshoot this issue, try logging into the Pantheon Dashboard in an [Incognito](https://support.google.com/chrome/answer/95464){.external} or [Private](https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history){.external} window. The New Relic accounts are shared via SSO, so loading the page in a private window will force new sign-in credentials. If you can sign in this way, use the following steps to resolve access for your main browser session:

1. Close all of your open New Relic tabs.
2. Delete all of the New Relic cookies from your browser (support articles for [Chrome](https://support.google.com/chrome/answer/95647){.external} or [Firefox](https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored#w_delete-cookies-for-a-single-site){.external}).
3. Reload your Pantheon Dashboard.
4. Click the **Go to New Relic** button.

### If you are prompted to Set Up New Relic
If you try to access New Relic prior to any traffic reaching an environment, you will be prompted to set up New Relic.

1. Visit one of your site pages.
2. Close the tab, wait a few minutes.
3. Click the **Go to New Relic** button.

### Who is the New Relic account associated with?
- If the site owner is a user, the site owner's name and email address is used to create the New Relic account.
- If the site owner is an organization, the name and email address of the Pantheon user who activates New Relic is used to create the New Relic account. This user must be a member of the organization.

### If you see "We're sorry, you haven't verified your email address yet."
After activating New Relic, a confirmation email will be sent to the site owner to complete the setup process. The account will need to be verified first before members of the site can access New Relic dashboard.

If the New Relic account holder, i.e. the site owner or user who activated the New Relic account for the site, did not receive the confirmation email, you can re-send the link by clicking "Forgot your password":

1. On New Relic's login page, click **Forgot your password?**.
2. Enter the email address of the site owner.
3. Click **Send my reset link**.
4. Open the email you will receive, click the reset link, and follow the prompts to access your account.

Contact Support if you are unsure what user the New Relic account is associated with and unable to identify where the password reset email has been sent.


## Troubleshooting

### Removing Multidev Environments in New Relic
After deleting a Multidev environment from your site, you'll need to manually [remove them in New Relic](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/remove-applications-servers){.external}.

1. From your Dashboard, select the **New Relic** tab, and **Open New Relic**.
2. From the New Relic menu bar, select **APM** > **Applications**.
3. Wait until the color-coded health status turns gray, then select the app's gear icon.
4. Select **Delete app**, and click the confirmation button.

### Disable New Relic Browser Monitoring Agent
You may encounter situations where New Relic's Browser agent may interfere with other systems. For example, the JavaScript tag may cause [Google AMP validator](https://www.ampproject.org/docs/guides/validate.html){.external} failures, such as `The tag 'script' is disallowed except in specific forms`. You can resolve many errors by disabling New Relic's Browser monitoring agent.

In this example we'll disable it on all AMP pages:

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

To isolate the disabling of New Relic to only AMP pages, the example logic checks the current request for `?amp`. Adjust this example as needed based on your site's implementation of Google AMP and it's corresponding URL patterns.

It is important to note that this method is sensitive to call location. Most customers find success calling this method early in a transaction. For Drupal 8, this can be done using an event subscriber that listens to the `kernel.request` event for instance.

### APM Availability Monitoring
Availability monitoring from APM is heavily outdated, and will not work with the Pantheon platform. As an alternative, you can use the free New Relic Synthetic Lite service using the [steps provided above](#configure-ping-monitors-for-availability).

## Frequently Asked Questions

### How do I change the New Relic site owner now that our Pantheon site has a new site owner?
A New Relic account can have only one owner at any time. You must be the current account owner to change your role to someone who currently has an Admin role for the account. For more information, see [New Relic's documentation](https://docs.newrelic.com/docs/accounts-partnerships/accounts/account-billing-usage/change-account-owner){.external}.

### How can I share a link to a particular metric?

At the bottom of any page, click **Permalink**. This will preserve the current time window and take the link recipient to the same page you're currently looking at.

### How much is New Relic APM Pro?

Pantheon provides New Relic APM Pro for all site plans except Basic, at no cost. Purchase additional services or upgrade your New Relic account by reaching out to [sales@newrelic.com](mailto:sales@newrelic.com){.external}.

### Will turning on New Relic APM Pro slow my site down?

Basically no, New Relic will not make your site slower. There is a very small amount of overhead, but it's imperceptible. The amount of available metrics useful for debugging and improving performance far outstrips the negligible difference.

### What is the difference between app server response time and browser page load time?

App server response time measures how the page was built on Pantheon, including PHP execution, database, Redis (if used). Browser page load time measures the additional time of client-side page rendering, DOM processing, and how long it took to transfer to the client. While a fast app server response time is optimal, a slow browser page load time indicates a bad user experience. Some causes are unaggregated or uncompressed scripts and stylesheets, invalid markup, or unoptimized client-side code (like JavaScript).

### Can I use my existing New Relic license with my Pantheon site?

New Relic Pro is automatically provisioned for your site. Unfortunately, you cannot use your existing license.

### Why are servers listed in New Relic with no data?

Because Pantheon's runtime matrix runs your application across many containers simultaneously, it's common to see old containers with no reporting data as your application shifts around. This is not a cause for concern.

### Can I disable New Relic for a specific environment?

We don't recommend turning off New Relic for any one environment as it makes troubleshooting errors and performance issues more difficult. However, you can [disable the New Relic Browser agent](#disable-new-relic-browser-monitoring-agent) if you encounter a situation where it is interfering with other systems, and you can also <a href="/docs/wp-config-php/#how-can-i-write-logic-based-on-the-pantheon-server-environment" data-proofer-ignore>write logic based on the environment</a>.

## See Also
- [MySQL Troubleshooting With New Relic Pro](/docs/debug-mysql-new-relic/)
- [New Relic and Drupal: Find Your Site's Slow Spots](https://pantheon.io/blog/new-relic-drupal-find-site-slow-spots){.external}
- [Troubleshooting WordPress Performance with New Relic](https://pantheon.io/blog/troubleshooting-wordpress-performance-new-relic){.external}
- [New Relic University: Intro to APM](https://learn.newrelic.com/courses/intro_apm){.external}
- [New Relic University: APM Advanced](https://learn.newrelic.com/courses/apm_advanced){.external}
- [Interface Overview](https://newrelic.com/docs/site/the-new-relic-ui){.external}
- [Finding Help From the New Relic UI](https://newrelic.com/docs/site/finding-help){.external}
- [Introduction to New Relic for PHP](https://docs.newrelic.com/docs/agents/php-agent/getting-started/introduction-new-relic-php#monitor-performance){.external}
