1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.

1. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

1. Enter the `www` domain (for example, `www.example.com`), then click **Connect Domain**. You'll enter the bare domain (without the `www`) in a later step.

1. Verify ownership by adding a new DNS TXT value or by uploading a file to a specific URL. Select the method you prefer, and follow the instructions. Note that the values are randomized for security. 

1. Click **Verify Ownership** to confirm, or to skip HTTPS provisioning for now, click **Skip without HTTPS**.

  It can take 30 minutes or more for DNS records to propagate, depending on your DNS host and your domain's TTL values. If you encounter issues after 30 minutes, check the following:

    - Ensure that there's no "parking page" or redirect configured in your DNS.

    - The TXT record's Host value doesn't have a trailing `.`

    - That the [DNS value has propagated](https://www.whatsmydns.net/#TXT/).

1. Open a new tab or browser window, and copy the **Required Values** to your [DNS](/guides/domains/dns) provider. If you see:

  > Waiting for HTTPS, DNS records will be provided when HTTPS provisioning completes.

  Wait one minute, then refresh the page.

1. Click **<span class="glyphicons glyphicons-arrow-left"></span> Back to Domains/HTTPS**.

1. Select **Connect Domain** and enter the bare domain (for example, `example.com`, and then click **Connect Domain**.
