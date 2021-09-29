## Configure DNS

The <span class="glyphicons glyphicons-alert text-warning"></span> icon within the Domains / HTTPS page indicates that the domain has not been properly routed to Pantheon. The following actions are required:

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.
1. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.
1. Select **Details** next to the `www` domain.
1. In a separate window, log in to the DNS host for the domain.
1. Copy the value provided in the Pantheon Site Dashboard for the required A record, then use it to create an A record wherever you manage DNS. Repeat this step for <i>both</i> of the AAAA records.
1. Return to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page in the Pantheon Site Dashboard.
1. Click **Details** next to the bare domain.
1. Copy the value provided in the Pantheon Site Dashboard for the required A record, then use it to create an A record wherever you manage DNS. Repeat this step for <i>both</i> of the AAAA records.
   - Note that if the Platform detects a CNAME record, the **Status** will show `Remove this detected record` on the line with the CNAME. Remove the CNAME from the DNS management service to avoid potential issues or interruptions.
