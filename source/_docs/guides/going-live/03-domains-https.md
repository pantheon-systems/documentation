---
title: Going Live
subtitle: Domains & HTTPS
golive: true
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
Now that you've upgraded to a paid plan, we're ready to connect a Custom Domain in the Site Dashboard. [Free & Managed HTTPS](/docs/free-https/) is automatically provisioned for each new Custom Domain added to an environment using Let's Encrypt.

If your project requires use of a custom certification (e.g. extended validation) refer to our [legacy HTTPS service](/docs/enable-https/) for this part of the going live procedure, then pick up on the next lesson of this guide.

## Add Domain(s) to the Live Environment
1. From the Site Dashboard, select the **<span class="glyphicons glyphicons-cardio"></span> Live** tab, and click **<span class="glyphicons glyphicons-global"></span> Domains & HTTPS**.
2. Click the **Connect a Domain** button and enter the bare domain (e.g. `example.com`) then click **Connect Domain**. We recommend you repeat this step for the `www` subdomain - even if you do not plan to use it as your primary domain.

  Domains that have not yet been registered will appear in the Site Dashboard like so:

  ![Domain & HTTPS Status: Not Registered](/source/docs/assets/images/dashboard/domains/not-registered.png)

  You must [purchase the domain from some third-party registrar](https://whois.icann.org/en/domain-name-registration-process) in order to connect it to Pantheon. Once registered, click **Recheck Domain Details** to refresh the configuration status of your domain in the Site Dashboard.

## Prove Ownership (Optional)
Domains added to the Site Dashboard that are pointing to an existing site and accessible via HTTPS have the option to prove ownership and pre-provision certificates in order to avoid HTTPS service interruption.

Once this step is complete, your domain's HTTPS certificate(s) will automatically begin generating. When the certificate is ready you can switch DNS destinations from your existing site to your new Pantheon site without downtime.

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
Skipping this step may result in service interruption for existing sites that require or expect HTTPS.
</div>

1. Click **<span class="glyphicons glyphicons-download-alt"></span> Download File**.
2. Upload the file to your live site.

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
        <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific1"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> DNS Host-Specific Instructions</h3></a>
      </div>
      <div id="host-specific1" class="collapse" style="padding:10px;">
        <ul class="top-docs top-docs-2col">
          {% for doc in data.docs_tags.providers %}
            {% if (doc.meta.type != "video") and (doc.meta.type != "guide") and (doc.meta.type != "terminuspage")%}
              <li><a href="{{ doc.url }}/#txt-record">{{ doc.provider }}</a></li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>
    </div>

3. Return to the Site Dashboard on Pantheon and refresh the **<span class="glyphicons glyphicons-global"></span> Domains & HTTPS** page.

  Once the certificates have been provisioned, you may safely continue without fear of HTTPS service interruption.


## Configure DNS
1. Domains that have not been routed to Pantheon will indicate **Action Required** in the Site Dashboard, like so:

  ![Domain & HTTPS Status: Action Required](/source/docs/assets/images/dashboard/domains/domains-status-action-required.png)

2. In a separate window, login to the DNS host for the domain and configure the recommended records.

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
        <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> DNS Host-Specific Instructions</h3></a>
      </div>
      <div id="host-specific" class="collapse" style="padding:10px;">
        <ul class="top-docs top-docs-2col">
          {% for doc in data.docs_tags.providers %}
            {% if (doc.meta.type != "video") and (doc.meta.type != "guide") and (doc.meta.type != "terminuspage")%}
              <li><a href="{{ doc.url }}">{{ doc.provider }}</a></li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>
    </div>

Unless you went through the steps to prove domain ownership to pre-provision certificates, you'll see HTTPS in progress within an hour of pointing DNS to Pantheon:

  ![Domain & HTTPS Status: Upgrading](/source/docs/assets/images/dashboard/domains/https-provisioning.png)

Once DNS is configured and your certificates are done provisioning, the status should indicate successful configuration:

![Domain & HTTPS Status: Successfully Secured and Routed](/source/docs/assets/images/dashboard/domains/domain-success.png)



## Frequently Asked Questions
### How can my existing sites take advantage of Free & Automated HTTPS?
Existing sites created before April 20th 2017 can access Free & Automated HTTPS by configuring DNS as recommended in the Dashboard. Once the new configuration is detected your certificates will begin provisioning automatically within an hour.

### Why does the Domains and HTTPS tool indicate action required even though I've updated DNS records?
The action required message may be due to one of the following:

  - **DNS changes can take some time to take effect:** Check the current state of DNS propagation from different parts of the world using this [free web tool](https://www.whatsmydns.net/).
  -  **AAAA records not detected:**: Ensure you've added both AAAA records for the bare domain (e.g. `example.com`) to route IPv6 traffic to your site. There are two AAAA records for improved uptime and reliability.
  - **Old DNS records detected:** If in addition to the correct DNS records, you also have old records, make sure to delete the old records.

### What About Personal Plans?
We share Let's Encrypt's goal of making HTTPS the standard for all sites on the internet, which means making it the standard for all sites on Pantheon. However, at this time we are focused on our existing HTTPS customers (Pro plans and above), and there's a considerable amount of work in making sure the new solution meets their needs, and that we are able to deprecate the legacy edge.

There is not yet a timeline for providing HTTPS service to Personal plans. However, you can use [Cloudflare's free universal SSL for free](/docs/guides/cloudflare-enable-https/).
