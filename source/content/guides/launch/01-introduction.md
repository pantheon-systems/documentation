---
title: Launch Checklist
subtitle: Launch Checklist
description: Review essential steps for launching your site on Pantheon.
tags: [collaborate, launch, site, webops, workflow]
contributors: [stevector]
showtoc: true
permalink: docs/guides/launch/
contenttype: [guide]
innav: [true]
categories: [overview, launch, domains]
cms: [wordpress, drupal]
audience: [agency, development]
product: [--]
integration: [--]
image: launchGuide-twitterLarge.png
---

## Launch steps
You've successfully set up your site and created your workflow. Now, it's time to go through the final steps to get your site live. Use this checklist to launch your site on the Pantheon platform: 

<Alert type="info" >
You can interact with the following checklist to mark steps as completed as you follow along, however progress is not saved and will reset on pageload. 
<br/>
<br/>
Steps marked with an astrix character * indicate the task is required and cannot be skipped. All other steps are best practice recommendations, but optional.

</Alert>

|  | Todo         | Context |
|-----| ------------- | -------------------------------------- |
|  <input type="checkbox" /> | Lower TTL for existing DNS | Set the TTL of existing DNS records as low as possible to minimize the impact of upcoming DNS changes. <br/> <br/>[Learn more](/guides/domains/dns#dns-propagation)|
|  <input type="checkbox" /> | Initialize the Live environment* | If you haven't already, create the Live environment so that it's ready to serve traffic. <br/><br/>[Learn more](/guides/getstarted/addsite/#create-the-live-environment)|
|  <input type="checkbox" /> | Upgrade your site plan* | Select the Pantheon site plan that best fits your anticipated traffic and storage needs. You can adjust your plan later as your needs change.<br/><br/>[Learn more](/guides/account-mgmt/plans/site-plans#purchase-a-plan)|
|  <input type="checkbox" /> | Configure backups | Automated backups are enabled by default for the Live environment once a site plan has been upgraded from Sandbox.<ul><li>Create a manual backup of Live before launch.</li><li>Enable automatic backups for Dev and Test environments.</li></ul>[Learn more](/guides/backups#automatic-backup-schedule-and-retention) |
|  <input type="checkbox" /> | Configure caching| Configure full page caching to take advantage of Pantheon's Global CDN: <br/><ul><li>[Drupal's Performance Settings](/drupal-cache)</li><li>[WordPress Pantheon Cache Plugin Configuration](/guides/wordpress-configurations/wordpress-cache-plugin).</li></ul> **Tip**: Install the Pantheon Advanced Page Cache plugin or module to automatically clear caches for related pages as content is updated.<br/><br/>[Learn more](/clear-caches#granular-cache-clearing)|
|  <input type="checkbox" /> | Configure email | If emails are mission critical for your site, integrate a 3rd party provider for reliability. <br/><ul><li>[Drupal Sendgrid on Pantheon](/sendgrid)</li><li>[WordPress Sendgrid on Pantheon](/guides/wordpress-configurations/sendgrid-wordpress-wp-mail-smtp)</li></ul>[Learn more](/email)|
|  <input type="checkbox" /> | Review Status tab | Before going live, use Pantheon’s Launch Check tool in the **status** tab of the Live environment to identify and resolve common configuration or performance issues.<ul><li>[Drupal Launch Check](/drupal-launch-check/)</li><li>[WordPress Launch Check](/guides/wordpress-pantheon/wordpress-launch-check)</li></ul>**Tip:** Aim for all green, resolve any red. |
|  <input type="checkbox" /> | Unlock the Live environment | <ul><li>If previously locked, set the Live environment to Public in the **Security** tab of the site dashboard.</li><li> Lock lower environments such as Dev and Test in their respective Security tabs if desired.</li></ul> [Learn more](/guides/secure-development/security-tool)|
|  <input type="checkbox" /> | Connect custom domains* | Add your production domains to the Live environment: <ul><li>Go to the **Domains / HTTPS** tab of the Live environment and connect all production domains to the site dashboard.</li><li>Repeat for all bare domains, such as `example.com`, and all subdomains, like `www.example.com`.</li></ul>[Learn more](/guides/launch/domains/#connect-domain) |
|  <input type="checkbox" /> | Provision HTTPS | Use Pantheon's free, automated HTTPS service for a secure online presence without manual certificate management.<ul><li>Complete ownership verification after connecting the domain in your dashboard.</li><li> Wait for the HTTPS status to turn green in the domain details tab.</li><li>Repeat for every domain connected to the production environment.</li></ul>[Learn more](/guides/launch/domains/#avoid-https-interruption)|
|  <input type="checkbox" /> | Set primary domain | Configure redirects and domain handling for the site. <br/>[Learn more](/guides/domains/primary-domain)|
|  <input type="checkbox" /> | Test locally | Make sure your domains and redirects work as expected over HTTPS locally before final launch steps. <br/>[Learn more](/guides/domains/hosts-file)|
|  <input type="checkbox" /> | Configure DNS* | Point your domains to Pantheon using the provided A and AAAA records from the domain details tab of the site dashboard. Repeat this process for all custom domains connected to your Live environment. <br/><br/>[Learn more](/guides/launch/configure-dns/#configure-dns)|
|  <input type="checkbox" /> | Configure a long-duration HSTS header | By default, the HSTS header has a max-age of 5 minutes on Pantheon. However, in order to get an A+ SSL Rating you'll need to set a long-duration HSTS header instead. Do this by adding an override to your `pantheon.yml` file. <br/><br/> [Learn more](/pantheon-yml#enforce-https--hsts) |

## Additional steps for Performance and Elite site plans
| | Todo         | Context |
|---| ------------- | -------------------------------------- |
|  <input type="checkbox" /> | Enable Object Cache Pro | Achieve faster page loads by caching queries to the database after a page is loaded for the first time:<ul><li>[Enable Object Cache for Drupal](/object-cache/drupal)</li><li>[Enable Object Cache Pro for WordPress](/object-cache/wordpress)</li></ul> |
|  <input type="checkbox" /> | Enable Solr | Swap out the default search mechanism for a more performant alternative: <ul><li>[Enabling Solr with Drupal](/guides/solr-drupal)</li><li>[Enabling Solr for WordPress](/guides/wordpress-developer/wordpress-solr)</li></ul>|
|  <input type="checkbox" /> | Enable New Relic | Start collecting and monitoring performance data for your site by enabling New Relic from the site dashboard.<br/><br/>[Learn more](/guides/new-relic/activate-new-relic) |


## Additional steps for custom HTTPS certificates
If your requirements do not allow you to use Pantheon's free and managed HTTPS certificate service using Let's Encrypt certificates, you can purchase the option to bring your own custom certificate to the platform instead. [Learn more](/custom-certificates) 

Once purchased, the process for enabling your certificate on Pantheon ahead of your launch includes the following steps: 

| | Todo         | Context |
|---| ------------- | -------------------------------------- |
|  <input type="checkbox" /> | Request a Pantheon-generated CSR  | Work with Pantheon support to generate a CSR after you have connected your domains in the site dashboard. <br/><br/>[Learn more](/custom-certificates#add-a-custom-certificate) |
|  <input type="checkbox" /> | Generate new cert bundle | Provide the CSR from Pantheon to your Certificate Authority (CA) so they can generate the new cert bundle in PEM format. |
|  <input type="checkbox" /> | Send cert bundle to Pantheon | Handoff the certificate bundle from your CA to Pantheon support so it can be installed and deployed to the platform. |
|  <input type="checkbox" /> | Test locally | Make sure your custom certificate works as expected locally before pointing your domains to Pantheon. <br/><br/>[Learn more](/custom-certificates#test-before-going-live)
|  <input type="checkbox" /> | Disable Let's Encrypt  | Prevent Let’s Encrypt from issuing certificates for your domains by setting a CAA DNS record to specify which CAs are allowed to issue certificates for your domains.<br/><br/>[Learn more](/custom-certificates#disable-lets-encrypt-with-caa-records) |


