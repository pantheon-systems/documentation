---
title: New Relic Performance Monitoring on Pantheon
subtitle: Using Synthetic Monitors
description: Learn how to manage your New Relic Synthetics limit effectively to avoid service disruptions and protect your site's performance.
contenttype: [guide]
innav: [false]
categories: [track]
cms: [--]
audience: [development, sysadmin]
product: [newrelic]
integration: [--]
tags: [logs, measure, newrelic]
showtoc: true
permalink: docs/guides/new-relic/synthetics
---

## Overview
New Relic provides an availability monitoring service within their Synthetics tool suite which can be enabled by [contacting support](/guides/support/contact-support/). Each Pantheon site includes a limit of **10,000 non-ping synthetic checks per month** as part of its New Relic integration. Ping monitors are unlimited and do not count toward this limit. All other monitor types – Simple Browser, Scripted Browser, and Scripted API – do count and must be managed carefully.

<Alert title="Note" type="info">

Exceeding this limit can cause Pantheon to reduce the frequency or number of locations your Synthetics checks run from in order to keep your monitoring operational.

</Alert>

There is also a site performance impact to consider: every synthetic check sends a real, uncached HTTP request to your site. Unlike traffic from actual visitors, synthetic checks bypass Pantheon's page cache, which means each check consumes real PHP workers, database connections, and server CPU. At high check frequencies or with many monitors running simultaneously, this can compete with your real visitors for server resources – the opposite of what monitoring is meant to achieve.

This guide walks through how to audit your existing monitors, choose the right monitor type for each use case, and set up a sustainable monitoring configuration that stays within your limit.

## Understand the Limit Math

Your monthly check count is determined by a simple formula:

```
Monthly checks = (60 ÷ frequency in minutes) × 24 hours × 30 days × number of locations
```
The table below shows how quickly checks accumulate:

| Frequency    | Locations | Monthly checks | % of 10,000 limit |
| ------------ | --------- | -------------- | ----------------- |
| Every 1 min  | 5         | 216,000        | 2,160%            |
| Every 1 min  | 1         | 43,200         | 432%              |
| Every 5 min  | 3         | 25,920         | 259%              |
| Every 5 min  | 1         | 8,640          | 86%               |
| Every 15 min | 2         | 5,760          | 58%               |
| Every 15 min | 1         | 2,880          | 29%               |

A single non-ping monitor at 1-minute frequency from 5 locations consumes more than 21x the monthly limit on its own. **Always calculate your projected monthly check volume before creating a new monitor**.

## Choose the Right Monitor Type
### Ping monitors (do not count toward limit)
Ping monitors send an HTTP request to a URL and verify that it returns a successful response. They also support **string verification** – confirming that a specific piece of text appears in the response body. Ping monitors do not execute JavaScript.

Ping monitors are the right choice for the vast majority of uptime monitoring use cases. Use a ping monitor when you want to:

* Confirm a URL is up and returning a 200 OK
* Verify that a redirect is working correctly (HTTP → HTTPS, www → non-www, old URL → new URL)
* Check that a specific word, phrase, or element appears in a server-rendered page
* Confirm that a simple API endpoint returns a healthy response (GET requests with no authentication)
* Verify that a third-party dependency (CDN probe URL, payment gateway health endpoint) is reachable

**Note for Drupal and WordPress sites:** Both platforms render most page content server-side, meaning text content, page titles, and meta tags are present in the raw HTML response. A ping monitor with string verification is sufficient for content checks on standard Drupal and WordPress sites. Content rendered by JavaScript after page load — common in headless or decoupled setups — cannot be verified with a ping monitor.

### Non-ping monitors (count toward the 10,000/month limit)

| Type             | What it does                                               | When to use it                                           |
| ---------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| Simple Browser   | Loads the full page in a real browser, executes JavaScript | When JS-rendered content must be verified                | 
| Scripted Browser | Multi-step browser interaction via script                  | Login flows, checkout flows, multi-step form submissions | 
| Scripted API     | Chained HTTP requests with assertions                      | Complex API testing, authenticated endpoint flows        | 

Before creating a non-ping monitor, ask: **could a ping monitor cover this use case?** If yes, use a ping monitor. Reserve non-ping monitors for cases that genuinely require JavaScript execution, multi-step interaction, or authenticated flows.

