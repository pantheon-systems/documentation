---
title: Pantheon SSL/TLS support 
description: Pantheon's recommendation regarding SSL/TLS in light of PCI DSS v3.1.
category:
  - security
  - developing
  - managing

---
Pantheon recommends organizations working to achieve PCI compliance while using Pantheon services engage a third-party service provider like CloudFlare to terminate their SSL/TLS connections.  Terminating SSL/TLS connections with a service provider that specializes in providing SSl/TLS gives customers greater control over their configuration and ensures their service will track closely with changes to PCI DSS.


When will your migration from SSL/TLS 1.0 be completed? Pantheon has already ended support for all versions of SSL.  Pantheon plans to end support for TLS 1.0 no later than June 30, 2016.  Our plans around this are open to review as disabling TLS 1.0 is likely to have a negative impact on many older browsers and mobile devices.

Where are SSL/TLS 1.0 being used in your environment?  TLS 1.0, 1.1, and 1.2 are being used between the web browser and customer sites using load balancers provided by Pantheon. Pantheon load balancers are configured to prefer the highest grade encryption supported by the browsers.

How are you mitigating risks with SSL/TLS 1.0 until you can migrate?  Pantheon has configured its load balancers to aggressively negotiate the highest grade encryption available to both the browser and the load balancers.

How are you monitoring for new vulnerabilities associated with SSL/TLS 1.0? Pantheon monitors the U.S. government National Vulnerability Database for announcements regarding TLS vulnerabilities.

How are you ensuring that SSL and TLS 1.0 are not introduced into your environment?  Pantheon employs a number of controls to ensure insecure protocols are not introduced into our environment.  They include developer training on the end of support for insecure protocols, a software development review / approval process before deploying to production, and periodic vulnerability scans.
