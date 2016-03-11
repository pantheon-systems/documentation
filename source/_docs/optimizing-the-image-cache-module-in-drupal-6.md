---
title: Optimizing the ImageCache Module in Drupal 6
description: Instructions on how to update ImageCache, a widely used Drupal 6 contributed module.
categories:
  - drupal
keywords: imagecache, drupal, images, patch
---
ImageCache is a widely used Drupal 6 contributed module for dynamically generating thumbnails and other derivative images. Unfortunately, its internal logic relies heavily on a locally attached filesystem and suffers from performance issues in cloud environments like Pantheon.

To help with this, we have produced a [patch for the Drupal IMCE 1.6 module](https://gist.github.com/tauno/4236123) that you can apply against the latest version of ImageCache.
