---
title: Test and Live Environments for Next.js
description: Specially named Git tags trigger deployments to Test and Live environments for Next.js sites on Pantheon.
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/test-and-live-env

---

<Partial file="nextjs-pre-ga.md" />

By default, all sites on Pantheon have at least three environments: Dev, Test, and Live. Additionally, Multidev workflows correspond to separate branches or pull requests.

The Test and Live environments are special in that they only receive code changes via Git tags.
Deployments to these environments follow a simple pattern in which integers are incremented for each new deployment. For example deployments to Test can be triggered by tags like

```bash{promptUser: user}
pantheon_test_1
pantheon_test_2
pantheon_test_3
```

Similarly, deployments to Live can be triggered by tags like

```bash{promptUser: user}
pantheon_live_1
pantheon_live_2
pantheon_live_3
```

For sites running Drupal and WordPress, these tags are create automatically when triggering a deploment in the dashboard or via Terminus.

Presently, for Next.js sites, deployments to Test and Live must be triggered by Git tags in the connected GitHub repository.

These tags can be created in a few ways including:

* Directly via Git on your local machine
* Via GitHub's Releases interface
* Via GitHub Actions

On Drupal and WordPress sites, the extra Dev and Test environments separating a code in a Multidev from being deployed to Live are valuable for extra testing.
For such sites, the cost of breaking the Live database is high because it may require database restores and content loss in addition to code fixes.

On Next.js sites which may only be displaying data sourced from a headless CMS or Content Publisher, the remediation for deploying broken code to Live is often as simple as pushing a fix to the repository and triggering a new deployment.

Depending on your team's workflow and preferences, you may choose to manually deploy the Test and then to Live, or you may choose to automate deployments to Dev, Test, and Live all at once via GitHub Actions or another CI/CD tool.

## Manual Deployment to Test and Live

To manually deploy to Test or Live, create a Git tag in your local clone of the repository connected to your Pantheon site.
For example, to deploy to Test, you might run

```bash{promptUser: user}
git tag pantheon_test_1 -a -m "Deploying to Test"
git push origin --tags
```

After this tag is pushed to GitHub, Pantheon will detect the new tag and begin building and deploying the code to the Test environment.
The progress of the build and deployment can be monitored via Terminus:

```bash{promptUser: user}
terminus node:logs:build:list my-site-machine-name.test
```

This tactic requires knowing what the next integer tag should be.
To find the latest tag, you can use

```bash{promptUser: user}
git tag --list 'pantheon_live_*' --sort=v:refname | tail -1
```

## Manual creation via GitHub's Releases interface

The manual creation of a tag can also be done via GitHub's Releases interface.

This screenshot shows a tag being created from a `main` branch.

[screenshot]

## Automating tagging via GitHub Actions

If you wish to automate deployments to Test and Live, you can use GitHub Actions or another CI/CD tool to create the necessary tags.

Here is an example repository that uses GitHub Actions to automate deployments to Live by running [a workflow on pushes to the `main` branch](https://github.com/stevector/office-artifacts/blob/345a870642fba423e9360482fb7f716c87f79533/.github/workflows/auto-tag.yml) that invokes a [locally defined (but reusable) Action](https://github.com/stevector/office-artifacts/blob/345a870642fba423e9360482fb7f716c87f79533/.github/actions/pantheon-auto-tag/action.yml) to create the necessary Git tag.

 _What GitHub Action guidance should we give? https://github.com/pantheon-systems/documentation/issues/9725_
