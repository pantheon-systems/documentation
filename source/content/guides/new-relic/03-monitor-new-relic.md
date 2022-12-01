---
title: New Relic Performance Monitoring on Pantheon
subtitle: Monitor and Improve Site Performance
description: Learn how to use New Relic to monitor and improve site performance.
contenttype: [guide]
categories: [measure]
newcms: [--]
audience: [development, sysadmin]
product: [newrelic]
integration: [--]
tags: [logs, measure, newrelic]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/new-relic/monitor-new-relic
anchorid: monitor-new-relic
---

This section provides information on how to monitor and improve site performance with New Relic&reg;.

## Monitor and Improve Performance

New Relic&reg;'s Dashboard opens with a high-level breakdown of application performance by dividing response time into three segments in its main graph:

1. PHP Execution

1. Database Queries (MySQL or Redis)

1. External Requests (calls to third-party APIs)

Depending on which area you need to optimize, you will explore different areas of data. For instance, a lot of [time spent in the database](/guides/new-relic/debug-mysql-new-relic) could be the result of slow queries, or an elevated volume of queries overall.

For more information on using New Relic&reg;'s features, we encourage you to review the [New Relic&reg; APM](https://docs.newrelic.com/docs/apm) docs, especially the pages on [transactions](https://docs.newrelic.com/docs/apm/transactions) and [slow query details](https://docs.newrelic.com/docs/apm/applications-menu/monitoring/viewing-slow-query-details). You can find more information on using New Relic&reg; to investigate specific areas of performance below:

- [Measuring PHP7 Performance with New Relic&reg;](https://pantheon.io/blog/measuring-php-7-performance-new-relic-nobsbenchmarks)

- [MySQL Troubleshooting With New Relic&reg; Performance Monitoring](/guides/new-relic/debug-mysql-new-relic)

- [New Relic&reg; Performance Monitoring and Drupal: Find Your Site's Slow Spots](https://pantheon.io/blog/new-relic-drupal-find-site-slow-spots)

- [Troubleshooting WordPress Performance with New Relic&reg; Performance Monitoring](https://pantheon.io/blog/troubleshooting-wordpress-performance-new-relic)

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
