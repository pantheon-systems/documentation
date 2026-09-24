---
title: How to Install Pantheon MCP (Beta)
description: Learn how to install Pantheon's MCP server with Claude.
reviewed: "2026-09-24"
contenttype: [doc]
innav: [true]
---

## Install in Claude Desktop
1. Open Claude Desktop and go to Settings > Connectors.
1. Find Pantheon MCP Production in the list.
1. Click Connect.
1. Follow the on-screen prompts: sign in with your Pantheon Google account and authorize access.
1. Once it shows as Connected, Claude can use Pantheon tools in any conversation. 

## Install in Claude Code

1. Start Claude code session

    ```bash{promptUser: user}
    claude
    ```
1. Run MCP list

    ```bash{promptUser: user}
    /mcp
    ```

    Select pantneon MPC and follow the browser prompt to sign in with your Pantneon Google account.

1. Select 'claude.ai Pantheon MCP Production'
1. Once it shows succeeded. You can confirm the installation by asking 'Are you connected to Pantheon MCP' or 'Show me what tools are available in Pantheon MCP'