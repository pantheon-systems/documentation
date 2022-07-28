---
title: New Relic Performance Monitoring
subtitle: Introduction
description: Learn how to enable and use New Relic Performance Monitoring metrics and reports for your Drupal or WordPress site on Pantheon.
categories: [performance]
tags: [logs, measure, newrelic]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/new-relic/activate-new-relic
anchorid: activate-new-relic
---


## Activate New Relic&reg; Performance Monitoring

1. Select the <i className="fa fa-eye"></i> **New Relic** tab on your Site Dashboard > Click **Activate New Relic Pro**:

  ![Screenshot of the Activate New Relic Pro button in the Site Dashboard, under the New Relic tab.](../../../images/integrations/newrelic/activate-new-relic.png)

1. Visit your site in the browser a couple of times to generate data in New Relic. 

1. Allow a few minutes to pass > Go to the **New Relic** tab on your Dashboard > Click **Go to New Relic**.

New Relic is automatically enabled for all application containers added to the site, including Multidev environments.

## New Relic&reg; Performance Monitoring Access

1. Go to the <i className="fa fa-eye"></i> **New Relic** tab on your Site Dashboard, and click **Go to New Relic**:

  ![Screenshot showing the newly activated New Relic.](../../../images/integrations/newrelic/new-relic-activated.png)

1. Ignore the **Get started**, button, and select **APM** from the menu at the top:

  ![Screenshot showing the New Relic landing page.](../../../images/integrations/newrelic/new-relic-get-started.png)

1. Agree to the New Relic terms of service to access the data for your site:

  ![Screenshot of the New Relic APM dashboard.](../../../images/integrations/newrelic/new-relic-apm-dash.png)

  ![SCreenshot of the New Relic APM data for a Pantheon site.](../../../images/integrations/newrelic/new-relic-summary.png)

### Who is the New Relic account associated with?

* If the site owner is a **user**, the site owner's name and email address is used to create the New Relic account.
* If the site owner is an **organization**, the name and email address of the organization's Pantheon user who activates New Relic is used to create the New Relic account.

In both cases, there is not a one-to-one mapping between Pantheon users and New Relic users. Every Pantheon user selecting **Go to New Relic** from the Pantheon dashboard is logged in as the same New Relic user.