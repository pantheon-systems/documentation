---
title: WordPress Developer's Guide
subtitle: Secrets Management in WordPress
description: Best practices in managing secret keys in WordPress.
contenttype: [guide]
innav: [false]
categories: [cms]
cms: [wordpress]
audience: [development]
product: [--]
integration: [aws]
tags: [files]
contributors: [carl-alberto]
reviewed: "2024-10-09"
showtoc: true
permalink: docs/guides/wordpress-developer/wordpress-secrets-management
---

This section provides information on secrets management for WordPress.

## API Keys

API keys are used to authenticate and authorize access to external services or APIs (Application Programming Interfaces). API keys are unique identifiers that allow websites or applications to communicate with external services securely. Examples of this method include SMTP servers and AWS S3.

You should keep your API keys secure and avoid sharing them publicly. If an API key is compromised or exposed, unauthorized access to your account or service can occur. Additionally, regularly review and revoke unused or unnecessary API keys to maintain the security of your WordPress site.

## Plugin or Theme License Keys

Free plugins and themes on [WordPress.org](https://wordpress.org/) generally don't require license keys, however, premium or paid plugins and themes sometimes require license keys for authentication.

Plugin and theme license keys are unique codes used to activate and authenticate premium plugins and themes. These keys are provided by developers or vendors to ensure licensed users have access to full features, updates, and support. License keys are entered in settings, verified by vendors' licensing servers, and used to grant access to updates and provide assistance. License keys often have limitations on installations and require annual renewals. License keys protect developers' work and help maintain sustainable development. It's important to keep license keys confidential to prevent unauthorized usage.

## Store Your Keys

Most plugin and theme author's documentation recommend storing license or API keys within the `wp-config.php` file. This is the most popular approach even though there are noted drawbacks, including:

- Less secure than other methods

- Lack of scalability, especially if you are using version control as this will store sensitive information in the codebase

### Use Pantheon Secrets
Instead, we recommend using [Pantheon Secrets](/guides/secrets) to securely manage keys on the platform.

Set the key via Terminus, then use the `pantheon_get_secret()` function in your script, for example:

```php
if ( function_exists('pantheon_get_secret') ) {
  $secret_value = pantheon_get_secret( 'secret_name' );
}
```
### Use the private files path
Alternatively, you can use your site's [private files path](/guides/secure-development/private-paths#private-path-for-files) to store and retrieve values.

Create a `secrets.json` file with your key value and name in json format and add it to the private files path at `/wp-content/uploads/private` on Pantheon. Then in your `wp-config.php` file you can retrieve the value, for example:

```php
if ( file_exists( dirname( __FILE__ ) . '/wp-content/uploads/private/secrets.json' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
	$json = json_decode( file_get_contents( dirname( __FILE__ ) . '/wp-content/uploads/private/secrets.json' ) );

	if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
				if ( isset( $json->wp_sample_key ) ) {
					define( 'WP_STATELESS_MEDIA_JSON_KEY', $json->wp_sample_key );
				}
  }
}
```

## More Resources

- [WordPress Configuration Management](/guides/wordpress-configurations/wp-cfm)
- [WordPress wp-config Configuration](/guides/php/wp-config-php)
- [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin)
