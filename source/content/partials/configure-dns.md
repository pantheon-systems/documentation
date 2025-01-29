---
contenttype: [partial]
categories: [domains]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

The <Icon icon="triangleExclamation" /> icon within the Domains / HTTPS page indicates that the domain has not been correctly routed to Pantheon. Complete the steps below before you provision your HTTPS. The addition of a Custom Domain now requires Domain Validation via a TXT record, please follow [the steps outlined here](/guides/domains/custom-domains) before proceeding with the outlined steps below:

1. Access the **<Icon icon="wavePulse" /> Live** environment in your Pantheon Site Dashboard.
1. Navigate to the **<Icon icon="global" /> Domains / HTTPS** page.
1. Select **Details** next to the `www` domain.
1. Log in to the DNS host for the domain in a separate window.
1. Copy the value provided in the Pantheon Site Dashboard for the required **A** record, then use it to create an **A** record wherever you manage DNS. Repeat this step for <i>both</i> of the AAAA records.
1. Return to the **<Icon icon="global" /> Domains / HTTPS** page in the Pantheon Site Dashboard.
1. Click **Details** next to the bare domain.
1. Copy the value provided in the Pantheon Site Dashboard for the required **A** record, then use it to create an A record wherever you manage DNS. Repeat this step for <i>both</i> of the AAAA records.
   - Note that if the Platform detects a CNAME record, the **Status** will show `Remove this detected record` on the line with the CNAME. Remove the CNAME from the DNS management service to avoid potential issues or interruptions.
