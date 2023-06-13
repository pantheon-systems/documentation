---
title: Terminus Guide
subtitle: Authenticate Terminus in a GitLab Pipeline
description: Learn how to authenticate Terminus in a GitLab CI pipeline without receiving errors.
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

This section provides information on how to to authenticate Terminus in a GitLab CI pipeline without receiving errors and avoiding authentication rate limits.

## Caching Authentication for GitLab

You can use the example script in this section for a full start-to-finish Terminus authentication in GitLab.

This pipeline does the following:

- Uses the `ubuntu:latest` Docker image.
- Updates the system and installs necessary tools like PHP, curl, perl, sudo, and git before the script stages.
- Defines a cache for the `$HOME/.terminus` directory. The pipeline system will save and restore the cache for subsequent runs.
- Determines the latest release of Terminus from the GitHub API and stores it in the `TERMINUS_RELEASE` variable.
- Creates a directory for Terminus, downloads it into that directory, makes it executable, and then creates a symbolic link to it in `/usr/local/bin` so that you can run it from anywhere.
- Exports the `TERMINUS_TOKEN` environment variable (assuming that you've already set it in your pipeline settings) and uses it to authenticate Terminus.
- Checks that Terminus is authenticated with `terminus auth:whoami`.


<Alert title="Note"  type="info" >

Before you use this script:

- Define `TERMINUS_TOKEN` in GitLab's CI/CD Environment Variables.
- Replace `${TERMINUS_TOKEN` in the script below with the machine token provided by Terminus.

</Alert>

```yaml
image: ubuntu:latest

before_script:
  - apt-get update -yq
  - apt-get install -y php curl perl sudo git jq

stages:
  - build

cache:
  paths:
    - ~/.terminus

install_terminus:
  stage: build
  script:
    - export TERMINUS_RELEASE=$(curl --silent "https://api.github.com/repos/pantheon-systems/terminus/releases/latest" | jq -r .tag_name)
    - mkdir ~/terminus && cd ~/terminus
    - echo "Installing Terminus v$TERMINUS_RELEASE"
    - curl -L https://github.com/pantheon-systems/terminus/releases/download/$TERMINUS_RELEASE/terminus.phar --output terminus
    - chmod +x terminus
    - sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
    - export TERMINUS_TOKEN=$TERMINUS_TOKEN
    - terminus auth:login || terminus auth:login --machine-token="${TERMINUS_TOKEN}"
    - terminus auth:whoami
```
