---
title: Terminus Guide
subtitle: Authenticate Terminus in a CircleCI Pipeline
description: Learn how to authenticate Terminus in a CircleCI pipeline without errors.
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

This section provides information on how to authenticate Terminus in a CircleCI pipeline without receiving errors and avoiding authentication rate limits.

## Caching Authentication for CircleCI Pipelines

You can use the example script in this section for a full start-to-finish Terminus authentication in CircleCI. This pipeline does the following:

- Defines an executor with an Ubuntu environment, which installs PHP.
- Defines a command `install_dependencies` which does the following:
    - Checks out the code.
    - Installs necessary packages.
    - Restores cache of `~/.terminus` folder if it exists.
    - Fetches the latest version of Terminus from the GitHub API.
    - Installs Terminus and adds its path to the environment variable `$PATH`.
    - Saves the cache for the `~/.terminus` folder.
    - Authenticates Terminus.
    - Validates Terminus is logged in.
- Defines a job `build` that uses the `install_dependencies` command.
- Defines a workflow that executes the `build` job.

<Alert title="Note"  type="info" >

Before you use this script:

- Replace `TOKEN` in the script below with the machine token provided by Terminus.
- Add the machine token provided by Terminus to your environment variables in the CircleCI project settings.

</Alert>


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
