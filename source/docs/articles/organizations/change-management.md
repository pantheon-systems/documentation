---
title: Change Management
description: Learn about the features and benefits of role-based permissions.
category:
  - getting started
  - developing
---

Change Management is a feature of Organizations that enables role-based permissions for users in the Organization and team members of Sites owned by the Organization in order to restrict who can develop, deploy, and manage other users in the Organization or Site.

Partners receive Change Management for free. Enterprise customers can enable it by purchasing the add-on.

##Features
* The Organization with Change Management can add, remove, and assign roles to members of the Organization. Limited time members, like subcontractors, can be added with fewer privileges.
* When the Organization is added to a Site as a supporting organization (e.g. Agencies), the members and roles of the Organization are maintained when working on the site.
A Site owned by an Organization with Change Management will have permissions in the Team window to add one-off team members, such as subcontractors.
* Agencies added to Sites by subscription owners are able to use Change Management internally, but the subscription owners are not&mdash;they can only add full team members.
* All users in an Organization can see other users and their roles.

####Scenarios
An Enterprise Organization hires an Agency to develop its site, but wants to restrict the ability of the Agency to deploy the site to production. The enterprise can reserve deployment privileges for its internal IT team, preventing unintended deployments not initiated by the Enterprise.

An Enterprise customer that has a site and simply wants to have role-based permissions to control who can deploy to production on its own development team.


##Roles and Permissions
Each user in the Organization is assigned a role when they are invited to join, and the role is assigned by the user who invites them. Roles have predefined permissions that vary depending on which Dashboard you are in (Site or Organization).


###Add a New User
1. Click the **People** tab.
2. Click **Add User**.
3. Enter the email address of the new user, select a role, and click **Add user**.

An email confirmation is sent to the user. If the user already has a Pantheon account, they are immediately added to the Organization. If not, they'll first need to click the confirmation link in the email to create their account.


###Edit an Existing User
1. Click the **People** tab.
2. Select the user's name, click **Operations**, and choose **Change Role**.
3. Select the role from the drop-down, and click **Set User Role**.

##Change Management - Enabled

By default, Change Management is enabled for Organizations in the Pantheon for Agencies organizations.

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
<td class="tg-031e">Same as Organization Administrator.</td>
</tr>
<tr>
<td class="tg-031e">Organization Administrator</td>
<td class="tg-031e">An Organization Administrator can:<br>* Manage Settings<br>* Manage Members (add/remove/edit) in the People tab<br>* Tag Sites</td>
<td class="tg-031e">If the Site is owned by the Organization, the Organization Administrator functions as an Owner and can:<br>* Manage Sites Service Level<br>* Manage Settings<br>* Deploy to Live/Production<br>* Manage Members (add/remove/edit) in the Team window  <br><br>If the Site is not owned by the Organization, the Organization Administrator functions as a Team Member.</td>
</tr>
<tr>
<td class="tg-031e">Team Member</td>
<td class="tg-031e">Team Members can:<br>* Add Org members (but cannot remove/edit them)<br>* Tag Sites</td>
<td class="tg-031e">A Team Member can:<br>* Manage Settings<br>* Manage Members (add/remove)<br>* Deploy to Live/Production</td>
</tr>
<tr>
<td class="tg-031e">Developer</td>
<td class="tg-031e">Developers can:<br>* Tag Sites<br>* Spin up Sites in Dev only</td>
<td class="tg-031e">* Spin up new Sites in Dev only <br>* Cannot deploy to Live/Production</td>
</tr>
<tr>
<td class="tg-031e">Unprivileged</td>
<td class="tg-031e">Unprivileged users can:<br>* Spin up Sites within the Organization (User Dashboard)<br>* Cannot view the Organization Dashboard<br>* Cannot view the Organization Sites unless they are on the team of the Site</td>
<td class="tg-031e">* Spin up new Sites in Dev only <br>* Cannot deploy to Live/Production</td>
</tr>
</table>



##Change Management - Disabled
By default, Change Management is not enabled for resellers and OEM Partners. If Change Management is disabled, roles cannot be selected at the Organization or Site levels. At the Organization level, a checkbox appears to set a user as an Administrator, otherwise it defaults to the Unprivileged role. At the Site level, there is no role selector&mdash;all users are Team Members.

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
<td class="tg-031e">Functionally the same as an Organization Admin. This is the person/org who pays for the Site).</td>
<td class="tg-031e">Same as Organization Administrator.</td>
</tr>
<tr>
<td class="tg-031e">Organization Administrator</td>
<td class="tg-031e">An Organization Administrator can:<br>* Manage Settings<br>* Manage Members (add/remove/edit) in the People tab<br>* Tag Sites</td>
<td class="tg-031e">If the Site is owned by the Organization, the Organization Administrator functions as an Owner and can:<br>* Manage Sites Service Level<br>* Manage Settings<br>* Deploy to Live/Production<br>* Manage Members (add/remove/edit) in the Team window  <br><br>If the Site is not owned by the Organization, the Organization Administrator functions as a Team Member.</td>
</tr>
<tr>
<td class="tg-031e">Team Member</td>
<td class="tg-031e">Team Members can:<br>* Add Org members (but cannot remove/edit them)<br>* Tag Sites</td>
<td class="tg-031e">A Team Member can:<br>* Manage Settings<br>* Manage Members (add/remove)<br>* Deploy to Live/Production</td>
</tr>
<tr>
<td class="tg-031e">Developer</td>
<td class="tg-031e">Developers can:<br>* Tag Sites<br>* Spin up Sites in Dev only</td>
<td class="tg-031e">*Cannot deploy to Live/Production</td>
</tr>
<tr>
<td class="tg-031e">Unprivileged</td>
<td class="tg-031e">Unprivileged users can:<br>* Spin up Sites within the Organization (User Dashboard)<br>* Cannot view the Organization Dashboard<br>* Cannot view the Organization Sites unless they are on the team of the Site</td>
<td class="tg-031e">*Cannot deploy to Live/Production</td>
</tr>
</table>
