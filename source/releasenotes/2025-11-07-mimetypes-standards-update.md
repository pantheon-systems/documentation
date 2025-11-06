---
title: MIME Type Standards Update
published_date: "2025-11-07"
categories: [infrastructure]
---

Pantheon is removing support for deprecated MIME types using the x- prefix to align with current IANA standards.

This change removes the following types:

`text/x-component htc`
`image/x-jng jng`
`application/x-7z-compressed 7z`
`application/x-cocoa cco`
`application/x-java-archive-diff jardiff`
`application/x-java-jnlp-file jnlp`
`application/x-makeself run`
`application/x-perl pl pm`
`application/x-pilot prc pdb`
`application/x-redhat-package-manager rpm`
`application/x-sea sea`
`application/x-shockwave-flash swf`
`application/x-stuffit sit`
`application/x-tcl tcl tk`
`audio/x-realaudio ra`
`video/x-flv flv`
`video/x-mng mng`
`video/x-ms-asf asx asf`
`video/x-ms-wmv wmv`
`video/x-msvideo avi`
`application/x-plist plist`

## Action

Review custom code for any use of the following removed MIME types and update them to use their respective IANA-standard equivalents. [Follow these instructions if you have a file type that isn't handled by IANA, or require an alternative](https://docs.pantheon.io/mime-types).
