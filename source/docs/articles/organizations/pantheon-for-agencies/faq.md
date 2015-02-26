---
title: Pantheon for Agencies Frequently Asked Questions
description: A collection of anticipated and commonly asked questions and answers about Partner Organizations on the Platform.
category:
- managing

---

## Multidev

### Is Multidev automatic?

Yes. All sites developed with your agency on the team are equipped with up to 10 Multidev Cloud Development Environments (CDEs). Site owners who are not members of your agency do not have access to work on these environments. They can load the URL's for sign-off on the features you develop, but Multidev is a feature for agencies.

### What is the benefit of Multidev?

Multidev allows you to more seamlessly collaborate on your website development projects, without coordinating local environments or trying to achieve parity with everyone’s local vagrant instance and the production server.

### How does Multidev work?

Forking a CDE creates an application server, a database server, and connects them to backing services. It creates a git branch of your codebase off of master, and checks it out in the CDE's application server. It clones the database from the **Development Environment** into the new database server, and clones the filesystem similarly. The new CDE has a unique URL, and behaves the same as the **Development Environment**, with the ability to receive code changes via git pushes or SFTP file uploads.

## Change Management

Pantheon Partner members can be assigned to three roles; Administrators, Team Members, and Developers.


### How is site ownership determined?
The person who creates the site owns it until someone else starts paying for it. The user or Enterprise Organization who pays for the site is the owner thereafter.

### Where can I learn more about these roles?

Our [Change Management documentation](/docs/articles/organizations/change-management).

### How do we add new sites to an Org?

When you or the administrators, team members, or developers in your agency [create sites](https://dashboard.pantheon.io/sites/create), you have the option of associating it with your agency. Once there, all members of the org can access it from the organization dashboard.

## Support

### Do you have a status page?
Yes. Please follow [@pantheonstatus](https://twitter.com/pantheonstatus) on twitter and bookmark [status.getpantheon.com](https://status.getpantheon.com).

### How do I submit a ticket when the dashboard is down?
If you need to submit a ticket and can’t access the dashboard, send an email to helpdesk@getpantheon.com.

### As a Partner do I get enhanced support?

No. However, opening tickets from your **Organization Dashboard Support Tab** and checking the box for "Non-site related issue" will direct your request to a specific agent ready to respond to your questions.

Support is prioritized based on site service levels as follows:

1. Enterprise
2. Business
3. Professional
4. Personal
5. Sandbox

## Unsupported

### Can we run our Joomla, Magento, Laravel (insert other PHP framework here)?
No, we don’t support them.
