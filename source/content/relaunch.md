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

## Relaunch Frequently Asked Questions

### Why is this special Relaunch process needed?

You can just do steps 2 and 3 above and then immediately change DNS, but then the new site will not immediately have an HTTPS Certificate that is valid for the site. The relaunch procedure temporarily uses the old site's already-provisioned HTTPS Certificate until the new site has its certificate provisioned and fully ready for use.

### During this process, is there any downtime my site will experience?

Once you complete step 2, the domain is unreachable until you add it to a new site in step 3. We recommend copying and pasting the domain name and opening up the sites in a few different tabs in your browser for a quick transition. (Or use Terminus commands.)

Also, having a long TTL on the DNS records that are changing can cause you to get HTTPS Certificate errors during this process. The TTL (Time To Live) value of a DNS record is how long a DNS record can be cached around the Internet. During a relaunch, it would be ideal to have it be 600 seconds or so (only 10 minutes). When not launching a site, DNS lookups for your viistors will go faster if you have a large TTL, for example 86400 seconds (1 day). But during a Relaunch, this becomes a problem, as for the next 86400 seconds after you make a DNS change, some visitors will be getting the old record and some new. So, well before the launch, lower the TTL to a short amount of time like 600 seconds. Update the TTL on the DNS records and then wait longer than the previous TTL time before launching.

Finally, steps 2-6 should be done in the same time period. Once you complete steps 2-3, the old site's HTTPS certificate will be removed within a few hours and the new site's HTTPS certificate will be available within an hour. As soon as that is done, to minimize invalid HTTPS certificates, you should immediately change the DNS as described in step 5.

### When do I actually switch the site from the old site to the new one?

As soon as you complete Step 3, visitors to your domain will see the new site. But technically, until Step 5 is complete and DNS is fully propogated, your visitors may still be seeing the new site with the old site's HTTPS certificate that will be going offline shortly.

## See Also
- [Launch Essentials](/guides/launch/)
- [Manage Plans in the Site Dashboard](/site-plan/)
- [Billing in the Site Dashboard](/site-billing/)
