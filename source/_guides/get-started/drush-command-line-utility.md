---
title: Drush command-line utility
parent_guide:
    - getting-started
filename: source/_docs/drush-command-line-utility.md
---

## Pantheon Academy
<iframe allowfullscreen="" frameborder="0" height="315" src="//www.youtube.com/embed/cUYTAyXQg0w" width="560"></iframe>  
 
## Overview

[Drush](http://drush.org) is a command-line interface for Drupal that provides a wide set of utilities for administering and maintaining your site.

Pantheon does not need the `settings.php` for your site to work, but Drush commands require a `settings.php` file and it's considered a best practice to have one.

Pantheon currently has Drush version 5.10.0 installed; Drush 5.x is compatible. Currently, Pantheon aliases are not Drush 6.x compatible, but we're working on it.

You can run either Drush 5.x or 6.x on your local installation to interact with your Pantheon Drupal installations. There are a few known issues:

### Drush 5

Some Drush 5 commands need to be executed from outside the context of a local working Drupal installation.

### Drush 6

Many Drush 6 commands need to be executed with the `--strict=0` option in order to correctly parse Pantheon alias files.

## Downloading Pantheon site aliases for Drush

To get started, go to your Pantheon dashboard and click  **Download all Drush aliases** to get a compiled list of every Pantheon site you have associated with your account. The resulting file will be named pantheon.aliases.drushrc.php. If you add a site to your account, you will have to download a new copy of your Drush aliases.

![Link to Pantheon Drush Aliases](https://pantheon-systems.desk.com/customer/portal/attachments/169655)

## Installing the Pantheon Drush aliases

If you are on Linux/MacOS environment, put the generated pantheon.aliases.drushrc.php in either the `.drush` directory in your home, or the `aliases` directory of your local Drush installation.

Drush will search for aliases in any of these files using the alias search path. The following locations are examined for alias files:

1. In any path set in $options['alias-path'] in drushrc.php, or (equivalently) any path passed in via --alias-path=... on the command line.
2. If 'alias-path' is not set, then in one of the default locations:
  - /etc/drush
  - In the drush installation folder
  - Inside the 'aliases' folder in the drush installation folder
  - $HOME/.drush 

3. Inside the sites folder of any bootstrapped Drupal site, or any local Drupal site indicated by an alias used as a parameter to a command

When the aliases have been installed, clear the drush cache:

    drush cc drush

## Listing available site aliases

Once the Pantheon Drush aliases have been copied, verify that the site aliases are available by listing every site alias known to Drush:

    drush sa

## Executing a Drush command on a Pantheon site environment

Once you see the target site in the list of site aliases, you can execute a command on any remote site listed. The syntax is:

    drush @pantheon.SITENAME.ENV COMMAND

For example, to see the status of a site:

    # drush @pantheon.drupal-7-sandbox.dev status
    Drupal version : 7.10
    Site URI : dev.drupal-7-sandbox.gotpantheon.com
    Database driver : mysql
    Database hostname : 50.57.231.252
    Database username : pantheon
    Database name : pantheon
    Database : Connected
    Drupal bootstrap : Successful
    Drupal user : Anonymous
    ...

## Adding Modules and Themes with Drush

Drush can be a very quick way to set up a new site by adding modules and themes. To use this worklow, first make sure your dev (or MultiDev) environment is in SFTP mode, allowing Drush to write new files, then use the `dl` command, like so:

    # drush @pantheon.drupal-7-sandbox.dev dl views panels ctools media
    Project views (7.x-3.7) downloaded to [success]
    /srv/bindings/xxx/code/sites/all/modules/views.
    Project views contains 2 modules: views, views_ui.
    Project panels (7.x-3.3) downloaded to [success]
    /srv/bindings/xxx/code/sites/all/modules/panels.
    Project panels contains 4 modules: panels_ipe, panels_mini, panels_node, panels.
    Project ctools (7.x-1.3) downloaded to [success]
    /srv/bindings/xxx/code/sites/all/modules/ctools.
    Project ctools contains 9 modules: ctools_ajax_sample, bulk_export,
    ctools_access_ruleset, page_manager, ctools_plugin_example, views_content,
    stylizer, ctools_custom_content, ctools.
    Project media (7.x-1.3) downloaded to [success]
    /srv/bindings/xxx/code/sites/all/modules/media.
    Project media contains 3 modules: media_internet, file_entity, media.

This is hands-down the fastest way to install a suite of modules or themes into your Pantheon project.

## Using Registry Rebuild on Pantheon

Sometimes, Drupal's list of PHP classes and files gets corrupted or out-of-date, typically when moving code. If clearing the cache doesn't resolve the issue due to a required class during bootstrap, the registry may need to be rebuilt. To facilitate this, Pantheon has installed [registry\_rebuild](https://drupal.org/project/registry_rebuild) as an available drush command on every site - do not attempt to install the module on your site. This command is provided as-is, without warranty, your mileage may vary, make a backup first, and so forth.  


To rebuild the registry of a given site, create a backup from your dashboard, then:

    drush @pantheon.SITENAME.ENV rr

## Using Site Audit on Pantheon

[Site Audit](https://drupal.org/project/site_audit) is a collection of Drush commands that analyze a site for compliance with Drupal best practices. Originally designed to provide an actionable report prior to load testing and launch, each report can be read using Drush or written as HTML to a file. Site Audit currently only supports Drupal 7 sites.  


To see all the Site Audit commands on Pantheon, use:

    drush @pantheon.SITENAME.ENV help --filter=site_audit

To run the Best Practices report on Pantheon:

    drush @pantheon.SITENAME.ENV --detail abp

To check caching settings on Pantheon (recommendation is to disable page compression):

    drush @pantheon.SITENAME.ENV --vendor=pantheon --detail ac

## Terminus, the Pantheon CLI

Drush-savvy developers should also install and utilize [terminus](https://github.com/pantheon-systems/terminus), which is a Drush extension that allows you to control your Pantheon account and site from the command-line. Virtually anything you can do in the dashboard, you can script with Terminus.

For instance, you can automatically udpate your drush aliases:

    # drush pantheon-auth
    Pantheon dashboard password for you@yourdomain.com: xxxxxxx
    Authenticating as you@yourdomain.com [ok]
    Success! [ok]
    # drush pantheon-aliases
    Pantheon aliases updated. [ok]
    'drush' cache was cleared [success]

## Transferring files using rsync and Drush

Pantheon provides [rsync](/documentation/advanced-topics/rsync-and-sftp/) as an option for transferring the contents of sites/default/files to and from Pantheon.

    # Sync files from local to Pantheon site environment.
    drush -r . rsync @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
    # Sync files from Pantheon site environment to local.
    drush -r . rsync @pantheon.SITENAME.ENV:%files @self:sites/default/

## Exporting a local database using Drush

Use the Drush command sql-dump to quickly export your database. Clear your caches first to save space!

    drush cc all
    drush sql-dump --gzip --result-file=$HOME/Desktop/db_$(date +"%Y-%m-%d").sql

## Transferring database contents using Drush on Pantheon

You cannot use drush sql-sync on Pantheon. Instead, Pantheon has enabled  [sql-sync-pipe](https://drupal.org/project/drush_sql_sync_pipe), a functionally equivalent command. You will need to install Drush SQL Sync Pipe locally in order to use it.

    drush sql-sync-pipe @pantheon.SITENAME.ENV @self --progress

If you need support for sql-sync-pipe, please visit the [Drush SQL Sync Pipe issue queue](https://drupal.org/project/issues/drush_sql_sync_pipe?categories=All) and create a new issue if necessary. Currently, sql-sync-pipe can not be used to transfer a database from a local instance to Pantheon.

## Timeouts when using long-running migrate or other drush commands

Long-running drush commands that produce no output will cause the SSH gateway to timeout. Instead, use an option to produce some sort of terminal response.  


For example, if a [migrate](https://drupal.org/project/migrate) command such as migrate-rollback is disconnecting, use the feedback option, like

    --feedback="1000 items"

to produce output. See the [migrate drush documentation](https://drupal.org/node/1561820) for details.

## Drush commands with known issues

The following Drush commands are not supported and will not work on Pantheon sites:

`sql-sync`  
`sql-sqlc`  
`php-eval`

As an alternative to `sql-dump`, you can use sql-sync-pipe or drush sql-dump.

## Drush commands that alter site code

Commands that alter site code, such as pm-download (dl) will only work on a dev environment that has been set to [SFTP mode](/documentation/getting-started/developing-on-pantheon-directly-with-sftp-mode/) from the Pantheon dashboard.

## How to use Drush to update modules on Pantheon

First, make sure the dev environment is set to [SFTP mode](/documentation/getting-started/developing-on-pantheon-directly-with-sftp-mode/). Then:

    drush @pantheon.SITENAME.dev up --no-core

## Do not use Drush to update Drupal core on Pantheon

Pantheon uses Pressflow and includes some additional functionality; Drush assumes that a site is using vanilla Drupal and erroneously overwrites Pressflow. In short, **do not use Drush to update Drupal core on Pantheon** . For more details, see the [Core Updates](/documentation/running-drupal/drupal-core-updates/) article.

## Troubleshooting

If you experience problems with any Drush commands, try executing them with the `-vd` options, for more verbose debugging information. While we can't support local Drush installations or aliases, you can ask about your specific configuration in the community forum: [http://drupal.stackexchange.com/questions/tagged/drush](http://drupal.stackexchange.com/questions/tagged/drush)

### Drush commands on remote aliases not working from inside local Drupal install

Some Drush 5 commands need to be executed from outside the context of a local Drupal installation, due to a known issue with Drush 5: [https://github.com/drush-ops/drush/issues/313](https://github.com/drush-ops/drush/issues/313). The output from a Drush 5 command run in this context would look like the following:

    $ drush @pantheon.SITENAME.ENV status
     PHP configuration : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/php53.in
                            i
                            /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/php53.in
                            i
     Drush version : 5.10.0
     Drush : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/drushrc.
     configuration php

To make your Drush 5 commands work on Pantheon aliases, change your directory to a context outside of a working local Drupal installation:

    $ pwd
    /Users/USERNAME/Sites/SITENAME


    $ cd ..


    $ pwd
    /Users/USERNAME/Sites/


    $ drush @pantheon.SITENAME.ENV status
     Drupal version : 7.26
     Site URI : ENV-SITENAME.gotpantheon.com
     Database driver : mysql
     Database hostname : 10.178.14.16
     Database username : pantheon
     Database name : pantheon
     Database : Connected
     Drupal bootstrap : Successful
     Drupal user : Anonymous
     Default theme : bartik
     Administration theme : seven
     PHP configuration : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/php5
                               3.ini
                               /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/php5
                               3.ini
     Drush version : 5.10.0
     Drush configuration : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/drus
                               hrc.php
     Drupal root : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/code
     Site path : sites/default
     File directory path : sites/default/files
     Private file : sites/default/files/private
     directory path
     Temporary file : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/tmp
     directory path

### Drush error "Unknown option: --db-url"

    $ drush @pantheon.SITENAME.ENV cc all
    Unknown option: --db-url. See `drush help cache-clear` for available [error]
    options. To suppress this error, add the option --strict=0.

To resolve this error, take the suggestion and _add the option `--strict=0`_.

    $ drush @pantheon.SITENAME.ENV cc all --strict=0
    'all' cache was cleared in [success]
    /srv/bindings/BINDINGID/code#ENV-SITENAME.gotpantheon.com

### Drush error "Could not find a Drupal settings.php file" or missing system information from status

    Could not find a Drupal settings.php file at ./sites/default/settings.php

To resolve, add a default or empty sites/default/settings.php to your site's code.

### Unable to connect to drush.in hostnames (DNS)

Some ISP's have issues resolving a drush.in hostname; if you're having trouble connecting to a drush.in hostname, you can use the "dig" command to investigate further.

    $ dig appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in
    ;; Truncated, retrying in TCP mode.


    ; <<>> DiG 9.8.1-P1 <<>> appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: REFUSED, id: 38905
    ;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0


    ;; QUESTION SECTION:
    ;appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in. IN A


    ;; Query time: 11 msec
    ;; SERVER: 127.0.0.1#53(127.0.0.1)
    ;; WHEN: Thu Aug 30 12:28:25 2012
    ;; MSG SIZE rcvd: 78

As you can see in the output above, the status: REFUSED suggests improper resolution. The next step is to try running "dig" with a specified DNS server. We recommend using Google's DNS (8.8.8.8):

    $ dig @8.8.8.8 appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in
    ;; Truncated, retrying in TCP mode.


    ; <<>> DiG 9.8.1-P1 <<>> @8.8.8.8 appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in
    ; (1 server found)
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 36494
    ;; flags: qr rd ra; QUERY: 1, ANSWER: 34, AUTHORITY: 0, ADDITIONAL: 0


    ;; QUESTION SECTION:
    ;appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in. IN A


    ;; ANSWER SECTION:
    appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in. 599 IN A 67.207.144.213
    ...
    appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in. 599 IN A 67.207.143.122


    ;; Query time: 52 msec
    ;; SERVER: 8.8.8.8#53(8.8.8.8)
    ;; WHEN: Thu Aug 30 13:02:00 2012
    ;; MSG SIZE rcvd: 622

In this example, Google's DNS is able to properly resolve the drush.in hostname.

You can adjust your local settings to use Google's DNS (8.8.8.8) instead of the default provided by your ISP to properly resolve the hostnames.

## Crontab

Currently, there is no way to manage Crontab on Pantheon. If you need a way to setup your own Cron interval, you can use an external cron service such as [Easy Cron](https://www.easycron.com/user/register).

## Known Limitations
 [Migrate's support for spawning drush processes](https://drupal.org/node/1958170) to facilitate batch migrations is not supported on Pantheon.
