---
title: New Site Owner FAQs
description: Learn about common billing and administrative tasks performed by a Pantheon Drupal or WordPress site owner.
tags: [manage, billing]
categories: []
---
When you become a site owner, you receive administrator permissions to manage the billing information, team members, and site settings.

## Administrative Tasks


### How do I add and remove team members?

**Add a Team Member**

In the Team modal, enter the email address of the user, and click **Add Team Member**.

Once the user has been added to the project, they will receive a welcome email notifying them that they are now a member of the site's team. This will allow them to access the site's codebase, create backups, mark the site as private, clear your sites' caches, sync content, and perform updates.

**Remove a Team Member**

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4><p>All users can be removed except the site owner.</p></div>

In the Team modal, click the X next to the user you want to delete.

When you delete a user from a site, they lose the ability to perform any operations on that site.

For more information on managing teams, see the [Team Management article](/docs/team-management/).


### How do I add a Supporting Agency?
One of the best things about Pantheon is the ability to collaborate with agencies and shops on web projects. If you have contracted with a Pantheon Partner Agency, you can add them to the site as a Supporting Organization, which will give their company access to help build, launch, or maintain your site:

{% include("content/add-supporting-org.html")%}

### What add-ons are available for my site?

 - [Apache Solr](/docs/solr/) is a system for indexing and searching site content. Pantheon provides Apache Solr v3.6 as a service for most plans including the Sandbox site plan.
 - [Redis](/docs/redis/) is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.


Pantheon also offers [New Relic Pro](/docs/new-relic/) to our customers, built into the Site Dashboard. New Relic offers a wide array of metrics that provide a nearly real-time look into the performance of a web application.

### How do I enable add-ons?
From your Site Dashboard, click **Settings**, then click **Add Ons**. You will see all the available add-ons for your site.

You can access New Relic Pro directly from the Site Dashboard, by clicking on **<span class="glyphicons glyphicons-eye-open"></span> New Relic**.


### Can I downgrade my site to a Basic plan?
Yes. However, if you have Solr and/or Redis add ons enabled, they will break when you go down to Basic plan level. For more information, see [Manage Plans in the Site Dashboard](/docs/site-plan/#basic-plan).

## Billing Tasks


### How do I change site service levels?
From your Site Dashboard, click **Settings**. Select a plan, and click **Update Plan**. Next, enter the payment information or invite someone to pay for the site, and click **Purchase Plan**.

### Can I update or change the payment method?
You can update the payment method in the **Settings** page. For detailed instructions, see [Account Billing in the User Dashboard](/docs/account-billing/).

### Can I pay for my site on an annual or quarterly basis instead of monthly?
Self-serve sites are billable via recurring monthly or [annual](/docs/annual-billing/) billing. Sites that are owned by a Reseller, Edu+, or Enterprise organization are invoiced to the organization.

### Can I transfer ownership of a site to someone else?
{% include("content/transfer-ownership-billing-intro.html")%}
{% include("content/transfer-ownership-billing-steps.html")%}

## See Also

- [Billing in the Site Dashboard](/docs/site-billing/)
- [Account Billing in the User Dashboard](/docs/account-billing/)
- [Team Management](/docs/team-management/)
