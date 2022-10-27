---
title: "Billing"
subtitle: Payment Methods
description: Learn how to manage the credit cards used to pay for your account.
categories: [account-mgmt]
tags: [billing]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/billing/methods
anchorid: methods
editpath: docs/guides/account-mgmt/billing/05-methods.md
reviewed: "2022-09-19"
---

You can set up payment methods that you use for all sites you own, or site-specific payment methods.

## Accepted Payment Methods

Sites purchased online through the Pantheon Site Dashboard accept credit card payments only. Pantheon does not currently accept alternative methods of payment for online site purchases (e.g., checks, PayPal, etc.).

<Alert title="Note" type="info" >

Payment for a site can't be split among payment methods. This means that your payment can only come from one card at a time.

</Alert>

## Personal Payment Methods

Personal payment methods can be used on all sites you own. Personal payment methods are managed via your [Personal Workspace](/guides/account-mgmt/account/workspace).

### Add Personal Payment Method

To add a payment method:

1. Go to your personal workspace.

1. Select **Settings**, then select **Payment Methods**.

1. Click **+ Add Payment Method**. 

1. Enter the card information, then click **Add New Card**.


### Update Personal Payment Method

1. Go to your personal workspace.

1. Select **Settings**, then select **Payment Methods**.

1. Click **View Details** for the payment method you want to edit.

1. Click **Actions**, then click **Edit**.

1. Update the card information, then click **Save New Changes**.

### Delete Personal Payment Method

All sites must be disassociated from the card before it can be deleted.

<Alert title="Warning" type="danger">

Deleting a card profile from your account will also delete its associated billing history (invoices and transactions). Go to **View Invoices** to download past invoices before deleting your credit card profile.

</Alert>

1. Go to your personal workspace.

1. Select **Settings**, then select **Payment Methods**.

1. Click **View Details** for the payment method you want to edit.

1. Click **Actions**, then click **Delete**.

1. Select **Yes, I want to delete it**, then click **Delete**.


### View History

1. Go to your personal workspace.

1. Select **Settings**, then select **Payment Methods**.

1. Click **View Details** for the payment method whose history you want to view.

   The history will show the last 100 transactions.


## Site-Specific Payment Methods

Site-specific payment methods can only be used on the site on which they are defined.

### Add a Site-Specific Payment Method

<Alert title="Note" type="info" >

If the site is currently in Sandbox mode (free), [upgrade the site plan](/guides/launch/plans/) to add and begin billing to a credit card. 

</Alert>

To add a payment method to a site:

1. Open the Site Dashboard for the site.

1. Go to the **Billing** tab and click **Add Card**.

   - If you already have payment methods defined in your Personal Workspace, you will see them listed.  To use a listed payment method, select it and click **Update Credit Card**.

   - If you don’t want to use a listed card, click **Add New Card**, add the information, click **Add Card**, and then click **Update Credit Card**.

### Change the Card Used to Bill This Site

To change the card used to bill a site:

1. Open the Site Dashboard for the site.

1. Go to the **Billing** tab and click **Remove Card**.

1. Click **Add Card**, and follow the steps in the [previous section](#add-a-site-specific-payment-method) to bill this site to a different card.

### Delete a Site-Specific Payment Method

To delete a payment method:

1. Open the Site Dashboard for the site.

1. Go to the **Billing** tab and click **Remove Card**.