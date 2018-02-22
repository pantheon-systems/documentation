---
title: Launch Essentials
subtitle: Configure DNS and Provision HTTPS
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

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">If your site is already live and requires HTTPS, return to [Connect a Domain Name](/docs/guides/launch/domains/) and complete the steps to pre-provision HTTPS before updating DNS to avoid downtime.</p>
</div>

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
