---
title: External Libraries on Pantheon
description: Learn to incorporate external libraries on the Pantheon Website Management Platform.
tags: [services]
categories: []
---
There are some scenarios when an external library is required. Pantheon has installed a number of common libraries that are available on the platform.


<!-- h2 id="pdftk"><a href="https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/">PDFTK - PDF Tool Kit</a></h2>




<p>In its own words: &quot;If PDF is electronic paper, then pdftk is an electronic staple-remover, hole-punch, binder, secret-decoder-ring, and X-Ray-glasses. Pdftk is a simple tool for doing everyday things with PDF documents.&quot;</p>


<p>PDFTK can be found on your application server @ /usr/bin/pdftk. The current version supported on Pantheon is 1.44.</p>


<p>To install, add&nbsp;<br />
To install, first put your development site in SFTP mode. Then, execute the following commands from your local terminal:</p>


<pre class="terminal">
drush @pantheon.SITENAME.ENV dl pdftk token libraries
drush @pantheon.SITENAME.ENV en pdftk
</pre // -->
## WKHTMLtoPDF

[WebKit HTML](https://wkhtmltopdf.org/) allows you to create a snapshot or capture the content of a web page easily in a PDF.

WKHTMLtoPDF can be found on your application server at `/srv/bin/wkhtmltopdf`

### Drupal
Download and enable the print module and extensions via drush:
```
drush @pantheon.{sitename}.{env} en print --y
```
Create a symlink to the hosted library and your site's libraries directory [via Git](/docs/git/#clone-your-site-codebase):
```bash
mkdir -p sites/all/libraries/wkhtmltopdf
ln -s /srv/bin/wkhtmltopdf sites/all/libraries/wkhtmltopdf/wkhtmltopdf
git add .
git commit -m "Added WKHTMLtoPDF library"
git push
```
### WordPress
Currently, there are no known plugins that implement WKHTMLtoPDF directly. However, you can use the converter by creating a custom plugin or by placing the code within your theme's `functions.php` file.

## PhantomJS

In its own words, [PhantomJS](https://github.com/ariya/phantomjs/) is a headless WebKit with JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.

PhantomJS is located at `/srv/bin/phantomjs` on your application server.

### Drupal PhantomJS Configuration

Once you have downloaded and enabled the PhantomJS Capture module, you'll need to configure the image toolkit settings. Go to the image toolkit settings page at: `/admin/config/user-interface/phantomjs_capture` to specify the library path.

**Path to phantomJS:** `/srv/bin/phantomjs`


## Apache Tika

The [Apache Tika](https://tika.apache.org//) toolkit detects and extracts metadata and structured text content from various documents using existing parser libraries.

Tika can extract content from a number of document formats such as HTML, XML, Microsoft Office document formats, and PDFs and more.

### Drupal 7 Tika Configuration

Once you have downloaded and installed the ApacheSolr Attachments module ([apachesolr_attachments](https://www.drupal.org/project/apachesolr_attachments)), you'll need to configure the module's settings.

1. Go to the Tika settings page at: `/admin/config/search/apachesolr/attachments` and enter the following fields:

   * **Extract Using:** Tika (local java application)
   * **Tika Directory Path:** `/srv/bin`
   * **Tika jar file:** tika-app-1.1.jar

2. Verify that your site is able to extract text from documents. Click **Test your Tika Attachments** under the Actions section.

If everything is working correctly, you will see the success message "Text can be successfully extracted".

### Drupal 8 Tika Configuration

Download and install the Search API Attachments module ([search_api_attachments](https://www.drupal.org/project/search_api_attachments)), then configure the module's settings.

1. Go to the Search API Attachments settings page at: `/admin/config/search/search_api_attachments` and enter the following fields:

   * **Extraction method:** Tika Extractor
   * **Path to java executable:** `java`
   * **Path to Tika .jar file:** `/srv/bin/tika-app-1.1.jar`

2. Verify that your site is able to extract text from documents. Click **Submit and test extraction**.

If everything is working correctly, you will see the success message "Extracted data: Congratulations! The extraction seems working! Yay!".

### WordPress Tika Configuration
There are no known plugins in the WordPress.org repository that will enable the use of Tika.

## ImageMagick

[ImageMagick](https://www.imagemagick.org/script/index.php) is a software suite to create, edit, compose, or convert bitmap images. It can read and write images in a variety of  [formats](https://www.imagemagick.org/script/formats.php) (over 100) including  [DPX](https://www.imagemagick.org/script/motion-picture.php),  [EXR](https://www.imagemagick.org/script/high-dynamic-range.php), GIF, JPEG, JPEG-2000, PDF, PNG, Postscript, SVG, and TIFF. Use ImageMagick to resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses and Bézier curves. 

Pantheon runs the latest stable packaged version in Fedora, which is currently ImageMagick 6.8.6-3 2014-04-08 Q16.

### Drupal ImageMagick Configuration

Once you have downloaded and enabled the Imagemagick module, you'll need to configure the image toolkit settings. Go to the image toolkit settings page at: `admin/config/media/image-toolkit` to select ImageMagick.

When creating a new preset, if the "Division by Zero" warning appears, add the [`image_allow_insecure_derivatives`](https://www.drupal.org/project/image_allow_insecure_derivatives) conf variable to your settings.php file.

## Troubleshooting and FAQs
#### What if I need a library not listed here?
If you need a library not listed on this page, [contact support](/docs/getting-support) and include a description of your use case and a link to the library's webpage.

All libraries will evaluated by Pantheon's Operations Team on a case-by-case basis.

#### Will you setup and configure the module/plugin for me?
No. This is not within our [scope of support](/docs/getting-support/#scope-of-support). It is important to be aware of how a Drupal module or WordPress plugin is setup and how it functions. This will prove invaluable in cases where you need to plan and build your site.

#### How long does the process take?
This depends on the library that you would like to be installed, the impact it could possibly have on a system, roadmap and organizational goals. During the process we will let you know if the request is denied or approved.

It is very important to note, these requests are not guaranteed and it is possible the feature requests may be denied. As a result we recommend you should set aside enough time for alternative solutions.

#### What version of XYZ library is installed?
As these libraries are installed system-wide, we use the latest packaged version of the libraries available.  New versions may be installed without notice as security updates or other upstream changes are made available.
