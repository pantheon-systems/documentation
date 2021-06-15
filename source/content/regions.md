---
title: Pantheon Global Regions and Data Residency
description: Learn how to launch sites in Australia, Canada, or the European Union.
categories: [get-started]
tags: [launch, site]
contributors: [edwardangert, rachelwhitton, ari]
searchboost: 150
---

## Use Cases
There are many scenarios in which you might prefer running a site within an International Region rather than the default US. Common use cases include:

* Compliance standards that require data residency within the borders of Australia, Canada, or the European Union
* Improved performance and user experience for authenticated traffic originating near the desired region

## Available Global Regions

Four regions are available when creating a new site:

* United States (**US**) (Default)
* Australia (**AU**)
* Canada (**CA**)
* European Union (**EU**)

### Data Residency

A Pantheon site has all site resources located in the region in which it was created. This includes application and database containers, Redis cache servers, Apache Solr index servers, and a distributed filesystem and request router.

Automated and manual backups of all site components (code, database, and files) are stored in the site's region and created by job workers also running in the site's region. Additionally, any database or file clones between site environments are run by job workers in the site's region.

Localized, region-specific [Multizone Failover](/multizone-failover) is also available.

With this set of region-specific resources, you can run WordPress or Drupal sites on Pantheon and meet your region's legal, regulatory, or data sovereignty requirements.

## Create a New Site in a New Region

[Create a new Site](/sites) from the Dashboard and select the Region:

![Select a Region from the Create Your Pantheon Site screen](../images/dashboard/create-pantheon-site.png)

### Create a New Site in a Specific Region using Terminus

1. Install and authenticate [Terminus](/terminus). The commands used for International Regions require Terminus 2.0 or newer. If you're already running Terminus, be sure to update to the [latest version](/terminus/updates).
1. Use Terminus to create a new site associated with your organization and include the `--region=eu` option.

 - Available regions:
 
| Name                    |  Code   |
|:------------------------- |:------------------------------- |
|  Australia  | au               |
| Canada | ca |
| European Union | eu |
|  United States            | us |

 For example (replace `my-eu-site-name`, `My EU Site Name`, `WordPress` and `My Organization Name` accordingly):

 ```bash
 terminus site:create my-eu-site-name "My EU Site Name" "WordPress" --org "My Organization Name" --region eu
 ```

  ![terminus site:create my-eu-site "My EU Site" "WordPress" --org "Rachel Pantheor" --region eu](../images/create-site-eu.png)

  See `terminus site:create --help` for more information on the options and values used in this command.

## Migrate an Existing Site to a New Region

1.  Create a new site (as described above) 
1.  Copy over the site's code, database, and files.
    * For details see [How to Manually Migrate Sites to Pantheon](/migrate-manual/#import-your-code).
1.  Move domains and DNS to the new site.
    * For more info see the [Relaunch Procedure](/relaunch/#relaunch-procedure) doc.

### Professional Services Migration
If you'd like help migrating your site between regions, our [Professional Services Migrations](https://pantheon.io/professional-services) team is available.

## Review Site Region

Use the Dashboard to see the Pantheon Global Region in which the site is hosted:

1.  Navigate to the Site Dashboard
1.  Click **Settings**, then **About Site**
1.  **Region** will show either `United States` by default, or the name of the International Region in which the Site is hosted.

![Site Dashboard > Settings > About Site > Region: European Union](../images/settings-about-site-region-eu.png)

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

## Coming Soon

More features are in active development. [Contact us](https://pantheon.io/contact-us) to learn more, and check this doc for updates. [Fill out this survey](https://www.getfeedback.com/r/hkR9uTAJ) to tell us about your needs.

## Frequently Asked Questions

### Can I move an existing site to a new region?
Yes, however you must migrate your existing site to a new site that was configured for the new region during creation ([as described above](#create-a-new-site-in-a-new-region)).

Contact your account owner or our [Sales team](https://pantheon.io/contact-us) to learn about Pantheon's migration services or review the [relaunch procedure](/relaunch) for steps on how to migrate the site yourself.
