---
title: WordPress Developer's Guide
subtitle: Performant Translations on Pantheon
description: How to manage and generate performant translations on WordPress sites hosted on Pantheon.
contenttype: [guide]
innav: [false]
categories: [cms]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [files]
contributors: [jazzsequence]
reviewed: "2024-04-02"
showtoc: true
permalink: docs/guides/wordpress-developer/performant-translations
---

This section provides information on how to use performant translation files in WordPress on Pantheon.

## What are "Performant Translations"?

WordPress 6.5 introduces the concept of [Performant Translations](https://make.wordpress.org/core/2024/02/27/i18n-improvements-6-5-performant-translations/) into the core CMS. This new feature introduces a `.l10n.php` translation file format that has been shown to load binary `.mo` files far faster than the previous language handling in WordPress core, supports loading multiple locales at the same time and makes locale switching faster. Since the files are PHP, they can be cached by OPcache, which can provide additional performance improvements.

## Generating PHP Translation Files

When you update your language files (e.g. via `terminus wp -- <site>.<env> i18n update`), you should receive the normal `.mo` and `.po` files as well as the new `.l10n.php` files if they are available. However, it's possible the language files have not been recently updated and you lack the `.l10n.php` files. In this case, you can generate the `.l10n.php` files manually from the `.po` and `.mo` files on your environment.

[WP-CLI 2.10.0](/release-notes/2024/02/wp-cli-2-10) introduced a new `make-php` command. On Pantheon, you can use this command via Terminus to generate the `.l10n.php` files for your site. Note: you will need to switch your environment to `SFTP` mode to use this command.

```bash
terminus connection:set <site>.<env> sftp
terminus wp -- <site>.<env> i18n make-php wp-content/languages
terminus env:commit <site>.<env> --message="Generate .l10n.php files"
```

The example above does three things: 1) sets the environment to `SFTP` mode, 2) generates the `.l10n.php` files, and 3) commits the changes to the environment. You can then switch back to `Git` mode if you prefer.


### Considerations

* Running `i18n make-php` will generate `.l10n.php` files _based on the current_ `.mo` files. You might want to run this command after updating your language files (e.g. with [`language core update`](https://developer.wordpress.org/cli/commands/language/core/update/), [`language plugin update`](https://developer.wordpress.org/cli/commands/language/plugin/update/) or [`language theme update`](https://developer.wordpress.org/cli/commands/language/theme/update/)) to ensure the `.l10n.php` files are up-to-date first.
* The existing [known issue relating to WordPress Language Packs](/wordpress-known-issues#language-packs) still apply. As noted above, language packs can only be installed and updated in SFTP mode and then committed to the filesystem via the dashboard or Terminus.