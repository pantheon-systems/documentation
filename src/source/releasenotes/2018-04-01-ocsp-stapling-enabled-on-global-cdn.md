---
title: OCSP Stapling Enabled on Global CDN
published_date: "2018-04-01"
categories: [infrastructure, security, performance]
---
[OCSP stapling](https://en.wikipedia.org/wiki/OCSP_stapling) is an improved method for quickly and safely checking the validity of certificates for HTTPS. You can use [SSL Labs](https://www.ssllabs.com) (e.g. [https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io)) and search for "stapling" to see it's enabled. OCSP responses are typically good for about 7 days, so a response will only get updated as its validity lifetime expiration time approaches.
