---
title: Pantheon Organizations FAQs
description: Commonly asked questions and answers about Agency Partner Organizations using the Pantheon Platform.
tags: [tools]
categories: []
---
## Multidev

### What is the benefit of Multidev?

[Multidev](/docs/multidev/) allows you to seamlessly collaborate on your website development projects, without coordinating local environments or trying to achieve parity with everyone’s local vagrant instance and the production server.

### How does Multidev work?

Creating a Multidev environment creates an application server, a database server, and connects them to backing services. It creates a Git branch of your codebase from of master, and checks it out in the Multidev environment's application server. It clones the database from the specified environment into the new database server, and clones the filesystem similarly. The new Multidev environment has a unique URL, and behaves the same as the Development environment, with the ability to receive code changes via Git pushes or SFTP file uploads. Multidev environments cannot have custom domains.


## Change Management

From within the [Organization Dashboard](/docs/organization-dashboard/), you can assign [organization](/docs/organizations) members one of three roles: Administrator, Team Member, and Developer. Developers in an organization can commit code to Multidev and Development environments, but cannot deploy code or clone databases and files into Test or Live environments.

### Can I Restrict Access to a Specific Site with the Developer Role?
Only sites owned by Enterprise and EDU+ can assign the developer role to specific users. Partner Organizations cannot specify which members have access to specific sites.

### How is site ownership determined?
The person who creates the site owns it until someone else starts paying for it. The user or Enterprise Organization who pays for the site is the owner thereafter.

### Where can I learn more about these roles?

See [Role-Based Permissions & Change Management](/docs/change-management) for details.

### How do we add new sites to an Organization?

When you or the administrators, team members, or developers in your agency [create sites](https://dashboard.pantheon.io/sites/create), you have the option of associating it with your organization. Once there, all members of the organization can access the Site's Dashboard from the Organization Dashboard.

## Support
### Why do login attempts fail for all users across my organization simultaneously?
Any large agency that has multiple developers who login frequently via username/password will trigger failed logins for everyone else who works on the site. This occurs despite everyone using the right password and even when one user logins in and out successfully 3 times.

As a workaround, we recommend following development best practice workflows by [authenticating via SSH key for password-less access](/docs/ssh-keys).



### Why can't I access Multidev on my site when the Supporting Organization can use it?
Only organizational team members and administrators of an Supporting Organization with Multidev will be able to use this feature. If you would like to add Multidev at the site level, you can do so by upgrading to a Business or Elite plan. Site team members who are associated with site but not the agency can access Multidev environments via the unique URL, but will not be able to commit code to them.

### Why can't my Agency Organization own a site?
Pantheon Enterprise Organizations are able to own sites; Pantheon Partner Organizations cannot. This is because an agency's role is to develop, service, and maintain a site on behalf of its owner. See our [Change Management](/docs/change-management/#manage-people-in-an-organization) doc for more details.

### Can I add my own Agency as a Supporting Organization to a client's site?

No. Only the owner of the site can add an agency as a Supporting Organization. This action grants all members of the organization access to the site. You should ask site owners to add your agency as a Supporting Organization if you are providing services to the site.

### What privileges and roles are granted when adding a Supporting Organization?
All organization members have access to the site, with permissions determined by their roles at the organization level.

### Can the site owner override privileges and access for orgnizational team members of a Supporting Organization?
Yes, but only for sites owned by Enterprise or EDU+ organizations. Roles designated on the Site Team modal will override any roles assigned within the organization.

### Do you have a status page?
Yes. Please follow [@pantheonstatus](https://twitter.com/pantheonstatus) on twitter and bookmark [status.getpantheon.com](http://status.getpantheon.com).

### How do I submit a support request when the Dashboard is down?
If you need to submit a support request and can’t access the Dashboard, send an email to helpdesk@pantheon.io.

### As a Partner, do I get enhanced support?

No. However, opening support requests from your **Organization Dashboard Support tab** and checking the box for "Non-site related issue" will direct your request to a specific agent ready to respond to your questions.

Support is prioritized based on site service levels as follows:

1. Elite
2. Business
3. Professional
4. Personal
5. Sandbox

## Unsupported

### Can we run our Joomla, Magento, Laravel (insert other PHP framework here)?
No, we don’t support them.
