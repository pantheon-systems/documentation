---
title: Using WP SAML Auth with Google Apps
subtitle: Advanced Configuration
description: Additional filtering can be achieved in your theme or a must-use plugin
contributors: [alexfornuto, danielbachhuber]
cms: "WordPress"
category: [integrate]
tags: [sso, saml, users, security, plugins]
reviewed: "2020-02-19"
layout: guide
permalink: docs/guides/wordpress-google-sso/advanced-configuration
anchorid: wordpress-google-sso/advanced-configuration
editpath: wordpress-google-sso/06-advanced-configuration.md
---

This guide uses only the functions and settings provided by the WP SAML Auth plugin by default. Advanced configuration can be achieved by filtering `wp_saml_auth_option` in your theme, or a [must-use plugin](/mu-plugin). Pantheon recommends an MU-Plugin over modifications to your theme.

For example, you can filter your `entityID`, `assertionConsumerService`, and `baseurl` values using environment variables, to always match the working environment. This is useful if you need Google authentication on all newly created Multidev environments, though additional SAML apps in the Google Admin may be required.

The example code snippet below demonstrates a basic filter, providing some of the same values already applied in the plugin settings page. Make sure you replace all example values with the appropriate values from your site.

```php:title=wp-content/mu-plugins/saml-filter-plugin.php
<?php

add_filter( 'wp_saml_auth_option', function( $value, $option_name ) {
  // Use the OneLogin bundled library to connect to Google Apps
  if ( 'connection_type' === $option_name ) {
    return 'internal';
  }

  // Configuration details OneLogin uses to connect to Google Apps
  if ( 'internal_config' === $option_name ) {
    // ID for the service provider (e.g. your WordPress site)
    $value['sp']['entityId'] = 'urn:wp-saml-auth';
    // URL that Google Apps will redirect back to after authenticating.
    $value['sp']['assertionConsumerService']['url'] = 'https://wp-saml-auth.dev';
    // ID provided for the Google Apps account.
    // 'abc123' will be something specific to your account.
    $value['idp']['entityId'] = 'https://accounts.google.com/o/saml2?idpid=abc123';
    // URL that WordPress will redirect to for authentication.
    // 'abc123' will be a unique value specific to your account.
    $value['idp']['singleSignOnService']['url'] = 'https://accounts.google.com/o/saml2/idp?idpid=abc123';
    // x509 certificate provided by Google Apps
    // Make sure to keep the file_get_contents because the entire certificate needs to be read into memory.
    $value['idp']['x509cert'] = file_get_contents( ABSPATH . '/private/GoogleIDPCertificate-wp-saml-auth.dev.pem' );
    return $value;
  }

  return $value;
}, 10, 2);
```

See WP SAML Auth's [annotated installation instructions](https://github.com/pantheon-systems/wp-saml-auth#installation) for explanation of all potential configuration options.

## Troubleshooting

- Google has a [dedicated support page](https://support.google.com/a/answer/6301076?hl=en) with errors you may see on any of their screens.

- [Open an issue](https://github.com/pantheon-systems/wp-saml-auth/issues) on the WP SAML Auth GitHub repo should you get stuck beyond what information is already online.
