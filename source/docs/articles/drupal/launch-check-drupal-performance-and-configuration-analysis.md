---
title: Launch Check - Drupal Performance and Configuration Analysis
description: Get site analysis and recommendations.
category:
  - developing
keywords: launch check, drupal, analysis, database, status, report
---
Pantheon provides static site analysis as a service for Drupal 7 sites to make best practice recommendations on site configurations. These reports can be found in the site dashboard under the status tab and are accessible by site team members.

Every site is unique, with its own individual configuration, content, audience, and so forth. On Pantheon, they're all built with one of two CMS frameworks, Drupal or WordPress, and have the same architectural requirements. Therefore, it's possible to provide recommendations that fit the vast majority of use cases using a technique known as  **static program analysis** by gathering performance & behavior patterns to see how a site works.  

This mechanism does not actually perform requests on your site, and in doing so avoids the observer effect. It's non-intrusive, so no installation or configuration is required. Finally, it's completely automated for consistent reports and results.  

In short, you get a fast, repeatable report that can help detect common problems and provide insights into your site.

## What Does Launch Check Evaluate?

- Drupal caching settings for optimal settings that will leverage both internal and reverse proxy caches
- Modules, including duplicate modules in the codebase, missing modules which damage performance, development modules in live environments and unrecommended modules with compatibility problems
- Views caching for each view display, both result and query caching
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

#### Why does site audit have more reports than what's shown in the dashboard?

The dashboard integration is intended to provide developers with the most actionable items; some reports are purely informational and have been omitted. Additionally, some reports are more system intensive, so it makes more sense to allow them to be run on-demand, rather than automatically.

#### How can I manually run site audit on my site?

You can get a list of all available site audit reports using [Terminus](https://github.com/pantheon-systems/cli):

    terminus drush --site=#site --env=#env --filter=site_audit
<div class="alert alert-info" role="alert">
<strong>Note</strong>: Replace <code>#site</code> with your site name, and <code>#env</code> with the environment (dev, test, or live). You can see a list of all your sites by running <code>terminus sites list</code></div>

You can also execute a full report in HTML format.

    terminus drush --site=#site --env=#env --skip=insights --html --bootstrap --detail --vendor=pantheon > report.html

#### Are there plans for supporting Drupal 6 sites?

At this time, there are no plans to support Drupal 6 with this tool.

#### Can I opt-out of a specific recommendation?

If you want to permanently opt-out of a check, you can use the [$conf array in settings.php](https://drupal.org/node/1525472). Individual check names can be specified with a combination of the report name and check name. For example, to permanently opt-out of the PageCompression check in the Cache report:

    $conf['site_audit']['opt_out']['CachePageCompression'] = TRUE;

#### I want to contribute/I found a mistake. How should I proceed?

Use the [Site Audit Issue Queue](https://drupal.org/project/issues/site_audit) to add and request features, or to report inaccuracies.

## Troubleshooting

#### Site Audit isn't running on my site.

If your site's Launch Check is showing recent update information about Database or Redis usage, but older information for the Site Audit checks, and clicking "run the checks now" doesn't update the status, there may be an application error interrupting its complete operation. In order to debug what might be causing an error, you can run the [Terminus](https://github.com/pantheon-systems/cli) command to execute Site Audit directly on your Pantheon site:

    terminus drush --site=#site --env=#env -vd @pantheon.SITENAME.ENV aa --skip=insights --detail --vendor=pantheon --strict=0

If Site Audit isn't running, there may be a fatal PHP error in your application; debugging these problems are crucial for your site's continuing operation and performance.

## See Also
If you have a WordPress site, see [Launch Check - WordPress Performance and Configuration Analysis](/docs/articles/wordpress/launch-check-wordpress-performance-and-configuration-analysis).
