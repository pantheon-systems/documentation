---
title: "New filesystem used for newly created WordPress and Drupal sites"
published_date: "2026-08-03"
published_at: "2026-08-03T15:36:00Z"
categories: [new-feature, infrastructure]
---

As of today, an increasing percentage of newly created sites on Pantheon will use a filesystem backed by Cloud Storage FUSE for their uploaded files (`wp-content/uploads` for WordPress and `sites/default/files` for Drupal). This filesystem replaces the "Valhalla" system Pantheon pioneered for sharing files across horizontally scalable PHP containers.

Existing sites will migrate to this new filesystem over the remainder of 2026 starting on 09/01/26.

With this change, we can create and restore backups faster and more reliably.

## Background

Both WordPress and Drupal were originally architected in the early 2000s for systems where developer-controlled application files (`.php`, `.css`, `.js`, etc.) and files uploaded by CMS users (images, PDFs, etc.) would live on the same server. By default, both CMSes will write uploaded files to the local file system. Those defaults break down when the application files are horizontally scaled across multiple servers or containers which need to share access to an ever-changing set of uploaded files. To solve this challenge at Pantheon's founding we created a scalable filesystem (Valhalla) that mounted across containers which allows sites to behave as though they are writing to a local disc while those files are actually shared across containers. Additionally, this approach allows for the wide variance in the amount of files uploaded to WordPress or Drupal, with some sites writing millions of files.

While Valhalla was an innovative solution at Pantheon's founding, it has since been surpassed in performance by solutions like Cloud Storage FUSE. Thanks to our partnership with Google Cloud, we can deprecate Valhalla in favor of a more robust filesystem.

## Rollout Timeline

**New Sites:** New sites will begin to be provisioned using the new filesystem on 8/3, ramping up to 100% of new sites being provisioned using the new filesystem by 8/17. There is no additional action you need to take.

**Existing Sites:** Existing site migrations will begin 9/1/2026. Rollout timeline:

- Free sites: September 1, 2026
- Basic sites: October 5, 2026
- Performance sites: November 16, 2026
- Elite sites: November 30, 2026

## How to determine which Filesystem your site is using

In Site details, there is a Filesystem Generation field. Sites that are on the new filesystem will have a “2” in this field.
  

For more information, see our [documentation](/guides/filesystem). Should you have any questions or concerns, please reach out to our customer support team via chat or email us at the [Pantheon Helpdesk](https://pantheon.io/docs/guides/support/contact-support/).
