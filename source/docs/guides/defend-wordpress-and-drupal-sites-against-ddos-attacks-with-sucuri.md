---
title: Defend WordPress or Drupal Sites Against DDoS Attacks with Sucuri
description: Detailed information on using Sucuri's CloudProxy Website Firewall to mitigate all network level attacks.
category:
  - developing
authors:
  - atjuch
date: 8/7/2015
---
With malicious attacks gaining popularity across the internet, it is becoming increasingly important to protect your site. [DDoS/DoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack) attempt to flood the network to the point of failure, interrupting services. [Sucuri](https://sucuri.net/) combats these attacks by implementing a multi-layer filtering system that comes from several ISP's to provide additional bandwidth when the attack happens.

In this guide, we will set up Sucuri's [CloudProxy Website Firewall](https://sucuri.net/website-firewall/ddos-protection) to mitigate all network level attacks by serving proxied requests.

## Before You Begin
In order to add Sucuri services, you must have a domain directed to Pantheon and added to the Live environment. For more instructions, please see [Domains and DNS](/docs/articles/sites/domains/).

## Create a Sucuri Account and Login

Get started by [selecting a plan](https://sucuri.net/website-firewall/signup) that fits your needs. Once a plan is selected, you will be instructed to create your Sucuri account and select a payment method.

After receiving your confirmation email, sign in to your [Sucuri account](https://login.sucuri.net/login/). From within the Dashboard, click on **CloudProxy Website Firewall**.

## Add Your Site

Enter your domain name and click **Add Site** to enable CloudProxy. Sucuri will automatically remove the www subdomain if added.

## Verify Domain Name

Verify your domain name and indicate whether you are currently under a DDoS attack or if you would like to restrict your site's backend to whitelisted IPs. When you are ready, click **Proceed**.

![Sucuri Add New Domain](/source/docs/assets/images/sucuri-add-new-domain.png)

CloudProxy will display a status bar which will configure the account settings for your domain name. It should not take more than 1-2 minutes and will close automatically when finished.


## Configure DNS

Copy the **Firewall IP address**, located in **General Settings**. Login to your DNS provider and delete the www CNAME record pointing to `env-yoursite.pantheon.io`. Create an A record for www using the Firewall IP address provided by Sucuri.

Return to **General Settings** in your Sucuri account. After your DNS changes are detected, you will be able to configure the domain's **Hosting IP Address**. While the name suggests otherwise, you can provide a FQDN as an entry. Enter the destination for your site, found in the Domains/SSL tool by clicking **Show recommended DNS records**.


## Propagation Time

Sucuri states that it takes typically under an hour for these changes to propagate, however it can sometimes take only 10-15 minutes.


## Congratulations!

You are now one giant step ahead of all network level attacks!
