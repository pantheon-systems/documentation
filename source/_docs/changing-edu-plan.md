---
title: Managing site plan changes and chargeback for EDU+ sites
description: Learn how to manage site plan changes and chargebacks for EDU+ sites
categories: [managing]
tags: [platform, organizations]
keywords: pantheon, pantheon for agencies, org, organization, edu, edu+
---
Pantheon for EDU+ allows Organization Administrators to manage who can change service level [plans(https://pantheon.io/pricing) for site's within their organization. When a site is not associated with an organization, you can add a credit card to change the site's plan, but when a site is associated with an organization, billing is managed through a contract with Panteon, and only Organization Administrators can change a site's plan. 

Organization Administrators can specify in the Organization's Settings a **Take Live/Payment Instructions URL** and a **Service Level Change Instructions URL** that will be shown to non-org administrators in the site's **Settings** area. 
These settings allow a payment flow so your EDU can collect information needed to take the site live, manage accounting, and chargebacks to the appropriate department or unit within your EDU.

The URL will include information that you can use to auto-populate a form you control. For example,
```
https://www.awesome.edu/technology/web/payment-form?site_name=my-site&id=6b23f58b-132b-4547-93bd-71bb34fc0b1d&service_level=free&owner=Jane%Smith&email=jane%40awesome.edu 
```
will allow you to collect the Site Name, Site UUID, Site Owner, and Site Owner Email Address. You may also want to collect an Accounting Number, Desired Plan, Technical Contact Name & Email Address, Domain Names, Desired Go Live Date, and additional comments. 




## Change the Service Level (Org Admin)

1. From your Site Dashboard, select **Settings**.
2. Select the new plan from the drop-down menu, and click **Update Plan**.
![EDU+ Service Level Selection](/docs/assets/images/edu-site-selector.png)
3. Enter the text in the confirmation field to continue.

## Change the Service Level (Team Member)
1. From your Site Dashboard, select **Settings**.
2. Your organization has specific instructions you'll need to follow. Click **Read Instructions** to continue.  
![Service Level Instructions](/docs/assets/images/edu-read-instructions.png)
