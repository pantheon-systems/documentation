---
title: Relaunch Existing Pantheon Site
description: Take a new site live by moving custom domains from one Site Dashboard to another, with minimal HTTPS interruptions.
tags: [dns]
categories: []
---
Sites are considered launched on Pantheon once traffic is routed through custom domain(s). Relaunching a previously launched site is done by rerouting traffic from the existing Site Dashboard to an entirely new Site Dashboard.

<Alert title="Note" type="info">

The relaunch process applies exclusively to live sites already hosted on Pantheon. Otherwise, refer to [Launch Essentials](/guides/launch/).

</Alert>

## Before You Begin
- Log in to the new Site Dashboard on Pantheon
- Open a second tab for the old Site Dashboard on Pantheon
- In a third tab, log in to the domain's DNS service provider (e.g., Cloudflare, Amazon Route 53, etc.)
- Examine existing records pointing to Pantheon
  <Partial file="standard-dns-config.md" />

  <Alert title="Note" type="info">

  For subdomains that are using Custom Certificates, use the bare domain's recommended A/AAAA records instead of using CNAME records.

  </Alert>

- Lower the TTL of existing DNS records to minimize impact of upcoming DNS changes

  <Accordion title="Learn More" id="ttl" icon="info-sign">

  #### Time to Live (TTL)

  The TTL dictates the lifespan of a DNS record; a shorter time means less time to wait until the changes go into effect. TTLs are always set in seconds with a few common ones being 86400 (24 hours),  43200 (12 hours), and 3600 (1 hour).

  When you make a change to the TTL of an existing record, you need to wait for the old TTL time to pass - that is, if it had been set to 86400, you would need to wait a full 24 hours for the new setting to begin propagating everywhere.

  </Accordion>

### Roles & Permissions
The permission to manage billing and plans is granted only to the role of **Site Owner** / **Organization Administrators**. Other roles do not have access as described on this page.

<Alert title="Note" type="info">

If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/site-billing#transfer-ownership-and-billing-for-this-site).

In order to retain Preferred Pricing an updated [invitation to pay](/add-client-site/#send-an-invitation-to-pay-to-your-client) must be sent from the Supporting Organization for the new site.

</Alert>

## Relaunch Procedure

1. In the new Site Dashboard, [upgrade the site from free to a paid plan](/site-plan/#purchase-a-new-plan).
2. In the old Site Dashboard, remove the custom domain affected by the relaunch:

  **<span class="glyphicons glyphicons-cardio"></span> Live** > **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** > **Details** > **Remove Domain**
3. In the new Site Dashboard, connect the custom domain affected by the relaunch:

  **<span class="glyphicons glyphicons-cardio"></span> Live** > **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** > **Connect Domain**

  <Alert title="Warning" type="danger">

  Do **not** update DNS yet. The Site Dashboard instructs you to configure DNS after connecting the domain, however for this relaunch procedure you should not change record values until instructed in step 5 below.

  </Alert>

4. Wait for HTTPS to provision for the newly connected domains:

  **<span class="glyphicons glyphicons-cardio"></span> Live** > **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** > **Details**

  <Partial file="notes/https-success.md" />

   This process typically takes about an hour.

5. From the DNS hosting service (not Pantheon), replace values in DNS records pointed to Pantheon with new values provided in the Site Dashboard.

  <Partial file="standard-dns-config2.md" />

6. Test and confirm that the new site is accessible via the custom domain over HTTPS (e.g., `https://www.example.com/`).
7. Repeat steps 2-6 above for each affected domain. Keep in mind that `www.example.com` and `example.com` are different domains.
8. In the new Site Dashboard, [standardize traffic for the primary domain](/domains/#redirect-to-https-and-the-primary-domain).
9. In the old Site Dashboard, [downgrade the site from a paid plan to Sandbox](/site-plan/#cancel-current-plan).
10. In the old Site Dashboard, [remove the existing card as a payment method for the site](/site-billing/#do-not-bill-this-site-to-a-card). If you're a contract customer, you can skip this step.

## See Also
- [Launch Essentials](/guides/launch/)
- [Manage Plans in the Site Dashboard](/site-plan/)
- [Billing in the Site Dashboard](/site-billing/)
