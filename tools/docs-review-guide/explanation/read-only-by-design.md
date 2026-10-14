# Read-only by design

Neither tool approves a PR, requests changes, merges, pushes, or posts a comment for you. This page explains why, and what each tool does with your credentials.

## What each tool can and can't do

| | Extension | Review queue skill |
|---|---|---|
| Reads | GitHub PR pages and the API (unauthenticated), preview and live pages | GitHub through your signed-in `gh` token |
| Writes | A checklist saved in your browser, and tabs it opens | Nothing on GitHub. The `--open` flag opens browser tabs on your Mac. |
| Credentials | None. It has no sign-in and no tokens. | Uses your own `gh` login for `api.github.com` only. It never asks for or stores a password. |
| Approve, merge, post | Never | Never. It drafts comments for you to post. |

## Rules the skill follows

- **Read-only on GitHub.** It uses reads such as `gh pr view`, `gh pr diff`, `gh pr checks`, `gh run view`, and `gh api`. It doesn't approve, request changes, merge, push, re-run a check, or resolve a thread.
- **Draft, don't post.** A comment goes up only after you say yes to that exact comment, and then only as a comment, never an approval. Approve and request-changes are always your call.
- **Don't nudge people.** It drafts the Slack or GitHub message for you to send.
- **Don't sign in anywhere.** If something needs SSO, it asks you to open it and paste what you see.
- **Quote the output.** CI, branch drift, and preview status change by the hour, so it runs the check fresh and says what it couldn't read.
- **Don't invent rules.** For a repo with no known style guide, it cites one it found in the repo or says none was found.
- **Don't open previews on its own.** `--open` runs only after you agree, and starts with `--dry-run`.

## Why this is the design

- **Approval carries your name and your permission.** Your approval counts toward branch protection only if you hold write access, and it says you reviewed the change. A tool that approves for you would break that claim.
- **Findings are leads.** The stuck check reads GitHub data. A person confirms the cause before it becomes a message to a colleague.
- **A small blast radius.** The extension holds no credentials and only requests `github.com`, `docs.pantheon.io`, and `pr-<number>-pandocs.pantheonsite.io`, so a bug in it can't act on your behalf.

The folder's own rules say the same: no credentials in files, screenshots, or output, and a tool here doesn't approve, merge, or post on someone's behalf. See `tools/README.md`.

## The one rule that bends

The extension removes `X-Frame-Options` and `Content-Security-Policy` from iframe requests made by its own review page, so GitHub and the docs site can load inside the review view. It applies to requests that page makes, not to other tabs.
