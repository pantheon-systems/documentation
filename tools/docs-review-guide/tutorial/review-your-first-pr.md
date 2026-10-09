# Review your first docs PR with both tools

In about 15 minutes, you run the review packet on a real PR, read each part of it, and open the page in the extension's panel view. You also see what the tools report when a PR's preview is gone, which happens on every merged or closed PR.

We use PR #10316, a closed demo PR with a safe fixture on one WordPress docs page. It's closed, so its preview is gone. That's on purpose: you learn to read the tools' answer when a preview isn't there before you meet it on a real review.

Before you start, set up both tools: [install the extension](../how-to/install-extension.md) and [set up the skill](../how-to/set-up-the-skill.md).

## 1. Check you're signed in

From the repository root:

```sh
gh auth status
```

You should see that you're logged in to `github.com`.

## 2. Run the packet

```sh
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs 10316
```

The output starts like this:

```text
# PR #10316: 🧪 Add safe demo fixture to WordPress docs page

https://github.com/pantheon-systems/documentation/pull/10316

State: closed. Head 9f00371. Branch: 19 commits behind main.
```

Your "behind main" count is higher, because the number grows as `main` moves. The `State: closed` line is the one to notice.

## 3. Read the links

Under **Links**, the page `wordpress.md` has five links: Multidev preview, Live, GitHub diff, 2-panel, and 3-panel. The Multidev and Live links end in `#see-also`, the heading of the section that holds the first change, so both open at the same spot.

Open the **Live** link in your browser. It loads, because the live page exists.

## 4. Read what the packet says about the preview and checks

Scroll to **Preview** and **CI**. For this PR, you see:

- **Preview:** "Not responding: The preview answered 404." A closed PR's multidev is deleted, so the preview is gone. The wording says the build "may not have published" the page, which is true of an open PR; here the cause is that the PR is closed.
- **CI:** a count of passed and failing checks, with `wait_for_deployment` failing. That check can't succeed once the multidev is gone.

This is the lesson: a 404 preview doesn't mean the PR is wrong. Check the PR's state first.

## 5. Open the panel view

With the extension installed, open the **2-panel** link from the packet. The tab becomes `Live Article | PR Preview`. The live pane shows the page. The preview pane shows a 404, for the reason in step 4. Open the **GitHub diff** link to see the one-line change.

## 6. Do the same on a real PR

Run the queue and take the first PR that says "Ready for your review":

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs
```

Then run the packet on it, open its 2-panel link, and compare the preview with the live page. Continue with [Review one PR](../how-to/review-one-pr.md).

## What you learned

- The packet gives you every link for a PR in one place.
- The Multidev and Live links open at the section that changed.
- A 404 preview usually means the PR is closed or merged, so read the PR's state before you doubt the PR.
- A panel link opens the side-by-side view with the extension and Files changed without it.
