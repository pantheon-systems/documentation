---
title: Securely Working with phpinfo
description: Important security considerations when working with phpinfo on your Pantheon Drupal site.
tags: [debugcode, services]
categories: []
---
We serve our customers by provisioning isolated linux containers with an optimized PHP stack. The php.ini is part of a highly tuned configuration and is not user-configurable.
We continually deploy new builds of PHP and you also have the ability to [upgrade PHP versions](/docs/php-versions/). If you'd like to see
a comprehensive list of what's installed with the version of PHP in use by a particular environment, you may use [phpinfo](http://php.net/manual/en/function.phpinfo.php).

## Important Security Notes

 * phpinfo exposes sensitive information like the password to connect to the DB
 * If using method 2, delete the phpinfo file immediately after creating and viewing


### Drupal Note

Drupal makes the phpinfo available to privileged users at: `http://example.com/admin/reports/status/php`


## Review phpinfo

1. [Lock environment](/docs/lock-environment/)  (if the environment does not currently need to be publicly accessible).
2. Create a php file with an obscure filename that uses phpinfo.
3. Visit the file in a web browser to view phpinfo.
 ![obscure-phpinfo-filename](/source/docs/assets/images/obscure-phpinfo-delete-immediately.png)
4. Delete the file immediately so you do not expose sensitive information, such as a password, to connect to the DB.
