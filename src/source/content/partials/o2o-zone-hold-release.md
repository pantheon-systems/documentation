---
contenttype: [partial]
categories: [cache]
cms: [--]
product: [cdn]
integration: [cloudflare]
tags: [--]
reviewed: "2026-10-29"
---

## Release your zone hold (Enterprise only)

[Zone Holds](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) are enabled by default on Cloudflare Enterprise plans and Cloudflare for SaaS Enterprise accounts. If your zone is on a Free, Pro, or Business plan and your domain was not previously on a Cloudflare for SaaS provider, it has no Zone Hold, so skip this step and [re-enabling the hold](#re-enable-your-zone-hold-enterprise-only) at the end.

Otherwise, do this before you continue. If a Zone Hold applies to your domain, Cloudflare can't issue certificates for the custom hostname. With **Also prevent subdomains** enabled, the hostname becomes `Blocked`, which doesn't recover when you release the hold later and leaves the domain on a 1014 error.

**Your own Enterprise zone:** On the zone homepage, go to **Quick Actions** and switch **Zone Hold** to **Off**.

**Cloudflare for SaaS provider zone hold:** If the Zone Hold comes from another Cloudflare for SaaS provider — such as HubSpot, WPEngine, or Kinsta — you can't release it yourself. [Contact Pantheon Support](/guides/support/contact-support/) and the team will work with Cloudflare to clear the hold. This is the more common scenario.
