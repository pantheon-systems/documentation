---
title: Billing
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

Payment for a site can't be split among payment methods - payment can only come from one card at a time.


</Alert>

## Personal Payment Methods

### Add 


### Update

<Partial file="replace-credit-card.md" />

### Delete

All sites must be disassociated from the card before it can be deleted.

<Alert title="Warning" type="danger">

Deleting a card profile from your account will also delete its associated billing history (invoices and transactions). Go to **View Invoices** to download past invoices, prior to deleting your credit card profile.

</Alert>

1. For each site associated with the credit card, go to the Site Dashboard and click on the **Billing** tab, then update the payment method shown in [your credit cards](/guides/legacy-dashboard/site-billing#your-credit-cards). Each site on a paid plan must be associated with a card.
1. Go to the User Dashboard and select **<span class="glyphicons glyphicons-cogwheel"></span> Account**, then click **Billing**.
1. Once the card reports **This card is not paying for any sites.**, click **Delete Card**.
1. Check the box next to **Yes, delete my card.** and click **Delete Card**.

### View History

## Site Specific Payment Methods

### Add

If the site is currently in Sandbox mode (free), [upgrade the site plan](/guides/launch/plans/) to add and begin billing to a credit card. For all plans, use the steps in this section to add a new credit card profile in the **<span class="glyphicons glyphicons-cogwheel"></span> Account** > **Billing** section of your User Dashboard.

1. If the site:
    - Is currently in Sandbox mode:
        1. Click **Add Card**.
        1. Click **+ Add New Card**.
    - Already has a card associated with it:
        - Find the existing card under BILLING INFORMATION and click **Change** next to it, then click on **Add New Card**.

1. Go to the Site Dashboard and click the **Billing** tab.

1. Find the existing card under **Billing Information** and click **Change** next to it, then click **Add New Card**.

1. Enter your credit card information and click **Add Card**.

1. To add the card to the site, select the new card and click **Update Credit Card**.
    - Skip this step to store the card without adding it to the site.

Once you have added the card, set it as the new payment method for the site as described in the [next section](#bill-this-site-to-a-new-card).


### Associate Payment Method with Site

### Bill This Site to a New Card

Select the card you want the site to use as the new payment method _after_ it has been added as described in the [previous section](#add-new-credit-card).

1. Go to the Site Dashboard and click the **Billing** tab.

1. Find the existing card under BILLING INFORMATION and click **Change** next to it.

1. Select the new card and click **Update Credit Card**.

 You should get a message saying "Your billing information has been updated!"

<Partial file="replace-credit-card.md" />

To bill this site to a card:

A credit card can only be removed from a site when that site is set to [bill another card](#bill-this-site-to-a-new-card) or when the site is [downgraded to Sandbox](/guides/legacy-dashboard/site-plan/#cancel-current-plan).

After downgrading from a paid plan to Sandbox, remove the card as a payment method for the site:

1. Go to the Site Dashboard and click the **Billing** tab.
1. Find your card under BILLING INFORMATION and click **Remove Card**.

 You should get a message saying "**Your credit card is removed.** This site is no longer associated with the credit card."

To stop billing to this card:

A credit card can only be removed from a site when that site is set to [bill another card](#bill-this-site-to-a-new-card) or when the site is [downgraded to Sandbox](/guides/legacy-dashboard/site-plan/#cancel-current-plan).

After downgrading from a paid plan to Sandbox, remove the card as a payment method for the site:

1. Go to the Site Dashboard and click the **Billing** tab.
1. Find your card under BILLING INFORMATION and click **Remove Card**.

 You should get a message saying "**Your credit card is removed.** This site is no longer associated with the credit card."


### Update

### Delete

### View History

1. Go to the User Dashboard and select **<span class="glyphicons glyphicons-cogwheel"></span> Account**, then click **Billing**.
1. Click **View History** for the credit card profile in question.

The credit card history will show the last 100 transactions.
