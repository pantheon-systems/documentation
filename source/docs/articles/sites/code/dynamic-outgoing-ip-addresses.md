---
title: Dynamic Outgoing IP Addresses
description: Understand how outgoing requests are made for WordPress and Drupal sites on Pantheon.
category:
  - developing
keywords: outgoing, outgoing requests, outgoing request, static ip, static ip outgoing, dynamic ip, dynamic outgoing ip, dynamic ip outgoing, outbound requests, dynamic outgoing ip addresses, payment gateway, gateway
---
Outgoing request sent by Drupal and WordPress applications facilitate tasks between your site and external services, such as authentication and payment gateways. Due to Pantheon's cloud-based infrastructure, these outbound requests are sent via dynamic IP addresses. There is no way to predict what IP address your code will be executed "from".

## Pantheon Enterprise Gateway
If your site relies on a static IP address for outgoing requests, the recommended solution is the [Pantheon Enterprise Gateway](/docs/articles/sites/code/pantheon-enterprise-gateway/). This is the only way to guarantee compatibility with extensions or services that require a known outgoing IP. Otherwise, you will need to find an alternative service to accomplish the request.

## IP-Address Based Security Schemes
Each Application Container worker uses a distinct application server, each with a different hostname (which will not resolve externally) and datacenter assigned IP. Application servers are regularly seamlessly reconfigured, which may change both the hostname and IP.

IP-based security is not recommended on Pantheon - or any cloud platform. Instead, we recommend that you encrypt your communication using SSL certificates and other forms of authentication.

For more information, see [SSO and Identity Federation on Pantheon](/docs/articles/sites/code/sso-and-identity-federation/#ip-based-security-considerations).

## Compatible Payment Gateways
The following payment gateways are known to work in cloud-based infrastructures such as ours:

- Recurly
- Braintree
- Square
- 2Checkout
- GoCardless
- Pingit
- PayM
- MasterPass
- Charity Clear


## Known Problematic Services
The following services are known to be problematic without using the [Pantheon Enterprise Gateway](/docs/articles/sites/code/pantheon-enterprise-gateway/):

- LDAP
- FirstData
- SagePay

## See Also

- [Known Limitations](/docs/articles/sites/known-limitations/#ip-address-based-security-schemes)
