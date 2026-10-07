---
title: Pantheon Public API v1
subtitle: Known limitations
description: Review the known issues in the Pantheon Public API v1 before you build an integration.
reviewed: "2026-10-05"
contenttype: [doc]
innav: [true]
permalink: docs/guides/public-api/known-limitations
---

These are known issues in the [Pantheon Public API v1](https://api.pantheon.io/docs). We're working to fix these bugs. Expect this page to be updated as we make progress, and expect limitations to be removed as they're resolved.

## Workspaces

The following workspace endpoints are currently unavailable.

| Endpoint | Issue |
|---|---|
| `PUT /workspaces/{workspaceId}/logo` | A `403 Forbidden` HTML response blocks requests that include a base64-encoded image (`data:image/...;base64,...`) before they reach the API. Logo updates through this endpoint are currently unavailable. |
| `PUT /workspaces/{workspaceId}/name` | The endpoint returns `500 Internal Server Error`. Workspace renaming through this endpoint is currently unavailable. |

## Sites and users

The following site and user endpoints fail or behave unexpectedly.

| Endpoint | Issue |
|---|---|
| `GET /sites/{siteId}` | May return `500 Internal Server Error` when authenticated with a personal access token (PAT). |
| `GET /users/{userId}/upstreams` | May return `500 Internal Server Error` when authenticated with a PAT. Other endpoints, such as `GET /current-user`, work with the same token. |
| `POST /sites/{siteId}/users` | Repeating the request returns `200 OK` and changes nothing. The response doesn't report that the user is already on the site. |
| `POST /workspaces/{workspaceId}/users/{userId}/site-removals` | Repeating the request returns `200 OK` and changes nothing. The response doesn't report that the user was already removed. |
| `PUT /sites/{siteId}/users/{userId}` | The `role` values `Admin` and `Contributor` don't correspond to the roles shown on the Site Team page in the dashboard (Site Administrator, Team Member, Developer). A user assigned `Contributor` appears as "Site Administrator" in the dashboard but the API returns `Unprivileged` for that user, who may be unable to open the site. The API documentation doesn't list these two values as supported site-level roles. |

## Authentication and availability

This limitation affects authenticated requests across the API.

- **Intermittent 403 errors.** A small share of authenticated requests may return `403 UNAUTHORIZED` with the message `MAS response status: 500 Internal Server Error`, even when the credentials are valid. This has been observed on `GET /sites/{siteId}` and on the secrets endpoints (including `secrets/with-environments`, `secrets/bulk`, and secret deletion).
