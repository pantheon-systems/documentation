---
title: Incident Management
subtitle: Introduction
description: Configure uptime monitors with New Relic&reg; to automatically open an incident in PagerDuty and notify whoever's on-call, following a set escalation path.
layout: guide
contenttype: [guide]
categories: [optimize]
newcms: [--]
audience: [development]
product: [newrelic]
integration: [--]
tags: [logs, measure, newrelic, teams, webops]
type: guide
anchorid: introduction
pagerduty: true
generator: pagination
pagination:
    provider: data.pagerdutypages
use:
    - pagerdutypages
permalink: docs/guides/pagerduty/
nexturl: guides/pagerduty/monitor/
nextpage: Upgrade Site Plan
editpath: pagerduty/01-introduction.md
---
Welcome! This guide will help you configure uptime monitors on a Pantheon Site with New Relic&reg; to automatically open an incident in PagerDuty and notify whoever's on-call, following a set escalation path.

**In this guide, you’ll learn how to:**

* Monitor site uptime and set alert conditions in New Relic&reg;
* Create an on-call schedule and escalation policy for your team in PagerDuty
* Integrate New Relic&reg; with PagerDuty to send notifications to whoever is on-call (SMS, email, phone call) when an incident occurs
* Integrate PagerDuty with Slack to acknowledge and resolve incidents (optional)

## Before You Begin
To get started, you need to activate [New Relic&reg; Performance Monitoring](/guides/new-relic) on Pantheon:

1. Navigate to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Live** environment in your Site Dashboard, and click **<span class="glyphicons glyphicons-eye-open" aria-hidden="true"></span> New Relic**.
2. Click the **Activate New Relic Pro** button.
3. Use the **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Live Site** and browse your site for a few minutes to generate data in New Relic&reg;:

  ![New Relic Enable and Generate Data](../../../images/pagerduty/new-relic-generate-data.png)

## More Resources

- [New Relic&reg; Performance Monitoring on Pantheon](/guides/new-relic)

- [Monitor and Improve Site Performance with New Relic&reg;](/guides/new-relic/monitor-new-relic)

- [Integrate Your Fastly Account with New Relic&reg;](/guides/fastly-pantheon/fastly-new-relic)