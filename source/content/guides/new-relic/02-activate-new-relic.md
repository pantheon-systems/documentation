---
title: New Relic Performance Monitoring
subtitle: Activate New Relic
description: Learn how to enable and use New Relic Performance Monitoring metrics and reports for your Drupal or WordPress site on Pantheon.
categories: [performance]
tags: [logs, measure, newrelic]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/new-relic/activate-new-relic
anchorid: activate-new-relic
---

This sections shows you how to activate and configure your New Relic account.

## Activate New Relic&reg;

1. Select the <i className="fa fa-eye"></i> **New Relic** tab on your Site Dashboard > Click **Activate New Relic Pro**:

  ![Screenshot of the Activate New Relic Pro button in the Site Dashboard, under the New Relic tab.](../../../images/integrations/newrelic/activate-new-relic.png)

1. Visit your site in the browser a couple of times to generate data in New Relic. 

1. Allow a few minutes to pass and then navigate to the **New Relic** tab on your Dashboard and click **Go to New Relic**.

New Relic is automatically enabled for all application containers added to the site, including Multidev environments.

## Configure New Relic&reg; Performance Monitoring Access

1. Go to the <i className="fa fa-eye"></i> **New Relic** tab on your Site Dashboard, and click **Go to New Relic**:

  ![Screenshot showing the newly activated New Relic.](../../../images/integrations/newrelic/new-relic-activated.png)

1. Ignore the **Get started** button, and select **APM** from the menu at the top:

  ![Screenshot showing the New Relic landing page.](../../../images/integrations/newrelic/new-relic-get-started.png)

1. Agree to the New Relic terms of service to access the data for your site:

  ![Screenshot of the New Relic APM dashboard.](../../../images/integrations/newrelic/new-relic-apm-dash.png)

  ![SCreenshot of the New Relic APM data for a Pantheon site.](../../../images/integrations/newrelic/new-relic-summary.png)

### Who is the New Relic account associated with?

- If the site owner is a **user**, the site owner's name and email address is used to create the New Relic account.

- If the site owner is an **organization**, the name and email address of the organization's Pantheon user who activates New Relic is used to create the New Relic account.

In both cases, there is not a one-to-one mapping between Pantheon users and New Relic users. Every Pantheon user selecting **Go to New Relic** from the Pantheon dashboard is logged in as the same New Relic user.

## Configure Ping Monitors for Availability

New Relic provides a free availability monitoring service within their Synthetics tool suite at the Lite service level. This basic monitoring check sends a request to designated URLs from configured locations at given intervals and alerts you via email when a response fails. To configure this service:

1. Click **New Relic** and then click **Go to New Relic** from the target environment within the Site Dashboard on Pantheon.

1. Select **Synthetics** from the menu bar at the top of the page.

1. Click **Add new** on the **Monitors** tab (default) and enter the details for the URL you want to monitor.

1. Select the locations you wish to check the site from. We recommend picking locations that correspond to your site's visitors to reduce the risk of false-positives due to long-distance networking issues.

1. Set the frequency for checks. We suggest 5 minutes.

1. Provide an email address for notifications.

1. Click **Create my monitor**.

Pantheon can provide New Relic ping monitoring for free as part of the service. However, more advanced monitoring — full browser testing, or scripted interactions — are only available to customers on an annual contract and requires an additional cost. Contact our sales team or your dedicated account manager for details.

## More Resources

- [New Relic Labelling with Quicksilver](/guides/new-relic/new-relic-quicksilver)

- [New Relic FAQ](/guides/new-relic/new-relic-faq)



