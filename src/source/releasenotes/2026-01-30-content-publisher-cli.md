---
title: Content Publisher CLI Rename and other updates 
published_date: "2026-01-30"
categories: [content-publisher, action-required]
---

## Key Changes: CLI Rename
We've renamed the [Content Publisher CLI](https://docs.content.pantheon.io/cli-setup) from `pcc` to `cpub` to reflect our product naming. This change affects all CLI commands and the associated NPM package.

### CLI Command
* Old: `pcc`
* New: `cpub`

### NPM Package
* Old: `@pantheon-systems/pcc-cli`
* New: `@pantheon-systems/cpub-cli`

## Action Required

Please update your existing commands by replacing `pcc` with `cpub`. All flags and arguments remain the same. Deprecated `pcc` CLI still functional with warning messages.

### To update your installation:

1. First, log out of the old CLI: 

    ```bash
    pcc logout
    ```

1. Uninstall the old package:

    ```bash
    npm uninstall -g @pantheon-systems/pcc-cli
    ```

1. Install the new package:

    ```bash
    npm install -g @pantheon-systems/cpub-cli
    ```

1. Login to the new CLI: 

    ```bash
    cpub login
    ```

## Additional Changes

* Connected Accounts are no longer tied to the user’s browser and has been migrated to server-side account management improving overall user experience
* Dashboard now displays user account subscription and usage allowing users to keep track of their account usage limits
* A search function has been added to the Collections dropdown in the Tokens modal for easier navigation in workspaces with many collections
* The App Router starter kit default installation no longer uses Static Site Generation (SSG)
* Minor bug fixes and UX improvements
