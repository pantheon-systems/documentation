---
title: Cron for WordPress
description: Learn how to create and run jobs using Pantheon Cron or WordPress's WP-Cron feature on your Pantheon site.
cms: "WordPress"
categories: [automate]
tags: [cron]
contributors: [greg-1-anderson, CdrMarks, whitneymeredith, jspellman814]
---

## Cron Overview

Cron is a standard utility in Unix and Linux systems that it is used to schedule commands for automatic execution at configured intervals. These scheduled commands or tasks are known as cron jobs. Cron scheduling allows for the execution of tasks at specified intervals ranging from once a minute to once a year. Cron is generally used for running scheduled backups, monitoring disk space, deleting files that are no longer required, running system maintenance tasks, and much more. 

## Pantheon Cron Overview

Pantheon Cron runs WordPress cron jobs as an hourly task or on demand through Terminus. This is in contrast to WP-Cron which executes jobs when a site is loaded by a visitor. 

## WP-Cron Overview

WP-Cron is a WordPress feature that executes jobs when the page is loaded. Jobs are executed before site content is served to the site visitor. Plugins and themes can add jobs to be executed at regular intervals. For example, if you have a plugin that scans Twitter for your tweets and then incorporates them into comments, it's most likely done with a WP-Cron job.

The WP-Cron feature is designed solely to handle WordPress routine jobs as part of a page load, allowing you to do the following:

 - Check for new version of the WordPress core, themes, and plugins
 - Clean up spam

## Understanding the Differences Between Pantheon Cron and WP-Cron

There are some major differences between Pantheon Cron and WP-Cron.

### When Jobs are Executed

Pantheon Cron runs WP-Cron as an hourly task or on demand through Terminus. In contrast, WP-Cron script values are checked and executed (if overdue) only when someone visits the site.

<Alert title="Note" type="info">

