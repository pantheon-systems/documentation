---
title: Launch Essentials
subtitle: Configure DNS and Provision HTTPS
description: Part four of our Launch Essentials guide covers DNS records and HTTPS provisioning.
launch: true
anchorid: dns
generator: pagination
layout: guide
type: guide
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
In this lesson we'll configure DNS and provision [free, automated HTTPS](/docs/https/) on Pantheon.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
If your site is already live and serving HTTPS traffic, and will require HTTPS on Pantheon, return to [Connect a Domain Name](/docs/guides/launch/domains/) and complete the steps to pre-provision HTTPS before updating DNS to avoid downtime.
</div>

These instructions cover the common `example.com` and `www.example.com` domain configuration. For other domain configurations, see [Platform and Custom Domains](/docs/domains/#custom-domains).

{% include("content/configure-dns.html")%}

For more detailed instructions pertaining to your specific DNS host, click below:

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific2"><h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> DNS Host-Specific Instructions</h3></a>
  </div>
  <div id="host-specific2" class="collapse" style="padding:10px;">
    <ul class="top-docs top-docs-2col docs-2col-panel">
      {% for doc in data.docs_tags.providers %}
        {% if (doc.meta.type != "video") and (doc.meta.type != "guide") and (doc.meta.type != "terminuspage")%}
          <li><a href="{{ doc.url }}">{{ doc.provider }}</a></li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
</div>

{% include("content/enable-https.html")%}

{% include("content/https-requirements.html")%}
