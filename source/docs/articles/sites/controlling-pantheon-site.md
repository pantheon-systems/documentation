---
title: Controlling a Pantheon Site
description: Learn about best practices for controlling your Pantheon site.
keywords:
---
This article provides best practices and recommendations for controlling your Pantheon site.

## Updating Core
Core updates will appear on your Dashboard after review and testing by our team, usually within a week of release. These updates appear in your code workspace beneath the Connection Mode bar when they are available. Sometimes we will add new features to the Pantheon API module, and deploy bug fixes ahead of a core release. Typically, if there’s an update available, you're better off merging it. For detailed instructions, see [Applying Upstream Updates](/docs/articles/sites/code/applying-upstream-updates/).

## Updating Plugins/Modules/Themes

### Drupal
Drupal has a very good, built-in system for updating contributed modules through the administrative interface. Learn how to [update modules through Drupal](/docs/articles/drupal/updating-modules-through-drupal/).

###WordPress

WordPress's admin interface has built in tools to manage plugins and themes, allowing you to search and install popular code from the main WordPress.org repository on your site.

When your Pantheon Dev environment is in SFTP mode, you can use these capabilities to manage the code in your Dev environment. It works for plugins:
 ![Installing WP Plugins](/source/docs/assets/images/desk_images/278882.png)<br />
And for themes:<br />
 ![Installing WP Themes](/source/docs/assets/images/desk_images/278883.png)<br />
Note that you still need to turn these changes into _commits_ in your Pantheon Site Dashboard. Committing code will keep it saved, and allow you to deploy it out to the Test and Live environments.

<div class="alert alert-danger" role="alert">
<strong>Warning</strong>: You should never have to enter SFTP credentials to WordPress's admin area itself. If you're prompted for a login and password, it's a sign that your Pantheon Dev environment is not in SFTP mode.</div>

## The Pantheon Workflow
Every Pantheon site comes with three environments: Dev, Test, and Live. Separate Dev, Test, and Live environments allow you to develop and test your site without impacting the live site that's available to the world. Additional development environments are available with [Multidev](/docs/articles/sites/multidev/). For more information, see [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/).

## Site Owner
A site owner is the person who pays for a site. The owner has administrator permissions to manage the billing information, team members, and site settings. Learn about the [tasks](https://pantheon.io/docs/articles/sites/new-site-owner/) a site owner can perform.

Did your site owner leave the company before giving you the login information? Learn how to [access an account after the owner leaves](/docs/articles/users/access-account-after-owner-leaves/).

## Getting Support
The best way to contact Support is to submit a ticket from your Pantheon Dashboard by clicking **Support > Open Ticket**. This will automatically include the site and user information. Our goal is to resolve most support tickets within two hours. Learn more about [getting support](/docs/articles/getting-support/) and our [scope of support](https://pantheon.io/docs/articles/scope-of-support/).
