---
title: External Libraries on Pantheon
description: Learn to incorporate external libraries on the Pantheon Website Management Platform.
contenttype: [doc]
innav: [true]
categories: [overview]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [code, libraries, modules, plugins]
reviewed: "2026-01-21"
---

There are some scenarios when an external library is required. The Pantheon platform includes a number of PHP extensions and common libraries that are available for use.

## wkhtmltopdf (Deprecated)

wkhtmltopdf has been abandoned by its maintainers and no longer receives updates. While it is still available on PHP Runtime Generation 1, the package is not available on [PHP Runtime Generation 2](/php-runtime-generation-2). We recommend all sites using wkhtmltopdf switch to [dompdf](https://github.com/dompdf/dompdf).

### Switching from wkhtmltopdf to dompdf

#### Drupal Entity Print Module

dompdf is included with the [Entity Print](https://www.drupal.org/project/entity_print) module. Visit `<your_url>/admin/config/content/entityprint` to confirm you are using dompdf as the PDF engine.

#### Drupal 7 Print Module

For Drupal 7 websites using <a href="https://www.drupal.org/project/print">the print module</a>, begin by downloading the dompdf library compatible with your PHP version.

| PHP version | dompdf lib |
|---------|---------|---------|
| 5.6 - 7.0 | [Dompdf 0.8.3](https://github.com/dompdf/dompdf/releases/tag/v0.8.3) | 
| 7.1 to 8.4 | [Dompdf 3.1.x or the latest](https://github.com/dompdf/dompdf/releases) |

Place the dompdf folder inside the following folder:
`/modules/print/lib/dompdf` or `/sites/all/libraries/dompdf`

From `<your_url>/admin/config/user-interface/print/pdf`, choose dompdf as PDF Generation tool and save the changes.


## Apache Tika

The [Apache Tika](https://tika.apache.org/) toolkit detects and extracts metadata and structured text content from various documents using existing parser libraries.

Tika can extract content from a number of document formats such as HTML, XML, Microsoft Office document formats, and PDFs and more.

<TabList>

<Tab title="PHP Runtime Generation 2" id="tab-1-anchor" active={true}>

The Tika 3.x jar is available at:

- `/opt/pantheon/tika/tika.jar`

To explicitly set your Tika version, add the following to your `pantheon.yml`:

```yaml:title=pantheon.yml
tika_version: 3
```

Valid values are `3` or `none` (to disable Tika).

#### OCR in Tika 3

Tika 3.x defaults to `AUTO` OCR mode, which can significantly increase PDF processing times when Tesseract is used for OCR. A `tika-config.xml` that disables OCR is available at `/opt/pantheon/tika/tika-config.xml` and can be passed to Tika using the `--config` flag:

```bash
/opt/pantheon/tika/tika.jar --config=/opt/pantheon/tika/tika-config.xml
```

</Tab>
<Tab title="PHP Runtime Generation 1" id="tab-2-id">

Tika 1.18 and 1.21 are available for PHP Runtime Generation 1. These versions are available at the following paths:

- `/srv/bin/tika-app-1.18.jar`
- `/srv/bin/tika-app-1.21.jar`

Sites that are using these older versions of Tika should be upgraded to a newer version of Tika as soon as possible. See the PHP Runtime Generation 2 tab for more information.


</Tab>
</TabList>

## ImageMagick

[ImageMagick](https://www.imagemagick.org/script/index.php) is a software suite to create, edit, compose, or convert bitmap images. It can read and write images in a variety of  [formats](https://www.imagemagick.org/script/formats.php) (over 100) including  [DPX](https://www.imagemagick.org/script/motion-picture.php), [EXR](https://www.imagemagick.org/script/high-dynamic-range.php), GIF, JPEG, JPEG-2000, PDF, PNG, Postscript, SVG, and TIFF. Use ImageMagick to resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses and Bézier curves.

To check the available version of ImageMagick on Pantheon, refer to the [PHP 8.3 Info page here](https://v83-php-info.pantheonsite.io/#module_imagick).

### Drupal ImageMagick Configuration

Once you have downloaded and enabled the [ImageMagick module](https://www.drupal.org/project/imagemagick), you'll need to configure the image toolkit settings. Go to the image toolkit settings page at: `admin/config/media/image-toolkit` to select ImageMagick.

When creating a new preset, if the "Division by Zero" warning appears, add the [`image_allow_insecure_derivatives`](https://www.drupal.org/project/image_allow_insecure_derivatives) conf variable to your `settings.php` file.

Some modules (like [ImageAPI Optimize](https://www.drupal.org/project/imageapi_optimize)) require the explicit path to the ImageMagick library. Use the path `/usr/bin/convert`.

ImageAPI Optimize's [support for 3rd-party services](https://www.drupal.org/node/773342) (like advpng and OptiPNG) are not available at this time.

### WordPress ImageMagick Configuration

After you've installed the [ImageMagick Engine Plugin](https://wordpress.org/plugins/imagemagick-engine/#installation), you'll need to enable it in your plugin settings and configure the settings. In the Regenerate Images sidebar, select the sizes you would like to reimage and click **Regenerate**.

![ImageMagick Engine Settings](../images/imagemagick-engine-settings.png)

![Regenerate button in sidebar](../images/imagemagick-regenerate-sidebar.png)


## Troubleshooting and FAQs

### How do I request the addition of a new library or a newer version of an existing library?

Please [contact support](/guides/support/contact-support/) with a description of your use case and a link to the library's webpage. We welcome new requests, but please bear in mind they are not guaranteed and it is possible the feature request may be denied. As a result, we recommend you set aside enough time for alternative solutions.

### Will you set up and configure the module/plugin for me?

No. This is not within our [scope of support](/guides/support). It is important to be aware of how a Drupal module or WordPress plugin is setup and how it functions. This will prove invaluable in cases where you need to plan and build your site.
