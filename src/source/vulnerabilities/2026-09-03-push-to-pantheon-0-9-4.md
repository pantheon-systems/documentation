---
title: "Push to Pantheon GitHub Action 0.9.4: command injection in git_commit_message"
published_date: "2026-09-03"
status: action-required
cves: []
advisories: []
affects: Push to Pantheon GitHub Action 0.9.0 through 0.9.3
customer_action: Update the action to 0.9.4
description: "Versions 0.9.0 through 0.9.3 of the Push to Pantheon GitHub Action could run commands passed through the git_commit_message parameter. Update to 0.9.4."
---

## What is the vulnerability?

Versions 0.9.0 through 0.9.3 of the [Push to Pantheon GitHub Action](https://github.com/pantheon-systems/push-to-pantheon) interpolated the `git_commit_message` value into a shell string and evaluated it, so shell metacharacters in the message ran as commands rather than being passed as text. Arbitrary commands passed through `git_commit_message` could run on the GitHub Actions runner, which holds your `PANTHEON_MACHINE_TOKEN` and `PANTHEON_SSH_KEY`.

## Are sites on Pantheon affected?

The vulnerability is in the GitHub Action that runs in your GitHub workflow, not in the Pantheon platform. Your workflow is affected only if all of the following are true:

- It uses version 0.9.0 through 0.9.3 of the action.
- It passes text into `git_commit_message` that someone else could control, for example through a pull request title or branch name.
- The site has a Live environment, and the workflow doesn't set `skip_build_tools: true`.

The commit message the action generates by default contains no such text, so default configurations aren't affected. Versions earlier than 0.9.0 pass the message as a single quoted argument and are also unaffected.

## What Pantheon has done

Pantheon released version 0.9.4, which fixes the issue. [@ndewhurst](https://github.com/ndewhurst) reported the vulnerability.

## What you need to do

Update your workflow file to use version 0.9.4 as soon as possible:

```yaml
uses: pantheon-systems/push-to-pantheon@0.9.4
```

If you can't update right away, make sure you aren't passing untrusted text into `git_commit_message`.

## References

- [Pantheon release note](/release-notes/2026/09/push-to-pantheon-0-9-4)
- [Push to Pantheon 0.9.4 release](https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.9.4)
