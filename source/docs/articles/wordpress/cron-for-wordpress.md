---
title: Cron for WordPress
description: Understand how the WordPress cron system works and how you can control it on your Pantheon hosted website
category:
    - WordPress
---

## What is WP-Cron
WP-Cron is one of the lesser known features of WordPress is WP-Cron. WP-Cron is used to schedule and execute tasks at a specific time. The name comes from the Unix system for doing this, `cron`. On a Unix based system, `cron` is executed on a regular basis and it looks for tasks that have been scheduled to run - from once a minute to once a year - and executes them. These tasks can be anything from routine maintenance to alerts. Any command that can be executed on Unix without user intervention can be scheduled as a cron task. 

WP-Cron is similar in nature but differs in a couple of very important ways. WP-Cron is designed solely to handle the routine tasks that WordPress needs done. 
 
 - Check for new version of the WordPress core
 - Check for new version of themes
 - Check for new version of plugins
 - Cleanup spam

Additionally, plugins and themes can add tasks to be executed at regular intervals. If you have a plugin that scans Twitter for your tweet and incorporates them into comments, it most likely runs a WP-Cron job to do that.  WP-Cron opens up a whole new world of things that WordPress powered website can do.

The major difference between `cron` and WP-Cron is how WP-Cron is triggered. `cron` is a system process that wakes up every minute and looks for things to do. WP-Cron, because it is a web based system. It can only execute when someone visits the site. Therefore, one of the things that WordPress does every time someone visits your WordPress powered site, it checks to see if there is anything that WP-Cron needs to do. Thanks to the WordPress core developers, it does this in a way that does not adversely affect the performance of your site. 

### Problems with low-traffic sites
There are however, drawbacks to this system. First, if your WordPress powered website is low-traffic, events could get skipped. If people aren't visiting your site, WP-Cron can't execute. This does not mean that when someone finally does, your page will be slow because it is executing a lot of WP-Cron jobs. Regardless of how many tasks WP-Cron has to execute, it does this in the background so that it does not affect your website's performance.

### Problems with high-traffic sites
On the other end of the spectrum are the problems with high-traffic sites. If your WordPress powered site is a high-traffic site, you may run into problems with WP-Cron as well. The main issues that come up regularly as "race conditions" and "long running processes". 

1. A race condition is simply where more than one visitor visits your site and triggers WP-Cron to do execute the same task. WP-Cron works hard to eliminate race conditions, but they can still happen, especially on  high traffic sites.
1. A long running process is any task - WP-Cron or other that tasks longer than the standard 60 seconds to run. Developers can adjust how long a PHP task can run with the `set_time_limit()` function. If this is set to longer than the window between runs, then you can end up with more than one copy of wp-cron.php executing.  

Both of these issues are addressed with WP-Cron's internal 'cron locking' and are not common problems, however, they can still occasionally happen.

## Using WP-Cron
You do not need to do anything to enable WP-Cron on your WordPress powered website. It comes pre-configured and ready to run. WordPress configures several events automatically upon install. Most WordPress site owners never realize that it even exists. If you are interested however, you can see what is going on with a couple of simple commands from the command line, or one of several plugins.


### WP-Cron from the CLI
If you have [Terminus]() installed, you can easily see all the details of what is going on with WP-Cron. Terminus, though wp-cli, can show you details like:

 - What is scheduled to run
 - What will run next
 - What even hooks are set up on your WordPress powered site

Additionally, you can schedule your own jobs, execute existing jobs, and manage just about everything to do with WP-Cron, all from the command line.

One of the first thing you will want to do is to test WP-Cron to make sure that everything is working correctly. From your command line, execute the following command

````
$ terminus wp cron test --site=SITE_NAME --env=<dev|test|live>
````

Replace SITE_NAME with your site's name from your Pantheon Dashboard and select the proper environment to work in (dev, test, or live). If everything works correctly, the results will look like this.

````
Success: WP-Cron spawning is working as expected.
````

