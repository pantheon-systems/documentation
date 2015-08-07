---
title: Secure WordPress or Drupal Sites with Sucuri Cloud Proxy
description: Detailed information on using Sucuri Cloud Proxy to protect against malware, hackers, and blacklists.
category:
  - developing
authors:
  - atjuch
date: 7/28/2015
---
With malicious attacks gaining popularity across the internet, it is becoming increasingly important to secure your site. The intent of these attacks vary, ranging from service interruption to malware injections, and more. In this guide, we will set up a Cloud Proxy service to protect your website and stay ahead of potential attacks.
## Why Sucuri?

[Sucuri](https://sucuri.net) is one of the leading website security companies in the world. They offer a variety of paid and online tools ranging from [Website AntiVirus](https://sucuri.net/website-antivirus/), [Cloud Proxy (Firewall)](https://sucuri.net/website-firewall/), [Free Website Security Scan](https://sitecheck.sucuri.net/), and more.
Whether you're looking to secure a personal site or an enterprise client, Sucuri has you covered with 24/7 ticket support and incredible response times.

## Prerequisites

### Direct Your Domain to Pantheon
In order to add Sucuri Cloud Proxy services, you must already have a domain directed to Pantheon and added to the Live environment. For more instructions, please see [DNS Records for Directing Your Domain to Your Pantheon Site](/source/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/).

## Create a Sucuri Account

Get started by [selecting a plan](https://sucuri.net/website-firewall/signup) that fits your needs. Once a plan is selected, you will be instructed to create your Sucuri account and select a payment method.

![Sucuri sign up form](/source/docs/assets/images/sucuri-cloud-proxy-signup.png)​

## Login to your Sucuri Account

After receiving your confirmation email, sign in to your [Sucuri account](https://login.sucuri.net/login/). From within the Dashboard, click on **CloudProxy Website Firewall**.

![Sucuri Account Settings](/source/docs/assets/images/sucuri-account-settings.png)

## Add Your Site

Enter your domain and click **Add Site** to enable CloudProxy. You can add it with or without www, Sucuri will remove the www automatically.

![Sucuri Add Site](/source/docs/assets/images/sucuri-add-website.png)

## Verify Domain Name

You will see a pop-up that asks you to verify the domain name and server location. Pantheon sites are served from North America, but you can select a location that represents where you live.

Indicate whether you are currently under a DDoS attack or if you would like to restrict your site's backend to whitelisted IPs. When you are ready, click **Proceed**

![Sucuri Add New Domain](/source/docs/assets/images/sucuri-add-new-domain.png)

CloudProxy will display a status bar which will configure the account settings for your domain name. It should not take more than 1-2 minutes and will close automatically when finished.

![Sucuri CloudProxy Loading](/source/docs/assets/images/sucuri-cloud-proxy-loading.png)

## Activating CloudProxy

When the status bar is done, you will see a long page of information. Follow the instructions within the blue area labeled **Activating CloudProxy**:

1. First, check the URL provided and verify your site loads on the temporary address.
2. Second, if you need SSL support click the link provided for further instructions.
3. Login to where your DNS settings are for your domain name and remove the records you received from Pantheon. Add just an **A Record** to the IP address Sucuri lists. Save your DNS settings and come back to your Sucuri dashboard screen.
4. The domain name is now propagating, let's move on.

![Sucuri CloudProxy Activation](/source/docs/assets/images/sucuri-cloud-proxy-activating.png)

## Adding the Pantheon CNAME to Sucuri

Earlier on in the guide we removed the CNAME from the DNS records. Now, we are going to add it back to tell Sucuri where to route the "www" website traffic. After you have activated the CloudProxy you will see an area labeled **HOSTING IP ADDRESSES**, that is where you want to be.

In the IP field copy and paste the CNAME provided for your from the [Pantheon site dashboard](/source/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/#pantheon-dns-records-for-http-sites)

![Sucuri CloudProxy CNAME](/source/docs/assets/images/sucuri-cloud-proxy-cname.png)

## Waiting for the site to propagate

Sucuri mentions on the site that it takes typically under an hour. I saw the changes to the domain around 10-15 minutes. Once the site is complete being setup through the CloudProxy you should be able to view your site and it's now protected!

![Sucuri CloudProxy Active Status](/source/docs/assets/images/sucuri-cloud-proxy-active-status.png)


![Sucuri CloudProxy Final](/source/docs/assets/images/sucuri-cloud-proxy-final.png)


## Congratulations!

You have now successfully integrated and protected your site from the forces of evil on the internet!

## See Also

- [CloudProxy Knowledge base on Sucuri](https://kb.sucuri.net/cloudproxy)
- [CloudProxy Intro Video](https://www.youtube.com/watch?v=MLhVsetSoxw)
- [Support Ticket Help for Sucuri](https://support.sucuri.net/support/?newcloudproxy)
- [Sucuri.net](https://sucuri.net/)
