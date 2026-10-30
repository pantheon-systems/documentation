---
title: "Push to Pantheon GitHub Action 0.9.7 update is now available"
published_date: "2026-10-30"
published_at: "2026-10-30T17:11:22Z"
categories: [tools-apis, new-feature]
description: "Version 0.9.7 of the Push to Pantheon GitHub Action adds inputs to control whether new Multidevs clone files and the database, and lowercases target_env instead of rejecting it."
---

Version [0.9.7](https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.9.7) of the [Push to Pantheon GitHub Action](https://github.com/pantheon-systems/push-to-pantheon) is now available.
This release adds inputs that control what a new Multidev clones from its source environment, and makes the `target_env` input more forgiving about capitalization.

## What's new

- **Control what new Multidevs clone**: Two new optional inputs, `clone_files` and `clone_database`, control what the action copies from `source_env` when it creates a Multidev. Both default to `true`, so existing workflows behave as before. Set either to `false` to skip that content (the action passes `--no-files` or `--no-db` to `terminus multidev:create`). This is useful when a Multidev only needs code, or when cloning a large database or files directory slows down every pull request. The inputs only apply when the action creates the Multidev. They have no effect on a Multidev that already exists. They also don't apply when the action deploys with Terminus Build Tools, which creates the Multidev itself. In that case the action logs a warning if either input is set to `false`. ([#199](https://github.com/pantheon-systems/push-to-pantheon/pull/199))
- **Uppercase `target_env` values are lowercased**: Pantheon environment names must be lowercase. In 0.9.4 through 0.9.6, a `target_env` with uppercase letters failed the deployment with a message that the name was not a valid Pantheon environment. The action now lowercases the value and logs a message noting the change. Other naming problems, such as underscores, and reserved names like `master`, are still rejected. Branch names longer than 11 characters are still truncated to a maximum of 11 characters. ([#200](https://github.com/pantheon-systems/push-to-pantheon/pull/200))

### Example

This workflow step creates new Multidevs with code only, without copying the database or files from the source environment:

```yaml
- uses: pantheon-systems/push-to-pantheon@0.9.7
  with:
    ssh_key: ${{ secrets.PANTHEON_SSH_KEY }}
    machine_token: ${{ secrets.PANTHEON_MACHINE_TOKEN }}
    site: ${{ vars.PANTHEON_SITE }}
    skip_build_tools: true
    clone_files: false
    clone_database: false
```

## How to upgrade to 0.9.7

Update your workflow file to use `0.9.7`:

```yaml
uses: pantheon-systems/push-to-pantheon@0.9.7
```

For more information about this release, see the [GitHub release page](https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.9.7). To learn more about deploying to Pantheon from GitHub, see [GitHub Actions](/github-actions).

If you have questions or concerns about the action, ask in [Pantheon Community Slack](https://pantheon.io/customer-community) or use the [Push to Pantheon issue queue](https://github.com/pantheon-systems/push-to-pantheon/issues).
