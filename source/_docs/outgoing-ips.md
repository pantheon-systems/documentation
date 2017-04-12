---
title: Dynamic Outgoing IP Addresses
description: Understand how outgoing requests are made for WordPress and Drupal sites on Pantheon.
tags: [infrastructure]
categories: []
---
Outgoing requests sent by Drupal and WordPress applications facilitate tasks between your site and external services, such as authentication and payment gateways.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Due to Pantheon's cloud-based infrastructure, these outbound requests are sent via dynamic IP addresses. There is no way to predict what IP address your code will be executed from.</p>
</div>

## Pantheon Enterprise Gateway
If your site relies on a static IP address for outgoing requests, the recommended solution is the [Pantheon Enterprise Gateway](/docs/pantheon-enterprise-gateway/). This is the only way to guarantee compatibility with extensions or services that require a known outgoing IP. Otherwise, you will need to find an alternative service to accomplish the request.

## IP Address Based Security Schemes
Each application container worker uses a distinct application server, each with a different hostname (which will not resolve externally) and datacenter assigned IP. Application servers are regularly seamlessly reconfigured, which may change both the hostname and IP.

IP-based security is not recommended on Pantheon—or any cloud platform. Instead, we recommend that you encrypt your communication using SSL certificates and other forms of authentication.

For more information, see [SSO and Identity Federation on Pantheon](/docs/sso/#ip-based-security-considerations).

## IP Address Ranges
We do not provide IP ranges for outgoing requests for application containers and other platform services. A limitation of cloud-based infrastructure is that the range of IP addresses can change at any time as new servers and systems are provisioned. This can happen at any time for security patches, upgrades, updates, and release of new features, which is a large part of the flexibility provided by containers and allows for zero downtime deployment of server resources.

Instead, we suggest that you use an alternate form of verification like API keys or similar, if possible. We also offer an Elite level product called a Pantheon Enterprise Gateway that will provide variables to each of your environments in order to establish a direct route to your sites.

For more information, see [Pantheon Enterprise Gateway](/docs/pantheon-enterprise-gateway/).

## Compatible Payment Gateways
The following payment gateways are known to work in cloud-based infrastructures such as ours:

- Recurly
- Braintree
- Square
- 2Checkout
- GoCardless
- Charity Clear


## Known Problematic Services
The following services are known to be problematic without using the [Pantheon Enterprise Gateway](/docs/pantheon-enterprise-gateway/):

- LDAP
- FirstData
- SagePay
