---
title: Frontend Performance 
subtitle: Choosing Performance Metrics
description: Overview of how and what to measure when optimizing your site for performance.
anchorid: metrics
layout: guide
categories: [performance]
tags: [measure, traffic]
type: guide
permalink: docs/guides/frontend-performance/metrics/
editpath: frontend-performance/02-metrics.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

There are many different ways to measure page speed and performance. This guide will help you tune your site for the metrics in Google's [Core Web Vitals](https://web.dev/vitals/#core-web-vitals), which focus on three aspects of the user experience—loading, interactivity, and visual stability. 

These metrics include:

## Loading Performance

**LCP (Largest Contentful Paint)** measures loading performance. Ideally, LCP should occur no more than 2.5 seconds after the page starts loading.

The amount of time it takes for a site to respond, **Time To First Byte** (TTFB), along with the time it takes a page to render meaningful content above the fold, **Time To First Paint** (TTFP), are both factors for Google's page rankings. All other qualifiers being equal, search rankings can drop by 5 or 10 if TTFB goes up a few hundred milliseconds.

## Interactivity Delay
**FID (First Input Delay)** measures how long it takes before interaction with the page is possible. A FID of less than 100 milliseconds provides optimal user experience.

## Visual Stability
**CLS (Cumulative Layout Shift)** measures visual stability, and helps quantify how often users experience unexpected layout shifts. Pages should maintain a CLS of less than 0.1. 

To tune your site for these metrics, focus on these key areas:

- Reduce Server Response Time
- Compress Images
- Deliver Efficient CSS and JavaScript
- Avoid Redirects
