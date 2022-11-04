---
title: "Workspaces, Sites, and Teams"
subtitle: Sites Management
description: "Learn how to manage your sites."
categories: [account-mgmt]
tags: [workspaces, sites, teams]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/workspace-sites-teams/sites
anchorid: sites
editpath: docs/guides/account-mgmt/workspace-sites-teams/05-sites.md
reviewed: "2022-09-19"
---

This guide is specific to sites management, not developing and launching sites.

## Create a Site

<Alert title="Note" type="info" >

Be sure to set up workspaces before creating sites.

</Alert>

<Partial file="create-new-site-new-dash.md" />


## Manage Sites

The **Sites** tab shows all sites you own or are a team member of. You can quickly tag, sort, and filter your sites. You can add users to specific sites by checking the box to select the site and clicking **Team** > **Add to Team**.

Agency workspaces will show "Site Owners" instead of "Users in Charge"

A **<span class="glyphicons glyphicons-snowflake" style="color:#0a6bb5"></span>** icon in the site's status column indicates that a site is [frozen due to inactivity](/guides/platform-considerations/platform-site-info#inactive-site-freezing).

### Associate a Site to a Workspace

If you did not select a workspace when creating the site, you can add it to a workspace later. Refer to [Add Supporting Organization to Site](/guides/account-mgmt/workspace-sites-teams/teams#add-supporting-organization-to-site).

### Tag Sites

Tags are an easy way to add data to your sites to help you manage them.

To add tags to a site:

1. Click the **Sites** tab and select one or more sites.

1. Select **Tags**, then select **Add Tags**.

1. Enter the tags you wish to associate to this site, separated by commas, and click **Add Tags**.

To remove tags from a site:

1. Click the **Sites** tab and select one or more sites.

1. Select **Tags**, then select **Remove Tags**.

1. Select the tags you wish to remove, then click **Remove Tags**.

### Export a List of Sites

You can export a list of sites to CSV.  Data in the CSV file includes Site Name, date created, owner, upstream, plan and status.

To export a list of sites:

1. Click the **Sites** tab, and then find and select the files you want to include in the list, or select the checkbox at the top of the list to select all sites.

1. Click **More Actions**, then **Export as CSV**.  A file is generated and downloaded to your browser’s download location.

### Change Site Ownership

The person who creates the site owns it until someone else starts paying for it. The user or Enterprise who pays for the site is the owner thereafter. There can only be one site owner.

The permission to manage a site's plan is granted only to the roles of **Site Owner** / **Workspace Administrator**. Other roles do not have access to change the site plan as described on this page. Refer to [Role-Based Permissions & Change Management](/guides/account-mgmt/workspace-sites-teams/teams/#site-level-roles-and-permissions) for more information.


<Alert title="Note" type="info">

If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/guides/account-mgmt/workspace-sites-teams/sites#change-site-ownership).


</Alert>

<TabList>

<Tab title="Paid Sites" id="paid" active={true}>

To change the owner of a paid site (e.g. Basic, or Performance):

1. Open the Site Dashboard for the site.

1. Select **Settings**, then **Invite a business owner to pay for this site**.

1. Enter the email address for the new site owner.

   When the new owner receives the invitation they will be directed to provide payment information, at which point they will assume ownership of the site and will receive future invoices.

Enterprise workspaces can use the same process to assume ownership of a site; however, Agency Partners do not have the ability to own sites directly.

</Tab>

<Tab title="Sandbox Sites" id="sandbox">

<Partial file="transfer-ownership-billing-intro.md" />

To transfer ownership for a site:

<Partial file="transfer-ownership-billing-steps.md" />

</Tab>

<Tab title="Partner Workspaces" id="partner">

When a developer creates a site in a partner workspace, they automatically become the "Site Owner/User in Charge" until the business owner starts paying for the site and becomes the owner. Workspace admins cannot delete users from a workspace until the listed owner no longer owns any sites in the workspace.

The user account in question must [transfer ownership to another person in the workspace](/guides/account-mgmt/workspace-sites-teams/teams/#change-site-owner). Partner workspace admins cannot change ownership of sites. If the workspace is using SAML for single-sign on, you should be able to log-in as the user and make the necessary changes. Partners without SAML will need to [contact support](/guides/support/contact-support/) to request ownership change, which may take 24-48 hours. As a workaround, admins can download a backup of the site, import it as a new site, move the domain name from the original site to the imported site, and delete the original site(s).

For all sites, we recommend instructing users to change their passwords regularly, using two-factor authentication, restricting access with Change Management, and carefully planning who will create client sites in the workspace.

</Tab>


</TabList>

## Share Preferred Pricing for a Site

### Existing Site

Agencies should follow the steps below to share Preferred Pricing of an existing site with a new client. 

1. Go to the Professional Workspace containing the site.

1. Open the Site Dashboard for the site.

1. Click the **Billing** tab.

1. Click **Transfer Site** and enter the email address associated with the account to which you want to send an invitation to pay.

1. Click **Send Request**. 

  A link is immediately sent to the email address to pay through the secure site.

### New Site

Agencies should follow the steps below to maintain Preferred Pricing through a plan change. 

1. Go to the Professional Workspace containing the site.

1. Open the Site Dashboard for the site.

1. Click the **Billing** tab.

1. Click **View All Plans**, then click **Select** for the plan you want.

1. Click **Pay Annually** or **Pay Monthly** to set the billing frequency > click **Continue**.

1. Click **Transfer Site** and enter the email address associated with the account to which you want to send an invitation to pay.

1. Click **Send Request**. 

  A link is immediately sent to the email address to pay through the secure site.


  <Alert title="Note" type="info">

  A site transferred as a Sandbox will not receive Preferred Pricing. A site plan and billing preference (Annual or Monthly) must be selected prior to sending your client a payment invitation.

  </Alert>

After the person has accepted the invitation and has paid for the site, they will receive the next invoice at the end of the billing cycle.

## Delete Sites

At some point, you may need or want to delete one of your sites on Pantheon. The number of free sites you can create is increased after a free site is deleted, or after it has converted to a paid plan.

Only the site's "User in Charge" or "Owner" can delete a site. Refer to [Roles and Permissions](/guides/account-mgmt/workspace-sites-teams/teams#roles-and-permissions) for more information.

<Alert title="Warning" type="danger">

This action is permanent and irreversible. Export any needed content, code, or files from the site before starting this operation.

**Before you delete a site**: Downgrade the site plan to Sandbox. Refer to [Manage Site Plans](/guides/account-mgmt/plans/manage) for more information.

**After you delete a site that had a live domain or subdomain**: Update the DNS records to avoid pointing to the deleted site.

</Alert>


### Delete a site from the Site Dashboard

1. Open the Site Dashboard for the site.

1. Select **Settings**, and then select **Delete Site**.

1. Click the **Delete Site** button.

1. Enter the site title; this ensures you're aware of the site you're deleting.

1. Click **Delete This Site**.

### Delete a site from a Workspace

1. Go to the Professional Workspace containing the site.

1. Select the checkbox next to the site(s) you want to delete.

1. Click **More Actions**, then select **Delete Site**.

1. Type **Delete**.

1. Click **Delete Site(s)**.

### Delete a Site with Terminus

Run the following [Terminus](/terminus) command, replacing `<site>` with your site's name:

```bash{promptUser: user}
terminus site:delete <site>
```

<Alert title="Note" type="info">

You can see a list of all your sites by running `terminus site:list`.

</Alert>


### Delete a Multidev Environment

Refer to the [Delete a Branch Environment](/guides/multidev/delete-multidev) section of our Multidev guide for more information.

## Retrieve the Site UUID

Every entity (user, workspace, product, and site) is assigned a UUID which is internal to Pantheon. The UUID is found within the URL for the entity and resembles the following:

```none
de305d54-75b4-431b-adb2-eb6b9e546014
```

You can also use [Terminus](/terminus) to find the UUID of your workspaces:

```bash{promptUser: user}
terminus site:list
```
