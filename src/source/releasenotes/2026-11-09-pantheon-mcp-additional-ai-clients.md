---
title: "Pantheon MCP Server: Additional AI Client Support (Beta)"
published_date: "2026-11-09"
categories: [new-feature]
description: "The Pantheon MCP Server now works with more AI clients, including ChatGPT, Codex, GitHub Copilot, and Google Antigravity, in addition to Claude."
---
The Pantheon MCP Server now supports more AI clients. You can connect the clients below to operate on your Pantheon fleet through the same governed, user-authorized access introduced in the [Pantheon MCP Server (Beta)](/release-notes/2026/10/pantheon-mcp-beta) release.

## What's included
Pantheon MCP now supports these AI clients:

* Claude AI and Claude Code
* ChatGPT
* Codex
* GitHub Copilot
* Google Antigravity

Authorization stays with Pantheon: the server forwards your own Pantheon identity, so an agent can only reach what you can already access.

## Who it's for
Developers and teams who want to manage Pantheon sites and environments through the AI client they already use, while keeping control of what agents can change.

## How to get started
Add the Pantheon MCP server in your preferred client and sign in with your normal Pantheon account through the OAuth flow. To disconnect and log out, remove the Pantheon MCP connection in your client.

For client-specific setup steps, see [related documentation](/guides/mcp).

## Availability
All Pantheon customers. For feedback, please sign up for the [Pantheon Community Slack here](https://pantheon.io/customer-community/) if you don't already have an account and join us in the `#beta-mcp-server` channel.
