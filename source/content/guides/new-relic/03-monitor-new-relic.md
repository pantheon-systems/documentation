---
title: New Relic Performance Monitoring on Pantheon
subtitle: Monitor and Improve Site Performance
description: Learn how to use New Relic to monitor and improve site performance.
contenttype: [guide]
innav: [false]
categories: [track]
cms: [--]
audience: [development, sysadmin]
product: [newrelic]
integration: [--]
tags: [logs, measure, newrelic]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/new-relic/monitor-new-relic
---

This section provides information on how to monitor and improve site performance with New Relic&reg;.

<Alert title="Note" type="info">

 Please [contact support](/guides/support/contact-support/) if you encounter a permissions warning in New Relic while following the steps below, or if you can't access these features.

</Alert>

## Monitor and Improve Performance

New Relic&reg;'s Dashboard opens with a high-level breakdown of application performance by dividing response time into three segments in its main graph:

1. PHP Execution

1. Database Queries (MySQL or Redis)

1. External Requests (calls to third-party APIs)

Depending on which area you need to optimize, you will explore different areas of data. For instance, a lot of [time spent in the database](/guides/new-relic/debug-mysql-new-relic) could be the result of slow queries, or an elevated volume of queries overall.

For more information on using New Relic&reg;'s features, we encourage you to review the [New Relic&reg; APM](https://docs.newrelic.com/docs/apm) docs, especially the pages on [transactions](https://docs.newrelic.com/docs/apm/transactions) and [slow query details](https://docs.newrelic.com/docs/apm/applications-menu/monitoring/viewing-slow-query-details). You can find more information on using New Relic&reg; to investigate specific areas of performance below:

- [MySQL Troubleshooting With New Relic&reg; Performance Monitoring](/guides/new-relic/debug-mysql-new-relic)

## Configure Ping Monitors (Synthetics) for Availability

New Relic provides an availability monitoring service within their Synthetics tool suite which can be enabled by [contacting support](/guides/support/contact-support/). This basic monitoring feature sends a request to designated URLs from configured locations. Requests are sent at configured intervals and alerts are sent via email when a response fails.

Pantheon provides unlimited New Relic Synthetics ping monitoring as part of the service. Still, there's a quota for all other monitor types (simple browser, scripted browser, and scripted API monitors). This quota is set at 10K Synthetics monthly checks for each Pantheon account, so it's crucial to manage it effectively.

<Alert title="Note" type="info">

When a Pantheon workspace has more than 10K Synthetics checks are running monthly Pantheon will adjust the frequency or number of locations a Synthetics check originates from the reduce the number of checks. This is required to allow Synthetic to continue to operate correctly under the overall New Relic quota for Pantheon.

</Alert>

More advanced monitoring, including full browser testing and scripted interactions, is only available to customers on an annual contract and requires an additional cost. Contact our [sales team](https://pantheon.io/contact-us) or your dedicated account manager for more information.

Follow the steps below to configure the monitor service.

1. Click **New Relic**, then go to New Relic from the target environment within the Site Dashboard on Pantheon.

1. Select **Synthetic Monitoring** from the main menu.

1. Click **Create Monitor** in the **Monitors** tab (default) and enter the details for the URL you want to monitor.

1. Select the locations you want to check the site from. We recommend picking locations that correspond to your site's visitors to reduce the risk of false-positives due to long-distance network mixups.

1. Set the frequency for checks. We suggest five minutes.

1. Provide an email address for notifications.

1. Click **Save monitor**.

## Enable Drupal Hooks & Modules Metrics

As of April 23, 2024, Drupal hooks & modules metrics are not reported by default. To enable this reporting, add the following to your site or upstream `pantheon.yml` file:

```yml:title=pantheon.yml
new_relic:
  drupal_hooks: true
```


## Focus on Authenticated Users Only

It can be useful to exclude anonymous users who are using your site's page cache if your site consists of mostly authenticated traffic. This technique will still capture form submissions, including logins and contact pages. Similar logic can be used to disable New Relic&reg; on certain paths, such as `/admin` in Drupal or `/wp-admin` in WordPress.

### Drupal

To disable New Relic&reg; for anonymous traffic on Drupal-based sites, add the following code to your `sites/default/settings.php`:

```php:title=settings.php
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

To disable New Relic&reg; for anonymous traffic on WordPress sites, add the following code to your `templates/<your_template>/functions.php`:

```php:title=functions.php
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

<Partial file="monitor-alerts.md" />

## More Resources

- [New Relic&reg; Ping Monitors](/guides/pagerduty/monitor/)

- [New Relic&reg; Labeling with Quicksilver](/guides/new-relic/new-relic-quicksilver)

- [New Relic&reg; FAQ](/guides/new-relic/new-relic-faq)
