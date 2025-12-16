---
title: Connecting a custom domain to Next.js on Pantheon
description: During the Beta stage, reach out to Pantheon staff to connect a custom domain to your Next.js site.
reviewed: "2025-10-31"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/connecting-custom-domain-name

---

<Partial file="nextjs-pre-ga.md" />

Please reach out to Pantheon staff through the communication channels of the Beta program for assistance with connecting custom domains to Next.js sites.
Sites on Pantheon generally require moving from an unpaid "Sandbox" plan to a paid plan before connecting a custom domain name through the dashboard.
However, in the Beta phase we have not yet implemented self-service mechanism for moving Next.js sites between plans.

Once Pantheon staff have enabled the capacity to connect a custom domain name to your Next.js site, you can follow the same instructions as for WordPress and Drupal sites: [Connecting a Custom Domain to Pantheon](/guides/launch/configure-dns/).
As with any switching of DNS records, the amount of testing you choose to do before switching will depend on the risk tolerance of your organization and the nature of your site.
For fully thorough testing, you may want to modify your local `hosts` file to point your custom domain to the IP address of the new Live environment [using these instructions](/guides/domains/hosts-file).
