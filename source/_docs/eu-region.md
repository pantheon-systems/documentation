---
title: Create a New Site in a Pantheon International Region
description: Learn how to get access to and launch sites in Pantheon's newest International Region: The European Union.
tags: [create]
categories: []
contributors: [edwardangert, rachelwhitton, ari]
searchboost: 150
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are not yet available to all users.
---

Pantheon is extending early access to contract organizations (Enterprise, Reseller, OEM, and EDU+) that want to take a new site live from the European Union (**EU**) region.

## Enable Access
Participation in Early Access is opt-in and available to contract organizations only. To learn more about how to enable this feature, contact your dedicated account manager or our [Sales team](https://pantheon.io/contact-us){.external}.

## Use Cases
There could be many scenarios for wanting to run a site within the EU region rather than the default US. Common use cases include:

* Compliance standards that require data residency within the borders of the European Union
* Improve performance and user experience for authenticated traffic originating in or near the European Union

## Region Availability
Once enabled, this organization feature allows [privileged users](/docs/change-management/#organizations-roles-and-permissions) to designate one of two available regions at the time of site creation:

* US (Default)
* EU

### EU Data Residency

Now you can run WordPress or Drupal sites on Pantheon and meet legal, regulatory, or data sovereignty requirements from the European Union.

Pantheon sites running in Europe have all site resources in the EU. This includes application and database containers, distributed filesystem and request router, Redis cache servers, and Apache Solr index servers.

Automated and manual backups of all site components (code, database, and files) are stored in the EU and created by job workers also running in the EU. Additionally, any database or file clones between site environments are run by EU job workers.

## Go Live in the EU
### Create a New Site (Required)

1. Install and authenticate [Terminus 2.0](/docs/terminus/). The commands used for International Regions require Terminus 2.0. If you're already running Terminus, be sure and update to the [latest version](/docs/terminus/updates/).
2. Use Terminus to create a new site associated with your organization and include the `--region=eu` option.

 For example (replace `my-eu-site-name`, `My EU Site Name`, `WordPress` and `My Organization Name` accordingly):

 <div class="copy-snippet">
   <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-new-site">Copy</button>
   <figure><pre id="terminus-new-site"><code class="command bash" data-lang="bash">
  terminus site:create my-eu-site-name "My EU Site Name" "WordPress" --org "My Organization Name" --region eu</code></pre></figure>
 </div>

  ![terminus site:create my-eu-site "My EU Site" "WordPress" --org "Rachel Pantheor" --region eu](/source/docs/assets/images/create-site-eu.png)

## Review Site Region (Optional)
You can view the region from within the Site Dashboard by clicking **Settings** > **About Site** then reviewing **Region**:

![Site Dashboard > Settings > About Site > Region: European Union](/source/docs/assets/images/settings-about-site-region-eu.png)

You can also get this information via Terminus.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Replace or assign `$SITE` with your site name or UUID.</p>
</div>

### Display information for a specific site

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-site-info">Copy</button>
  <figure><pre id="terminus-site-info"><code class="command bash" data-lang="bash">terminus site:info $SITE</code></pre></figure>
</div>

### Display a list of organization sites and their region

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-site-list">Copy</button>
  <figure><pre id="terminus-site-list"><code class="command bash" data-lang="bash">terminus site:list --org "My Organization Name" --fields name,region</code></pre></figure>
</div>

### Verify Domains Route Correctly
Expose the `x-served-by` response header or grep `AMS` to verify whether the Amsterdam origin shield was used as expected (replace `example.com`):

```bash
curl -Is https://example.com | grep x-served-by
```

```bash
curl -Is https://example.com | grep AMS
```

The output should look something like:

```bash
curl -Is https://dev-rachel-whitton-eu2.pantheonsite.io | grep x-served-by
x-served-by: cache-ams21041-AMS, cache-jfk8127-JFK
```

Time to celebrate. Your site is running in the EU!

## Frequently Asked Questions
### Can I use the EU region for an existing site?
Yes, however you must migrate your existing site to a new Site Dashboard that was configured for the EU region during creation (as described [above](#create-a-new-site-required)).

### When will EU Region be available for sites paid by credit card?
General Availability is planned for late 2019. Tell us more about your needs by [filling out this survey](https://www.getfeedback.com/r/hkR9uTAJ){.external}.

### When will site creation through the Dashboard be available?
General availability is planned for late 2019.

Contact your account owner or our [Sales team](https://pantheon.io/contact-us){.external} to learn about Pantheon's migration services or review the [relaunch procedure](/docs/relaunch/) for steps on how to migrate the site yourself.

## Coming Soon

More EU Region features are in active development. [Contact us](https://pantheon.io/contact-us){.external} to learn more, and check this guide for updates.

Coming soon:

  - Disaster Recovery for EU Region
  - Dashboard support
  - Region Facet on Organization Dashboard
  - More Regions!
    - [Fill this survey](https://www.getfeedback.com/r/hkR9uTAJ){.external} to tell us about your needs.
