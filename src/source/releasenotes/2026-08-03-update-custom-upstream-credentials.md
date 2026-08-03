---
title: "Update Custom Upstream credentials in the Dashboard"
published_date: "2026-08-03"
published_at: "2026-08-03T00:00:00Z"
categories: [new-feature]
---

You can now update the credentials for a Custom Upstream directly from the Pantheon Dashboard, without recreating the upstream. Previously, changing a private repository's access token required creating a new Custom Upstream and switching each site over to it.

## What's new

- The upstream **Settings** page now has a **Repository credentials** section that shows whether credentials are set and lets you update them — a GitHub personal access token or a Bitbucket repository access token.
- The stored credential is masked and never displayed back in the Dashboard.

Changing the repository **URL** still requires creating a new Custom Upstream.

For steps, see [Edit an Existing Custom Upstream](/guides/custom-upstream/edit-custom-upstream).
