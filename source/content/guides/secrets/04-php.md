---
title: Pantheon Secrets Guide
subtitle: PHP Usage
description: How to read Pantheon Secrets from code.
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/php
reviewed: "2024-07-30"
showtoc: true
---

## Reading secrets from PHP
It is only possible to read secrets from the Drupal or WordPress site. Modifying secrets from within the application itself is not supported. Secrets are created and modified via the [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin).

Secrets must have the scope `web` to be visible from your application. Secrets are cached in the server for 15 minutes, so you must wait for a while after modifying secret values before they will be available for use. This cache is also encrypted at rest.

Note: this also applies to quicksilver scripts.

### Use the pantheon_get_secret PHP function

The function `pantheon_get_secret()` may be used to fetch the value of a single secret.

```php
$secret_value = pantheon_get_secret("SECRET_NAME");
```

## WordPress detailed example
In this guide we will go over an end-to-end example on how to setup secrets for a given site and how to read those secrets in `wp-config.php`. For this example, we will use the [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) plugin to setup Sendgrid.

### Prerequisites

- Make sure you have access to a WordPress site on Pantheon.

- Make sure you have [terminus installed](https://docs.pantheon.io/terminus/install#install-terminus) in your machine

- Install the [Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin#installation)

### Steps

1. Install and activate the [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) plugin.
1. Make sure your Sendgrid account is correctly configured and allows sending email.

1. Create a Sendgrid API key by following [Sendgrid instructions](https://docs.sendgrid.com/ui/account-and-settings/api-keys#creating-an-api-key)

1. Store the API key as a site secret:

    ```bash{promptUser: user}
    terminus secret:site:set <site> sendgrid_api <api_key> --scope=web --type=runtime
    ```

    As a best practice, the non-production environments should be the default and then override that value with a [secret environment override](/guides/secrets/overview#environment-override) to change the API key for the live environment (e.g. you want to use different Sendgrid accounts for live and dev environments)
1. Add the following to `wp-config.php`, replacing placeholder values (e.g., `example@example.com` and `Example From Name`):

  ```php
  define( 'WPMS_ON', true ); // True turns on the WPMS constants for usage below, false turns it off.
  define( 'WPMS_MAIL_FROM', 'example@example.com' );  
  define( 'WPMS_MAIL_FROM_NAME', 'Example From Name');
  define( 'WPMS_MAILER', 'sendgrid' );
  if ( function_exists('pantheon_get_secret') ) {
  	define( 'WPMS_SENDGRID_API_KEY', pantheon_get_secret( 'sendgrid_api' ) );
  }
  ```

1. Go to the Sendgrid email test page (`/wp-admin/admin.php?page=wp-mail-smtp-tools&tab=test`) and test your Sendgrid integration by sending a test email.

## More Resources
For advanced use cases, you may consider leveraging the [Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk) library as an alternative to the `pantheon_get_secret` function.
