---
title: "Log Forwarding (Beta): Stream Your Logs for Enhanced Observability"
published_date: "2025-12-10"
categories: [new-feature, general]
---
We're excited to announce the beta release of Log Forwarding, a new feature designed to give our customers deeper visibility and control over their application data.

## What is Log Forwarding?
Log Forwarding enables you to automatically stream your binding-level logs from the Pantheon platform directly to your preferred log analysis services. This is a crucial tool for observability, meeting compliance requirements, and performing advanced analytics on your application's behavior.

## Why is this important?
Integrating your Pantheon logs with your existing analysis tools allows your team to achieve a variety of critical goals:
* **Health Checks & Performance Monitoring:** Proactively monitor application health, detect performance bottlenecks, and optimize resource usage.
* **Debugging & Root Cause Analysis**: Accelerate the diagnosis and resolution of issues by correlating logs with other system data.
* **Security & Compliance:** Perform security auditing, intrusion detection, and meet regulatory archiving requirements with a centralized view of all log activity.

## What Logs Are We Sending?
In this beta, Log Forwarding will stream the following log types from your application to your service:
* `php-fpm-error`
* `php-slow`
* `php-error`
* `nginx-access`
* `nginx-error`
## Supported Log Destinations
You can currently forward your Pantheon logs to the following popular log management platforms:
* Sumo Logic
* Splunk

## How to Access the Beta
Please complete and submit the [beta interest form](https://docs.google.com/forms/d/e/1FAIpQLSd13CB3CNNYAsVQA2y519tQ1bpeBnE5x6XHyuvn7KfW2hTvbQ/viewform) or contact your dedicated Account Manager or Customer Success Manager to enable the Log Forwarding beta for your organization if you are already using Splunk or Sumo logic. 
