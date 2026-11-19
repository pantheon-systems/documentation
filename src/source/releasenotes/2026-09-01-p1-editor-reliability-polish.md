---
title: "Enhance Editor Stability: Key Reliability and Polish Updates"
published_date: "2026-09-01"
published_at: "2026-09-01T17:00:00Z"
categories: [p1, new-feature]
description: "Enhance your workflow with the latest reliability and polish updates. This release ensures secure logouts, stable content syncing, and a smoother editing experience. Discover a more robust and intuitive platform today."
---

This release fixes several stability and usability issues across the editor and dashboard — logout now fully ends your session, content sync and page-switching are more reliable, and cleaning up a handful of UI annoyances. The page-reparenting workflow also moves from drag-and-drop to a dedicated modal for more intentional moves.

**Logging out now actually signs you out.** Previously, clicking "Log out" only cleared your local session — the next time you signed in, you were silently signed back in as the same person, with no login prompt. Logout now properly ends your session, so signing in again asks you to authenticate.

**Fixed: reconnecting after a dropped connection may restore old content.** If your connection dropped right after someone else merged changes, reconnecting could occasionally cause content that the merge was supposed to remove to resurface. Reconnecting now always picks up the current, correct version.

**Fixed: switching between pages or branches no longer blanks the editor.** The canvas used to go empty for a moment while the next page loaded; it now stays on the current page's content until the new one is ready.

**Toast notifications are no longer hidden behind support chat**. Previously, warning and success messages in the bottom-right corner would get blocked by the Zendesk support widget, making them impossible to dismiss. Notifications now display above the support chat so you can always see and act on them.

**Page reparenting moved to a dedicated modal.** Instead of using drag-and-drop to move pages around in the tree, reparenting now happens through a clear, focused edit modal. This makes the operation more intentional and prevents accidental moves.

**Site role options now stay in sync.** Site roles in the dashboard now pull directly from your CRR environment's allowed-roles endpoint, ensuring the available roles to assign are always up to date and consistent with your actual setup.

**Fixed: deleting a page now deletes only in the right environment.** Page deletion is now correctly scoped — deleting from your Live workstream no longer affects other workstreams, and vice versa.

**CSS API key now displays in the setup modal.** When you generate a token for p1, the API key now appears correctly in the confirmation modal so you can copy it right away.
