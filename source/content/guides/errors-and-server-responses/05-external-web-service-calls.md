---
title: Errors and Server Responses
subtitle: External Web Service Calls
description: Learn more about using external web service calls on Pantheon.
tags: [services]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/errors-and-server-responses/external-web-service-calls
anchorid: external-web-service-calls
contenttype: [guide]
categories: [--]
newcms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

This section provides information on how to use external web service calls on Pantheon.

## External Web Service Calls

It is not uncommon for API or web-service integration extensions (plugins or modules) to make calls to third-party APIs or services. These calls halt the execution of your application until a response is received due to the synchronous nature of PHP. A slow response from the external service can lead to a [timeout](/timeouts) on Pantheon.

Even the most reliable web services occasionally experience slowness. Your site might also experience network disruptions, which can also slow down external calls. These are are just two reasons why you should set a relatively low timeout threshold for the external call if you use extensions (plugins or modules) and custom code. The external web service will fail and move on to the next stage in the process if it doesn't respond within a few seconds.

### Examples: Set a Timeout on an External Request

- Set a 10 second timeout on a generic PHP curl request:

   ```php
   curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
   curl_setopt($ch, CURLOPT_TIMEOUT, 10);
   ```

- Set a 10 second timeout on an external request made with Drupal 7's `drupal_http_request` function:

   ```php
   $options = array('timeout' => 10);
   drupal_http_request($url, $options);
   ```

- WordPress: Add timeouts using the [http_request_args](https://developer.wordpress.org/reference/hooks/http_request_args/) filter, or the [http_api_curl](https://developer.wordpress.org/reference/hooks/http_api_curl/) action. This code would go in a custom plugin or your theme's `functions.php` file:

   ```php
   add_filter( 'http_request_args', 'pantheon_http_request_args', 100, 1 );
   function pantheon_http_request_args( $r )
   {
       $r['timeout'] = 10;
       return $r;
   }

   add_action( 'http_api_curl', 'pantheon_http_api_curl', 100, 1 );
   function pantheon_http_api_curl( $handle )
   {
       curl_setopt( $handle, CURLOPT_CONNECTTIMEOUT, 10 );
       curl_setopt( $handle, CURLOPT_TIMEOUT, 10 );
   }
   ```

Evaluate the code making the call and the service provider if you encounter frequent problems with external web services.

## More Resources

- [External Libraries on Pantheon](/external-libraries)

- [Modules and Plugins with Known Issues](/modules-plugins-known-issues)
