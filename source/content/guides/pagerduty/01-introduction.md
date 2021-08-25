---
title: Incident Management
subtitle: Introduction
description: Configure uptime monitors with New Relic to automatically open an incident in PagerDuty and notify whoever's on-call, following a set escalation path.
layout: guide
categories: [performance]
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
Welcome! This guide will help you configure uptime monitors on a Pantheon Site with New Relic to automatically open an incident in PagerDuty and notify whoever's on-call, following a set escalation path.

**In this guide, you’ll learn how to:**

* Monitor site uptime and set alert conditions in New Relic
* Create an on-call schedule and escalation policy for your team in PagerDuty
* Integrate New Relic with PagerDuty to send notifications to whoever is on-call (SMS, email, phone call) when an incident occurs
* Integrate PagerDuty with Slack to acknowledge and resolve incidents (optional)

## Before You Begin
To get started, you need to activate [New Relic&reg; Performance Monitoring](/new-relic) on Pantheon:

1. Navigate to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Live** environment in your Site Dashboard, and click **<span class="glyphicons glyphicons-eye-open" aria-hidden="true"></span> New Relic**.
2. Click the **Activate New Relic Pro** button.
3. Use the **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Live Site** and browse your site for a few minutes to generate data in New Relic:

  ![New Relic Enable and Generate Data](../../../images/pagerduty/new-relic-generate-data.png)
