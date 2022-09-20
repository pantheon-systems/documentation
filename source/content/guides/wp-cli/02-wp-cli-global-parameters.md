---
title: WP-CLI On The Pantheon Platform
subtitle: WP-CLI Global Parameters
description: Review important WP-CLI global parameters.
cms: "WordPress"
categories: [develop]
tags: [wp-cli, cli]
layout: guide
showtoc: true
permalink: docs/guides/wp-cli/wp-cli-global-parameters
anchorid: wp-cli-global-parameters
---

This section provides information on WP-CLI global parameters that you should be familiar with before you use WP-CLI to develop and maintain your site.

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