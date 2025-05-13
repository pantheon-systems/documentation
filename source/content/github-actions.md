---
title: Pantheon's GitHub Actions
description: Actions for web teams and plugin authors
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

Pantheon maintains [multiple GitHub Actions](https://github.com/pantheon-systems/action-library) for integrating with our platform or designed for authors of WordPress plugins and other packages.
This page focuses on the two actions most commonly used by web teams deploying to Pantheon.

## Push to Pantheon

Our [Push to Pantheon](https://github.com/stevector/push-to-pantheon) Action handles the creation of [Multidev environments](https://docs.pantheon.io/guides/multidev) to correspond to GitHub pull requests and the pushing to Pantheon's Dev environment after merging of pull requests to a `main` branch.


When running workflow triggered by a pull request, this action will create a Multidev environment and deploy code to it.

![Deploying a PR to a Pantheon Multidev](../images/github-action/diagram--deploying-pr.png)

When running on workflows triggered by merges/pushes to the `main` branch this action will deploy code to [the Pantheon Dev environment](https://docs.pantheon.io/pantheon-workflow).

<!-- These images are also in https://github.com/stevector/push-to-pantheon/tree/0.x/.github/documentation and https://docs.google.com/presentation/d/17k15auDrnpq2LdRC4P35dN5yJ4pOkPY62M7drBDkTCc/edit#slide=id.g32ed471dd64_0_2488 -->
![Deploying main to Pantheon](../images/github-action/diagram--pushing-main.png)

Here is an example of a complete GitHub Actions workflow file to deploy every pull request made on the repository for a WordPress or Drupal codebase to a Pantheon Multidev environment.

```yml
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

For more detailed usage guidance including availabile parameters, compilation of front-end assets through `npm`, and concurrency, [see the full readme file from the Action](https://github.com/pantheon-systems/push-to-pantheon).

## Install Terminus

If you are writing your own GitHub Actions workflows from scratch to interact with Pantheon, you will likely need to install Terminus in your workflow.
(The above Push to Pantheon Action calls Terminus installation for you).
[This is a simple Action](https://github.com/pantheon-systems/terminus-github-actions) that can be added to your workflow file.

```yaml
  - name: Install Terminus
    uses: pantheon-systems/terminus-github-actions@v1
    with:
      pantheon-machine-token: ${{ secrets.PANTHEON_MACHINE_TOKEN }}
```

This Action also handles caching of both the Terminus executable and of the authenticated session which is valuable when running complex workflows across dozens or hundreds of sites.
[See the readme for more details](https://github.com/pantheon-systems/terminus-github-actions).
