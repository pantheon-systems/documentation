---
title: Create a New Site in Pantheon's EU Region
description: Learn how to create a new site located in the EU.
tags: [create, regions]
categories: []
contributors: edwardangert
searchboost: 150
---

<div class="alert alert-info" markdown="1">
#### Limited Availability {.info}
The documentation on this page discusses features and options that are not yet available to all users.
</div>

Pantheon is extending Limited Availability invitations to contract customers who want to deploy a new site within the European Union (**EU**).

### Details

Site resources, including the database container, are provisioned in the European Union. Traffic is served through the Global CDN, with the Amsterdam point of presence as origin shield.

## How to Enable Access and Create Sites in the EU Region

During this feature's Limited Availability period, participation is opt-in only for contract customers. All other new sites will continue to be deployed to the default US region. [Give us a call](https://pantheon.io/contact-us){.external} for information about pricing and how to enable your account to create sites in the EU Region.

Once granted access, our Support team will create the new site for you.

## Confirm the Site's Current Region

### View the Site's Region in the Dashboard

Use the Dashboard to confirm the Pantheon Region in which the site hosted:

1.  Navigate to the site Dashboard
1.  Click **Settings**
1.  **About Site**
1.  Region will show either:
    - `United States`, by default, or
    - `European Union`, if the site is hosted in the EU Region

## Use Terminus to Display Sites and Regions

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

## Migrate an Existing Site to the EU Region

The [typical way to migrate sites](/docs/migrate/) is not yet available for international migrations. To migrate an existing site from one region to another, create the new site as described above, then follow the [Manually Migrate Sites to Pantheon](/docs/migrate-manual/) guide.

If you want help migrating your site between regions, our [Professional Services Migrations](https://pantheon.io/professional-services){.external} team is available for hire.

## Coming Soon

More EU Region features are in active development. [Contact us](https://pantheon.io/contact-us){.external} to learn more, and check this guide for updates.

Coming soon:

  - Dashboard support
  - Automated domain routing
