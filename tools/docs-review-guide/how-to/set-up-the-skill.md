# Set up the review queue skill

Install the Claude Code skill and its two Node scripts, and confirm your GitHub permission. This takes about two minutes. For flags, see the [command reference](../reference/commands.md).

## Before you begin

You need:

- Node 18 or later. The scripts use global `fetch` and have no packages to install. Node 26.8 on macOS is the tested combination; other versions and operating systems are untested.
- The [GitHub CLI](https://cli.github.com/), signed in. The scripts use its token for `api.github.com` only.
- A local clone of `pantheon-systems/documentation`.
- Claude Code, if you want the skill. The scripts run without it.

## Install

From the repository root:

```sh
gh auth login
ln -s "$PWD/tools/docs-devrel-review-queue" ~/.claude/skills/docs-devrel-review-queue
```

Check the scripts load:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs --help
```

## Run it

In Claude Code:

```text
/docs-devrel-review-queue
```

Without Claude Code:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs
```

The first line of output is your permission on each repo it covers:

| Permission | Meaning for you |
|---|---|
| `admin`, `maintain`, `write` | Your approval counts toward branch protection. |
| `triage`, `read` | You can read and comment, but your approval won't count. |
| `no access` | The skill stops for that repo. |

## Optional: cover more than one repo

Add a `scripts/config.local.json` next to the scripts. It's gitignored. See the [configuration reference](../reference/configuration.md).

## Next

[Work your queue](work-your-queue.md).
