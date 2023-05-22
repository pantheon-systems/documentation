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

Most plugin and theme author's documentation recommend in storing their license or API keys via the wp-config.php file. While this is the most popular approach, it would not be secure and scalable specially if you are using version control as this will store those sensitive information in the codebase. It would still be best to have it stored on a secure non-version controlled file location like `~/files/private/wp-config.secrets.php`, in this way, it can have different values in each environement

```
if ( file_exists( dirname( __FILE__ ) . '/wp-content/uploads/private/wp-config-secrets.php' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  if (!defined('WP_SAMPLE_KEY')) {
    define( 'WP_SAMPLE_KEY', 'EXAMPLEKEY1234' );
  }
}
```

### Terminus secrets plugin

This plugin writes entries into the file ~/files/private/secrets.json (NOTE: This refers to a different private directory than the private directory used to store your Quicksilver scripts!). This file is, naturally enough, a JSON file containing multiple keys that is not included in your project's source code. The terminus secrets script will fetch this file, modify is as requested, and then write it back to the Pantheon site. 

https://github.com/pantheon-systems/terminus-secrets-plugin

### Via Lockr

https://docs.pantheon.io/guides/lockr



## More Resources

- [WordPress Configuration Management](/wordpress-configurations/wp-cfm)
- [WordPress wp-config configuration](/guides/php/wp-config.php)
