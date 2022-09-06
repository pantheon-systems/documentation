---
title: Errors and Server Responses
subtitle: Retries Across Application Server Containers (High Availability)
description: Get explanations for Pantheon server container error messages.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/errors-and-server-responses/retries-server-containers
anchorid: retries-server-containers
---

This section provides information on how to resolve Pantheon server containers.


## Retries Across Application Server Containers (High Availability)

Higher plan levels on Pantheon deploy multiple containers for the live environment. Rather than just supporting scale, Pantheon also uses the extra containers for high-availability. Here are the different cases when Pantheon's edge may retry a request against a different application container.

### Failed Connections

Pantheon's edge starts by randomly distributing requests to application containers. However, to allow sites to fully use every bit of container capacity, nginx uses a short request queue (about 128) so that containers refuse to queue more requests once they've already filled up. Such a refused connection causes the Pantheon edge to reattempt the request against up to all other healthy containers and up to a few unhealthy containers (where an unhealthy container is any container with a failed connection or 5xx code in the last 10 minutes).

### Any HTTP 502 or 560 Response to Requests with Idempotent HTTP Methods

When Pantheon updates application container software or configuration, the resulting reloads and restarts can briefly cause the first requests to return HTTP 502 responses. When the HTTP method of the request is idempotent (is safe to re-attempt, which on Pantheon includes all methods except POST, PUT, DELETE, and PATCH), we retry the request against up to a few healthy application containers.

Additionally, customer code may determine that a resource necessary to process a request is unavailable. By sending an HTTP 560 response, the application can trigger the same reattempts under the same conditions as an HTTP 502 response.
