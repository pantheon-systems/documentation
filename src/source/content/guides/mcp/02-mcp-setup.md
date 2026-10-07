---
title: How to Install the Pantheon MCP (Beta)
description: Learn how to install Pantheon's MCP server in your LLM of choice.
reviewed: "2026-10-07"
contenttype: [doc]
innav: [true]
permalink: docs/guides/mcp/setup
---

<Partial file="mcp-pre-ga.md" />

<TabList>
<Tab title="Install in Claude Desktop" id="claude-desktop" active={true}>

  1. Open Claude Desktop and go to Settings > Connectors > Manage Connectors > Discovery
  1. Find Pantheon MCP in the list.
  1. Click Connect.
  1. Follow the on-screen prompts: sign in with your Pantheon account and authorize access.
  1. Once it shows as Connected, Claude can use Pantheon tools in any conversation. 

</Tab>

<Tab title="Install in Claude Code" id="claude-code">

  1. Go to the [Pantheon MCP page in the Claude directory](https://claude.ai/directory/pantheon-mcp) and connect. If you already installed Pantheon MCP in Claude Desktop, skip this step.
  1. Start Claude Code:

     ```bash{promptUser: user}
     claude
     ```

  1. Run `/mcp` to view the list of MCP servers.
  1. Select Pantheon MCP. Follow the screen to complete the authentication process.
  1. Verify the installation by asking either of these questions:

     - Are you connected to Pantheon MCP?
     - What tools are available in Pantheon MCP?

</Tab>
</TabList>

For other MCP-compatible LLM applications, refer to that application's documentation on adding a remote MCP connector, using `https://mcp.pantheon.io/mcp` as the server URL.
