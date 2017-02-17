---
title: Early Access: Free HTTPS
earlyaccess: true
description: Upgrade to Free HTTPS on the Pantheon Global Edge.
---

Upgrade eligible sites to the new Pantheon Global Edge for access to free HTTPS across all domains and environments. This service allows for automatic certificate provisioning and renewal for domains routed to Pantheon using the recommended values provided in the Site Dashboard.

Free HTTPS is currently invite only.

## Upgrade
TODO
1. From the Site Dashboard...
2. Once the certs are ready..
3. ...


<unique-site-name>
<site-label>


## Frequently Asked Questions
### Which sites are eligible for upgrade?
Currently, Professional sites that have custom domains routed to a legacy HTTPS-terminating load balancer are eligible for upgrade. If you have HTTPS enabled on a site that does not show as eligible, ensure that DNS for custom domains is routed per the DNS recommendations shown on the site dashboard, in the environment’s **Domains** tool.

### Does upgrading involve interruption in HTTPS availability or downtime?
No, upgrading existing domains already routed to Pantheon involves no downtime or HTTPS interruption.

If you add a new domain after upgrading, however, then it can take a few hours for certificates to be issued and deployed after you route DNS to your Pantheon site, so there will be no downtime, but there will be an interruption of HTTPS availability.
What level of encryption is provided?

Highest grade of TLS encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration of a site on the Pantheon Global Edge see https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io

### What browsers and operating systems are supported?
All modern browsers and operating systems are supported. See [Handshake Simulation](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).


#### Possibly Incompatible:

* Sony PS3 and PS4 Game Consoles

#### Known Incompatible:

* Chrome < v30
* Firefox < v27
* Blackberry OS v10, v7, & v6
* Android < v5.0
* Nintendo 3DS
* IE < v11
* Opera < v17
* Safari < v11
* Windows XP prior to SP3
* Cannot handle SHA-2 signed certificates
* Java < JDK 8u101


### Is caching behavior changing?
All of the behavior you’d expect stays the same on the Global Edge. Install Pantheon Advanced Page Cache on your Drupal 7, Drupal 8, or WordPress site to take advantage of Surrogate Keys (aka cache tags).

### Is Extended Validation supported?
No, please contact us if you require Extended Validation.

### Are wildcard certificates supported?
No, but you don’t need a wildcard certificate to secure communications for multiple domains because we will automatically deploy certificates for all domains on your site

### Is the CDN configurable? Do I get access to hit rates or other statistics?
We manage the CDN so you don’t have to hassle with configuration. We’ve optimized configuration for Drupal and WordPress sites. Hit rates or other statistics are not currently available.

### What is a shared certificate?
Shared certificates use a Subject Alternative Name (SAN) certificate to host multiple hostnames or domains on one certificate. You provide your domain name list or one or more wildcard domain name entries. We add these domain names to our certificate SAN field and take care of certificate administration.

### What is TLS?
TLS (Transport Layer Security) is a protocol for secure HTTP connections. This protocol replaces its less secure predecessor, the SSL (Secure Socket Layer) protocol, which we no longer support. When referring to secure HTTP connections, our documentation uses the term HTTPS

### Does the Pantheon Global Edge use Server Name Indication (SNI)?
Can I downgrade back to the legacy HTTPS loadbalancer?
