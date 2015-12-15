---
title: Automating and Integrating your Pantheon Workflow with Quicksilver
description: Pantheon's Quicksilver Hooks system allows users to encode reactions to specific platform workflows, enabling the functionality professionals expect, including chat-ops, database sanitization, deployment logging, and initiating automated testing operations with a CI server.
---

Pantheon's Quicksilver Hooks system allows users to encode reactions to specific platform workflows, enabling the functionality professionals expect, including chat-ops, database sanitization, deployment logging, and initiating automated testing operations with a CI server.

## How Quicksilver Works

1. You trigger a Quicksilver-able workflow.
2. The platform runs Quicksilver operations identified in a `pantheon.yml` file and stored in your codebase.
3. You can get debugging output via [Terminus, the Pantheon CLI](https://pantheon.io/docs/articles/local/cli/)

## Add a Valid `pantheon.yml` File
Create a `pantheon.yml` file in the root of your code repository. Whether you commit this file locally, or create it via an SFTP connection, the platform will validate the YAML prior to receiving the commit. Uncommitted `pantheon.yml` files on the development environment have no effect.

Quicksilver scripts can respond automatically to a handful workflows on the Pantheon Platform. Check back for more Quicksilver-enabled Workflows.

### Quicksilver-enabled Workflows
Initiating following workflows will trigger the scripts identified in your `pantheon.yml file`. 

#### clear_cache
Clears Varnish and CMS cache for Drupal and WordPress.

#### sync_code
Takes place after pushing from a local git repo to Pantheon, or committing on-server changes made via SFTP.

#### clone_database
Clones database from one environment to another.

### deploy
When a code is pushed to Test or Live

Let's explore a valid `pantheon.yml` file to learn more:

### Pantheon YAML

```YAML
api_version: 1

workflows:
  # Notify team of commit
  sync_code:
    after:
      - type: webphp
        description: post to slack after each code pushed
        script: private/scripts/slack_code_push.php  
  # Notify, sanitize,and notify
  clone_database:
    before:
      - type: webphp
        description: post to slack before cloning the database
        script: private/scripts/backup_slack_before_db_clone.php
    after:
      - type: webphp
        description: sanitize the db after each database Clone
        script: private/scripts/sanitize_after_db_clone.php
      - type: webphp
        description: post to slack after the database clones
        script: private/scripts/slack_after_db_clone.php
  # Alert, Sanitize (if on test), update db, and post to slack
  deploy:
    before:
      - type: webphp
        description: post to slack before cloning the database
        script: private/scripts/slack_before_deploy.php
    after:
      - type: webphp
        description: sanitize the db after deploy to test
        script: private/scripts/sanitize_after_db_clone.php
      - type: webphp
        description: pull configuration into the database
        script: private/scripts/config_pull_after_deploy.php
      - type: webphp
        description: post to slack after each code pushed
        script: private/scripts/slack_code_push.php
    # Alert caches were cleared
    clear_cache:
      after:
      - type: webphp
        description: post to slack after each cache-clear
        script: private/scripts/slack_clear_cache.php
```

## Terminus Commands ##

Developers making use of Quicksilver will want to make sure they are Terminus savvy. Get the latest [release](https://github.com/pantheon-systems/cli/releases), and a few new commands are included:

```shell
$ terminus help workflows
##NAME
    terminus workflows

##DESCRIPTION
    Actions to be taken on an individual site

##SYNOPSIS
    <command>

##SUBCOMMANDS
    list
        List Workflows for a Site
    show
        Show operation details for a workflow
    watch
        Streams new and finished workflows to the console
```

The `list` and `show` commands will allow you to explore previous workflows and their Quicksilver operations. The `watch` command is a developers best-friend: it will set up Terminus to automatically "follow" the workflow activity of your site, dumping back any Quicksilver output along with them.

## Getting Started

We have a few example `webphp` scripts you can start with over at [pantheon-systems/quicksilver-examples](https://github.com/pantheon-systems/quicksilver-examples)

- [Post to Slack](https://github.com/pantheon-systems/quicksilver-examples/blob/master/slack_notification)
- [Post Deployment Markers to New Relic](https://github.com/pantheon-systems/quicksilver-examples/blob/master/new_relic_deploy)
- [Sanitize Database After Clone](https://github.com/pantheon-systems/quicksilver-examples/blob/master/db_sanitization)
