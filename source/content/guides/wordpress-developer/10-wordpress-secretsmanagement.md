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



## Ways to store your keys

### Via wp-config.php

https://docs.pantheon.io/guides/php/wp-config-php

### Terminus secrets plugin

https://github.com/pantheon-systems/terminus-secrets-plugin

### Via Lockr

https://docs.pantheon.io/guides/lockr



## More Resources

- [WordPress Configuration Management](/wordpress-configurations/wp-cfm)
