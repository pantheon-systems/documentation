---
title: Terminus Guide - CI Specific - GitLab
subtitle: Authenticating Terminus in a Gitlab Pipline
description: How to authenticate terminus properly in a CI pipline that avoids errors from authenticating too many times.
---
# Caching Authentication Information in GitLab CI/CD

GitLab CI/CD provides built-in functionality for caching files between pipeline runs. Here's how you would go about caching authentication information for builds in GitLab CI/CD:

Firstly, you need to specify the cache paths and keys in the `.gitlab-ci.yml` file for your project.

## Step 1: Set Up the Cache Key and Path

The cache key is used to define a unique value for your cache, whereas the cache path is the location of the cache files. This can be done like so:

```yaml
cache:
  key: "$CI_JOB_NAME"
  paths:
    - ~/.terminus/cache/session
```

Here, `$CI_JOB_NAME` is a predefined variable that represents the job name of the CI/CD pipeline, and `~/.terminus/cache/session` is the path to your terminus session cache.

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
      - ~/.terminus/cache/session
```

In this script, `${TOKEN}` needs to be replaced with the machine token provided by Terminus, and should be added to your variables in the GitLab CI/CD settings.