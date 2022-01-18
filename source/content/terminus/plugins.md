---
title: Terminus Manual
subtitle: Extend with Plugins
description: Use plugins to extend what you can do with Terminus.
terminuspage: true
type: terminuspage
layout: terminuspage
categories: [develop]
tags: [cli, local, plugins, terminus, reference]
nexturl: terminus/plugins/directory/
previousurl: terminus/scripting/
permalink: docs/terminus/:basename
image: terminus-thumbLarge
searchboost: 100
---

Extend the functionality of Terminus and add commands by installing third-party plugins.

<Alert title="Note" type="info">

If you are a plugin author, ensure your your plugin is updated for Terminus 2.0. See [Terminus 2.0](/terminus-2-0) to compare the differences. Plugins that are advertised to work on Terminus 2.0 may also be used on [Terminus 3.0](/terminus/terminus-3-0).

</Alert>

## Install Plugins

Depending on your Terminus version, the plugin installation process is different. Please refer to the appropriate section below.

### Terminus 3

Terminus 3 ships with the plugin manager. This means that to install a plugin you should use a Terminus command like this:

```bash
terminus self:plugin:install pantheon-systems/terminus-plugin-example
```

### Terminus 2

Add plugins within the `$HOME/.terminus/plugins` directory on your local workstation. You may need to create the `$HOME/.terminus/plugins` directory if it does not already exist:

```bash{promptUser: user}
mkdir -p $HOME/.terminus/plugins
```

Download a zip archive of the plugin's most recent release, then install it by unpacking the archive within `$HOME/.terminus/plugins`:

```bash{promptUser: user}
curl https://github.com/pantheon-systems/terminus-plugin-example/archive/1.x.tar.gz -L | tar -C ~/.terminus/plugins -xvz
```

<Accordion title="Composer and Git - Explore Advanced Installation Methods (Optional)" id="advance-installs" icon="lightbulb">

#### Install via Composer

Plugins published on Packagist are available to install via the Composer package manager. From a terminal window on your computer, use the following commands:

```bash{promptUser: user}
composer create-project --no-dev -d ~/.terminus/plugins pantheon-systems/terminus-rsync-plugin:~1
```

#### Install via Git

Most plugins are published online as a Git repository. You can install the plugin by cloning the repository into your local plugins directory (`$HOME/.terminus/plugins`). This will allow you to contribute to the development of the plugin and to update the plugin using Git commands. To install a plugin using Git, find the Git URL of the plugin’s repository. On GitHub you can find it by clicking **<span class="glyphicons glyphicon-save"></span> Code** on the repository home page:

![Click Code and copy the repository URL](../../images/github/github-code-clone-ssh.png "GitHub clone URL")

Then in a terminal window on your computer, use the following commands:

```bash{promptUser: user}
cd $HOME/.terminus/plugins && git clone https://github.com/pantheon-systems/terminus-plugin-example.git
```

</Accordion>

## Update Plugins

Depending on your Terminus version, the plugin update process is different. Please refer to the appropiate section below.

### Terminus 3

Terminus 3 ships with the plugin manager. This means that to update a plugin you should use a Terminus command like this:

```bash
terminus self:plugin:update pantheon-systems/terminus-plugin-example
```

### Terminus 2

Delete the plugin from the `$HOME/.terminus/plugins` directory. Download the latest version of the plugin and move the plugin directory into the `$HOME/.terminus/plugins` directory.

## Uninstall Plugins

Depending on your Terminus version, the plugin uninstallation process is different. Please refer to the appropriate section below.

### Terminus 3

Terminus 3 ships with the plugin manager. This means that to uninstall a plugin you should use a Terminus command like this:

```bash
terminus self:plugin:uninstall pantheon-systems/terminus-plugin-example
```

### Terminus 2

Delete the plugin from the `$HOME/.terminus/plugins` directory.
