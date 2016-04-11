---
title: Enabling Mobile Redirection with CloudFlare
description: Learn how to use CloudFlare to set up mobile redirection.
categories:
  - developing
tags:
  - domains
keywords: dns, cloudflare, mobile, redirect-incoming-requests, mobile tools
---
CloudFlare's mobile redirect service is available to domains hosting DNS on any of their plans. For details on this service, see [About CloudFlare Mobile Redirect](https://support.cloudflare.com/hc/en-us/articles/200168336-About-CloudFlare-Mobile-Redirect).

## Before You Begin

Be sure that you have:

- A registered domain name with DNS hosted on [CloudFlare](https://www.cloudflare.com/a/sign-up).
- Added the domain to your site's Live environment on Pantheon.
- Configured mobile-ready pages, some themes already provide mobile stylesheets.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
The following instructions will enable automatic redirects for the domain associated with the site's Live environment. If you wish to test redirects on another environment, you will need to add a subdomain (e.g. `m-test.example.com`) to the Test environment then configure the subdomain on CloudFlare with the provided DNS records.</div>

## Add the Mobile Domain to Live
1. From the Live environment of the Site Dashboard, select **Domains/HTTPS**.
2. Add the domain you intend to use for the mobile-optimized site (e.g. `m.example.com`). Take note of the recommended DNS records for the subdomain.

## Enable Mobile Redirection on CloudFlare
1. Log in to your CloudFlare account.
2. Go to the domain you want to set up a mobile redirect for.
3. Click the **DNS** icon at the top of the page.
4. Configure your mobile domain (e.g. `m.example.com`) as a subdomain using the recommended DNS records from Pantheon.
5. Click the **Speed** icon at top of the page.
6. Scroll down to the **Mobile Redirect** section.
7. Set up the mobile domain as needed. There are two options here - **Keep Path** or **Drop Path**:
	* **Drop Path** will redirect all mobile requests to your mobile-optimized website homepage.
	* **Keep Path** will redirect all mobile requests to the same resource hosted on your mobile-optimized website.
8. Allow changes to propagate, then test the redirect on a mobile device. The request should redirect to the configured mobile domain.

## CloudFlare Alternatives for Mobile Redirection
In order for CloudFlare's mobile redirection service to work, the domain must be hosted on the CloudFlare platform (both root and www). As an alternative, mobile redirection can be implemented with JavaScript or via plugins and/or modules for your site's given framework:

* [Drupal mobile redirect modules](https://www.drupal.org/project/project_module?f%5B0%5D=&f%5B1%5D=&f%5B2%5D=&f%5B3%5D=&f%5B4%5D=sm_field_project_type%3Afull&text=mobile+redirect&solrsort=iss_project_release_usage+desc&op=Search)
* [WordPress mobile redirect plugins](https://wordpress.org/plugins/tags/mobile-redirect)


### JavaScript
You can detect the page width or user agent via JavaScript, then redirect requests to your configured and optimized mobile site. We do not recommend using cookies that are passed to the backend for mobile theme detection and configuration. For details, see [Varnish Caching - Drupal and WordPress Advanced Topics](/docs/caching-advanced-topics/#device-detection).

The following examples can also be used in addition to CloudFlare's mobile redirection service to detect user agents not yet supported, such as tablets.

#### Page Width
```javascript
if (screen.width <= 800) {
window.location = "https://m.example.com";
}
```
#### User Agent
```javascript
if ((navigator.userAgent.match(/(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i))){
   location.replace("https://m.example.com");
}
```
