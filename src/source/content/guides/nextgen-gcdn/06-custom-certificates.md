---
title: Next-generation Global CDN
subtitle: Manage custom certificates with Terminus
navtitle: Custom certificates
description: Generate a CSR, upload the certificate your certificate authority signs, and manage custom TLS certificates on the next-generation GCDN with Terminus.
tags: [cache, cdn, https, security]
contributors: [jazzsequence]
showtoc: true
reviewed: "2026-11-25"
permalink: docs/guides/nextgen-gcdn/custom-certificates
contenttype: [guide]
innav: [false]
categories: [security, cache]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [--]
---

If your organization bought the custom certificate add-on, you can manage your own TLS certificates on the next-generation GCDN with Terminus. You generate a certificate signing request (CSR), give it to your certificate authority (CA), and upload the certificate the CA signs. Uploads and renewals don't need a support ticket.

Pantheon creates the private key when you generate the CSR and keeps it. You never see, handle, or send a private key.

## Before you begin

Be sure that you have:

- An organization with the custom certificate add-on. Pantheon Professional Services sets your organization's certificate allotment, the number of certificates you purchased. To add the service, contact your account manager.
- Terminus with the latest GCDN plugin. Install it with `terminus self:plugin:install pantheon-systems/terminus-gcdn-plugin`, or update it with `terminus gcdn:update`. `gcdn:update` can't upgrade version 0.4.0 or earlier: run `terminus self:plugin:uninstall pantheon-systems/terminus-gcdn-plugin`, then install the plugin again.
- A site on the next-generation GCDN, with its custom domains added and verified. See [Setup](/guides/nextgen-gcdn/setup).
- A role on the site that can manage domains.

The commands in this guide use `<site>.<env>` for your site and environment, such as `<site>.live`.

## Generate a CSR

In your terminal, run `terminus gcdn:cert:csr` with every hostname the certificate should cover. Add your organization details, which match the details Pantheon Professional Services asks for today:

```bash{promptUser: user}
terminus gcdn:cert:csr <site>.<env> example.com '*.example.com' --organization="Anita Agency" --country=US --state=Oregon --locality=Portland --file=example.com.csr
```

The command prints the CSR, or writes it to the file you pass with `--file`. It also prints a CSR ID. Keep the ID, because you need it to upload the certificate.

The CSR can include wildcard hostnames, and it needs at least one non-wildcard name. To download a CSR again, run `terminus gcdn:cert:csr:get <site>.<env> <csr-id> --file=example.com.csr`.

## Get the certificate signed

Give the CSR to your CA, for example DigiCert or Sectigo, to complete the CA's validation. The CA returns the certificate, the certificate chain, and any intermediate certificate. CAs usually bundle these.

If you use CAA DNS records, they must allow your CA.

## Upload the certificate

Upload the certificate and its chain with the CSR ID from the first step:

```bash{promptUser: user}
terminus gcdn:cert:upload <site>.<env> <csr-id> example.com.crt --chain=example.com.chain.crt
```

The certificate and `--chain` accept a file path or raw PEM. The command applies the certificate to every custom hostname on the environment that the certificate covers, and prints the hostnames. The certificate goes live on those domains within minutes, with no downtime.

Pantheon checks the upload and refuses a certificate that includes a private key, doesn't match the CSR, has an incomplete chain, falls outside its validity window, or doesn't cover a hostname on the environment.

## Check the certificate

Run `terminus gcdn:cert:list` to see each certificate, the domains it covers, its issuer, its expiry date, and its status. The status shows **Expiring soon** for a certificate with fewer than 30 days left, and **Expired** after that. A notice above the table shows how many of your organization's purchased certificates you use.

```bash{promptUser: user}
terminus gcdn:cert:list <site>.<env>
```

To confirm the live site serves the certificate, run `curl -v https://example.com` and check the `issuer` and `expire date` lines in the output.

## Cover the right hostnames

A wildcard covers exactly one level. This behavior comes from how certificates work, not from Pantheon.

- `*.example.com` covers `www.example.com`, `shop.example.com`, and `blog.example.com`. It doesn't cover the apex, `example.com`, or deeper names such as `eu.shop.example.com`.
- To cover the apex, list `example.com` and `*.example.com` on the same CSR. Most CAs include the apex with a wildcard at no extra cost.
- Add every name to the site as its own domain and verify it. You can't add `*.example.com` itself as a domain. The wildcard certificate attaches to each domain you add.
- Domains already on the site get the certificate when you upload it. For a subdomain you add later, run `terminus gcdn:cert:apply <site>.<env> <cert-id> <hostname>`. Use the certificate ID from `terminus gcdn:cert:list`. Until you apply it, the subdomain uses Pantheon's free managed certificate, so the domain stays up.
- Wildcards can't stack, so `*.*.example.com` doesn't work with any CA. For names two levels down, either add a wildcard for that level to the same CSR, such as `*.shop.example.com`, or list the deeper names individually. A CSR with `example.com`, `*.example.com`, and `*.shop.example.com` gives one certificate that covers all three levels. CAs usually charge per extra wildcard, and not every CA offers certificates with several wildcards, so check with yours.
- Different base domains, such as `example.com` and `example.org`, can share one certificate when you list both on the CSR and your CA supports multi-domain certificates. Otherwise, each base domain needs its own certificate.

## Renew a certificate

Repeat the steps before the certificate expires: generate a new CSR or reuse an existing one, get it signed, and upload it. The new certificate replaces the old one in place, with no downtime. Renewal timing rests with you.

## Return to a managed certificate

You can remove a custom certificate at any time. Domains fall back to Pantheon's free managed certificate automatically.

- To revert one hostname, run `terminus gcdn:cert:remove <site>.<env> <cert-id> <hostname>`.
- To revert every hostname on a certificate, run `terminus gcdn:cert:delete <site>.<env> <cert-id>`. The command lists the affected hostnames first.

Both commands ask for confirmation. Add `-y` to skip the prompt.

## Know the limits

- Each certificate uses one of your purchased certificates, however many domains it covers. One wildcard certificate for `example.com` and `*.example.com` across 20 subdomains uses one. Deleting an old or expired certificate frees its place. To see your limit, how many you use, and how many remain, run `terminus gcdn:cert:allotment <site>.<env>`.
- This release supports Terminus only. Dashboard support comes later.
- The GCDN plugin hasn't reached version 1.0, and Pantheon expects to refine the commands based on your feedback.

## More resources

- [Next-generation GCDN setup](/guides/nextgen-gcdn/setup)
- [Next-generation GCDN FAQ](/guides/nextgen-gcdn/faq)
- [Custom Certificates on Pantheon Advanced and Global CDN](/custom-certificates)
- [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin)
