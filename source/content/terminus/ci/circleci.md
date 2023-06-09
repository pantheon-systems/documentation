---
title: Terminus Guide - CI Specific - CIRCLECI
subtitle: Authenticating Terminus in a Circle CI Pipline
description: How to authenticate terminus properly in a CI pipline that avoids errors from authenticating too many times.
contributors: [stovak]
terminuspage: true
type: terminuspage
layout: terminuspage
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/ci/circleci
contenttype: [guide]
innav: [false]
categories: [automate]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2023-06-08"
---

## Caching Authentication Information in CircleCI

To cache the entire `$HOME/.terminus/cache` folder in CircleCI, you would adjust the `save_cache` and `restore_cache` steps to include this directory. Here's how you would modify the earlier instructions:

## Step 1: Define Cache Configuration

First, define a cache key for your Terminus cache in the `config.yml` file. Here, I'm using a checksum of `composer.lock` to create a unique key for the cache:

```yaml:title=config.yml
- restore_cache:
    keys:
      - terminus-cache-{{ checksum "composer.lock" }}
```

## Step 2: Check Cache and Authenticate

Next, create a command to authenticate Terminus based on whether a valid session cache exists. If the session file exists, it indicates a cache hit. If it does not, then you would use the machine token for authentication:

```yaml:title=config.yml
- run:
    name: Authenticate Terminus
    command: |
      if [ -f ~/.terminus/cache/session ]; then
        terminus auth:login
      else
        terminus auth:login --machine-token=${TOKEN}
      fi
```

Remember to set the `TOKEN` as an environment variable in your CircleCI project settings for security.

## Step 3: Updating the Session Expiry Date

Finally, to update the session expiry date, you could use `terminus auth:whoami` after the authentication step:

```yaml:title=config.yml
- run:
    name: Update Session Expiry Date
    command: terminus auth:whoami
```

## Step 4: Save Cache

After authentication, save the cache for the next run:

```yaml:title=config.yml
- save_cache:
    key: terminus-cache-{{ checksum "composer.lock" }}
    paths:
      - ~/.terminus/cache/
```

## Full Example

Here's a full example of how you would cache authentication information for builds in CircleCI:

```yaml
version: 2.1
jobs:
  build:
    docker:
      - image: circleci/php:7.4
    steps:
      - checkout

      - restore_cache:
          keys:
            - terminus-cache-{{ checksum "composer.lock" }}

      - run:
          name: Authenticate Terminus
          command: |
            if [ -f ~/.terminus/cache/session ]; then
              terminus auth:login
            else
              terminus auth:login --machine-token=${TOKEN}
            fi

      - run:
          name: Update Session Expiry Date
          command: terminus auth:whoami

      - save_cache:
          key: terminus-cache-{{ checksum "composer.lock" }}
          paths:
            - ~/.terminus/cache/

      # Continue with your build steps...
```

In this script, replace `TOKEN` with the machine token provided by Terminus, and add it to your environment variables in the CircleCI project settings.