Pantheon Cron will not execute jobs on inactive environments, including [sleeping development](/application-containers#idle-containers) environments.

</Alert>

### Security

WP-Cron is a PHP file that is usually located in the root directory of your WordPress installation. The `wp-cron.php` file is subject to DDoS attacks, but generally, `wp-cron.php` is secure. 

There is only one parameter you can pass that will affect the script, `doing_wp_cron`. The `$_GET` value is not filtered, and is only used as a flag (not as an input for a process or variable). All inputs are ignored outside this. Currently, `wp-cron.php` does not have any known vulnerabilities or exploits, although it shoule be noted that no script on a server attached to the Internet is 100% secure.

## Manage WP-Cron Internally

WP-Cron comes preconfigured and ready to run, so you don't need to do anything to enable it on your WordPress sites.

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

We recommend that you use the following command to test WP-Cron and ensure everything is working correctly:

```bash{promptUser: user}
terminus wp <SITE_NAME>.<ENV-NAME> -- cron test
```
* Replace `<SITE_NAME>` with your site's name
* Replace `<ENV_NAME>` with the desired environment ("dev", "test", "live", or the Multidev branch name) 

The result should look like this:

```bash
Success: WP-Cron spawning is working as expected.
```

This lets you know that WP-Cron is working correctly on your site. You can run any cron-related command with [WP-CLI](https://developer.wordpress.org/cli/commands/cron/ "wp-cli web site"). Use [Terminus](/terminus) when using WP-CLI to manage your Pantheon hosted WordPress site. The command format is as follows:

```bash{promptUser: user}
terminus wp <SITE_NAME>.<ENV_NAME> -- cron <your wp-cron command and switches here>
```

All `terminus wp` commands require a site name and environment to operate.

<Alert title="Note" type="info">

Terminus cannot execute Cron Jobs if you enable the Security setting on your Dashboard. You may see status report errors on the Dashboard as a result.

</Alert>

### Plugins

There are several plugins you can use if you want to keep an eye on WP-Cron but don't like the command line. [WP Crontrol](https://wordpress.org/plugins/wp-crontrol/screenshots/ "WP Crontrol page on wordpress.org"), for example, will show you all of the events scheduled for your site. You can create, edit, run, or delete jobs immediately from within your WordPress admin dashboard. You can also hook new actions into schedules or move existing actions to new schedules from within the Tools section.

[WPX Cron Manager Lite](https://wordpress.org/plugins/wpx-cron-manager-light/ "WPX Cron Manager Lite") works similarly with a slightly different UI. This plugin requires you to do a one-time installation of the WPX framework, which you can do straight from the plugin manager page.

## Manage WP-Cron Externally

You can use external Crons if you want more control over your site's Cron jobs, or if you don't want WP-Cron or Pantheon Cron to handle jobs internally. This will solve the problems with high traffic and low traffic sites discussed in the Troubleshooting section.

### Disable WP-Cron

Pantheon's WordPress upstreams disable WP-Cron by default. You must add the code below to your `wp-config.php` file to enable WP-Cron's internal processing if you want to continue using WP-Cron. This line must be above the `require_once` expression that pulls in `wp-config-pantheon.php`.

```php:title=wp-config.php
define('DISABLE_WP_CRON', false);
```

### Free Services

You will need a service that calls a URL at regular intervals after disabling WP-Cron, if you want more granular control over when Cron runs. The easiest way to do this is to set up an account with a free cron service:

- [EasyCron](https://www.easycron.com/)
- [Set Cron Job](https://www.setcronjob.com/)
- [cron-job](https://cron-job.org/en/)

Any of the above services will get the job done. Disabling WP-Cron turns off the automatic checking and calling of the `wp-cron.php` script. You will now have to call that URL yourself using one of the services above. Most services only require the following setup:

1. Set up an account.

1. Set up a job that calls `https://exampledomain.tld/wp-cron.php?doing_wp_cron`.

You might have the ability to set up multiple jobs at different times depending on the service you use. Creating a single job that calls your site's `wp-cron.php` script every 15 minutes is all you should need. WP-Cron will take care of the rest. You will need to adjust your job if you create new schedules that need to run more frequently than every 15 minutes.

<Alert title="Note" type="info">

Do not add a value to the `doing_wp_cron` query variable. This variable must be empty for Cron to work correctly.

</Alert>

### Using Your Own Server

 You can use the Cron service to make a call to the `wp-cron.php` script if you administer your own server. You will have to learn how to correctly set up a Cron job and use something like `wget` or `curl` to fetch a web page. Using your own server is not safer than using a web-based Cron service.
 
## Troubleshooting 

### Problems With Low Traffic Sites

WP-Cron will skip jobs in WordPress sites with low traffic. This doesn't mean your page will be slow from previous jobs when someone eventually visits your site. Regardless of how many jobs WP-Cron has to execute, all jobs are run in the background so your site's performance is not adversely affected.

Low traffic WordPress sites on Pantheon are put to sleep after either one or twelve hours pass without site visitors (see [idle containers](/application-containers#idle-containers) for more information). Pantheon Cron jobs do not run in sleeping environments. 

### Problems With High Traffic Sites

 You might run into problems with WP-Cron if your WordPress-powered site is high traffic. The main issues that come up are **race conditions** and **long running processes**.

- **Race condition**: When more than one user visits your site and triggers WP-Cron to execute the same job. WP-Cron works hard to eliminate race conditions, but they can still happen, especially on high traffic sites.
- **Long running process**: Any task that takes longer than the standard 60 seconds to run. Developers can adjust how long a PHP task is allowed to run with the `set_time_limit()` function. If this is set to be longer than the window between jobs, then you can end up with more than one copy of `wp-cron.php` executing.

Both of these issues are addressed within WP-Cron's internal [locking](https://core.trac.wordpress.org/browser/tags/4.1.1/src/wp-includes/cron.php#L231) doc. 

You can also review the [Disable WP-Cron](#disable-wp-cron) section of this doc to limit the occurrences of the above issues.
