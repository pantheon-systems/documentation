---
title: Investigate and Remedy Traffic Events
description: Determine the cause of unexpected traffic and implement a remedy
tags: [billing, logs]
categories: [manage]
contributors: [edwardangert]
searchboost: 150
reviewed: "2020-03-03"
---

When the [Metrics](/metrics) on the Pantheon Dashboard show actual traffic as measured by the Platform
[Traffic Limits and Overages](/traffic-limits)
Pantheon offers a number of options to help determine the cause of traffic incidents, to find if they're intentional, and to help remedy them if they're not.

## Review the nginx Access Log

To get the most information about your site's traffic, review the `nginx-access.log` with [GoAccess](/nginx-access-log). While it may be a somewhat technical process, it provides the most direct information to help identify potential traffic issues.

## WordPress Best Practices

Consult our doc for a list of [WordPress best practices](/wordpress-best-practices), and how to [avoid XML-RPC attacks](/wordpress-best-practices#avoid-xml-rpc-attacks) in particular.

In addition to your other WordPress security practices, help thwart brute force attacks that attempt to access your `wp-admin` dashboard and hyperinflate traffic to your site in the process. Create a separate administrator account with a strong password, then remove the `admin` account, and use a plugin to [limit login attempts](https://wordpress.org/plugins/search/limit+login+attempts/).

## Configure Favicon.ico to Serve a Static Image

The CMS tries to serve the favicon file, but if it can’t find one in the defined path, it will attempt to generate one through PHP. While Pantheon does not count static assets against your traffic limit, generating an asset on each request the way favicon is in this case, does. In addition, since Pantheon locks down all directories except the file upload directories (`wp-contents/upload` on WordPress, or `sites/default/files` on Drupal), the CMS can’t save the file back to the path it’s generating.

This issue affects both WordPress and Drupal sites, but the request path will vary between the two platforms. On WordPress, it often appears as a `favicon.ico` file in the root directory. In Drupal (specifically Drupal 8), it shows up as a system path.

|  **CMS**  |          **Path**         |
|:---------:|:-------------------------:|
| WordPress | /favicon.ico              |
| Drupal    | /system/files/favicon.ico |

**Solution**: Often the fix is to add and commit a static `favicon.ico` into the path that is being requested. What is usually the actual culprit is adding a custom favicon through the active theme for the site through some kind of upload button, and then the icon is deleted or some other kind of issue which causes the CMS to look for an alternative favicon.

## Admin-ajax.php Generates Pages Served


## DDoS Mitigation

Distributed Denial of Service (DDoS) attacks are often short-lived and unlikely to be a prolonged issue. Our [Customer Success](https://pantheon.io/docs/support) team is available to assist with identifying a DDoS attempt, and take steps to mitigate it for your site.

## Advanced Global CDN
[Advanced Global CDN](/advanced-global-cdn) is a custom-configured upgrade to [Pantheon Global CDN](/global-cdn-caching), available through [Pantheon Professional Services](https://pantheon.io/professional-services). Once configured, Advanced Global CDN can serve entire pages and assets from cache, and provide an additional layer of protection against DDoS attempts.