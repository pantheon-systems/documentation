---
title: Enable Mobile Redirection with CloudFlare
description: Learn how to use CloudFlare to set up mobile redirection.
categories:
  - developing
tags:
  - domains
keywords: dns, cloudflare, mobile, redirect-incoming-requests, mobile tools
---
This article walks you though setting up a mobile redirect service through CloudFlare to automatically redirect visitors using mobile device visitors to a mobile optimized home page.

## Before You Begin

You'll need to have:  
- A [CloudFlare account](https://www.cloudflare.com/a/sign-up)  
- Your chosen mobile domain added your live environment, this will provide the relevant DNS information to set up the redirect.
- Configured mobile ready pages to display, some themes already provide mobile stylesheets.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
This will only work for your Live domain. If you want to test it for the Dev or Test environments, you will have to point the Live domain name to Dev or Test on Pantheon.</div>

## Add Your Mobile Domain To Your Pantheon Site
1. From the Site Dashboard, go to your Live environment and select **Domains/HTTPS**.
2. Add the domain or subdomain you want to use to serve the mobile version of your site (e.g. m.example.com), your root domain and www subdomain should already exist (e.g. example.com & www.example.com).
You will see a new recommended DNS record.

## Enable Mobile Redirection on CloudFlare
1. Log in to your CloudFlare account.
2. Go to the domain you want to set up a mobile redirect for.
3. Click the **DNS** icon at the top of the page.
4. Add the newly created m.example.com and recommended DNS record.
5. Click the **Speed** icon at top of the page.
6. Scroll down to the **Mobile Redirect** section.
7. Set up the mobile domain as needed. There are two options here - **Keep Path** or **Drop Path**
	* **Drop path** will redirect all mobile requests to your mobile-optimized website homepage
	* **Keep path** will redirect all mobile requests to the same resource hosted on your mobile-optimized website.
8. Wait a couple of minutes for it to update, then test it by entering the web URL in your mobile device's browser. You should be redirected to the mobile domain you have chosen.

## Alternative Methods for Mobile Redirection
### Modules/Plugins

For both Drupal and WordPress, modules/plugins exist that will redirect mobile traffic, based on screen resolution or the detected user agent:

 * [Drupal mobile redirect modules](https://www.drupal.org/project/project_module?f%5B0%5D=&f%5B1%5D=&f%5B2%5D=&f%5B3%5D=&f%5B4%5D=sm_field_project_type%3Afull&text=mobile+redirect&solrsort=iss_project_release_usage+desc&op=Search)
 * [WordPress mobile redirect plugins](https://wordpress.org/plugins/tags/mobile-redirect)

### JavaScript

JavaScript can detect the page width or user agent and redirect, here are a couple of examples:
#### Page Width
```javascript
if (screen.width <= 800) {
window.location = "http://m.example.com";
}
```
#### User Agent
```javascript
if ((navigator.userAgent.match(/(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i))){
   location.replace("http://m.example.com");
}
```
