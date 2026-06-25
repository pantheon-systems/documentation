---
title: "Security tab now available for Next.js sites"
published_date: "2026-06-25"
published_at: "2026-06-25T17:30:00Z"
categories: [nextjs, new-feature]
description: "You can now password protect Next.js environments from the Security tab in the Site Dashboard. Lock and unlock changes take effect after a new build is deployed."
---

The **Security** tab is now available for Next.js sites in the Site Dashboard. You can password protect any environment with basic authentication, the same way you can for Drupal and WordPress sites. When an environment is locked, visitors are prompted for a username and password before the site is served.

To lock an environment, select the environment, open the **Security** tab, choose **Locked**, provide a username and password, and save. To make it public again, choose **Public**. For step-by-step instructions, see [Lock Environments with the Dashboard Security Tool](/guides/secure-development/security-tool).

## Run a new build after changing lock status

On Next.js sites, locking or unlocking an environment does **not** take effect until a new build is deployed to that environment. After you change the lock or unlock status in the Security tab, trigger a new build using the **Rebuild** option (available in the Site Dashboard and through Terminus) or by pushing a new commit to the connected branch, so the change is applied to the running site.

For more details about Next.js on Pantheon, see our [Next.js documentation](/nextjs).
