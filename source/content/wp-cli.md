---
title: Using WP-CLI On The Pantheon Platform
description: Administer and maintain your WordPress site on Pantheon using the command-line.
cms: "WordPress"
categories: [develop]
tags: [wp-cli, cli]
reviewed: "2020-01-03"
---

[WP-CLI](https://make.wordpress.org/cli/handbook/) is a command-line interface to WordPress. It provides a [wide range of utilities](https://developer.wordpress.org/cli/commands/) for managing your WordPress site. Virtually any action you can perform through the WordPress admin, you can also do with WP-CLI.

To use WP-CLI on the Pantheon Platform, you'll first need to install [Terminus](/terminus) on your local machine. Terminus is a command-line interface for managing your Pantheon sites, and is used to proxy commands from your local machine to your Pantheon environment.

Once you've installed Terminus locally, and verified it's working correctly, you're ready to use WP-CLI. However, if you haven't already, you may want to consider [installing WP-CLI locally](https://make.wordpress.org/cli/handbook/installing/) for use in your local environment.

If you have a [Composer-based site](/composer), Terminus will use the version of WP-CLI that it finds in `vendor/wp-cli` when running WP-CLI commands on the platform.

<Alert title="Exports" type="export">

This doc demonstrates [Terminus](/terminus) commands which require site and environment values. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment, so that the example commands will work in your local terminal:

```bash{promptUser: user}
export site=yoursitename
export env=dev # Or a multidev test environment
```

</Alert>

## Getting Started With WP-CLI

When working on the command-line, it's worth remembering the adage: "with great power comes great responsibility". WP-CLI will let you perform incredible operations on your WordPress site (including dropping your database), for better or for worse. Only you know the true intention of the command you're invoking.

Before you use WP-CLI for the first time, here are a few [global parameters](https://make.wordpress.org/cli/handbook/config/) you should be aware of:

* `--path=<path>` - Specify the path to WordPress. If this parameter isn't provided, WP-CLI will look upward from its current directory to attempt to find WordPress.
* `--url=<url>` - Identify the request as from given URL. In WordPress Site Networks, this argument is how the target site is specified.
* `--user=<id|login|email>` - Run the command as a particular user. By default, WP-CLI commands are executed anonymously.

Each of these global parameters define the **context** under which the command is run. They are important pre-condition statements to WordPress of how it should understand the request.

Now that we've covered the most important basics, let's run a command:

```bash{outputLines:2-7}
terminus wp $site.$env -- option get home
  [2015-11-25 02:42:12] [info] Running wp option get home  on pantheon-demo
      cmd: 'option get home'
      flags: ''
      site: 'pantheon-demo'
      env: 'dev'
  https://pantheon-demo.pantheonsite.io
```

From the example above:

* `terminus wp` tells Terminus we'd like to execute a WP-CLI command.
* `option get` is the command itself ([docs](https://developer.wordpress.org/cli/commands/option/get/)). `home` is the key for the option we're requesting.
* `$site` and `$env` tell Terminus which site and environment to run the command in, respectively. These arguments can be provided automatically if you execute Terminus commands from a directory containing a [`.env`](https://github.com/pantheon-systems/cli/blob/master/.env.example) file.

The first part of the output is Terminus telling you which command it's running, and where. The last line, `https://pantheon-demo.pantheonsite.io`, is the response of `wp option get`.

Feeling comfortable with WP-CLI? Here are a [few of the many commands](https://developer.wordpress.org/cli/commands/) you may find helpful in your journeys:

* `wp search-replace` - Search for and replace specific strings in the database. Commonly used to correct references to [platform domains](/database-workflow/#troubleshooting). Use `--dry-run` to perform a test run of the operation, and see how it will affect your database ([developer docs](https://developer.wordpress.org/cli/commands/search-replace)).
* `wp media regenerate` - Regenerate image thumbnails for one or more attachments ([developer docs](https://developer.wordpress.org/cli/commands/media/regenerate/)).
* `wp rewrite flush` - Flush rewrite rules to ensure newly registered rules are stored in the database ([developer docs](https://developer.wordpress.org/cli/commands/rewrite/flush/)).

## Run SQL Queries Using WP-CLI on Pantheon

Use the `wp db query` command via [Terminus](/terminus) to run SQL queries against the database on Pantheon:

```bash{promptUser: user}
terminus wp $site.$env -- db query "SELECT * FROM wp_users WHERE ID=1"
```

## Execute PHP Code Using WP-CLI on Pantheon

The [`wp eval`](https://developer.wordpress.org/cli/commands/eval/) command is not supported on Pantheon, but you can still run the interactive shell [`wp shell`](https://developer.wordpress.org/cli/commands/eval/) to execute PHP commands:

```bash
terminus wp $site.$env -- shell
var_dump($_ENV);
```

## Extending WP-CLI With Subcommands

WP-CLI has a framework for users to write their own commands. Learn about the [anatomy of a subcommand](https://make.wordpress.org/cli/handbook/commands-cookbook/#anatomy-of-a-command) to solve your thorny problems with WP-CLI.

Keep in mind that WP-CLI commands are subject to platform PHP memory limits, which are optimized for serving webpages and not necessarily running development tools. Commands that utilize Composer, such as `wp package install`, are generally best run on your local machine or on a CI service.

## Troubleshooting

### Terminus WP-CLI Silent Failure

The following silent failure occurs when executing `terminus remote:wp` commands on environments that use redirect logic without checking to see if WordPress is running via the command line:

```bash
[notice] Command: $site.$env -- 'wp <command>' [Exit: 0]
```

Redirects kill the PHP process before WP-CLI is executed. You can resolve this error by adding `php_sapi_name() != "cli"` as a conditional statement to all redirect logic within `wp-config.php`:

```php:title=wp-config.php
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
