---
title: Pantheon MCP Server (Beta)
description: Learn about connecting AI agents to Pantheon using our MCP server.
reviewed: "2026-09-24"
contenttype: [doc]
innav: [true]
permalink: docs/guides/mcp
---

<Partial file="mcp-pre-ga.md" />

The Pantheon MCP Server is a governed way to let compatible AI agents and coding assistants,  like Claude, Claude Code, and Cursor, interact directly with your Pantheon account through the platform API. It lets these applications perform tasks on your Pantheon fleet on your behalf, following your instructions in natural language, so you can look up and act on your sites, environments, and deployments as part of a normal conversation.

## Who it's for

Any Pantheon customer with a Pantheon account can use the Pantheon MCP server. The server is in open beta: all customers can connect it themselves, with no waitlist or special enrollment required. It's built for developers and teams using compatible AI coding agents who want to manage Pantheon sites and environments through agent workflows while keeping control of what agents can change.

## Prerequisites

* A Pantheon account with access to the workspace(s) and site(s) you want the agent to work with. Any team member can connect it.The agent only ever sees and does what your account can already see and do in Pantheon.
* A compatible AI client that supports MCP connectors (for example, Claude Desktop or Claude Code).


## What it can do

The MCP Server exposes Pantheon platform operations to an MCP client, based on your own user credentials. It's read-only by default; anything that changes something requires your explicit approval in your AI client before it runs. Once connected, the agent has the following tools available:

* **Workspaces & sites:** list and inspect your workspaces and sites, see who has access, and create new sites.
  * `pantheon_list_workspaces`
  * `pantheon_get_workspace`
  * `pantheon_list_workspace_members`
  * `pantheon_list_sites`
  * `pantheon_get_site`
  * `pantheon_create_site`
  * `pantheon_list_site_members`
* **Environments:** list and inspect environments, and create multidev environments.
  * `pantheon_list_environments`
  * `pantheon_get_environment`
  * `pantheon_create_multidev`
* **Builds & deploys:** check build history and status, view build logs, get help diagnosing a failed build, check deploy/workflow status, sync code, trigger a rebuild, or roll back a deploy.
  * `pantheon_list_builds`
  * `pantheon_get_build_logs`
  * `pantheon_get_deploy_status`
  * `pantheon_diagnose_failed_build`
  * `pantheon_rebuild_site` (Next.js only)
  * `pantheon_sync_code` (standard Pantheon sites only)
  * `pantheon_rollback_deploy` (Next.js, destructive)
  * `pantheon_get_workflow_status`
* **Runtime logs:** pull runtime logs for a site.
  * `pantheon_get_runtime_logs` (Next.js only)
* **Upstreams —** view available upstreams and create new ones for a workspace.
  * `pantheon_list_upstreams`
  * `pantheon_list_user_upstreams`
  * `pantheon_create_workspace_upstream`
* **Secrets:** view configured secrets and set secret values, including per-environment overrides.
  * `pantheon_list_secrets`
  * `pantheon_set_secret`
  * `pantheon_set_secret_environment_override`
* **Meta:** Additional tools for the agent.
  * `pantheon_whoami`
  * `pantheon_explain_mcp_conventions`


Most of these are read-only. Actions that change something (creating a site, rebuilding, rolling back, setting a secret, and similar) require you to explicitly approve them in your AI client before they run.

## Limitations

* This beta has no delete capabilities: the agent can't delete sites, environments, secrets, or anything else.
* Runtime log access currently applies to Next.js sites only; other site types aren't supported for that tool yet.
* The tool set reflects the current beta and will expand as the rollout continues.

## How it works and why it is secure and safe

The MCP Server is hosted at `https://mcp.pantheon.io/mcp`. This remote deployment model ensures your AI assistants always have access to Pantheon's latest tools and features, without the friction of running a local server or manual updates.

The MCP Server does not introduce a different or parallel authentication mechanism, and it does not store local credentials. It relies entirely on your existing Pantheon account: authorization stays with Pantheon, and the server forwards your own token rather than acting as a separate identity, so an agent can only ever reach what your account already can. To grant access, you authenticate with your primary Pantheon credentials and authorize the AI assistant to act on your behalf.

Once connected, the MCP Server exposes Pantheon platform APIs as MCP tools for your AI application. It's bound by your existing user permissions. If your account isn't entitled to perform a specific task, such as creating a site or creating a secret, your AI assistant won't be able to execute that action, even if it's visible as a tool.

