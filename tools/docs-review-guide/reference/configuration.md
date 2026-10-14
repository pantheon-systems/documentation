# Configuration reference

The extension has no settings. The review queue skill reads one optional file and checks your permission on each repo.

## `config.local.json`

An optional file next to the scripts, at `tools/docs-devrel-review-queue/scripts/config.local.json`. It's gitignored. Without it, the scripts cover `pantheon-systems/documentation` only.

```json
{
  "repos": ["documentation"],
  "orgs": [],
  "team": [],
  "engineering": ""
}
```

| Key | Type | Effect |
|---|---|---|
| `repos` | Array of repo names in `pantheon-systems` | Repos to cover. Names may use letters, digits, `.`, `_`, and `-`. Replaces the default. |
| `orgs` | Array of org names | Orgs searched for review requests only. |
| `team` | Array of GitHub logins | The people `--filter awaiting` checks when you pass no `--reviewer`. |
| `engineering` | String | The name the stuck check uses for whoever owns the site code, in "Leave it to ..." next steps. |

## Permission levels

The queue prints your permission on each repo first.

| Permission | What the skill does |
|---|---|
| `admin`, `maintain`, `write` | Full help. Your approval counts toward branch protection. |
| `triage`, `read` | Reads the PR and drafts comments. Your approval won't count, so it suggests a comment review. |
| `no access` | Stops for that repo. It doesn't use another person's access or cached data. |

## Other repos

`--repo <name>` covers another repo in the org. The skill has no preview, publish rule, or style guide for it, so it reads the repo's own `CONTRIBUTING.md`, `CLAUDE.md`, `AGENTS.md`, and `CODEOWNERS`, and cites what it finds.

## Environment

| Need | Why |
|---|---|
| Node 18 or later | Both scripts are plain Node with no packages to install |
| The GitHub CLI, signed in | The queue search needs your token. Without it, the packet is limited to 60 API requests per hour. |
| macOS | Only for `--open` |
