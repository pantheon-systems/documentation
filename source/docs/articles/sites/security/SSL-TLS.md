---
title: Pantheon SSL/TLS support 
description: Pantheon's recommendation regarding SSL/TLS in light of PCI DSS v3.1.
category:
  - security
  - developing
  - managing

---
We recommend organizations that are working to achieve PCI compliance while using Pantheon services engage a third-party service provider like CloudFlare to terminate SSL/TLS connections.  Terminating SSL/TLS connections with a service provider that specializes in providing SSL/TLS gives you greater control over your configuration and ensures your service will track closely with changes to PCI DSS.

#### When will your migration from SSL/TLS 1.0 be completed? 
We have already ended support for all versions of SSL, and plan to end support for TLS 1.0 no later than June 30, 2016.  Our plans around this are open to review, as disabling TLS 1.0 is likely to have a negative impact on many older browsers and mobile devices.

#### Where is SSL/TLS 1.0 being used in your environment?  
TLS 1.0, 1.1, and 1.2 are being used between the web browser and customer sites using load balancers provided by Pantheon. Pantheon load balancers are configured to prefer the highest grade encryption supported by the browsers.

#### How are you mitigating risks with SSL/TLS 1.0 until you can migrate?  
We have configured load balancers to aggressively negotiate the highest grade encryption available to both the browser and the load balancers.

#### How are you monitoring for new vulnerabilities associated with SSL/TLS 1.0? 
We monitor the U.S. government National Vulnerability Database for announcements regarding TLS vulnerabilities.

#### How are you ensuring that SSL and TLS 1.0 are not introduced into your environment?  
We have a number of controls in place to ensure insecure protocols are not introduced into our environment.  They include developer training on the end of support for insecure protocols, a software development review/approval process before deploying to production, and periodic vulnerability scans.
