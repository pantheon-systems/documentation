---
title: Using WP SAML Auth with Google Apps
description: WP SAML Auth makes it possible to sign in to your WordPress site using Google Apps.
contributors: [danielbachhuber]
tags: [siteintegrations, security]
categories: [automate]
---
If your organization uses Google Apps, WP SAML Auth lets your users sign into WordPress using their Google Account. This makes it much easier to manage user accounts; rather than recreate WordPress accounts for every user, you can treat Google Apps as your *Identity Provider* for *Single Sign-On* (SSO) and have WordPress defer to Google when determining who should have access and who shouldn’t.

## Before You Begin

First, setting up is a matter of applying the correct configuration. It should take an hour or less. If you get stuck on a configuration error along the way, please reach out.

Second, creating a custom Google Apps SAML application requires a Google Apps administrator account. If you don’t have appropriate permissions, you’ll need to pair up with someone that does.

Lastly, as you work through this process, there are two key SAML authentication terms to keep in mind:

- **Identity Provider** - Where user information is housed (e.g. Google Apps).
- **Service Provider** - Application depending on user information provided by the Identity Provider (e.g. WordPress).

You’ll see these in reference documentation, so it’s important to keep them straight so you know what configuration goes where.


## 1. Create a custom Google Apps SAML application
To use WP SAML Auth with Google Apps, you’ll need to first [create a custom SAML application](https://support.google.com/a/answer/6087519) and enable it for your users.

Find the “SAML Apps” dashboard in the Google Apps admin, and click “Add a service/App to your domain”.

![Google Apps SAML No Apps](/source/docs/assets/images/wordpress-google-sso/google-admin-saml-apps.png)

When the modal opens, you'll need to click "Setup My Own Custom App".

![Google Apps Enable SAML](/source/docs/assets/images/wordpress-google-sso/enable-sso-for-samle-application.png)

On the Google IdP page, the key details are in the Option 1 section:

* **SSO URL** - URL for WordPress to redirect to when initiating the SSO process. In the configuration snippet below, this URL will go in the `$value['idp']['singleSignOnService']['url']` variable.
* **Entity ID** - How WordPress knows to recognize Google Apps. In the configuration snippet below, this value will go in the `$value['idp']['entityId']` variable.
* **Certificate** - How Google Apps knows to trust a request coming from WordPress. Download and commmit this file to your `private` directory so it's inaccessible from the web. In the configuration snippet below, make sure to `file_get_contents()` this file into the `$value['idp']['x509cert']` variable.

![Google IdP Information](/source/docs/assets/images/wordpress-google-sso/google-idp-information.png)

![Google SAML Basic Info tab](/source/docs/assets/images/wordpress-google-sso/google-saml-basic-info.png)

![Google App Name](/source/docs/assets/images/wordpress-google-sso/google-saml-app-name.png)

![Google App SAML Service Provider Details](/source/docs/assets/images/wordpress-google-sso/service-provider-details.png)

![Google App Attribute Mapping](/source/docs/assets/images/wordpress-google-sso/attribute-mapping.png)



## 2. Configure WP SAML Auth to connect to Google Apps
Once you’ve created a custom Google Apps SAML application, configure WP SAML Auth to connect to it. WP SAML Auth’s settings are configured by filtering `wp_saml_auth_option`. In the example below, ‘wp-saml-auth’ is the test account; make sure you replace those with the appropriate values.


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
        $value['sp']['assertionConsumerService']['url'] = 'https://wp-saml-auth.dev/wp-login.php';
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
    });


## Troubleshooting
Google has a [dedicated support page](https://support.google.com/a/answer/6301076?hl=en) with errors you may see on any of their screens.
