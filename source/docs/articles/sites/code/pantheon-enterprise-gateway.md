---
title: Pantheon Enterprise Gateway
description: Configuring your Drupal or WordPress site to use the Pantheon Enterprise Gateway as a defense-in-depth solution to access systems behind firewalls.
category:
  - developing
keywords: pantheon enterprise gateway, enterprise gateway, peg, gateway, firewall, secure tunnel, tunnel, create firewall, firewalls, gateways, gateway
---
[Pantheon Enterprise Gateway](https://pantheon.io/features/secure-integration) creates a secure tunnel between your firewall and your public facing website. This is available for customers with an Elite plan. [Contact us](https://pantheon.io/why-pantheon-enterprise) for more information.

### How do I configure my Pantheon site to use the Pantheon Enterprise Gateway?

We'll create a ticket to guide you through the one-time setup and request the following for each of your remote services:

* IP address
* Port number
* Name to identify connection
   - Uppercase letters and underscores allowed
  -  Used for [PHP Constant](http://php.net/manual/en/language.constants.php) that will replace the numeric port number in your code

Once setup is complete on our end, we'll provide you with the information you need to use the Pantheon Enterprise Gateway.

Please note that any code you're using to connect to the remote service must accept a PHP Constant for the port number. For example: If you have two LDAP servers, one for staff and another for students, you may choose LDAP_STAFF and LDAP_STUDENTS as names to identify the connections.

Direct connection, no Pantheon Enterprise Gateway:
```nohighlight
123.45.6.22:443
223.23.4.33:443
```

Secure integration with Pantheon Enterprise Gateway:
```nohighlight
127.0.0.1:PANTHEON_SOIP_LDAP_STUDENTS
127.0.0.1:PANTHEON_SOIP_LDAP_STAFF
```

For a more complete example, see: [Single-origin IP example code](https://github.com/pantheon-systems/soip-example).

WordPress and Drupal both work with the Pantheon Enterprise Gateway. If you’re using the Drupal 7 LDAP module, apply the [patch](https://www.drupal.org/files/issues/ldap_php-constant-port_1.patch) prepared by one of our engineers [listed on Drupal.org](https://www.drupal.org/node/2283273). The patch allows the use of a PHP constant for the port number, and gives a good example should you need to write a similar patch for another module.

### Does the Pantheon Enterprise Gateway work from all site environments?

Yes, it's configured on a site-by-site basis and works from all environments (Dev, Test, Live, and Multidev).

### Is Pantheon Enterprise Gateway a replacement for authentication?

No, Pantheon Enterprise Gateway is not a replacement for authentication, but rather is a [defense-in-depth](http://en.wikipedia.org/wiki/Defense_in_depth_%28computing%29) measure.
