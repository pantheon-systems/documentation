---
title: Drupal Drush Command-Line Utility
description: Administer and maintain your Pantheon site from your local Drupal Drush installation.
tags: [devdrush]
categories: [drupal]
---
[Drush](http://drush.org) is a command-line interface for Drupal that provides a wide set of utilities for administering and maintaining your site.

Drush commands require a `settings.php` file, and it's a best practice to have one. Drupal 8 sites come with a bundled `settings.php` file out of the box. Drupal 6 and 7 sites do not contain a `settings.php` file; however, you can simply copy the `sites/default/default.settings.php` to `sites/default/settings.php` via [SFTP](/docs/sftp) or [Git](/docs/git) for Drush to work on older Drupal versions. For more details, see [Configuring Settings.php](/docs/settings-php/).

## Terminus Drush and Local Drush
Refer to Drush's [install documentation](http://docs.drush.org/en/master/install/) for details on installing Drush locally.

Drush-savvy developers should also install and utilize [Terminus](/docs/terminus/), a command-line interface that allows you to control your Pantheon account and sites. Virtually anything you can do in the Dashboard, you can script with Terminus. It can also make remote Drush calls on your environments without having Drush installed locally, eliminating incompatibility issues between locally and remotely installed versions of Drush.

You can run all of the commands below from Terminus instead of using Drush aliases. For more information, see [Managing Drupal Sites with Terminus and Drush](/docs/guides/terminus-drupal-site-management/).

## Drush Versions
For details on managing remote and local Drush versions, see [Managing Drush Versions on Pantheon](/docs/drush-versions).

## Download Drush Aliases Locally
Downloading the Pantheon aliases to your local Drush aliases file allows you to run Drush calls against your Pantheon site environments.

There are two ways to obtain the aliases, either with Terminus or through the Dashboard.

### Download with Terminus, the Pantheon CLI
Authenticate Terminus with [machine tokens](/docs/machine-tokens/) or your Pantheon Dashboard credentials, then update your local aliases file in a single step:
```nohighlight
$ terminus aliases --print --location=<location>
```
### Download Using the Dashboard
Download your Pantheon site aliases to manually update your local aliases file:

1. From your Pantheon User Dashboard, click **Sites** > **Download all Drush aliases**
2. Move the generated `pantheon.aliases.drushrc.php` into your local drush root directory (e.g. `$HOME/.drush`).
3. Clear Drush cache:

 ```
 drush cc drush
 ```

![Link to Pantheon Drush Aliases](/source/docs/assets/images/dashboard/drush-aliases.png)
If you add a site to your account, you will have to download a new copy of your Drush aliases.

### List Available Site Aliases
Once the Pantheon Drush aliases have been copied, verify that the site aliases are available by listing every site alias known to Drush:
```
$ drush sa
```
<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>You must be a <a href="/docs/team-management/#manage-site-team-members">site team member</a> of the site for it to be included within your local alias file. Organization administrators will not see all associated sites within their alias file, but only sites for which they are site team members. The alternative is to execute Drush commands via <a href="/docs/terminus">Terminus</a> for sites in which you are not a direct site team member.
</p></div>
## Execute a Drush Command on a Pantheon Site Environment
Once you see the target site in the list of site aliases, you can execute a command on any remote site listed. The syntax is:  
```
drush @pantheon.SITENAME.ENV COMMAND
```

For example, to see the status of a site:

```nohighlight
drush @pantheon.drupal-7-sandbox.dev status
Drupal version : 7.10
Site URI : dev.drupal-7-sandbox.pantheonsite.io
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

Drush is the fastest way to install a suite of modules or themes into your Pantheon project. Make sure your Dev or Multidev environment is in SFTP mode, allowing Drush to write new files, then use the `dl` command:

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

<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p><strong>Do not use Drush to update Drupal core on Pantheon</strong>. Pantheon uses Pressflow and includes some additional functionality; Drush assumes that a site is using vanilla Drupal and erroneously overwrites Pressflow. For more details, see <a href="/docs/upstream-updates">Core Updates</a>.
</p>
</div>

## Use Registry Rebuild on Pantheon

Drupal's list of PHP classes and files can get corrupted or out-of-date, typically when moving code. If clearing the cache doesn't resolve the issue due to a required class during bootstrap, the registry may need to be rebuilt. To facilitate this, Pantheon has installed [`registry_rebuild`](https://drupal.org/project/registry_rebuild) as an available Drush command on every site. **Do not attempt to install the module on your site.** This command is provided as-is, without warranty, so make a backup first.  

To rebuild the registry of a site, create a backup from your Dashboard, then run:  
```
drush @pantheon.SITENAME.ENV rr
```

## Use Site Audit on Pantheon

[Site Audit](https://drupal.org/project/site_audit) is a collection of Drush commands that analyze a site for compliance with Drupal best practices. Originally designed to provide an actionable report prior to load testing and launch, each report is read using Drush or written as HTML to a file. Site Audit currently only supports Drupal 7 sites.  

To see all the Site Audit commands on Pantheon, use:  
```
drush @pantheon.SITENAME.ENV help --filter=site_audit
```

To run the best practices report on Pantheon:
```
drush @pantheon.SITENAME.ENV --detail abp
```

To check caching settings on Pantheon (we recommend that you disable page compression):
```
drush @pantheon.SITENAME.ENV --vendor=pantheon --detail ac
```

## Transfer Files Using rsync and Drush

Pantheon provides [rsync](/docs/rsync-and-sftp/) as an option for transferring the contents of `sites/default/files` to and from Pantheon.

```bash
# Sync files from local to Pantheon site environment.
drush -r . rsync @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
# Sync files from Pantheon site environment to local.
drush -r . rsync @pantheon.SITENAME.ENV:%files @self:sites/default/
```
## Export a Local Database Using Drush

Use the `sql-dump` to quickly export your database. Clear your caches first to save space.
```bash
drush cc all
drush sql-dump --gzip --result-file=$HOME/Desktop/db_$(date +"%Y-%m-%d").sql
```
## Transfer Database Content Using Drush on Pantheon

The `drush sql-sync` command works on Pantheon with Drush 8 as of version 8.0.4. An alternative would be to use `drush sql-dump` and `drush sql-connect` to transfer the database over a pipe:

```bash
drush @pantheon.SITENAME.FROM_ENV sql-dump | $(drush @pantheon.SITENAME.TO_ENV sql-connect)
```
If that option doesn't appeal to you, download a copy of the database from a backup and save it to your local disk, then use `gunzip` and `mysql` to decompress and import the dump.
```sql
gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
```

## Run SQL Queries Using Drush on Pantheon

The `drush sql-cli` command is not supported on Pantheon. You can open the MySQL CLI on Pantheon via the following command:
```bash
$(drush @pantheon.SITENAME.ENV sql-connect)
```
Alternately, to run a single SQL query:
```bash
echo 'show tables;' | $(drush @pantheon.SITENAME.ENV sql-connect)
```

## Execute PHP Code Using Drush on Pantheon

The `drush php-eval` command is not supported on Pantheon. You can run PHP commands after bootstrapping Drupal on Pantheon via the following workaround:
```bash
echo 'print "hello world";' | drush @pantheon.SITENAME.ENV php-script -
```
Also, the interactive PHP shell works as well:
```bash
terminus drush <site>.<env> -- core-cli
```

## Drush Commands That Alter Site Code

Commands that alter site code, such as pm-download (dl), will only work on a Dev environment that has been set to [SFTP mode](/docs/sftp/) from the Pantheon Dashboard.

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
9. Clear your Drush cache on each environment. Example:

 ```
 drush @pantheon.SITENAME.dev cc drush
 ```

If you have successfully set up [Terminus](/docs/terminus/), you can get your Drush aliases by using `terminus aliases`. At this point, you are able to start using the Drush command you added.  Drush 8 is the default version for newly created sites on Pantheon.

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

## Use Drush to Update Modules on Pantheon

First, make sure the Dev environment is set to [SFTP mode](/docs/sftp/) and then run:

```
drush @pantheon.SITENAME.dev up --no-core
```

## Troubleshooting

If you experience problems with any Drush commands, try executing them with the `-vd` options, for more verbose debugging information. While we can't support local Drush installations or aliases, you can ask about your specific configuration in the [community forum.](http://drupal.stackexchange.com/questions/tagged/drush)

### Terminus Drush Silent Failure
The following silent failure occurs when executing `terminus remote:drush` commands on environments that use redirect logic without checking to see if Drupal is running via the command line:

```bash
[notice] Command: <site>.<env> -- 'drush <command>' [Exit: 1]
[error]
```

Redirects kill the PHP process before Drush is executed. You can resolve this error by adding `php_sapi_name() != "cli"` as a conditional statement to all redirect logic within `settings.php`:

```php
// Require HTTPS, www.
if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
  ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live') &&
  // Check if Drupal or WordPress is running via command line
  (php_sapi_name() != "cli")) {
  if ($_SERVER['HTTP_HOST'] != 'www.yoursite.com' ||
      !isset($_SERVER['HTTP_X_SSL']) ||
      $_SERVER['HTTP_X_SSL'] != 'ON' ) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://www.yoursite.com'. $_SERVER['REQUEST_URI']);
    exit();
  }
}
```

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
 Site URI : ENV-SITENAME.pantheonsite.io
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
To resolve this error, follow the suggestion and add the option `--strict=0`:
```nohighlight
$ drush @pantheon.SITENAME.ENV cc all --strict=0
'all' cache was cleared in [success]
/srv/bindings/BINDINGID/code#ENV-SITENAME.pantheonsite.io
```
### Drush Error: "No Drupal site found", "Could not find a Drupal settings.php file", or missing system information from status

```bash
Could not find a Drupal settings.php file at ./sites/default/settings.php
```

To resolve, add a default or empty `sites/default/settings.php` to your site's code.

### Unable to Connect to MySQL Server

Sometimes, you may encounter the following error when running Drush MySQL commands:
```nohighlight
ERROR 2003 (HY000): Can't connect to MySQL server on 'dbserver.dev.SITE_ID.drush.in' (61)
```
This can happen when an inactive site has spun down. To resolve this error, wake environments by loading the home page or with the following [Terminus](/docs/terminus) command:
```nohighlight
terminus env:wake SITENAME.ENV
```
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
As you can see in the output above, the status REFUSED suggests improper resolution. The next step is to run `dig` with a specified DNS server. We recommend using Google's DNS (8.8.8.8):
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

### Timeouts When Using Long-Running Migrate or Other Drush Commands

Long-running Drush commands that produce no output will cause the SSH gateway to timeout. Instead, use an option to produce some sort of terminal response. For example, if a [migrate](https://drupal.org/project/migrate) command such as `migrate-rollback` is disconnecting, use the `--feedback` option to produce output.

See the [Drush Migrate documentation](https://drupal.org/node/1561820) for details.

## Known Limitations
- Crontab: Currently, there is no way to manage Crontab on Pantheon. If you need a way to set up your own Cron interval, you can use an external cron service such as [Easy Cron](https://www.easycron.com/user/register).
- The following Drush commands are not supported and will not work on Pantheon sites:
  - `sql-sync-pipe` See: [Transfer Database Content Using Drush on Pantheon](#transfer-database-content-using-drush-on-pantheon)
  - `sql-cli` (`sqlc`) and `sql-query` (`sqlq`) See: [Run SQL Queries Using Drush on Pantheon](#run-sql-queries-using-drush-on-pantheon)
  - `php-eval` (`eval`, `ev`) See: [Execute PHP Code Using Drush on Pantheon](#execute-php-code-using-drush-on-pantheon)
- Drush may fail if the `['uri']` array key has a different domain than what is expected by Drupal, resulting in the following error:

 ```bash
 drush @pantheon.example.live  st
 Drush command terminated abnormally due to an unrecoverable error.       [error]
 ```
 To resolve this error, conditionally set `$uri` based on the environment in `drushrc.php`, such as:

 ```
   if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
     ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live')) {
       $uri = 'https://www.example.com';
     }
   }
   $options['uri'] = $uri;
 ```

 The most reliable locations to put `drushrc.php` files are:

 ```
 __ROOT__/drush/drushrc.php
 __ROOT__/../drush/drushrc.php
 __ROOT__/sites/all/drush/drushrc.php
 ```
