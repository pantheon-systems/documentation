---
title: "Pantheon MCP Server (Beta)"
published_date: "2026-10-06"
published_at: "2026-10-06T13:54:00Z"
categories: [new-feature]
description: "Pantheon is introducing the official Pantheon MCP Server, a governed way to let compatible AI agents operate on your Pantheon fleet through the platform API."
---
Pantheon is introducing the official Pantheon MCP Server, a governed way to let compatible AI agents operate on your Pantheon fleet through the platform API.

The MCP server exposes Pantheon operations as agent tools, initially read-only, with writes to be added soon. It forwards the user's own Pantheon identity, so an agent can only reach what that user already can.

## What's included
* A stateless MCP server that maps Pantheon operations to agent tools, covering workspaces, sites, environments, builds and deploy status, runtime logs, secrets, and upstreams, with no modify or delete capabilities in this beta.
* Authorization stays with Pantheon: the server forwards the user's own token and the platform decides what that token may see and do.

## Who it's for
Developers and teams using compatible AI coding agents who want to manage Pantheon sites and environments through agent workflows while keeping control of what agents can change.

## How to get started
Connect from Claude Desktop, Web, or Code here: [Pantheon MCP](https://claude.ai/directory/pantheon-mcp), sign in with your normal Pantheon account through the OAuth flow, and the client stores your token securely. Disconnect from the Pantheon MCP in the client to log out.

For more details, see [related documentation](/guides/mcp).

## Availability
All Pantheon customers. For feedback, please sign up for the [Pantheon Community Slack here](https://pantheon.io/customer-community/) if you don't already have an account and join us in the `#beta-mcp-server` channel.

