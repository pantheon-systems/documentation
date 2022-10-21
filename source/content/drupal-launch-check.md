---
title: Launch Check - Drupal Performance and Configuration Analysis
description: Detailed information on Launch Check, Pantheon's automated checks for Drupal performance and configuration
cms: "Drupal"
categories: [go-live]
tags: [launch, site, webops]
reviewed: "2020-05-27"
---
 Pantheon provides static site analysis as a service for Drupal sites to make best practice recommendations on site configurations. These reports are found in the Site Dashboard under the **Status** tab and are accessible by site team members.

 ![status tab on live environment](../images/dashboard/status-tab.png)

 Every site is unique, with its own individual configuration, content, audience, and so forth. On Pantheon, they're all built with one of two CMS frameworks, Drupal or WordPress, and have the same architectural requirements. Therefore, it's possible to provide recommendations that fit the vast majority of use cases using a technique known as **static program analysis** by gathering performance and behavior patterns to see how a site works.

 This mechanism does not actually perform requests on your site, and in doing so avoids the observer effect. It's non-intrusive, so no installation or configuration is required. Finally, it's completely automated for consistent reports and results.

 In short, you get a fast, repeatable report that can help detect common problems and provide insights into your site.

 ## What Does Launch Check Evaluate?

 ### Cache Settings

 Launch Check evaluates Drupal caching settings for optimal settings that will leverage both internal and reverse proxy caches.

 ### Modules

 Launch Check looks at modules, including duplicate modules in the codebase, missing modules which damage performance, development modules in live environments, and unrecommended modules with compatibility problems.

 ### View Display Caching

 Launch Check looks at caching for each view display, both result and query caching.

 ### Watchdog Logs

 Watchdog logs are evaluated, including overall count, 404 entries, and PHP errors.

 ### Status Report

 Launch Check evaluates the Drupal site status report.

 ### Users

 Launch Check looks at at users, including reports on number of users, roles, etc.

 ### Database

 Launch Check displays database stats such as the number of rows in the options table, options being auto-loaded, tables using InnoDB storage engine (suggests a query to run if not), transients, and expired transients. 

 Follow the resolution steps below if you have a high number of options being autoloaded, and receive the following message in the database stats: `consider autoloading only necessary options`.

 1. Navigate to the module root folder.

 1. Open `example.info.yml` > `example.services.yml` > `src/` > `EventSubscriber` > `ConfigExample.php`.

 1. Locate the `getSubscribedEvents()` function.

 This is the only member function required by the `EventSubscriberInterface`.

 1. Enter the code below to run `onSave()` whenever a configuration is saved.

    ```php
    <?php
    public static function getSubscribedEvents() {
    $events[ConfigEvents::SAVE][] = ['onSave'];
    return $events;
    }
    ?>
    ```

 Using the `onSave()` callback invalidates the cache when the appropriate configuration keys change. For example, if `system.theme` or `system.theme.global` change, the code will call the appropriate function to invalidate the cache:

    ```php 
    <?php
    public function onSave(ConfigCrudEvent $event) {
    if (in_array($event->getConfig()->getName(), ['system.theme', 'system.theme.global'], TRUE)) 
    }
    ?>
    ```


 For more resources on troubleshooting autoloaded data in Drupal, see [Hard Things Are Possible: Configuration Management in Drupal](https://pantheon.io/blog/hard-things-are-possible-configuration-management-drupal-8)

 ## What Doesn't Launch Check Address?

 - DOM and frontend performance - browsers and aggregating tools such as [New Relic&reg; Performance Monitoring](/guides/new-relic) are in a much better position to analyze and report
 - Usability and site experience - in part, subjective and highly individualized to the site, not really something that can be quantified
 - Aesthetics - similarly, way out of scope
 - Content - can count the quantity and size, but we leave the actual content to the stakeholders

## How Does it Work?

To generate the reports, Pantheon uses [Site Audit](https://drupal.org/project/site_audit), an open-source collection of Drush commands. Site Audit is developed and maintained by Pantheon, but is not limited to the Pantheon platform. Any Pantheon specific support is wrapped in a vendor option.

## Run Site Audit Manually

You can execute a full report encoded in JSON format to your terminal using [Terminus](/terminus):

 ```json
 {promptUser: user}
 terminus remote:drush <site>.<env> -- aa --skip=insights --detail --vendor=pantheon
 ```

## Frequently Asked Questions

### Why does site audit have more reports than what's shown in the Dashboard?

The Dashboard integration is intended to provide developers with the most actionable items; some reports are purely informational and have been omitted. Additionally, some reports are more system intensive, so it makes more sense to allow them to be run on-demand, rather than automatically.


### Can I opt out of a specific recommendation?

If you want to permanently opt out of a check, you can set configuration options in `settings.php`. Individual check names can be specified with a combination of the report name and check name. Note that the configuration array is `$conf` in Drupal 7.

#### Examples

Drupal 7 — permanently opt out of the PageCompression check in the Cache report:

 ```php:title=settings.php
 $conf['site_audit']['opt_out']['CachePageCompression'] = TRUE;
 ```

 The specific key you'll use in the `$conf` or `$config` array is a combination of the report and the check. You can find a list of checks for the report here: [Site Audit Checks D7](http://cgit.drupalcode.org/site_audit/tree/Check?h=7.x-1.x) | [Site Audit Checks D8](http://cgit.drupalcode.org/site_audit/tree/Check?h=8.x-2.x).

 Keep in mind that the site audit is executed via Drush so it's best to use the [`$_ENV` superglobal](/guides/environment-configuration/read-environment-config) for doing things like limiting the exclusions to one environment.

 ### I want to contribute/I found a mistake. How should I proceed?

 Use the [Site Audit Issue Queue](https://drupal.org/project/issues/site_audit) to add and request features, or to report inaccuracies.

 ## Troubleshooting

 ### Site Audit Isn't Running on My Site

 If your site's Launch Check is showing recent update information about Database or Redis usage, but older information for the Site Audit checks, and clicking "run the checks now" doesn't update the status, there may be an application error interrupting its complete operation. In order to debug what might be causing an error, you can run the [Terminus](/terminus) command to execute Site Audit directly on your Pantheon site:

 ```bash{promptUser: user}
 terminus drush <site>.<env> -- aa --skip=insights --detail --vendor=pantheon --strict=0
 ```

 If Site Audit isn't running, there may be a fatal PHP error in your application; debugging these problems are crucial for your site's continuing operation and performance.

 ## See Also

 If you have a WordPress site, see [Launch Check - WordPress Performance and Configuration Analysis](/guides/wordpress-pantheon/wordpress-launch-check).
