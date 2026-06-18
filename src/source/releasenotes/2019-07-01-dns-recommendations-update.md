---
title: DNS Recommendations Update
published_date: "2019-07-01"
categories: [infrastructure]
---
Pantheon now recommends A/AAAA records instead of CNAME records. This change is to reduce complexity, confusion, and address a few edge cases introduced with CNAMEs. For example, the use of an MX or TXT record prevents the use of a CNAME. If you are already using a CNAME you can continue to do so or you can update to A/AAAA records as shown on the dashboard.
