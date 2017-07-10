---
title: Launch Essentials
subtitle: Configure DNS and HTTPS
launch: true
anchorid: dns
generator: pagination
layout: guide
pagination:
    provider: data.launchpages
use:
    - launchpages
    - docs_tags
permalink: docs/guides/launch/configure-dns/
nexturl: guides/launch/redirects/
nextpage: Redirect to a Primary Domain
previousurl: guides/launch/domains/
previouspage: Connect a Domain to Live
editpath: launch/04-configure-dns.md
image: getting-started-Largethumb
---
In this lesson we'll configure DNS and provision HTTPS on Pantheon. For details, see [Free and Managed HTTPS](/docs/free-https/).

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
If your site is already live and requires HTTPS, return to <a href="/docs/guides/launch/domains">Connect a Domain to Live</a> and complete the steps to pre-provision HTTPS before updating DNS to avoid downtime.
</div>

## Configure DNS
The <span class="glyphicons glyphicons-alert text-warning"></span> icon within the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page indicates that the domain has not been properly routed to Pantheon. The following actions are required:

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.
2. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.
3. Select **Details** next to the `www` domain.
4. In a separate window, log in to the DNS host for the domain.
5. Copy the value provided in the Pantheon Site Dashboard for the required CNAME record (e.g., `live-yoursite.pantheonsite.io`), then use it to create a CNAME record wherever you manage DNS.

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
        <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific"><h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> DNS Host-Specific Instructions</h3></a>
      </div>
      <div id="host-specific" class="collapse" style="padding:10px;">
        <ul class="top-docs top-docs-2col docs-2col-panel">
          {% for doc in data.docs_tags.providers %}
            {% if (doc.meta.type != "video") and (doc.meta.type != "guide") and (doc.meta.type != "terminuspage")%}
              <li><a href="{{ doc.url }}/#cname-record">{{ doc.provider }}</a></li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>
    </div>

6. Return to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page in the Pantheon Site Dashboard.
7. Click **Details** next to the bare domain.
8. Copy the value provided in the Pantheon Site Dashboard for the required A record, then use it to create an A record wherever you manage DNS.

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
        <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific-2"><h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> DNS Host-Specific Instructions</h3></a>
      </div>
      <div id="host-specific-2" class="collapse" style="padding:10px;">
        <ul class="top-docs top-docs-2col docs-2col-panel">
          {% for doc in data.docs_tags.providers %}
            {% if (doc.meta.type != "video") and (doc.meta.type != "guide") and (doc.meta.type != "terminuspage")%}
              <li><a data-proofer-ignore href="{{ doc.url }}/#aaaaa-records">{{ doc.provider }}</a></li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>
    </div>

    Repeat this step for **both** of the required AAAA records.

## Provision HTTPS
The process to provision certificates kicks off automatically after the domain has been successfully routed to Pantheon, indicated by the following notice:

<blockquote class="block-info">
<h3 class="info">HTTPS</h3>
<span class="glyphicons glyphicons-history text-info"></span> Your DNS configuration is correct, and certificate provisioning is queued to start for this domain.</blockquote>

Both the bare domain and the `www` domain will be accessible over HTTPS once the HTTPS status turns green (which may take up to an hour):

<blockquote class="block-success">
<h3 class="info">HTTPS</h3>
<span class="glyphicons glyphicons-ok text-success"></span> Let’s Encrypt certificate deployed to Pantheon’s Global CDN. Certificate renews automatically with no additional cost.</blockquote>
