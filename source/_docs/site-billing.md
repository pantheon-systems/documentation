---
title: Billing in the Site Dashboard
description: Add a new credit card, remove the current card or transfer billing to a new site owner within the Billing tab of the Settings tool in the Site Dashboard.
tags: [billing]
categories: []
---
## Access Site Billing
1. Go to the Site Dashboard and select **<span class="glyphicons glyphicons-cogwheel"></span> Settings**.
2. Click the **Billing** tab.

### Roles & Permissions
The permission to transfer ownership or update payment method is granted only to the role of **Site Owner**. You can see who is assigned the role of Site Owner by clicking **<span class="glyphicons glyphicons-group"></span> Team** in the Site Dashboard. Other roles do not have access to billing as described on this page.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">If you need to assume site and billing ownership, the current Site Owner must transfer it to you directly, as described [below](#transfer-ownership-and-billing-for-this-site).</p></div>

## Transfer Ownership and Billing for This Site
{% include("content/transfer-owernship-billing.html")%}

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
If you've [downgraded to a free plan from a paid plan](/docs/select-plan/#upgrade-or-downgrade-plan), remove the card as a payment method for the site:

1. Go to the Site Dashboard and select **<span class="glyphicons glyphicons-cogwheel"></span> Settings**, then click **Billing**.
2. Select **Do not bill this site to a card** from the drop down menu within **Your Credit Cards** section.
3. Click **Update Payment Method**.

 ![There is no longer a credit card associated with this site](/source/docs/assets/images/dashboard/site-billing-cc-removed.png)

 You should get a message saying "There is no longer a credit card associated with this site."
## See Also
- [Account Billing in the User Dashboard](/docs/account-billing/)
- [New Site Owner FAQs](/docs/site-owner-faq/)
- [Launch Essentials Guide](/docs/guides/launch/)
- [Select a Plan](/docs/select-plan/)
