---
title: Site Team Management
description: Working with the Pantheon Website Management Platform deployment tools in a team driven environment.
tags: [manage]
categories: []
---
Pantheon has powerful workflow tools that are packed with real-time features that are great for people working in teams, and getting started is easy.

## Manage Site Team Members
You can add and delete users in the Team modal by clicking **Team** in the upper-right of your Site Dashboard.

![Team Management Window](/source/docs/assets/images/dashboard/team-modal.png)
## Add a Team Member

In the Team modal, enter the email address of the user and click **Add team member**.

Once the user has been added to the project, they will receive a welcome email notifying them that they are now a member of the site's team. This will allow them to access the site's codebase, create backups, mark the site as private, clear your sites' caches, sync content, and perform updates.

## Invite a Team Member

Sometimes you need to invite a user to a team or project who does not have a Pantheon account. You can still add them to the project and they will be sent an email with an invite to become a team member on the site.

Once they have successfully created an account, they will be automatically added to the team. As an added bonus if the user signs up, you'll get an extra free Dev site!

## Remove a Team Member

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4><p>All users can be removed except the site owner.</p>
</div>

In the Team modal in the Site Dashboard, click the X next to the user you want to delete.

When you delete a user from a site, they lose the ability to perform any operations on that site.

## Site Owner
Site ownership is assigned to the person who creates the site or pays for the site. The site owner cannot be removed from the site team.

### Change the Site Owner

#### Sandbox Sites
Within the Team modal of the Site Dashboard, the site owner can click **Make Owner** next to the site team member that should receive ownership of the site. This link is only visible when the Sandbox site does not have a credit card associated with the site. To disassociate a credit card, go to **Settings** and click the Billing tab.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4><p>Only the current site owner has the ability to assign a new owner; site team members will not see this option.</p>
</div>

![Make Owner](/source/docs/assets/images/dashboard/sandbox-make-owner.png)

#### Paid Sites
To change the owner of a paid site (e.g. Personal, Pro, Business), you'll need to update the billing information by clicking **Invite a business owner to pay for this site** within in the Settings page of the Site Dashboard. Enter the email address for the new site owner and select the applicable plan for the site. Once the new owner receives the invitation they will be directed to provide payment information, at which point they will assume ownership of the site.

![Invite a business owner to pay for this site](/source/docs/assets/images/dashboard/payment-invite.png)<br />
Enterprise Organizations can use the same process to assume ownership of a site;  however, Agency Partners do not have the ability to own sites directly.

### Pantheon Partners
The site owner is the person who pays for the site. You'll need to update the payment method to change the owner.

## Add a Supporting Organization

One of the best things about Pantheon is the ability to collaborate with agencies and shops on web projects. If you have contracted with a Pantheon Partner or Ally Agency, you can add them to the site as a Supporting Organization, which will give their company access to help build, launch, or maintain your site.

1. Click **Team** in the Site Dashboard.
2. Click **Add Supporting Organization** at the bottom of the team management window.
3. Enter the complete name of the agency. An exact match is required.
4. Check that the agency is the one you expected.
5. Click the **Add Agency** button to make them a supporting organization.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4><p>Because Supporting Organizations have full access to a site, only the site owner can perform this action.</p>
</div>

 ![Add a supporting organization button](/source/docs/assets/images/dashboard/multi_org1.png)
 ![Confirm supporting organization](/source/docs/assets/images/dashboard/multi_org2.png)

## See Also
[Role-Based Permissions & Change Management](/docs/change-management/)
[Organizations](/docs/organizations/)
