---
title: "Push to Pantheon GitHub Action 0.9.5 update is now available"
published_date: "2026-09-03"
published_at: "2026-09-03T19:30:00Z"
categories: [tools-apis, new-feature]
description: "Version 0.9.5 of the Push to Pantheon GitHub Action skips deployments to branches without PRs instead of reporting a deployment failure."
---

Version [0.9.5](https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.9.5) of the ['Push to Pantheon' GitHub Action](https://github.com/pantheon-systems/push-to-pantheon) is now available.
This release changes how the action handles a push that has no Pantheon environment to deploy to, and corrects the documentation for the `target_env` and `target_env_strategy` inputs.

## What's new

A Multidev comes from a pull request.
A push to any other branch has nothing to derive an environment name from.

In 0.9.4 the action treated that as an error and failed the job, so adding the action to a workflow that runs on every push would fail on a feature branch with no PR.
In 0.9.5 the action skips the remaining steps and the job succeeds, and the step log records why the deployment was skipped.

A misconfiguration still fails the job: a `target_env` value Pantheon will not accept, an unrecognized `target_env_strategy`, or the `branch` strategy with no branch to read.

If you want pushes to other branches to deploy, set `target_env_strategy: branch` to deploy to a Multidev named after the branch, or set `target_env` explicitly. ([#188](https://github.com/pantheon-systems/push-to-pantheon/pull/188))

## How to upgrade to 0.9.5

Update your workflow file to use `0.9.5`:

```yaml
uses: pantheon-systems/push-to-pantheon@0.9.5
```

For more information about this release, see the [GitHub release page](https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.9.5). To learn more about deploying to Pantheon from GitHub, see [GitHub Actions](/github-actions).

If you have questions or concerns about the action, please use the [Push to Pantheon issue queue](https://github.com/pantheon-systems/push-to-pantheon/issues).
