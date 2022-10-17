---
title: WP-CLI on the Pantheon Platform
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

This section provides information on WP-CLI global parameters that you should be familiar with to help you use WP-CLI to develop and maintain your site.

<Alert title="Exports" type="export">

The steps below use [Terminus](/terminus) commands that require site and environment values. Before you begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment. This allows the example commands to work in your local terminal:

```bash{promptUser: user}
export site=yoursitename
export env=dev # Or a multidev test environment
```

</Alert>

## Getting Started With WP-CLI

WP-CLI will allows you to perform advanced operations on your WordPress site (including dropping your database).

Review the [global parameters](https://make.wordpress.org/cli/handbook/config/) below to help you use WP-CLI to maintain your site.

- `--path=<path>` - Specify the path to WordPress. WP-CLI will look upward from its current directory to attempt to find WordPress if this parameter isn't provided.

- `--url=<url>` - Identify the request from a given URL. This argument specifies the target site in WordPress Site Networks. 

- `--user=<id|login|email>` - Run the command as a particular user. WP-CLI commands are executed anonymously by default.

Each of these global parameters define the **context** under which the command is run. This provides important pre-condition statements to WordPress about how to understand the request.

1. Run the command below to learn more:

  ```bash{outputLines:2-7}
  terminus wp $site.$env -- option get home
    [2015-11-25 02:42:12] [info] Running wp option get home  on pantheon-demo
        cmd: 'option get home'
        flags: ''
        site: 'pantheon-demo'
        env: 'dev'
    https://pantheon-demo.pantheonsite.io
  ```

1. Review the information below to understand the output.

  - `terminus wp` tells Terminus you want to execute a WP-CLI command.

  - `option get` is the command itself ([docs](https://developer.wordpress.org/cli/commands/option/get/)). 

  - `home` is the key for the option you're requesting.

  - `$site` and `$env` tell Terminus which site and environment to run the command in, respectively. These arguments can be provided automatically if you execute Terminus commands from a directory containing a [`.env`](https://github.com/pantheon-systems/cli/blob/master/.env.example) file.

  - The first part of the output is Terminus telling you which command it's running, and where. The last line, `https://pantheon-demo.pantheonsite.io`, is the response of `wp option get`.

Here are [more commands](https://developer.wordpress.org/cli/commands/) you may find helpful:

- `wp search-replace` - Search for and replace specific strings in the database. Commonly used to correct references to [platform domains](/guides/mariadb-mysql/database-workflow-tool#troubleshooting). Use `--dry-run` to perform a test run of the operation, and see how it will affect your database ([developer docs](https://developer.wordpress.org/cli/commands/search-replace)).

- `wp media regenerate` - Regenerate image thumbnails for one or more attachments ([developer docs](https://developer.wordpress.org/cli/commands/media/regenerate/)).

- `wp rewrite flush` - Flush rewrite rules to ensure newly registered rules are stored in the database ([developer docs](https://developer.wordpress.org/cli/commands/rewrite/flush/)).

## More Resources

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon)
- [The Terminus Manual](/terminus)
- [WordPress Dashboard](/cms-admin#wordpress-dashboard)