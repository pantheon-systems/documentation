---
title: New Relic Performance Monitoring on Pantheon
subtitle: Introduction
description: Learn how New Relic Performance Monitoring can help you with your metrics and reports on Pantheon.
contenttype: [guide]
innav: [true]
categories: [track]
cms: [--]
audience: [development, sysadmin]
product: [newrelic]
integration: [--]
tags: [logs, measure, newrelic]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/new-relic
---

[New Relic&reg; Performance Monitoring](https://newrelic.com/) offers a wide array of metrics that provide a nearly real-time look into the performance of a web application. New Relic&reg; makes it easy for you to monitor your performance and speed up the support process by helping our support team visualize corresponding performance and symptoms.

## Supported Site Plans

All plans except for a Basic plan can use New Relic&reg;. New Relic&reg; is available to Sandbox site plans for developmental purposes, but will not be available when your Basic plan goes live.

| Plans         | New Relic&reg; Performance Monitoring Support <Popover content="Available across all environments, including Multidevs." /> |
| ------------- | ------- |
| Sandbox       | <span style="color:green">✔</span>      |
| Basic         |  <span style="color:red">❌ </span>      |
| Performance   | <span style="color:green">✔</span>      |
| Elite         | <span style="color:green">✔</span>      |

## Available Features
### Features enabled by default
When New Relic® is enabled, the following features are available by default:
* **[APM (Application Performance Monitoring)](https://newrelic.com/platform/application-monitoring)** – Provides deep visibility into application performance, including transaction traces and error analytics.
* **[Browser Monitoring](https://newrelic.com/platform/browser-monitoring)** – Tracks real-user interactions and page load performance to optimize frontend experiences. Everything in Browser is included with the exception of Session Replay.
### Features enabled upon request
Synthetic monitors and alerts are available for all accounts but not enabled by default. Please [reach out to support](/guides/support/contact-support) or your account team and they can grant you access at no additional cost.
* **[10K Synthetic Checks per month](https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/using-monitors/intro-synthetic-monitoring/)** – Allows uptime and simple scripted checks to monitor site availability and key transactions. Ping monitors do not count towards the monthly limit.
* **[Alerts](https://docs.newrelic.com/docs/alerts/overview/)** – Empower your team with to proactively detect and address potential problems using data and thresholds defined by your team specifically for your sites.
* **[Errors Inbox](https://docs.newrelic.com/docs/errors-inbox/errors-inbox)** – Provides a unified error tracking experience for detecting errors across your stack.

These features are available for every environment. When a Multidev is created, it will automatically appear in New Relic after it receives traffic.

Any additional New Relic® features beyond these default inclusions will be subject to review and may either incur extra charges or be removed. Additional non-Pantheon assets will be subject to the same terms. Please consult with your account team before enabling additional agents or features to avoid unexpected costs. In some circumstances, we may modify the configuration in your account. For example, we may adjust sampling rates or other settings to optimize system performance.

### Additional paid features
Additional New Relic® features are available for purchase. Other New Relic® features, such as Tracing, Infrastructure Monitoring, Logs, and Mobile, are not available by default but can be requested.
If you require:
* Additional capabilities beyond the features listed in the section above (e.g., custom events, logs, distributed tracing).
* Monitoring of non-Pantheon assets that support your sites (e.g., external databases, external failover systems).

For more details or to request additional New Relic capabilities, please contact your account team.

## More Resources

- [Incident Management with New Relic&reg; and PagerDuty](/guides/pagerduty/)
