---
title: Terminus Guide - CI Specific - Bitbucket
subtitle: Authenticating Terminus in a Bitbucket CI Pipline
description: How to authenticate terminus properly in a ci pipline that avoids errors from authenticating too many times.
permalink: docs/terminus/ci/bitbucket
contributors: [stovak]
terminuspage: true
type: terminuspage
layout: terminuspage
tags: [reference, cli, local, terminus, workflow]
contenttype: [guide]
innav: [false]
categories: [automate]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2023-06-08"
---


## Caching Authentication Information in Bitbucket Pipelines

To cache the entire `$HOME/.terminus/cache` folder in Bitbucket Pipelines, you can adjust the cache definition in your `bitbucket-pipelines.yml` file and make some changes in the script:

## Step 1: Define Cache Configuration

First, define a cache configuration for your Terminus cache in the `bitbucket-pipelines.yml` file:

```yaml:title=bitbucket-pipelines.yml
pipelines:
  default:
    - step:
        caches:
          - terminus
```

Here, `terminus` is a custom cache identifier for your Terminus cache.

## Step 2: Create a Symbolic Link

As mentioned earlier, Bitbucket Pipelines cache the directories in the build's top level directory that match the name of the cache. So, you'll need to create a symbolic link from `~/.terminus/cache` to a directory in your top-level directory:

```yaml:title=bitbucket-pipelines.yml
script:
  - mkdir -p ./terminus && ln -sf ~/.terminus/cache/* ./terminus/
```

This command creates a symbolic link from each file in `~/.terminus/cache` to a directory named `terminus` in the top-level directory.

## Step 3: Check Cache and Authenticate

Next, create a script to authenticate Terminus based on whether a valid session cache exists. If the session file exists, it indicates a cache hit. If it does not, then you would use the machine token for authentication:

```yaml:title=bitbucket-pipelines.yml
script:
  - if [ -f ~/.terminus/cache/session ]; then terminus auth:login; else terminus auth:login --machine-token=${TOKEN}; fi
```

Remember to set the `TOKEN` as a secured environment variable in your Bitbucket pipeline settings for security.

## Step 4: Updating the Session Expiry Date

Finally, to update the session expiry date, you could use `terminus auth:whoami` after the authentication step:

```yaml:title=bitbucket-pipelines.yml
  - terminus auth:whoami
```

## Full Example

Here's a full example of how you would cache authentication information for builds in Bitbucket Pipelines:

```yaml
image: php:7.4

pipelines:
  default:
    - step:
        caches:
          - terminus
        script:
          - mkdir -p ./terminus && ln -sf ~/.terminus/cache/* ./terminus/
          - if [ -f ~/.terminus/cache/session ]; then terminus auth:login; else terminus auth:login --machine-token=${TOKEN}; fi
          - terminus auth:whoami
```

In this script, `${TOKEN}` needs to be replaced with the machine token provided by Terminus, and should be added to your environment variables in the Bitbucket pipeline settings.