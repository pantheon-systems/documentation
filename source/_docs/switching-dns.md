---
title: Switching DNS From One Pantheon Site to Another
description: Learn how to change DNS details between Pantheon Drupal or WordPress sites.
tags: [dns]
categories: []
---
There are times when you may want to switch a domain's DNS from one Pantheon site to another. The same domain cannot be added to more than one environment at the same time, but t's possible to point a domain to another site with minimal impact to visitors.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Only the Site Owner, or if the site is owned by an Organization - the Organization's Administrators, can change the Site's Plan. If you are not the owner, you will not see the options discussed below.</p>
</div>


## Prepare The New Site

For information on preparing your site for launch, please review our [Launch Essentials](/docs/guides/launch/).

Also, check `settings.php` or `wp-config.php` and comment out any hardcoded redirect logic for Pantheon's Platform domains (e.g.  `live-mysite.pantheon.io`). Once DNS has been configured, you can update the redirects to use the default Platform domain (e.g. `live-mysite.pantheonsite.io`) if needed.

### Select a site plan

1.  Go to the Site Dashboard of your New Site.
2.  Navigate to **Settings** > **Billing**
3.  Select existing credit card on file or add a new credit card.
4.  To select a paid plan, navigate to **Plan**, select a paid plan and click **Update Plan**.

## HTTPS on the New Site
HTTPS can take up to an hour to provision after you switch DNS to the new site, so you may want to plan a maintenance window accordingly.

### Determine the New DNS Records
Because the same domain cannot be added to more than one environment, you will need to determine the DNS records of the new site's Live environment by using `dig` command for Unix-based system (Linux or Mac OS X) or `nslookup` command for Windows. You can also use an online DNS lookup tool.

* Go to the new site's Live environment and get the Platform domain. `(e.g. live-my-site.pantheonsite.io)`

```bash
# For Unix-based systems (Linux or Mac OS X)
dig live-my-site.pantheonsite.io +short

# For Windows OS
nslookup -type=A live-my-site.pantheonsite.io
```

* The output IP should look like this: `23.185.0.*`


## Prepare your DNS Settings
### Lower the Time to Live (TTL)
The TTL dictates the lifespan of a DNS record - a shorter time means less time to wait until the changes go into effect. TTLs are always set in seconds. When you make a change to the TTL you need to wait for the old TTL time to pass. So, for example, if the TTL had been set to 86400, you would need to wait a full 24 hours for the new setting to be in place everywhere. You can lower your TTL well in advance of actually switching the DNS values to point to the new site, so the time to see your DNS change will be much quicker than othwersise.

* Log in to the DNS host for your domain and lower the TTL of the bare domain and www records as much as possible. If possible, set the TTL to 60 or 120 seconds for more efficient propagation.

## Switch the Domains

To minimize a disruption, open the Dashboard for both the currently launched site and the new site in different browser tabs so you can quickly make the changes.

### Remove the Domain(s) from the Launched Site
* From one browser tab, open the Site Dashboard of the old site, go to the Live Environment and to the Domains / HTTPS tab.
* Remove the domain and subdomains you will be moving to the new site.

### Add the Domain(s) to the New Site
* From another browser tab, open the Site Dashbard of the new site, go to the Live Environment and to the Domains tab.
* Add the custom domains
* Verify that you have the correct DNS records

### Update the DNS Records
* Update your DNS host with the records from above.


## Verify Your changes

Your new site is now live and receiving web traffic (although it may take a bit for the DNS settings to propagate). You can check on the state of propagation around the world with a free web tool like [https://www.whatsmydns.net/](https://www.whatsmydns.net/)

## Downgrade Old Site

- Once you've confirmed that the new site is live, you can return to the old site and downgrade the plan to **sandbox (free)**.

If you're using an existing credit card profile for billing, the credit from the sandbox downgrade will apply as a prorated payment for your new site. As long as you use the same card/site owner the credit will be carried over automatically.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">If you are changing the card or the site owner, [let us know](https://pantheon.io/support) when everything is switched over, and we'll apply that credit to the new account.
Please do not remove the old credit card from your account until after the transfer has been made.</p>
</div>

