---
title: Pantheon for Agencies FAQ
description: Commonly asked questions and answers about Agency Partner Organizations using the Pantheon Platform.
category:
- managing
keywords: agency, p4a, multidev, change management, site owner, ownership, supporting organization, organizations, team, roles, privileges, support, partner support, ticket
---
## Multidev

### What is the benefit of Multidev?

Multidev allows you to more seamlessly collaborate on your website development projects, without coordinating local environments or trying to achieve parity with everyone’s local vagrant instance and the production server.

### How does Multidev work?

Forking a CDE creates an application server, a database server, and connects them to backing services. It creates a Git branch of your codebase off of master, and checks it out in the CDE's application server. It clones the database from the Development environment into the new database server, and clones the filesystem similarly. The new CDE has a unique URL, and behaves the same as the Development environment, with the ability to receive code changes via Git pushes or SFTP file uploads.


## Change Management

Pantheon Partner members can be assigned to three roles; Administrators, Team Members, and Developers.


### How is site ownership determined?
The person who creates the site owns it until someone else starts paying for it. The user or Enterprise Organization who pays for the site is the owner thereafter.

### Where can I learn more about these roles?

Please see our [Change Management documentation](/docs/articles/organizations/change-management).

### How do we add new sites to an Organization?

When you or the administrators, team members, or developers in your agency [create sites](https://dashboard.pantheon.io/sites/create), you have the option of associating it with your Agency. Once there, all members of the Organization can access it from the Organization Dashboard.

## Support

### Why does my Agency Organization have Change Management and Multidev, but not other Organizations I administer?
All Organizations that are Partners or Allies will have Change Management and Multidev. If your Organization is an Enterprise, then by default these features are not enabled. To request the activation of Multidev and Change Management for Enterprise organizations, please [contact sales](https://pantheon.io/contact-us).

### Why can't I access Multidev on my site when the Supporting Organization has the feature enabled?
Only team members and administrators of an Supporting Organization with Multidev will be able to use this feature. If you would like to add Multidev at the site level, you can do so by upgrading to a Business or [Enterprise](https://pantheon.io/contact-us) plan. Team members who are associated with site but not the agency can access multidev environments via the unique URL, but will not be able to commit code to them.

### Why can't my Agency Organization own a site?
Depending on your service level, your Organization may or may not be able to own a site directly. Pantheon for Enterprise level Organizations will be able to own sites, however Pantheon for Agencies (Partners) Organizations will not. This is because an agency's role is to develop, service, and maintain a site on behalf of it's owner. See our [Change Management](/docs/articles/organizations/change-management/#managing-people) doc for more details.

### Can I add my own Agency as a Supporting Organization to a client's site?
No. At this time, it is up to the owner of the site to add your agency as a Supporting Organization. This action grants all members of the organization access to the site. You should ask site owners to add your agency as a Supporting Organization if you are providing services to the site.

### What privileges and roles are granted when adding a Supporting Organization?
Members and roles of the Organization trickle down to the site. All Organization members can access all sites associated with the organization.

### Can the Site Owner override privileges and access for team members of a Supporting Organization?
Yes. Roles designated on the Team page at the site level will override any roles assigned within the Organization.

### Do you have a status page?
Yes. Please follow [@pantheonstatus](https://twitter.com/pantheonstatus) on twitter and bookmark [status.pantheon.io](https://status.pantheon.io).

### How do I submit a ticket when the dashboard is down?
If you need to submit a ticket and can’t access the Dashboard, send an email to helpdesk@pantheon.io.

### As a Partner, do I get enhanced support?

No. However, opening tickets from your **Organization Dashboard Support tab** and checking the box for "Non-site related issue" will direct your request to a specific agent ready to respond to your questions.

Support is prioritized based on site service levels as follows:

1. Enterprise
2. Business
3. Professional
4. Personal
5. Sandbox

## Unsupported

### Can we run our Joomla, Magento, Laravel (insert other PHP framework here)?
No, we don’t support them.
