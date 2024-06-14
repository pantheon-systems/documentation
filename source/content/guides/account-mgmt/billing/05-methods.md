---
title: "Billing for Self-Serve Accounts"
subtitle: Payment Methods
description: Learn how to manage the credit cards used to pay for your account.
contenttype: [guide]
innav: [false]
categories: [billing]
cms: [--]
audience: [business]
product: [--]
integration: [--]
tags: [billing]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/account-mgmt/billing/methods
editpath: docs/guides/account-mgmt/billing/05-methods.md
reviewed: "2022-09-19"
---

Self-serve accounts accept credit card payments only. Pantheon does not currently accept alternative methods of payment for online site purchases (e.g., checks, PayPal, etc.).

<Alert title="Note" type="info" >

Payment for a site can't be split among payment methods. This means that your payment can only come from one card at a time.

</Alert>

## Add Payment Method

Payment methods can be added in either your Personal Settings, or in a Site Dashboard.

To add a payment method via Personal Settings:

1. [Go to your Personal Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), click **Settings**, then select **Payment Methods**.

1. Click **+ Add Payment Method**.

1. Enter the card information, then click **Add New Card**.  The card will appear in the list, and will be available as a selection for any site you own.

<Alert title="Note" type="info" >

The email address you enter here is the address invoices will be sent to.

</Alert>

## Update Payment Method

1. [Go to your Personal Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), click **Settings**, then select **Payment Methods**.

1. Click **View Details** for the payment method you want to edit.

1. Click **Actions**, then click **Edit**.

1. Update the card information, then click **Save New Changes**.

<Alert title="Note" type="info" >

The email address you enter here is the address invoices will be sent to.

</Alert>

## Delete Payment Method

All sites must be disassociated from the card before it can be deleted.

<Alert title="Warning" type="danger">

Deleting a card profile from your account will also delete its associated billing history (invoices and transactions). Go to **View Invoices** to download past invoices before deleting your credit card profile.

</Alert>

1. [Go to your Personal Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), click **Settings**, then select **Payment Methods**.

1. Click **View Details** for the payment method you want to edit.

1. Click **Actions**, then click **Delete**.

1. Select **Yes, I want to delete it**, then click **Delete**.


## View History

1. [Go to your Personal Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), click **Settings**, then select **Payment Methods**.

1. Click **View Details** for the payment method whose history you want to view.

   The history will show the last 100 transactions.


## Site-Specific Payment Methods

Site-specific payment methods can only be used on the site on which they are defined.

### Add a Site-Specific Payment Method

<Alert title="Note" type="info" >

If the site is currently in Sandbox mode (free), [upgrade the site plan](/guides/launch/plans/) to add and begin billing to a credit card.

</Alert>

To add a payment method to a site:

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) for the site.

1. Go to the **Billing** tab and click **Add Card**.

   - If you already have payment methods defined in your Personal Workspace, you will see them listed.  To use a listed payment method, select it and click **Update Credit Card**.

   - If you don’t want to use a listed card, click **Add New Card**, add the information, click **Add Card**, and then click **Update Credit Card**.

### Change the Card Used to Bill This Site

To change the card used to bill a site:

1. [Go to your Personal Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), click **Settings**, then select **Subscriptions**.

1. Click the **Actions** dropdown next to the site you’d like to update.

1. Click **Change Payment Method**

1. Here you can change the payment method for that site to another card you have on file or add a new card.

Alternatively, you can:

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) for the site.

1. Go to the **Billing** tab and click **Change Card**.

1. Here you can change the payment method for that site to another card you have on file or add a new card.

### Change the Card Used to Bill Multiple Sites

1. [Go to your Personal Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), click **Settings**, then select **Payment Methods**. Here you can see all cards you have on file and a count of how many sites are billed to each card

1. Click the **View Details** on the card you wish to move multiple sites away from.

1. Click the **Actions** dropdown, click Move Subscriptions.

1. Click **Change Payment Method**

1. Here you can change the payment method to another card you have on file or add a new card.


### Delete a Site-Specific Payment Method

<Alert title="Note" type="info" >

In order to delete a payment method, any associated site(s) must first either be downgraded to Sandbox or moved to a different payment method.
Refer to [upgrade the site plan](/guides/account-mgmt/plans/07-site-plans.md) for more information.

</Alert>

To delete a payment method:

1. [Go to your Personal Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), click **Settings**, then select **Payment Methods**. Here you can see all cards you have on file and a count of how many sites are billed to each card

1. Click the **View Details** on the card you wish to move multiple sites away from.

1. Click the **Actions** dropdown, click Move Subscriptions.

1. Here you can change the payment method to another card you have on file or add a new card.

Alternatively, you can

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) for a Sandboxed site.

1. Go to the **Billing** tab and click **Remove Card**.
