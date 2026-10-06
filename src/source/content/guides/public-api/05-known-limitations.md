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

| Endpoint | Issue |
|---|---|
| `PUT /v1/workspaces/{workspaceId}/logo` | Requests that include a base64-encoded image (`data:image/...;base64,...`) are rejected with a `403 Forbidden` HTML response before they reach the API. Logo updates through this endpoint are currently unavailable. |
| `PUT /v1/workspaces/{workspaceId}/name` | Requests return `500 Internal Server Error`. Workspace renaming through this endpoint is currently unavailable. |

## Sites and users

| Endpoint | Issue |
|---|---|
| `GET /v1/sites/{siteId}` | May return `500 Internal Server Error` when authenticated with a personal access token (PAT). |
| `GET /v1/users/{userId}/upstreams` | May return `500 Internal Server Error` when authenticated with a PAT. Other endpoints, such as `GET /v1/current-user`, work with the same token. |
| `POST /v1/sites/{siteId}/users` | Not idempotent. Adding a user who is already on the site returns `200 OK` and does not report that the user already exists. |
| `POST /v1/workspaces/{workspaceId}/users/{userId}/site-removals` | Not idempotent. Removing a user who has already been removed returns `200 OK`. |
| `PUT /v1/sites/{siteId}/users/{userId}` | The `role` values `Admin` and `Contributor` don't correspond to the roles shown on the Site Team page in the dashboard (Site Administrator, Team Member, Developer). A user assigned `Contributor` appears as "Site Administrator" in the dashboard but is returned as `Unprivileged` by the API, and may be unable to open the site. These two values are not documented as supported site-level roles. |

## Authentication and availability

- **Intermittent 403 errors.** A small share of authenticated requests may return `403 UNAUTHORIZED` with the message `MAS response status: 500 Internal Server Error`, even when the credentials are valid. This has been observed on `GET /v1/sites/{siteId}` and on the secrets endpoints (including `secrets/with-environments`, `secrets/bulk`, and secret deletion).
