---
title: Hide or dismiss the WordPress core update notice
published_date: "2026-07-15"
published_at: "2026-07-15T12:00:00Z"
categories: [new-feature, wordpress]
description: "The Pantheon WordPress core update notice can now be dismissed per user, or hidden site-wide with CSS, a filter, or a constant."
---

The Pantheon [WordPress core update notice](/core-updates#suppress-wordpress-admin-notice) ("A new WordPress update is available!") can now be dismissed or hidden.

## Dismiss the notice

Any user who sees the notice can dismiss it with the **X** in the corner. The dismissal is saved per user, so it persists across page loads and logins. The notice reappears only when a newer WordPress version becomes available.

## Hide the notice

To hide the notice more permanently, or for everyone, you can:

- Target `#pantheon-update-notice` (or the `.pantheon-update-notice` class) with CSS.
- Return `false` from the `pantheon_show_update_notice` filter.
- Define the `PANTHEON_SHOW_UPDATE_NOTICE` constant as `false` in `wp-config.php`.

For details, see [Suppress WordPress Admin Notice](/core-updates#suppress-wordpress-admin-notice).
