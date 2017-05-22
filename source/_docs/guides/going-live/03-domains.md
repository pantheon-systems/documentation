---
title: Going Live
subtitle: Connect a Domain
golive: true
anchorid: domains
generator: pagination
layout: guide
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
    - docs_tags
permalink: docs/guides/going-live/domains/
nexturl: guides/going-live/https/
nextpage: Enable HTTPS
previousurl: guides/going-live/plans/
previouspage: Set Service Plan Level
editpath: going-live/03-domains.md
---
In this lesson, we’re going to point a domain name that you own to Pantheon and configure DNS. It is critical to do this and the next 2 steps (Enabling HTTPS on Live, and Redirecting to a primary domain) at the same time.

<div class="panel panel-video panel-guide">
  <script src="//fast.wistia.com/embed/medias/h840dbemsi.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_h840dbemsi videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
</div>

1. All sites have what is called a bare domain, such as example.com, and a www domain, such as www.example.com.  Ultimately we will want to only use one for your traffic as best practice.  The platform can assure that only one is used but both need to be entered at this step.  The great news is that when you enter either, the platform will suggest automatically adding the other.

    *  In the Site Dashboard click on the Live environment.  

        <div class="alert alert-info">
        <h4 class="alert">Note</h4>
        <p markdown="1">While you can configure the DNS for any environment, it is highly unusual to configure a DNS against the Dev or Test environment.  If you have need to whitelabel these environments for client work, contact our sales department to enquire about doing this as a partner or reseller.</p></div>

    * If the Live Environment has not been created yet,

        * enter your domain into the provided field and create it now.

    * If the Live Environment was previously created,

        * Click on ‘Domains and HTTPS’ on the SIte Dashboard left hand side to bring up the Domains screen
        * Click the ‘Connect Domain’ button
        * Enter your domain.  If you enter the bare, the www will be suggested to be added.  It is highly recommended you add both. Hit “Connect Domain”.
        * This will place you on the “Domains / DNS Settings For (yourdomain)” screen.  You will see two DNS records created:
              * The A record
              * The AAAA record
        * In a separate window, go to your DNS Hosting Provider’s administration window and configure the A and AAAA with the address provided in previous step. See the following resources for help configuring DNS using your specific hosting provider:

            <ul class="top-docs top-docs-2col">
              {% for doc in data.docs_tags.providers %}
                {% if (doc.meta.type != "video") and (doc.meta.type != "guide") and (doc.meta.type != "terminuspage")%}
                  <li><a href="{{ doc.url }}">{{ doc.provider }}</a></li>
                {% endif %}
              {% endfor %}
            </ul>

        * Use the check “Verify that your current DNS points to Pantheon” tool on the right hand side to see if this change has taken effect. Once this check is successful, your site can then be reached by using your domain address.  There is no need for this step to complete before moving on to the next step in the process “Enabling HTTPS”.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">DNS changes can take up to 72 hours, though most modern providers will refresh in a much shorter amount of time. Pantheon has no control over this aspect of the process.</p>
</div>
