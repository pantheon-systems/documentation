---
title: Fastly on Pantheon
subtitle: Integrate Your Fastly on Pantheon Account with Splunk
description: Learn how to use Splunk with your Fastly account on Pantheon.
categories: [develop]
tags: [cms]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/fastly-pantheon/fastly-splunk
anchorid: fastly-splunk
---

This section provides steps on how to use [Splunk](https://www.splunk.com/) as a logging endpoint with your Pantheon account. You can do this either through a Fastly account connected to Pantheon or by manually uploading your Pantheon logs to Splunk.

## Log Streaming with Splunk and Fastly on Pantheon

### Before You Begin

Verify the following before you begin:

- You have already [connected your Fastly account to your Pantheon account](/guides/fastly-pantheon/connect-fastly)

- You have a [Splunk](https://www.splunk.com/) account

## Integrate Splunk with Your Fastly Account on Pantheon

Follow the steps below to use Splunk with your Fastly and Pantheon with AGCDN accounts.

1. Verify that you have the [prerequisites](https://docs.fastly.com/en/guides/log-streaming-splunk#prerequisites).

1. Complete the steps to [add Splunk as a logging endpoint](https://docs.fastly.com/en/guides/log-streaming-splunk#adding-splunk-as-a-logging-endpoint).

1. Review the [recommended log format](https://docs.fastly.com/en/guides/log-streaming-splunk#recommended-log-format).


## Manually Upload Your Pantheon Logs to Splunk

Note that this method does not require a Fastly account or use of Pantheon's AGCDN. You can automate the process of accessing and maintaining your logs by creating a script. Follow the steps below to access and upload your Pantheon logs to Splunk.

1. Complete the steps to [create a script](/logs#create-a-script).

1. Complete the steps to [collect your logs](/logs#collect-logs).

1. [Upload your logs to Splunk](https://docs.splunk.com/Documentation/Splunk/8.2.6/Data/Uploaddata) for processing.


## See Also

- [Pantheon Logs](/logs#available-logs)

- [New Relic](/new-relic)

- [Log Streaming with Splunk](https://docs.fastly.com/en/guides/log-streaming-splunk)

