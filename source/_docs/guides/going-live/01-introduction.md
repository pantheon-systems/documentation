---
title: Going Live
subtitle: Introduction
description: Essential guide to launching sites on Pantheon like you're in a 55-foot tall jungle-walking robot exoskeleton, killin it.
tags: [golive]
layout: guide
type: guide
anchorid: introduction
golive: true
generator: pagination
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/
nexturl: guides/going-live/plans/
nextpage: Upgrade Site Plan
completiontime: 1 hour
editpath: going-live/01-introduction.md
---
Welcome! This guide is designed to help you take your first site live on Pantheon.

**In this guide, you’ll learn how to:**

* Upgrade to a paid service level
* Connect a domain you own to Pantheon and enable Free & Automatic HTTPS
* Redirect traffic to a primary domain (e.g. `www.example.com` or `example.com`)

To get started you'll need to [create the Live environment](/docs/guides/getting-started/create-test-live/) and have a registered domain name where you can control DNS settings.

<div class="alert alert-info">
<h4 class="info">Note</h4>
Pantheon does not register domains, host or manage DNS, or provide mail servers. To connect a Custom Domain on Pantheon, you'll need to register one with a third-party provider.
</div>

<div class="panel panel-video panel-guide" id="accordion">
  <div class="panel-heading panel-video-heading">
    <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#suggest-registrars"><h3 class="panel-title panel-video-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-shopping-cart"></span> Domain Registrars</h3></a>
  </div>
  <div id="suggest-registrars" class="collapse" style="padding:10px;">
    <div markdown="1">
      We don't specifically recommend one, but here are a few to consider:

      * <a href="https://www.1and1.com/register-a-domain-name" target="blank">1&1 <span class="glyphicons glyphicons-new-window-alt"></span></a>
      * <a href="https://www.dreamhost.com/domains/" target="blank">DreamHost <span class="glyphicons glyphicons-new-window-alt"></span></a>
      * <a href="https://dyn.com/domain-registration/" target="blank">Dyn <span class="glyphicons glyphicons-new-window-alt"></span></a>
      * <a href="https://www.enom.com/" target="blank">eNom <span class="glyphicons glyphicons-new-window-alt"></span></a>
      * <a href="https://www.gandi.net/" target="blank">Gandi <span class="glyphicons glyphicons-new-window-alt"></span></a>
      * <a href="https://www.godaddy.com/" target="blank">GoDaddy <span class="glyphicons glyphicons-new-window-alt"></span></a>
      * <a href="https://www.namecheap.com/" target="blank">Namecheap <span class="glyphicons glyphicons-new-window-alt"></span></a>
      * <a href="https://www.networksolutions.com/" target="blank">Network Solutions <span class="glyphicons glyphicons-new-window-alt"></span></a>
      </div>
    </div>
  </div>
