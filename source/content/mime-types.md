---
title: MIME Types
description: Learn how to add, change, and remove a file extension to a MIME type on Pantheon.
tags: [services]
category: [platform]
---
Pantheon promotes and respects internet standards, and for MIME types, we treat the [IANA Media Type List](https://www.iana.org/assignments/media-types/media-types.xhtml) as the canonical source of what headers to serve for what file extensions. This article describes what to do if you have a file type that isn't handled by IANA, or require an alternative.

## Add, Change, or Remove a File Extension to a MIME Type

#### We will consider:
- Adding anything not present on Pantheon with the recommendation of IANA list
- Adding anything not on the IANA list as application/octet-stream
- Changing any existing suffix that does not match the IANA MIME types
- Adding a widely recognized MIME type to a suffix that does not exist in the IANA list (on a case-by-case basis)

#### We will not consider:
- Adding anything that conflicts with the IANA list
- Removing existing MIME types that are in IANA
- Changing our default MIME type

## Canonical Reference
See the Internet Assigned Numbers Authority [Media Type List](https://www.iana.org/assignments/media-types/media-types.xhtml).

## Workaround
Depending on the file type, you can write a small PHP wrapper to read the file, set the MIME type header, and send back the file with any MIME type you want. 

The example below outputs a given file with a `hello/world` MIME type and includes browser caching headers (default of 3600 seconds) to reduce load on the server:

```php
<?php
/**
 * Serves a file with a custom MIME type header.
 *
 * @param string $file - Absolute path to a file.
 * @param string $mimeType - Mime Type to serve with file. (default='text/plain')
 * @param int $cacheTime - Cache control time. (default=3600)
 */

function serveFileCustomMIMEType($file, $mimeType = 'text/plain', $cacheTime = 3600) {
  if (file_exists($file)) {

    $fileName = sprintf('"%s"', addcslashes(basename($file), '"\\'));
    $modified = gmdate ('D, d M Y H:i:s', filemtime($file)) . ' GMT';
    $size = filesize($file);

    header('Content-Description: File Transfer');
    header('Content-Type: ' . $mimeType);
    header('Content-Disposition: attachment; filename=' . $fileName);
    header('Content-Transfer-Encoding: binary');
    header('Cache-Control: public, max-age=' . $cacheTime);
    header('Last-Modified: ' . $modified);
    header('Content-Length: ' .$size);

    readfile($file);
    exit;
  }

  if (!file_exists($file)) {
    return "File not found";
  }
}

serveFileCustomMIMEType("someFile.xyz", "hello/world");
```
