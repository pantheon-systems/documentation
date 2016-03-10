---
title: Team Management
description: Working with the Pantheon Website Management Platform deployment tools in a team driven environment.
category:
  - getting-started
  - managing
keywords: team management, roles, permissions, team members, developer, privileges, change site owner, ownership, site owner, organization, supporting organization, agency, supporting agency
---
Pantheon has powerful workflow tools that are packed with real-time features that are great for people working in teams, and getting started is easy.

## Team Management
You can add and delete users in the Team modal. Simply click **Team** located in the upper-right of your Dashboard.

![Team Management Window](/source/assets/images/team-modal.png)
## Add a Team Member

In the Team modal, enter the email address of the user and click **Add team member**.

Once the user has been added to the project, they will receive a welcome email notifying them that they are now a member of the site's team. This will allow them to access the site's codebase, create backups, mark the site as private, clear your sites' caches, sync content, and perform updates.

## Invite a Team Member

Sometimes you need to invite a user to a team or project who does not have a Pantheon account. You can still add them to the project and they will be sent an email with an invite to become a team member on the site.

Once they have successfully created an account, they will be automatically added to the team. As an added bonus if the user signs up, you'll get an extra free Dev site!

## Remove a Team Member

<div class="alert alert-info" role="alert">
<h4>Note</h4>All users can be removed except the site owner.</div>

In the Team modal, click the X next to the user you want to delete.

When you delete a user from a site, they lose the ability to perform any operations on that site.

## Site Owner
Site ownership is assigned to the person who creates the site or pays for the site. The site owner cannot be removed from the site team.

### Change the Site Owner

#### Sandbox Sites
Within the Team modal, the site owner can click **Make Owner** next to the team member that should receive ownership of the site. This link is only visible when the Sandbox site _does not_ have a credit card associated with the site. To disassociate a credit card, visit the site's Billing tab within the Settings modal.

<div class="alert alert-info" role="alert">
<h4>Note</h4>Only the current site owner has the ability to assign a new owner; team members will not see this option.</div>
![Make Owner](/source/assets/images/sandbox-make-owner.png)

#### Paid Sites
To change the owner of a paid site (e.g. Personal, Pro, Business), you'll need to update the billing information by clicking **Invite a business owner to pay for this site** within in the Settings page of the Site Dashboard. Enter the email address for the new site owner and select the applicable plan for the site. Once the new owner receives the invitation they will be directed to provide payment information, at which point they will assume ownership of the site.

![Invite a business owner to pay for this site](/source/assets/images/payment-invite.png)<br />
Enterprise Organizations can use the same process to assume ownership of a site;  however, Agency Partners do not have the ability to own sites directly.

### Pantheon Partners
The site owner is the person who pays for the site. You'll need to update the payment method to change the owner.

## Add a Supporting Organization

One of the best things about Pantheon is the ability to collaborate with agencies and shops on web projects. If you have contracted with a Pantheon Partner or Ally Agency, you can add them to the site as a _supporting organization_, which will give their company access to help build, launch, or maintain your site.

1. Click **Team** in the upper-right of the Site Dashboard.
2. Click **Add Supporting Organization** at the bottom of the team management window.
3. Enter the complete name of the agency. An exact match is required.
4. Check that the agency is the one you expected.
5. Click the **Add Agency** button to make them a supporting organization.

<div class="alert alert-info" role="alert">
<h4>Note</h4>Because supporting organizations have full access to a site, only the site owner can perform this action.</div>
 ![Add a supporting organization button](/source/assets/images/multi_org1.png)
 ![Confirm supporting organization](/source/assets/images/multi_org2.png)

## See Also
[Role-Based Permissions & Change Management](/docs/change-management/)
