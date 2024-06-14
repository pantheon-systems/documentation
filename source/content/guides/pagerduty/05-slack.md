---
title: Incident Management
subtitle: Slack Integrations (optional)
description: Page five of our guide on Pagerduty integration with New Relic for incident management.
contenttype: [guide]
innav: [false]
categories: [track]
cms: [--]
audience: [development]
product: [newrelic]
integration: [--]
tags: [logs, measure, newrelic, teams, webops]
type: guide
permalink: docs/guides/pagerduty/slack/
editpath: pagerduty/05-slack.md
---
In this lesson, we'll add the Slack extension to PagerDuty so your team can acknowledge and resolve incidents within a channel.

1. Login to your PagerDuty account and go to **Configuration** > **Extensions**, then click **+ New Extension**.
2. For the new service, use the following configuration:

 - Select **Slack** as extension type
 - Enter "example.com" as the name of the extension
 - Select **example.com** as the service
 - Select Actions available to **any Slack user**
 - Check all 3 options: Resolves, Acknowledgements, Assignment Changes

3. Click Authorize:

  ![Add slack extension](../../../images/pagerduty/pg-extensions.png)

4. Select the channel to which you’d like PagerDuty to send messages and then Authorize the integration. We recommend using project specific channels:

    ![CSlack authorization](../../../images/pagerduty/pg-authorize-slack.png)

5. Go to **Configuration** > **Services**, and click the **<Icon icon="gear" />** icon next to your existing service then click **+ New Incident**:

  ![Configure existing service](../../../images/pagerduty/pg-configure-service.png)

6. Create a new incident:

  ![Create pagerduty incident](../../../images/pagerduty/pg-new-incident.png)

This will automatically send notifications to whoever is on-call via SMS and email immediately, in addition to showing up in Slack. The person on-call can acknowledge and resolve the incident through email, SMS, Slack, or from within PagerDuty.

![SMS interactions](../../../images/pagerduty/pg-sms-notification.png)

![CSlack authorization](../../../images/pagerduty/pg-slack-notification.png)


## More Resources

- [Monitor and Improve Site Performance with New Relic&reg;](/guides/new-relic/monitor-new-relic)

- [Integrate Your Fastly Account with New Relic&reg;](/guides/fastly-pantheon/fastly-new-relic)
