---
title: Pantheon for Agencies Frequently Asked Questions
description: A collection of anticipated and commonly asked questions and answers about Partner Organizations on the Platform.
category:
  - managing

---

## Database

### How can I solve the error “Database is out of sync before you push code?
code freeze, copy to live, push from test to live

## DNS

### I don’t want mysite.pantheon.io environment URL’s. How do I get custom domains on all environments?

## Marketing

### Where do I get marketing material and logos?

### We’re organizing a camp. Will you sponsor, attend, or speak?

Possibly. Please [contact us](/contact-us).

### We heard you'll host our camp/community site for free.

Yes. We host community initiative sites for free. Please complete the form on our [free sites page](https://pantheon.io/free-website-management-platform-beyond-hosting).

## Multidev

### Is Multidev automatic?

Yes. All sites developed with your agency on the team are equipped with up to 10 Multidev Cloud Development Environments (CDEs).

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

For Agency features, yes. Open tickets from your **Organization Dashboard Support Tab** and check the box for "Non-site related issue"

For site support, no. support is prioritized based on site service levels as follows:

1. Enterprise
2. Business
3. Professional
4. Personal
5. Sandbox

## Unsupported

### Can we run our Joomla, Magento, Laravel (insert other PHP framework here)?
No, we don’t support them at this time.
