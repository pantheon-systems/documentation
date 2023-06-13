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

Here is an example `config.yml` file for CircleCI that accomplishes an authentication with terminus from a CI Environment. Please make sure to set `TERMINUS_TOKEN` in the CircleCI project's Environment Variables.

```yaml
version: 2.1

executors:
  ubuntu-executor:
    docker:
      - image: circleci/php:latest

commands:
  install_dependencies:
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: |
            sudo apt-get update
            sudo apt-get install -y php curl perl git jq
      - restore_cache:
          keys:
            - terminus-cache-{{ .Environment.CIRCLE_BRANCH }}-{{ checksum "composer.lock" }}
            - terminus-cache-{{ .Environment.CIRCLE_BRANCH }}-
            - terminus-cache-
      - run:
          name: Install Terminus
          command: |
            export TERMINUS_RELEASE=$(curl --silent "https://api.github.com/repos/pantheon-systems/terminus/releases/latest" | jq -r .tag_name)
            mkdir ~/terminus && cd ~/terminus
            echo "Installing Terminus v$TERMINUS_RELEASE"
            curl -L https://github.com/pantheon-systems/terminus/releases/download/$TERMINUS_RELEASE/terminus.phar --output terminus
            chmod +x terminus
            echo 'export PATH=$PATH:~/terminus' >> $BASH_ENV
      - save_cache:
          key: terminus-cache-{{ .Environment.CIRCLE_BRANCH }}-{{ checksum "composer.lock" }}
          paths:
            - ~/.terminus
      - run:
          name: Authenticate Terminus
          command: |
            terminus auth:login || terminus auth:login --machine-token="${TERMINUS_TOKEN}"
      - run:
          name: Validate Terminus
          command: terminus auth:whoami

jobs:
  build:
    executor: ubuntu-executor
    steps:
      - install_dependencies

workflows:
  version: 2
  build-deploy:
    jobs:
      - build
```

This CircleCI config file does the following:

1. Defines an executor with an Ubuntu environment, which installs PHP.
2. Defines a command `install_dependencies` which does the following:
    - Checks out the code.
    - Installs necessary packages.
    - Restores cache of `~/.terminus` folder if it exists.
    - Fetches the latest version of Terminus from the GitHub API.
    - Installs Terminus and adds its path to the environment variable `$PATH`.
    - Saves the cache for the `~/.terminus` folder.
    - Authenticates Terminus.
    - Validates Terminus is logged in.
3. Defines a job `build` that uses the `install_dependencies` command.
4. Defines a workflow that executes the `build` job.
In this script, replace `TOKEN` with the machine token provided by Terminus, and add it to your environment variables in the CircleCI project settings.
