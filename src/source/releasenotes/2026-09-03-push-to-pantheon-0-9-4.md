---
title: "Push to Pantheon GitHub Action 0.9.4 security update is now available"
published_date: "2026-09-03"
published_at: "2026-09-03T17:14:22Z"
categories: [tools-apis, security, action-required]
description: "Version 0.9.4 of the Push to Pantheon GitHub Action is now available and fixes a command injection issue in the git_commit_message parameter and other improvements."
---

Version [0.9.4](https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.9.4) of the ['Push to Pantheon' GitHub Action](https://github.com/pantheon-systems/push-to-pantheon) is now available.
This release fixes a command injection issue in the `git_commit_message` parameter, adds branch-based Multidev naming, and lets you name the GitHub deployment environment separately for each site.

## Action required

Versions 0.9.0 through 0.9.3 interpolated the `git_commit_message` value into a shell string and evaluated it, so shell metacharacters in the message ran as commands rather than being passed as text.
Arbitrary commands, passed through the `git_commit_message` could run on the GitHub Actions runner, which holds your `PANTHEON_MACHINE_TOKEN` and `PANTHEON_SSH_KEY`.

Only workflows that pass text into `git_commit_message` that someone else could control (e.g. via a PR title or branch name) are affected, and only on a site that has a Live environment and the workflow does not set `skip_build_tools: true` (e.g. uses the default behavior). 
The commit message the action generates on its own by default contains no such text, so default configurations are not affected. 
Versions earlier than 0.9.0 pass the message as a single quoted argument and are also unaffected.

Upgrade to 0.9.4 as soon as possible. 
If you cannot upgrade immediately, ensure you are not passing untrusted text into `git_commit_message`.

Reported by [@ndewhurst](https://github.com/ndewhurst). ([#175](https://github.com/pantheon-systems/push-to-pantheon/pull/175))

## Additional key improvements in this release

- **Branch-based Multidev naming**: Set `target_env_strategy: branch` to name the Multidev after your branch instead of `pr-[NUMBER]`. Branch names are normalized to satisfy Pantheon's naming rules — lowercased, unusable characters folded to hyphens, and trimmed to 11 characters — and a digit is appended when another branch already holds that name. ([#183](https://github.com/pantheon-systems/push-to-pantheon/pull/183))
- **Per-site GitHub deployment environments**: Set `deployment_environment` to name the GitHub deployment environment separately from the Pantheon environment. Without it, a branch that deploys to several Pantheon sites reports every deployment under the same name, so only the most recent one stays visible in the pull request timeline. ([#182](https://github.com/pantheon-systems/push-to-pantheon/pull/182))
- **Multiline commit messages**: `git_commit_message` now accepts multiline values, so you can pass Git trailers such as `Source-Commit:` to record where a deployment came from. ([#175](https://github.com/pantheon-systems/push-to-pantheon/pull/175))
- **More reliable Multidev cleanup**: `delete_old_environments: true` now removes environments for closed pull requests that Terminus Build Tools misses. Build Tools stops paginating after roughly 200 pull requests, so environments for older closed pull requests remained until the site reached its Multidev limit. ([#174](https://github.com/pantheon-systems/push-to-pantheon/pull/174))
- **Multidev limit reported for named environments**: The Multidev limit check now runs when you set `target_env` explicitly. Previously it ran only for automatically derived names, so a deployment to a named environment failed inside Terminus instead of reporting the limit. ([#176](https://github.com/pantheon-systems/push-to-pantheon/pull/176))

## Changes to existing behavior

`target_env` is now validated against Pantheon's environment naming rules. 
A value Pantheon would reject (uppercase letters, underscores, more than 11 characters, or a reserved name such as `master`) now fails immediately with an explanation instead of failing later in Terminus.

## How to upgrade to 0.9.4

Update your workflow file to use `0.9.4`:

```yaml
uses: pantheon-systems/push-to-pantheon@0.9.4
```

For more information about this release, visit the GitHub release page (https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.9.4). To learn more about deploying to Pantheon from GitHub, see GitHub Actions (/github-actions).

If you have questions or concerns about the action, please use the 'Push to Pantheon' issue queue (https://github.com/pantheon-systems/push-to-pantheon/issues).