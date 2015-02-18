---
title: Change Management
description: Learn about the features and benefits of role-based permissions.
category:
  - getting started
  - developing
---

Change Management is a feature of Organizations that enables role-based permissions for users on the organization. Sites which list the organization as a supporting organization are accessible to privileged members of the organization. The roles exist to restrict who can deploy, and manage other users in the Organization or Sites it works on.

## Features
* The Organization with Change Management can add, remove, and assign roles to members of the Organization. Limited time members, like subcontractors, can be added with fewer privileges.
* When the Organization is added to a Site as a supporting organization (e.g. Agencies), the members and roles of the Organization are maintained for working on the site.
A Site owned by an Organization with Change Management will have permissions in the Team window to add one-off team members, such as subcontractors.
* Agencies added to Sites by subscription owners are able to use Change Management internally, but the subscription owners are not&mdash;they can only add full team members.
* All users in an Organization can see other users and their roles.


## Managing People
Each user in the Organization is assigned a role when they are invited to join, and the role is assigned by the user who invites them. Roles have predefined permissions that vary depending on which Dashboard you are in (Site or Organization). The procedures below can be performed at the **Organization Dashboard's People Tab** by **Administrators** of the organization.


### Add a New User

1. Click **Add User**.
2. Enter the email address of the new user, select a role, and click **Add user**.

An email confirmation is sent to the user. If the user already has a Pantheon account, they are immediately added to the Organization. If not, they'll first need to click the confirmation link in the email to create their account.


### Edit an Existing User

1. Select the user's name, click **Operations**, and choose **Change Role**.
2. Select the new role from the drop-down, and click **Set User Role**.

## Permissions

### Change Management Enabled

Change Management is enabled for all Pantheon for Agencies partners, and for some Pantheon for Enterprises customers. With it enabled, permissions for each role are as follows. Actions that can be carried out in both contexts; e.g. deleting sites, adding/removing site team members, and viewing, submitting, and updating support tickets, are listed under the **Site Dashboard**, but are enforced equally in the **Organization Dashboard**. Each role has all of the permissions of the roles listed below it. Permissions listed in each row are exclusive to that role and those above it.

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
<td class="tg-031e">Same as Organization Administrator. In P4A, sites are owned by the person who created them until a payment instrument is associated. All roles can "Own" sites in this way.</td>
</tr>
<tr>
<td class="tg-031e">Organization Administrator</td>
<td class="tg-031e">- Manage Settings<br>- Remove Members<br>- Edit member roles<br>- Delete Sites<br>- Remove Sites from the Organization</td>
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
<td class="tg-031e">- Commit code to CDE's and Dev<br>- Cannot deploy code or clone content to Test/Live, unless invited to the site or were the creator of the site, in which case they are on the site team as member or owner.</td>
</tr>
<tr>
<td class="tg-031e">Unprivileged*</td>
<td class="tg-031e">- Cannot view the Organization Dashboard
<td class="tg-031e">- Create new Sites<br>- Cannot deploy to Test/Live</td>
</tr>
</table>
*Users cannot be granted this role in organizations with Change Management. Only users who are added via email domain matching at user registration are given this role. P4A partners should not use this role.


### Change Management - Disabled

By default, Change Management is not enabled for some types of organizations. If Change Management is disabled, roles cannot be selected at the Organization or Site levels. At the Organization level, a checkbox appears to set a user as an Administrator, otherwise it defaults to the Unprivileged role. At the Site level, there is no role selector&mdash;all users are Team Members.

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
<td class="tg-031e">In Pantheon for Enterprise Organizations, the Site is owned by the Organization, and the Organization Administrator functions as site Owner and can:<br>- Manage Sites Service Level<br>- Delete Sites<br>- Manage Settings<br>If the Site is not owned by the Organization (P4A) the Organization Administrator functions as a Team Member.</td>
</tr>
<tr>
<td class="tg-031e">Team Member</td>
<td class="tg-031e">Role does not exist in organizations without Change Management</td>
<td class="tg-031e">- Manage Settings<br>- Manage Team<br>- Manage Settings<br>- Deploy to Test/Live</td>
</tr>
<tr>
<td class="tg-031e">Unprivileged*</td>
<td class="tg-031e">- Create Sites within the Organization from the User Dashboard<br>- Cannot view the Organization Dashboard<br>- Only access the Organization Sites they created or are invited to as team members</td>
<td class="tg-031e">- Become Team Members for sites they create<br>- Can only access sites through invitation, are considered team members.</td>
</tr>
</table>
