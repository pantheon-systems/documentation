---
title: Workspaces, Sites and Teams
subtitle: Sites
description: Learn how to manage your sites.
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

## Creating Sites

<Alert title="Note" type="info" >

Be sure to set up workspaces before creating sites.

</Alert>

<Partial file="create-new-site-new-dash.md" />

## Using the Sites Dashboard

The Sites tab shows all sites your organization has access to. You can quickly tag, sort, and filter your sites. All of the people in the organization will have access to all of the sites. You can add users to specific sites by checking the box to select the site and clicking **Team** > **Add to Team**.

Agency organizations will show "Site Owners" instead of "Users in Charge"

A **<span class="glyphicons glyphicons-snowflake" style="color:#0a6bb5"></span>** icon in the site's status column indicates that a site is [frozen due to inactivity](/guides/platform-considerations/platform-site-info#inactive-site-freezing).

For more details on the Sites tab, refer to
[Managing Sites and Teams with the Pantheon Organization Dashboard](/guides/legacy-dashboard/org-dashboard).

## Tagging Sites


## Exporting a List of Sites

## Changing Site Ownership

The permission to manage a site's plan is granted only to the roles of **Site Owner** / **Organization Administrator**. Other roles do not have access to change the site plan as described on this page. For details, see [Role-Based Permissions & Change Management](/change-management/#site-level-roles-and-permissions).

<Alert title="Note" type="info">

If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/guides/legacy-dashboard/site-billing#transfer-ownership-and-billing-for-this-site).

</Alert>

Site ownership is assigned to the person who creates the site or pays for the site. The site owner cannot be removed from the site team.

### Change the Site Owner

#### Sandbox Sites

<Partial file="transfer-ownership-billing-intro.md" />
<Partial file="transfer-ownership-billing-steps.md" />

#### Paid Sites

To change the owner of a paid site (e.g. Basic, or Performance), you'll need to update the billing information by clicking **Invite a business owner to pay for this site** within the Settings page of the Site Dashboard. Enter the email address for the new site owner. Once the new owner receives the invitation they will be directed to provide payment information, at which point they will assume ownership of the site and will receive future invoices.

![The new site owner adds their credit card information in order to accept payment responsibility.](../images/dashboard/payment-form-invite.png)

Enterprise Organizations can use the same process to assume ownership of a site; however, Agency Partners do not have the ability to own sites directly.


## Deleting Sites

At some point, you may need or want to delete one of your sites on Pantheon. The number of free sites you can create is increased after a free site is deleted, or after it has converted to a paid plan.

Only the site's "User in Charge" or "Owner" can delete a site. See [Roles and Permissions](/change-management#roles-and-permissions) for more information.

<Alert title="Warning" type="danger">

This action is permanent and irreversible. Export any needed content, code, or files from the site before starting this operation.

**Before you delete a site**: Downgrade the site plan to Sandbox. See [Manage Site Plans](/guides/legacy-dashboard/site-plan) for more information.

**After you delete a site that had a live domain or subdomain**: Update the DNS records so that they don't continue to point to the deleted site.

</Alert>

#/## Delete a Site Using the Pantheon Site Dashboard

1. Select **Settings** > **Delete Site**.
1. Click the **Delete Site** button.

  ![Site Dashboard Operations Delete Site](../images/dashboard/delete-site.png)

1. Enter the site title; this ensures you're aware of the site you're deleting.
1. Click **Delete**.

  ![Site Dashboard Operations Delete Site Confirm](../images/dashboard/delete-site-confirm.png)

### Delete a Site From the Organization Dashboard

1. Select the checkbox next to the site you want to delete.
1. Click **Operations**, and select **Delete Site**.

  ![Organization Dashboard Operations Delete Site](../images/dashboard/org-delete-site.png)

1. Type **Delete**.
1. Click **Delete Site(s)**.

  ![Organization Dashboard Operations Delete Site Confirm](../images/dashboard/org-delete-site-confirm.png)

### Delete a Site with Terminus

Run the following [Terminus](/terminus) command:

```bash{promptUser: user}
terminus site:delete <site>
```

<Alert title="Note" type="info">

Replace `<site>` with your site name. You can see a list of all your sites by running `terminus site:list`.

</Alert>

  ![Delete Site via Terminus](../images/delete-site-terminus.png)

### Delete a Multidev Environment

Refer to the [Delete a Branch Environment](/guides/multidev/delete-multidev) section of our Multidev guide for more information.
