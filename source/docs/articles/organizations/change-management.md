---
title: Role-Based Permissions & Change Management
description: Learn about the features and benefits of role-based permissions for Pantheon sites.
category:
  - getting-started
  - developing
keywords: roles, role, permissions, permission, access, privileges, privilege, team members, developer role, developer, organization management, manage organization, change management, team management, manage team, manage team access  
---
Change Management is an Organization feature that enables role-based permissions for users in the Organization. It is automatically enabled for all [Partner](https://pantheon.io/pantheon-partners), [EDU](https://pantheon.io/edu) and [Enterprise](https://pantheon.io/pantheon-enterprise) Organizations.

Users added to the organization can access all sites associated with the Organization, with access restricted based on the user's role in that Organization. These roles exist to restrict who can deploy code on sites, and manage other users in the Organization or sites it works on.

## Features
* Enterprise Administrators can add Team Members or Supporting Organizations to **sites** owned by the Organization, with the Developer or Team Member roles.
* Partner Organizations can assign users the role of an Administrator, Team Member, or Developer at the organization level.
* When a site owner adds an organization to a site as a Supporting Organization (e.g. an Agency Organization), the members and roles of the Organization are inherited for working on the site. If the site is owned by an Enterprise Organization with Change Management enabled, the site Administrators can cap the permission level of all Supporting Organization users to "Developer". For example, Supporting Organization Administrators will only have the permissions of a Developer when working on that site, despite being Organization Administrators.
* All users in an Organization can see other users and their roles.

## Managing People in an Organization
When a Team Member or Administrator adds a user to an Organization, they must assign a role to the new member. Roles have predefined permissions that vary depending on which Dashboard you are in (Site or Organization). Administrators of the Organization assign roles at the **Organization Dashboard's People tab**.

### Add a User

1. In the People tab, click **Add User**.
2. Enter the email address of the new user, select a role, and click **Add user**.

An email confirmation is sent to the user. If the user already has a Pantheon account, they are immediately added to the Organization. If not, they'll first need to click the confirmation link in the email to create their account.

### Change a User's Role

1. In the People tab, select the user's name.
2. Click **Operations**, and choose **Change Role**.
3. Select the new role from the drop-down, and click **Set User Role**.

### Change Site Owner

To change the owner of a paid site (e.g. Personal, Pro, Business), you'll need to update the billing information by clicking **Invite a business owner to pay for this site** within in the Settings page of the Site Dashboard. Enter the email address for the new site owner and select the applicable plan for the site. Once the new owner receives the invitation they will be directed to provide payment information, at which point they will assume ownership of the site.

Enterprise Organizations can assume ownership of a site by opening a support ticket; however, Partner Organizations cannot own sites directly.

For Sandbox sites, within the Team modal, the current site owner can click **Make Owner** next to the team member who should receive ownership of the site.

## Managing an Enterprise Site's Team

Elite site Team Members can add users as either Team Members or Developers to the site.

### Add a User to the Site
1. At the Site Dashboard, click **Team**.
2. Enter the user's email address, select a role, and click **Add Team Member**.

### Add a Supporting Organization to the Site
1. At the Site Dashboard, click **Team**.
2. Click **Add a Supporting Organization**, enter the Organization's name in the search box, and click **Search**.
3. Select a role, and click **Add**.

All members of the Supporting Organization receive the role assigned on the site, regardless of their role in the Supporting Organization.

## Roles and Permissions

These tables detail the actions each role can execute on each Dashboard.

In some Dashboards, you may notice the "User in Charge" label applied to a user. This helps distinguish who created a site in Enterprise Organizations with unprivileged users (e.g. Universities).

###Enterprise: Organization-Level Roles/Permissions

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-e3zv{font-weight:bold}
</style>
<table class="tg">

    <tr>
        <th><strong>Role</strong></th>
        <th><strong>Permissions</strong></th>
    </tr>
    <tr>
        <td>Administrator</td>
        <td>&#8226; Manage settings<br>
        &#8226; Remove members    <br>
        &#8226; Change member roles <br>
        &#8226; Create and delete sites  <br>
        &#8226; Remove sites from the Organization</td>
    </tr>
    <tr>
        <td class="border-bottom">Team Member</td>
        <td class="border-bottom">&#8226; Add Developers and Team Members to the Organization<br>
         &#8226; Add users as Team Members to sites<br> &#8226; Create sites<br></td>
    </tr>
    <tr>
        <td class="border-bottom">Developer</td>
        <td class="border-bottom">&#8226; Tag sites<br>
         &#8226; View people<br> &#8226; View tickets
         <br> &#8226; Create sites<br></td>
    </tr>
    <tr>
        <td class="border-bottom">Unprivileged</td>
        <td class="border-bottom">&#8226; Create sites, for which they automatically become the User in Charge
        <br> &#8226; Cannot access the Org Dashboard or any sites in the Org</td>
    </tr>
</table>


###Partners: Organization-Level Roles/Permissions

<style>
    .data-table {
        border-collapse: collapse;
    }
    .border-bottom {
        border-bottom: 1px solid #000;
    }
</style>

<table class="tg">
    <tr>
        <th><strong>Role</strong></th>
        <th><strong>Permissions</strong></th>
    </tr>
    <tr>
        <td>Administrator</td>
        <td>&#8226; Remove members<br>
        &#8226; Change member roles<br>
        &#8226; Create and delete sites<br>
        &#8226; Remove sites from the Organization<br>
        &#8226; Manage settings</td>
    </tr>
    <tr>
        <td class="border-bottom">Team Member</td>
        <td class="border-bottom">&#8226; Add Developers and Team Members to the Organization<br>
         &#8226; Add users as Team Members to sites<br> &#8226; Create sites<br></td>
    </tr>
    <tr>
        <td class="border-bottom">Developer</td>
        <td class="border-bottom">&#8226; Tag sites<br>
         &#8226; View people<br> &#8226; View tickets
         <br> &#8226; Create sites<br> </td>
    </tr>
</table>

##Site-Level Roles/Permissions

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-e3zv{font-weight:bold}
</style>
<table class="tg">
    <tr>
        <th><strong>Role</strong></th>
        <th><strong>Permissions</strong></th>
        <th><strong>Enterprise Organization</strong></th>
        <th><strong>Partner Organization</strong></th>
    </tr>
    <tr>
        <td>Administrator</td>
        <td>&#8226; Create and delete sites</td>
        <td><center>X</center></td>
        <td><center>X</center></td>
    </tr>
    <tr>
        <td>Team Member</td>
        <td>&#8226; Deploy code to Test and Live<br/>&#8226; Use the Workflow tool on Test and Live<br/>&#8226; Change the PHP versions for all site environments<br/>&#8226; Add Team Members and Supporting Organizations</td>
        <td><center>X</center></td>
        <td><center>X</center></td>
    </tr>
    <tr>
        <td>Developer</td>
        <td>&#8226; Can only commit code to Dev and Multidev environments<br/>&#8226; Add and remove add-ons to sites. New Relic cannot be removed once added.<br>
        <strong>Note</strong>: You can promote a Developer to Team Member for a single site by adding the user to the site's team.</td>
        <td><center>X</center></td>
        <td><center>X</center></td>
    </tr>
    <tr>
        <td>Owner</td>
        <td>&#8226; Functionally is the same as an Organization Administrator<br>
        &#8226; Only role that can delete a site after it is live</td>
        <td></td>
        <td><center>X</center></td>
    </tr>
</table>
