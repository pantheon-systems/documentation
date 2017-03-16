---
title: Enabling Mobile Redirection with Cloudflare
description: Learn how to use Cloudflare to set up mobile redirection on your Drupal or WordPress site.
tags: [redirects]
categories: []
---

Cloudflare's mobile redirect service is available to domains hosting DNS on any of their plans. For details, see [About Cloudflare Mobile Redirect](https://support.cloudflare.com/hc/en-us/articles/200168336-About-Cloudflare-Mobile-Redirect).

## Before You Begin

Be sure that you have:

- A registered domain name with DNS hosted on [Cloudflare](https://www.cloudflare.com/a/sign-up).
- Added the domain to your site's Live environment on Pantheon.
- Configured mobile-ready pages; some themes already provide mobile stylesheets.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>The following instructions will enable automatic redirects for the domain associated with the site's Live environment. To test redirects on another environment, you will need to add a subdomain (e.g. <code> m-test.example.com</code>) to the Test environment and configure the subdomain on Cloudflare with the provided DNS records.</p>
</div>

### Considerations
We recommend handling mobile detection using Responsive Web Design (RWD) techniques to avoid compromising potential scalability. Creating separate mobile URLs greatly increases the amount of work required to maintain and update your site and introduces possible technical problems. For details, see [Caching: Advanced Topics](/docs/caching-advanced-topics#device-detection).

## Add the Mobile Domain to Live
1. Go to the Live environment on your Site Dashboard, and select **Domains/HTTPS**.
2. Add the domain you intend to use for the mobile-optimized site (e.g. `m.example.com`). Take note of the recommended DNS records for the subdomain.

## Enable Mobile Redirection on Cloudflare
1. Log in to your Cloudflare account.
2. Go to the domain you want to set up a mobile redirect for.
3. Click the **DNS** icon at the top of the page.
4. Configure your mobile domain (e.g. `m.example.com`) as a subdomain using the recommended DNS records from Pantheon.
5. Click the **Speed** icon at top of the page, and scroll down to the **Mobile Redirect** section.
6. Set up the mobile domain as needed. There are two options:
	* **Drop Path**: redirects all mobile requests to your mobile-optimized website homepage.
	* **Keep Path**: redirects all mobile requests to the same resource hosted on your mobile-optimized website.
7. Allow the changes to propagate, then test the redirect on a mobile device. The request should redirect to the configured mobile domain.

## Cloudflare Alternatives for Mobile Redirection
In order for Cloudflare's mobile redirection service to work, the domain must be hosted on the Cloudflare platform (both root and www). As an alternative, mobile redirection can be implemented with JavaScript or via plugins and/or modules for your site's framework:

* [Drupal mobile redirect modules](https://www.drupal.org/project/project_module?f%5B0%5D=&f%5B1%5D=&f%5B2%5D=&f%5B3%5D=&f%5B4%5D=sm_field_project_type%3Afull&text=mobile+redirect&solrsort=iss_project_release_usage+desc&op=Search)
* [WordPress mobile redirect plugins](https://wordpress.org/plugins/tags/mobile-redirect)


### JavaScript
You can detect user agents via JavaScript, then redirect requests to your configured and optimized mobile site. For cache considerations, we do not recommend using cookies that are passed to the backend for mobile theme detection and configuration. For details, see [Caching: Advanced Topics](/docs/caching-advanced-topics/#device-detection).

The following example can also be used in addition to Cloudflare's mobile redirection service to detect user agents not yet supported, such as tablets.

#### User Agent
```javascript
if ((navigator.userAgent.match(/(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i))){
   location.replace("https://m.example.com");
}
```
