---
title: Workspaces, Sites and Teams
subtitle: Teams
description: Learn how to use teams for change management.
categories: [account-mgmt]
tags: [workspaces, sites, teams]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/workspace-sites-teams/teams
anchorid: teams
editpath: docs/guides/account-mgmt/workspace-sites-teams/07-teams.md
reviewed: "2022-09-19"
---

Teams allow you to define the users who will have access to a workspace or site. Team members added to a workspace will have access to all sites in that workspace, whereas team members added to a site can only access that site.

## Roles and Permissions

These tables detail the actions each role can execute on each Dashboard.

In some Workspaces, you may notice the "User in Charge" label applied to a user. This helps distinguish who created a site for Enterprise and EDU Organizations where members are allowed to spin up new Sandbox sites at will. However, in these organizations, the "User in Charge"  cannot adjust the site service level — e.g. to take a site live. Because this may affect the overall bill for the organization, only organization admins are allowed to change service levels.

If you are an administrator for a Pantheon organization, [contact support](/guides/support/contact-support/) to have the User in Charge changed.

### Workspace Level Permissions


| Permissions                                             | Administrator                       | Team Member                         | Developer                          | Unprivileged <Popover title="Unprivileged" content="Enterprise and EDU+ organizations only" /> |
|:------------------------------------------------------- |:----------------------------------- |:----------------------------------- |:-----------------------------------|:-----------------------------------|
| Create sites within an org                              | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Work in Dev environments                                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Access to Multidev environments                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Create new Multidev environments                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Create or view support tickets                                    | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>  | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> |
| Access and manage [Autopilot](/guides/autopilot)        | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> |
| Access the [workspace](/guides/new-dashboard/workspaces)| <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> <Popover title="Workspace Unprivileged" content="Users with an Unprivileged role will see the workspace's name, but will not be able to access it." />|
| Access the org Dashboard                                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> |
| Change site upstream <Popover title="Permissions Note" content="The site and the upstream must both belong to the same workspace." /> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> |
| Deploy to Test and Live                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Invite new team members                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Manage user roles                                       | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Delete sites or remove users from an org                | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Manage a site's plan                                    | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Create or manage Custom Upstreams                          | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |

### Site Level Permissions

| Permissions                                       | Org Admin / Owner <Popover title="Owner" content="Partner organizations only" /> | Team Member | Developer <Popover content="Enterprise organizations only" /> |
|:------------------------------------------------- |:----------------------------------- |:----------------------------------- |:----------------------------------- |
| Access the site Dashboard                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Work in Dev environments                          | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Change site upstream                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Deploy from Custom Upstreams <Popover title="Custom Upstream availability" content="Applies only when a workspace has Custom Upstreams enabled, and has already created one." /> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>  | <span  style="color:green">✔</span>  | <span style="color:green">✔</span>  |
| Add/Manage Custom Domains           | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Deploy to Test and Live                           | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Upload files to Test and Live                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Clear cache on Test and Live                      | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Manage user roles                                 | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Delete sites or remove users from a site          | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Add a [Supporting Organization](/organizations#organization-site-association)                     | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Manage a site's plan                              | <span  style="color:green">✔</span> Org admin or Owner <Popover title="Owner" content="When a workspace is the owner of a site, users in charge cannot change the site plan." /> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Enable Pantheon Search                | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |

## FAQ

### Can I Restrict Access to a Specific Site with the Developer Role?

Only sites owned by Enterprise and EDU+ can assign the developer role to specific users. Partner Organizations cannot specify which members have access to specific sites.

### Which role should I assign a user to give them the lowest level of access?

At the site level, the Developer role has the least amount of permissions and can create sites, view the Workspace Dashboard, and deploy to the Development and Multidev environments. At the Professional Workspace level, the Unprivileged role has the least amount of permissions and can only create sites.

### Which environments can a user with the Developer role deploy to?

The Developer role can only deploy to Development and Multidev environments. If a user needs to deploy to Live, you can promote a Developer to Team Member for a single site by adding the user to the site's team.

### Who can add users to workspaces?

Enterprise Administrators can add site Team Members or Supporting Organizations to sites owned by the workspace, with the Developer or organizational Team Member roles. Partner Organizations can assign users the role of an Administrator, Team Member, or Developer at the workspace level.

### How do I recover an account after a site owner leaves?

See the steps in our [Site Access](/site-access) doc for recovery instructions.

## Manage Teams

### Add a User

<TabList>

<Tab title="To a Workspace" id="addwsp" active={true}>

1. Go to the workspace, select the **Team** tab, and click **Add User**.

1. Click **Invite Team Member**.

1. Enter the email address of the new user, select a role, then click **Send Invite**.

</Tab>

<Tab title="To a Site" id="addsite">

1. Open the Site Dashboard for the site.
   
1. Click **Team**.

1. Under **Team Members**, enter the user's email address, select a role (EDU+ and Enterprise sites only), then click **Add to Team**

</Tab>

</TabList>

An email confirmation is sent to the user. Users with an existing Pantheon account are immediately added to the workspace. Users without existing accounts must first click the confirmation link in the email to create their account.


### Change a User's Role

1. Go to the workspace and select the **Team** tab.

1. Find and select the team member(s) whose role you wish to change.

1. Click **Actions**, and choose **Change Role**.

1. Select the new role, then click **Save Changes**.

### Remove a User

<Alert title="Note" type="info">

All users can be removed except the site owner. 

</Alert>

To remove a user: 

<TabList>

<Tab title="From a Workspace" id="remws" active={true}>

1. Go to the workspace and select the **Team** tab.

1. Find and select the team member(s) you wish to remove.

1. Select **Actions**, then **Remove**.

1. Select **Yes, I am sure I want to remove this person**, then click **Yes, Remove**.

</Tab>

<Tab title="From a Site" id="remsite">

To remove a team member from a site:

1. Open the Site Dashboard for the site.

1. Click **Team**.
   
1. Select the '**x**' for each team member you wish to remove.

</Tab>

</TabList>

When a person with access to your site(s) on the platform leaves the company or project, it is important to immediately remove them from the team so that they no longer have access to make changes to your site.

After a user leaves, in addition to the steps above, we recommend you:

- Delete or block the user's account in [Drupal](https://www.drupal.org/node/627158) or [WordPress](https://codex.wordpress.org/Users_Users_SubPanel).
- Change any shared account passwords the user may have had access to.
- Review the Git history in the commit log to see if the site team member made code changes after leaving. See recommendations from [Drupal](https://www.drupal.org/node/2365547) and [WordPress](https://wordpress.org/support/article/faq-my-site-was-hacked/).


## Add a Supporting Organization to Site

One of the best things about Pantheon is the ability to collaborate with agencies and shops on web projects. If you have contracted with a [Pantheon Partner Agency](https://pantheon.io/plans/partner-program?docs), you can add them to the site as a Supporting Organization, which will give their company access to help build, launch, or maintain your site.

Organization Administrators, Users in Charge, or Site Owners can add a [Supporting Organization](/organizations#organization-site-association).

1. Open the Site Dashboard for the site.

1. Click **Team** in the Site Dashboard.

1. Click **Add a Supporting Organization**, enter the workspace's name in the search box, and click **Search**.  The workspace name must match exactly.

1. Select a role > click **Add**.

All members of the Supporting Organization receive the role assigned on the site, regardless of their role in the Supporting Organization.