This lets you know that WP-Cron is working properly on your site. From here you have several differnt options, you can check out all your options at the [wp-li](http://wp-cli.org/commands/cron/ "wp-cli web site") website. Remember that when using wp-cli to manage your Pantheon hosted WordPress site, you need to use Terminus. The command format is as follows:

````
$ terminus wp cron <your wp cron command and switches here> \
           --site=YOUR_SITE_NAME \
           --env=dev|test|live
````

All `terminus wp` commands **require** a site name and environment to operate.


### Plugins

If you want to keep an eye on your WP-Cron but don't like the command line, there are several plugins you can use.
[WP Control](https://wordpress.org/plugins/wp-crontrol/screenshots/ "Wp-Crontroll website") will show you all of the events scheduled for your website. You have the option to edit them run them immediately from your WordPress admin site, or delete them. Additionally, you can create new schedules. (e.g. hourly, daily, twice daily, etc.) Then form the tools section, you can hook new actions in these schedules or move existing actions to your new schedules.

Additionally, [WPX Cron Manager Lite](https://wordpress.org/plugins/wpx-cron-manager-light/ "WPX Cron Manager Lite") will do a similar job, with a slightly different UI. Beware though, WPX requires you to do a one-time install of their framework. You can do it all straight from the plugin manager page, but WPX won't work until you do.


## Using an external cron
If you need finer grain control over your cron, or you do not want WP-Cron to handle your cron jobs internally, you do have options. Above we discussed problems for both high-traffic and low-traffic sites. This option will solve those problems, if you are willing to take the time to set it up.

### Disabling WP-Cron
The first thing you need to do is to disable WP-Cron's internal processing. in your `wp-config.php` file, add this line to disable WP-Cron.

````
define('DISABLE_WP_CRON', true);
````

There are many important tasks that WP-Cron takes care of, so if you do this, be prepares to finish the steps below.

### Free Services
Once you have disabled WP-Cron, you will need something that call call a URL at a regular interval. The easiest way to do this is to setup an account with one of the free cron services. Here are several for you to consider.
 
 - [EasyCron](https://www.easycron.com/)
 - [Set Cron Job](https://www.setcronjob.com/)
 - [My Cron](http://www.mywebcron.com/)
 - [cron-job](https://cron-job.org/en/)

All of these sites will do the job. By disabling WP-Cron, you have turned off the automatic checking and calling of the `wp-cron.php` script. It is called by simply calling a URL. You will have to call that url yourself now using one of the services above. With most of them, it is as easy as this.

1. Setup and account
1. Setup a job that calls `http://yourdomain.tld/wp-cron.php?doing_wp_cron=1`

Depending on what service you use, you may have options to setup multiple jobs at different times. Honestly, setting up a single job that calls the URL above every 15 minutes is all you need to do. WP-Cron will take care of the rest. If you create new schedules that need to be run more often than once every 15 minutes, you will need to adjust your job accordingly.

### From your own server
If you have your own servers connected to the Internet, you can use the cron on one of them to make this call. You will have to learn how to properly setup a cron job, and you will use something like wget or curl - these are command line tools to fetch a web page. Unless you take special precautions, it is not any safer to use your own server vs. a web based cron service, however it does give you more control.


### Security
For the most part, `wp-cron.php` is secure. There are only two parameters you can pass in that will affect it, `doing_wp_cron=1` and `doing_ajax=1`. Beyond that, all input is ignored. While these two `$_GET` values are not filtered, they are only used as flags and not as actual input for a process or variable. 

While no script is 100% secure if it is on a server attached to the Internet, `wp-cron.php` has no currently known vulnerabilities or exploits. 


### WordPress Cron Plugins
WordPress has many plugins for controlling both the internal WP-Cron as well as facilitating external crons. Since Pantheon does not provide cron services, we do not recommend or discourage the use of any given plugin. We encourage you to check out the list of [WordPress Cron Plugins](https://wordpress.org/plugins/search.php?q=cron "List of WordPress plugins that help manage cron jobs") experiement in your Dev environment with several and find the one that most suites your needs.
