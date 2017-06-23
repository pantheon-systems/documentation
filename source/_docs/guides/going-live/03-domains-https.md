---
title: Going Live
subtitle: Domains / HTTPS
golive: true
guidetoc: true
anchorid: domains
generator: pagination
layout: guide
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
    - docs_tags
permalink: docs/guides/going-live/domains-https/
nexturl: guides/going-live/redirects/
nextpage: Redirect to a Primary Domain
previousurl: guides/going-live/plans/
previouspage: Upgrade Site Plan
editpath: going-live/03-domains-https.md
---
Now that you've upgraded to a paid plan, we're ready to connect a custom domain in the Pantheon Site Dashboard. [Free & Managed HTTPS](/docs/free-https/) is automatically provisioned for each new Custom Domain added to an environment using Let's Encrypt.

## Connect Domain
1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.
2. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** tool.
3. Select **Connect Domain** and enter the bare domain (e.g., `example.com`) then click **Connect Domain**.

We recommend you repeat this process for the `www` subdomain, even if you don't plan to use it as your primary domain.

### Existing Sites
#### Verify your domain to provision HTTPS (Optional)
If you add a domains to the Pantheon Site Dashboard that is pointing to an existing HTTPS site you will be guided to to  verify domain ownership and pre-provision certificates in order to avoid an HTTPS service interruption. This is optional and you can skip directly to updating DNS if you are okay with you waiting up to an hour for HTTPS to be ready.

After verifying domain ownership your domain's HTTPS certificate(s) will automatically begin generating and be deployed to Pantheon’s Global CDN within an hour. When a certificate is ready you can switch DNS destinations from your existing site to your new Pantheon site without HTTPS interruption.

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
Skipping this step will result in service interruption for existing sites that require or expect HTTPS. If you skip this step, HTTPS will be available within an hour after DNS routes to Pantheon.
</div>

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.
2. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** tool.
3. Select **Connect Domain**.
4. Click **<span class="glyphicons glyphicons-download-alt"></span> Download File**.
5. Serve the file from your existing live site.
3. Return to the Pantheon Site Dashboard and refresh the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

  Once the certificate(s) has been provisioned, you may safely continue without fear of HTTPS service interruption.


## Configure DNS
1. Domains that haven't been routed to Pantheon will indicate action required in the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page, like so:

  ![Domain & HTTPS Status: Action Required](/source/docs/assets/images/dashboard/domains/domains-status-action-required.png)

2. Click the **Details** button next to the domain name.
3. In a separate window, log in to the DNS host for the domain.
4. Copy the value provided in the Pantheon Site Dashboard for the required A record, then use it to create an A record wherever you manage DNS.

  Repeat this step for both of the required AAAA records. If you also connected the `www` subdomain, navigate to the domain details to get the required CNAME value.

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
        <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> DNS Host-Specific Instructions</h3></a>
      </div>
      <div id="host-specific" class="collapse" style="padding:10px;">
        <ul class="top-docs top-docs-2col docs-2col-panel">
          {% for doc in data.docs_tags.providers %}
            {% if (doc.meta.type != "video") and (doc.meta.type != "guide") and (doc.meta.type != "terminuspage")%}
              <li><a href="{{ doc.url }}">{{ doc.provider }}</a></li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>
    </div>

Unless you completed the steps to prove domain ownership and pre-provision certificates, you'll see HTTPS in progress within an hour of pointing DNS to Pantheon:

  ![Domain & HTTPS Status: Upgrading](/source/docs/assets/images/dashboard/domains/https-provisioning.png)

Once DNS is configured and your certificates are provisioned, the status should indicate successful configuration:

![Domain & HTTPS Status: Successfully Secured and Routed](/source/docs/assets/images/dashboard/domains/domain-success.png)



## FAQs
### How can I take advantage of Free & Automated HTTPS on existing sites?
Existing sites already Live on Pantheon can access Free & Automated HTTPS by configuring DNS as recommended in the Dashboard.

### Why does the Domains and HTTPS tool indicate action required even after I updated DNS records?
The action required message may be due to one of the following:

  - **DNS changes need some time to take effect:** Check the current state of DNS propagation from different parts of the world using this [free web tool](https://www.whatsmydns.net/).
  -  **AAAA records not detected:** There are two AAAA records for improved uptime and reliability. Ensure you've added both AAAA records for the bare domain (e.g., example.com) to route IPv6 traffic to your site.
  - **Old DNS records detected:** If in addition to the correct DNS records, you also have old records, make sure to delete the old records.
### Can I bring my own certificate?
No, but you shouldn't need to buy a dedicated certificate or worry about renewals. For example, wildcard certificates aren't necessary to secure communications for multiple domains launched on Pantheon because we will automatically deploy certificates for all domains on your site.

If bringing your own certificate is a hard requirement (e.g., extended validation), then we recommend terminating HTTPS through a 3rd-party CDN service provider.
