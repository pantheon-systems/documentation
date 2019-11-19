---
title: Drupal Drush Command-Line Utility
description: Administer and maintain your Pantheon site from your local Drupal Drush installation.
tags: [devdrush]
categories: [drupal]
---
[Drush](https://github.com/drush-ops/drush) is a command-line interface for Drupal that provides a wide set of utilities for administering and maintaining your site.

Drush commands require a `settings.php` file, and it's a best practice to have one. Drupal 8 sites come with a bundled `settings.php` file out of the box. Drupal 6 and 7 sites do not contain a `settings.php` file; however, you can simply copy the `sites/default/default.settings.php` to `sites/default/settings.php` via [SFTP](/sftp) or [Git](/git) for Drush to work on older Drupal versions. For more details, see [Configuring Settings.php](/settings-php/).

## Terminus Drush and Local Drush
Refer to Drush's [install documentation](http://docs.drush.org/en/master/install/) for details on installing Drush locally.

Drush-savvy developers should also install and utilize [Terminus](/terminus/), a command-line interface that allows you to control your Pantheon account and sites. Virtually anything you can do in the Dashboard, you can script with Terminus. It can also make remote Drush calls on your environments without having Drush installed locally, eliminating incompatibility issues between locally and remotely installed versions of Drush.

You can run all of the commands below from Terminus instead of using Drush aliases. For more information, see [Managing Drupal Sites with Terminus and Drush](/guides/terminus-drupal-site-management/). For example, you can run `terminus drush <site>.<env> -- cc drush` instead of `drush @pantheon.SITENAME.dev cc drush`.

## Drush Versions
For details on managing remote and local Drush versions, see [Managing Drush Versions on Pantheon](/drush-versions).

## Download Drush Aliases Locally
Downloading the Pantheon aliases to your local Drush aliases file allows you to run Drush calls against your Pantheon site environments. Use [Terminus](/terminus/) to download your Drush aliases.

Authenticate Terminus with [machine tokens](/machine-tokens/) or your Pantheon Dashboard credentials, then update your local aliases file in a single step:

```bash
terminus aliases
```

This command will write both Drush 8 and Drush 9 aliases into the directory `$HOME/.drush` for your sites that you are a direct member of. To create aliases for all sites that you can use, including sites that you have access to via team membership, run:

```bash
terminus aliases --all
```

If you add a site to your account, you will have to download a new copy of your Drush aliases. You do not need to update your Drush aliases when you add new mulitdev environments to your sites.

<Alert type="info" title="Note">

You must use Drush 8.3.0 or 9.6.0 or later to use Drush aliases directly. Earlier versions are not compatible.

</Alert>

### Structure of Site Aliases

The form Pantheon Drush aliases take depends on the version of Drush being used. Drush 8 aliases are all written to a single file, `$HOME/.drush/pantheon.aliases.drushrc.php`. A single alias record looks something like the example below:

```php
$aliases['example.*'] = array(
  'uri' => '${env-name}-example.pantheonsite.io',
  'remote-host' => 'appserver.${env-name}.3eb7b5dd-8b90-4272-8a80-5474015c37f1.drush.in',
  'remote-user' => '${env-name}.3eb7b5dd-8b90-4272-8a80-5474015c37f1',
  'ssh-options' => '-p 2222 -o "AddressFamily inet"',
  'path-aliases' => array(
    '%files' => 'files',
    '%drush-script' => 'drush',
   ),
);
```

Drush 9 aliases are written one file per site to the directory `$HOME/.drush/sites/pantheon`. The site name is used to generate the filename, e.g. `example.site.yml`. The contents of a Drush 9 alias file looks something like the following example:

```yaml
'*':
  host: appserver.${env-name}.3eb7b5dd-8b90-4272-8a80-5474015c37f1.drush.in
  paths:
    files: files
    drush-script: drush9
  uri: ${env-name}-example.pantheonsite.io
  user: ${env-name}.3eb7b5dd-8b90-4272-8a80-5474015c37f1
  ssh:
    options: '-p 2222 -o "AddressFamily inet"'
    tty: false
```

<Alert type="info" title="Note">

You must be a [site team member](/team-management/#manage-site-team-members) of the site for it to be included within your local alias file. Organization administrators will not see all associated sites within their alias file, but only sites for which they are site team members. The alternative is to execute Drush commands via [Terminus](/terminus) for sites in which you are not a direct site team member.

</Alert>

Note that these are both "wildcard" aliases. The same wildcard alias is used for every environment available for a given site. The variable `${env-name}` is replaced with the appropriate environment name when used.

Pantheon also uses "policy files" to validate aliases before they are used. The policy files are written by the `terminus aliases` command; the Drush 8 policy file is written to `$HOME/.drush/pantheon/drush8/pantheon_policy.drush.inc`, and the Drush 9 policy file is written to `$HOME/.drush/pantheon/Commands/PantheonAliasPolicyCommands.php`. These files should not be deleted.

### List Available Site Aliases
Once the Pantheon Drush aliases have been copied, verify that the site aliases are available by listing every site alias known to Drush:

```bash
drush sa
```
## Execute a Drush Command on a Pantheon Site Environment
Once you see the target site in the list of site aliases, you can execute a command on any remote site listed. The syntax is:  

```bash
drush @pantheon.SITENAME.ENV COMMAND
```

<Alert title="Warning" type="danger">

**Do not use Drush to update Drupal core on Pantheon**. Pantheon uses Pressflow and includes some additional functionality; Drush assumes that a site is using vanilla Drupal and erroneously overwrites Pressflow. For more details, see [Core Updates](/core-updates).

</Alert>

### Registry Rebuild

<Alert title="Note" type="info" >

[Registry Rebuild ](https://www.drupal.org/project/registry_rebuild) is [deprecated](https://www.drupal.org/project/registry_rebuild/issues/1785672) for Drupal 8 and will only work on Drupal 7.

</Alert>

Drupal's list of PHP classes and files can get corrupted or out-of-date, typically when moving code. If clearing the cache doesn't resolve the issue due to a required class during bootstrap, the registry may need to be rebuilt. To facilitate this, Pantheon has installed [`registry_rebuild`](https://drupal.org/project/registry_rebuild) as an available Drush command on every site, which can be executed via [Terminus](/terminus/).

**Do not attempt to install the module on your site.** This command is provided as-is, without warranty, so make a backup first.  

```bash
terminus drush <site>.<env> -- rr
```

Note that the Registry Rebuild command is only ever necessary on Drupal 7 and Drupal 6 sites. The command `drush cache:rebuild` for Drupal 8 serves the same function that `registry rebuild` does for older versions of Drupal.

## Run SQL Queries Using Drush on Pantheon

The `drush sql-cli` and `drush sql-connect` commands are not supported on Pantheon. For security reasons, the SQL database is not directly accessible from your local machine.

You can, however, use Terminus as follows:

```bash
echo 'SELECT * FROM users WHERE uid=1;' | terminus drush SITENAME.ENV sql:cli
```

Note that certain characters such as `;` cannot be used in the query. If you use an illegal character, you will get an error message "Command not supported as typed."

Note that the trailing `;` in the SQL query is optional in this context.

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

Commands that alter site code, such as pm-download (dl), will only work on a Dev environment that has been set to [SFTP mode](/sftp/) from the Pantheon Dashboard.

## Add Custom Drush Commands

While we have the full spectrum of Drush core already available for your use, you may want to add a command that you regularly use; for instance, [Drush Search and Replace (sar)](https://www.drupal.org/project/sar).

1. Put the site in Git mode.
1. Clone locally.
1. Create a `drush` folder in the Drupal root.
1. Add the “sar” Drush command to the Drush folder.
1. Commit drush/sar.
1. Push your code up to Pantheon.
1. Clear your Drush cache on each environment. Example:

   ```bash
   drush @pantheon.SITENAME.dev cc drush
   ```

For Drupal 9, place Drush commands in `drush/Commands`.


## Drush Alias Strict Control
Create a file called `policy.drush.inc`, and place in in the `.drush` folder of your home directory.  You can create a new file or use the example policy file in Drush’s `examples` folder to get started.

If your live site is associated with multiple domains, Pantheon will select an arbitrary one to include in the alias file that you download from the Dashboard. In some instances, it can cause problems in Drupal if the wrong URI is used, and Drush will not allow you to override the URI value in the alias with a command line `--uri` option. To avoid editing the generated Pantheon aliases file every time it is downloaded, use a `hook_drush_sitealias_alter` function in `policy.drush.inc` to change the URI for your specific Pantheon site:

```
function policy_drush_sitealias_alter(&$alias_record) {
  // Provide the correct 'uri' for a specific site
  if ($alias_record['#name'] == 'pantheon.SITENAME.live') {
    $alias_record['uri'] = 'example.com';
  }
}
```

Replace `SITENAME` with your Pantheon site name, and `example.com` with the correct URI for that site.


## Troubleshooting

### Reading the Pantheon Environment from Drush

Since Drush does not run via the web server, reliance on the `$_SERVER` superglobal is problematic as some of the contents of that array will be missing, `['PANTHEON_ENVIRONMENT']` in particular. Drush commands and policy files should instead reference `$_ENV` when reading Pantheon environment information. For more information, please see our documentation on [using the `$_SERVER` superglobal in custom code](/read-environment-config/#using-_server).

### Terminus Drush Silent Failure
The following silent failure occurs when executing `terminus drush` commands on environments that use redirect logic without checking to see if Drupal is running via the command line:

```bash
[notice] Command: <site>.<env> -- 'drush <command>' [Exit: 1]
[error]
```

Redirects kill the PHP process before Drush execution is complete. You can resolve this error by adding `php_sapi_name() != "cli"` as a conditional statement to all redirect logic within `settings.php`:

```php
// Require HTTPS, www.
if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
  ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') &&
  // Check if Drupal or WordPress is running via command line
  (php_sapi_name() != "cli")) {
  if ($_SERVER['HTTP_HOST'] != 'www.yoursite.com' ||
      !isset($_SERVER['HTTP_USER_AGENT_HTTPS']) ||
      $_SERVER['HTTP_USER_AGENT_HTTPS'] != 'ON' ) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://www.yoursite.com'. $_SERVER['REQUEST_URI']);
    exit();
  }
}
```

### Drush Commands on Remote Aliases Not Working from Inside Local Drupal Install

Some Drush 5 commands need to be executed from outside the context of a local Drupal installation, due to a [known issue with Drush 5](https://github.com/drush-ops/drush/issues/313). The output from a Drush 5 command run in this context looks like the following:

```bash
drush @pantheon.SITENAME.ENV status
 PHP configuration : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/php53.in
                        i
                        /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/php53.in
                        i
 Drush version : 5.10.1
 Drush : /srv/bindings/754cbef0a7b54a07ab07167ef8de7377/drushrc.
 configuration php
```

To make your Drush 5 commands work on Pantheon aliases, change your directory to a context outside of a working local Drupal installation:

```bash
pwd
/Users/USERNAME/Sites/SITENAME


cd ..


pwd
/Users/USERNAME/Sites/


drush @pantheon.SITENAME.ENV status
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

```bash
drush @pantheon.SITENAME.ENV cc all
Unknown option: --db-url. See `drush help cache-clear` for available [error]
options. To suppress this error, add the option --strict=0.
```

To resolve this error, follow the suggestion and add the option `--strict=0`:

```bash
drush @pantheon.SITENAME.ENV cc all --strict=0
'all' cache was cleared in [success]
/srv/bindings/BINDINGID/code#ENV-SITENAME.pantheonsite.io
```

This only affects Drupal 7 sites running a Drush version below Drush 8

### Drush Error: "No Drupal site found", "Could not find a Drupal settings.php file", or missing system information from status

```bash
Could not find a Drupal settings.php file at ./sites/default/settings.php
```

To resolve, add a default or empty `sites/default/settings.php` to your site's code.

### Unable to Connect to MySQL Server

Sometimes, you may encounter the following error when running Drush MySQL commands:

```
ERROR 2003 (HY000): Can't connect to MySQL server on 'dbserver.dev.SITE_ID.drush.in' (61)
```

This can happen when an inactive site has spun down. To resolve this error, wake environments by loading the home page or with the following [Terminus](/terminus) command:

```
terminus env:wake SITENAME.ENV
```

### Unable to Connect to drush.in Hostnames (DNS)

Some ISPs have issues resolving a drush.in hostname; if you're having trouble connecting to a drush.in hostname, you can use the `dig` command to investigate further.

```bash
dig appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in
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

```bash
dig @8.8.8.8 appserver.live.38f2bd91-0000-46cb-9278-0000000000000.drush.in
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

You can adjust your local settings to use Google's DNS (8.8.8.8 and 8.8.4.4) instead of the default provided by your ISP to properly resolve the hostnames.

### Timeouts When Using Long-Running Migrate or Other Drush Commands

Long-running Drush commands that produce no output will cause the SSH gateway to timeout. Pantheon's timeouts for SSH based commands are outlined in our [documentation on timeouts](https://pantheon.io/docs/timeouts/). To avoid a timeout related to a lack of output, be sure your commands return output to the terminal session in under 10 minutes.

### Drush error: Failed opening required .../vendor/bin/includes/preflight.inc

```
Fatal error: require(): Failed opening required '/srv/bindings/.../code/vendor/bin/includes/preflight.inc' (include_path='.:/usr/share/pear:/usr/share/php') in /srv/bindings/.../vendor/bin/drush.php on line 11
```

This indicates that the vendor directory contains Drush binaries that should be removed. Remove any Drush files from `vendor/bin` and `vendor/drush` using `git rm`.

## Known Limitations
- Crontab: Currently, there is no way to manage Crontab on Pantheon. If you need a way to set up your own Cron interval, you can use an external cron service such as [Easy Cron](https://www.easycron.com/user/register).
- The following Drush commands are not supported and will not work on Pantheon sites:
  - `sql-sync-pipe`. Use `sql-sync` instead.
  - `sql-cli` (`sqlc`) and `sql-query` (`sqlq`) See: [Run SQL Queries Using Drush on Pantheon](#run-sql-queries-using-drush-on-pantheon)
  - `php-eval` (`eval`, `ev`) See: [Execute PHP Code Using Drush on Pantheon](#execute-php-code-using-drush-on-pantheon)
- Due to our highly available architecture, Drush `sql-sync` cannot currently be executed on the live environment with more than 1 application container. We recommend you use terminus or `sql-sync` a multidev, dev or test environment which only has 1 application container.
- Drush may fail if the `['uri']` array key has a different domain than what is expected by Drupal, resulting in the following error:

 ```bash
 drush @pantheon.example.live  st
 Drush command terminated abnormally due to an unrecoverable error.       [error]
 ```
 To resolve this error, conditionally set `$uri` based on the environment in `drushrc.php`, such as:

 ```php
   if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
     ($_ENV['PANTHEON_ENVIRONMENT'] === 'live')) {
       $uri = 'https://www.example.com';
   }
   $options['uri'] = $uri;
 ```

 The most reliable locations to put `drushrc.php` files are:

 ```php
 __ROOT__/drush/drushrc.php
 __ROOT__/../drush/drushrc.php
 __ROOT__/sites/default/drushrc.php
 ```
