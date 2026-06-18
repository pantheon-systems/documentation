---
title: New Relic Performance Monitoring on Pantheon
subtitle: Activate New Relic
description: Learn how to enable and use New Relic Performance Monitoring metrics and reports for your Drupal or WordPress site on Pantheon.
contenttype: [guide]
innav: [false]
categories: [track]
cms: [--]
audience: [development, sysadmin]
product: [newrelic]
integration: [--]
tags: [logs, measure, newrelic]
contributors: [whitneymeredith, jspellman814]
showtoc: true
permalink: docs/guides/new-relic/activate-new-relic
---

This section provides steps on how to activate and configure your New Relic&reg; account.

## Activate New Relic&reg; Performance Monitoring

New Relic&reg; is automatically enabled for all application containers added to the site, including Multidev environments. You can activate New Relic&reg; in the Site Dashboard if you or a team member previously disabled it.

<Partial file="new-relic-enabling.md" />


## Configure New Relic&reg; Performance Monitoring Access

1. Go to the <Icon icon="eye" /> **New Relic** tab on your Site Dashboard, and click **Go to New Relic**.

  ![Screenshot showing the newly activated New Relic.](../../../images/integrations/newrelic/new-relic-activated.png)

1. Select your site from the center column, or access it via **APM & services** in the menu on the far left.

  ![Screenshot showing the New Relic landing page.](../../../images/integrations/newrelic/new-relic-get-started.png)

1. Click your site name to access the data for your site.

  ![SCreenshot of the New Relic APM data for a Pantheon site.](../../../images/integrations/newrelic/new-relic-summary.png)



### Who is the New Relic&reg; account associated with?

- If the site owner is a **user**, the site owner's name and email address are used to create the New Relic&reg; account.

- If the site owner is an **organization**, the name and email address of the organization's Pantheon user who activates New Relic&reg; is used to create the New Relic&reg; account.

In both cases, there is not a one-to-one mapping between Pantheon users and New Relic&reg; users. Every Pantheon user who selects **Go to New Relic** from the Pantheon dashboard is logged in as the same New Relic&reg; user.

## Open New Relic&reg; Performance Monitoring

Moving forward, to open New Relic&reg; Performance Monitoring:

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) of the site you suspect is having problems with MySQL query performance.

2. Select the environment: Dev, Test, or Live.

3. Click the **New Relic** tab, and then select **Go to New Relic**.

## More Resources

- [New Relic&reg; Ping Monitors](/guides/pagerduty/monitor/)

- [New Relic&reg; Labelling with Quicksilver](/guides/new-relic/new-relic-quicksilver)

- [New Relic&reg; FAQ](/guides/new-relic/new-relic-faq)
