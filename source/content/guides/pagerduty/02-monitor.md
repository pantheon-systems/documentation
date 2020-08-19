---
title: Incident Management
subtitle: New Relic Ping Monitors
description: Page two of our guide on Pagerduty integration with New Relic for incident management.
layout: guide
categories: [performance]
tags: [logs, measure, newrelic, teams, webops]
type: guide
anchorid: monitor
pagerduty: true
generator: pagination
pagination:
    provider: data.pagerdutypages
use:
    - pagerdutypages
permalink: docs/guides/pagerduty/monitor/
nexturl: guides/pagerduty/schedule/
previousurl: guides/pagerduty/
editpath: pagerduty/02-monitors.md
---
In this lesson, we'll set up a new ping monitor to periodically check the site's availability in New Relic Synthetics.

## Create a Monitor
1. Navigate to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Live** environment in your Site Dashboard, and click **<span class="glyphicons glyphicons-eye-open" aria-hidden="true"></span> New Relic** then **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Go to New Relic**.
1. Select **Synthetics** from the menu bar at the top of the page.
1. Under **Back-end, front-end, and mobile applications**, select **New Relic Synthetics**

  ![New Relic Synthetics Selection](../../../images/pagerduty/new-relic-synthetics-screen.png)

1. Enter the details for the URL you want to monitor (e.g. `https://www.example.com`).

  ![New Relic Synthetics Selection](../../../images/pagerduty/new-relic-create-monitor-screen.png)

1. Select the locations you wish to check the site from. We recommend picking locations that correspond to your site's visitors to reduce the risk of false-positives due to long-distance networking snafus.
1. Set the frequency for checks. We suggest 5 minutes.
1. Click **Create my monitor**.
1. We'll setup notifications in a [later lesson](/guides/pagerduty/notify) with PagerDuty.

Pantheon can provide New Relic ping monitoring for free as part of the service. However, more advanced monitoring — full browser testing, or scripted interactions — is only available to customers on an annual contract and requires an additional cost. Contact our sales team or your dedicated account manager for details.

## Configure Alert Policy
Now that you have a monitor setup in New Relic to periodically check your Pantheon site, you'll need to configure alerts for downtime incidents:

1. Navigate to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Live** environment in your Site Dashboard, and click **<span class="glyphicons glyphicons-eye-open" aria-hidden="true"></span> New Relic** then **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Go to New Relic**.
1. Select **Alerts & AI** > **Policies** from the menu bar at the top of the page.
1. Select **Create a policy**
1. Enter a name for this alert policy, such as the site name (e.g., `example.com`) and an incident preference (We suggest **By policy**), then click **Create alert policy**.
1. Select **Create a condition**, and choose **Synthetics** and either **single failure** or **multiple location failures**, then **Next, select entities

  ![New Relic Synthetics Selection](../../../images/pagerduty/new-relic-new-policy-condition-screen.png)

1. Select the monitor that you created in [the previous step](#create-a-monitor) and **Next, define thresholds**
1. Click **Advanced Options** and check **Verify SSL**.
1. Click **Create a condition**.
1. Select **Synthetics** and **Monitor failure** then click **Next, select entities**:

  ![New Relic Alert Policy Ping Condition](../../../images/pagerduty/new-relic-policy-ping.png)

7. Select your new monitor, then **Next, define thresholds**:

  ![New Relic select entity](../../../images/pagerduty/new-relic-policy-select-monitor.png)

8. Enter a name for the condition, like "Live Availability", and click **Create condition**.

<Partial file="monitor-alerts.md" />
