---
title: Early Access: EU Region Availability
description: Learn how to leverage early access support for launching sites from the European Union.
tags: [create]
categories: []
contributors: edwardangert
searchboost: 150
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are not yet available to all users.
---

Pantheon is extending early access to contract organizations (Enterprise, Reseller, OEM, and EDU+) that want to take a new site live from the European Union (**EU**) region.

## Enable Early Access
Participation in Early Access is opt-in and available to contract organizations only. To learn more about enabling this feature, contact your dedicated account manager or our [Sales team](https://pantheon.io/contact-us){.external}.

## Use Cases
There could be many scenarios for wanting to host a site within the EU region rather than the default US. Common use cases include:  

* Compliance standards that require data residency within the borders of the European Union
* Improve performance and user experience for authenticated traffic originating in or near the European Union


## Region Availability
Once enabled, this organization feature allows <a href="/docs/change-management/#organizations-roles-and-permissions" data-proofer-ignore>privileged users</a> to designate one of two available regions at the time of site creation:

* US (Default)
* EU

Site resources, including the database container, are provisioned in the specified region. For EU sites, traffic is served through the Global CDN, with the Amsterdam point of presence as origin shield.


## Go Live in the EU
### Create a New Site (Required)

1. Install and authenticate [Terminus](/docs/terminus). If you're already running Terminus, be sure and update to the [latest version](/docs/terminus/updates/) (2.0 minimum required).
2. Use Terminus to create a new site associated with your organization and include the `--region=eu` option.  

 For example (replace `my-eu-site-name`, `My EU Site Name`, `WordPress` and `My Organization Name` accordingly):

  ```bash
  terminus site:create my-eu-site-name "My EU Site Name" "WordPress" --org "My Organization Name" --region eu
  ```

  ![terminus site:create my-eu-site "My EU Site" "WordPress" --org "Rachel Pantheor" --region eu](/source/docs/assets/images/create-site-eu.png)

### Review Site Region (Optional)
You can view the region from within the Site Dashboard by clicking **Settings** > **About Site** then reviewing **Region**:

![Site Dashboard > Settings > About Site > Region: European Union](/source/docs/assets/images/settings-about-site-region-eu.png)

You can also get this information via Terminus.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Replace or assign `$SITE` with your site name or UUID.</p>
</div>

#### Display information for a specific site:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-site-info">Copy</button>
  <figure><pre id="terminus-site-info"><code class="command bash" data-lang="bash">terminus site:info $SITE</code></pre></figure>
</div>

#### Display a list of organization sites and their region:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-site-list">Copy</button>
  <figure><pre id="terminus-site-list"><code class="command bash" data-lang="bash">terminus site:list --org "My Organization Name" --fields name,region</code></pre></figure>
</div>

#### Show Relevant Response Header
Expose the `x-served-by` response header or grep `AMS` to verify whether the Amsterdam origin shield was used as expected (replace `example.com`):

```bash
curl -Is https://example.com | grep x-served-by
```

```bash
curl -Is https://example.com | grep AMS
```

![curl -Is https://dev-rachel-whitton-eu2.pantheonsite.io | grep x-served-by](/source/docs/assets/images/x-served-by-eu.png)

### Launch Preparation (Required)
At least one week before target launch date, complete the following:

1.  Connect all custom domains to target environments (e.g., `www.example.com` and `example.com` on Live).
2.  Configure DNS based on recommended values provided by the Site Dashboard's Domain tool.

    <div class="alert alert-info" role="alert">
    <h4 class="info">Note</h4>
    <p markdown="1">It can take up to one week for your domain to route directly to the EU region.</p>
    </div>

3.  [Open a Support ticket](https://dashboard.pantheon.io/#support){.external} using the following template (replace `example` throughout):

    >We are preparing to go live for the site named `<example>`. Please add the following domains to your next EU deployment:
    >
    >* example.com
    >* www.example.com
    >* blog.example.com
    >* test.example.com
    >* dev.example.com
    > <br />
    > <br />
    >
    >We understand that domains will be routed to the EU every Tuesday, for all requests submitted by the preceding Friday, and that we will receive confirmation when the update is complete, at which time we can update DNS.

    <div class="alert alert-danger" role="alert">
    <h4 class="warning">Warning</h4>
    <p markdown="1">Do not drive traffic to custom domains (for example, via targeted ad campaigns or newsletter distribution lists) until Pantheon confirms the domain is configured for EU routing.</p>
    </div>

4. After receiving confirmation, celebrate. Your site is running in the EU!


## Frequently Asked Questions
### Can I use the EU region for an existing site?
Yes, however you must migrate your existing site to a new Site Dashboard that was configured for the EU region during creation (as described [above](#create-a-new-site-required)).

Contact your account owner or our [Sales team](https://pantheon.io/contact-us){.external} to learn about Pantheon's migration services or review [relaunch procedure](/docs/relaunch/) for steps on how to migrate the site yourself.

## Coming Soon

More EU Region features are in active development. [Contact us](https://pantheon.io/contact-us){.external} to learn more, and check this guide for updates.

Coming soon:

  - Dashboard support
  - Automated domain routing
