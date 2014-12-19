---
title: Varnish Caching for High Performance
description: Configure and verify Varnish is working on your site.
category:
  - getting-started
  - developing
---


## Overview

Varnish is an HTTP accelerator that quickly serves both static content and anonymous pages for sites on Pantheon. By serving data from virtual memory, a response is returned without needing to access the application server, which in turns frees DROP workers to build more dynamic requests. Each Varnish server can handle thousands of requests per second, much faster than Drupal alone.  

Every site on Pantheon already uses Varnish; each HTTP request first goes to the pool of Varnish servers to seamlessly cache your site content. If a current cache isn't found, the request will continue to the DROP worker, then the response will be cached on the way back to the browser.  
Varnish can also improve the availability of your site. For example, if a PHP fatal error breaks your site, anonymous page requests can still be served by Varnish and end-users won't realize anything is wrong.

## Configure Your Site for Varnish

No module installation is required; do **not** install the Drupal Varnish module.  

Varnish has been configured to respect any HTTP headers served by your site. If you set pages to expire in 5 minutes, Varnish will expire the content as requested. If your site sends headers that forbid caching, Varnish won't cache your content.  

See [Drupal's Performance Settings](/docs/articles/drupal/drupal-s-performance-and-caching-settings) for step-by-step instructions on how to optimize your caching configuration.

## Verify Varnish is Working on Your Pantheon Site

Use the web utility at  [http://varnishcheck.getpantheon.com/](http://varnishcheck.getpantheon.com/) to check to see if Varnish is working on your Pantheon hosted website. This tool will perform up to two web requests to your site and will check the headers to determine if Varnish can cache your site. If not, it will make recommendations on how to configure Drupal. If you have any feedback, let us know by sending in a support ticket.
