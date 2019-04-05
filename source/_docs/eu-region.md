---
title: Create a New Site in the Pantheon EU Region
description: Learn how to get access to and launch sites in Pantheon's Limited Availability European Union Region.
tags: [create, regions]
categories: []
contributors: [edwardangert, rachelwhitton, ari]
searchboost: 150
---

<div class="alert alert-info" markdown="1">
#### Limited Availability {.info}
The documentation on this page discusses features and options that are not yet available to all users.
</div>

Pantheon is extending Limited Availability invitations to contract organizations (Enterprise, Reseller, OEM, and EDU+) that want to take a new site live from the new European Union (**EU**) Region.

During this feature's Limited Availability period, participation is opt-in and available to contract customers only. All other new sites will continue to be deployed to the default US region. [Give us a call](https://pantheon.io/contact-us){.external} for information about pricing and how to enable your organization to create sites in the EU Region.

## Use Cases
There could be many scenarios for wanting to run a site within the EU region rather than the default US. Common use cases include:

* Compliance standards that require data residency within the borders of the European Union
* Improve performance and user experience for authenticated traffic originating in or near the European Union

## Region Availability
Once enabled, this Organization-wide feature allows <a href="/docs/change-management/#organizations-roles-and-permissions" data-proofer-ignore>privileged users</a> to designate one of two available regions at the time of site creation:

* US (Default)
* EU

### EU Data Residency

Now you can run WordPress or Drupal sites on Pantheon and meet legal, regulatory, or data sovereignty requirements from the European Union.

Pantheon sites running in Europe have all site resources in the EU. This includes application and database containers, distributed filesystem and request router, Redis cache servers, and Apache Solr index servers.

Automated and manual backups of all site components (code, database, and files) are stored in the EU and created by job workers also running in the EU. Additionally, any database or file clones between site environments are run by EU job workers.

## Create a New Site

1. Install and authenticate [Terminus 2.0](/docs/terminus/). The commands used for International Regions require Terminus 2.0. If you're already running Terminus, be sure and update to the [latest version](/docs/terminus/updates/).
2. Use Terminus to create a new site associated with your organization and include the `--region=eu` option.

 For example (replace `my-eu-site-name`, `My EU Site Name`, `WordPress` and `My Organization Name` accordingly):

 <div class="copy-snippet">
   <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-new-site">Copy</button>
   <figure><pre id="terminus-new-site"><code class="command bash" data-lang="bash">
  terminus site:create my-eu-site-name "My EU Site Name" "WordPress" --org "My Organization Name" --region eu</code></pre></figure>
 </div>

  ![terminus site:create my-eu-site "My EU Site" "WordPress" --org "Rachel Pantheor" --region eu](/source/docs/assets/images/create-site-eu.png)

## Migrate an Existing Site to the EU Region

The [typical way to migrate sites](/docs/migrate/) is not yet available for international migrations. To migrate an existing site from one region to another, create the new site as described above, then follow the [Manually Migrate Sites to Pantheon](/docs/migrate-manual/) guide.

If you want help migrating your site between regions, our [Professional Services Migrations](https://pantheon.io/professional-services){.external} team is available.

## Review Site Region

Use the Dashboard to see the Pantheon Region in which the site is hosted:

1.  Navigate to the site Dashboard
1.  Click **Settings**
1.  **About Site**
1.  **Region** will show either:
    - `United States`, by default, or
    - `European Union`, if the site is hosted in the EU Region

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

## Coming Soon

More International Region features are in active development. [Contact us](https://pantheon.io/contact-us){.external} to learn more, and check this guide for updates.

Coming soon:

  - Disaster Recovery for EU Region
  - Region Facet on Organization Dashboard
  - More Regions!
    - [Fill out this survey](https://www.getfeedback.com/r/hkR9uTAJ){.external} to tell us about your needs.

## Frequently Asked Questions
### Can I use the EU region for an existing site?
Yes, however you must migrate your existing site to a new Site Dashboard that was configured for the EU region during creation ([as described above](#create-a-new-site)).

### When will EU Region be available for sites paid by credit card?
General Availability is planned for late 2019. Tell us more about your needs by [filling out this survey](https://www.getfeedback.com/r/hkR9uTAJ){.external}.

### When will site creation through the Dashboard be available?
General availability is planned for late 2019.

Contact your account owner or our [Sales team](https://pantheon.io/contact-us){.external} to learn about Pantheon's migration services or review the [relaunch procedure](/docs/relaunch/) for steps on how to migrate the site yourself.
