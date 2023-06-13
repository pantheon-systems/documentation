---
title: Terminus Guide - CI Specific - Github Actions
subtitle: Authenticating Terminus in a Github Actions Pipline
description: How to authenticate terminus properly in a CI pipline that avoids errors from authenticating too many times.
permalink: docs/terminus/ci/github-actions
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

## Caching Authentication Information in GitHub Actions

Here's a full example of how you would cache authentication information for builds in GitHub Actions:

```yaml:title=.github/workflows/terminus-cache-auth.yml
name: CI

on: [push, pull_request]

jobs:
  connect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '7.4'
      - uses: actions/cache@v2
        id: terminus-cache
        with:
          path: ~/.terminus
          key: ${{ runner.os }}-terminus-${{ hashFiles('**/composer.lock') }}
          restore-keys: |
            ${{ runner.os }}-terminus-
      - name: Determine version
        shell: bash
        if: ${{ ! inputs.terminus-version }}
        run: |
          TERMINUS_RELEASE=$(
            curl --silent \
              --header 'authorization: Bearer ${{ github.token }}' \
              "https://api.github.com/repos/pantheon-systems/terminus/releases/latest" \
              | perl -nle'print $& while m#"tag_name": "\K[^"]*#g'
          )
          echo "TERMINUS_RELEASE=$TERMINUS_RELEASE" >> $GITHUB_ENV
      - name: Install Terminus
        shell: bash
        run: |
          mkdir ~/terminus && cd ~/terminus
          echo "Installing Terminus v$TERMINUS_RELEASE"
          curl -L https://github.com/pantheon-systems/terminus/releases/download/$TERMINUS_RELEASE/terminus.phar --output terminus
          chmod +x terminus
          sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
        env:
          TERMINUS_RELEASE: ${{ inputs.terminus-version || env.TERMINUS_RELEASE }}
      - name: Authenticate Terminus
        env:
          TERMINUS_TOKEN: ${{ secrets.TERMINUS_TOKEN }}
        run: |
          terminus auth:login || terminus auth:login --machine-token="${TERMINUS_TOKEN}"
      - name: Update Session Expiry Date
        run: terminus auth:whoami

    # Continue with your build steps...
```

In this script, you should replace `${{ secrets.TOKEN }}` with the machine token provided by Terminus, and add it to your secrets in the GitHub repository settings.
