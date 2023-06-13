---
title: WordPress Developer's Guide
subtitle: Secrets Management in WordPress
description: Best practices in managing secret keys in WordPress.
contenttype: [guide]
innav: [true]
categories: [security]
cms: [wordpress]
audience: [development]
product: [--]
integration: [aws]
tags: [files]
contributors: [carl-alberto]
reviewed: "2023-05-19"
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

### Via wp-config.php

Most plugin and theme author's documentation recommend storing license or API keys within the `wp-config.php` file. This is the most popular approach even though there are noted drawbacks, including:

- Less secure than other methods

- Lack of scalability, especially if you are using version control as this will store sensitive information in the codebase

We recommend that you store your license keys in a secure non-version controlled file location like `~/files/private/wp-config.secrets.php`. This is more secure and allows you to have different values in each environment.

```php
if ( file_exists( dirname( __FILE__ ) . '/wp-content/uploads/private/wp-config-secrets.php' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  if (!defined('WP_SAMPLE_KEY')) {
    define( 'WP_SAMPLE_KEY', 'EXAMPLEKEY1234' );
  }
}
```

### Via Terminus Secrets Plugin

Pantheon's [Terminus Secrets plugin](https://github.com/pantheon-systems/terminus-secrets-plugin) writes entries into the  `~/files/private/secrets.json` file.

<Alert title="Note"  type="info" >

The Terminus Secrets plugin uses `~/files/private/secrets.json`, which is a different private directory than the private directory used to store your Quicksilver scripts.

</Alert>

This is a JSON file containing multiple keys that are not included in your project's source code. The Terminus Secrets script fetches this file, modifies it as requested, and then writes it back to the Pantheon site.

You can add secret key pairs using this command for each:

```bash{promptUser: user}
terminus secrets:set examplesite.dev wp_sample_key EXAMPLEKEY1234
```

You can then parse those values via wp-config and assign them to the corresponding variables and environment using this sample code:

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

### Via Lockr

Lockr provides a simple-to-use developer interface with a scalable, cloud-based key management system. This allows applications of all sizes to meet industry standards for key management. Unlike other key managers, Lockr offers additional layers of security and system monitoring, no ongoing maintenance, and continuous development for integration with your favorite plugins. Refer to our documentation on how to use [Lockr on Pantheon to store your keys in WordPress](/guides/lockr#wordpress-installation) for more information.

## More Resources

- [WordPress Configuration Management](/guides/wordpress-configurations/wp-cfm)
- [WordPress wp-config Configuration](/guides/php/wp-config-php)
- [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin)
- [Store Your Secret Keys with Lockr](/guides/lockr)
