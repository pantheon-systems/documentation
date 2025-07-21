---
title: WordPress Developer's Guide
subtitle: Cron for WordPress
description: Learn how to create and run jobs using Pantheon Cron or WordPress's WP-Cron feature on your Pantheon site.
contenttype: [guide]
innav: [false]
categories: [automate]
cms: [wordpress]
audience: [development]
product: [--]
integration: [cron]
tags: [cron]
contributors: [greg-1-anderson, CdrMarks, whitneymeredith, jspellman814, jazzsequence]
reviewed: "2025-07-21"
showtoc: true
permalink: docs/guides/wordpress-developer/wordpress-cron
---

This section provides information on how to create and run Cron jobs.

Cron is a standard feature in Unix and Linux systems to schedule commands for automatic execution at configured intervals. These scheduled commands or tasks are known as cron jobs. Cron scheduling allows tasks to be executed at specified intervals ranging from once a minute to once a year.

Cron is generally used to:

- Run scheduled backups
- Monitor disk space
- Delete files that are no longer required
- Run system maintenance tasks

## Pantheon Cron Overview

Pantheon Cron runs WordPress cron jobs as an hourly task or on demand through Terminus. This is in contrast to WP-Cron which executes jobs when a site is loaded by a visitor. Running cron on the platform provides a more reliable schedule and ensures visitors are not interrupted by a script triggered by WordPress cron.

Pantheon uses the following WP-CLI command to trigger cron on the platform:

```bash{promptUser: user}
wp cron event run --due-now
```

## WP-Cron Overview

WP-Cron is a WordPress feature that executes jobs when the page is loaded. Jobs are executed before site content is served to the site visitor. Plugins and themes can add jobs to be executed at regular intervals. For example, if you have a plugin that scans Twitter for your tweets and then incorporates them into comments, it's most likely done with a WP-Cron job.

The WP-Cron feature is designed solely to handle WordPress routine jobs as part of a page load, allowing you to:

 - Check for new versions of the WordPress core
 - Check for themes and plugins updates
 - Clean up spam

## Understand the Differences Between Pantheon Cron and WP-Cron

There are some major differences between Pantheon Cron and WP-Cron.

### When Jobs are Executed

Pantheon Cron runs WP-Cron as an hourly task or on demand through Terminus. In contrast, WP-Cron script values are checked and executed (if overdue) only when someone visits the site.

<Alert title="Note" type="info">

