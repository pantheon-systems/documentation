---
title: Get Started with Pantheon
subtitle: Launch Your Site
description: Make your site live for all to see.
contenttype: [guide]
innav: [false]
categories: [overview]
cms: [--]
audience: [business, sysadmin, development]
product: [--]
integration: [--]
tags: [--]
contributors: [wordsmither]
reviewed: "2023-03-21"
showtoc: true
permalink: docs/guides/getstarted/launch
editpath: getstarted/08-launch.md
---

And now it's time to finally make your site available to the public!  This document provides the bare minimum that needs to be; for more detailed information, refer to our [Launch Guide](/guides/launch/).

## Deploy to Live

### Finish your Dev site

Once you've finished and committed your code to Dev, you'll need to make sure it has any content updates that have been made in the Live CMS environment.  

1. Select the <Icon icon="wrench" text="Dev"/> tab, and then click <Icon icon="server" text="Database / Files"/>.

1. Select **Live** from the **From this Environment** list to clone the database and files from the Live site. 

1. Click **Clone the Database & files from Live into the Development Environment**.

1. Click <Icon icon="new-window-alt" text="Visit Development Site"/> when this is complete to confirm that the content you created on your Live site now appears on your Dev site.

## Test Your Site

Once development is complete, it's time to test it in the Test environment.  To do so:

1. Select the <Icon icon="equalizer" text="Test"/> tab.

1. Select the <span class="glyphicons glyphicons-refresh"></span> **Deploys** tab.

1. Select the **Check the Pull files and the database from the Live environment?** checkbox to pull the content from your Live environment to the Test environment.

   ![Site dashboard, test environment, Deploys section](../images/dashboard/deploy-to-test-env.png)

1. Select **Deploy Code from  Development to Test Environment**

Your site is now ready to test.

## Deploy to Live

Once testing is complete you can make your site live.

1. Select the <span class="glyphicons glyphicons-cardio"></span> **Live** tab.

1. Select the <span class="glyphicons glyphicons-refresh"></span> **Deploys** tab.

![Site dashboard, live environment, workflow section](../images/dashboard/deploy-live.png)

1. Select **Deploy Code from Test to Live Environment**.
   
That's it! Your site is live!  Select the **Visit Live Site** button to view it.

## Domain Configuration

At this point, you have a live site with an ugly URL, like ``.  To change that to a more friendly URL, first connect your DNS:

<Partial file="connect-dns.md" />

And then, you'll configure your DNS:

The instructions in this section cover the common `example.com` and `www.example.com` domain configuration. Refer to [Platform and Custom Domains](/guides/domains) for other domain configurations.

<Partial file="configure-dns.md" />

Click below for more detailed instructions for your specific DNS host. 

<Accordion title=" DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">

<DNSProviderDocs />

You can run diagnostics at [Let's Debug](https://letsdebug.net/) if you are having difficulties issuing a [Let's Encrypt](https://letsencrypt.org/) certificate. This tool can identify an array of issues specifically for [Let's Encrypt](https://letsencrypt.org/) certificates, including problems with DNS, nameservers, networking issues, common website misconfigurations, and CA policy issues.
  
</Accordion>

Click [here](/guides/domains/dns/#frequently-asked-questions) to learn more about DNS settings.


## More Resources

* [Launch Guide](/guides/launch/)