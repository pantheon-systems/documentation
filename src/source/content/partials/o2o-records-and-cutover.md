---
contenttype: [partial]
categories: [cache]
cms: [--]
product: [cdn]
integration: [cloudflare]
tags: [--]
reviewed: "2026-11-02"
---

## Set the SSL/TLS encryption mode

In your Cloudflare zone, go to **SSL/TLS** > **Overview** and set the encryption mode to **Full** or **Full (strict)**. Other modes, such as Flexible, cause infinite redirect loops between your zone and the GCDN.

## Get your O2O records

```bash{promptUser: user}
terminus gcdn:o2o <site>.<env> <domain>
```

Omit `<domain>` to list records for every Cloudflare domain on the environment. Save the output. It lists three records for each domain:

| Record | Purpose |
|---|---|
| TXT `_cf-custom-hostname.<hostname>` | Lets Pantheon confirm that you own the hostname and show the domain as ready before cutover. |
| CNAME `_acme-challenge.<hostname>` | Delegates certificate validation so the certificate can be issued and renewed. |
| CNAME `<hostname>` | Sends traffic to the GCDN edge. |

## Add the records in Cloudflare

In the Cloudflare dashboard, go to **DNS** > **Records** for your zone.

### 1. Add the ownership TXT and ACME challenge CNAME

Add the ownership TXT record from the `gcdn:o2o` output:

```none
_cf-custom-hostname.<hostname>  TXT  <ownership_token>
```

Leave this record in place until `terminus gcdn:verify` reports the domain active. A proxied cutover works without it, but Pantheon can't show the domain as ready before cutover, and Cloudflare can't pre-validate the hostname.

Before you add the ACME challenge CNAME, delete any existing `_acme-challenge.<hostname>` TXT records. They block certificate delegation, and Cloudflare doesn't allow a CNAME to share a name with another record. Don't remove unrelated TXT records, such as SPF, DKIM, or DMARC.

Then add the `_acme-challenge` CNAME and set its proxy status to **DNS only** (grey cloud):

```none
_acme-challenge.<hostname>  CNAME  <hostname>.<zone_dcv_id>.dcv.cloudflare.com
```

This record issues your certificate. Leave it in place permanently and keep it grey-clouded. Removing or proxying it breaks certificate renewal, and changing it to a TXT record breaks delegation.

While Cloudflare proxies the hostname (orange cloud, the usual O2O state), it can't use the ownership TXT. It reports `The hostname is using Cloudflare and cannot be activated with an TXT or HTTP validation token`, and activates the hostname after cutover, once the traffic CNAME points at Pantheon's edge.

<Alert title="Optional: pre-validate before cutover" type="info">

If the hostname's traffic record points directly to your origin, you can set it to **DNS only** (grey cloud) before cutover. Cloudflare then doesn't proxy it, so it can use the TXT to validate and activate the hostname early. This doesn't work if the record points to another host that uses Cloudflare for SaaS, such as a CNAME to WP Engine. Traffic still passes through Cloudflare in that case, and the error remains. If you move from WP Engine, remove the hostname there when you update your DNS records. That removes it from WP Engine's SaaS zone and avoids those errors.

</Alert>

### 2. Confirm propagation and certificate issuance

```bash{promptUser: user}
dig +short CNAME _acme-challenge.<hostname>
```

The query returns a `dcv.cloudflare.com` target when the record is live. Then check that Pantheon has confirmed your ownership and issued the certificate:

```bash{promptUser: user}
terminus gcdn:verify <site>.<env> <domain>
```

Proceed once the output shows `DNS records ready (confirmed by Pantheon)`. Pantheon's edge serves the custom hostname's certificate while the hostname still shows as pending, so this state tells you the cutover is safe. If the output shows `ownership not confirmed yet` or `ownership and certificate pending`, add the records it lists, wait a few minutes, and run the command again. The command rechecks the domain at most once a minute, and Pantheon sees the result within about 10 minutes. If the output doesn't change once the records above are live, [contact Pantheon Support](/guides/support/contact-support/). Don't point traffic at the GCDN before the output shows ready, or visitors reach Pantheon's edge without a valid certificate.

### 3. Route traffic to the GCDN

O2O requires a CNAME at the hostname. Cloudflare doesn't allow a CNAME alongside A or AAAA records, so delete the hostname's existing A and AAAA records and add the traffic CNAME right away. The time between the two changes is downtime. If the hostname is already a CNAME, edit its target instead.

```none
<hostname>  CNAME  fe.<zone>.edge.pantheon.io
```

Create the record as **DNS only** (grey cloud) and leave it that way for 15 to 20 minutes. Cloudflare needs that time to associate the custom hostname with the new GCDN. If you proxy the record before it does, requests may return a 1014 error. After the wait, edit the record and switch it to **Proxied** (orange cloud) to complete the O2O configuration if you wish to keep your own Cloudflare rules.

<Alert title="Note" type="info">

While the record is grey-clouded, visitors connect directly to Pantheon's edge, so your Cloudflare zone's WAF rules, Workers, and page rules don't apply. They resume when you switch to Proxied.

</Alert>

A/AAAA records aren't compatible with O2O and can cause downtime.

After you route traffic, run the check again so Cloudflare and Pantheon detect the change sooner:

```bash{promptUser: user}
terminus gcdn:verify <site>.<env> <domain>
```

The output shows `ownership and certificate active` once the hostname becomes active.

## Re-enable your zone hold (Enterprise only)

Once the custom hostname becomes active, switch **Zone Hold** back to **On** in **Quick Actions**. The hold stops other Cloudflare accounts from claiming your domain, so don't leave it off longer than you need to.
