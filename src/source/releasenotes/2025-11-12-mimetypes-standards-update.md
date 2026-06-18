---
title: MIME Type Standards Update
published_date: "2025-11-12"
categories: [infrastructure, action-required]
---

Pantheon is updating its platform to align with current IANA standards by removing support for deprecated MIME types that use the x- prefix. This change will be introduced on November 17, 2025.

The following deprecated types have been updated to their modern, IANA-standard equivalents. No action is required for these files unless you have custom code explicitly referencing the old format.

* `application/mathml+xml mml`
* `application/javascript js mjs`
* `image/vnd.microsoft.icon ico`
* `image/bmp bmp`
* `application/vnd.rar rar`
* `audio/mp4 m4a`
* `video/mp4 m4v`
* `font/ttf ttf`
* `text/vcard vcf`
* `application/vnd.amazon.mobi8-ebook mobi`

The following deprecated x- prefixed MIME types will be removed entirely from platform support:

* `text/x-component htc`
* `image/x-jng jng`
* `application/x-7z-compressed 7z`
* `application/x-cocoa cco`
* `application/x-javascript`
* `application/x-java-archive-diff jardiff`
* `application/x-java-jnlp-file jnlp`
* `application/x-makeself run`
* `application/x-perl pl pm`
* `application/x-pilot prc pdb`
* `application/x-redhat-package-manager rpm`
* `application/x-sea sea`
* `application/x-shockwave-flash swf`
* `application/x-stuffit sit`
* `application/x-tcl tcl tk`
* `audio/x-realaudio ra`
* `video/x-flv flv`
* `video/x-mng mng`
* `video/x-ms-asf asx asf`
* `video/x-ms-wmv wmv`
* `video/x-msvideo avi`
* `application/x-plist plist`

## Action Required

Review any custom code or configurations that utilize the removed MIME types and update them to use their respective IANA-standard equivalents. 

If you encounter a file type that IANA does not yet handle, or if you require an alternative configuration, please [follow the instructions in our documentation](https://docs.pantheon.io/mime-types).
