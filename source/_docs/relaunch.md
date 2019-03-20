---
title: Relaunch Existing Pantheon Site
description: Take a new site live by moving custom domains from one Site Dashboard to another, with minimal HTTPS interruptions.
tags: [dns]
categories: []
---
Sites are considered launched on Pantheon once traffic is routed through custom domain(s). Relaunching a previously launched site is done by rerouting traffic from the existing Site Dashboard to an entirely new Site Dashboard.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">The relaunch process applies exclusively to live sites already hosted on Pantheon. Otherwise, refer to [Launch Essentials](/docs/guides/launch/).</p></div>

## Before You Begin
- Log in to the new Site Dashboard on Pantheon
- Open a second tab for the old Site Dashboard on Pantheon
- In a third tab, log in to the domain's DNS service provider (e.g., Cloudflare, Amazon Route 53, etc.)
- Examine existing records pointing to Pantheon
  {% include("content/standard-dns-config.html") %}
- Lower the TTL of existing DNS records to minimize impact of upcoming DNS changes
  {% include("ttl.twig") %}

### Roles & Permissions
The permission to manage billing and plans is granted only to the role of **Site Owner** / **Organization Administrators**. Other roles do not have access as described on this page.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/docs/site-billing#transfer-ownership-and-billing-for-this-site).

In order to retain Preferred Pricing an updated [invitation to pay](/docs/add-client-site/#send-an-invitation-to-pay-to-your-client) must be sent from the Supporting Organization for the new site.</p></div>

## Relaunch Procedure

1. In the new Site Dashboard, [upgrade the site from free to a paid plan](/docs/site-plan/#purchase-a-new-plan).
2. In the old Site Dashboard, remove the custom domain affected by the relaunch:

  **<span class="glyphicons glyphicons-cardio"></span> Live** > **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** > **Details** > **Remove Domain**
3. In the new Site Dashboard, connect the custom domain affected by the relaunch:

  **<span class="glyphicons glyphicons-cardio"></span> Live** > **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** > **Connect Domain**

    <div class="alert alert-danger">
    <h4 class="info">Warning</h4>
    <p markdown="1">Do **not** update DNS yet. The Site Dashboard instructs you to configure DNS after connecting the domain, however for this relaunch procedure you should not change record values until instructed in step 5 below.</p></div>

4. Wait for HTTPS to provision for the newly connected domains:

  **<span class="glyphicons glyphicons-cardio"></span> Live** > **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** > **Details**

  {% include("content/notes/https-success.html")%}

   This process typically takes about an hour.

5. From the DNS hosting service (not Pantheon), replace values in DNS records pointed to Pantheon with new values provided in the Site Dashboard.

 {% include("content/standard-dns-config2.html") %}
6. Test and confirm that the new site is accessible via the custom domain over HTTPS (e.g., `https://www.example.com/`).
7. Repeat steps 2-6 above for each affected domain. Keep in mind that `www.example.com` and `example.com` are different domains.
8. In the new Site Dashboard, [standardize traffic for the primary domain](/docs/domains/#redirect-to-https-and-the-primary-domain).
9. In the old Site Dashboard, [downgrade the site from a paid plan to Sandbox](/docs/site-plan/#cancel-current-plan).
10. In the old Site Dashboard, [remove the existing card as a payment method for the site](/docs/site-billing/#do-not-bill-this-site-to-a-card).

## See Also
- [Launch Essentials](/docs/guides/launch/)
- [Manage Plans in the Site Dashboard](/docs/site-plan/)
- [Billing in the Site Dashboard](/docs/site-billing/)
