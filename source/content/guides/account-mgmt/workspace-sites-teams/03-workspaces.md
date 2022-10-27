---
title: "Workspaces, Sites, and Teams"
subtitle: Professional Workspaces
description: "Learn how to manage and use workspaces."
categories: [account-mgmt]
tags: [workspaces, sites, teams]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/workspace-sites-teams/workspaces
anchorid: workspaces
editpath: docs/guides/account-mgmt/workspace-sites-teams/03-workspaces.md
reviewed: "2022-09-19"
---

Workspaces are a home base for your WebOps.  There are two types of workspaces:

- **Personal Workspace**: The personal workspace displays tools for the sites you own or are a team member of, your account tier, and billing for sites you own.  You have only one personal workspace.  We cover this workspace in the [Accounts](/guides/account-mgmt/account) guide.

- **Professional Workspace**: Professional workspaces bring together users, sites, tools, and support to allow administrators to effectively manage a large number of sites. You may be a part of no workspaces, or many workspaces, depending on your company setup.

## Professional Workspace Features

- [Multidev](/guides/multidev)

- [Change Management](/guides/account-mgmt/workspace-sites-teams/teams)

- [Vanity Domains](/guides/domains/vanity-domains)

- Email-Based Registration: New users who sign up with the email address domain you specify will be automatically added to your workspace.

- [Email Notifications](#platform-email-notifications)

- [Single Sign-On](/sso-organizations)

## Professional Workspace Tiers

Professional workspaces come in three tiers:

- **Silver Workspace:** You will automatically be assigned a [Silver Tier](https://pantheon.io/plans/pricing) workspace. If the workspace is not for an agency, 

- **Gold Workspace:** [Gold Tier](https://pantheon.io/plans/pricing) workspaces provide additional collaboration tools such as Multidev and visual regression testing. [Contact our Sales team](https://pantheon.io/contact-sales) for more information if you are interested in upgrading to a Gold workspace.

- **Partner Trial Tier Workspace:** You will only be assigned a [Partner Trial Tier](https://pantheon.io/plans/partner-program) workspace if you are creating the workspace for a web agency.


## Create a Professional Workspace

You can create as many workspaces as necessary. The following process will create a Silver Tier Professional workspace.

1. Select your gravatar in the upper left corner, then select **Create New Workspace**.

1. Enter the information, upload a logo (optional), and click **Continue**.

1. Invite team members or skip this step by clicking **Continue**.

## Retrieve the Workspace UUID

Every entity (user, workspace, product, and site) is assigned a UUID which is internal to Pantheon. The UUID is found within the URL for the entity and resembles the following:

```none
de305d54-75b4-431b-adb2-eb6b9e546014
```

You can also use [Terminus](/terminus) to find the UUID of your workspaces:

```bash{promptUser: user}
terminus org:list
```


## Platform Email Notifications

<Partial file="pantheon-email-notifications.md" />


## Switch Between Workspaces

If you're a member of multiple workspaces, you can stay logged in, and switch between workspaces to work on different projects.

To switch between workspaces, click your gravatar in the upper left to switch between workspaces:

![Workspace switcher shows a personal and Agency workspace](../../../../images/dashboard/new-dashboard/workspaces-selector.png)

## Customize a Workspace

You can customize the following for a workspace:

- The name and icon of the workspace.

- Payment and terms of service information for Sites built in your workspace.

To customize a Professional Workspace, go to the workspace you wish to customize, then click the **Settings** tab.

## Delete a Workspace

Workspaces cannot be deleted.

## FAQ

### How do we add new sites to a Professional Workspace?

Refer to [Sites](/guides/account-mgmt/workspace-sites-teams/) for more information.

### Why do login attempts fail for all users across my workspace simultaneously?

Any large agency that has multiple developers who login frequently via username/password will trigger failed logins for everyone else who works on the site. This occurs despite everyone using the right password and even when one user logs in and out successfully 3 times.

As a workaround, we recommend following development best practice workflows by [authenticating via SSH key for password-less access](/ssh-keys).

### Why can't I access Multidev on my site when the Supporting Organization can use it?

Only workspace team members and administrators of a Supporting Organization with Multidev can use this feature. Site team members who are associated with the site but not the agency can access Multidev environments via the unique URL, will not be able to commit code to them.

### Why can't my Agency workspace own a site?

Enterprise, Reseller, OEM, and EDU+ workspaces own sites. Registered Agencies, Pantheon Partners, Premier Pantheon Partners, Strategic Pantheon Partners, and EDU workspaces support sites. This is because an agency's role is to develop, service, and maintain a site on behalf of its owner. Read more about owning and supporting sites in [Workspaces, Sites, and Teams](/guides/account-mgmt/workspace-sites-teams).

### Can I add my own Agency as a Supporting Organization to a client's site?

No. Only the owner of the site can add an agency as a Supporting Organization. This action grants all members of the workspace access to the site. You should ask site owners to add your agency as a Supporting Organization if you are providing services to the site.

### What privileges and roles are granted when adding a Supporting Organization?

All members of the Supporting Organization receive the role assigned on the site, regardless of their role in the Supporting Organization.

### Can the site owner override privileges and access for team members of a Supporting Organization?

Yes, but only for sites owned by Enterprise or EDU+ workspaces. Roles designated on the Site Team modal will override any roles assigned within the workspace.

### As an Agency, how many sandbox sites do members of a workspace receive?

Each member of an workspace can create up to 10 Sandbox sites. When the limit of 10 is reached, take a site live or delete unused sites to free up additional Sandbox slots.
