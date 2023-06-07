---
title: Terminus Guide - CI Specific - CIRCLECI
subtitle: Authenticating Terminus in a Circle CI Pipline
description: How to authenticate terminus properly in a CI pipline that avoids errors from authenticating too many times.
---

# Caching Authentication Information in CircleCI

CircleCI offers a caching feature that can be used to store the Terminus session information. You can use the `save_cache` and `restore_cache` steps in your CircleCI job configuration to achieve this.

Here's how you would cache the authentication information for builds in CircleCI:

## Step 1: Set Up the Cache Key and Restore Cache

You can set up a cache key and restore any existing cache using the `restore_cache` step in your `.circleci/config.yml` file:

```yaml
- restore_cache:
    keys:
      - terminus-cache-{{ .Branch }}-{{ .Revision }}
      - terminus-cache-{{ .Branch }}-
      - terminus-cache-
```

The keys are tried in the order they're listed. Here, `terminus-cache-{{ .Branch }}-{{ .Revision }}` is the most specific key and `terminus-cache-` is the least specific. The `{{ .Branch }}` and `{{ .Revision }}` are built-in variables representing the Git branch and commit SHA of the build.

## Step 2: Check Cache and Authenticate

After setting up and restoring the cache, you can check if the cache was hit by checking for the existence of the session file. If it does not exist, then you would use the machine token for authentication:

```yaml
- run:
    name: Authenticate Terminus
    command: |
      if [ -f ~/.terminus/cache/session ]; then
        terminus auth:login
      else
        terminus auth:login --machine-token=${TOKEN}
      fi
```

Here, `TOKEN` should be set in your CircleCI environment variables for security.

## Step 3: Save Cache and Update Session

Finally, you can save the cache for the next builds and update the session expiry date:

```yaml
- save_cache:
    key: terminus-cache-{{ .Branch }}-{{ .Revision }}
    paths:
      - ~/.terminus/cache/session

- run:
    name: Update Session Expiry Date
    command: terminus auth:whoami
```

# Full Example

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
            - terminus-cache-{{ .Branch }}-{{ .Revision }}
            - terminus-cache-{{ .Branch }}-
            - terminus-cache-

      - run:
          name: Authenticate Terminus
          command: |
            if [ -f ~/.terminus/cache/session ]; then
              terminus auth:login
            else
              terminus auth:login --machine-token=${TOKEN}
            fi

      - save_cache:
          key: terminus-cache-{{ .Branch }}-{{ .Revision }}
          paths:
            - ~/.terminus/cache/session

      - run:
          name: Update Session Expiry Date
          command: terminus auth:whoami

      # Continue with your build steps...
```

In this script, `${TOKEN}` needs to be replaced with the machine token provided by Terminus, and should be added to your environment variables in the CircleCI project settings.