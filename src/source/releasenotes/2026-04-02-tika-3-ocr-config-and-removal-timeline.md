---
title: "Tika 3 updates and Tika 1.x no longer available starting April 28, 2026"
published_date: "2026-04-02"
categories: [infrastructure, action-required, drupal]
---

## Tika config support for disabling OCR

Tika 3 enables OCR (Optical Character Recognition) via Tesseract by default, which can significantly increase processing times for PDFs and image-based documents. A bundled `tika-config.xml` is now available on all Pantheon environments to disable OCR:

```none
/opt/pantheon/tika/tika-config.xml
```

Pass it to Tika using the `--config` flag:

```bash
/opt/pantheon/tika/tika.jar --config=/opt/pantheon/tika/tika-config.xml
```

See [External Libraries: Apache Tika](/external-libraries#apache-tika) for details.

## Search API Attachments module update for Drupal

Drupal sites using the [Search API Attachments](https://www.drupal.org/project/search_api_attachments) module can now disable OCR directly from the admin UI. Version 10.0.8 adds a **Path to Tika configuration file** field at `/admin/config/search/search_api_attachments`. Set it to `/opt/pantheon/tika/tika-config.xml`


## Tika 1.x no longer available starting April 28, 2026

Tika 1.18 and 1.21 are being removed from the platform:

- **April 28, 2026** — `tika_version: 1` in `pantheon.yml` will be ignored. Sites will automatically use Tika 3.
- **May 12, 2026** — `tika_version: 1` in `pantheon.yml` will be rejected.
