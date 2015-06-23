---
title: Change Management
description: Learn about the features and benefits of role-based permissions for Pantheon sites.
category:
  - getting-started
  - developing
keywords: roles, role, permissions, permission, access, privileges, privilege, team members, developer role, developer, organization management, manage organization, change management, team management, manage team, manage team access  
---
Change Management is a feature of Organizations that enables role-based permissions for users on the Organization. Sites which list the Organization as a Supporting Organization are accessible to privileged members of the Organization. The roles exist to restrict who can deploy and manage other users in the Organization or sites it works on.

## Features
* Partner Organizations with Change Management can add people as Administrators, Team Members, and Developers to the Organization.
* Enterprise Organizations with Change Management can assign Administrator and Unprivileged roles to people in the Organization; and add people as Team Members or Developers to sites.
* When an Organization is added to a site as a Supporting Organization (e.g. Agencies), the members and roles of the Organization are inherited for working on the site. All Organization members can access all sites associated with the Organization.
* Agencies added to sites by subscription owners are able to use Change Management internally.
* All users in an Organization can see other users and their roles.


## Managing People
Each user in the Organization is assigned a role when they are invited to join, and the role is assigned by the user who invites them. Roles have predefined permissions that vary depending on which Dashboard you are in (Site or Organization). Administrators of the Organization assign roles at the **Organization Dashboard's People tab**.


### Add a New User

1. In the People tab, click **Add User**.
2. Enter the email address of the new user, select a role, and click **Add user**.

An email confirmation is sent to the user. If the user already has a Pantheon account, they are immediately added to the Organization. If not, they'll first need to click the confirmation link in the email to create their account.


### Edit an Existing User

1. In the People tab, select the user's name.
2. Click **Operations**, and choose **Change Role**.
2. Select the new role from the drop-down, and click **Set User Role**.

### Change Site Owner

To change the owner of a paid site (e.g. Personal, Pro, Business), you'll need to update the billing information by clicking **Invite a business owner to pay for this site** within in the Settings page of the Site Dashboard. Enter the email address for the new site owner and select the applicable plan for the site. Once the new owner receives the invitation they will be directed to provide payment information, at which point they will assume ownership of the site.

Enterprise Organizations can use the same process to assume ownership of a site; however, Agency Partners do not have the ability to own sites directly.

For Sandbox sites, within the Team modal, the site owner can click **Make Owner** next to the team member that should receive ownership of the site.


## Roles and Permissions

Change Management is enabled for all Pantheon for Agencies Partners, and for some Pantheon for Enterprises customers.

###Enterprise Organization - Roles/Permissions
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
        <td>- Manage settings<br>
        - Remove members    <br>
        - Edit member roles <br>
        - Delete sites  <br>
        - Remove sites from the Organization</td>
    </tr>
    <tr>
        <td class="border-bottom">Unprivileged</td>
        <td class="border-bottom">- Create sites<br/>- Assign a "User in Charge": This is the person who created a site and is able to delete it.</td>
    </tr>

</table>


### Enterprise Organization - Site-Level Roles/Permissions
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
        <td>Owner</td>
        <td>- Functionally the same as an Organization Administrator &nbsp;</td>
    </tr>
    <tr>
        <td class="border-bottom">Team Member</td>
        <td class="border-bottom">- Manage settings<br>
        - Manage team (add/remove)<br>
        - Deploy code to Test/Live<br>
        - Assign a "User in Charge": This is the person who created a site and is able to delete it.</td>
    </tr>
    <tr>
        <td class="border-bottom">Developer</td>
        <td class="border-bottom">- Deploy code to CDEs and Dev only</td>
    </tr>
</table>

###Partner Organization - Roles/Permissions
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
        <td>- Manage settings<br>
        - Remove members    <br>
        - Edit member roles <br>
        - Delete sites  <br>
        - Remove sites from the Organization</td>
    </tr>
    <tr>
        <td class="border-bottom">Team Member</td>
        <td class="border-bottom">- Deploy code<br/>- Assign a "User in Charge": This is the person who created a site and is able to delete it.</td>
    </tr>
    <tr>
        <td class="border-bottom">Developer</td>
        <td class="border-bottom">- Deploy code to CDEs and Dev only</td>
    </tr>
</table>

###Suppporting Organization - Site Roles/Permissions

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
        <td>Owner</td>
        <td>- Person who pays for the site</td>
    </tr>
    <tr>
        <td>Administrator</td>
        <td>- Create and delete sites</td>
    </tr>
    <tr>
        <td class="border-bottom">Team Member</td>
        <td class="border-bottom">- Deploy code<br/> - Assign a "User in Charge": This is the person who created a site and is able to delete it.</td>
    </tr>
    <tr>
        <td class="border-bottom">Developer</td>
        <td class="border-bottom">- Deploy code to Dev only</td>
    </tr>
</table>



### Change Management - Disabled

By default, Change Management is not enabled for some types of Organizations. If Change Management is disabled, roles cannot be selected at the Organization or Site levels. At the Organization level, a checkbox is shown to set a user as an Administrator, otherwise it defaults to the Unprivileged role. At the Site level, there is no role selector&mdash;all users are Team Members.
