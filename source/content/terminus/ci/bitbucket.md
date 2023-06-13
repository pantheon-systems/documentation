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

Here's a full example of how you would cache authentication information for builds in Bitbucket Pipelines:

Here's a `bitbucket-pipelines.yml` file which accomplishes the tasks you mentioned. Please ensure that you have defined `TERMINUS_TOKEN` in Bitbucket Pipeline's Environment Variables.

```yaml:title=bitbucket-pipelines.yml

image: ubuntu:latest

pipelines:
  default:
    - step:
        name: Install and Configure PHP and Terminus
        script:
          - apt-get update
          - apt-get install -y php curl perl sudo git
          - git clone $BITBUCKET_CLONE_URL . 
          - export TERMINUS_RELEASE=$(curl --silent "https://api.github.com/repos/pantheon-systems/terminus/releases/latest" | perl -nle'print $& while m#"tag_name": "\K[^"]*#g')
          - mkdir ~/terminus && cd ~/terminus
          - echo "Installing Terminus v$TERMINUS_RELEASE"
          - curl -L https://github.com/pantheon-systems/terminus/releases/download/$TERMINUS_RELEASE/terminus.phar --output terminus
          - chmod +x terminus
          - sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
          - export TERMINUS_TOKEN=$TERMINUS_TOKEN
          - terminus auth:login || terminus auth:login --machine-token="${TERMINUS_TOKEN}"
          - terminus auth:whoami
        caches:
          - terminus

definitions:
  caches:
    terminus: $HOME/.terminus
```

This pipeline does the following:

1. Uses the `ubuntu:latest` Docker image.
2. Performs `git clone` to checkout the code from the repository.
3. Updates the system and installs necessary tools like PHP, curl, perl, sudo and git.
4. Determines the latest release of Terminus from the GitHub API and stores it in the `TERMINUS_RELEASE` variable.
5. Creates a directory for Terminus, downloads it into that directory, makes it executable, and then creates a symbolic link to it in `/usr/local/bin` so that you can run it from anywhere.
6. Exports the `TERMINUS_TOKEN` environment variable (assuming that you've already set it in your pipeline settings) and uses it to authenticate Terminus.
7. Checks that Terminus is authenticated with `terminus auth:whoami`.
8. Defines a cache for the `$HOME/.terminus` directory. The pipeline system will save and restore the cache for subsequent runs.
```

In this script, `${TOKEN}` needs to be replaced with the machine token provided by Terminus, and should be added to your environment variables in the Bitbucket pipeline settings.