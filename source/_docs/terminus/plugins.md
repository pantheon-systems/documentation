---
title: Terminus Manage Plugins
terminuspage: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/:basename/
---
Extend the functionality of Terminus and add commands by installing third party plugins.
## Install Plugins
Add plugins within the `$HOME/.terminus/plugins` directory on your local workstation. You may need to create the `$HOME/.terminus/plugins` directory if it does not already exist.
<div class="panel panel-default">
  <div class="panel-heading">
  <a data-proofer-ignore data-toggle="collapse" data-target="#advance-installs"><h3 class="panel-title" style="cursor:pointer;">Explore Advanced Install Methods (Optional) <span class="caret"></h3></a>
  </div>
<div id="advance-installs" class="collapse" style="padding:10px;">
<h3>Install via Composer</h3>
<p>Plugins published on Packagist are available to install via the Composer package manager. In a terminal window on your computer:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-install-composer"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="terminus-plugin-install-composer"><code class="bash" data-lang="bash">$HOME/.terminus/plugins/terminus-plugin-example
composer create-project pantheon-systems/terminus-plugin-example
</code></pre></figure>
</div>
<h3>Install via Git</h3>
<p>Most plugins are published online on as a Git repository. You can install the plugin by cloning the repository into your local plugins directory (<code>$HOME/.terminus/plugins</code>). This will allow you to contribute to the development of the plugin and to update the plugin using Git commands. To install a plugin using Git, find the Git URL of the plugin’s repository. On Github you can find it by clicking <strong>Clone or download</strong> on the repository home page:</p>
<img src="/source/docs/assets/images/terminus-plugin-install-git.png" alt="GitHub clone URL">
<p>Then in a terminal window on your computer:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-install-git"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="terminus-plugin-install-git"><code class="bash" data-lang="bash">cd $HOME/.terminus/plugins
git clone https://github.com/pantheon-systems/terminus-plugin-example.git</code></pre></figure>
</div>
</div>
</div>

## Update Plugins
Delete the plugin from the `$HOME/.terminus/plugins` directory. Download the latest version of the plugin, and move the plugin directory into the `$HOME/.terminus/plugins` directory.
## Uninstall Plugins
Delete the plugin from the `$HOME/.terminus/plugins` directory.

<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus/commands"><span class="terminus-pager-lsaquo">&lsaquo;</span>Commands</a>
  <a style="float:right;" href="/docs/terminus/plugins/directory"><span class="terminus-pager-rsaquo">&rsaquo;</span>Plugin Directory</a>
</div>
