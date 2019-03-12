---
title: Cron for Drupal
description: Understanding how Pantheon cron execution and cron management works on your Drupal site.
tags: [services]
categories: [drupal]
---
Cron is a time-based task scheduler that can be configured to automatically execute tasks without any manual involvement beyond the initial configuration.

Cron will always run unless all jobs are specifically set to 'Off' via Elysia or Ultimate Cron modules. Cron will also not run via Drush if a cron key is set with Elysia.

Both Drupal core and many contributed modules have tasks that need to be performed on a regular basis. You can configure when and how often cron executes the tasks.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Containers on Pantheon are automatically spun down following a period of inactivity, then spun back up once a web request is made. Cron is _not_ run on idle containers that have been spun down. For details, see [All About Application Containers](/docs/application-containers/#idle-containers).</p></div>

## Pantheon Cron Execution
Pantheon executes cron once an hour on every environment to allow Drupal to perform scheduled tasks. This generally occurs within 5 to 10 minutes of half past each hour: 4:30pm, 5:30pm, 6:30pm, etc.

Typically cron is triggered via a browser/page request or crontab. However, Pantheon uses the following to automatically trigger cron on the platform:
```bash
drush pantheon_cron 3600
```
Technically, the command bootstraps your site and invokes [drupal\_cron\_run](https://api.drupal.org/api/drupal/includes!common.inc/function/drupal_cron_run/7), similar to how Drupal cron runs normally.

## Manage Cron

You can manage cron via Drupal's admin interface at `admin/config/system/cron`.

1.  There are a couple of ways to interact with cron on Pantheon.

    - One way is to execute cron manually from the Drupal admin interface:

      ![Drupal admin configure cron](/source/docs/assets/images/cron-config.png)

      Click **Run cron** to run all scheduled tasks:

      ![Click Run Cron](/source/docs/assets/images/run-cron.png)

    - Alternatively, you can run all scheduled cron tasks with the following [Terminus](/docs/terminus/) command:

      ```bash
      terminus drush <site>.<env> -- cron
      ```

2.  To ensure that cron tasks have been run, check the reports via the Drupal Admin interface at **Reports** > **Recent log messages**.

 ![Reports--->Recent Log Messages](/source/docs/assets/images/recent-log-reports.png)

 If cron has run recently, entries will appear in the log. The two entries in the screenshot below show that cron has run and a cron task called `cron_example`.

 ![Cron log entry in reports](/source/docs/assets/images/drupal-reports.png)

### Run Cron More Often

While Pantheon doesn't provide a mechanism for custom scheduling of cron tasks, the platform will automatically execute `drush pantheon_cron 3600` once an hour, usually within 5 to 10 minutes of half past each hour (4:30pm, 5:30pm, 6:30pm, etc).

If the site has not been accessed through the web by a visitor for at least two hours, the platform suspends the associated services until it's accessed again and cron will not run.

There are several workarounds. Most work by keeping the site awake, then using a different mechanism for executing cron tasks.

 - To keep the site active, some users have used [Pingdom](https://www.pingdom.com/){.external} to automate access to their site as often as once a minute. In conjunction, the use of the Drupal module [Elysia Cron](https://www.drupal.org/project/elysia_cron){.external} allows for granular control over cron scheduling and execution with both a user interface and API.

   By having Pingdom visit the site once a minute like a visitor, the site stays active and Elysia Cron has an opportunity to act every minute (if it needs to). This combination is not officially supported by Pantheon, but has worked for some of our customers.

 - A single-part solution is to [set up New Relic's Synthetics Ping Monitoring](https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/using-monitors/add-edit-monitors){.external} to hit Cron URLs. You may still want to use [Elysia Cron](https://www.drupal.org/project/elysia_cron){.external} to schedule different cron tasks at different frequencies though. One advantage of this approach is that your site may already have a New Relic instance associated with it, saving you from having to setup another third-party service.

 - If you have anything that is executing cron tasks on your own server, you can invoke Drush commands remotely using [Terminus](/docs/terminus/), including Drush cron, to trigger scheduled operations.

 - Another very effective solution is to leverage a service such as [EasyCron](https://www.easycron.com/){.external}. You can set custom schedules, notifications, and logging through their web interface or through their [EasyCron Module](https://drupal.org/project/EasyCron){.external}. The unique URL to kick off cron externally can be found at `/admin/config/system/cron`.


## Disable Cron

This configuration disables cron execution in Drupal, but it does not affect Pantheon's cron execution at the platform level which runs every hour on all environments.

To disable Drupal's standard cron:

1. Navigate to **Configuration** > **System** > **Cron** within the admin interface.
2. Select **Never** from the "Run cron every" drop-down menu.
3. Click **Save configuration**:

  ![Stop cron from running](/source/docs/assets/images/run-cron-config.png)

### Drupal 7 and Elysia Cron

Drupal 7 sites using the [Elysia Cron](https://www.drupal.org/project/elysia_cron){.external} contrib module to extend the standard cron can disable it globally in the module's settings:

![disable cron globally by Elysia Cron](/source/docs/assets/images/disable_cron_elysia.png)

## Troubleshooting Cron

### Why didn't cron run?

The most common causes are:

- Missing sites/default/settings.php
- [PHP fatal errors](/docs/php-errors/)
- [Invalid redirection logic in settings.php](/docs/domains/#redirect-to-https-and-the-primary-domain)
- Setting a cron key in Elysia Cron's settings: `admin/config/system/cron/settings`

### What is the maximum execution time of cron?

The maximum execution time of cron is 180 seconds (3 minutes).

### How can I find out when cron last ran?

You can check the log messages through the Drupal Admin interface.

You can also use [Terminus](/docs/terminus/) to see when cron was last run with the following command:
```bash
terminus drush <site>.<env> -- wd-show --type='cron'
```

### Can I add tasks to cron through Drupal?

No. You can create a custom module that uses the [`hook_cron`](https://api.drupal.org/api/drupal/core%21core.api.php/function/hook_cron/8.6.x){.external} function, or schedule a drush command to be run via [Terminus](/source/docs/terminus/) from your local cron, or an external service like [cron-job.org](https://cron-job.org/){.external}.

## Resources

- [Drupal.org Community Documentation - Set up Cron](https://www.drupal.org/docs/7/setting-up-cron/overview)
- [Elysia Cron - extends Drupal standard Cron](https://www.drupal.org/project/elysia_cron)
- [poormanscron - Triggers Drupal Cron from site traffic (Drupal 6 only, included in Drupal 7)](https://drupal.org/project/poormanscron)
