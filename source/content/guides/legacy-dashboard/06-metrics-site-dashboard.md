---
title: Legacy Dashboard
subtitle: Metrics in the Site Dashboard
description: Measure your site's traffic with the Metrics tool, found in the Live environment of the Site Dashboard.
categories: [platform]
tags: [billing, dashboard, measure, traffic]
layout: guide
showtoc: true
reviewed: "2022-08-20"
permalink: docs/guides/legacy-dashboard/metrics
anchorid: metrics
editpath: legacy-dashboard/06-metrics-site-dashboard.md
---

Access Metrics through the Live tab of the Site Dashboard once a [Live environment has been initialized](/guides/quickstart/create-test-live). The number of unique visits displayed in Pantheon’s Site Dashboard determines the traffic Pantheon will apply for evaluating use on your site under your pricing plan. The Site Dashboard also includes other information you may use to project future traffic, including number of pages served.

To access metrics for another environment, use the [Terminus](/terminus) `metrics` command:

```bash{promptUser: user}
terminus metrics <site>.<env>
```

## Access Metrics

1. Navigate to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment of the Site Dashboard.
1. Click **<span class="glyphicons glyphicons-charts"></span> Metrics**.
1. Toggle displayed date ranges by clicking **Day**, **Week**, or **Month**:
  ![Charts for pages served and visits within the Metrics tool of the Site Dashboard](../../../images/dashboard/metrics-graphs.png)

## Available Metrics

<Partial file="traffic-dl.md" />

## Frequently Asked Questions

### How often is data collected?

Data is updated daily, shortly after midnight UTC, with data for the previous day.

### How long do you keep the data?

Data is retained for the following amounts of time:

| Period  | Data Retention |
| ------- | -------------- |
| Day     | 28 days        |
| Week    | 12 weeks       |
| Month   | 12 months      |

### Can I download or access the raw data directly?

Raw data is not currently available.

### Why doesn't Pantheon's traffic match my analytics?

There are some inherent limitations with using an analytics suite (e.g., Google Analytics) when measuring site traffic. For details, see [Traffic Limits and Overages](/guides/account-mgmt/traffic).

### How does Pantheon handle overages?

All non-Basic plans come with free overage protection. Where there is a pattern of consistent overage, we will align a site's plans with its load on the platform. For details, see [Traffic Limits and Overages](/guides/account-mgmt/traffic).

### What about bots?

Pantheon-identified bots are excluded from the Visits and Pages Served Metrics. See [Traffic Limits and Overages](/guides/account-mgmt/traffic) for more information.

### What about redirects?

Only requests with a 200-level status count as pages served, so 301 redirects will not be included in metrics. See [Traffic Limits and Overages](/guides/account-mgmt/traffic) for more information.

### Are multiple user agents on the same originating IP address counted separately?

Yes. For example, multiple devices on the same home network visiting your site would each be considered a unique visitor. See [Traffic Limits and Overages](/guides/account-mgmt/traffic) for more information.

### Can I check metrics from the command line with Terminus?

Yes! Access to metrics via the Terminus `metrics` command. [Install Terminus](/terminus/install) or update to the [current release](/terminus/updates#updates) for access to the `metrics` command.

## More Resources

- [Account Management](/manage)
