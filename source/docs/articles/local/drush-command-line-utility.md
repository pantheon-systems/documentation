---
title: Drush Command-Line Utility
description: Administer and maintain your site from your local Drush installation.
category:
  - getting-started
  - developing
keywords: drush, command line, drupal, terminus drush, cli
---
[Drush](http://drush.org) is a command-line interface for Drupal that provides a wide set of utilities for administering and maintaining your site.

Pantheon does not need the settings.php for your site to work, and your Drupal sites do not contain one out of the box. Drush commands require a settings.php file and it's considered a best practice to have one. Simply duplicate the `sites/default/default.settings.php` to `sites/default/settings.php` for Drush to work on a new site.

## Terminus Drush and Local Drush
Drush-savvy developers should also install and utilize [Terminus](https://github.com/pantheon-systems/cli), a command-line interface that allows you to control your Pantheon account and sites. Virtually anything you can do in the Dashboard, you can script with Terminus. It can also make remote drush calls on your environments without having drush installed locally.

Using Terminus to operate Drush commands on your site environments negates the issues below, which stem from incompatibilities between locally and remotely installed versions of Drush. All of the commands below can be run from Terminus instead of using Drush aliases. For more information, see our guide on [Managing Drupal Sites with Terminus and Drush](/docs/guides/terminus-drupal-site-management/).

## Drush Versions
Pantheon currently has Drush version 5.10.0 installed; Drush 5.x is compatible. Currently, Pantheon aliases are not Drush 6.x compatible, but we're working on it.

You can run either Drush 5.x or 6.x on your local installation to interact with your Pantheon Drupal installations.

There are a few known issues:

### Drush 5

Some Drush 5 commands need to be executed from outside the context of a local working Drupal installation.

### Drush 6

If your local Drush installation is version 6, most commands need to be executed with the `--strict=0` option in order to correctly parse Pantheon alias files.

## Installing Drush Aliases Locally
Adding Pantheon Aliases to your local drush aliases file will allow you to run drush calls against your Pantheon site environments. There are two methods for obtaining the aliases.

### Download with Terminus, the Pantheon CLI
Once authenticated to Pantheon with `$ terminus auth login`, update your local aliases file.
```
    $ terminus sites aliases
    Pantheon aliases updated. [ok]
    'drush' cache was cleared [success]
```
### Manually Download and Move the File

To get started, go to your Pantheon Dashboard and click  **Download all Drush aliases** to get a compiled list of every Pantheon site you have associated with your account. The resulting file will be named pantheon.aliases.drushrc.php. If you add a site to your account, you will have to download a new copy of your Drush aliases.

![Link to Pantheon Drush Aliases](/source/docs/assets/images/desk_images/169655.png)

###Installing the Pantheon Drush Aliases

If you are on Linux/MacOS environment, put the generated pantheon.aliases.drushrc.php in either the `.drush` directory in your home, or the `aliases` directory of your local Drush installation.

Drush will search for aliases in any of these files using the alias search path. The following locations are examined for alias files:

1. In any path set in `$options['alias-path']` in drushrc.php, or (equivalently) any path passed in via --alias-path=... on the command line.
2. If 'alias-path' is not set, then in one of the default locations:
  - /etc/drush
  - In the drush installation folder
  - Inside the 'aliases' folder in the drush installation folder
  - $HOME/.drush 

3. Inside the sites folder of any bootstrapped Drupal site, or any local Drupal site indicated by an alias used as a parameter to a command.

When the aliases have been installed, clear the drush cache:

```
$ drush cc drush
```

## Listing Available Site Aliases

Once the Pantheon Drush aliases have been copied, verify that the site aliases are available by listing every site alias known to Drush:

```
$ drush sa
```

## Executing a Drush Command on a Pantheon Site Environment

Once you see the target site in the list of site aliases, you can execute a command on any remote site listed. The syntax is:

    drush @pantheon.SITENAME.ENV COMMAND

For example, to see the status of a site:

    # drush @pantheon.drupal-7-sandbox.dev status
    Drupal version : 7.10
    Site URI : dev.drupal-7-sandbox.pantheon.io
    Database driver : mysql
    Database hostname : 50.57.231.252
    Database username : pantheon
    Database name : pantheon
    Database : Connected
    Drupal bootstrap : Successful
    Drupal user : Anonymous
    ...

## Adding Modules and Themes with Drush

Drush can be a very quick way to set up a new site by adding modules and themes. To use this worklow, first make sure your Dev (or MultiDev) environment is in SFTP mode, allowing Drush to write new files, then use the `dl` command, like so:

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

This is the fastest way to install a suite of modules or themes into your Pantheon project.

## Using Registry Rebuild on Pantheon

Sometimes, Drupal's list of PHP classes and files gets corrupted or out-of-date, typically when moving code. If clearing the cache doesn't resolve the issue due to a required class during bootstrap, the registry may need to be rebuilt. To facilitate this, Pantheon has installed [registry\_rebuild](https://drupal.org/project/registry_rebuild) as an available drush command on every site. **Do not attempt to install the module on your site.** This command is provided as-is, without warranty, so make a backup first.  



To rebuild the registry of a site, create a backup from your Dashboard, then:

    drush @pantheon.SITENAME.ENV rr

## Using Site Audit on Pantheon

[Site Audit](https://drupal.org/project/site_audit) is a collection of Drush commands that analyze a site for compliance with Drupal best practices. Originally designed to provide an actionable report prior to load testing and launch, each report can be read using Drush or written as HTML to a file. Site Audit currently only supports Drupal 7 sites.  



To see all the site audit commands on Pantheon, use:

    drush @pantheon.SITENAME.ENV help --filter=site_audit

To run the best practices report on Pantheon:

    drush @pantheon.SITENAME.ENV --detail abp

To check caching settings on Pantheon (recommendation is to disable page compression):

    drush @pantheon.SITENAME.ENV --vendor=pantheon --detail ac

## Transferring Files Using rsync and Drush

Pantheon provides [rsync](/docs/articles/local/rsync-and-sftp/) as an option for transferring the contents of `sites/default/files` to and from Pantheon.

    # Sync files from local to Pantheon site environment.
    drush -r . rsync @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
    # Sync files from Pantheon site environment to local.
    drush -r . rsync @pantheon.SITENAME.ENV:%files @self:sites/default/

## Exporting a Local Database Using Drush

Use the Drush command sql-dump to quickly export your database. Clear your caches first to save space.

    drush cc all
    drush sql-dump --gzip --result-file=$HOME/Desktop/db_$(date +"%Y-%m-%d").sql

## Transferring Database Content Using Drush on Pantheon

You cannot use `drush sql-sync` on Pantheon. Instead, download a copy of the database from a backup and save it to your local disk, then use `gunzip` and `mysql` to decompress and import the dump.

    gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME

## Timeouts When Using Long-Running Migrate or Other Drush Commands

Long-running drush commands that produce no output will cause the SSH gateway to timeout. Instead, use an option to produce some sort of terminal response.  



For example, if a [migrate](https://drupal.org/project/migrate) command such as migrate-rollback is disconnecting, use the feedback option to produce output:

  --feedback="1000 items"

See the [migrate drush documentation](https://drupal.org/node/1561820) for details.

## Drush Commands with Known Issues

The following Drush commands are not supported and will not work on Pantheon sites:

`sql-sync`  
`sql-sqlc`  
`php-eval`

As an alternative to `drush sql-sync` you can use `drush sql-dump` instead.

## Drush Commands that Alter Site Code

Commands that alter site code, such as pm-download (dl) will only work on a Dev environment that has been set to [SFTP mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/) from the Pantheon dashboard.

## Use Drush to Update Modules on Pantheon

First, make sure the Dev environment is set to [SFTP mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/). Then:

    drush @pantheon.SITENAME.dev up --no-core

## Do Not Use Drush to Update Drupal Core on Pantheon

Pantheon uses Pressflow and includes some additional functionality; Drush assumes that a site is using vanilla Drupal and erroneously overwrites Pressflow. In short, **do not use Drush to update Drupal core on Pantheon** . For more details, see the [Core Updates](/docs/articles/sites/code/applying-upstream-updates/) article.

## Troubleshooting

If you experience problems with any Drush commands, try executing them with the `-vd` options, for more verbose debugging information. While we can't support local Drush installations or aliases, you can ask about your specific configuration in the [community forum.](http://drupal.stackexchange.com/questions/tagged/drush)

### Drush Commands on Remote Aliases Not Working from Inside Local Drupal Install

Some Drush 5 commands need to be executed from outside the context of a local Drupal installation, due to a known issue with Drush 5: [https://github.com/drush-ops/drush/issues/313](https://github.com/drush-ops/drush/issues/313). The output from a Drush 5 command run in this context looks like the following:

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
     Site URI : ENV-SITENAME.pantheon.io
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

### Drush Error: "Unknown option: --db-url"

    $ drush @pantheon.SITENAME.ENV cc all
    Unknown option: --db-url. See `drush help cache-clear` for available [error]
    options. To suppress this error, add the option --strict=0.

To resolve this error, take the suggestion and _add the option `--strict=0`_.

    $ drush @pantheon.SITENAME.ENV cc all --strict=0
    'all' cache was cleared in [success]
    /srv/bindings/BINDINGID/code#ENV-SITENAME.pantheon.io

### Drush Error: "Could not find a Drupal settings.php file" or missing system information from status

    Could not find a Drupal settings.php file at ./sites/default/settings.php

To resolve, add a default or empty `sites/default/settings.php` to your site's code.

### Unable to Connect to drush.in Hostnames (DNS)

Some ISPs have issues resolving a drush.in hostname; if you're having trouble connecting to a drush.in hostname, you can use the `dig` command to investigate further.

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

As you can see in the output above, the status: REFUSED suggests improper resolution. The next step is to run `dig` with a specified DNS server. We recommend using Google's DNS (8.8.8.8):

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