Pantheon Cron will not execute jobs on inactive environments, including [sleeping development](/application-containers#idle-containers) environments.

</Alert>

### WordPress Multisite

Pantheon Cron does not support WordPress Multisite installations due to the unpredictable customizations to domains or subdirectories and their mapping to subsites. Use WP-Cron if you have WordPress Multisite installations.

### Security

WP-Cron is a PHP file that is usually located in the root directory of your WordPress installation. The `wp-cron.php` file is subject to DDoS attacks, but generally, `wp-cron.php` is secure.

There is only one parameter you can pass that will affect the script, `doing_wp_cron`. The `$_GET` value is not filtered, and is only used as a flag (not as an input for a process or variable). All inputs are ignored outside this. Currently, `wp-cron.php` does not have any known vulnerabilities or exploits, although it should be noted that no script on a server attached to the Internet is 100% secure.

## Manage WP-Cron Internally

WP-Cron comes pre-configured and ready to run, so you don't need to do anything to enable it on your WordPress sites.

Several jobs are automatically configured during the installation of WordPress. Use a few simple commands from the command line, or one of several plugins, to find the exact jobs that WP-Cron runs.

### WP-Cron From the CLI

Use [Terminus](/terminus) to see job details in WP-Cron. Terminus, through WP-CLI, provides details, such as:

- What is scheduled to run
- What will run next
- What event hooks are configured

You can also use Terminus and WP-CLI to:

- Schedule your own jobs
- Execute existing jobs
- Manage WP-Cron related features

Use the command below to test WP-Cron and ensure everything is working correctly. Replace `<SITE_NAME>` with your site's name and replace `<ENV_NAME>` with the desired environment ("dev", "test", "live", or the Multidev branch name.

```bash{promptUser: user}
terminus wp <SITE_NAME>.<ENV-NAME> -- cron test
```

You will receive the status of WP-Cron's functionality. You will receive a response similar to the one below if this is a WordPress site on the Pantheon upstream now running on Pantheon Cron:

```bash
Error: The DISABLE_WP_CRON constant is set to true. WP-Cron spawning is disabled.
```

This is not an error, but indicates that WordPress's internal cron scheduler has been deactivated and that the site will now rely on Pantheon Cron.

The result will look similar to the example below if this is a WordPress Multisite or has WordPress cron overridden:

```bash{promptUser: user}
Success: WP-Cron spawning is working as expected.
```

You can run any cron-related command with [WP-CLI](https://developer.wordpress.org/cli/commands/cron/ "wp-cli web site"). Use [Terminus](/terminus) when using WP-CLI to manage your Pantheon hosted WordPress site. The command format is:

```bash{promptUser: user}
terminus wp <SITE_NAME>.<ENV_NAME> -- cron <your wp-cron command and switches here>
```

All `terminus wp` commands require a site name and environment to operate. WordPress Multisites require an additional `--url=<url>` parameter to specify which subsite to run the command on.

<Alert title="Note" type="info">

Terminus cannot execute cron jobs if you enable the Security setting on your Dashboard. You may receive status report errors on the Dashboard as a result.

</Alert>

### Enable WP-Cron

Pantheon's WordPress upstream disables WP-Cron by default in favor of Pantheon Cron. However, you can enable WP-Cron if you prefer to use it instead of Pantheon Cron.

1. Locate the `require_once` expression that pulls in `wp-config-pantheon.php` in your `wp-config.php` file.

1. Add the following code *above* the `require_once` expression to enable WP-Cron's internal processing:

    ```php:title=wp-config.php
    define('DISABLE_WP_CRON', false);
    ```

### Plugins

There are several plugins you can use if you want to keep an eye on WP-Cron but don't like the command line. [WP Crontrol](https://wordpress.org/plugins/wp-crontrol/screenshots/ "WP Crontrol page on wordpress.org"), for example, shows all events scheduled for your site. You can create, edit, run, or delete jobs immediately from within your WordPress admin dashboard. You can also hook new actions into schedules or move existing actions to new schedules from within the Tools section.

## Manage WP-Cron Externally

You can use external crons if you want more control over your site's cron jobs, or if you don't want WP-Cron or Pantheon Cron to handle jobs internally. This will solve the problems with high traffic and low traffic sites discussed in the [Troubleshooting](#troubleshooting) section.

### Disable WP-Cron

Pantheon's WordPress upstream disables WP-Cron by default.

Add the following code to your `wp-config.php` file to ensure WP-Cron is disabled if you are on a Custom Upstream that does not have this setting, or the site is a WordPress Multisite. This line must be above the `require_once` expression that pulls in `wp-config-pantheon.php`:

```php:title=wp-config.php
define('DISABLE_WP_CRON', true);
```

### Free Services

You must have a service that calls a URL at regular intervals after disabling WP-Cron, if you want more granular control over when Cron runs. The easiest way to do this is to set up an account with a free cron service:

- [EasyCron](https://www.easycron.com/)
- [Set Cron Job](https://www.setcronjob.com/)
- [cron-job](https://cron-job.org/en/)

Any of the above services will work. You can disable WP-Cron, but this also turns off automatic checks and calls to the `wp-cron.php` script. You must call that URL yourself using one of the services above. Most services only require the following setup:

1. Set up an account.

1. Set up a job that calls `https://exampledomain.tld/wp-cron.php?doing_wp_cron`.

You might have the ability to set up multiple jobs at different times depending on the service you use. Creating a single job that calls your site's `wp-cron.php` script every 15 minutes is all you should need. You must adjust your job if you create new schedules that need to run more frequently than every 15 minutes.

<Alert title="Note" type="info">

Do not add a value to the `doing_wp_cron` query variable. This variable must be empty for Cron to work correctly.

</Alert>

### Using Your Own Server

You can use the Cron service to make a call to the `wp-cron.php` script if you administer your own server. You must learn how to correctly set up a Cron job and use `wget`, `curl`, or a similar command to fetch a web page. Using your own server is not safer than using a web-based Cron service.

## Troubleshooting

### Problems With Low Traffic Sites

WP-Cron will skip jobs in WordPress sites with low traffic on WordPress Multisite installations that do not have Pantheon Cron. This doesn't mean your page will be slow from previous jobs when someone eventually visits your site. Regardless of how many jobs WP-Cron has to execute, all jobs are run in the background so that your site's performance is not adversely affected.

Low traffic WordPress sites on Pantheon are put to sleep after either one or twelve hours pass without site visitors (refer to [idle containers](/application-containers#idle-containers) for more information). Pantheon Cron jobs do not run in sleeping environments.

### Problems With High Traffic Sites

You might run into problems with WP-Cron if your WordPress-powered site is high traffic. The main issues that come up are **race conditions** and **long running processes**.

- **Race condition**: When more than one user visits your site and triggers WP-Cron to execute the same job. WP-Cron works hard to eliminate race conditions, but they can still happen, especially on high traffic sites.
- **Long running process**: Any task that takes longer than the standard 60 seconds to run. Developers can adjust how long a PHP task is allowed to run with the `set_time_limit()` function. You can end up with more than one copy of `wp-cron.php` executing if this is set to be longer than the window between jobs.

Both of these issues are addressed within WP-Cron's internal [locking](https://core.trac.wordpress.org/browser/tags/4.1.1/src/wp-includes/cron.php#L231) doc.

Pantheon Cron limits the occurrences of the issues listed above.

### What is the maximum execution time of cron?

The maximum execution time of cron is 180 seconds (3 minutes).

## More Resources

- [Run Cron Over Web Traffic](/debug-slow-performance#running-cron-over-web-traffic)
- [Debugging Slow Performance](/debug-slow-performance)
- [Cron for Drupal](/drupal-cron)