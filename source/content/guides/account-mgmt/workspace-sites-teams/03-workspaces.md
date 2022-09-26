---
title: Workspaces, Sites and Teams
subtitle: Professional Workspaces
description: Learn how to manage and use workspaces.
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

<dl>
    <dt>Personal Workspace</dt>
    <dd>The personal workspace displays tools for the sites to which you have access, your account tier, and billing for sites you own.  You have only one personal workspace.  We cover this workspace in the [Accounts](/docs/guides/account-mgmt/account) guide.</dd>
    <dt>Professional Workspace</dt>
    <dd>Professional workspaces bring together users, sites, tools, and support to allow administrators to effectively manage a large number of sites. You may be a part of no workspaces, or many workspaces, depending on your company setup.</dd>
</dl>

## Professional Workspace features

- [Multidev](/docs/guides/multidev)

- [Change Management](/docs/guides/account-mgmt/workspace-sites-teams/teams)

- [Vanity Domains](/docs/guides/domains/vanity-domains)

- Email-Based Registration: New users who sign up with the email address domain you specify will be automatically added to your organization.

- [Email Notifications](#platform-email-notifications)

- [Single Sign-On](/docs/sso-organizations)


## Create a Workspace

The following process will create a Silver workspace. For additional collaboration tools such as Multidev and visual regression testing, upgrade to a Gold workspace.

If you are creating the Workspace for a web agency, you will be assigned a [Partner Trial Tier](https://pantheon.io/plans/partner-program). If the Workspace is not for an agency, you will be assigned a [Silver Tier Workspace](https://pantheon.io/plans/pricing).

You can create as many workspaces as necessary for your organization. 

To create a Professional Workspace:

1. Select your gravatar in the upper left corner, then select **Create New Workspace**.

1. Enter the information, and optionally, upload a logo, for the workspace, and click **Continue**.

1. You now have the option to invite team members.  You can skip this step by clicking **Continue**.

## Retrieve the Workspace UUID

Every entity (user, organization, product and site) is assigned a UUID which is internal to Pantheon. The UUID is found within the URL for the entity and resembles the following:

```none
de305d54-75b4-431b-adb2-eb6b9e546014
```

You can also use [Terminus](/terminus) to find the UUID of your organizations:

```bash{promptUser: user}
terminus org:list
```


## Platform Email Notifications

<Partial file="pantheon-email-notifications.md" />


## Switch Between Workspaces

If you're a member of multiple [Organizations](/organizations), you can stay logged in, and switch between Workspaces to work on different projects.

Click your gravatar upper left to switch between Workspaces:

![Workspace switcher shows a personal and Agency workspace](../../../../images/dashboard/new-dashboard/workspaces-selector.png)

## Customize a Workspace

You can customize the following for a Workspace

- The name and icon of the organization workspace.
  
- Add optional payment and terms of service information for Sites built in your Workspace.

To customize a Professional Workspace, go to the Workspace you wish to customize, then click the **Settings** tab.

## Delete a Workspace

Workspaces cannot be deleted.

## FAQ

### How do we add new sites to a Professional Workspace?

See [Sites](/docs/guides/account-mgmt/workspace-sites-teams/sites) for more information.

### Why do login attempts fail for all users across my Workspace simultaneously?

Any large agency that has multiple developers who login frequently via username/password will trigger failed logins for everyone else who works on the site. This occurs despite everyone using the right password and even when one user logins in and out successfully 3 times.

As a workaround, we recommend following development best practice workflows by [authenticating via SSH key for password-less access](/ssh-keys).

### Why can't I access Multidev on my site when the Supporting Organization can use it?

Only organizational team members and administrators of a Supporting Organization with Multidev will be able to use this feature. Site team members who are associated with the site but not the agency can access Multidev environments via the unique URL, but will not be able to commit code to them.

### Why can't my Agency Organization own a site?

Enterprise, Reseller, OEM, and EDU+ organizations own sites. Registered Agencies, Pantheon Partners, Premier Pantheon Partners, Strategic Pantheon Partners, and EDU organizations support sites. This is because an agency's role is to develop, service, and maintain a site on behalf of its owner. Read more about owning and supporting sites in our [Organizations](/organizations/#organization-site-association) doc.

### Can I add my own Agency as a Supporting Organization to a client's site?

No. Only the owner of the site can add an agency as a Supporting Organization. This action grants all members of the organization access to the site. You should ask site owners to add your agency as a Supporting Organization if you are providing services to the site.

### What privileges and roles are granted when adding a Supporting Organization?

All organization members have access to the site, with permissions determined by their roles at the organization level.

### Can the site owner override privileges and access for organizational team members of a Supporting Organization?

Yes, but only for sites owned by Enterprise or EDU+ organizations. Roles designated on the Site Team modal will override any roles assigned within the organization.

### As an Agency, how many sandbox sites do members of an organization receive?

Each member of an organization can create up to 10 Sandbox sites. When the limit of 10 is reached, taking a site live or deleting unused sites will free up additional Sandbox slots.

