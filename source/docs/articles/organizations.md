---
title: Organizations
description: Detailed information on Pantheon organization types and the features available to them.
category:
- managing
keywords: pantheon, pantheon for agencies, org, organization, org dashboard, change management
---
Organizations on Pantheon bring together users, sites, custom upstreams,  support, and Multidev to provide administrators with the tools needed to effectively manage a large number of sites. Enterprise clients should contact their sales representatives for service levels and feature availability. Partner organizations can [sign up for free](https://pantheon.io/agency) and learn more about plans offered in our [Partner Program Guide](http://pantheon.io/sites/default/files/Partner_Program_Guide_2015.pdf).
## The Organization Dashboard
Access the [Organization Dashboard](/docs/articles/organizations/pantheon-for-agencies/#tour-the-dashboard) in the following ways:

- From the User Dashboard, click the **Organizations** tab.
- From the Site Dashboard, click the Organization's name next to your site's service level.
- From any Dashboard location, hit the "s" keyboard shortcut to toggle a list of sites and organizations.


## Multidev
All sites associated with any Partner organization will have [Multidev](/docs/articles/sites/multidev) enabled with up to 10 environments at their disposal.

## Change Management

Organizational roles propagate to sites within. All organization members can create sites, but only admins and site owners can delete them. Enable only Team Members and Administrators to deploy code to the Test and Live environments, and restrict the Developer role from doing so. [Learn More](/docs/articles/organizations/change-management).

## Custom Upstreams

[Custom Upstreams](/docs/articles/organizations/running-a-custom-upstream) are Git forks of Pantheon's versions of Drupal and WordPress, owned and managed by organizations. They are available for all members of the organization to select when starting a new site. Reseller partners customers deliver SAAS products built with Drupal or WordPress, automatically creating a new site for each of their clients.

Ally Partners do not qualify for custom upstreams or free sites.

### Organization UUID
Every user, organization, product and site is assigned a UUID which is internal to Pantheon. The organization UUID is found within the URL for the organization Dashboard and resembles the following:
```
de305d54-75b4-431b-adb2-eb6b9e546014
```
You can also use [Terminus](https://github.com/pantheon-systems/cli) to find the UUID of your organizations:

```
$ terminus organizations list
```


## More Resources

- [Pantheon for Agencies](/docs/articles/organizations/pantheon-for-agencies)
- [P4A FAQ](/docs/articles/organizations/pantheon-for-agencies/faq)
