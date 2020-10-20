---
title: New Site Owner FAQs
description: Learn about common billing and administrative tasks performed by a Pantheon Drupal or WordPress site owner.
categories: [manage]
tags: [teams, billing, agencies, users]
---
When you become a site owner, you receive administrator permissions to manage the billing information, team members, and site settings.

## Administrative Tasks


### How do I add and remove team members?

**Add a Team Member**

In the Team modal, enter the email address of the user, and click **Add Team Member**.

Once the user has been added to the project, they will receive a welcome email notifying them that they are now a member of the site's team. This will allow them to access the site's codebase, create backups, mark the site as private, clear your sites' caches, sync content, and perform updates.

**Remove a Team Member**

<Alert title="Note" type="info">

All users can be removed except the site owner.

See the [Remove a Site Owner](/access-management/#remove-a-site-owner) section of our Access Management doc for more information.

</Alert>

In the Team modal, click the X next to the user you want to delete.

When you delete a user from a site, they lose the ability to perform any operations on that site.

For more information on managing teams, see the [Team Management article](/team-management).


### How do I add a Supporting Agency?
One of the best things about Pantheon is the ability to collaborate with agencies and shops on web projects. If you have contracted with a Pantheon Partner Agency, you can add them to the site as a Supporting Organization, which will give their company access to help build, launch, or maintain your site:

<Partial file="add-supporting-org.md" />

### What add-ons are available for my site?

 - [Apache Solr](/solr) is a system for indexing and searching site content. Pantheon provides Apache Solr v3.6 as a service for most plans including the Sandbox site plan.
 - [Redis](/redis) is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.


Pantheon also offers [New Relic Pro](/new-relic) to our customers, built into the Site Dashboard. New Relic offers a wide array of metrics that provide a nearly real-time look into the performance of a web application.

### How do I enable add-ons?
From your Site Dashboard, click **Settings**, then click **Add Ons**. You will see all the available add-ons for your site.

You can access New Relic Pro directly from the Site Dashboard, by clicking on **<span class="glyphicons glyphicons-eye-open"></span> New Relic**.


### Can I downgrade my site to a Basic plan?
Yes. However, if you have Solr and/or Redis add ons enabled, they will break when you go down to Basic plan level. For more information, see [Manage Plans in the Site Dashboard](/site-plan/#basic-plan).

## How do I recover an account after a site owner leaves?
See the steps in our [Site Access](/site-access) doc for recovery instructions.

## Billing Tasks


### How do I change site service levels?
From the Site Dashboard, click the button that shows the current plan or **Upgrade** next to the site's name. Select a plan, and follow the prompts to pay or transfer site ownership to invite another user to pay.

For more information, see [Manage Plans in the Site Dashboard](/site-plan).

### Can I update or change the payment method?
You can update the payment method in the **Settings** page. For detailed instructions, see [Account Billing in the User Dashboard](/account-billing).

### Can I pay for my site on an annual or quarterly basis instead of monthly?
Self-serve sites are billable via recurring monthly or [annual](/annual-billing) billing. Sites that are owned by a Reseller, Edu+, or Enterprise organization are invoiced to the organization.

### Can I transfer ownership of a site to someone else?
<Partial file="transfer-ownership-billing-intro.md" />
<Partial file="transfer-ownership-billing-steps.md" />

## See Also

- [Billing in the Site Dashboard](/site-billing)
- [Account Billing in the User Dashboard](/account-billing)
- [Team Management](/team-management)
- [Add a Client Site to your Organization Dashboard](/add-client-site)
