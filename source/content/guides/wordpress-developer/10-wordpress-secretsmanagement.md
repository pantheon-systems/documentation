---
title: WordPress Developer's Guide
subtitle: API Keys or Secret Keys Management in WordPress
description: Best practices in managing secret keys in WordPress
contenttype: [guide]
innav: [false]
categories: [cms]
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

## API Keys

API keys are used to authenticate and authorize access to external services or APIs (Application Programming Interfaces). API keys are unique identifiers that allow websites or applications to communicate with these external services securely. Examples are SMTP servers, AWS S3 The usual way in handling API keys or Secrett This section provides information on ways to handle secrets keys in WordPress. It's important to keep your API keys secure and avoid sharing them publicly. If an API key is compromised or exposed, unauthorized access to your account or service can occur. Additionally, regularly review and revoke any unused or unnecessary API keys to maintain the security of your WordPress site.

## Plugin or Theme License Keys

Plugin and theme license keys are unique codes used to activate and authenticate premium plugins and themes. These keys are provided by developers or vendors to ensure licensed users have access to full features, updates, and support. License keys are entered in settings, verified by vendors' licensing servers, and grant access to updates and assistance. They often have limitations on installations and require annual renewals. License keys protect developers' work and help maintain sustainable development. Free plugins and themes on WordPress.org generally don't need license keys. It's important to keep license keys confidential to prevent unauthorized usage.

## Ways to store your keys

### Via wp-config.php

Most plugin and theme author's documentation recommend in storing their license or API keys via the wp-config.php file. While this is the most popular approach, it would not be secure and scalable specially if you are using version control as this will store those sensitive information in the codebase. It would still be best to have it stored on a secure non-version controlled file location like `~/files/private/wp-config.secrets.php`, in this way, it can have different values in each environement.

```
if ( file_exists( dirname( __FILE__ ) . '/wp-content/uploads/private/wp-config-secrets.php' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  if (!defined('WP_SAMPLE_KEY')) {
    define( 'WP_SAMPLE_KEY', 'EXAMPLEKEY1234' );
  }
}
```

### Terminus secrets plugin

This plugin writes entries into the file ~/files/private/secrets.json (NOTE: This refers to a different private directory than the private directory used to store your Quicksilver scripts!). This file is, naturally enough, a JSON file containing multiple keys that is not included in your project's source code. The terminus secrets script will fetch this file, modify is as requested, and then write it back to the Pantheon site. 

You can add secret key pairs using this command for each:

```
terminus secrets:set examplesite.dev wp_sample_key EXAMPLEKEY1234
```

You can then parse those values via wp-config and assign them to the corresponding variables and environment using this sample code:

```
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

Lockr provides a simple-to-use developer interface with a managed scalable cloud key management system. This allows applications of all sizes to meet industry standards for key management. Unlike other key managers, Lockr offers additional layers of security and system monitoring, no ongoing maintenance, and continuous development for integration with your favorite plugins. Please see this [guide in using Lockr to store your keys in WordPress](/guides/lockr#wordpress-installation).



## More Resources

- [WordPress Configuration Management](/guides/wordpress-configurations/wp-cfm)
- [WordPress wp-config configuration](/guides/php/wp-config.php)
- [Terminus Secrets plugin](https://github.com/pantheon-systems/terminus-secrets-plugin)
- [Storingg Your Secret Keys Via Lockr](/guides/lockr)
