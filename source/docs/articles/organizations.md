---
organizations: true
use: [organizations]
title: Organizations
layout: landing
description: Detailed information on Pantheon organization types and the features available to them.
category:
- managing
keywords: pantheon, pantheon for agencies, org, organization, org dashboard, change management
---

Pantheon Organizations bring together users, sites, custom upstreams, and support tickets; and provide administrators with the tools needed to effectively manage a large number of sites.
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
Access the [Organization Dashboard](/docs/articles/organizations/dashboard) in the following ways:

- From the User Dashboard, click the **Organizations** tab.
- From the Site Dashboard, click the Organization's name next to your site's service level.
- From any Dashboard location, hit the "s" keyboard shortcut to toggle a list of sites and organizations, and click  the Organization name.

All Organization Dashboards have five tabs: Sites, People, Upstreams, Support, and Settings.
 ![The Organization dashboard, site tab](/source/docs/assets/images/organization-dashboard-tour.png)

### Sites

The Sites list shows all sites your organization has access to. You can quickly tag, sort, and filter your sites. All of the people in the organization will have access to all of the sites. You can add users to specific sites by checking the box to select the site and clicking **Team** > **Add to Team**. For more details, see
[Managing Sites and Teams with the Pantheon Organization Dashboard](/docs/articles/organizations/dashboard/#add-sites-to-your-organization).

### People

View all of your collaborators, filter them by role, manage their roles, and add new users to your organization.
[Learn how to add users to the organization](/docs/articles/organizations/dashboard/#add-users-to-your-organization).

### Upstreams

[Custom Upstreams](/docs/articles/organizations/running-a-custom-upstream) are Git forks of Pantheon's versions of Drupal and WordPress, owned and managed by organizations. Members of the organization can select your upstream starting a new site, and the site will track it to receive updates to core and common code.

Ally Partners and Pantheon EDU customers do not qualify for custom upstreams.

[Learn more about custom upstreams](/docs/articles/organizations/running-a-custom-upstream/).

### Support
Review, open, or reply to support tickets associated with your organization and its sites. [Learn about our Scope of Support](/docs/articles/scope-of-support).

### Settings

Upload a logo (85 x 85 px). Enterprise and EDU+ Administrators can add payment and terms of service information.

## Features
All organizations have Multidev and Change Management. Ally Partners and Pantheon EDU customers do not qualify for custom upstreams, custom base domains, email domains, or single sign-on (SSO).

### Multidev for All Sites
All sites associated with any organization will have [Multidev](/docs/articles/sites/multidev) enabled with up to 10 active environments to use. All organization members have access to these environments; team members of a site who are not members of the supporting organization will not have access to Multidev environments, unless the site service level includes it (Business and Elite sites, and those owned by an Enterprise organization).

### Change Management

User roles at the organization level determine their level of access to sites supported or owned by the organization. [Learn more about change management](/docs/articles/organizations/change-management).

### Custom Base Domains
Organizations can run site environments using their own base domains, like sites.myorganization.com, instead of using pantheon.io. [Learn more about custom base domains](/docs/articles/organizations/base-domains).

### Email-Based Registration
New users who sign up with the email address domain you specify will be automatically added to your organization.

### Single Sign-On (SSO)
SSO allows users to authenticate against your Identity Provider (IdP) when logging into the Pantheon Dashboard. [Learn more about SSO with SAML](/docs/articles/organizations/sso).


## Retrieving the Organization UUID
Every entity (user, organization, product and site) is assigned a UUID which is internal to Pantheon. The UUID is found within the URL for the entity and resembles the following:

```
de305d54-75b4-431b-adb2-eb6b9e546014
```
You can also use [Terminus](/docs/articles/local/cli/) to find the UUID of your organizations:

```
$ terminus organizations list
```


## Next Steps

- [Create a Site](/docs/articles/sites/create)
- [Migrate Sites to Pantheon](/docs/articles/sites/migrate)
- Read the [FAQs](/docs/articles/organizations/faq)
