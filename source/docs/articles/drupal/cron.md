---
title: Cron for Drupal
description: Understanding how Pantheon cron execution and cron management works on your site.
category:
  - developing
keywords: drupal, cron, cron execution, run cron,
---
Cron is a time-based task scheduler that can be configured to automatically execute tasks without any manual involvement beyond the initial configuration.

Cron will always run unless all jobs are specifically set to 'Off' via Elysia or Ultimate Cron modules. Cron will also not run via Drush if a cron key is set with Elysia.

Both Drupal core and many contributed modules have tasks that need to be performed on a regular basis. You can configure when and how often cron executes the tasks.

## Pantheon Cron Execution

For every site environment, Pantheon executes cron at the top of each hour to allow Drupal to perform any scheduled tasks. To do that, Pantheon internally invokes `drush cron`.

This bootstraps your site and invokes [drupal\_cron\_run](https://api.drupal.org/api/drupal/includes!common.inc/function/drupal_cron_run/7).

Pantheon's system cron cannot be disabled and will run Drupal cron every hour, even if cron is disabled in Drupal. Using a module like Elysia Cron will allow more granular control of what happens when Drupal cron runs.

<div class="alert alert-info" role="alert">
<h4>Note</h4>		
In Drupal, setting the value to "Never" will be ignored; system cron will always run at least hourly.		
</div>

## Managing Cron

You can manage cron via Drupal's admin interface at `admin/config/system/cron`.

There are a couple of ways to interact with cron on Pantheon. One way is to execute cron manually from the Drupal admin interface.<br />
![Drupal admin configure cron](/source/docs/assets/images/desk_images/73173.png)
Click **Run cron** to run all scheduled tasks.
![Click Run Cron](/source/docs/assets/images/desk_images/73176.png)
Alternatively, you can run all scheduled cron tasks with the following [Terminus](/docs/articles/local/cli/) command:
```bash
terminus drush --site=<site> --env=<env> "cron"
```
<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;site&gt;</code> with your site name, and <code>&lt;env&gt;</code> with the environment (Dev, Test, or Live). You can see a list of all your sites by running <code>terminus sites list</code></div>

To ensure that cron tasks have been run, check the reports via the Drupal Admin interface at Reports > Recent Log Messages. 
![Reports--->Recent Log Messages](/source/docs/assets/images/desk_images/74068.png)
If cron has run recently, entries will appear in the log. The two entries in the screenshot below show that cron has run and a cron task called "cron\_example".
![Cron log entry in reports](/source/docs/assets/images/desk_images/74077.png)

### How Can I Schedule Cron to Run More Often?

While Pantheon doesn't provide a mechanism for custom scheduling of cron tasks, the platform will automatically execute `drush cron` once an hour, usually within 5 to 10 minutes of the top of the hour.

If the site has not been accessed through the web by a visitor for at least two hours, the platform suspends the associated services until it's accessed again and cron will not run.

There is a two-part workaround; first, keeping the site awake, then using a different mechanism for executing cron tasks.

To keep the site active, some users have used [https://www.pingdom.com/](https://www.pingdom.com/) to access their site as often as once a minute. In conjunction, the use of the Drupal module [http://drupal.org/project/elysia\_cron](http://drupal.org/project/elysia_cron) allows for granular control over cron scheduling and execution with both an user interface and API.

By having pingdom visit the site once a minute like a visitor, the site stays active and elysia\_cron has an opportunity to act every minute (if it needs to).

This combination is not officially supported by Pantheon, but has worked for some of our customers with similar needs.

As an alternative solution if you have anything that is executing a cron on your own server, you can invoke Drush commands remotely using [Terminus](/docs/articles/local/cli/), including Drush cron, to trigger scheduled operations.

Another very effective solution is to leverage a service such as [EasyCron](http://www.easycron.com). You can set custom schedules, notifications, and logging through their web interface or through their [module](https://drupal.org/project/EasyCron). The unique URL to kick off cron externally can be found at `/admin/config/system/cron`

## Troubleshooting Cron

### Why didn't cron run?

The most common causes are:

- Missing sites/default/settings.php
- [PHP fatal errors](/docs/articles/sites/php-errors-and-exceptions/)
- [Invalid redirection logic in settings.php](/docs/articles/sites/code/redirect-incoming-requests/)
- Setting a cron key in Elysia Cron's settings: `admin/config/system/cron/settings`

### What is the maximum execution time of cron?

The maximum execution time of cron is 180 seconds (3 minutes).

### How can I find out when cron last ran?

You can check the log messages through the Drupal Admin interface.  

You can also use [Terminus](/docs/articles/local/cli/) to see when cron was last run with the following command:
```bash
terminus drush --site=<site> --env=<env> "wd-show --type='cron'"
```
### Can I prevent Drupal Cron from running?

Yes, from within Drupal at `admin/system/config/cron`, select **Never** from the "Run cron every" drop-down menu, then save the configuration. However, Pantheon system cron will run every hour and there is no way to disable it.
![Stop cron from running](/source/docs/assets/images/desk_images/74128.png)  
## Resources

- [Drupal.org Community Documentation - Set up Cron](http://drupal.org/cron)
- [Elysia Cron - extends Drupal standard Cron](http://drupal.org/project/elysia_cron)
- [poormanscron - Triggers Drupal Cron from site traffic (Drupal 6 only, included in Drupal 7)](https://drupal.org/project/poormanscron)
