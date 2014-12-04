---
title: Configuring a Site to Use the Pantheon Enterprise Gateway
filename: source/_common-tasks/how-to-configure-your-site-to-work-with-the-pantheon-enterprise-gateway.md
tools:
  -
---

[Pantheon Enterprise Gateway](https://www.getpantheon.com/pantheon-enterprise-gateway) creates a secure tunnel between your firewall and your public website and is available for enterprise customers. [Contact us](https://www.getpantheon.com/contact/enterprise) for more information.

### Configure a Site to Use the Pantheon Enterprise Gateway

After purchasing the Pantheon Enterprise Gateway, a support ticket will be created and we will guide you through the process. We set up the gateway on our end, and you'll need to do a one time setup on your end.

If you’re using the LDAP module you can [apply the patch](https://www.drupal.org/files/issues/ldap\_php-constant-port\_1.patch) prepared by one of our Engineers, which [allows the use of a PHP constant for the port number](https://www.drupal.org/node/2283273).

If you’re not using the LDAP module, you’ll need to modify your code to accept a PHP constant for the port number. The code in the patch gives a good example of how to do so.

###Frequently Asked Questions

####Once it's set up, how do I test it with my site?

See the [SOIP example](https://github.com/pantheon-<wbr></wbr>systems/soip-example) on Github.

#### Is Pantheon Enterprise Gateway a replacement for authentication?

No, Pantheon Enterprise Gateway is not a replacement for authentication. It is a [defense-in-depth](http://en.wikipedia.org/wiki/Defense_in_depth_%28computing%29) measure.
