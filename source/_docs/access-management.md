---
title: Access Management for Site Owners and Administrators
description: Learn how to remove a team member or outside resource from a Pantheon site.
tags: [manage]
categories: []
---

When a person with access to your site(s) on the platform leaves the company or project, it is important to immediately remove them from the team so that they no longer have access to make changes to your site.

After a user leaves, we recommend you:

- Delete or block the user's account in [Drupal](https://www.drupal.org/node/627158) or [WordPress](https://codex.wordpress.org/Users_Users_SubPanel).
- Remove the user from the team and/or organization in the Pantheon Dashboard.
- Change any shared account passwords the user may have had access to.
- Review the Git history in the commit log to see if the site team member made code changes after leaving. See recommendations from [Drupal](https://www.drupal.org/node/2365547) and [WordPress](https://codex.wordpress.org/FAQ_My_site_was_hacked).

## Remove a Team Member from a Site
When you delete a user from a site, they lose the ability to perform any site operations via the Dashboard or Terminus.

To remove a team member from a site, [follow these steps](/docs/team-management/#remove-a-team-member).

## Remove a Person from an Organization
When you delete a user from an organization, they lose the ability to perform any operations on the sites within the organization. Only admin roles can remove people from organizations.

1. From the Organization Dashboard, click the **People** tab.
2. Select the box next to the user, and click **Operations**.
3. Select **Remove User**.
4. In the confirmation pop-up, type **remove** and click the **I understand the consequences, remove this user** button.

## Remove a Site Owner

When a developer creates a site in a partner organization, they automatically become the "Site Owner/User in Charge" until the business owner starts paying for the site and becomes the owner. Organization admins cannot delete users from an organization until they no longer own any sites in the organization. The user account in question must [transfer ownership to another person in the organization](/docs/change-management/#change-site-owner). Partner organization admins cannot change ownership of sites. If the organization is using SAML for single-sign on, you should be able to log-in as the user and make the necessary changes. Partners without SAML will need to [contact support](/docs/getting-support) to request ownership change, which may take 24-48 hours. As a workaround, admins can download a backup of the site, import it as a new site, move the domain name from the original site to the imported site, and delete the original site(s).

For all sites, we recommend instructing users to change their passwords regularly, using two-factor authentication, restricting access with Change Management, and carefully planning who will create client sites in the organization.

## See Also
[Accessing an Account After the Owner Leaves](/docs/site-access/)  
[Role-Based Permissions & Change Management](/docs/change-management/)  
[Secure Your Site with Two-Factor Authentication](/docs/guides/two-factor-authentication/)  
[Team Management](/docs/team-management)
