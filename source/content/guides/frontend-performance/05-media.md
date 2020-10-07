---
title: Frontend Performance 
subtitle: Images and Media
description: desc
anchorid: media
layout: guide
categories: [performance]
tags: [measure, traffic]
type: guide
permalink: docs/guides/frontend-performance/media
editpath: frontend-performance/05-media.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

Optimizing media including images, iframes.

## Lazy-loading images

Lazy-loading of media elements, especially images, is a powerful way to increase perceived performance, reduce time-to-first-render. 

Lazy-loading images is default behavior in WordPress 5.5 and Drupal 9.1. 

### WordPress 

WordPress 5.5 lazy-loads images by default.

### Drupal

In Drupal 9.1 lazy-loading images has been added as default behavior. For Drupal 7 and 8 sites, the [Lazy Load module](https://www.drupal.org/project/lazy)  



## Compress Images
While images are not render blocking, they do need to be loaded as soon as they are visible. However, they will block the `onload` DOM event resulting in longer waits and more spinners. Use the following techniques for handling images.

### Send Text Instead
Many design elements on a page are best loaded as SVGs (Scalable Vector Graphics) rather than JPGs or GIFs. SVGs have the benefit of often looking better than JPGs or GIFs (because they scale to any screen-size). Also, because they are simply text, you have the option of including them inline with HTML. Inlining an SVG, like your website's logo, reduces the number of total requests needed to serve the page.

Ask the designers on your team if any of the elements intended to be loaded as images were created in Adobe Illustrator, Sketch, or any another application that can easily export SVGs.

Social sharing links are often good candidates here and are freely available in packs, such as Ridiculously Responsive Social Sharing Buttons for [WordPress](https://wordpress.org/plugins/rrssb/) or [Drupal](https://www.drupal.org/project/rrssb).

### Lazy Load Images
Lazy loading images is a JavaScript technique that saves bandwidth and lowers load times by delaying the loading of images until they appear in the viewport.

Try the [BJ Lazy Load](https://wordpress.org/plugins/bj-lazy-load/) plugin for WordPress and the [Image Lazyloader](https://www.drupal.org/project/lazyloader) module for Drupal.

### Send Only as Many Pixels as Needed
Images might be expected to grow and shrink by large amounts according to device and browser size, but it's overkill to use a 4000x4000 pixel image within an element that will never render larger than 200x200 pixels.

One of the newer HTML5 tags, `<picture>`, addresses this scenario in ways that the older `<img>` tag did not. Drupal 8 and WordPress core support this tag by default. Drupal 7 support has been backported to the [Picture](https://www.drupal.org/project/picture) module.

Use this new [HTML Tag](https://www.w3schools.com/tags/tag_picture.asp) to define a size attribute appropriate for the given layout at a particular screen-size.

```php
  <picture>
      <source srcset="small.jpg" media="(max-width: 768px)">
      <source srcset="normal.jpg">
      <img srcset="normal.jpg" alt="Default Image Size">
  </picture>
```
### Send Only as Many Bytes as Needed
Resizing an image so that you only send 200x200 pixels instead of 4000x4000 is a good start. The next step is ensuring that the file containing those 200 pixels is as small as it could possibly be without reducing the image quality. This task is commonly called "smushing" and unfortunately there is not a great native PHP option to do so.

The Pantheon Global CDN does not offer image optimization as a feature, but sites that rely on a third-party CDN service provider might have the option of smushing at the CDN level.

For images that are a part of your theme or module/plugin, you can smush them before committing them to Git with an application like [ImageOptim](https://imageoptim.com/mac).


