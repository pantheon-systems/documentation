---
title: Deprecation of Obsolete TLS 1.2 Cipher Suites
published_date: "2023-07-01"
categories: [deprecated, security]
---
In Pantheon's continual efforts to stay up to date with modern web security standards, Pantheon is removing support for a certain set of cipher suites for TLS 1.2. By removing support for specific TLS 1.2 ciphers, Pantheon is enhancing overall platform security. This change ensures that the websites hosted on Pantheon will only use stronger and more secure encryption protocols, which helps protect sensitive information transmitted between users and the websites.

The following obsolete TLS 1.2 ciphers have known vulnerabilities and have been removed:

- TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA
- TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
- TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA
- TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
- TLS_RSA_WITH_AES_128_CBC_SHA
- TLS_RSA_WITH_AES_128_GCM_SHA256
- TLS_RSA_WITH_AES_256_CBC_SHA

Pantheon has proactively identified and communicated with affected customers. No action is required at this time, but if you have any questions/concerns, please feel free to reach out to your Account Team at Pantheon or to [Pantheon Support](/guides/support/contact-support/) via a ticket or chat.
