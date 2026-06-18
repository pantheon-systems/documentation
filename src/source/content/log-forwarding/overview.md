---
title: Log Forwarding
contenttype: [doc]
innav: [true]
integration: [--]
reviewed: "2025-12-10"
permalink: docs/log-forwarding
---

<Partial file="log-forwarding-beta.md" />

Pantheon's Log Forwarding feature enables streaming operational logs from Pantheon sites directly into a centralized analysis tool (e.g., Splunk). This provides a critical, unified data stream for security, performance, and operational intelligence.

## Access & availability

This feature is available to **Private Beta** participants at no additional cost. [Submit this form](https://docs.google.com/forms/d/e/1FAIpQLSd13CB3CNNYAsVQA2y519tQ1bpeBnE5x6XHyuvn7KfW2hTvbQ/viewform) to request an invite to participate.

### Compatability
We currently support forwarding logs to the following providers:
* [Sumo Logic](/log-forwarding/sumo-logic)
* [Splunk](/log-forwarding/splunk)

If you rely on a provider other than Sumo Logic or Splunk, we want to hear from you! Please reach out to your Customer Success Manager (CSM) or [our support team](#support) to voice your requirements.

### Benefits
Integrating your Pantheon logs with your existing analysis tools allows your team to achieve a variety of critical goals:
* **Health Checks & Performance Monitoring:** Proactively monitor application health, detect performance bottlenecks, and optimize resource usage.
* **Debugging & Root Cause Analysis**: Accelerate the diagnosis and resolution of issues by correlating logs with other system data.
* **Security & Compliance:** Perform security auditing, intrusion detection, and meet regulatory archiving requirements with a centralized view of all log activity.

## Log Streams Forwarded
Pantheon forwards the following five binding-level log streams:

|Log Stream |Description |Use Case |
|-----------|------------|---------|
|`nginx-access`|HTTP access requests to your site.|Traffic analysis and performance monitoring.|
|`nginx-error`|Nginx web server errors.|Server-level error monitoring.|
|`php-error`|General PHP runtime errors.|Application debugging and error tracking.|
|`php-fpm-error`|PHP-FPM worker errors.|Service health and worker pool monitoring.|
|`php-slow`|Logs for PHP requests exceeding the slow execution threshold.|Identifying performance bottlenecks.|

## Support
Once Beta access has been granted, users will recieve a welcome email and be invited to a dedicated slack channel where you can provide feedback, ask questions and discuss usage with the Pantheon product and engineering team. 

To request an invite, [submit this form](https://docs.google.com/forms/d/e/1FAIpQLSd13CB3CNNYAsVQA2y519tQ1bpeBnE5x6XHyuvn7KfW2hTvbQ/viewform).

