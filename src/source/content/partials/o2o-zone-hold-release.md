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

Otherwise, release the hold right before you add the domain to your site, and re-enable it once the hostname is active. Pantheon creates the custom hostname as soon as you add the domain, and Cloudflare checks for a Zone Hold at that moment. If a hold applies, the hostname is created as `Blocked`, with no ownership validation or certificate, and a cutover in that state returns a 1014 error. A hold always blocks the root domain, and blocks a subdomain when **Also prevent subdomains** is on.

If the hostname is already `Blocked`, switch **Zone Hold** to **Off**, then run `terminus gcdn:verify <site>.<env> <domain>` to recover it. Releasing the hold first saves that step.

**Your own Enterprise zone:** On the zone homepage, go to **Quick Actions** and switch **Zone Hold** to **Off**.

**Cloudflare for SaaS provider zone hold:** If the Zone Hold comes from another Cloudflare for SaaS provider — such as HubSpot, WPEngine, or Kinsta — you can't release it yourself. [Contact Pantheon Support](/guides/support/contact-support/) and the team will work with Cloudflare to clear the hold. This is the more common scenario.
