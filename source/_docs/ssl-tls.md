---
title: Pantheon SSL/TLS Support
description: Pantheon's recommendation regarding HTTPS/TLS in light of PCI DSS v3.1.
tags: [services, security]
categories: []
---
There are several types of encryption methods that browsers use:

- **HTTPS**: (HTTP over SSL or HTTP Secure) is the use of Secure Socket Layer (SSL) or Transport Layer Security (TLS) as a sublayer under regular HTTP application layering. HTTPS encrypts and decrypts user page requests as well as the pages that are returned by the Web server.
- **SSL**: (Secure Sockets Layer) is the standard security technology for establishing an encrypted link between a web server and a browser. This link ensures that all data passed between the web server and browsers remain private and integral.
- **TLS**: Transport Layer Security (TLS) is a protocol that ensures privacy between communicating applications and their users on the Internet. When a server and client communicate, TLS ensures that no third party eavesdrops or tampers with any message. TLS is the successor to the Secure Sockets Layer (SSL).
- **SSL Certificates**: Certificates designed to be used with encrypted website traffic are commonly called SSL Certificates.  The format of these certificates is established by the ITU-T X.509 standard.  They were initially deployed in conjunction with SSL and called SSL Certificates. It would be more accurate to call them X.509 certificates, but we continue to call them SSL Certificates even though TLS has replaced SSL as the secure means to connect to websites across the public internet.

We recommend organizations that are working to achieve PCI compliance while using Pantheon services engage a third-party service provider like [Cloudflare](https://www.cloudflare.com/) to terminate SSL/TLS connections.  Terminating SSL/TLS connections with a service provider that specializes in providing SSL/TLS gives you greater control over your configuration and ensures your service will track closely with changes to PCI DSS.

#### What versions of TLS do you support?
We only support TLS 1.1 and TLS 1.2. We have ended support for all versions of SSL and plan to end support for TLS 1.0 on June 30, 2016. [Older browsers and mobile devices](https://en.wikipedia.org/wiki/Transport_Layer_Security#Web_browsers) that do not support TLS 1.1 and 1.2 are likely to experience problems and security vulnerabilities. If you need to continue support for TLS 1.0, you can do so with [Cloudflare](https://pantheon.io/docs/cloudflare/). For details, see [Cloudflare's documentation](https://support.cloudflare.com/hc/en-us/articles/205043158-PCI-3-1-and-TLS-1-2).

#### After you end support for TLS 1.0, do I need to do anything?
Very few sites will need to take action to support TLS 1.0. However, if you need to support [older browsers and devices](https://en.wikipedia.org/wiki/Template:TLS/SSL_support_history_of_web_browsers), you'll need to enable TLS 1.0 via [Cloudflare](https://pantheon.io/docs/cloudflare/). For details, see [Cloudflare's documentation](https://support.cloudflare.com/hc/en-us/articles/205043158-PCI-3-1-and-TLS-1-2).

#### Terminus Authentication
If you use Terminus, make sure your version of OpenSSL supports TLS 1.2 (recent versions of OpenSSL 1.0.1 and greater). This includes any integration that connects to the platform (e.g. CircleCI and other build automation tools).


#### Where is SSL/TLS being used in your environment?  
TLS 1.1 and 1.2 are being used between the web browser and customer sites using load balancers provided by Pantheon. Pantheon load balancers are configured to prefer the highest grade encryption supported by the browsers.

#### How are you mitigating risks with SSL/TLS until you can migrate?  
We have configured load balancers to aggressively negotiate the highest grade encryption available to both the browser and the load balancers. This ensures that the vast majority of traffic uses a modern encryption suite.

#### How are you monitoring for new vulnerabilities associated with TLS?
We monitor the U.S. Government National Vulnerability Database for announcements regarding TLS vulnerabilities.

#### How are you ensuring that SSL and TLS 1.0 are not introduced into your environment?  
We have a number of controls in place to ensure insecure protocols are not introduced into our environment.  They include developer training on the end of support for insecure protocols, a software development review/approval process before deploying to production, and periodic vulnerability scans.
