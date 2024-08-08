---
title: Frontend Performance
subtitle: Images and Media
description: Optimizing media and images for frontend performance.
tags: [measure, traffic]
type: guide
showtoc: true
permalink: docs/guides/frontend-performance/media
editpath: frontend-performance/05-media.md
reviewed: "2020-10-10"
contenttype: [guide]
innav: [false]
categories: [optimize]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

This pages includes information on optimizing media, such as images and iframes.

<Alert title="Note"  type="info" >

Pantheon supports a maximum upload resolution of 3999 pixels for images.

</Alert>

## Lazy-loading Images

Lazy loading images is a JavaScript technique that saves bandwidth and lowers load times by delaying the loading of images until they appear in the viewport. Lazy-loading media elements, especially images, is a powerful way to increase perceived performance and reduce time-to-first-render.

### WordPress

WordPress 5.5 [lazy-loads images by default](https://make.wordpress.org/core/2020/04/08/lazy-loading-of-images-is-in-core/).

### Drupal

In the latest version of Drupal, lazy-loading images has been [added as default behavior](https://www.drupal.org/blog/drupal-1-0). For Drupal 7 and 8 sites, use the [Lazy Load module](https://www.drupal.org/project/lazy).

## Compress Images

While images are not render blocking, they do need to be loaded as soon as they are visible. However, they will block the `onload` DOM event resulting in longer waits and more spinners. Use the following techniques for handling images.

### Send Text Instead

Many design elements on a page are best loaded as SVGs (Scalable Vector Graphics) rather than JPGs or GIFs. SVGs have the benefit of often looking better than JPGs or GIFs (because they scale to any screen-size). Also, because they are simply text, you have the option of including them inline with HTML. Inlining an SVG, like your website's logo, reduces the number of total requests needed to serve the page.

Ask the designers on your team if any of the elements intended to be loaded as images were created in Adobe Illustrator, Sketch, or any another application that can easily export SVGs.

Social sharing links are often good candidates here and are freely available in packs, such as Ridiculously Responsive Social Sharing Buttons for [WordPress](https://wordpress.org/plugins/rrssb/) or [Drupal](https://www.drupal.org/project/rrssb).

### Send Only as Many Pixels as Needed

Images might be expected to grow and shrink by large amounts according to device and browser size, but it's excessive to use a 3999x3999 pixel image within an element that will never render larger than 200x200 pixels.

One of the newer HTML5 tags, `<picture>`, addresses this scenario in ways that the older `<img>` tag did not. The latest version of Drupal and WordPress core support this tag by default. Drupal 7 support has been backported to the [Picture](https://www.drupal.org/project/picture) module.

Use this new [HTML Tag](https://www.w3schools.com/tags/tag_picture.asp) to define a size attribute appropriate for the given layout at a particular screen-size:

```php
  <picture>
      <source srcset="small.jpg" media="(max-width: 768px)">
      <source srcset="normal.jpg">
      <img srcset="normal.jpg" alt="Default Image Size">
  </picture>
```

### Send Only as Many Bytes as Needed

Resizing an image so that you can send 200x200 pixels instead of 4000x4000 is a good start. The next step is ensuring that the file containing those 200 pixels is as small as it could possibly be without reducing the image quality. This task is commonly called "smushing" and unfortunately there is not a great native PHP option to do so.

The Pantheon Global CDN is limited to IO Starter. Sites that rely on a third-party CDN service provider might have the option of smushing at the CDN level for image optimization.

For images that are a part of your theme or module/plugin, you can smush them before committing them to Git with an application like [ImageOptim](https://imageoptim.com/mac).

Refer to [AGCDN with WAF/IO Features](/guides/agcdn/agcdn-wafio) if you are interested in advanced image optimization on the Pantheon platform.