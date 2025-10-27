---
title: Connecting a Custom Domain to Next.js on Pantheon
description: Once on a paid plan, connecting a custom domain to your Next.js site on Pantheon is the same as other Pantheon sites.
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/connecting-custom-domain-name

---

<Partial file="nextjs-pre-ga.md" />

Newly created sites on Pantheon start on an unpaid "Sandbox" tier which does not allow custom domains.
To connect a custom domain to your Live environment, contact a Pantheon employee through the channels of the Alpha program.

[Follow this GitHub issue for when these instructions will be updated](https://github.com/pantheon-systems/documentation/issues/9735).

### Pre-live checklist

Before switching your DNS records to point to the new Live environment consider doing any load or performance testing that you feel is necessary to confirm that the new infrastructure meets your needs.

For fully thorough testing, you may want to modify your local `hosts` file to point your custom domain to the IP address of the new Live environment [using these instructions](/guides/domains/hosts-file).

### Update your DNS records to point to the new Live environment

Once you are satisfied with the performance and functionality of your new Live environment, update your DNS records to point to the new Live environment using the same instructions as for WordPress and Drupal sites: [Connecting a Custom Domain to Pantheon](/guides/launch/configure-dns/).
