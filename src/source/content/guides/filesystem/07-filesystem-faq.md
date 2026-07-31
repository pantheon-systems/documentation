---
title: Pantheon Filesystem
subtitle: FAQs
description: Get answers to frequently asked questions about Pantheon's filesystem migration to GCS FUSE.
contenttype: [guide]
contributors: [ernieambrose]
showtoc: true
innav: [false]
categories: [files]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [files, filesystem, migration]
permalink: docs/guides/filesystem/filesystem-faq
---

This section provides answers to frequently asked questions about Pantheon's filesystem migration to Google Cloud Storage FUSE (GCS FUSE).

### What is changing?

Pantheon is upgrading the underlying filesystem that stores your site's uploaded files — images, PDFs, and other media in `wp-content/uploads` (WordPress) or `sites/default/files` (Drupal). We're replacing our legacy shared filesystem with Google's Cloud Storage FUSE (GCS FUSE), a more modern, reliable, and scalable solution built on Google Cloud infrastructure.

### Why is Pantheon making this change?

Pantheon's legacy filesystem was innovative when we built it, but Google Cloud Storage FUSE now surpasses it in performance and reliability. The new filesystem creates and restores backups faster and more reliably. It also scales more effectively as your site grows.

### Do I need to do anything?

For most customers: no. Pantheon manages the migration. After your site is migrated, you should test it briefly to confirm everything works as expected and open a support ticket if you notice any issues.

A small number of sites will require action before migration can proceed — Pantheon will contact you directly if your site is one of them (see "Long Filenames" below).

### When will my site be migrated?

- We are rolling the new filesystem out as the default for new sites starting August 3, 2026
- Existing site migrations begin September 1, 2026, sequenced in batches through the end of 2026
- You will be notified in advance of your site's migration window

### Can I opt my existing sites into the new filesystem early?

Yes — contact your Pantheon representative or reach out via a support ticket to request early migration.

### Can I opt out of the migration?

No. The migration is required for all sites as part of Pantheon's infrastructure modernization. We will notify you in advance and work to make the transition as seamless as possible.

### Will there be any downtime during migration?

The vast majority of migrations will be transparent with no noticeable downtime. We use a copy-then-switchover approach that minimizes any write lock to seconds. Sites with very large file stores (over 1 million files) will be scheduled during low-traffic periods or during Pantheon's monthly maintenance windows to further reduce risk.

### What are the benefits after migration?

- Faster, more reliable backups — current backup success rate of 97–98% improves to a target of 99%+
- More resilient — your file storage is backed by Google Cloud infrastructure with high durability guarantees

### Is the per-file size limit changing?

The size limit for individual files remains at 256MB. 

### My site has very long filenames — will there be an issue?

Cloud Storage FUSE has a maximum file path length of 1,024 bytes. Most sites are unaffected. If your site has files that exceed this limit, Pantheon will notify you in advance and work with you to resolve the issue. For most affected sites, the fix involves flushing plugin caches — which Pantheon handles automatically. A very small number of sites with non-cache data in long paths will require direct coordination before migration. If your sites are impacted, your CSM will contact you directly with next steps.

### Are there storage limits on the new filesystem?

Storage limits are determined by your Pantheon plan. The new filesystem does not impose additional per-folder file count limits beyond your plan's overall storage quota.

### How will I know my site has been migrated, or if a new site I created is using the new filesystem?

In Site details, there is a Filesystem Generation field. Sites that are on the new filesystem will have a "2" in this field.

### Where do I go if I have questions or something goes wrong?

Open a support ticket through your Pantheon dashboard. Please reference "filesystem migration" so our team can route your ticket appropriately.

## More Resources

- [Pantheon Filesystem](/guides/filesystem) - Learn more about files on Pantheon.
- [Backup Creation](/guides/backups) - Learn how Pantheon's backup system works.
- [Support Ticket](/guides/support/contact-support/) - Open a support ticket through your Pantheon dashboard.
