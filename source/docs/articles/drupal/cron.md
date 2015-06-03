---
title: Cron for Drupal
description: Understand Pantheon cron execution and management.
category:
  - developing
keywords: drupal, cron, cron execution, run cron,
---
Cron will always run unless all jobs are specifically set to 'Off' via Elysia or Ultimate Cron modules. Cron will also not run via Drush if a Cron key is set with Elysia.

Cron is a time-based task scheduler that can be configured to automatically execute tasks without any manual involvement beyond the initial configuration.

Both Drupal core and many contributed modules have tasks that need to be performed on a regular basis. Cron can be configured when and how often these tasks are executed.

## Pantheon Cron Execution

For every site environment, Pantheon executes Cron at the top of each hour to allow Drupal to perform any scheduled tasks. To do that, Pantheon internally invokes `drush cron`.

This bootstraps your site and invokes [drupal\_cron\_run](https://api.drupal.org/api/drupal/includes!common.inc/function/drupal_cron_run/7).

There is no way to configure when Pantheon executes Drupal cron.
<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Setting the value to "Never" will be ignored; cron will always run at least hourly.
</div>
## Managing Cron

Cron can be managed via Drupal's admin interface at `admin/system/config/cron`.

There are a couple of ways to interact with cron on Pantheon. One way is to execute Cron manually from the Drupal admin interface.<br />
![](/source/docs/assets/images/desk_images/73173.png)
Clicking **Run cron** will run all scheduled tasks.
![Click Run Cron](/source/docs/assets/images/desk_images/73176.png)
Alternatively, all scheduled cron tasks can be run with the following [Terminus](https://github.com/pantheon-systems/cli) command:

    terminus drush --site=<site> --env=<env> cron

<div class="alert alert-info" role="alert">
<strong>Note</strong>: Replace <code>&lt;site&gt;</code> with your site name, and <code>&lt;env&gt;</code> with the environment (Dev, Test, or Live). You can see a list of all your sites by running <code>terminus sites list</code></div>

To ensure that Cron tasks are being run, you can check the reports via the Drupal Admin interface at Reports > Recent Log Messages. 
![Reports--->Recent Log Messages](/source/docs/assets/images/desk_images/74068.png)
If Cron has been recently run, entries will appear in the log. The two entries featured in the screenshot below are evidence that Cron has run and a Cron task called "cron\_example" has run.
![](/source/docs/assets/images/desk_images/74077.png)

### How Can I Schedule Cron to Run More Often?

While Pantheon doesn't provide a mechanism for custom scheduling of cron tasks, the platform will automatically execute `drush cron` once an hour, usually within 5 to 10 minutes of the top of the hour.

If the site has not been accessed through the web by a visitor for at least two hours, the platform suspends the associated services until it's accessed again and Cron will not run.

There is a two-part workaround; first, keeping the site awake, then using a different mechanism for executing Cron tasks.

To keep the site active, some users have used [https://www.pingdom.com/](https://www.pingdom.com/) to access their site as often as once a minute. In conjunction, the use of the Drupal module [http://drupal.org/project/elysia\_cron](http://drupal.org/project/elysia_cron) allows for granular control over cron scheduling and execution with both an user interface and API.

By having pingdom visit the site once a minute like a visitor, the site stays active and elysia\_cron has an opportunity to act every minute (if it needs to).

This combination is not officially supported by Pantheon, but has worked for some of our customers with similar needs.

As an alternative solution if you have anything that is executing a Cron on your own server, you can invoke drush commands remotely using [Terminus](https://github.com/pantheon-systems/cli), including drush cron, to trigger scheduled operations.

Another very effective solution is to leverage a service such as [EasyCron](http://www.easycron.com). You can set custom schedules, notifications, and logging, either through their web interface or through their [module](https://drupal.org/project/EasyCron). The unique URL to kick off Cron externally can be found at `/admin/config/system/cron`

## Troubleshooting Cron

### Why Didn't Cron Run?

The most common causes are:

- Missing sites/default/settings.php
- [PHP fatal errors](/docs/articles/sites/php-errors-and-exceptions/)
- [Invalid redirection logic in settings.php](/docs/articles/sites/code/redirect-incoming-requests/)
- Setting a Cron key in Elysia Cron's settings: `admin/config/system/cron/settings`

### What is the Maximum Execution Time of Cron?

The maximum execution time of Cron is 180 seconds (3 minutes).

### How Can I Find Out When Cron Last Ran?

You can check the log messages through the Drupal Admin interface, as mentioned above.  

You can also use [Terminus](https://github.com/pantheon-systems/cli) to see when cron was last run with the following command:

    terminus drush --site=<site> --env=<env> wd-show --type='cron'

### Can I Prevent Drupal Cron From Running?

Yes, from within Drupal at `admin/system/config/cron`, select **Never** from the "Run cron every" drop-down menu as shown below, then save the configuration. 
![](/source/docs/assets/images/desk_images/74128.png)  
## Resources

- [Drupal.org Community Documentation - Set up Cron](http://drupal.org/cron)
- [Elysia Cron - extends Drupal standard Cron](http://drupal.org/project/elysia_cron)
- [poormanscron - Triggers Drupal Cron from site traffic (Drupal 6 only, included in Drupal 7)](https://drupal.org/project/poormanscron)
