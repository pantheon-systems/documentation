---
title: Terminus Guide
subtitle: Authenticate Terminus in a Bitbucket CI Pipeline
description: Learn how to authenticate Terminus in a Bitbucket CI pipeline without receiving errors.
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

This section provides information on how to to authenticate Terminus in a Bitbucket CI pipeline without receiving errors and avoiding authentication rate limits.

## Caching Authentication for Bitbucket Pipelines

You can use the example script in this section for a full start-to-finish Terminus authentication in Bitbucket. This pipeline does the following:

- Uses the `ubuntu:latest` Docker image.
- Performs `git clone` to checkout the code from the repository.
- Updates the system and installs necessary tools like PHP, curl, perl, sudo, and Git.
- Determines the latest release of Terminus from the GitHub API and stores it in the `TERMINUS_RELEASE` variable.
- Creates a directory for Terminus, downloads it into that directory, makes it executable, and then creates a symbolic link to it in `/usr/local/bin` so that you can run it from anywhere.
- Exports the `TERMINUS_TOKEN` environment variable (assuming that you've already set it in your pipeline settings) and uses it to authenticate Terminus.
- Checks that Terminus is authenticated with `terminus auth:whoami`.
- Defines a cache for the `$HOME/.terminus` directory. The pipeline system will save and restore the cache for subsequent runs.

<Alert title="Note"  type="info" >

Before you use this script:

- Ensure that you have defined `TERMINUS_TOKEN` in Bitbucket Pipeline's Environment Variables.
- Replace `${TERMINUS_TOKEN}` in the script below with the machine token provided by Terminus.
- Add the machine token provided by Terminus to your environment variables in the Bitbucket pipeline settings.

</Alert>

```yaml:title=bitbucket-pipelines.yml

image: ubuntu:latest

pipelines:
  default:
    - step:
        name: Install and Configure PHP and Terminus
        script:
          - apt-get update
          - apt-get install -y php curl perl sudo git jq
          - git clone $BITBUCKET_CLONE_URL .
          - export TERMINUS_RELEASE=$(curl --silent "https://api.github.com/repos/pantheon-systems/terminus/releases/latest" | jq -r .tag_name)
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
