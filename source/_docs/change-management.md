---
title: Role-Based Permissions & Change Management
description: Features and benefits of role-based permissions for Pantheon Drupal and WordPress sites.
tags: [tools]
categories: []
---
Change Management is an [organization](/docs/organizations/) feature that enables role-based permissions for users in the organization. It is automatically enabled for all [Partner](https://pantheon.io/pantheon-partners), [EDU](https://pantheon.io/edu) and [Enterprise](https://pantheon.io/pantheon-enterprise) Organizations.

Users added to the organization can access all sites associated with the organization, with access restricted based on the user's role in that organization. These roles exist to restrict who can deploy code on sites, and manage other users in the organization or sites it works on.

## Roles and Permissions

These tables detail the actions each role can execute on each Dashboard.

In some Dashboards, you may notice the "User in Charge" label applied to a user. This helps distinguish who created a site for Enterprise and EDU Organizations where members are allowed to spin up new sandboxes at will. However, in these organizations the "User in Charge"  cannot adjust the site service level — e.g. to take a site live. Because this may affect the overall bill for the organization, only organization admins are allowed to change service levels. 

###Enterprise and Partner Organizations: Roles and Permissions

<table class="table  table-bordered table-responsive">
    <thead>
      <tr>
        <th>Permissions</th>
        <th>Administrator</th>
        <th>Team Member</th>
        <th>Developer</th>
        <th>Unprivileged <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Unprivileged" data-content="Enterprise and EDU+ orgs only"><em class="fa fa-info-circle"></em></a></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Create sites within an org</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
        <td>Access the org Dashboard</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
        <td></td>
      </tr>
      <tr>
        <td>Work in Dev/Multidev environments</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
        <td></td>
      </tr>
      <tr>
        <td>Deploy to Test and Live</td>
        <td>✓</td>
        <td>✓</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Manage site-level team</td>
        <td>✓</td>
        <td>✓</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Delete sites or remove users from an org</td>
        <td>✓</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Manage a site's plan</td>
        <td>✓</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>

###Site-Level: Roles and Permissions

<table class="table  table-bordered table-responsive">
    <thead>
      <tr>
        <th>Permissions</th>
        <th>User in Charge / Owner <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Owner" data-content="Partner orgs only"><em class="fa fa-info-circle"></em></a></th>
        <th>Team Member </th>
        <th>Developer  <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-content="Enterprise orgs only"><em class="fa fa-info-circle"></em></a></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Access the site Dashboard</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
        <td>Work in Dev/Multidev environments</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
        <td>Deploy to Test and Live</td>
        <td>✓</td>
        <td>✓</td>
        <td></td>
      </tr>
      <tr>
        <td>Manage site-level team</td>
        <td>✓</td>
        <td>✓</td>
        <td></td>
      </tr>
      <tr>
        <td>Delete sites or remove users from an org</td>
        <td>✓</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Manage a site's plan</td>
        <td>✓<a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Owner" data-content="When an Org is the owner of a site, users in charge cannot change the site plan."><em class="fa fa-info-circle"></em></a></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>


## Manage People in an Organization

### Add a User to the Organization

1. In the People tab, click **Add User**.
2. Enter the email address of the new user, select a role, and click **Add user**.

An email confirmation is sent to the user. If the user already has a Pantheon account, they are immediately added to the Organization. If not, they'll first need to click the confirmation link in the email to create their account.

### Change a User's Role

1. In the People tab, select the user's name.
2. Click **Operations**, and choose **Change Role**.
3. Select the new role from the drop-down, and click **Set User Role**.

### Change Site Owner

To change the owner of a paid site (e.g. Personal, Pro, Business), you'll need to update the billing information by clicking **Invite a business owner to pay for this site** within in the Settings page of the Site Dashboard. Enter the email address for the new site owner and select the applicable plan for the site. Once the new owner receives the invitation they will be directed to provide payment information, at which point they will assume ownership of the site.

Enterprise Organizations can assume ownership of a site by [contacting support](/docs/getting-support); however, Partner Organizations cannot own sites directly.

For Sandbox sites, within the Team modal, the current site owner can click **Make Owner** next to the site team member who should receive ownership of the site.

## Manage a Site's Team

### Add a User to a Site
1. At the Site Dashboard, click **Team**.
2. Enter the user's email address, select a role, and click **Add Team Member**.

### Add a Supporting Organization to a Site
1. At the Site Dashboard, click **Team**.
2. Click **Add a Supporting Organization**, enter the organization's name in the search box, and click **Search**.
3. Select a role, and click **Add**.

All members of the Supporting Organization receive the role assigned on the site, regardless of their role in the Supporting Organization.

## Frequently Asked Questions (FAQs)

#### Which role should I assign a user to give them the lowest level of access?
At the site level, the Developer role has the least amount of permissions and can create sites, view the Organization Dashboard, and deploy to the Development and Multidev environments. At the organization level, the Unprivileged role has the least amount of permissions and can only create sites.

#### Which environments can a user with the Developer role deploy to?
The Developer role can only deploy to Development and Multidev environments. If a user needs to deploy to Live, you can promote a Developer to Team Member for a single site by adding the user to the site's team.

#### Who can add users to Organizations?
Enterprise Administrators can add site Team Members or Supporting Organizations to **sites** owned by the organization, with the Developer or organizational Team Member roles. Partner Organizations can assign users the role of an Administrator, Team Member, or Developer at the organization level.
