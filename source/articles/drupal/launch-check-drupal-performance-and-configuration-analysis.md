---
title: Launch Check - Drupal performance and configuration analysis
description: Get site analysis and recommendations.
category:
  - developing

---

Pantheon provides static site analysis as a service for Drupal 7 sites to make best practice recommendations on site configurations. These reports can be found in the site dashboard under the status tab and are accessible by site team members.

## Overview

Every site is unique, with its own individual configuration, content, audience, and so forth. On Pantheon they're all built with one of two CMS frameworks, Drupal or WordPress, and have the same architectural requirements. Therefore, it's possible to provide recommendations that fit the vast majority of use cases using a technique known as  **static program analysis - ** performance & behavior gathering to see how a site works.  
This mechanism does not actually perform requests on your site, and in doing so avoids the observer effect. It's non-intrusive, so no installation or configuration is required. Finally, it's completely automated for consistent reports and results.  
In short, you get a fast, repeatable report that can help detect common problems and provide introspection into your site.

## What Does Launch Check Evaluate?

- Drupal caching settings for optimal settings that will leverage both internal and reverse proxy caches
- Modules, including duplicate modules in the codebase, missing modules which damage performance, development modules in live environments and unrecommended modules with compatibility problems
- Views caching, for each view display, both result and query caching
- Watchdog logs, including overall count, 404 entries, PHP errors
- Drupal site status report
- Users, including reports on number of users, roles, etc.

## What Doesn't Launch Check Address?

- DOM and front-end performance - browsers and aggregating tools such as New Relic are in a much better position to analyze and report
- Usability and site experience - in part, subjective and highly individualized to the site, not really something that can be quantified
- Aesthetics - similarly, way out of scope
- Content - can count the quantity and size, but we leave the actual content to the stakeholders

## How Does it Work?

To generate the reports, Pantheon uses [Site Audit](https://drupal.org/project/site_audit), an open-source collection of drush commands. Site Audit is developed and maintained by Pantheon, but is not limited to the Pantheon platform. Any Pantheon specific support is wrapped in a vendor option.

## Frequently Asked Questions

#### Site Audit Has More Reports Than What's Shown in the Dashboard.

The dashboard integration is intended to provide developers with the most actionable items; some reports are purely informational and have been omitted. Additionally, some reports are more system intensive, so it makes more sense to allow them to be run on-demand, rather than automatically.

#### How Can I Manually Run Site Audit on My Site?

You can get a list of all available site audit reports using drush:

    drush @pantheon.SITENAME.ENV help --filter=site_audit

You can also execute a full report in HTML format.

    drush @pantheon.SITENAME.ENV aa --skip=insights --html --bootstrap --detail --vendor=pantheon > report.html

#### Are There Plans for Supporting Drupal 6 Sites?

At this time, there are no plans to support Drupal 6 with this tool.

#### Can I Opt-Out of a Specific Recommendation?

If you want to permanently opt-out of a check, you can use the [$conf array in settings.php](https://drupal.org/node/1525472). Individual check names can be specified with a combination of the report name and check name. For example, to permanently opt-out of the PageCompression check in the Cache report:

    $conf['site_audit']['opt_out']['CachePageCompression'] = TRUE;

### I want to Contribute and/or I found a mistake. How Should I Proceed?

Use the [Site Audit issue queue](https://drupal.org/project/issues/site_audit) to add and request features, or to report inaccuracies.

## Troubleshooting

#### Site Audit isn't Running on My Site.

If your site's Launch Check is showing recent update information about Database or Redis usage, but older information for the Site Audit checks, and clicking "run the checks now" doesn't update the status, there may be an application error interrupting its complete operation. In order to debug what might be causing an error, you can run the Drush command to execute Site Audit directly on your Pantheon Drush aliases:

    drush -vd @pantheon.SITENAME.ENV aa --skip=insights --detail --vendor=pantheon --strict=0

If Site Audit isn't running, there may be a fatal PHP error in your application; debugging these problems are crucial for your site's continuing operation and performance.
