---
title: Pantheon MCP Server (Beta)
description: Review the known issues for the Pantheon MCP Server before you build an integration.
reviewed: "2026-10-05"
contenttype: [doc]
innav: [true]
permalink: docs/guides/mcp/known-limitations
---

<Partial file="mcp-pre-ga.md" />

These are known issues in the Pantheon MCP Server. We're working on them and will update this page as they're resolved.

## Site types

Behavior differs by site type. Next.js sites and sites using an external Git repository (eVCS) are driven by Git, while WordPress and Drupal sites on Pantheon-hosted Git follow the standard Pantheon workflow. Some tools apply only to certain site types, and tool descriptions don't yet state which. A tool-by-site-type compatibility reference is in progress.

## Creating sites

| Tool | Issue |
|---|---|
| `pantheon_get_workflow_status` | The status of a completed site-creation workflow doesn't include the new site's `site_id`. A workflow ID taken from a build can return a `404`. |

## Asynchronous operations

| Tools | Issue |
|---|---|
| `pantheon_create_site`, `pantheon_deploy_site`, `pantheon_create_multidev`, `pantheon_sync_code` | If the status check fails after a request succeeds, the response may not include the `workflow_id` or `site_id`, even though the operation may have completed. |

## Code and deployments

| Tool | Issue |
|---|---|
| `pantheon_sync_code` | Not applicable to Next.js sites or sites using an external repository. It fails with a generic "operation failed" message. For these sites, code is deployed by pushing to the external repository. |
| `pantheon_create_multidev` | On Next.js sites, it reports success but the environment is not initialized and has no builds. On eVCS WordPress and Drupal sites, it fails. For these sites, multidev environments are created by opening a pull request on the external repository. |
| `pantheon_list_builds`, `pantheon_get_deploy_status`, `pantheon_get_runtime_logs`, `pantheon_rebuild_site`, `pantheon_rollback_deploy` | Apply to Next.js sites only. |
| `pantheon_list_builds` | A total count of builds is not returned. |
| Build and runtime log queries | Queries for Next.js sites may time out after 15 seconds, including for sites that are still being created. |

## Secrets

| Tool | Issue |
|---|---|
| `pantheon_set_secret` | On Next.js sites, the default `USER` scope fails with a generic `400` error that doesn't state a reason. Valid scopes and types differ by site type and aren't documented in the tool description. |

## Upstreams

| Tool | Issue |
|---|---|
| `pantheon_list_upstreams` | Returns every upstream you can access (roughly 300 entries) in one unpaginated response. The response can exceed the tool-output limits of some clients. |
