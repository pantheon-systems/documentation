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
* Partner Organizations can add people as Administrators, Team Members, and Developers to the Organization.
* Enterprise Organizations with the Change Management add-on can assign Users or Supporting Organizations as Developers or Team Members to individual sites owned by the organization.
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

Enterprise Organizations can use the same process to assume ownership of a site; however, Partner Organizations  cannot own sites directly.

For Sandbox sites, within the Team modal, the site owner can click **Make Owner** next to the team member that should receive ownership of the site.


## Roles and Permissions

Change Management is enabled for all Pantheon for Agencies Partners, and for some Pantheon for Enterprises customers.

###Enterprise:  Organization-Level Roles/Permissions

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
        <td>* Manage settings<br>
        * Remove members    <br>
        * Edit member roles <br>
        * Delete sites  <br>
        * Remove sites from the Organization</td>
    </tr>
    <tr>
        <td class="border-bottom">Unprivileged</td>
        <td class="border-bottom">* Create sites, for which they become the User in Charge<br/></td>
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
        <td>* Remove members<br>
        * Change member roles<br>
        * Delete sites<br>
        * Remove sites from the Organization<br>
        * Manage settings</td>
    </tr>
    <tr>
        <td class="border-bottom">Team Member</td>
        <td class="border-bottom">* Add Developers and Team Members to the Organization<br>
        * Add users as Team Members to sites</td>
    </tr>
    <tr>
        <td class="border-bottom">Developer</td>
        <td class="border-bottom">* Tag Sites<br>
        * View People<br>* View Tickets </td>
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
        <td>* Create and delete sites</td>
        <td><center>X</center></td>
        <td><center>X</center></td>
    </tr>
    <tr>
        <td>Team Member</td>
        <td>* Deploy code to Test and Live<br/>* Use the Workflow tool on Test and Live<br/>* Change the PHP versions for all site environments<br/>* Add Team Members and Supporting Organizations</td>
        <td><center>X</center></td>
        <td><center>X</center></td>
    </tr>
    <tr>
        <td>Developer</td>
        <td>* Commit code to Dev and Multidev environments<br/>* Add and Remove add-ons to sites. New Relic cannot be removed once added.</td>
        <td><center>X</center></td>
        <td><center>X</center></td>
    </tr>
    <tr>
        <td>User in Charge</td>
        <td>* This is the user who created the site. This designation cannot be transferred.<br/>* Can delete the site he/she created</td>
        <td><center>X</center></td>
        <td></td>
    </tr>
    <tr>
        <td>Owner</td>
        <td>* Functionally is the same as an Organization Administrator</td>
        <td></td>
        <td><center>X</center></td>
    </tr>
</table>

<br>
To promote a Developer to the Team Member role for a single site, add the user to the Site Team.

### Change Management - Disabled

By default, Change Management is not enabled for Enterprise Organizations. If Change Management is disabled, roles cannot be selected at the site level. At the Organization level, a checkbox is shown to set a user as an Administrator, otherwise it defaults to the Unprivileged role. At the site level, there is no role selector&mdash;all users are Team Members.
