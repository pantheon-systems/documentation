---
title: External Libraries on Pantheon
description: Learn to incorporate external libraries for Drupal modules on the Pantheon platform.
category:
    - developing

---

## Overview

While Drupal's contributed modules offer a plethora of extended functionality, there are some scenarios when an external library is required. Pantheon has installed a number of common libraries that are available throughout the platform.

If there is a specific library that you require, submit a support request through your dashboard. This process will take time, as any change to our platform must be evaluated by both Operations and Engineering for compatibility.

<!-- h2 id="pdftk"><a href="http://www.pdflabs.com/tools/pdftk-the-pdf-toolkit">PDFTK - PDF Tool Kit</a></h2>


<p><img alt="" class="basic" src="https://www.getpantheon.com/sites/default/files/docs/desk_images/110693" style="width: 473px; height: 107px;" /></p>


<p>In its own words: &quot;If PDF is electronic paper, then pdftk is an electronic staple-remover, hole-punch, binder, secret-decoder-ring, and X-Ray-glasses. Pdftk is a simple tool for doing everyday things with PDF documents.&quot;</p>


<p>PDFTK can be found on your application server @ /usr/bin/pdftk. The current version supported on Pantheon is 1.44.</p>


<p>To install, add&nbsp;<br />
To install, first put your development site in SFTP mode. Then, execute the following commands from your local terminal:</p>


<pre class="terminal">
drush @pantheon.SITENAME.ENV dl pdftk token libraries
drush @pantheon.SITENAME.ENV en pdftk
</pre // -->
## [WKHTMLtoPDF](http://code.google.com/p/wkhtmltopdf/)

![](https://www.getpantheon.com/sites/default/files/docs/desk_images/110694)

WebKit HTML is a "simple shell utility to convert html to pdf using the webkit rendering engine, and qt." In other words, you can snapshot or capture the content of a web page easily in a PDF.

WKHTMLtoPDF can be found on your application server at <tt>/srv/bin/wkhtmltopdf</tt>

To install, from your local development environment:

    drush dl print
    mkdir -p sites/all/libraries/wkhtmltopdf
    ln -s /srv/bin/wkhtmltopdf sites/all/libraries/wkhtmltopdf/wkhtmltopdf
    git add .
    git commit -m "Added WKHTMLtoPDF library"
    git push

## [PhantomJS](http://phantomjs.org/)

![](https://www.getpantheon.com/sites/default/files/docs/desk_images/110696)

In its own words, "PhantomJS is a headless WebKit with JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG."

PhantomJS has the potential for a plethora of applications. For more information, see the PhantomJS website.

PhantomJS is located @ /srv/bin/phantomjs on your application server.

## [Apache Tika](http://tika.apache.org/)

![](https://www.getpantheon.com/sites/default/files/docs/desk_images/110698)

The Apache Tika™ toolkit detects and extracts metadata and structured text content from various documents using existing parser libraries.  


Tika can extract content from a number of document formats such as HTML, XML, Microsoft Office document formats and PDFs and more.

### Tika Configuration

Once you have downloaded and installed the Apache Tika module, the next step will be configuring the module's settings.

Navigate to the Tika settings page at: `/admin/config/search/apachesolr/attachments` and enter the fields as follows:

**Extract Using:** Tika (local java application)  
**Tika Directory Path:** /srv/bin  
**Tika jar file:** tika-app-1.1.jar

The last step will be to verify that your site is able to extract text from documents, click the _"Test your Tika Attachments"_ under the _"Actions"_ section.

If everything is working correctly, you should see the success message, _"Text can be successfully extracted"_ as illustrated below.

![](https://www.getpantheon.com/sites/default/files/docs/desk_images/137839)

## [ImageMagick](http://www.imagemagick.org)
 ![](http://ftp.sunet.se/pub/multimedia/graphics/ImageMagick/images/logo-fullsize.png)

ImageMagick<u> </u>is a software suite to create, edit, compose, or convert bitmap images. It can read and write images in a variety of  [formats](http://www.imagemagick.org/script/formats.php) (over 100) including  [DPX](http://www.imagemagick.org/script/motion-picture.php),  [EXR](http://www.imagemagick.org/script/high-dynamic-range.php), GIF, JPEG, JPEG-2000, PDF, PNG, Postscript, SVG, and TIFF. Use ImageMagick to resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses and Bézier curves.   


Pantheon runs the latest stable packaged version in Fedora, which is currently ImageMagick 6.7.8-9 2013-03-10 Q16.

## I Need a Library Not Listed Here

If you need a library not listed on this page, please submit a support ticket including a description of your use-case and a link to the library's webpage.

All library's will evaluated by Pantheon's Operations Team on a case-by-case basis.

## Troubleshooting and FAQs

### Will you setup and configure the module for me?

No. It is important to be aware of how a module is setup and how it functions. This will prove invaluable in cases where you need to plan and build your site. We have provided as much information as you need to get setup with each library. This is also not part of our [available services](/docs/articles/getting-started).

If there is some additional information that may help in the setup we can add it to the documentation.

### How long does the process take?

This depends on the library that you would like to be installed, the impact it could possibly have on a system, roadmap and organizational goals. During the process we will let you know if the request is denied or approved.  


If it is approved, we will let you know as well as give a timeline when the library may be included.  


It is very important to note, these requests are not guaranteed and it is possible the feature requests may be denied. As a result we recommend you should set aside enough time for alternative solutions.

### What version of XYZ library is installed?
As these libraries are installed system-wide, we use the latest packaged version of the libraries available.  New versions may be installed without notice as security updates or other upstream changes are made available.
