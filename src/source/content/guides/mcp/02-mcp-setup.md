---
title: How to Install the Pantheon MCP (Beta)
description: Learn how to install Pantheon's MCP server in your LLM of choice.
reviewed: "2026-11-09"
contenttype: [doc]
innav: [true]
permalink: docs/guides/mcp/setup
showtoc: true
---

<Partial file="mcp-pre-ga.md" />

Pantheon MCP is Pantheon's remote MCP server. It lets AI tools work with your Pantheon account using the Model Context Protocol (MCP). You sign in with your Pantheon account and authorize access. 

**Server URL**: `https://mcp.pantheon.io/mcp`

## Supported Clients 
Pantheon MCP works with these AI tools: 

* [Claude AI](#claude-ai) and [Claude Code](#claude-code)
* [ChatGPT](#chatgpt)
* [Codex](#codex)
* [GitHub Copilot](#vs-code-with-github-copilot)
* [Google Antigravity](#antigravity)
* [Gemini](#gemini)
* [Cursor](#cursor)
* [Devin (formerly Windsurf)](#devin-formerly-windsurf)

Pantheon MCP is also listed in the Claude marketplace. Claude users can install it from the marketplace or add it manually with the server URL. Gemini, Cursor, and Devin require a static client ID to connect. Scroll to their sections to find them.

If there are other MCP clients you would like to use, please reach out to support and we're happy to add them. 

## Setup
Each client asks you to sign in with your Pantheon account and authorize access when you connect.

### Claude AI
#### Option 1: Install from the Claude marketplace
1. Go to: https://claude.ai/directory/pantheon-mcp
1. Click Connect, and follow the on-screen prompts: sign in with your Pantheon account and authorize access.
1. Once it shows as Connected, Claude can use Pantheon tools in any conversation.

#### Option 2: Add it as a custom connector
1. Open Settings > Connectors and select Add custom connector.
1. Set the name to `Pantheon MCP` and the URL to `https://mcp.pantheon.io/mcp`.
1. Click Add, then click Connect and sign in with your Pantheon  account.

Custom connectors are available on Claude Pro, Max, Team and Enterprise plans.

<br/>

### Claude Code
#### Option 1: Install from the Claude marketplace
1. Go to: https://claude.ai/directory/pantheon-mcp
1. Click Connect, and follow the on-screen prompts: sign in with your Pantheon account and authorize access.
1. Run MCP list in Claude Code
    ```bash{promptUser: user}
    /mcp
    ```

    Select Pantheon MCP and follow the browser prompt to sign in with your Pantheon  account.
1. Ask Claude code who you’re logged in as in Pantheon MCP to verify connection.

#### Option 2: Add it from the command line

1. Add the server:

    ```bash{promptUser: user}
    claude mcp add --transport http pantheon-mcp https://mcp.pantheon.io/mcp
    ```
1. Start Claude Code (claude), run `/mcp`, select `pantheon-mcp` and follow the browser prompt to sign in with your Pantheon  account.

<br/>

### ChatGPT
ChatGPT adds MCP servers as custom connectors. This requires developer mode and a plan that supports custom connectors. On Business and Enterprise workspaces, an admin may need to allow custom connectors first.

1. In ChatGPT, open Settings > Connectors > Advanced and turn on Developer mode.
1. Go back to Connectors and click Create.
1. Set the name to `Pantheon MCP` and the server URL to `https://mcp.pantheon.io/mcp`.
1. Select OAuth for authentication and save.
1. Sign in with your Pantheon  account and authorize access.
1. In a new chat, enable the Pantheon MCP connector.

ChatGPT's menu names for connectors have changed over time (Connectors, Apps, Plugins). If you don't see these exact names, check [OpenAI's custom MCP server](https://developers.openai.com/api/docs/guides/custom-mcp-server) guide.

<br/>

### Codex
```bash{promptUser: user}
codex mcp add pantheon-mcp --url https://mcp.pantheon.io/mcp
```
Codex detects OAuth support and opens your browser. Sign in with your Pantheon  account and authorize access.

<br/>

### VS Code with GitHub Copilot
1. Open the Command Palette (Cmd+Shift+P on macOS, Ctrl+Shift+P on Windows/Linux) and run **MCP: Add Server**.
1. Select **HTTP**.
1. Enter the URL `https://mcp.pantheon.io/mcp` and the name `pantheon-mcp`.
1. Choose **Global** or **Workspace**.
1. Run **MCP: List Servers**, select `pantheon-mcp` and click Start Server.
1. When VS Code asks to authenticate, click **Allow** and sign in with your Pantheon  account.

Alternatively, run this from a terminal:
```bash{promptUser: user}
code --add-mcp '{"name":"pantheon-mcp","type":"http","url":"https://mcp.pantheon.io/mcp"}'
```

<br/>

### Antigravity 
1. Open your Antigravity MCP configuration file (~/.gemini/antigravity/mcp_config.json) and add:
    ```json
    {
      "mcpServers": {
        "pantheon-mcp": {
          "serverUrl": "https://mcp.pantheon.io/mcp"
        }
      }
    }
    ```
1. Save the file, then go to Customizations > Installed MCP Servers and click Refresh.
1. Click Authenticate next to `pantheon-mcp` and sign in with your Pantheon  account.

In Antigravity CLI (`agy`), run `/mcp` and authenticate `pantheon-mcp` there.

<br/>

### Gemini
Gemini CLI doesn't register itself automatically, so you give it Pantheon's client ID and a fixed sign-in port.

1. Open your Gemini CLI settings file (`~/.gemini/settings.json`) and add:
    ```json
    {
      "mcpServers": {
        "pantheon-mcp": {
          "httpUrl": "https://mcp.pantheon.io/mcp",
          "oauth": {
            "enabled": true,
            "clientId": "tpc_4bEtxSNdjpSDwSxgPVQmkV",
            "redirectUri": "http://localhost:7777/oauth/callback"
          }
        }
      }
    }
    ```
1. Start Gemini CLI (`gemini`) and run `/mcp auth pantheon-mcp`.
1. Sign in with your Pantheon account and authorize access.

Keep the `redirectUri` line exactly as shown. Without it, Gemini CLI picks a random port and sign-in fails with "Callback URL mismatch".

<br/>

### Cursor
Cursor doesn't register itself automatically, so you give it Pantheon's client ID.

1. Open your Cursor MCP configuration file (`~/.cursor/mcp.json`) and add:
    ```json
    {
      "mcpServers": {
        "pantheon-mcp": {
          "url": "https://mcp.pantheon.io/mcp",
          "auth": {
            "CLIENT_ID": "tpc_ugVfvWczJDbJC7XzSCvhZy"
          }
        }
      }
    }
    ```
1. In Cursor, open the MCP settings and connect `pantheon-mcp`, then sign in with your Pantheon account.

In Cursor CLI, run `agent mcp login pantheon-mcp` and sign in there.

If you already have a `pantheon-mcp` entry, replace it rather than adding a second one. Check that the client ID has no extra characters, such as a trailing period. An invalid client ID shows "Oops, something went wrong" on the sign-in page.

<br/>

### Devin (formerly Windsurf)
Devin doesn't register itself automatically, so you give it Pantheon's client ID.

1. In a terminal, add the server:

    ```bash{promptUser: user}
    devin mcp add pantheon-mcp https://mcp.pantheon.io/mcp \
      --scope user \
      --oauth-client-id tpc_fNrMogZsifvrTHzKU4H8X1
    ```
1. Sign in:

    ```bash{promptUser: user}
    devin mcp login pantheon-mcp
    ```
1. Sign in with your Pantheon account and authorize access.

Devin also lists MCP servers from your Cursor and Claude Code configurations, so you may see more than one Pantheon entry. Sign in to the `pantheon-mcp` entry you added above.

## Verify the installation
Ask your AI tool "Are you connected to Pantheon MCP?" or "Show me what tools are available in Pantheon MCP".

Setup steps may vary by client version. If a menu name differs from what's written here, check your client's documentation for adding a remote MCP server.
