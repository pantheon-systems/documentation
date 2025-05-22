---
title: Launch Checklist
description: Review essential steps for launching your site on Pantheon.
tags: [collaborate, launch, site, webops, workflow]
contributors: [stevector]
contenttype: [doc]
innav: [true]
categories: [overview, launch, domains]
cms: [wordpress, drupal]
audience: [agency, development]
product: [--]
integration: [--]
image: launchGuide-twitterLarge.png
---
## Launch Steps
You've successfully set up your site and created your workflow. Now, it's time to go through the final steps to get your site live. Use this checklist to launch your site on the Pantheon platform: 

<Alert type="info" >
You can interact with the following checklist to mark steps as completed as you follow along, however progress is not saved and will reset on pageload. 
</Alert>

|  | Todo         | Context |
|-----| ------------- | -------------------------------------- |
|  <input type="checkbox" /> | Lower TTL for existing DNS | Set the TTL of existing DNS records as low as possible to minimize the impact of upcoming DNS changes.<ul><li>When you make a change to the TTL of an existing record, you need to wait for the old TTL time to pass - that is, if it had been set to 86400, you would need to wait a full 24 hours for the new setting to begin propagating everywhere.</li></ul>|
|  <input type="checkbox" /> | Initialize the Live environment | Todo: fill out context<br/>[Learn more](/guides/getstarted/addsite/#create-the-live-environment)|
|  <input type="checkbox" /> | Upgrade your site plan | Select the Pantheon site plan that best fits your anticipated traffic and storage needs. You can adjust your plan later as your needs change.<br/>[Learn more](/guides/account-mgmt/plans/site-plans#purchase-a-plan)|
|  <input type="checkbox" /> | Configure caching| Todo: fill out context, mention GCDN, and PAPC<br/><ul><li>[Drupal's Performance Settings](/drupal-cache)</li><li>[WordPress Pantheon Cache Plugin Configuration](/guides/wordpress-configurations/wordpress-cache-plugin).</li></ul>|
|  <input type="checkbox" /> | Configure backups | Protect your site’s data by setting up Pantheon’s Backup Tools.<ul><li>Automatic daily backups and manual backup options are available.</li><li>Each backup includes code, database, and files for complete coverage.</li><li> **Tip:**todo: mention lower eenvs auto sched. Schedule regular backups and create a manual backup before launch.</li></ul>[Learn more](/guides/backups#automatic-backup-schedule-and-retention) |
|  <input type="checkbox" /> | Configure email | If emails are mission critical for your site, integrate a 3rd party provider for reliability. <br/><ul><li>[CMS Email Service on Pantheon](/email)</li><li>[Sendgrid on Pantheon - Drupal](/sendgrid)</li><li>[Sendgrid on Pantheon - WordPress](/guides/wordpress-configurations/sendgrid-wordpress-wp-mail-smtp).</li></ul>|
|  <input type="checkbox" /> | Review Status tab | Before going live, use Pantheon’s Launch Check tool in the **status** tab of the Live environment to identify and resolve common configuration or performance issues.<ul><li>Checks cache settings, modules, and database stats; provides actionable insights.</li><li>Helps you optimize your site and avoid post-launch surprises.</li><li>**Tip:** Aim for all green, resolve any red.</li></ul>**Learn more:**  [WordPress Launch Check](/guides/wordpress-pantheon/wordpress-launch-check) \| [Drupal Launch Check](/drupal-launch-check/) |
|  <input type="checkbox" /> | Lock sensitive environments |Keep your development and test environments private until you’re ready to launch.<ul><li>Use Pantheon’s environment locking to password-protect non-public environments.</li><li>Control who can access your work-in-progress site.</li></ul>[Learn more](/guides/secure-development/security-tool)|
|  <input type="checkbox" /> | Connect custom domains | On Pantheon, you can add custom domains to your Live environment, which is ideal for presenting your site to the public. <br/>[Learn more](/guides/launch/domains/#connect-domain) |
|  <input type="checkbox" /> | Provision HTTPS | Use Pantheon's free, automated HTTPS service for a secure online presence without manual certificate management.<ul><li>Complete ownership verification after connecting the domain in your dashboard.</li><li> Wait for the HTTPS status to turn green in the domain details tab.</li><li>Repeat for every domain connected to the production environment.</li></ul>[Learn more](/guides/launch/domains/#avoid-https-interruption)|
|  <input type="checkbox" /> | Set primary domain | Configure redirects and domain handling for the site. <br/>[Learn more](/guides/domains/primary-domain)|
|  <input type="checkbox" /> | Test locally | Make sure your domains and redirects work as expected over HTTPS locally before final launch steps. <br/>[Learn more](/guides/domains/hosts-file)|
|  <input type="checkbox" /> | Configure DNS | Todo: fill out context|
|  <input type="checkbox" /> | Configure a long-duration HSTS header | Todo: fill out context|

## Additional steps for WordPress sites
| | Todo         | Context |
|---| ------------- | -------------------------------------- |
|  <input type="checkbox" /> | Run wp-cli search and replace | Todo: fill out context|
|  <input type="checkbox" /> | Install WordPress Native PHP Sessions | Todo: fill out context|


## Additional Steps for Performance and Elite site plans
| | Todo         | Context |
|---| ------------- | -------------------------------------- |
|  <input type="checkbox" /> | Enable Object Cache Pro | Todo: fill out context|
|  <input type="checkbox" /> | Enable Solr | Todo: fill out context|
|  <input type="checkbox" /> | Enable New Relic | Todo: fill out context|


## Additional steps for e-commerce sites 
| | Todo         | Context |
|---| ------------- | -------------------------------------- |
|  <input type="checkbox" /> | Soft-launch first | soft launch on a non-prod domain that's connected to the Live env and have sandbox keys applied in the database for their payment gateway to enable most comprehensive UAT strategy |
|  <input type="checkbox" /> | Maintenance mode | on actual launch be prepared to disable ecommerce for a number of hours or put the site in maintenance mode until propagation is complete to ensure no orders are at risk of being made against the old site |
