---
title: Terminus Guide - CI Specific - GitLab
subtitle: Authenticating Terminus in a GitLab Pipline
description: How to authenticate terminus properly in a CI pipline that avoids errors from authenticating too many times.
permalink: docs/terminus/ci/gitlab
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

## Caching Authentication Information in GitLab CI/CD

If you want to restore the entire `$HOME/.terminus/cache` folder in GitLab CI/CD, you can adjust the cache paths in the `.gitlab-ci.yml` file to point to this directory. Here's how you would modify the earlier instructions:

## Step 1: Set Up the Cache Key and Path

The cache key is used to define a unique value for your cache, whereas the cache path is the location of the cache files. This can be done like so:

```yaml
cache:
  key: "$CI_JOB_NAME"
  paths:
    - ~/.terminus/cache/
```

Here, `$CI_JOB_NAME` is a predefined variable that represents the job name of the CI/CD pipeline, and `~/.terminus/cache/` is the path to your terminus session cache directory.

## Step 2: Check Cache and Authenticate

Next, you would create a script to authenticate Terminus based on whether a valid session cache exists. If the session file exists, it indicates a cache hit. If it does not, then you would use the machine token for authentication. You would use the `test` command to check if the file exists.

```yaml
script:
  - if test -f ~/.terminus/cache/session; then terminus auth:login; else terminus auth:login --machine-token=${TOKEN}; fi
```

Remember to set the `TOKEN` as a CI/CD variable in your GitLab project settings for security.

## Step 3: Updating the Session Expiry Date

Finally, to update the session expiry date, you could use `terminus auth:whoami` after the authentication step.

```yaml
  - terminus auth:whoami
```

# Full Example

Here's a full example of how you would cache authentication information for builds in GitLab CI/CD:

```yaml
stages:
  - build

variables:
  TERMINUS_TOKEN: ${{TOKEN}}

build_job:
  stage: build
  script:
    - if test -f ~/.terminus/cache/session; then terminus auth:login; else terminus auth:login --machine-token=${TERMINUS_TOKEN}; fi
    - terminus auth:whoami
  cache:
    key: "$CI_JOB_NAME"
    paths:
      - ~/.terminus/cache/
```

In this script, `${TOKEN}` needs to be replaced with the machine token provided by Terminus, and should be added to your variables in the GitLab CI/CD settings.
