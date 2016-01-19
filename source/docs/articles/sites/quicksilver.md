---
title: Automating and Integrating your Pantheon Workflow with Quicksilver Platform Hooks
description: Pantheon's Quicksilver Hooks system allows users to encode reactions to specific platform workflows, enabling the functionality professionals expect, including chat-ops, database sanitization, deployment logging, and initiating automated testing operations with a CI server.
---

Pantheon's Quicksilver Platform Hooks system allows users to encode reactions to specific platform workflows, enabling the functionality professionals expect, including chat-ops, database sanitization, deployment logging, and initiating automated testing operations with a CI server.

The current release of Quicksilver supports one utility operation: `webphp`. This invokes a PHP script via the same runtime environment as the website itself. PHP scripts are subject to the same limits as any code on the platform, like [timeouts](https://pantheon.io/docs/articles/sites/timeouts/#timeouts-that-aren't-configurable), and cannot be batched.

## How Quicksilver Platform Hooks Works

1. You trigger a Quicksilver-enabled workflow.
2. The platform runs Quicksilver operations identified in a `pantheon.yml` file stored in your codebase.
3. You can get debugging output via [Terminus, the Pantheon CLI](https://pantheon.io/docs/articles/local/cli/).

## Add a Valid pantheon.yml File
Create a `pantheon.yml` file in the root of your code repository. Whether you commit this file locally or create it via an SFTP connection, the platform will validate the YAML prior to receiving the commit. Uncommitted `pantheon.yml` files on the Development environment have no effect.

Quicksilver scripts can respond automatically to a handful of workflows on the Pantheon platform. Check back for more Quicksilver-enabled Workflows.

## Quicksilver-Enabled Workflows
Initiating the following workflows will trigger the scripts identified in your `pantheon.yml` file:

`deploy`: code is deployed to Test or Live. webphp scripts run on the target environment.

`sync_code`: code is pushed via Git or committed in the Pantheon Dashboard. webphp scripts run on the committed-to environment (dev or multidev).

`clone_database`: data is cloned between environments. webphp scripts run on the target (to_env) environment.

`clear_cache`: the most popular workflow of them all! webphp scripts run on the cleared environment.

### Pantheon YAML
Let's explore a valid `pantheon.yml` file to learn more:

<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/quicksilver-examples/blob/master/example.pantheon.yml?footer=minimal"></script>

## Terminus Commands

To use Quicksilver Platform Hooks, it's recommended that you are familiar with Terminus. Get the latest [release](https://github.com/pantheon-systems/cli/releases), and a few new commands are included:

```bash
$ terminus help workflows
##NAME
    terminus workflows

##DESCRIPTION
    Actions to be taken on an individual site

##SYNOPSIS
    <command>

##SUBCOMMANDS
    list
        List workflows for a site
    show
        Show operation details for a workflow
    watch
        Streams new and finished workflows to the console
```

The `list` and `show` commands allow you to explore previous workflows and their Quicksilver operations. The `watch` command is a developers best friend; it will set up Terminus to automatically "follow" the workflow activity of your site, dumping back any Quicksilver output along with them.

## Example Scripts

We have a few example `webphp` scripts you can start with at [pantheon-systems/quicksilver-examples](https://github.com/pantheon-systems/quicksilver-examples):

- [Post to Slack](https://github.com/pantheon-systems/quicksilver-examples/blob/master/slack_notification)
- [Post Deployment Markers to New Relic](https://github.com/pantheon-systems/quicksilver-examples/blob/master/new_relic_deploy)
- [Sanitize Database After Clone](https://github.com/pantheon-systems/quicksilver-examples/blob/master/db_sanitization)
