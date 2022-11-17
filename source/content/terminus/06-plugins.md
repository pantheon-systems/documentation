---
title: Terminus Guide
subtitle: Install Plugins
description: Learn how to install plugins with Terminus.
terminuspage: true
type: terminuspage
layout: terminuspage
categories: [develop]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/plugins
anchorid: plugins
---

This section provides information on how to install plugins with Terminus, and how to add new commands through third-party plugins.

## Install Plugins

The plugin installation process differs depending on your setup. Please refer to the appropriate section below.

Terminus 3 ships with a plugin manager. You can use a Terminus command like the example below to install a plugin:

```bash
terminus self:plugin:install pantheon-systems/terminus-plugin-example
```

<Accordion title="Composer and Git - Explore Advanced Installation Methods (Optional)" id="advance-installs" icon="lightbulb">

#### Install via Composer

Plugins published on Packagist are available to install via the Composer package manager. 

Open a terminal window on your computer and run the following commands:

```bash{promptUser: user}
composer create-project --no-dev -d ~/.terminus/plugins pantheon-systems/terminus-rsync-plugin:~1
```

#### Install via Git

Most plugins are published online as a Git repository. You can install the plugin by cloning the repository into your local plugins directory (`$HOME/.terminus/plugins`). This will allow you to contribute to the development of the plugin and to update the plugin using Git commands. Follow the steps below to install a plugin with Git.

1. Navigate to the plugin repository on GitHub.

1. Click **<span class="glyphicons glyphicon-save"></span> Code** on the repository home page:

    ![Click Code and copy the repository URL](../../../images/github/github-code-clone-ssh.png "GitHub clone URL")

1. Open a terminal window on your computer and run the following commands:

    ```bash{promptUser: user}
    cd $HOME/.terminus/plugins && git clone https://github.com/pantheon-systems/terminus-plugin-example.git
    ```

</Accordion>

## Update Plugins

Terminus 3 ships with a plugin manager. You can use a Terminus command like the example below to update a plugin:

```bash
terminus self:plugin:update pantheon-systems/terminus-plugin-example
```

## Uninstall Plugins

Terminus 3 ships with a plugin manager. You can use a Terminus command like the example below to uninstall a plugin:

```bash
terminus self:plugin:uninstall pantheon-systems/terminus-plugin-example
```

## More Resources

- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
- [Drupal Modules with Known Issues](/modules-known-issues)