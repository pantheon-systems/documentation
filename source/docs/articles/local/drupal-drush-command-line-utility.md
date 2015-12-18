---
title: Drupal Drush Command-Line Utility
description: Administer and maintain your site from your local Drupal Drush installation.
category:
  - getting-started
  - developing
keywords: Drupal drush, command line, drupal, terminus drush, cli
---
[Drush](http://drush.org) is a command-line interface for Drupal that provides a wide set of utilities for administering and maintaining your site.

Drush commands require a `settings.php` file and it's considered a best practice to have one. Drupal 8 sites come with a bundled `settings.php` file out of the box. Drupal 6 and 7 sites do not contain a `settings.php` file, however you can simply copy the `sites/default/default.settings.php` to `sites/default/settings.php` via [SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode) or [Git](/docs/articles/local/starting-with-git) for Drush to work on older Drupal versions. For more details on this file, see [Configuring Settings.php](/docs/articles/drupal/configuring-settings-php/).

## Terminus Drush and Local Drush
Drush-savvy developers should also install and utilize [Terminus](/docs/articles/local/cli/), a command-line interface that allows you to control your Pantheon account and sites. Virtually anything you can do in the Dashboard, you can script with Terminus. It can also make remote Drush calls on your environments without having Drush installed locally, eliminating incompatibility issues between locally and remotely installed versions of Drush.

You can run all of the commands below from Terminus instead of using Drush aliases. For more information, see our guide on [Managing Drupal Sites with Terminus and Drush](/docs/guides/terminus-drupal-site-management/).

## Drush Versions
For details on managing remote and local Drush versions, see [Managing Drush Versions on Pantheon](/docs/articles/local/drush-versions).

## Install Drush Aliases Locally
Downloading the Pantheon aliases to your local Drush aliases file will allow you to run Drush calls against your Pantheon site environments. You don't need to download the Drush aliases file if you're using Terminus to invoke Drush.

There are two methods for obtaining the aliases:

### Download with Terminus, the Pantheon CLI
Once authenticated to Pantheon with `$ terminus auth login`, update your local aliases file.
```nohighlight
$ terminus sites aliases
Pantheon aliases updated. [ok]
'drush' cache was cleared [success]
```
### Download and Move the File Manually

To get started, go to your Pantheon Dashboard and click **Download all Drush aliases** to get a compiled list of every Pantheon site you have associated with your account. The resulting file will be named pantheon.aliases.drushrc.php. If you add a site to your account, you will have to download a new copy of your Drush aliases.<br />
![Link to Pantheon Drush Aliases](/source/docs/assets/images/desk_images/169655.png)

###Install the Pantheon Drush Aliases

If you are on Linux/Mac OS environment, put the generated pantheon.aliases.drushrc.php in either the `$HOME/.drush` directory.

When the aliases have been installed, clear the Drush cache:

```bash
$ drush cc drush
```

## List Available Site Aliases

Once the Pantheon Drush aliases have been copied, verify that the site aliases are available by listing every site alias known to Drush:

```bash
$ drush sa
```
<div class="alert alert-info">
<h4>Note</h4>
You must be a <a href="/docs/articles/sites/team-management/#team-management">team member</a> of the site for it to be included within your local alias file. Organization administrators will not see all associated sites within their alias file, but only sites for which they are team members. The alternative is to execute Drush commands via <a href="/docs/articles/local/cli">Terminus</a> for sites in which you are not a direct team member.
</div>

## Execute a Drush Command on a Pantheon Site Environment

Once you see the target site in the list of site aliases, you can execute a command on any remote site listed. The syntax is:

```bash
drush @pantheon.SITENAME.ENV COMMAND
```
For example, to see the status of a site:

```nohighlight
drush @pantheon.drupal-7-sandbox.dev status
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
```
## Add Modules and Themes with Drush

Drush can be a very quick way to set up a new site by adding modules and themes. To use this workflow, first make sure your Dev or MultiDev environment is in SFTP mode, allowing Drush to write new files, then use the `dl` command:

```nohighlight
drush @pantheon.drupal-7-sandbox.dev dl views panels ctools media
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
```

This is the fastest way to install a suite of modules or themes into your Pantheon project.

## Use Registry Rebuild on Pantheon

Drupal's list of PHP classes and files can get corrupted or out-of-date, typically when moving code. If clearing the cache doesn't resolve the issue due to a required class during bootstrap, the registry may need to be rebuilt. To facilitate this, Pantheon has installed [registry\_rebuild](https://drupal.org/project/registry_rebuild) as an available Drush command on every site. **Do not attempt to install the module on your site.** This command is provided as-is, without warranty, so make a backup first.  

To rebuild the registry of a site, create a backup from your Dashboard, then run:
```bash
drush @pantheon.SITENAME.ENV rr
```
## Use Site Audit on Pantheon

[Site Audit](https://drupal.org/project/site_audit) is a collection of Drush commands that analyze a site for compliance with Drupal best practices. Originally designed to provide an actionable report prior to load testing and launch, each report can be read using Drush or written as HTML to a file. Site Audit currently only supports Drupal 7 sites.  

To see all the Site Audit commands on Pantheon, use:
```bash
drush @pantheon.SITENAME.ENV help --filter=site_audit
```
To run the best practices report on Pantheon:
```bash
drush @pantheon.SITENAME.ENV --detail abp
```
To check caching settings on Pantheon (we recommend that you disable page compression):
```bash
drush @pantheon.SITENAME.ENV --vendor=pantheon --detail ac
```
## Transfer Files Using rsync and Drush

Pantheon provides [rsync](/docs/articles/local/rsync-and-sftp/) as an option for transferring the contents of `sites/default/files` to and from Pantheon.

```bash
# Sync files from local to Pantheon site environment.
drush -r . rsync @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
# Sync files from Pantheon site environment to local.
drush -r . rsync @pantheon.SITENAME.ENV:%files @self:sites/default/
```
## Export a Local Database Using Drush

Use the Drush command sql-dump to quickly export your database. Clear your caches first to save space.
```bash
drush cc all
drush sql-dump --gzip --result-file=$HOME/Desktop/db_$(date +"%Y-%m-%d").sql
```
## Transfer Database Content Using Drush on Pantheon

You cannot use `drush sql-sync` on Pantheon, but you can use [drush sql-sync-pipe](https://www.drupal.org/project/drush_sql_sync_pipe). If that option doesn't appeal to you, download a copy of the database from a backup and save it to your local disk, then use `gunzip` and `mysql` to decompress and import the dump.
```sql
gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
```
## Timeouts When Using Long-Running Migrate or Other Drush Commands

Long-running Drush commands that produce no output will cause the SSH gateway to timeout. Instead, use an option to produce some sort of terminal response.  

For example, if a [migrate](https://drupal.org/project/migrate) command such as migrate-rollback is disconnecting, use the feedback option to produce output:
```bash
--feedback="1000 items"
```
See the [migrate Drush documentation](https://drupal.org/node/1561820) for details.

## Drush Commands with Known Issues

The following Drush commands are not supported and will not work on Pantheon sites:

`sql-sync`  
`sql-sqlc`  
`php-eval`

As an alternative to `drush sql-sync` you can use `drush sql-dump` instead.

## Drush Commands That Alter Site Code

Commands that alter site code, such as pm-download (dl), will only work on a Dev environment that has been set to [SFTP mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/) from the Pantheon Dashboard.

## Add Custom Drush Commands

While we have the full spectrum of Drush core already available for your use, you may want to add a command that you regularly use; for instance, [Drush Search and Replace (sar)](https://www.drupal.org/project/sar).

1. Put the site in Git mode.
2. Clone locally.
3. Create a Drush folder in the Drupal root.
4. Add the “sar” Drush command to the Drush folder.
5. Commit drush/sar.
6. Push your code up to master.
7. Deploy to Test and Live.
8. Download your Pantheon [Drush aliases](https://pantheon.io/blog/drush-aliases-available).
9. Clear your Drush cache on each environment. Example: `drush @pantheon.<site-name>.dev cc drush`

If you have successfully set up [Terminus](/docs/articles/local/cli/), the Pantheon CLI, you can get your Drush aliases by using `terminus sites aliases`. At this point, you are able to start using the Drush command you added.  Drush 8 is the default version for newly created sites on Pantheon.

## Drush Alias Strict Control
Create a file called `policy.drush.inc`, and place in in the `.drush` folder of your home directory.  You can create a new file or use the example policy file in Drush’s `examples` folder to get started.

If your live site is associated with multiple domains, Pantheon will select an arbitrary one to include in the alias file that you download from the Dashboard. In some instances, it can cause problems in Drupal if the wrong URI is used, and Drush will not allow you to override the URI value in the alias with a command line `--uri` option. To avoid editing the generated Pantheon aliases file every time it is downloaded, use a `hook_drush_sitealias_alter` function in `policy.drush.in` to change the URI for your specific Pantheon site:
```
function policy_drush_sitealias_alter(&$alias_record) {
  // Provide the correct 'uri' for a specific site
  if ($alias_record['#name'] == 'pantheon.SITENAME.live') {
    $alias_record['uri'] = 'example.com';
  }
}
```
Replace `SITENAME` with your Pantheon site name, and `example.com` with the correct URI for that site.

For the next example, we will write a policy file that changes all remote aliases to use Drush 7 instead of the default version of Drush, but only if the target is the Pantheon platform.  Our `hook_drush_sitealias_alter` function looks like this:

```
function policy_drush_sitealias_alter(&$alias_record) {
  // Fix pantheon aliases!
  if ( isset($alias_record['remote-host']) &&
      (substr($alias_record['remote-host'],0,10) == 'appserver.') ) {
    $alias_record['path-aliases']['%drush-script'] = 'drush7';
  }
}
```
With this policy file in place, you are able to use the latest version of Drush on Pantheon:

    $ drush @pantheon.my-great-site.dev version
    Drush Version   :  7.0.0-rc1

For more information, see [Fix Up Drush Site Aliases with a Policy File](https://pantheon.io/blog/fix-drush-site-aliases-policy-file).

## Use Drush to Update Modules on Pantheon

First, make sure the Dev environment is set to [SFTP mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/) and then run:
```bash
drush @pantheon.SITENAME.dev up --no-core
```
## Do Not Use Drush to Update Drupal Core on Pantheon

Pantheon uses Pressflow and includes some additional functionality; Drush assumes that a site is using vanilla Drupal and erroneously overwrites Pressflow. In short, **do not use Drush to update Drupal core on Pantheon**. For more details, see the [Core Updates](/docs/articles/sites/code/applying-upstream-updates/) article.

## Troubleshooting

If you experience problems with any Drush commands, try executing them with the `-vd` options, for more verbose debugging information. While we can't support local Drush installations or aliases, you can ask about your specific configuration in the [community forum.](http://drupal.stackexchange.com/questions/tagged/drush)

### Drush Commands on Remote Aliases Not Working from Inside Local Drupal Install

Some Drush 5 commands need to be executed from outside the context of a local Drupal installation, due to a [known issue with Drush 5](https://github.com/drush-ops/drush/issues/313). The output from a Drush 5 command run in this context looks like the following:
```nohighlight
$ drush @pantheon.SITENAME.ENV status
 PHP configuration : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/php53.in
                        i
                        /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/php53.in
                        i
 Drush version : 5.10.1
 Drush : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/drushrc.
 configuration php
```
To make your Drush 5 commands work on Pantheon aliases, change your directory to a context outside of a working local Drupal installation:
```nohighlight
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
 Drush version : 5.10.1
 Drush configuration : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/drus
                           hrc.php
 Drupal root : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/code
 Site path : sites/default
 File directory path : sites/default/files
 Private file : sites/default/files/private
 directory path
 Temporary file : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/tmp
 directory path
```
### Drush Error: "Unknown option: --db-url"
```nohighlight
$ drush @pantheon.SITENAME.ENV cc all
Unknown option: --db-url. See `drush help cache-clear` for available [error]
options. To suppress this error, add the option --strict=0.
```
To resolve this error, follow the suggestion and add the option `--strict=0`.
```nohighlight
$ drush @pantheon.SITENAME.ENV cc all --strict=0
'all' cache was cleared in [success]
/srv/bindings/BINDINGID/code#ENV-SITENAME.pantheon.io
```
### Drush Error: "No Drupal site found", "Could not find a Drupal settings.php file", or missing system information from status

```bash
Could not find a Drupal settings.php file at ./sites/default/settings.php
```

To resolve, add a default or empty `sites/default/settings.php` to your site's code.

### Unable to Connect to drush.in Hostnames (DNS)

Some ISPs have issues resolving a drush.in hostname; if you're having trouble connecting to a drush.in hostname, you can use the `dig` command to investigate further.
```nohighlight
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
```
As you can see in the output above, the status: REFUSED suggests improper resolution. The next step is to run `dig` with a specified DNS server. We recommend using Google's DNS (8.8.8.8):
```nohighlight
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
```
In this example, Google's DNS is able to properly resolve the drush.in hostname.

You can adjust your local settings to use Google's DNS (8.8.8.8) instead of the default provided by your ISP to properly resolve the hostnames.

## Crontab

Currently, there is no way to manage Crontab on Pantheon. If you need a way to set up your own Cron interval, you can use an external cron service such as [Easy Cron](https://www.easycron.com/user/register).

## Known Limitations
- [Migrate's support for spawning Drush processes](https://drupal.org/node/1958170) to facilitate batch migrations is not supported on Pantheon.
- Incorrect `['uri']` in `pantheon.aliases.drushrc.php` file. Drush may fail if the `['uri']` array key has a different domain than what is expected by Drupal, resulting in the following error:

 ```bash
 drush @pantheon.example.live  st
 Drush command terminated abnormally due to an unrecoverable error.       [error]
 ```
 Setting the `--uri` option will not work. To resolve this error, use a [Drush policy file](#drush-alias-strict-control).
