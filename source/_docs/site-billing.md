---
title: Billing in the Site Dashboard
description: Add a new credit card, remove the current card or transfer billing to a new site owner within the Billing tab of the Settings tool in the Site Dashboard.
tags: [billing]
categories: []
---

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Did you know Pantheon offers savings for sites purchased with annual billing plans? See [Pantheon Annual Billing](/docs/annual-billing/) for more information.
</div>

## Access Site Billing
1. From the User Dashboard, click on the site you want to access billing for.
1. Go to the Site Dashboard and click **<span class="glyphicons glyphicons-cogwheel"></span> Settings**.
1. Click the **Billing** tab.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Changing your site billing is typically done at launch time. For a comprehensive step-by-step guide to going live, refer to [Launch Essentials](/docs/guides/launch/).
</div>

### Roles and Permissions
The permission to transfer ownership or update payment method is granted only to the role of **Site Owner**. You can see who is assigned the role of Site Owner by clicking **<span class="glyphicons glyphicons-group"></span> Team** in the Site Dashboard. Other roles do not have access to billing as described on this page.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
If you need to assume site and billing ownership, the current Site Owner must transfer it to you directly, as described [below](#transfer-ownership-and-billing-for-this-site).</div>

## Transfer Ownership and Billing for This Site
{% include("content/transfer-ownership-billing-intro.html")%}
{% include("content/transfer-ownership-billing-steps.html")%}

## Add New Credit Card
1. Go to the Site Dashboard and select **<span class="glyphicons glyphicons-cogwheel"></span> Settings**, then click **Billing**.
2. Enter your credit card information and click **Add Card**.

 ![Your credit card has been added to your account. Use the selector above to apply it to this Site](/source/docs/assets/images/dashboard/site-billing-cc-added.png)

 You should get a message saying "Your credit card has been added to your account. Use the selector above to apply it to this Site."

This process will add a new credit card profile in **<span class="glyphicons glyphicons-cogwheel"></span> Account** > **Billing** of your User Dashboard. Once you have added the card, set it as the new payment method for the site as described in the [next section](#bill-this-site-to-a-new-card).

## Your Credit Cards
### Bill This Site to a New Card
Select the card you want the site to use as the new payment method _after_ it has been added as described in the [previous section](#add-new-credit-card).

1. Go to the Site Dashboard and select **<span class="glyphicons glyphicons-cogwheel"></span> Settings**, then click **Billing**.
2. Select a new card from the drop down menu within **Your Credit Cards** section.
3. Click **Update Payment Method**.

 ![Card has been updated](/source/docs/assets/images/dashboard/site-billing-cc-updated.png)

 You should get a message saying "Card has been updated."
### Do Not Bill This Site to a Card
After [downgrading from a paid plan to Sandbox](/docs/site-plan/#cancel-current-plan), remove the card as a payment method for the site:

1. Go to the Site Dashboard and select **<span class="glyphicons glyphicons-cogwheel"></span> Settings**, then click **Billing**.
2. Select **Do not bill this site to a card** from the drop down menu within **Your Credit Cards** section.
3. Click **Update Payment Method**.

 ![There is no longer a credit card associated with this site](/source/docs/assets/images/dashboard/site-billing-cc-removed.png)

 You should get a message saying "There is no longer a credit card associated with this site."

## Frequently Asked Questions

### What forms of payment are accepted? 
Sites purchased online through the Pantheon Site Dashboard accept credit card payments only. Pantheon does not currently accept alternative methods of payment for online site purchases (e.g., checks, PayPal, etc.). 

### Does Pantheon accept PayPal?
Pantheon currently does not accept PayPal.

### Can there be more than one site owner?
A site can only have one site owner.

### Can the payment for a site be split between multiple cards.
No, payment for a site can only come from one card at a time.

### Why don't I get email notifications about upcoming billing?
Billing emails are only sent to the billing contact email, set by the [Site Owner](#roles-and-permissions) when they enter a credit card for payment:

![Billing Contact](/source/docs/assets/images/dashboard/billing-contact.png)

If you are the billing contact for an online site plan, check your spam folder, and try adding `cse-billing@pantheon.io` and `noreply@getpantheon.com` to your contacts. You can also reach out to your IT department to see if the emails are in quarantine.

## See Also
- [Account Billing in the User Dashboard](/docs/account-billing/)
- [Manage Plans in the Site Dashboard](/docs/site-plan/)
- [Traffic Limits and Overages](/docs/traffic-limits/)
- [New Site Plans FAQs](/docs/new-plans-faq/)
