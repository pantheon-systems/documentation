---
title: Cron for WordPress
description: Configuring and optimizing the WP-Cron feature on your Pantheon WordPress site.
tags: [services]
categories: [wordpress]
---
## WP-Cron Overview
WP-Cron executes specific tasks for WordPress powered sites. The name Cron comes from the Unix system for scheduling jobs, ranging from once a minute to once a year. Whether it's routine maintenance or scheduled alerts, any command that can be executed on Unix without user intervention can be scheduled as a Cron task.

WP-Cron is similar in nature to Cron, but differs in a couple of very important ways. This feature is designed solely to handle WordPress routine tasks:

 - Check for new version of the WordPress core, themes, and plugins
 - Clean up spam

Plugins and themes can add tasks to be executed at regular intervals. For example, if you have a plugin that scans Twitter for your tweets and then incorporates them into comments, it's most likely done with a WP-Cron job.  WP-Cron opens up a whole new world of things that a WordPress powered site can do.

The major difference between Cron and WP-Cron is how WP-Cron is triggered. Cron is a system process that runs every minute and looks for tasks to execute. WP-Cron, because it is a web-based system, can only run when someone visits the site. Therefore, when someone navigates to your WordPress site, WP-Cron checks to see if anything needs to be done. Thanks to the WordPress core developers, it does this in a way that does not adversely affect the performance of your site.

### Problems With Low Traffic Sites
Low traffic WordPress sites may experience skipped tasks when this feature is triggered by visitors. If people aren't visiting your site, WP-Cron can't execute. This doesn't mean your page will be slow from previous jobs when someone eventually does visit your site. Regardless of how many tasks WP-Cron has to execute, they are run in the background so your site's performance is not adversely affected.

### Problems With High Traffic Sites
If your WordPress powered site is high traffic, you may run into problems with WP-Cron. The main issues that come up are **race conditions** and **long running processes**.

- **Race condition**: When more than one user visits your site and triggers WP-Cron to execute the same task. WP-Cron works hard to eliminate race conditions, but they can still happen, especially on high traffic sites.
- **Long running process**: Any task that takes longer than the standard 60 seconds to run. Developers can adjust how long a PHP task is allowed to run with the `set_time_limit()` function. If this is set to be longer than the window between tasks, then you can end up with more than one copy of `wp-cron.php` executing.

Both of these issues are addressed within WP-Cron's internal [ locking](https://core.trac.wordpress.org/browser/tags/4.1.1/src/wp-includes/cron.php#L231) and are not common problems; however, they can still occasionally happen.

## Manage WP-Cron Internally
WP-Cron comes preconfigured and ready to run, so you don't need to do anything to enable it on your WordPress sites.

During the initial installation of WordPress, several tasks are automatically configured. You can use a few simple commands from the command line, or one of several plugins, to find the exact jobs being run by WP-Cron.

### WP-Cron From the CLI
If you have [Terminus](/docs/terminus/) installed, you can easily see all the details of what is going on with WP-Cron. Terminus, through WP-CLI, can show you details like:

 - What's scheduled to run
 - What will run next
 - The event hooks that are set up

You can also schedule your own jobs, execute existing jobs, and manage just about everything WP-Cron related&mdash;all from the command line.

One of the first things you'll want to do is test WP-Cron to make sure everything is working correctly. When you execute the command below, make sure to replace SITE_NAME with your site's name from your Pantheon Dashboard and replace ENV_NAME with the desired environment ("dev", "test", "live", or multidev branch name).

````nohighlight
$ terminus wp <site>.<env> -- cron test
````

If everything works correctly, the result looks like this:

````bash
Success: WP-Cron spawning is working as expected.
````

This lets you know that WP-Cron is working properly on your site. From here, you can run any cron-related command with [WP-CLI](http://wp-cli.org/commands/cron/ "wp-cli web site"). When using WP-CLI to manage your Pantheon hosted WordPress site, you should be using [Terminus](/docs/terminus/). The command format is as follows:

````nohighlight
$ terminus wp <site>.<env> -- cron <your wp-cron command and switches here>
````

All `terminus wp` commands require a site name and environment to operate.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>If you have protected your site using the Security setting on your Dashboard, Terminus will be unable to execute cron and you may see status report errors on the Dashboard.</p></div>


### Plugins

If you want to keep an eye on WP-Cron but don't like the command line, there are several plugins you can use. [WP Crontrol](https://wordpress.org/plugins/wp-crontrol/screenshots/ "WP Crontrol page on wordpress.org"), for example, will show you all of the events scheduled for your site. You can create, edit, run, or delete jobs immediately from within your WordPress admin dashboard. You can also hook new actions into schedules or move existing actions to new schedules from within the Tools section.

[WPX Cron Manager Lite](https://wordpress.org/plugins/wpx-cron-manager-light/ "WPX Cron Manager Lite") will do a similar job with a slightly different UI. This plugin requires you to do a one-time installation the WPX framework, which you can do straight from the plugin manager page.


## Manage WP-Cron Externally
If you're looking for more control over your site's cron jobs, or you don't want WP-Cron to handle tasks internally, you can use external crons instead. This will solve the problems discussed above for high traffic and low traffic sites.

### Disable WP-Cron
The first thing you'll need to do is disable WP-Cron's internal processing. Add the following line to your `wp-config.php` file:

````php
define('DISABLE_WP_CRON', true);
````

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>There are many important tasks that WP-Cron takes care of, so be prepared to complete all the steps below.</p></div>

### Free Services
Once you have disabled WP-Cron, you will need a service that calls a URL at regular intervals. The easiest way to do this is to set up an account with a free cron service:

 - [EasyCron](https://www.easycron.com/)
 - [Set Cron Job](https://www.setcronjob.com/)
 - [My Cron](http://www.mywebcron.com/)
 - [cron-job](https://cron-job.org/en/)

Any of the above services will get the job done. By disabling WP-Cron, you have turned off the automatic checking and calling of the `wp-cron.php` script. You will now have to call that URL yourself using one of the services above. With most of them, it is as easy as this:

1. Set up an account
2. Set up a job that calls `http://yourdomain.tld/wp-cron.php?doing_wp_cron=1`

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Replace <code>yourdomain.tld</code> with your domain.</p></div>

Depending on what service you use, you may have the ability to set up multiple jobs at different times. Creating a single job that calls your site's `wp-cron.php` script every 15 minutes is all you should need. WP-Cron will take care of the rest. If you create new schedules that need to be run more often than once every 15 minutes, you will need to adjust your job accordingly.

### Using Your Own Server
If you administer your own server, you can use the cron service to make a call to the `wp-cron.php` script. You will have to learn how to properly set up a Cron job and use something like `wget` or `curl` to fetch a web page. Unless you take special precautions, it is not any safer to use your own server vs. a web-based cron service; however, it does give you more control.

### Security
For the most part, `wp-cron.php` is secure. There are only two parameters you can pass in that will affect the script (`doing_wp_cron=1` and `doing_ajax=1`). These two `$_GET` values are not filtered; they are only used as flags and not as input for a process or variable. Beyond that, all input is ignored.

While no script on a server attached to the Internet is 100% secure, `wp-cron.php` currently does not have any known vulnerabilities or exploits.

### WordPress Cron Plugins
WordPress has many plugins that control both internal WP-Cron tasks and external Cron jobs. Since Pantheon does not provide Cron services, we do not recommend or discourage the use of any given plugin. We encourage you to check out the list of [WordPress Cron Plugins](https://wordpress.org/plugins/search.php?q=cron "List of WordPress plugins that help manage cron jobs") and experiment in your Dev environment to find the one that best suits your needs.
