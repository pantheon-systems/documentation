# Tools

Small, self-contained helpers for people who review and maintain the Pantheon documentation. Nothing outside this folder imports it, and no workflow in `.github/` runs it, so it never ships to docs.pantheon.io. Delete the folder and the site doesn't notice. Your review workflow will.

## Pick your tool

| You want to... | Use | It is a... | Where it runs |
|---|---|---|---|
| Click a docs PR and see its preview, live page, and diff side by side | [PR preview extension](pantheon-pr-preview-extension/README.md) | Browser extension (Chrome, Brave, Edge) | Your browser |
| Ask "what's waiting on me?", spot stuck PRs, and get links for one PR | [Review queue skill](docs-devrel-review-queue/README.md) | Claude Code skill plus two Node scripts | Your terminal |

New here? Install the extension first. It has the shortest path from zero to a working review: load it, open a docs PR, click the lightning bolt.

## How they fit together

They share one idea: a docs PR is a pull request that changes Markdown, and every changed page has three URLs worth looking at (the multidev preview, the live page, and the GitHub diff).

- The **extension** works from a PR page you already have open.
- The **skill** works from your terminal and finds the PRs for you.
- The skill prints plain `https` links, and the extension recognizes them. With the extension installed, a skill-supplied 2-panel or 3-panel link opens the side-by-side review view. Without it, the same link opens the PR's Files changed page. Neither tool needs the other.

![Two panes side by side: the live Next.js overview page on the left and the pull request preview on the right, with the new bullets visible only in the preview.](images/extension-two-panel.png)

The 2-panel review view on PR #10269: live on the left, the multidev preview on the right. The three bullets under "Usage" exist only in the preview.

## Quick start

Extension, about a minute. Open `chrome://extensions`, turn on **Developer mode**, choose **Load unpacked**, and select `tools/pantheon-pr-preview-extension`. Then open any documentation PR.

Skill, about two minutes. You need Node 18 or later and the GitHub CLI signed in:

```sh
gh auth login
ln -s "$PWD/tools/docs-devrel-review-queue" ~/.claude/skills/docs-devrel-review-queue
```

Then run `/docs-devrel-review-queue` in Claude Code, or run the scripts directly:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs          # your queue
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs 10269  # one PR's packet
```

## Check your work

Run these from the repository root before you push a change to either tool. All of them run offline except the packet script.

```sh
node --check tools/pantheon-pr-preview-extension/popup.js
node --check tools/pantheon-pr-preview-extension/service-worker.js
python3 -m json.tool tools/pantheon-pr-preview-extension/manifest.json > /dev/null && echo "manifest ok"
node tools/pantheon-pr-preview-extension/validate-resolver.cjs
for f in tools/docs-devrel-review-queue/scripts/*.cjs; do node --check "$f" && echo "ok $f"; done
```

The skill ships its own copy of the extension's `pr-resolver.js`, so each tool works alone. Copies drift, so check them when you change either one:

```sh
diff tools/docs-devrel-review-queue/scripts/pr-resolver.js tools/pantheon-pr-preview-extension/pr-resolver.js
```

## Ground rules for this folder

- One folder per tool, each with its own `README.md` that gets a new person from zero to a working result.
- No dependencies to install and no build step. If a tool needs `npm install`, it probably belongs somewhere else.
- No credentials in files, screenshots, or output. The extension has none, and the skill uses your own `gh` login.
- Reading GitHub is fine. Approving, merging, or posting on someone's behalf is not something a tool here does for you.
- Keep screenshots free of names and personal data, and put terminal output in code blocks, not images.