For more on monitor types, see [New Relic's Synthetic Monitoring documentation](https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/using-monitors/intro-synthetic-monitoring/).

## Use Browser Monitoring for Core Web Vitals
If you are using Simple Browser monitors to track frontend performance metrics – page load time, Largest Contentful Paint (LCP), Interaction to Next Paint (INP), or Cumulative Layout Shift (CLS) – you may not need them. New Relic's browser monitoring agent already captures all of these metrics automatically from real visitor sessions, at no cost to your synthetic check limit.

This data is available under **Browser → [your entity name] → Web Vitals** in your New Relic account. You can set up alert conditions directly on these metrics – for example, alerting when LCP exceeds 2.5 seconds – using the **Add recommended conditions** button on the browser monitoring Summary page.

Real user monitoring (RUM) data is also more representative than synthetic checks for performance purposes: it reflects actual devices, browsers, and network conditions from your real visitors, rather than a controlled test environment.

**When to keep a synthetic monitor for performance checks:**
* The page has little or no real traffic, so RUM data is too sparse to be useful
* You need to catch a performance regression immediately after a deploy, before real users encounter it
* Your site uses a headless or decoupled frontend where the full page render depends on JavaScript execution

## Optimize Your Existing Monitors
Review your monitors regularly. Navigate to your site's New Relic account via the Pantheon Dashboard, then go to **Synthetic Monitoring**.

### Step 1: Remove failed monitors
Filter your monitor list by status and look for monitors in a persistent error or failed state. A monitor that has been failing for more than a few days is not providing useful signal — it is consuming limit without delivering value.

For each persistently failed monitor:
1. Check when it last had a successful run
1. Confirm whether the monitored URL or flow still exists
1. Delete the monitor if the URL is gone, the environment has been removed, or the monitor is no longer relevant
1. Fix or replace the monitor if the URL is valid but the monitor configuration is broken

Causes of abandoned failed monitors may include:
* Multidev environments that were deleted after a feature branch was merged, leaving monitors pointing at a URL that no longer exists
* Scripted Browser monitors that break when a theme update or content change alters the page structure the script depends on
* String-verification monitors that fail after a URL change, permalink restructure, or path alias update in Drupal or WordPress

### Step 2: Convert eligible monitors to ping monitors
For each remaining non-ping monitor, evaluate whether a ping monitor could cover the same use case. If the monitor is doing any of the following, replace it with a ping monitor:
* Checking that a URL returns 200 OK
* Following a redirect
* Verifying that static or server-rendered text appears on a page
* Confirming a simple API endpoint is healthy

To replace a monitor: create a new ping monitor for the same URL, configure string verification if needed, confirm it is running successfully, then delete the original non-ping monitor.

### Step 3: Replace performance monitors with RUM alerts
For each Simple Browser monitor that exists primarily to track page load time or Core Web Vitals on a page with real production traffic, follow these steps:

1. Go to **Browser → [your entity name] → Web Vitals** and confirm the relevant data is being captured from real users
1. Set up alert conditions on the Web Vitals metrics using **Add recommended conditions**
1. Disable or delete the synthetic browser monitor

### Step 4: Reduce frequency and location count

For each non-ping monitor that genuinely requires a non-ping type, review the frequency and location settings.

**Recommended frequency guidelines:**
| Environment / Use case                                         | Recommended frequency                                      |
| -------------------------------------------------------------- | ---------------------------------------------------------- |
| Production — mission-critical user journey (checkout, login)   | 5–10 min                                                   |
| Production — standard uptime check                             | 15–30 min                                                  |
| Production — informational or marketing pages                  | 30–60 min                                                  |
| Staging — pre-launch validation                                | 15 min, with a plan to disable after launch                |
| Non-production (Dev, Test, Multidev)                           | Disable                                                    |

**Location guidelines:** Start with one location. Add a second only if geographic redundancy is a genuine requirement for your site's audience. 

### Step 5: Remove non-production monitors
Dev, Test, and Multidev environments are not customer-facing. Monitoring them at high frequency provides no meaningful signal about your visitors' experience. Check for monitors pointing at non-production URLs and either reduce them to 60-minute intervals or remove them entirely.

Search your monitor list for URLs or monitor names containing `dev`, `test`, `stage`, `staging`, or any Multidev branch name. For each one found, confirm whether the environment is still active and whether the monitoring serves a current need.

## Before Creating a New Monitor
Answer the following questions before adding any new non-ping synthetic monitor.

1. **Do I actually need a non-ping monitor?** If the goal is basic uptime checking or server-rendered content verification, use a ping monitor instead. Only use a non-ping monitor if the use case requires JavaScript execution, multi-step interaction, or authentication.

1. **What is my projected monthly check count?** Calculate it before setting frequency: `(60 ÷ frequency in minutes) × 24 × 30 × number of locations`. Confirm that adding this monitor keeps your total below 10,000 per month when combined with your existing monitors.

1. **How many locations do I need?** Start with one. Add a second only if geographic redundancy is a genuine requirement for your site's audience.

1. **Is there an existing monitor I could modify instead?** Check your monitor list before creating a new one. If a similar monitor already exists, update it rather than adding a parallel monitor.

1. **Who owns this monitor and when will it be reviewed?** Name the monitor to include the environment, purpose, and creation date — for example, `prod-checkout-flow-2026-04`. Plan to review all monitors quarterly and remove any that are no longer needed.

## Quick Reference

### Monitor type selection guide
| What you want to check                                         | Recommended type                                      |
| -------------------------------------------------------------- | ----------------------------------------------------- |
| Is the site up?                                                | Ping                                                  |
| Does a redirect work correctly?                                | Ping                                                  |
| Does specific text appear on a server-rendered page?           | Ping with string verification                         |
| Does specific text appear on a JS-rendered page?               | Simple Browser                                        |
| Is a simple API endpoint returning a healthy response?         | Ping with string verification                         |
| Does login work end-to-end?                                    | Scripted Browser                                      |
| Does checkout work end-to-end?                                 | Scripted Browser                                      |
| Does a complex authenticated API flow work?                    | Scripted API                                          |
| Is `/wp-admin` or `/user/login` accessible?                    | Do not monitor — remove this monitor                  |

### Monthly checks by frequency (single monitor, single location)
| Frequency      | Monthly checks |
| ---------------| ---------------|
| Every 1 min    | 43,200         |
| Every 5 min    | 8,640          |
| Every 10 min   | 4,320          |
| Every 15 min   | 2,880          |
| Every 30 min   | 1,440          |
| Every 60 min   | 720            |
