---
title: "Manage custom certificates yourself on the next-generation GCDN"
published_date: "2026-12-01"
published_at: "2026-12-01T00:00:00Z"
categories: [new-feature, tools-apis]
description: "Generate a CSR, upload the certificate your certificate authority signs, and manage custom TLS certificates on the next-generation GCDN with Terminus, without a support ticket."
---

Organizations with the custom certificate add-on can now manage their own TLS certificates on the next-generation GCDN with Terminus. Certificate uploads and renewals no longer need a support ticket.

Pantheon creates the private key when you generate a certificate signing request (CSR) and keeps it. You never see, handle, or send a private key.

## Key details

- Generate a CSR for your domains, including wildcard domains, with `terminus gcdn:cert:csr`. Give the CSR to your certificate authority.
- Upload the signed certificate and its chain with `terminus gcdn:cert:upload`. The certificate goes live on the domains it covers within minutes, with no downtime.
- Run `terminus gcdn:cert:list` to see each certificate, the domains it covers, and its expiry date, and to see how many of your purchased certificates you use.
- Remove a custom certificate at any time. Its domains fall back to Pantheon's free managed certificate.
- Each certificate uses one of your purchased certificates, however many domains it covers.
- This release supports Terminus only. Dashboard support comes later.

Update the plugin with `terminus gcdn:update`, or install it with `terminus self:plugin:install pantheon-systems/terminus-gcdn-plugin`. `gcdn:update` can't upgrade version 0.4.0 or earlier: run `terminus self:plugin:uninstall pantheon-systems/terminus-gcdn-plugin`, then install the plugin again.

To add the custom certificate service to your organization, contact your account manager. For the full steps, see [Custom certificates](/guides/nextgen-gcdn/custom-certificates).
