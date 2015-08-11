---
title: Defend WordPress and Drupal Sites Against DDoS Attacks with Sucuri
description: Detailed information on using Sucuri's CloudProxy Website Firewall to mitigate all network level attacks.
keywords: ddos, dos, ddos attacks, dos attacks, network attacks, network-level attacks, network level attacks, secure, sucuri, attacks
---
[DDoS/DoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack) attempt to flood the network to the point of failure, interrupting services. Sucuri's [CloudProxy Website Firewall](https://sucuri.net/website-firewall/ddos-protection) combats all network-level attacks by implementing a multi-layer filtering system that comes from several ISP's to provide additional bandwidth when the attack happens.

## Before You Begin
Be sure that you have the following:

- Sucuri Account
- Live Pantheon site

## Enable CloudProxy Website Firewall
1. [Login to Sucuri](https://login.sucuri.net/login/)
1. Click **CloudProxy Website Firewall**
1. Enter your domain name and select **Add Site**
1. Verify your domain and indicate whether you're currently experiencing a DDoS attack or if you are interested in restricting your site's backend to whitelisted IPs:
 ![Sucuri Add New Domain](/source/docs/assets/images/sucuri-add-new-domain.png)
1. Click **Proceed**


## Configure DNS
From within your Sucuri Account:

1. Click on **General Settings**
1. Copy the **Firewall IP Address**

From within your DNS host:

<ol start="3"><li> Delete the existing <code>www</code> <strong>CNAME</strong> record that points to Pantheon</li>
<li>Create an <strong>A</strong> record for <code>www</code> with the provided <strong>Firewall IP Address</strong> from Sucuri</li></ol>

After your DNS changes are detected, you will be able to configure the domain's **Hosting IP Address** on Sucuri. While the name suggests otherwise, you can provide a FQDN as an entry.

From within **General Settings** of your Sucuri account:
<ol start="5"><li>Enter <strong>all</strong> destinations for your site (found in the Domains/SSL tool of the site Dashboard by clicking <strong>Show recommended DNS records</strong>)</ol>
