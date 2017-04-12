---
title: The Site Dashboard
description: Learn how to use the Pantheon Site Dashboard to build and manage your Drupal or WordPress sites.
tags: [dashboard]
categories: [getstarted]
---
The Site Dashboard is where you can find all the tools you need to successfully build, launch, and manage your site.

![Site Dashboard](/source/docs/assets/images/dashboard/site-dashboard-image.png)

At the top of the page you'll find all the environments for your site: Dev, Test, and Live. Additional development environments are available with [Multidev](/docs/multidev/).

The **Visit Site** button is available for each environment so you can view the site in each environment. This helpful to view changes in Dev or Test before moving them to Live.
## Team
The Team tab allows you to change the site owner; add supporting agencies; and add, manage, and delete users. For more information, see [Team Management](/docs/team-management/).

##Settings
### Plan and Billing
Here you can select or change your plan and payment method. For more information, see [Select a Plan](/docs/select-plan/).

### Add-Ons
Pantheon offers several add-ons to help you build dynamic sites. These include [Apache Solr](/docs/solr/) and [Redis](/docs/redis/).

### Delete Site
If you no longer need your site, you can remove it here.
<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p>This is a permanent change and once you delete it your site cannot be restored.</p></div>

### About Site
This tab shows general information about your site, such as the framework, upstream, date it was created, and your current plan.

#### View your Site's Upstream
To find a link to your site's upstream, click **Settings**, then **About Site**.

![Upstream link](/docs/assets/images/dashboard/upstream-link.png)


### PHP Version
The site default PHP version is applied to every environment unless a PHP version is explicitly selected for each environment. For more information, see [Upgrading PHP Versions](/docs/php-versions/).

## Support
If you need assistance, our expert Customer Support team is here to help make building and managing your sites easier. You can [contact support](/docs/getting-support) from your Dashboard.

##Security Indicator
This indicates if your site is public or locked. You can set a common password for accessing this environment to add an extra layer of security to prevent unwanted access to this environment. Learn more about [Locking Your Site](/docs/lock-environment/).

## Connection Information
Here you can find the [SSH clone URL](/docs/git/), [Database Connection Information](/docs/mysql-access/), and [SFTP](/docs/sftp/) connection information.

## Code
The core of the Pantheon Workflow is to move code up from Dev to Test to Live and content down from Live to Test to Dev.

- **Code** includes plugins, modules, themes, CSS, JS—anything that's under Git version control.
- **Content** includes files not under Git version control, like images and pdfs, and the database.

The [Code tool](/docs/code) on Dev/Multidev environments includes a Connection Mode toggle to switch between SFTP and Git. The Code tool on the Test and Live environments displays a Commit Log that displays all the commits that are on the environment.

Learn how to use the [Pantheon workflow](/docs/pantheon-workflow/) to manage your site's code.

## Merge
Visit this tab in the Dev environment when you have commits from Multidev environments that you need to merge into Test or Live.

## Status
Pantheon provides static site analysis as a service for your site to make best practice recommendations on site configurations and to help detect common problems. This mechanism does not perform requests on your site, and in doing so avoids the observer effect. It's non-intrusive, so no installation or configuration is required. Finally, it's completely automated for consistent reports and results. Learn more about our Launch Check for
[Drupal sites](/docs/drupal-launch-check/) or [WordPress sites](/docs/wordpress-launch-check/).

## Database / Files
###Clone
Use this tool to clone database and files from an environment.

###Import
You can import an archive of site files or a MySQL database via URL or file upload.

###Export
With the Export tool, you can export the database or files from an environment to use in local development or a migration process. These exports are available for 365 days from the time of creation.

###Wipe
Use this tool if you need to completely wipe your database and files for a single environment. Wiping completely resets the database and files and you will lose all content for that specific environment. For example, if you wipe the Dev environment, Test and Live are not affected. You will then need to import the database and files from a backup, clone them from another environment, or re-install Drupal or WordPress for that environment.

Learn more about the [Pantheon Workflow](/docs/pantheon-workflow/).

## Errors
All PHP errors are shown on this tab. If any are found, recommendations are made. Learn more about [PHP Errors and Exceptions](/docs/php-errors/).

## Domains / HTTPS
Use the [Domains/HTTPS tab](/docs/domains) to add the custom domain(s) you would like pointed to this environment. You can also enable or disable HTTPS for an environment. If you choose to enable HTTPS, you must generate a private key and get your certificate from a recognized certificate authority. For more details, see [Enable Secure HTTPS Communication](/docs/enable-https/).

## Backups
On this tab you can create backups, restore from an existing backup, or view the backup log to see a list of your prior backups. For detailed information, see [Backups](/docs/backups).

## Security
Set a common password for accessing an environment to add an extra layer of security to prevent unwanted access to an environment. For more details, see [Locking Your Site](/docs/lock-environment/).

## Site UUID
Every user, organization, product and site is assigned a UUID which is internal to Pantheon. The site UUID is found within the URL for the site Dashboard and resembles the following:

```
de305d54-75b4-431b-adb2-eb6b9e546014
```
You can also use Terminus to find the UUID of any site on your user Dashboard:
```bash
terminus site:list
```
For example uses, see the following:

- [Port 2222 Blocked Workaround](/docs/port-2222#set-up-the-tunnel)
- [rsync and sftp](/docs/rsync-and-sftp/#sftp)
- [Secure Connections to Pantheon Services via TLS or SSH Tunnels](/docs/ssh-tunnels/#prerequisites)
