---
title: Using WP-CLI On The Pantheon Platform
description: Administer and maintain your WordPress site on Pantheon using the command-line.
tags: [devwpcli]
categories: [wordpress]
---

[WP-CLI](http://wp-cli.org/) is a command-line interface to WordPress. It provides a [wide range of utilities](http://wp-cli.org/commands/) for managing your WordPress site. Virtually any action you can perform through the WordPress admin, you can also do with WP-CLI.

To use WP-CLI on the Pantheon Platform, you'll first need to install [Terminus](/docs/terminus/) on your local machine. Terminus is a command-line interface for managing your Pantheon sites, and is used to proxy commands from your local machine to your Pantheon environment.

Once you've installed Terminus locally, and verified it's working correctly, you're ready to use WP-CLI. However, if you haven't already, you may want to consider [installing WP-CLI locally](http://wp-cli.org/#install) for use in your local environment.

## Getting Started With WP-CLI

When working on the command-line, it's worth remembering the adage: "with great power comes great responsibility". WP-CLI will let you perform incredible operations on your WordPress site (including dropping your database), for better or for worse. Only you know the true intention of the command you're invoking.

Before you use WP-CLI for the first time, here are a few [global parameters](http://wp-cli.org/config/) you should be aware of:

* `--path=<path>` - Specify the path to WordPress. If this parameter isn't provided, WP-CLI will look upward from its current directory to attempt to find WordPress.
* `--url=<url>` - Identify the request as from given URL. In WordPress Site Networks, this argument is how the target site is specified.
* `--user=<id|login|email>` - Run the command as a particular user. By default, WP-CLI commands are executed anonymously.

Each of these global parameters define the **context** under which the command is run. They are important pre-condition statements to WordPress of how it should understand the request.

Now that we've covered the most important basics, let's run a command:

    $ terminus wp pantheon-demo.dev -- option get home
    [2015-11-25 02:42:12] [info] Running wp option get home  on pantheon-demo
        cmd: 'option get home'
        flags: ''
        site: 'pantheon-demo'
        env: 'dev'
    http://pantheon-demo.pantheonsite.io

From the example above:

* `terminus wp` tells Terminus we'd like to execute a WP-CLI command.
* `option get` is the command itself ([docs](http://wp-cli.org/commands/option/get/)). `home` is the key for the option we're requesting.
* `<site>` and `<env>` tell Terminus which site and environment to run the command in, respectively. These arguments can be provided automatically if you execute Terminus commands from a directory containing a [`.env`](https://github.com/pantheon-systems/cli/blob/master/.env.example) file.

The first part of the output is Terminus telling you which command it's running, and where. The last line, "http://pantheon-demo.pantheonsite.io", is the response of `wp option get`.

Feeling comfortable with WP-CLI? Here are a [few of many commands](http://wp-cli.org/commands/) you may find helpful in your journeys:

* `wp search-replace` - Search for and replace specific strings in the database. Use `--dry-run` to perform a test run of the operation, and see how it will affect your database ([docs](http://wp-cli.org/commands/search-replace/)).
* `wp media regenerate` - Regenerate image thumbnails for one or more attachments ([docs](http://wp-cli.org/commands/media/regenerate/)).
* `wp rewrite flush` - Flush rewrite rules to ensure newly registered rules are stored in the database ([docs](http://wp-cli.org/commands/rewrite/flush/)).

## Extending WP-CLI With Subcommands

WP-CLI has a framework for users to write their own commands. Learn about the [anatomy of a subcommand](https://github.com/wp-cli/wp-cli/wiki/Commands-Cookbook#anatomy) to solve your thorny problems with WP-CLI.


## Troubleshooting

### Terminus WP-CLI Silent Failure
The following silent failure occurs when executing `terminus remote:wp` commands on environments that use redirect logic without checking to see if WordPress is running via the command line:

```bash
[notice] Command: <site>.<env> -- 'wp <command>' [Exit: 0]
```

Redirects kill the PHP process before WP-CLI is executed. You can resolve this error by adding `php_sapi_name() != "cli"` as a conditional statement to all redirect logic within `wp-config.php`:

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
