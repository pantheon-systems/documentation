---
title: Terminus Guide
subtitle: Authenticate Terminus in a GitHub Actions Pipeline
description: Learn how to authenticate Terminus in a GitHub Actions CI pipeline without receiving errors.
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

This section provides information on how to to authenticate Terminus in a GitHub Actions CI pipeline without receiving errors and avoiding authentication rate limits.

## Caching Authentication for GitHub Actions

You can use the example script in this section for a full start-to-finish Terminus authentication in GitHub Actions.

This pipeline does the following:

- Uses the `ubuntu:latest` Docker image.
- Updates the system and installs necessary tools like PHP, curl, perl, sudo, and Git before the script stages.
- Defines a cache for the Terminus binary. The pipeline system will save and restore the cache for subsequent runs.
- Determines the latest release of Terminus from the GitHub API and stores it in the `TERMINUS_RELEASE` variable.
- Creates a directory for Terminus, downloads it into that directory, makes it executable, and then creates a symbolic link to it in `/usr/local/bin` so that you can run it from anywhere.
- Ensures there is a valid Terminus session populated in the encrypted cache.
- Checks that Terminus is authenticated with `terminus auth:whoami`.


<Alert title="Note"  type="info" >

Before you use this script:

- Add a Pantheon account machine token to your GitHub **environment** (preferred) or **repository** secrets named `TERMINUS_TOKEN`. _(Always store production secrets in a GitHub "Environment" that restricts which branches can deploy to it, and protect those branches with rules including code reviews and security tests)._

</Alert>

```yaml:title=.github/workflows/terminus-cache-auth.yml
name: CI

on: [push, pull_request]

jobs:
  connect:
    runs-on: ubuntu-latest
    # Uncomment this line if your TERMINUS_TOKEN secret belongs to a GitHub
    # Environment (preferred for security, see note above).
    # environment: <environment-name>
    steps:
      - uses: actions/checkout@v3
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
      - uses: actions/cache@v2
        id: terminus-binary
        with:
          path: ~/terminus/terminus
          key: ${{ runner.os }}-terminus-binary-${{ hashFiles('**/composer.lock') }}
          restore-keys: |
            ${{ runner.os }}-terminus-binary-
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
      - name: Authenticate Terminus (with session cache)
        uses: pantheon-systems/terminus-github-actions@v1
        with:
          pantheon-machine-token: ${{ secrets.TERMINUS_TOKEN }}
      - name: Whoami
        run: terminus auth:whoami
  deploy:
    needs: [connect]
    runs-on: ubuntu-latest
    # Uncomment this line if your TERMINUS_TOKEN secret belongs to a GitHub
    # Environment (preferred for security, see note above).
    # environment: <environment-name>
    steps:
      - uses: actions/checkout@v3
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
      - uses: actions/cache@v2
        id: terminus-cache
        with:
          path: ~/.terminus
          key: ${{ runner.os }}-terminus-cache-${{ hashFiles('**/composer.lock') }}
          restore-keys: |
            ${{ runner.os }}-terminus-cache-
      - uses: actions/cache@v2
        id: terminus-binary
        with:
          path: ~/terminus/terminus
          key: ${{ runner.os }}-terminus-binary-${{ hashFiles('**/composer.lock') }}
          restore-keys: |
            ${{ runner.os }}-terminus-binary-
      - name: Authenticate Terminus (with session cache)
        uses: pantheon-systems/terminus-github-actions@v1
        with:
          pantheon-machine-token: ${{ secrets.TERMINUS_TOKEN }}
      - name: Whoami
        run: |
          sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
          terminus auth:whoami

  # Continue with your build steps...
```
