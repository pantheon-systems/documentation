---
title: SSO and Identity Federation on Pantheon
description: Use SSO to centrally manage user identities and provide seamless integration across multiple applications.
tags: [security, tools]
categories: []
---
Many organizations need to centrally manage their user's identities and provide seamless integration across multiple applications. Numerous Pantheon customers, including higher educational institutions, school districts, local governments, and other groups use a variety of single sign-on (SSO) solutions. Learn more about [Single Sign-On for Pantheon Organization](/docs/sso-organizations/).

Pantheon’s flexible infrastructure does not restrict protocols or ports used for communication. There are no outbound restrictions (protocol, port, etc.) for traffic from Pantheon to external services.

Use SSL certificates for encrypted secure communication with externally hosted servers for authentication.

## Two-Factor Authentication
Two-factor authentication (TFA) is a security practice that requires users of your website to provide, along with their standard username and password, an additional form of authentication to log in.

We strongly recommend using SAML, both for sites and the Dashboard. Learn more about [two-factor authentication](/docs/guides/two-factor-authentication/).

## LDAP and LDAPS (LDAP over SSL)

Both LDAP and LDAPS are supported on Pantheon. For more information, see [LDAP and LDAPS on Pantheon](/docs/ldap-and-ldaps/).

## Shibboleth and SimpleSAMLphp

[Shibboleth](http://shibboleth.net/) is an open-source single sign-on solution. Use [SimpleSAMLphp](http://simplesamlphp.org/) as a service provider to connect to either Shibboleth or a SAML 2.0 Identity Provider. For more information on SimpleSAMLphp on Pantheon, see [Using SimpleSAMLphp](/docs/shibboleth-sso).

## OAuth

[OAuth](http://oauth.net/) is an open authorization standard and customers have reported success using it.  

Also, Pantheon includes the [PECL OAuth](http://us.php.net/oauth) PHP extension. If you need a different version, you can download the library and rename the class to avoid a naming conflict.

## IP-Based Security Considerations

Pantheon is a cloud platform, so there are some considerations that you should be aware of.  

Pantheon provides a single dedicated incoming IP address for sites with custom SSL certificates. Each dedicated IP is assigned by the datacenter.  

Pantheon does not have a mechanism for providing a dedicated outbound IP address. This is important to know if you are using a firewall with IP-based rules.  

Each application container worker uses a distinct application server, each with a different hostname (which will not resolve externally) and datacenter assigned IP. Application servers are regularly seamlessly reconfigured, which may change both the hostname and IP.  

Live sites on Pantheon on Professional plans and above use multiple application container workers. This means (among other things) multiple distinct application servers and distinct outbound IPs.  In short, IP-based security is not recommended on Pantheon - or any cloud platform. Instead, we recommend that you encrypt your communication using SSL certificates and other forms of authentication.

For more information, see [Dynamic Outgoing IP Addresses](/docs/outgoing-ips).
