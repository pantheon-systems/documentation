# Troubleshoot the extension and the queue

Fix the failures people hit most. Find your symptom, then follow the fix.

## Extension

| What you see | Why, and what to do |
|---|---|
| No tab opened, badge shows a number | The PR changes two or more pages. That's by design. Use **Open all previews**. |
| No tab opened, no badge, and you've seen this PR before | The extension opens a PR's preview once per browser session. Use the **Preview** button, or restart the browser. |
| The preview tab is a 404 | The PR is merged or closed (its multidev is deleted), or the build hasn't published yet. Wait, then **Retry preview**. |
| Badge shows `?` | The PR changes no Markdown page with a `permalink`, for example a PR that only touches `tools/`. Expected. |
| Badge shows `!`, or "GitHub metadata could not be loaded" | GitHub's unauthenticated API limit: 60 requests an hour per IP. Wait up to an hour. |
| The panel says the preview isn't responding | A cold multidev can take about 30 seconds on the first request. **Retry preview**, or use **View deployment checks**. |
| A 2-panel or 3-panel link opens Files changed | The extension isn't loaded, or the link's `page=` isn't a changed file with a `permalink`. The badge shows `?` in that case. |
| The card shows a red **Errors** button | You selected the wrong folder. Reload with the one that holds `manifest.json`. |
| You changed code and nothing changed | Select the reload icon on the extension's card. |
| `git pull --ff-only` fails | You edited files in the clone. Discard those edits, or work in your own checkout and open a PR. |

To look inside, select **service worker** on the extension's card in `chrome://extensions` for the background console. Right-click the popup and choose **Inspect** for the popup's console.

## Review queue and packet

| What you see | Why, and what to do |
|---|---|
| `gh` asks you to log in, or the queue search fails | Run `gh auth login`. The queue search needs a token. |
| Permission shows `read` or `triage` | Your approval won't count toward branch protection. Read, comment, and let someone with write access approve. |
| Permission shows `no access` | The skill stops for that repo. It won't borrow another person's access. |
| "rate limit" | Unauthenticated GitHub calls allow 60 an hour. Drop `--no-auth` so it uses your token. |
| A Live link returns 404 | On a PR that adds a page, the page isn't published yet. Expected. |
| A Multidev link returns 404 or times out | The PR is merged, the build hasn't published, or the multidev is waking up. A cold one can take about 30 seconds. |
| 2-panel opens Files changed, not the side-by-side view | The extension isn't installed or loaded. See [Install and update the extension](install-extension.md). |
| No links for a PR | It changes no Markdown page with a front-matter `permalink`, or it's in a repo with no preview defined. |
| `--open` does nothing off a Mac | It uses macOS `open`. Copy the URLs from the packet instead. |
| A search is skipped | GitHub rate-limited it. Raise `--pause`, or split the run. See [Use queue filters](use-queue-filters.md). |

## Still stuck

Run the validation commands from the [extension reference](../reference/extension.md#validation), and the syntax check for the scripts:

```sh
for f in tools/docs-devrel-review-queue/scripts/*.cjs; do node --check "$f" && echo "ok $f"; done
```
