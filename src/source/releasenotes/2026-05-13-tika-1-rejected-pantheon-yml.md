---
title: "Tika 1 is no longer accepted in pantheon.yml"
published_date: "2026-05-13"
categories: [infrastructure, action-required, drupal]
---

Setting `tika_version: 1` in `pantheon.yml` is now rejected at validation time. Sites with this setting will receive a validation error on their next commit:

```none
1 is not one of [3, 'none']
```

Tika 1.18 and 1.21 were [removed from the platform on April 28, 2026](/release-notes/2026/04/tika-3-ocr-config-and-removal-timeline). Since that date, `tika_version: 1` was silently ignored and sites automatically used Tika 3. This change formalizes the rejection so that sites receive a clear error instead of a silent fallback.

## Action Required

Update your `pantheon.yml` to use a supported value:

```yml:title=pantheon.yml
tika_version: 3
```

Or remove the `tika_version` setting entirely if your site does not use Tika. To explicitly disable Tika, set `tika_version: none`.

For Tika 3 configuration details, including how to disable OCR, see [External Libraries: Apache Tika](/external-libraries#apache-tika).
