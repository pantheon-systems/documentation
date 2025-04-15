---
title: Pantheon's GitHub Actions
description: todo
tags: [continuous-integration, workflow, D8, D9, D10]
contenttype: [doc]
innav: [true]
categories: [automate, workflows]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2025-04-15"

---

Pantheon maintains multiple GitHub Actions for integrating with our platform.
Some are general purpose, while others are specific to certain workflows.


## Push to Pantheon

Our Push to Pantheon Action handles the creation of Multidev environments to correspond to GitHub pull requests and the pushing to Pantheon's Dev environment after merging of pull requests to a `main` branch.

_todo_ digram




```
Here is an example of a complete GitHub Actions workflow file that uses our new Action to deploy every pull request made on the repository for a WordPress or Drupal codebase to a Pantheon Multidev environment.

name: Deploy PR to Pantheon

concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number }}
  cancel-in-progress: false

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Push to Pantheon
      uses: pantheon/push-to-pantheon@0.5.0
      with:
        ssh_key: ${{ secrets.PANTHEON_SSH_KEY }}
        machine_token: ${{ secrets.PANTHEON_MACHINE_TOKEN }}
        site: ${{ vars.PANTHEON_SITE_MACHINE_NAME }}

```

For more detailed guidance on usage of this Action including availabile parameters, compilation of front-end assets through `npm`, and concurrency, [see the full readme from the Action](https://github.com/stevector/push-to-pantheon).




## Install Terminus

If you are writing your own GitHub Actions workflows from scratch to interact with Pantheon, you will likely need to install Terminus in your workflow. (The above Push to Pantheon Action calls Terminus installation for you). This is a simple step that can be added to your workflow file.

```yaml


```

## Autotag?







