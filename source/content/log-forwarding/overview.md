---
title: Log Forwarding
contenttype: [doc]
innav: [true]
integration: [--]
reviewed: "2025-12-10"
permalink: docs/log-forwarding
---
<Partial file="log-forwarding-beta.md" />

## Introduction 
Pantheon's Log Forwarding feature allows Enterprise customers to stream operational logs from their Pantheon sites directly into a centralized analysis tool like Splunk (Cloud or Enterprise). This provides a critical, unified data stream for security, performance, and operational intelligence.

This feature is currently in **Beta**. Configuration must be completed by the Pantheon team.

## Prerequisites
* A Pantheon Elite or Enterprise plan.
* An active Sumo Logic or Splunk account.
* The ability to configure a **Hosted Collector** and an **HTTP Source** within **Sumo Logic** or an **HTTP Event Collector (HEC)** in **Splunk** to securely receive the logs

## Log Streams Forwarded
Pantheon forwards the following five binding-level log streams:
Log Stream
Description
Use Case

|Log Stream |Description |Use Case |
|-----------|------------|---------|
|`nginx-access`|HTTP access requests to your site.|Traffic analysis and performance monitoring.|
|`nginx-error`|Nginx web server errors.|Server-level error monitoring.|
|`php-error`|General PHP runtime errors.|Application debugging and error tracking.|
|`php-fpm-error`|PHP-FPM worker errors.|Service health and worker pool monitoring.|
|`php-slow`|Logs for PHP requests exceeding the slow execution threshold.|Identifying performance bottlenecks.|
