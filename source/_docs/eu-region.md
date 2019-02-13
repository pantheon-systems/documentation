---
title: Create a New Site in Pantheon's EU Region
description: Learn how to create a new site located in the EU.
tags: [!!!!!!!!!!]
categories: []
contributors: edwardangert
searchboost: 150
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are not available across the entire platform.
---

Pantheon is extending early access invitations to customers who want to deploy a new Live site within the European Union (EU).

## How to Enable Early Access to EU Region

Site resources (database container, codeserver, application container, etc.) are provisioned in the European Union. Traffic is served through the Global CDN, configured with the Amsterdam (AMS) point of presence (POP) as an origin shield.

To help satisfy Data Residency requirements, EU Region backups are in active development. This and other features will be available soon. Check this guide for updates.

During this feature's Early Access period, participation is opt-in only. [Contact Sales]((https://pantheon.io/contact-us){.external} for information about pricing and how to enable your account for early access to the EU Region.

## How to Create a Pantheon Site in the EU Region

Use [Terminus](/docs/terminus/) to create a site using `site:create` and the `--region` flag:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-new-eu-site">Copy</button>
  <figure><pre id="terminus-new-eu-site"><code class="command bash" data-lang="bash">terminus site:create --region=eu</code></pre></figure>
</div>

### Use Terminus to Display Sites and Regions

To display a specific site's plan and region information:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-site-info">Copy</button>
  <figure><pre id="terminus-site-info"><code class="command bash" data-lang="bash">terminus site:info</code></pre></figure>
</div>

For a list of sites along with their region:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-site-list">Copy</button>
  <figure><pre id="terminus-site-list"><code class="command bash" data-lang="bash">terminus site:list</code></pre></figure>
</div>

## Prepare your Site and Deploy Live to EU

1.  Add domains to all environments.
2.  Do not update DNS.
    - Pantheon performs weekly deployments to route all of your domains. If you update manually, domains will be temporarily routed through the US.
3.  [Open a Support ticket](https://dashboard.pantheon.io/#support){.external} with the following template:

    ```nohighlight
    We are preparing to go live for the site named <example>. Please add the following domains to your next deployment:

    example.com
    www.example.com
    blog.example.com
    test.example.com
    dev.example.com

    We understand that domains will be routed to the EU every Tuesday, for all requests submitted by the preceding Friday, and that we will receive confirmation when the update is complete, at which time we can update DNS.
    ```
