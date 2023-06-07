---
title: Terminus Guide - CI Specific - Github Actions
subtitle: Authenticating Terminus in a Github Actions Pipline
description: How to authenticate terminus properly in a CI pipline that avoids errors from authenticating too many times.
---

# Caching Authentication Information in GitHub Actions

Caching in GitHub Actions can be done using the `actions/cache` Action. This is a GitHub Action that provides caching capabilities for dependencies and build outputs to speed up workflows. In this context, we'll use it to cache the session file for Terminus to prevent repeatedly acquiring a new session token.

The following steps illustrate how to achieve this:

## Step 1: Set Up the Cache Key

You should first set up a key for your cache. This can be a hard-coded string, but it's usually better to include some variables so that the cache can be versioned or separated between different workflows or branches. For example:

```yaml
- name: Cache Terminus session
  uses: actions/cache@v2
  id: terminus-cache
  with:
    path: ~/.terminus/cache/session
    key: ${{ runner.os }}-terminus-session-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-terminus-session-
```

Here, the `key` attribute is set to a string that includes the runner operating system, a fixed string, and the SHA of the commit. The `restore-keys` attribute is set to a fallback key pattern that will be used if the exact `key` doesn't exist.

## Step 2: Check Cache Hit

After setting up the cache, you can check if it was hit using `steps.<step_id>.outputs.cache-hit`. This is a boolean value that will be `true` if the cache was hit and `false` if it was not. For example:

```yaml
- name: Authenticate Terminus
  run: |
    if [[ "${{ steps.terminus-cache.outputs.cache-hit }}" != "true" ]]; then
      terminus auth:login --machine-token=${TOKEN}
    else
      terminus auth:login
    fi
```

Here, if the cache was not hit, Terminus is authenticated using the machine token. If the cache was hit, Terminus is authenticated using the session from the cache.

## Step 3: Updating the Session Expiry Date

Finally, you should ensure that the session expiry date is updated. This could be done using a simple `terminus auth:whoami` command after the authentication step, which will update the session expiry date if the session is still valid:

```yaml
- name: Update session expiry date
  run: terminus auth:whoami
```

# Full Example

Here's a full example of how you would cache authentication information for builds in GitHub Actions:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Cache Terminus session
      uses: actions/cache@v2
      id: terminus-cache
      with:
        path: ~/.terminus/cache/session
        key: ${{ runner.os }}-terminus-session-${{ github.sha }}
        restore-keys: |
          ${{ runner.os }}-terminus-session-

    - name: Authenticate Terminus
      run: |
        if [[ "${{ steps.terminus-cache.outputs.cache-hit }}" != "true" ]]; then
          terminus auth:login --machine-token=${TOKEN}
        else
          terminus auth:login
        fi

    - name: Update session expiry date
      run: terminus auth:whoami
      
    # Continue with your build steps...
```

Don't forget to store your `TOKEN` securely, it should be added to your secrets in the GitHub repository settings and referenced as `secrets.TOKEN` in your workflow file.