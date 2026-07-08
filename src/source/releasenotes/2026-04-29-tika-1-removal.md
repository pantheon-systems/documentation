---
title: "Tika 1.x removed: all sites now use Tika 3"
published_date: "2026-04-29"
categories: [infrastructure, action-required, drupal]
---

As [previously announced](/release-notes/2026/04/tika-3-ocr-config-and-removal-timeline), Tika 1.18 and 1.21 have been removed from the Pantheon platform. All sites now run Tika 3 regardless of the `tika_version` setting in `pantheon.yml`.

## Action Required

* If you have not already done so, remove `tika_version: 1` from your `pantheon.yml` before May 12, 2026.
  * Any `tika_version: 1` entries will be ignored until May 12, 2026, at which point **they will be rejected and prevent deployments**.
* Update the used Tika 1.x path to Tika 3, for details see [related documentation](/external-libraries#apache-tika).
  * Existing Tika 1.x file paths will continue to symlink to the new Tika 3 location for the time being, but these symlinks will be removed at a later date.
