---
title: Pantheon MCP Server (Beta)
description: Learn about connecting AI agents to Pantheon using our MCP server.
reviewed: "2026-09-24"
contenttype: [doc]
innav: [true]
---

## What it is

The Pantheon MCP Server lets you connect an AI agent (like Claude) directly to your Pantheon account, so it can look up and act on your sites, environments, and deployments as part of a normal conversation. It's built for Pantheon customers and their teams who use AI coding agents and want those agents to work with their live Pantheon fleet, under the same permissions the person already has.

## Who it's for

Any Pantheon customer. The server is in open beta: all customers can connect it themselves, no waitlist or special enrollment required.

## Prerequisites

* A Pantheon account with access to the workspace(s) and site(s) you want the agent to work with. Any team member can connect it. There's no special role requirement. The agent only ever sees and does what your account can already see and do in Pantheon.
* A compatible AI client that supports MCP connectors (for example, Claude Desktop or Claude Code).

## How to connect

Connecting uses a standard OAuth consent flow, with no tokens or credentials to copy or manage yourself:

1. In your AI client, add the Pantheon MCP connector.
1. You'll be redirected to sign in with your normal Pantheon account.
1. Review and approve the permissions requested, then you're returned to your client, connected.
1. To disconnect (log out), remove or disable the connector in your client's settings.

Your client stores your session securely and uses your own Pantheon identity for every request and  the agent never has broader access than you do.

## What it can do

Once connected, the agent has tools covering:

* **Workspaces & sites:** list and inspect your workspaces and sites, see who has access, and create new sites.
* **Environments:** list and inspect environments, and create multidev environments.
* **Builds & deploys —** check build history and status, view build logs, get help diagnosing a failed build, check deploy/workflow status, sync code, trigger a rebuild, or roll back a deploy.
* **Runtime logs —** pull runtime logs for a site.
* **Upstreams —** view available upstreams and create new ones for a workspace.
* **Secrets —** view configured secrets and set secret values, including per-environment overrides.

Most of these are read-only. Actions that change something (creating a site, rebuilding, rolling back, setting a secret, and similar) require you to explicitly approve them in your AI client before they run.

## Limitations

This beta has no delete capabilities:  the agent can't delete sites, environments, secrets, or anything else.
Runtime log access currently applies to eVCS/Next.js sites only; other site types aren't supported for that tool yet.
The tool set reflects the current beta and will expand as we roll this out further.
