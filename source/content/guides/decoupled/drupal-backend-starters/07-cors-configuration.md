---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: CORS Configuration
description: Learn how to configure CORS.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
permalink: docs/guides/decoupled/drupal-backend-starters/cors-configuration
anchorid: cors-configuration
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Your decoupled site may require configuration to allow
[cross-origin resource sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). By default, sites created using the decouled-drupal project opt-in to [Drupal's CORS support](https://www.drupal.org/node/2715637) with a permissive configuration for local development:

```yaml title="web/sites/default/cors.decoupled.services.yml"
# Configure Cross-Site HTTP requests (CORS).
# Read https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
# for more information about the topic in general.
# Note: By default the configuration is disabled.
parameters:
  cors.config:
    enabled: true
    # Specify allowed headers, like 'x-allowed-header'.
    allowedHeaders:
      [
        'x-csrf-token',
        'authorization',
        'content-type',
        'accept',
        'origin',
        'x-requested-with',
        'access-control-allow-origin',
        'x-allowed-header',
      ]
    # Specify allowed request methods, specify ['*'] to allow all possible ones.
    allowedMethods: ['*']
    # Configure requests allowed from specific origins.
    allowedOrigins: ['*']
    # Sets the Access-Control-Expose-Headers header.
    exposedHeaders: true
    # Sets the Access-Control-Max-Age header.
    maxAge: true
    # Sets the Access-Control-Allow-Credentials header.
    supportsCredentials: true
```

Since the appropriate CORS configuration in production and pre-production
environments may vary on a project-by-project basis, the above configuration is only loaded for local development. We recommend configuring
[production and pre-production service configurations](https://docs.pantheon.io/services-yml#production-and-pre-production-service-configurations) to set the appropriate CORS configuration for your Pantheon environments if
necessary.
