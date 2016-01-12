---
title: New Site Owner FAQs
description: Learn about common billing and administrative tasks performed by a Pantheon Drupal or WordPress site owner.
category:
    - developing
keywords: own, ownership, site owner, site ownership, add team members, how to add a team member, how to remove a team member, supporting organization, supporting agency
---
When you become a site owner, you receive administrator permissions to manage the billing information, team members, and site settings.

## Frequently Asked Questions

### Administrative Tasks


####How do I add and remove team members?

**Add a Team Member**

In the Team modal, enter the email address of the user, and click **Add Team Member**.

Once the user has been added to the project, they will receive a welcome email notifying them that they are now a member of the site's team. This will allow them to access the site's codebase, create backups, mark the site as private, clear your sites' caches, sync content, and perform updates.

**Remove a Team Member**

<div class="alert alert-info" role="alert">
<h4>Note</h4>All users can be removed except the site owner.</div>

In the Team modal, click the X next to the user you want to delete.

When you delete a user from a site, they lose the ability to perform any operations on that site.

For more information on managing teams, see the [Team Management article](/docs/articles/sites/team-management/).


#### How do I add a supporting agency?
One of the best things about Pantheon is the ability to collaborate with agencies and shops on web projects. If you have contracted with a Pantheon Partner or Ally Agency, you can add them to the site as a _supporting organization_, which will give their company access to help build, launch, or maintain your site.

1. Click **Team** in the upper-right of the Site Dashboard.
2. Select **Add Supporting Organization** at the bottom of the Team Management window.
3. Enter the complete name of the agency. An exact match is required.
4. Check that the agency is the one you expected.
5. Click **Add Agency** to make them a supporting organization.

####What add-ons are available for my site?
[Apache Solr](/docs/articles/sites/apache-solr/) is a system for indexing and searching site content. Pantheon provides Apache Solr v3.5 as a service for most plans including the free sandbox.

[New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis/) offers a wide array of metrics that provide a nearly real-time look into the performance of a web application.

[Redis](/docs/articles/sites/redis-as-a-caching-backend/) is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

[HTTPS](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/) is a standard for establishing an encrypted link between your Pantheon site and a client (e.g. web browser). You should enable HTTPS on a custom domain, e.g., www.example.com, if you are transmitting any sensitive data.  
<div class="alert alert-warning" role="alert">
<h4>Note</h4>
Only enable HTTPS for your Live environment. It is not needed in Dev or Test.</div>

####How do I enable add-ons?
From your Site Dashboard, click **Settings**, then click **Add Ons**. You will now see all the available add-ons for your site.


####Can I downgrade my site to a personal plan?
Yes. However, if you have Solr and/or Redis add ons enabled, they will break when you go down to personal plan level. If you have HTTPS enabled on Professional plans and above, you will need to re-enable HTTPS and re-load your SSL certificate into Pantheon. For more information, see [Enable Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/).

### Billing Tasks


####How do I change site service levels?
From your Site Dashboard, click **Settings**. Select a plan, and click **Update Plan**. Next, enter the payment information or invite someone to pay for the site, and click **Purchase Plan**.

####Can I update or change the payment method?
You can update the payment method in the **Settings** page. For detailed instructions, see [Updating Payment Methods](/docs/articles/sites/updating-payment-methods/).


####Can I transfer ownership of a site to someone else?

The site owner is the person who pays for the site. You'll need to update the payment method in order to change the owner.

1. From the **Settings** page, click **Invite to pay for the site**.
2. Enter the email address for the new site owner, and click **Send Invite**.
Once the new owner receives the invitation, they will be directed to provide payment information, at which point they will assume ownership of the site.

<div class="alert alert-warning" role="alert">
<h4>Note</h4>
We do not recommend entering credit card information on behalf of a new owner. Instead, go to <strong>Settings</strong>, select <strong>Plan</strong>, and choose <strong>Invite a business owner to pay for this site</strong>. Enter the business owner's email address, select the correct plan level, and click <strong>Send invitation</strong>. Site ownership and billing will be transferred to the business owner once their credit card information and payment has been verified.</div>

 ![Invite a business owner to pay](/source/docs/assets/images/invite-business-owner.png)


Enterprise Organizations can use the same process to assume ownership of a site; however, Agency Partners do not have the ability to own sites directly.

For Sandbox sites, the site owner can click **Team**, then click **Make Owner** next to the team member who should receive ownership of the site.

Resellers should contact Pantheon Support directly if you need to transfer ownership.


##See Also

- [Adding a Credit Card to a Specific Site](/docs/articles/sites/settings/add-a-credit-card-to-a-site#select-a-plan-and-add-a-credit-card)
- [Updating Payment Methods](/docs/articles/sites/updating-payment-methods/)
- [Team Management](/docs/articles/sites/team-management/)
