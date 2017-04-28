---
title: Switching DNS From One Pantheon Site to Another
description: Learn how to change DNS details between Pantheon Drupal or WordPress sites.
tags: [dns]
categories: []
---
There are some scenarios (e.g. a redesigned site) where you may want to switch a domain's DNS between Pantheon sites. While each environment can configure its own custom domain, the same domain cannot be added to more than one environment. However, it's possible to point a domain to another site with minimal impact to visitors.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Only the Site Owner, or if the site is owned by an Organization - the Organization's Administrators, can change the Site's Plan. If you are not the owner, you will not see the options discussed below.</p>
</div>


## Prepare The New Site

For information on preparing your site for launch, please review our [Going Live best practices](/docs/going-live/).

### Select a site plan

1.  Go to the Site Dashboard of your New Site.
2.  Navigate to **Settings** > **Billing**
3.  Select existing credit card on file or add a new credit card.
4.  To select a paid plan, navigate to **Plan**, select a paid plan and click **Update Plan**.

### Enable HTTPS (Optional)
If you are using the HTTPS protocol with your own certificate, [enable HTTPS](/docs/enable-https/) on the new site before proceeding.

Also, check `settings.php` or `wp-config.php` and comment out any hardcoded redirect logic for Pantheon's Platform domains (e.g.  `live-mysite.pantheon.io`). Once DNS has been configured, you can update the redirects to use the default Platform domain (e.g. `live-mysite.pantheonsite.io`) if needed.

### Determine the New DNS Records
Since the same domain cannot be added to more than one environment, you will need to use a temporary domain name to determine the DNS records. If the launched site has `example.com` configured, temporarily add something like `example-new.com` to the new site's Live environment and click **Show recommended DNS records** for both the bare domain and www.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>The temporary domain you add within the new site does not need to be a registered domain. It's purpose is to determine the new DNS values required when switching the domain.</p>
</div>

## Prepare your DNS Settings
### Lower the Time to Live (TTL)
The TTL dictates the lifespan of a DNS record - a shorter time means less time to wait until the changes go into effect. TTLs are always set in seconds - a few common ones are 86400 (24 hours),  43200 (12 hours), and 3600 (1 hour).
When you make a change to the TTL you need to wait for the old TTL time to pass - that is, if it had been set to 86400, you would need to wait a full 24 hours for the new setting to be in place everywhere.

* Log in to the DNS host for your domain and lower the TTL of the bare domain and www records. If possible, set the TTL to "automatic" or "0 seconds" for more efficient propagation.

## Switch the Domains

In order to minimize a disruption in site access, open the Dashboard for both the currently launched site and the new site so you can quickly delete and add.

### Remove the Domain(s) from the Launched Site
* From the Site Dashboard of the old site, go to the Live Environment and to the Domains tab.
* Remove the domain and subdomains you will be moving to the new site.

### Add the Domain(s) to the New Site
* From the Site Dashbard of the new site, go to the Live Environment and to the Domains tab.
* Add the custom domains
* Under DNS Recommendations, quickly verify that you have the correct DNS records
* For more information on adding domains, refer to our guide on [Domains](/docs/domains/)

### Update the DNS Records
* Update your DNS provider with the recommended records from above.


## Verify Your changes

Your New Site is now live and receiving web traffic (although it may take a bit for the DNS settings to propagate)
You can verify the changes by using dig:

```bash
$ dig +short sitename.com
93.184.216.34
$ dig +short www.sitename.com
fe3.edge.pantheon.io.
```
or by visiting [https://www.whatsmydns.net/](https://www.whatsmydns.net/)

## Downgrade Old Site

- Once you've confirmed that the new site is live, you can return to old site and downgrade the plan to **sandbox (free)**.

If you're using an existing credit card profile for billing, the credit from the sandbox downgrade will apply as a prorated payment for your new site.
As long as you use the same card/site owner the credit will be carried over automatically.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">If you are changing the card or the site owner, [let us know](https://pantheon.io/support) when everything is switched over, and we'll apply that credit to the new account.
Please do not remove the old credit card from your account until after the transfer has been made.</p>
</div>
