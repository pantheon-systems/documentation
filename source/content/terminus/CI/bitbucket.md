---
title: Terminus Guide - CI Specific - BITBUCKET
subtitle: Authenticating Terminus in a Bitbucket CI Pipline
description: How to authenticate terminus properly in a CI pipline that avoids errors from authenticating too many times.
---

# Caching Authentication Information in Bitbucket Pipelines

Bitbucket Pipelines offers a caching feature that you can use to store the Terminus session information. Here's how you would go about caching authentication information for builds in Bitbucket Pipelines:

## Step 1: Define Cache Configuration

First, define a cache configuration for your Terminus session in the `bitbucket-pipelines.yml` file:

```yaml
pipelines:
  default:
    - step:
        caches:
          - terminus
```

Here, `terminus` is a custom cache identifier for your Terminus session cache.

## Step 2: Check Cache and Authenticate

Next, create a script to authenticate Terminus based on whether a valid session cache exists. If the session file exists, it indicates a cache hit. If it does not, then you would use the machine token for authentication:

```yaml
        script:
          - if [ -f ~/.terminus/cache/session ]; then terminus auth:login; else terminus auth:login --machine-token=${TOKEN}; fi
```

Remember to set the `TOKEN` as a secured environment variable in your Bitbucket pipeline settings for security.

## Step 3: Updating the Session Expiry Date

Finally, to update the session expiry date, you could use `terminus auth:whoami` after the authentication step:

```yaml
          - terminus auth:whoami
```

# Full Example

Here's a full example of how you would cache authentication information for builds in Bitbucket Pipelines:

```yaml
image: php:7.4

pipelines:
  default:
    - step:
        caches:
          - terminus
        script:
          - if [ -f ~/.terminus/cache/session ]; then terminus auth:login; else terminus auth:login --machine-token=${TOKEN}; fi
          - terminus auth:whoami
```

In this script, `${TOKEN}` needs to be replaced with the machine token provided by Terminus, and should be added to your environment variables in the Bitbucket pipeline settings.

## Note on Cache Definition

In Bitbucket Pipelines, the path of the cache is determined by the language of the build environment:

- For Node.js, caches are stored in `node_modules`.
- For Python, caches are stored in the directories used by pip and pipenv.
- For PHP, caches are stored in the directories used by Composer.

For other languages or custom caches (like in this case), Bitbucket Pipelines will cache the directories in the build's top level directory that match the name of the cache. This means that for the cache to work correctly with Bitbucket Pipelines, you might need to create a symbolic link from `~/.terminus/cache/session` to a file in your top level directory.

For instance:

```yaml
script:
  - ln -s ~/.terminus/cache/session ./terminus
```

This command creates a symbolic link named `terminus` in the top-level directory that points to the `~/.terminus/cache/session` file. With this link in place, Bitbucket Pipelines should be able to cache the session file correctly.