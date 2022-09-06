---
title: Errors and Server Responses
subtitle: External Web Service Calls
description: Learn more about using external web service calls on Pantheon.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/errors-and-server-responses/external-web-service-calls
anchorid: external-web-service-calls
---

This section provides information on how to use external web service calls on Pantheon.


## External Web Service Calls

It is not uncommon for API or web-service integration extensions (plugins or modules) to make calls out to third-party APIs or services. Given the synchronous nature of PHP, these will halt the execution of your application until a response is received. Obviously, a slow response from the external service could lead to a [timeout](/timeouts) on Pantheon.

Even the most reliable web services will occasionally experience slowness, and it is also inevitable that there are network disruptions which could slow down external calls. That's why extensions (plugins or modules) and custom code should set a relatively low timeout threshold for the external call itself. If the external web service doesn't respond in a few seconds, it should fail gracefully and move on.

### Examples: Set a timeout on an external request

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
​
   add_action( 'http_api_curl', 'pantheon_http_api_curl', 100, 1 );
   function pantheon_http_api_curl( $handle )
   {
       curl_setopt( $handle, CURLOPT_CONNECTTIMEOUT, 10 );
       curl_setopt( $handle, CURLOPT_TIMEOUT, 10 );
   }
   ```

If you encounter frequent problems with external web services, evaluate the code making the call, and the service provider itself.

