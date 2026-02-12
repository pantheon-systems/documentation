---
title: Single Sign-on with Pantheon
subtitle: SSO and Identity Federation on Pantheon
description: Use SSO to centrally manage user identities and provide integration across multiple applications.
tags: [security, sso, users]
contenttype: [guide]
innav: [true]
showtoc: true
categories: [security]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [shibboleth, sso]
permalink: docs/guides/sso/sso
---

This section provides recommendations and supported solutions for SSO on Pantheon.

## SSL Certificates

Use Secure Sockets Layer (SSL) certificates for encrypted secure communication with externally hosted servers for authentication.

## Two-Factor Authentication

Two-factor authentication (TFA) is a security practice that requires your website users to provide their standard username and password, as well as an additional form of authentication to log in.

We strongly recommend using SAML, both for sites and the Dashboard. Learn more about [two-factor authentication](/guides/secure-development/two-factor-authentication).

## LDAP and LDAPS

Both Lightweight Directory Access Protocol (LDAP) and LDAP over SSL (LDAPS) are supported on Pantheon. Refer to [LDAP and LDAPS on Pantheon](/ldap-and-ldaps) for more information.

## Shibboleth and SimpleSAMLphp

[Shibboleth](https://shibboleth.net/) is an open-source SSO solution. Use [SimpleSAMLphp](https://simplesamlphp.org/) as a service provider to connect to either Shibboleth or a SAML 2.0 Identity Provider. Refer to [Use SimpleSAMLphp](/guides/sso/shibboleth-sso) for more information.

## OAuth

[OAuth](https://oauth.net/) is an open authorization standard that customers have reported success using.

Pantheon includes the [PECL OAuth](http://us.php.net/oauth) PHP extension. If you need a different version, you can download the library and rename the class to avoid a naming conflict.

## IP-Based Security Considerations

Pantheon is a cloud platform, so there are some considerations that you should be aware of.

Pantheon provides a single shared unique IP address for sites using [Free and Automated HTTPS](/guides/global-cdn/https).

Pantheon does not have a mechanism for providing a dedicated outbound IP address. This is important to know if you are using a firewall with IP-based rules.

Each application container worker uses a distinct application container. Each container has a different hostname (which will not resolve externally) and data center-assigned IP. Application servers are regularly reconfigured, which can change both the hostname and IP address.

Live sites on Pantheon with Performance plans and above use multiple application container workers. This means (among other things) that there are multiple distinct application containers and distinct outbound IPs. In short, IP-based security is not recommended on Pantheon or any cloud platform. Instead, we recommend that you encrypt your communication using SSL certificates and other forms of authentication.

Refer to [Dynamic Outgoing IP Addresses](/outgoing-ips) for more information.

## More Resources

- [Secure Development on Pantheon](/guides/secure-development)
- [Platform Security](/guides/platform-considerations/platform-security)