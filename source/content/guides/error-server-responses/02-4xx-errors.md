---
title: Errors and Server Responses
subtitle: 4xx Level Errors
description: Get explanations for 400-level error messages.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/error-server-responses/4xx-errors
anchorid: 4xx-errors
---

This section provides information on how to resolve 4xx errors.

### Pantheon 401 Unauthorized

This is the default response of an HTTP Basic Auth failure after a site administrator has [locked the site's environment](/guides/secure-development/security-tool). This is usually not a platform failure, as environment access can be set from the Dashboard Security tab.

In some circumstances, a 401 can be triggered inadvertently if a site environment is locked, and a user passes the HTTP auth but the site sends a 401 HTTP status code. The workaround is to disable HTTP auth security for the environment in question.

### Pantheon 403 Forbidden
"Access denied to uploaded PHP files." This message is shown when a PHP file is attempted to be accessed in Valhalla, Pantheon's network file system.

Pantheon also prevents public access via the web server to private files, `.htaccess`, and directory listings.

### Pantheon 404 Unknown Site
"The hostname ... is unknown. Please double-check that this is the right URL. If so, make sure it matches your Dashboard's custom domain settings." This typically is shown when there is an internal routing problem or a site environment does not exist.

### Error 404 Not Found
"Failed to load resource: the server responded with a status of 404 ()" or a similar error message displays when a web browser cannot find the element specified.

This error occurs when the client (via web browser) successfully connects to the host (website’s application server), but is unable to find the actual resource requested (for example, a specific URL or file name). We recommend confirming that the URL or file name is correct and still exists on the site.

