---
title: Pantheon Site Regions and Data Residency
description: Learn how to get Limited Availability access to and launch sites in Australia, Canada, or the European Union.
tags: [create, regions]
categories: []
contributors: [edwardangert, rachelwhitton, ari]
searchboost: 150
---

## Use Cases
There are many scenarios in which you might prefer running a site in a data center outside of the default United States Region. Common use cases include:

* Compliance standards that require data residency within the borders of Australia, Canada, or the European Union
* Improved performance and user experience for authenticated traffic originating near the desired region

## Region Availability

Four regions are available when creating a new site:

* United States (**US**) (Default)
* Australia (**AUS**)
* Canada (**CA**)
* European Union (**EU**)

### Data Residency and Protection

Pantheon sites have all site resources in the region in which it was created. This includes application and database containers, Redis cache servers, Apache Solr index servers, and a distributed filesystem and request router.

Automated and manual backups of all site components (code, database, and files) are stored in the local region, and created by job workers also running in the region. Additionally, any database or file clones between site environments are run by local job workers.

Localized, region-specific [Disaster Recovery](/docs/disaster-recovery/) is also available.

With this set of region-specific resources, now you can run WordPress or Drupal sites on Pantheon and meet local legal, regulatory, or data sovereignty requirements.

## Create a New Site in a New Region

[Create a new Site](/docs/sites/) from the Dashboard and select the Region:

![Select a Region from the Create Your Pantheon Site screen](/source/docs/assets/images/dashboard/create-pantheon-site.png "Select a Region from the Create Your Pantheon Site screen")

### Create a New Site in a Specific Region using Terminus

1. Install and authenticate [Terminus](/docs/terminus/). The commands used here require Terminus 2.0 or newer. If you're already running Terminus, be sure to update to the [latest version](/docs/terminus/updates/).
1. Use Terminus to create a new site associated with your organization and include the `--region=` option.

 - Available region codes are:
   - `us`
   - `aus`
   - `ca`
   - `eu`

 For example (replace `my-eu-site-name`, `My EU Site Name`, `WordPress` and `My Organization Name` accordingly):

 ```bash
 terminus site:create my-eu-site-name "My EU Site Name" "WordPress" --org "My Organization Name" --region eu
 ```

  ![terminus site:create my-eu-site "My EU Site" "WordPress" --org "Rachel Pantheor" --region eu](/source/docs/assets/images/create-site-eu.png)

  See `terminus site:create --help` for more information on the options and values used in this command.

## Migrate an Existing Site to a New Region
To migrate an existing site from one region to another, create the new site as described above, then follow the [Manually Migrate Sites to Pantheon](/docs/migrate-manual/#import-your-code) doc. The [Relaunch Procedure](/docs/relaunch/#relaunch-procedure) section of the Relaunch doc is a good resource to help make the transition to your new live site smooth.

If you want help migrating your site between regions, our [Professional Services Migrations](https://pantheon.io/professional-services){.external} team is available.

## Review Site Region

Use the Dashboard to see the Pantheon Region in which the site is hosted:

1.  Navigate to the Site Dashboard
1.  Click **Settings**, then **About Site**
1.  **Region** will show either `United States` by default, or the name of the region in which the site is hosted.

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

Time to celebrate. Your site is running in your chosen region!

## Coming Soon

More features are in active development. [Contact us](https://pantheon.io/contact-us){.external} to learn more, and check this doc for updates. [Fill out this survey](https://www.getfeedback.com/r/hkR9uTAJ){.external} to tell us about your needs.

## Frequently Asked Questions
### Can I move an existing site to a new region?
Yes, however you must migrate your existing site to a new site that was configured for the new region during creation ([as described above](#create-a-new-site-in-a-new-region)).

Contact your account owner or our [Sales team](https://pantheon.io/contact-us){.external} to learn about Pantheon's migration services or review the [relaunch procedure](/docs/relaunch/) for steps on how to migrate the site yourself.
