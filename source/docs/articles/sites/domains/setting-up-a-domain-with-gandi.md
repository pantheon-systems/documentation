---
title: Setting Up a Domain with Gandi
description: Learn how to edit a domain's Zone Record in Gandi so that it resolves to your Pantheon Drupal or WordPress site.
category:
  - going-live
keywords: dns, dns records, point your domain, point domain to pantheon, pointing your domain to your pantheon site, dns host, dns configuration, add domain to a site, gandi, point gandi domain to pantheon, redirect gandi domain to pantheon, gandi domain dns, zone, zone record, gandi zone record, dns zones
---

## Set Up the Zone Record
In order to get your domain resolving to your Pantheon site, you need to edit and associate a Zone Record with the domain in the Gandi domain administration panel.

1. Navigate to the DNS Zones panel and click **DNS Zones** above the domains list.

2. Select the file that you will use for your domain. If one does not yet exist, create a new Zone file.

3. Click the **Zone file** to start editing.

4. In the Edit Mode menu, select **Expert**.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
If you are editing an existing Zone file, you will receive an alert that the file is currently being used and you are prompted to create a new version.</div>
![Configure the A records](/source/docs/assets/images/desk_images/197261.png)<br />
The zone configuration in the above example is as follows:
```nohighlight
pantheonsupport.com 10800 IN A 192.237.142.203
www 10800 IN CNAME pantheonsupport.com
```
In line 1, there is an A Record in place for the bare domain (e.g. "pantheonsupport.com"):
```nohighlight
pantheonsupport.com 10800 IN A 192.237.142.203
```
In line 2, there is a CNAME in place to accommodate 'www':
```nohighlight
www 10800 IN CNAME pantheonsupport.com
```
After you have entered your configuration, click **Use Version**. Your DNS configuration for your new domain is now complete on Gandi.

## Add Your Domain to Pantheon

In order for your domain to resolve to your Pantheon site, you need to add it to your Pantheon Site Dashboard. See [Domains and DNS](/docs/articles/sites/domains#step-2-add-a-domain-to-a-site-environment) for more details.
