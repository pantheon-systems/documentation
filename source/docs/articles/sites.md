---
sites: true
use:
  - backups
  - code
  - create
  - database
  - domains
  - files
  - logs
  - migrate
  - newrelic
  - security
  - settings
  - varnish
  - sites
title: The Site Dashboard
layout: landing
landing_subdirs: true
description: Learn how to use the Pantheon Site Dashboard to build and manage your sites.
category:
  - developing
keywords: sites, dashboard, pantheon, get started, settings, new site
---
The Site Dashboard is where you can find all the tools you need to successfully build, launch, and manage your site.

![Site Dashboard](/source/docs/assets/images/site-dashboard-image.png)

At the top of the page you'll find all the environments for your site: Dev, Test, and Live. Additional development environments are available with [Multidev](/docs/articles/sites/multidev/).

The **Visit Site** button is available for each environment so you can view the site in each environment. This helpful to view changes in Dev or Test before moving them to Live.
## Team
The Team tab allows you to change the site owner; add supporting agencies; and add, manage, and delete users. For more information, see [Team Management](/docs/articles/sites/team-management/).

##Settings
### Plan and Billing
Here you can select or change your plan and payment method. For more information, see [Selecting a Plan](/docs/articles/sites/settings/selecting-a-plan/).

### Add-Ons
Pantheon offers several add-ons to help you build dynamic sites. These include [New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis/), [Apache Solr](/docs/articles/sites/apache-solr/), and [Redis](/docs/articles/sites/redis-as-a-caching-backend/).

### Delete Site
If you no longer need your site, you can remove it here.
<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
This is a permanent change and once you delete it your site cannot be restored.</div>

### About Site
This tab shows general information about your site, such as the framework, upstream, date it was created, and your current plan.

#### View your Site's Upstream
To find a link to your site's upstream, click **Settings**, then **About Site**.

![Upstream link](/docs/assets/images/upstream-link.png)


### PHP Version
The site default PHP version is applied to every environment unless a PHP version is explicitly selected for each environment. Learn more about [Toggling Between PHP Versions](/docs/articles/sites/settings/toggling-between-php-versions/).

## Support
If you need assistance, our expert Customer Support team is here to help make building and managing your sites easier. You can contact Support by opening a ticket from your Dashboard. Learn more about our [scope of support](/docs/articles/scope-of-support/).

##Security Indicator
This indicates if your site is public or locked. You can set a common password for accessing this environment to add an extra layer of security to prevent unwanted access to this environment. Learn more about [Locking Your Site](/docs/articles/sites/security/locking-your-site/).

## Connection Information
Here you can find the [SSH clone URL](/docs/articles/local/starting-with-git/), [Database Connection Information](/docs/articles/local/accessing-mysql-databases/), and [SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode/) connection information.

## Code
The core of the Pantheon Workflow is to move code up from Dev to Test to Live and content down from Live to Test to Dev.

- **Code** includes plugins, modules, themes, CSS, JS—anything that's under Git version control.
- **Content** includes files not under Git version control, like images and pdfs, and the database.  

The [Code tool](/docs/articles/sites/code) on Dev/Multidev environments includes a Connection Mode toggle to switch between SFTP and Git. The Code tool on the Test and Live environments displays a Commit Log that displays all the commits that are on the environment.

Learn how to use the [Pantheon workflow](/docs/articles/sites/code/using-the-pantheon-workflow/) to manage your site's code.

## Merge
Visit this tab in the Dev environment when you have commits from Multidev environments that you need to merge into Test or Live.

## Status
Pantheon provides static site analysis as a service for your site to make best practice recommendations on site configurations and to help detect common problems. This mechanism does not perform requests on your site, and in doing so avoids the observer effect. It's non-intrusive, so no installation or configuration is required. Finally, it's completely automated for consistent reports and results. Learn more about our Launch Check for
[Drupal sites](/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis/) or [WordPress sites](/docs/articles/wordpress/launch-check-wordpress-performance-and-configuration-analysis/).

## Workflow
###Clone
Use this tab to clone database and files from an environment.

###Import
You can import an archive of site fils or a MySQL database via URL or file upload.

###Export
With the Export tool, you can export the database or files from an environment to use in local development or a migration process.

###Wipe
Use this tool if you need to completely wipe database and files for an environment. Wiping completely resets the database and files and you will lose all data. To get your site back online, you will need to either re-import, or re-run install.php.

Learn more about the [Pantheon Workflow](https://pantheon.io/docs/articles/sites/code/using-the-pantheon-workflow/).

## Errors
All PHP errors are shown on this tab. If any are found, recommendations are made. Learn more about [PHP Errors and Exceptions](https://pantheon.io/docs/articles/sites/php-errors-and-exceptions/).

## Domains/HTTPS
Use the [Domains/HTTPS tab](/docs/articles/sites/domains) to add the custom domain(s) you would like pointed to this environment. You can also enable or disable HTTPS for an environment. If you choose to enable HTTPS, you must generate a private key and get your certificate from a recognized certificate authority. For more details, see [Enable Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/).

## Backups
On this tab you can create backups, restore from an existing backup, or view the backup log to see a list of your prior backups. For detailed information, see [Backups](/docs/articles/sites/backups).

## Security
Set a common password for accessing an environment to add an extra layer of security to prevent unwanted access to an environment. For more details, see [Locking Your Site](/docs/articles/sites/security/locking-your-site/).

## Site UUID
Every user, organization, product and site is assigned a UUID which is internal to Pantheon. The site UUID is found within the URL for the site Dashboard and resembles the following:

```
de305d54-75b4-431b-adb2-eb6b9e546014
```
You can also use Terminus to find the UUID of any site on your user Dashboard:
```bash
terminus sites list
```
For example uses, see the following:

- [Port 2222 Blocked Workaround](/docs/articles/local/port-2222-blocked-workaround#set-up-the-tunnel)
- [rsync and sftp](/docs/articles/local/rsync-and-sftp/#sftp)
- [SSH Tunnels for Secure Connections to Pantheon Services](/docs/articles/local/ssh-tunnels-for-secure-connections-to-pantheon-services/#prerequisites)
