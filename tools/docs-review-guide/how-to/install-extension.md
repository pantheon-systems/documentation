# Install and update the extension

Load the PR preview extension in a Chromium browser and keep it updated from GitHub. This takes about a minute. For what the extension does, see the [extension reference](../reference/extension.md).

You need Chrome 102 or later, Brave, or Edge, and `git`. The extension isn't in the Chrome Web Store and its manifest has no `update_url`, so your browser never updates it by itself. The folder on disk is what runs, so make that folder a git clone and GitHub stays your source of updates.

## Install

1. Clone only the extension folder. The sparse, shallow clone is about 2 MB because the full repository is large:

   ```sh
   git clone --depth 1 --filter=blob:none --sparse https://github.com/pantheon-systems/documentation.git ~/pantheon-docs-tools
   git -C ~/pantheon-docs-tools sparse-checkout set tools/pantheon-pr-preview-extension
   ```

2. Open `chrome://extensions` (`brave://extensions` in Brave, `edge://extensions` in Edge) and turn on **Developer mode**.
3. Select **Load unpacked** and choose `~/pantheon-docs-tools/tools/pantheon-pr-preview-extension`, the folder that contains `manifest.json`. In the macOS file picker, press **Cmd+Shift+G** and paste the path.
4. Pin the extension from the puzzle-piece menu so the lightning bolt stays visible.
5. Open any documentation PR and click the bolt.

Already have a full clone of the repository? Skip step 1 and load `tools/pantheon-pr-preview-extension` from it.

## Check that it works

Open a PR on `pantheon-systems/documentation` that changes a Markdown page. The popup lists one row per changed page with **Preview**, **Live**, **2-panel**, and **3-panel** buttons. If the card on `chrome://extensions` shows a red **Errors** button, you selected the wrong folder. Reload with the one that holds `manifest.json`.

## Update

Pull, then reload the extension:

```sh
git -C ~/pantheon-docs-tools pull --ff-only
grep '"version"' ~/pantheon-docs-tools/tools/pantheon-pr-preview-extension/manifest.json
```

Then select the reload icon on the extension's card in `chrome://extensions`. The card's version should match the `grep` output.

## Keep it healthy

- **Keep the folder where it is.** Chrome runs the extension from that path. If you move or delete the clone, the extension breaks until you load it again.
- **Don't edit files in it.** Local edits make `git pull --ff-only` fail. To change the extension, work in your own checkout of the repository and open a PR.
- **Don't load a downloaded ZIP.** A ZIP has no git history, so it never updates.

If something doesn't work, see [Troubleshoot](troubleshoot.md).
