---
title: Create a New Site in Pantheon's EU Region
description: Learn how to get Limited Availability access to and launch sites in Pantheon's European Union Region.
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

During this feature's Limited Availability period, participation is opt-in and available to contract customers only. All other new sites will continue to be deployed to the default US region. [Give us a call](https://pantheon.io/contact-us){.external} for information about pricing and how to enable your organization to create sites in the EU Region before the feature becomes widely available in late 2019.

## Use Cases
There are many scenarios in which you might prefer running a site within the EU Region rather than the default US. Common use cases include:

* Compliance standards that require data residency within the borders of the European Union
* Improved performance and user experience for authenticated traffic originating in or near the European Union

## Region Availability
Once enabled, this Organization-wide feature allows <a href="/docs/change-management/#organizations-roles-and-permissions" data-proofer-ignore>privileged users</a> to designate one of two available regions at the time of site creation:

* US (Default)
* EU

### EU Data Residency

Pantheon sites running in Europe have all site resources in the EU. This includes application and database containers, Redis cache servers, Apache Solr index servers, and a distributed filesystem and request router.

Automated and manual backups of all site components (code, database, and files) are stored in the EU and created by job workers also running in the EU. Additionally, any database or file clones between site environments are run by EU job workers.

Localized, EU-specific [Disaster Recovery](/docs/disaster-recovery/) is also available.

With this set of EU-specific resources, now you can run WordPress or Drupal sites on Pantheon and meet the European Union's legal, regulatory, or data sovereignty requirements.

## Create a New Site

1. Install and authenticate [Terminus](/docs/terminus/). The commands used for International Regions require Terminus 2.0 or newer. If you're already running Terminus, be sure to update to the [latest version](/docs/terminus/updates/).
1. Use Terminus to create a new site associated with your organization and include the `--region=eu` option.

 For example (replace `my-eu-site-name`, `My EU Site Name`, `WordPress` and `My Organization Name` accordingly):

 ```bash
 terminus site:create my-eu-site-name "My EU Site Name" "WordPress" --org "My Organization Name" --region eu
 ```

  ![terminus site:create my-eu-site "My EU Site" "WordPress" --org "Rachel Pantheor" --region eu](/source/docs/assets/images/create-site-eu.png)

  See `terminus site:create --help` for more information on the options and values used in this command.

## Migrate an Existing Site to the EU Region
To migrate an existing site from one region to another, create the new site as described above, then follow the [Manually Migrate Sites to Pantheon](/docs/migrate-manual/#import-your-code) doc. The [Relaunch Procedure](/docs/relaunch/#relaunch-procedure) section of the Relaunch doc is a good resource to help make the transition to your new live site smooth.

If you want help migrating your site between regions, our [Professional Services Migrations](https://pantheon.io/professional-services){.external} team is available.

## Review Site Region

Use the Dashboard to see the Pantheon Region in which the site is hosted:

1.  Navigate to the Site Dashboard
1.  Click **Settings**, then **About Site**
1.  **Region** will show either:
    - `United States`, by default, or
    - `European Union`, if the site is hosted in the EU Region

![Site Dashboard > Settings > About Site > Region: European Union](/source/docs/assets/images/settings-about-site-region-eu.png)

You can also get this information via Terminus.

In the following sections, assign `$SITE` or replace it in each example with your site name or UUID.

### Display information for a specific site

```bash
terminus site:info $SITE
```

### Display a list of organization sites and their region

```bash
terminus site:list --org "My Organization Name" --fields name,region
```

### Verify Domains Route Correctly
Use `grep` to expose the `x-served-by` response header or `AMS` to verify whether the Amsterdam origin shield was used as expected (replace `example.com`):

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

More International Region features are in active development. [Contact us](https://pantheon.io/contact-us){.external} to learn more, and check this doc for updates.

Coming soon:

  - Region Facet on Organization Dashboard
  - More Regions!
    - [Fill out this survey](https://www.getfeedback.com/r/hkR9uTAJ){.external} to tell us about your needs.

## Frequently Asked Questions
### Can I use the EU region for an existing site?
Yes, however you must migrate your existing site to a new Site that was configured for the EU region during creation ([as described above](#create-a-new-site)).

### When will access to Pantheon's EU Region be available for sites paid by credit card?
General Availability is planned for late 2019. Tell us more about your needs by [filling out this survey](https://www.getfeedback.com/r/hkR9uTAJ){.external}.

### When will site creation through the Dashboard be available?
General availability is planned for late 2019.

Contact your account owner or our [Sales team](https://pantheon.io/contact-us){.external} to learn about Pantheon's migration services or review the [relaunch procedure](/docs/relaunch/) for steps on how to migrate the site yourself.
