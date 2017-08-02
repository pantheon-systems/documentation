---
title: Launch Essentials
subtitle: Configure DNS
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
1. Domains that haven’t been routed to Pantheon will indicate action required on the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page, like so:

  ![Action Required configure DNS](/source/docs/assets/images/dashboard/domains-action-required.png)

2. Click the **Details** button next to your domain.
3. In a separate window, log in to the DNS host for the domain and configure the recommended records.
4. Copy the value provided in the Pantheon Site Dashboard for the required A record, then use it to create an A record wherever you manage DNS.

  Repeat this step for both of the required AAAA records. If you also connected the  www subdomain, navigate to the domain details to get the required CNAME value.

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
        <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific"><h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> DNS Host-Specific Instructions</h3></a>
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

<blockquote class="block-info">
<h3 class="info">HTTPS</h3>
<span class="glyphicons glyphicons-history text-info"></span> Your DNS configuration is correct, and certificate provisioning is queued to start for this domain.</blockquote>

Once DNS is configured and your certificates are provisioned, the status should indicate successful configuration:

<blockquote class="block-success">
<h3 class="info">HTTPS</h3>
<span class="glyphicons glyphicons-ok text-success"></span> Let’s Encrypt certificate deployed to Pantheon’s Global CDN. Certificate renews automatically with no additional cost.</blockquote>
