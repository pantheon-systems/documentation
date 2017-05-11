---
title: Organizations
description: Detailed information on Pantheon organization types and the features available to them.
tags: [manage]
categories: []
---

Pantheon Organizations bring together users, sites, Custom Upstreams, and support; and provide administrators with the tools needed to effectively manage a large number of sites.
## Create an Organization
Current users can create their own Pantheon for Agencies and Pantheon EDU organizations by completing the appropriate form:

- [Create a Pantheon for Agencies Organization](https://dashboard.pantheon.io/organizations/create)
- [Create a Pantheon EDU Organization](https://dashboard.pantheon.io/organizations/create-edu)

All other organization service levels must be created by Pantheon.

After completing the form, you have the opportunity to invite collaborators and add existing sites that you own to the organization.

## Organization-Site Association

Organizations can either **own** or **support** sites. Enterprise, Reseller, OEM, and EDU+ organizations own sites. Ally, Partner, Strategic Partner, and EDU organizations support sites. In the Team menu on the Site Dashboard, owning organizations are listed at the top as "Owner", while supporting organizations are listed at the bottom.

When a site is associated with an organization, it provides all privileged users in the organization with access to the site. Association also provides the site with extra features based on the organization service level.

## The Organization Dashboard
Access the [Organization Dashboard](/docs/organization-dashboard) in the following ways:

- From the User Dashboard, click the **Organizations** tab.
- From the Site Dashboard, click the Organization's name next to your site's service level.
- From any Dashboard location, hit the "s" keyboard shortcut to toggle a list of sites and organizations, and click  the Organization name.

All Organization Dashboards have five tabs: Sites, People, Upstreams, Support, and Settings.
 ![The Organization dashboard, site tab](/source/docs/assets/images/dashboard/organization-dashboard-tour.png)

### Sites

The Sites list shows all sites your organization has access to. You can quickly tag, sort, and filter your sites. All of the people in the organization will have access to all of the sites. You can add users to specific sites by checking the box to select the site and clicking **Team** > **Add to Team**. For more details, see
[Managing Sites and Teams with the Pantheon Organization Dashboard](/docs/organization-dashboard/#add-sites-to-your-organization).

### People

View all of your collaborators, filter them by role, manage their roles, and add new users to your organization.
[Learn how to add users to the organization](/docs/organization-dashboard/#add-users-to-your-organization).

### Upstreams

[Custom Upstreams](/docs/custom-upstream) are Git forks of Pantheon's versions of Drupal and WordPress, owned and managed by organizations. Members of the organization can select your upstream starting a new site, and the site will track it to receive updates to core and common code.

### Support
Review, open, or reply to support requests associated with your organization and its sites on the Support tab. Learn about [how to get support](/docs/getting-support).

If you need expedited, on-call support, and are an Enterprise customer, Pantheon for EDU+ organization, or Agency Reseller, consider upgrading to [Priority Enterprise Support](https://pantheon.io/priority-enterprise-support).

### Settings

Upload a logo (85 x 85 px). Enterprise and EDU+ Administrators can add payment and terms of service information.

## Features
All organizations have Multidev and Change Management. Ally Partners and Pantheon EDU customers do not qualify for Custom Upstreams, custom Vanity domains, email domains, or single sign-on (SSO).

### Multidev for All Sites
All sites associated with any organization will have [Multidev](/docs/multidev) enabled with up to 10 active environments to use. All organization members have access to these environments; team members of a site who are not members of the supporting organization will not have access to Multidev environments, unless the site service level includes it (Business and Elite sites, and those owned by an Enterprise organization).

### Change Management

User roles at the organization level determine their level of access to sites supported or owned by the organization. [Learn more about change management](/docs/change-management).

### Vanity Domains
Organizations can run site environments using their own custom Vanity domains, like `sites.myorganization.com`, instead of using `pantheonsite.io`. [Learn more about Vanity domains](/docs/vanity-domains).

### Email-Based Registration
New users who sign up with the email address domain you specify will be automatically added to your organization.

### Single Sign-On (SSO)
SSO allows users to authenticate against your Identity Provider (IdP) when logging into the Pantheon Dashboard. [Learn more about SSO with SAML](/docs/sso-organizations).


## Retrieving the Organization UUID
Every entity (user, organization, product and site) is assigned a UUID which is internal to Pantheon. The UUID is found within the URL for the entity and resembles the following:

```
de305d54-75b4-431b-adb2-eb6b9e546014
```
You can also use [Terminus](/docs/terminus/) to find the UUID of your organizations:

```
$ terminus org:list
```


## Next Steps

- [Create a Site](/docs/create-sites)
- [Migrate Sites to Pantheon](/docs/migrate)
- Read the [FAQs](/docs/organization-faq)
