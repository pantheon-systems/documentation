---
title: "Terminus Warning: Site Creation Without an Org"
published_date: "2026-03-31"
categories: [tools-apis]
---

Terminus will now display a **warning message** when a site is created without specifying a Professional Workspace (org). This is a non-breaking change — site creation will still succeed, but users will be notified that this behavior is being deprecated.

## What's changing? 

When running `terminus site:create` without the `--org` flag, Terminus will display the following warning:

> An org must be defined to create a site.

Sites created without an org are added to your **My Dashboard** workspace.

## What's not changing? 
Site creation without an org will still complete successfully at this stage. No changes to your existing Terminus scripts are required yet.

## Looking ahead
Starting **June 1, 2026**, specifying an org will be **required** when creating sites via Terminus. We recommend updating your scripts now to avoid disruption:

```
terminus site:create <site> <label> <upstream> --org=<org>
```
