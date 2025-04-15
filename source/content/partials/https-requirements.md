---
contenttype: [partial]
categories: [domains]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

### Requirements for Automated Certificate Renewal
 - All A, AAAA, CNAME, DNAME DNS records for any Pantheon-hosted domains (`example.com`) and/or subdomains (`www.example.com` or `blog.example.com`) must point to Pantheon's servers so Let's Encrypt can verify domain ownership.
 - AAAA records are not required, but if set must exclusively point to Pantheon.
 - Authoritative Name Servers must serve mixed-case lookups, and must not fail CAA lookups.
 - CAA records must **either** not exist for the domain and its parent domains **or** authorize Let's Encrypt. Note that CAA records are inherited by subdomains.
 - Requests to the `/.well-known/acme-challenge/*` path must return a 200 response. For example, if the domain passes through a third-party WAF before routing to Pantheon and returns a 403 response for this path then automated certificate renewal would be blocked. 

