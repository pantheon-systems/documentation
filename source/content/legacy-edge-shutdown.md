---
title: Legacy Edge will Shut Down on 2/1
description: Details on how to upgrade sites to Global CDN
categories:
tags: 
reviewed:
---

We will be shutting down our Legacy Edge on February 1, 2022. The Legacy Edge is being replaced by the new Global CDN, which has been widely adopted since [its release in July 2017](/blog/pantheon-launches-global-cdn-automated-https-all-sites).Global CDN uses powerful and strategically distributed points of presence (POPs) around the globe to make your site faster, more reliable, and more secure and includes managed HTTPS.


# What’s changing?
As of February 1, 2022, we will shut down the Legacy Edge. The Legacy Edge is a single point of failure, located in a single data center in Chicago and limited to insecure HTTP. 

Leading up to shutdown we will have a series of scheduled outages with the following timeline:
- 12/15/21 - Scheduled legacy edge outage for 15 minutes
- 1/18/22 - Scheduled legacy edge outage for 4 hours
- 1/25/22 - Scheduled legacy edge outage for 24 hours
- 2/1/22 -  Permanent shutdown of legacy edge
 
To power Global CDN, we've partnered with Fastly, to make their blazing-fast network delivering sub-second page loads available to all our WordPress and Drupal customers. Save time and resources by letting us handle CDN and HTTPS setup, configuration, and maintenance in each environment. We’re also proud to make Global CDN available at all account levels.

Global CDN includes fully managed and free HTTPS at all account tiers. We manage high-grade encryption with TLS 1.2.  Pantheon can now completely automate and manage the certificate hosting and renewal process.


# What do I need to do?
In order to keep your site running and avoid the scheduled outages, you must update DNS for any of your domain(s) that are still pointing to the Legacy Edge and point them to the new Global CDN. 

*Upgrade to Global CDN by updating DNS for your domain(s)* 
- Visit Pantheon site dashboard
- Click “Live”
- Click “Details” for each domain with “Upgrade to Global CDN” status
- Copy DNS values
- Login to your DNS provider
- Follow your DNS provider’s documentation to update DNS records

Please note that Pantheon does not manage DNS and you must make the changes through your DNS provider. 


# We’re here to help
If you have additional questions or need assistance please contact support through the Pantheon Dashboard or by emailing helpdesk@pantheon.io.
