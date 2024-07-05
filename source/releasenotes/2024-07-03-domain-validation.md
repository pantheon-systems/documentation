---
title: "Domain validation required for all sites "
published_date: "2024-07-03"
categories: [security, infrastructure]
---

As part of our continued effort to protect sites on our platform, Pantheon now requires all sites on the platform to prove domain ownership via TXT records.
This verification is required before Pantheon will accept traffic on a domain name for a given site.
This change enhances security by preventing a malicious actor from bringing traffic to a newly created site on Pantheon using a domain that pointed to a since-deleted site on Pantheon.

Customers who find this protection overly burdensome can opt out of this requirement at the level of their Workspace by engaging with our support team to see if they qualify for an exemption. For more information, refer to this [FAQ](/guides/domains/custom-domains#faq).
