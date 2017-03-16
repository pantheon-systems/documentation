---
title: MIME Types
description: Learn how to add, change, and remove a file extension to a MIME type on Pantheon.
tags: [services]
categories: []
---
Pantheon promotes and respects internet standards, and for MIME types, we treat the [IANA Media Type List](http://www.iana.org/assignments/media-types/media-types.xhtml) as the canonical source of what headers to serve for what file extensions. This article describes what to do if you have a file type that isn't handled by IANA, or require an alternative.

##Add, Change, or Remove a File Extension to a MIME Type

#### We will consider:
- Adding anything not present on Pantheon with the recommendation of IANA list
- Adding anything not on the IANA list as application/octet-stream
- Changing any existing suffix that does not match the IANA MIME types
- Adding a widely recognized MIME type to a suffix that does not exist in the IANA list (on a case-by-case basis)

####We will not consider:
- Adding anything that conflicts with the IANA list
- Removing existing MIME types that are in IANA
- Changing our default MIME type

##Canonical Reference
See the Internet Assigned Numbers Authority [Media Type List](http://www.iana.org/assignments/media-types/media-types.xhtml).

##Workaround
Depending on the file type, you can write a small PHP wrapper to read the file, set the MIME type header, and send back the file with any MIME type you want. Make sure to add caching headers to cache on the edge so that PHP doesn’t have to do too much reading/writing.
