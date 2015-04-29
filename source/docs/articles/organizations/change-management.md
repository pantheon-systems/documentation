---
title: Change Management
description: Learn about the features and benefits of role-based permissions.
category:
  - getting-started
  - developing
---
Change Management is a feature of Organizations that enables role-based permissions for users on the Organization. Sites which list the Organization as a supporting Organization are accessible to privileged members of the Organization. The roles exist to restrict who can deploy and manage other users in the Organization or sites it works on.

## Features
* Organizations with Change Management can add people as Administrators, Team Members, and Developers to the Organization. Admins have all privileges; Team Members are a trusted role that can make changes that affect the Test and Live environments; and Developers can only work on Development environments.
* When an Organization is added to a site as a supporting Organization (e.g. Agencies), the members and roles of the Organization are inherited for working on the site. All Organization members can access all sites associated with the organization.
* Agencies added to Sites by subscription owners are able to use Change Management internally, but the subscription owners are not—they can only add full team members.
* All users in an Organization can see other users and their roles.


## Managing People
Each user in the Organization is assigned a role when they are invited to join, and the role is assigned by the user who invites them. Roles have predefined permissions that vary depending on which dashboard you are in (Site or Organization). The procedures are performed at the **Organization Dashboard's People tab** by Administrators of the Organization.


### Add a New User

1. In the People tab, click **Add User**.
2. Enter the email address of the new user, select a role, and click **Add user**.

An email confirmation is sent to the user. If the user already has a Pantheon account, they are immediately added to the Organization. If not, they'll first need to click the confirmation link in the email to create their account.


### Edit an Existing User

1. In the People tab, select the user's name, click **Operations**, and choose **Change Role**.
2. Select the new role from the drop-down, and click **Set User Role**.

### Change Site Owner

To change the owner of a paid site (e.g. Personal, Pro, Business), you'll need to update the billing information by clicking **Invite a business owner to pay for this site** within in the Settings page of the Site Dashboard. Enter the email address for the new site owner and select the applicable plan for the site. Once the new owner receives the invitation they will be directed to provide payment information, at which point they will assume ownership of the site.

Enterprise Organizations can use the same process to assume ownership of a site, however Agency Partners do not have the ability to own sites directly.

For Sandbox sites, within the Team modal, the site owner can click **Make Owner** next to the team member that should receive ownership of the site.


## Permissions

### Change Management Enabled

Change Management is enabled for all Pantheon for Agencies Partners, and for some Pantheon for Enterprises customers. Actions that can be carried out in both contexts (e.g. deleting sites, adding/removing site team members, and viewing, submitting, and updating support tickets) are listed under Site Dashboard, but are enforced equally in the Organization Dashboard. Each role has all of the permissions of the roles listed below it.

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-e3zv{font-weight:bold}
</style>
<table class="tg">
<tr>
<th class="tg-e3zv">Role</th>
<th class="tg-e3zv">Organization Dashboard</th>
<th class="tg-e3zv">Site Dashboard</th>
</tr>
<tr>
<td class="tg-031e">Owner</td>
<td class="tg-031e">Functionally the same as an Organization Admin. This is the person/org who pays for the Site.</td>
<td class="tg-031e">Same as Organization Administrator. Pantheon for Agencies sites are owned by the person who created them until a payment instrument is associated. All roles can "own" sites in this way.</td>
</tr>
<tr>
<td class="tg-031e">Organization Administrator</td>
<td class="tg-031e">- Manage Settings<br>- Remove Members<br>- Edit Member Roles<br>- Delete Sites<br>- Remove Sites from the Organization</td>
<td class="tg-031e">- If the Site is owned by the Organization, the Organization Administrator functions as an Owner.<br>- If the Site is not owned by the Organization, the Organization Administrator functions as a Team Member.</td>
</tr>
<tr>
<td class="tg-031e">Team Member</td>
<td class="tg-031e">- Add Org Team members and developers (but cannot remove/edit roles)</td>
<td class="tg-031e">- Manage Settings<br>- Manage Team (add/remove)<br>- Deploy Code to Test/Live</td>
</tr>
<tr>
<td class="tg-031e">Developer</td>
<td class="tg-031e">- Tag Sites<br>- Access Sites<br>- Create Sites</td>
<td class="tg-031e">- Commit code to CDEs and Dev<br>- Cannot deploy code or clone content to Test/Live, unless invited to the site or were the creator of the site, in which case they are on the site team as member or owner.</td>
</tr>
<tr>
<td class="tg-031e">Unprivileged*</td>
<td class="tg-031e">Disabled
<td class="tg-031e">- Create new Sites<br>- Cannot deploy to Test/Live</td>
</tr>
</table>
*Users cannot be granted this role in Organizations with Change Management. Only users who are added via email domain matching at user registration are given this role. Pantheon for Agencies partners should not use this role.


### Change Management - Disabled

By default, Change Management is not enabled for some types of Organizations. If Change Management is disabled, roles cannot be selected at the Organization or Site levels. At the Organization level, a checkbox appears to set a user as an Administrator, otherwise it defaults to the Unprivileged role. At the Site level, there is no role selector&mdash;all users are Team Members.

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-e3zv{font-weight:bold}
</style>
<table class="tg">
<tr>
<th class="tg-e3zv">Role</th>
<th class="tg-e3zv">Organization Dashboard</th>
<th class="tg-e3zv">Site Dashboard</th>
</tr>
<tr>
<td class="tg-031e">Owner</td>
<td class="tg-031e">Functionally the same as an Organization Admin, distinguished only by the user/organization's association with a payment instrument.  </td>
<td class="tg-031e">Same as Organization Administrator.</td>
</tr>
<tr>
<td class="tg-031e">Organization Administrator</td>
<td class="tg-031e">Only role that can access this dashboard. All permissions are granted.</td>
<td class="tg-031e">In Pantheon for Enterprise Organizations, the Site is owned by the Organization, and the Organization Administrator functions as site Owner and can:<br>- Manage Sites Service Level<br>- Delete Sites<br>- Manage Settings<br>If the Site is not owned by the Organization, the Organization Administrator functions as a Team Member.</td>
</tr>
<tr>
<td class="tg-031e">Team Member</td>
<td class="tg-031e">Role does not exist in organizations without Change Management</td>
<td class="tg-031e">- Manage Settings<br>- Manage Team<br>- Manage Settings<br>- Deploy to Test/Live</td>
</tr>
<tr>
<td class="tg-031e">Unprivileged*</td>
<td class="tg-031e"> No Access</td>
<td class="tg-031e">- Become Team Members for sites they create<br>- Can only access sites through invitation, are considered team members.</td>
</tr>
</table>
