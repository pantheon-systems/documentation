---
title: Frozen Sites
description: What are inactive or frozen sites?
contributors: [wordsmither]
contenttype: [doc]
innav: [true]
categories: [overview]
cms: [--]
audience: [--]
product: [--]
integration: [--]
tags: [--]
showtoc: false
reviewed: 2023-06-20
---

Sandbox sites more than four months old that have not had code commits or other Git activity for three months are "frozen". All requests to a frozen site return a `530 Site Frozen` error code, and the site's Dashboard is unavailable.

To reactivate a site:

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), select the **Sites** tab, and then select the frozen site.

1. Click **Unfreeze site**. The site will be ready for development again within a few minutes.

If you experience any issues, like missing static assets, a [backup](/guides/environment-configuration/restore-environment-backup) of the site is available and can be restored via the Site Dashboard. Please note that only files that have been committed are available after you unfreeze a site.
