---
title: Automating and Upgrading your Pantheon Workflow with Quicksilver
description: Pantheon's Quicksilver Hooks system allows users to encode reactions to specific platform workflows, enabling the functionality professionals expect, including chat-ops, database sanitization, running drush commands, and initiating automated testing operations with a CI server.
---

## How Quicksilver Works

1. You trigger a Quicksilver-able workflow.
2. The platform runs Quicksilver operations identified in a `pantheon.yml` file and stored in your codebase.

## Add a Valid `pantheon.yml` File
Create a `pantheon.yml` file in the root of your code repository. Whether you commit this file locally, or create it via an SFTP connection, the platform will validate the YAML prior to receiving the commit. Uncommitted `pantheon.yml` files on the development environment have no effect.

Let's explore a valid `pantheon.yml` file to learn.
Quicksilver scripts can respond automatically to a handful workflows on the Pantheon Platform. Check back for more Quicksilver-able Workflows.

### Quicksilver-able Workflows
Terminus initiation of the following workflows carrying the --workflows
#### clear_cache
Clears all Varnish cache for Drupal and WordPress

#### sync_code
Takes place after pushing git in development; ensures code is on appservers

#### clone_database
Clones database from an environment

### deploy
When a code is pushed between environments


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

## Add PHP

We have a few example `webphp` scripts you can start with over at [pantheon-systems/quicksilver-examples](https://github.com/pantheon-systems/quicksilver-examples)

- [Post to Slack](https://github.com/pantheon-systems/quicksilver-examples/blob/master/slack_notification)
- [Post Deployment Markers to New Relic](https://github.com/pantheon-systems/quicksilver-examples/blob/master/new_relic_deploy)
- [Sanitize Database After Clone](https://github.com/pantheon-systems/quicksilver-examples/blob/master/db_sanitization)

### Handling UTF8 responses
Currently
