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

You can use the example script in this section as a starting point to create your own CI scripts.

This pipeline demonstrates an initial `build` stage which installs and authenticates Terminus, followed by a `deploy_many` stage with two parallel jobs which reuse the downloaded Terminus and session token.

- Uses the `ubuntu:latest` Docker image.
- Updates the system and installs necessary tools like PHP, cURL, and PHP libraries Terminus needs before the script stages.
- Adds the current directory to `$PATH`, because you will download Terminus to the current directory.
- Sets an environment variable to store the session token inside the build directory.
- Specifies that the downloaded Terminus phar and the session folder should be cached for future jobs.
- Downloads the latest release of Terminus.
- Checks that Terminus is authenticated with `terminus auth:whoami`.
- Runs two parallel jobs in the `deploy_many` stage, which both reuse the downloaded Terminus and session token.


<Alert title="Note"  type="info" >

Before using this script, you must add a `TERMINUS_TOKEN` variable in the repository's CI/CD settings.

</Alert>

```yaml
image: ubuntu:latest

variables:
  DEBIAN_FRONTEND: noninteractive  # avoid interactive prompts

before_script:
  - apt-get update -yq
  - apt-get install -y jq php curl php-xml php-mbstring

  # add current directory to $PATH
  - export PATH="${PATH}:."

  # need to store the session token inside the build directory
  - export TERMINUS_CACHE_DIR=${PWD}/terminus-session


stages:
  - build
  - deploy_many

cache:
  paths:
    # holds the session login token for reuse in future jobs - $HOME/.terminus by default
    - terminus-session
    # The actual terminus phar so we only need to download it once
    - terminus

install_terminus:
  stage: build
  script:
    - export TERMINUS_RELEASE=$(curl --silent "https://api.github.com/repos/pantheon-systems/terminus/releases/latest" | jq -r .tag_name)
    - echo Fetching release ${TERMINUS_RELEASE}
    - echo "Installing Terminus v${TERMINUS_RELEASE}"
    - curl -L https://github.com/pantheon-systems/terminus/releases/download/${TERMINUS_RELEASE}/terminus.phar --output terminus
    - chmod +x terminus
    - mkdir -p ${PWD}/terminus-session
    - terminus -vvv auth:login --machine-token="${TERMINUS_TOKEN}"
    - terminus -vvv auth:whoami

deployment_one:
  stage: deploy_many
  dependencies: [install_terminus]
  script:
    - terminus -vvv auth:whoami

deployment_two:
  stage: deploy_many
  dependencies: [install_terminus]
  script:
    - terminus -vvv auth:whoami
```
