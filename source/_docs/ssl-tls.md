---
title: Pantheon SSL/TLS Support
description: Pantheon's recommendation regarding HTTPS/TLS in light of PCI DSS v3.1.
categories:
  - security
  - developing
  - managing

---
- **HTTPS**: (HTTP over SSL or HTTP Secure) is the use of Secure Socket Layer (SSL) or Transport Layer Security (TLS) as a sublayer under regular HTTP application layering. HTTPS encrypts and decrypts user page requests as well as the pages that are returned by the Web server.
- **SSL**: (Secure Sockets Layer) is the standard security technology for establishing an encrypted link between a web server and a browser. This link ensures that all data passed between the web server and browsers remain private and integral.
- **TLS**: Transport Layer Security (TLS) is a protocol that ensures privacy between communicating applications and their users on the Internet. When a server and client communicate, TLS ensures that no third party eavesdrops or tampers with any message. TLS is the successor to the Secure Sockets Layer (SSL).
- **SSL Certificates**: Certificates designed to be used with encrypted website traffic are commonly called SSL Certificates.  The format of these certificates is established by the ITU-T X.509 standard.  They were initially deployed in conjunction with SSL and called SSL Certificates. It would be more accurate to call them X.509 certificates, but we continue to call them SSL Certificates even though TLS has replaced SSL as the secure means to connect to websites across the public internet.

We recommend organizations that are working to achieve PCI compliance while using Pantheon services engage a third-party service provider like CloudFlare to terminate SSL/TLS connections.  Terminating SSL/TLS connections with a service provider that specializes in providing SSL/TLS gives you greater control over your configuration and ensures your service will track closely with changes to PCI DSS.

#### When will your migration from SSL/TLS 1.0 be completed?
We have already ended support for all versions of SSL, and plan to end support for TLS 1.0 no later than June 30, 2016.  Our plans around this are open to review, as disabling TLS 1.0 is likely to have a negative impact on many [older browsers and mobile devices](https://en.wikipedia.org/wiki/Transport_Layer_Security#Web_browsers).

#### Where is SSL/TLS 1.0 being used in your environment?  
TLS 1.0, 1.1, and 1.2 are being used between the web browser and customer sites using load balancers provided by Pantheon. Pantheon load balancers are configured to prefer the highest grade encryption supported by the browsers.

#### How are you mitigating risks with SSL/TLS 1.0 until you can migrate?  
We have configured load balancers to aggressively negotiate the highest grade encryption available to both the browser and the load balancers. This insures that the vast majority of traffic uses a modern encryption suite. Only legacy browsers or devices will fall back to TLS 1.0.

#### How are you monitoring for new vulnerabilities associated with SSL/TLS 1.0?
We monitor the U.S. Government National Vulnerability Database for announcements regarding TLS vulnerabilities.

#### How are you ensuring that SSL and TLS 1.0 are not introduced into your environment?  
We have a number of controls in place to ensure insecure protocols are not introduced into our environment.  They include developer training on the end of support for insecure protocols, a software development review/approval process before deploying to production, and periodic vulnerability scans.
