---
title: Create a New Site in Pantheon's EU Region
description: Learn how to create a new site located in the EU.
tags: [create]
categories: []
contributors: edwardangert
searchboost: 150
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are not yet available to all users.
---

Pantheon is extending early access invitations to customers who want to deploy a new site within the European Union (**EU**).

### Details

Site resources (database container, codeserver, application container, etc.) are provisioned in the European Union. Traffic is served through the Global CDN, configured with the Amsterdam (AMS) point of presence (**POP**) as an origin shield.

## How to Enable Early Access to EU Region

During this feature's Early Access period, participation is opt-in only. [Give us a call](https://pantheon.io/contact-us){.external} for information about pricing and how to enable your account for early access to the EU Region.

## How to Create a Pantheon Site in the EU Region

Note that the `--region` flag used in this section requires [Terminus 2.0](/docs/terminus/) and higher. If you're using an older version, see our guide on [how to update Terminus](/docs/terminus/updates/).

Use Terminus to create a site using `site:create` and the `--region` flag:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-new-eu-site">Copy</button>
  <figure><pre id="terminus-new-eu-site"><code class="command bash" data-lang="bash">terminus site:create --region=eu</code></pre></figure>
</div>

This command accepts the following as values: site name, label, and upstream name or UUID. For more information, run `terminus help site:create`.

### Use Terminus to Display Sites and Regions

In the following examples, replace or assign `$SITE` with your site name or UUID.

To display a specific site's plan and region information:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-site-info">Copy</button>
  <figure><pre id="terminus-site-info"><code class="command bash" data-lang="bash">terminus site:info $SITE</code></pre></figure>
</div>

For a list of sites along with their region:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-site-list">Copy</button>
  <figure><pre id="terminus-site-list"><code class="command bash" data-lang="bash">terminus site:list</code></pre></figure>
</div>

## Prepare your Site and Deploy Live to EU

1.  Add domains to all environments.
2.  Do not update DNS.
    - Pantheon performs weekly EU deployments to route all of your domains. If you update manually, domains will be temporarily routed through the US.
3.  [Open a Support ticket](https://dashboard.pantheon.io/#support){.external} with the following template:

    ```nohighlight
    We are preparing to go live for the site named <example>. Please add the following domains to your next EU deployment:

    example.com
    www.example.com
    blog.example.com
    test.example.com
    dev.example.com

    We understand that domains will be routed to the EU every Tuesday, for all requests submitted by the preceding Friday, and that we will receive confirmation when the update is complete, at which time we can update DNS.
    ```

## Coming Soon

EU Region features are in active development and release. The following features are coming soon. [Contact us](https://pantheon.io/contact-us){.external} to learn more, and check this guide for updates on features and usage.

Coming soon:
  - Enhanced data residency
  - Dashboard support
