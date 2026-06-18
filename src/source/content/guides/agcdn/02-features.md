---
title: Advanced Global CDN
subtitle: Features & Use Cases
description: Learn more about AGCDN features.
tags: [professional-services, logs, cdn, security]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/agcdn/features
contenttype: [guide]
innav: [true]
categories: [optimize]
cms: [--]
audience: [development]
product: [--]
integration: [--]
---

## Image Optimization
Render and compress modern image formats by serving images from the edge.

**How it works:**

* Optimize your user experience so that content gets delivered quickly and efficiently. Automatically control image sizes across all your sites with no CMS changes.
* Preconfigured with optimizations for over 45,000 mobile device profiles, so your team doesn’t need to spend resources on varying resolutions or manufacturers.

**Examples:**

* Auto convert every image to modern formats like WebP, MP4, and others
* Force JPEG files to use progressive downloading for a better experience regardless if the original file had that attribute when uploaded to CMS
* Control quality settings or toggle lossless/lossy modes on-demand

## IP Restriction
Protect intellectual property and secure development environments with granular access control down to the IP address level.

**How it works:**

* Block specific IP addresses and ASNs 
* Returns a 403 (Forbidden) error page to blocked IP addresses

**Examples:**

```
198.51.100.0/24		    Blocked
AS399358 	       		Blocked
```

## Enterprise WAF rules for WordPress and Drupal 
Added site integrity and security by inspecting each uncached request in detail.

**How it works:**
* Adequate security is always a layered approach. By  adopting a WAF, protections at the edge will protect your entire portfolio of sites on Pantheon from very real attacks that are all too common nowadays on the web.
* A key benefit of getting a WAF through Pantheon instead of a general firewall are the protections we provide are tuned for WordPress and Drupal go beyond the standard OWASP Top-10 rules alone.

**Protects against:**

* SQLi (SQL Injection)
* CSRF (Cross Site Request Forgery)
* XSS (Cross Site Scripting)
* Remote and Local File Inclusion (RFI, LFI)
* Remote Command Execution (RCE)
* Session Fixation

## Rate Limiting 
Protect websites from volumetric attacks and unwanted traffic patterns.

**How it works:**

* A custom configuration will be added to your site that checks the frequency of requests against originating request signatures
* If limits are exceeded, visitors using those signatures will be returned an error message.

**Examples:**

```
example.com/		Standard - 500 rps
example.com/contact-us 	       Strict - 100 rps
```

## Custom Error & Maintenance Page Rules
Customize error pages.

**How it works:**
The CDN intercepts traffic upon detecting specific server errors, timeouts, or a manually activated maintenance rule. Instead of showing a generic error, it immediately serves a custom-designed page directly from the edge.

**Common Use Case:**
If your origin server becomes unresponsive, the CDN automatically displays a branded error page. This prevents users from seeing plain "502 Bad Gateway" errors and can direct them to a status page or support channels.

## Geolocation & Geofencing Control
Brand and intellectual property protection with fast location-based edge logic.

**How it works:**

* Geo headers will appear instantly for each visitor and request.
* Our edge provides the geo data to PHP/CMS faster than 3rd-party plugins/libraries.
* Take action on the edge based on user locale  (eg. blocking or redirecting based on country).

**Example:**

```
X-Geo-City: 			“San Francisco”
X-Geo-Region: 		    “CA”
X-Geo-Postal-Code:  	“94108”
X-Geo-Country: 		    “United States”
X-Geo-Country-Code: 	“US”
X-Geo-Latitude: 		“37.7926235914618”
X-Geo-Longitude: 		“-122.40625861349275”
```

## Device Detection
Categorizes visitors based on User-Agents.

**How it works:**
Every browser sends a `User-Agent` header with each request to identify itself and the device it's running on. The CDN  then reads this information and categorizes the device.

**Common Use Cases:**

* **Targeted Functionality:** Display a "click-to-call" button only for mobile users or show complex interactive elements only to desktop users
* **Web Analytics:** Gain crucial insights into your audience by segmenting traffic and user behavior by device type

## Domain Masking 
Enable page-by-page migrations by reviewing, and routing each request uniquely at the edge.

**How it works:**

* Migrate & update your sites gracefully so that you can apply agile processes to your relaunch.
* Consolidate your individual websites under a single domain to potentially improve SEO.

**Examples:**

* example.com       	   	points to new site
* example.com/old-page   	points to an old site
* example.com/blog       	points to other CMS
* example.com/archive    	points to an old site

## Redirects
Do even more with cookie-handling, URL rate-limiting, header modifications and query string sorting and filtering.

**How it works:**

A CDN redirect intercepts a user's request at the edge and checks it against your configured rules. If the request matches a rule, the CDN immediately sends a redirects you to the appropriate location.

**Common Use Cases:**

Implementing redirects at the Edge allows for less latency- redirects living at the edge are faster than living in the application.

## CDN Log Streaming
Complete security visibility with end-to-end edge traffic logs.

**How it works:**

CDN log streaming captures request data from the Edge as it happens and sends it directly to a data analysis endpoint you own.

**Common Use Cases:**

Customers who want to monitor all Edge activity typically opt in to this- monitoring edge activity can aid in finding and acting on malicious activity.


## Header Modification
Optimize your website by modifying headers to increase performance, security, and flexibility without altering your core application code.

**How it works:**

* Override global values to improve caching, add security headers, update request data, and control cookies at the edge.
* Customize visitor experience so your martech stack can leverage more user information.
* Centralize header modifications across your portfolio of sites for governance and saving time.

**Examples:**

Cross-Origin Resource Sharing (CORS) header examples:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: https://example.com
```

Custom header and value example:
```
A-Custom-Header: “custom value”
```

