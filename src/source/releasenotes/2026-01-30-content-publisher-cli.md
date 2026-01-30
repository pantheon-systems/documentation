---
title: Content Publisher CLI Rename and other updates 
published_date: "2026-01-30"
categories: [content-publisher, action-required]
---

## Key Changes: CLI Rename
We've renamed the Content Publisher CLI from `pcc` to `cpub` to reflect our product naming. This change affects all CLI commands and the associated NPM package.

### CLI Command
* Old: `pcc`
* New: `cpub`

### NPM Package
* Old: `@pantheon-systems/pcc-cli`
* New: `@pantheon-systems/cpub-cli`

## Action Required

Please update your existing commands by replacing `pcc` with `cpub`. All flags and arguments remain the same. Deprecated `pcc` CLI still functional with warning messages.

### To update your installation:

```bash
# Uninstall the old package
npm uninstall -g @pantheon-systems/pcc-cli

# Install the new package
npm install -g @pantheon-systems/cpub-cli
```

## Additional Changes

* Connected Accounts are no longer tied to the user’s browser and has been migrated to server-side account management improving overall user experience
* Dashboard now displays user account subscription and usage allowing users to keep track of their account usage limits
* A search function has been added to the Collections dropdown in the Tokens modal for easier navigation in workspaces with many collections
* The App Router starter kit default installation no longer uses Static Site Generation (SSG)
* Minor bug fixes and UX improvements
