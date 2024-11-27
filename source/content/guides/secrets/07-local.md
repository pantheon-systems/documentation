---
title: Pantheon Secrets Guide
subtitle: Local Development Usage
description: Developing locally presents some unique challenges once Pantheon Secrets are built into your workflow. These are some tips to help you get past struggling with trying to reproduced secret behavior while developing locally.
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/local
reviewed: "2024-08-22"
showtoc: true
---
## Local Environment Usage

The [Pantheon Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk) includes a `CustomerSecretsFakeClient` implementation that is used when the SDK runs outside of Pantheon infrastructure. This client uses a secrets JSON file to build the secrets information emulating what happens on the platform using the Secrets service.

To get this file, you should use the [plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin/) `secret:site:local-generate` command and then set an environment variable into your local environment (or docker container if you are running a docker-ized environment) with name `CUSTOMER_SECRETS_FAKE_FILE` and use the absolute path to the file as the value.

1.  To get generate this file, run `terminus secret:site:local-generate` in your terminal in your project root:

    ```bash
    terminus secret:site:local-generate <site>
    ```

    Replace `<site>` with your Pantheon site name. The `secrets.json` file will be generated in your project root.

1. Once you have the `secrets.json`, add it to your `.gitignore` so you do not accidentally commit it to your repository.

    ```text
    # Ignore Pantheon local secrets file
    secrets.json
    ```

### Lando configuration

1. Modify your `.lando.yml`:
    ```yaml
    services:
      appserver:
        overrides:
          environment:
              CUSTOMER_SECRETS_FAKE_FILE: /app/secrets.json
    ```

1. Rebuild your Lando application:
    ```bash{promptUser: user}
    lando rebuild -y
    ```

### DDEV configuration

1. CD to your DDEV root directory
1. Add to your `.ddev/config.yml`:
    ```yaml
    web_environment:
    - CUSTOMER_SECRETS_FAKE_FILE=/var/www/html/secrets.json
    ```

1. Restart your DDEV environment:
    ```bash{promptUser: user}
    ddev restart
    ```

## Verifying Secrets Access

### Local Development Function

The `pantheon_get_secret()` function only works on Pantheon's infrastructure, not in local development.  For local development, you can create a helper function that mimics the `pantheon_get_secret()` function. To do this, you can use the [Pantheon Customer Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk). This SDK mirrors the code that is already integrated into the platform. The easiest way to install the Customer Secrets SDK locally is via Composer:

```bash{promptUser: user}
composer require-dev pantheon-systems/customer-secrets-php-sdk
```

Once you have the SDK locally, you can create a local version of `pantheon_get_secret` using the SDK:

```php
if ( ! function_exists( 'pantheon_get_secret' ) ) {
    function pantheon_get_secret( $token = '' ) {
        // Check if SDK class exists, if not try to load the Composer autoloader.
        if ( ! class_exists( '\PantheonSystems\CustomerSecrets\CustomerSecrets' ) ) {
            $autoloader = __DIR__ . '/vendor/autoload.php';
			if ( file_exists( $autoloader ) ) {
				require_once $autoloader;
			} else {
                // Autoloader not found - handle appropriately for your application.
                return null;
            }
        }

        // Create SDK client for local development
		try {
			$client = \PantheonSystems\CustomerSecrets\CustomerSecrets::create()->getClient();
			$secret = $client->getSecret( $token );
			return $secret ? $secret->getValue() : null;
		} catch ( \Exception $e ) {
            // Handle errors appropriately for your application
			return null;
		}
    }
}
```

This approach allows your code to work seamlessly both on Pantheon (where `pantheon_get_secret()` is natively available) and in local development (where you provide your own implementation).

### Drupal-Specific
If using Drupal with the Key module and Pantheon Secrets module:
1. Go to the Key module configuration
2. Click the "Sync Pantheon Secrets" tab
3. Click the "Sync Keys" button
4. Your secrets from the JSON file should appear in the available list of keys

## Restrictions
For secrets without "user" scope, the `secret:site:local-generate` command will set the value of the secret to "null". You must manually set test values in your local `secrets.json` file.
