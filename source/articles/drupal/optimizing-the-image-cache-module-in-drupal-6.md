---
title: Optimizing the ImageCache Module in Drupal 6
category: Important details about the ImageCache Module.
  - optimizing
category:
  - drupal

---

ImageCache is a widely used Drupal 6 contributed module for dynamically generating thumbnails and other derivative images. Unfortunately, its internal logic relies heavily on a locally attached filesystem and suffers from performance issues in cloud environments like Pantheon.

To help with this, we have produced a patch that can be applied against the latest version of ImageCache (2.0-rc2). You can download the patch here:

[http://pantheon-content.s3.amazonaws.com/patches/imagecache\_patheon.patch](http://pantheon-content.s3.amazonaws.com/patches/imagecache_pantheon.patch)
