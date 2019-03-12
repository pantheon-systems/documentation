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

Pantheon is extending early access invitations to contract customers who want to deploy a new site within the European Union (**EU**).

### Details

Site resources, including the database container, are provisioned in the European Union. Traffic is served through the Global CDN, with the Amsterdam point of presence as origin shield.

## How to Enable Early Access to EU Region

During this feature's Early Access period, participation is opt-in only for contract customers. [Give us a call](https://pantheon.io/contact-us){.external} for information about pricing and how to enable your account for early access to the EU Region.

## How to Create a Pantheon Site in the EU Region

Once granted early access, create new sites with [Terminus](/docs/terminus/), Pantheon's command line interface (**CLI**).

Note that the `--region` flag used in this section requires Terminus 2.0 or higher. See [how to update Terminus](/docs/terminus/updates/) for more information.

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

## Open Ticket to Prepare to Go Live

In advance of going live with your site, please let us know the domains you'd like to route to your site. 

Allow one week between submitting a ticket until go live. Opening a ticket will not be necessary after early access.

1.  Add domains to all environments.
2.  Update DNS values to those provided by the Dashboard. Note that during early access, it may take up to one week for your domain to route directly to the EU region.
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
4. After receiving confirmation, celebrate. Your site is running in the EU!

## Coming Soon

More EU Region features are in active development. [Contact us](https://pantheon.io/contact-us){.external} to learn more, and check this guide for updates.

Coming soon:

  - Dashboard support
  - Automated domain routing
