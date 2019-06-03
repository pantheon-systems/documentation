---
title: Terminus Manual
subtitle: Extend with Plugins
description: Use plugins to extend what you can do with Terminus.
terminuspage: true
type: terminuspage
layout: terminuspage
nexturl: terminus/plugins/directory/
previousurl: terminus/scripting/
permalink: docs/terminus/:basename/
image: terminus-thumbLarge
searchboost: 100
---
Extend the functionality of Terminus and add commands by installing third party plugins.
<Alert title="Note" type="info">
If you are a plugin author, ensure your your plugin is updated for Terminus 2. See <a href="/docs/terminus-2-0/">Terminus 2.0</a> to compare the differences.
</Alert>
## Install Plugins
<p class="instruction">Add plugins within the `$HOME/.terminus/plugins` directory on your local workstation. You may need to create the `$HOME/.terminus/plugins` directory if it does not already exist:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-install-mkdir">Copy</button>
<figure><pre id="terminus-plugin-install-mkdir"><code class="command bash" data-lang="bash">mkdir -p $HOME/.terminus/plugins</code></pre></figure>
</div>

<p class="instruction">Download a zip archive of the plugin's most recent release, then install it by unpacking the archive within `$HOME/.terminus/plugins`:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-install-curl">Copy</button>
<figure><pre id="terminus-plugin-install-curl"><code class="command bash" data-lang="bash">curl https://github.com/pantheon-systems/terminus-plugin-example/archive/1.x.tar.gz -L | tar -C ~/.terminus/plugins -xvz</code></pre></figure>
</div>

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
     <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#advance-installs"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Explore Advanced Install Methods (Optional)</h3></a>
   </div>
   <div id="advance-installs" class="collapse">
     <div class="panel-inner" markdown="1">
       <h3>Install via Composer</h3>
       <p class="instruction">Plugins published on Packagist are available to install via the Composer package manager. From a terminal window on your computer, use the following commands:</p>
       <div class="copy-snippet">
       <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-install-composer">Copy</button>
       <figure><pre id="terminus-plugin-install-composer"><code class="command bash" data-lang="bash">composer create-project -n -d $HOME/.terminus/plugins pantheon-systems/terminus-plugin-example:~1
       </code></pre></figure>
       </div>
       <h3>Install via Git</h3>
       <p>Most plugins are published online as a Git repository. You can install the plugin by cloning the repository into your local plugins directory (`$HOME/.terminus/plugins`). This will allow you to contribute to the development of the plugin and to update the plugin using Git commands. To install a plugin using Git, find the Git URL of the plugin’s repository. On GitHub you can find it by clicking <strong>Clone or download</strong> on the repository home page:</p>
       <img src="/source/docs/assets/images/terminus-plugin-install-git.png" alt="GitHub clone URL">
       <p class="instruction">Then in a terminal window on your computer, use the following commands:</p>
       <div class="copy-snippet">
       <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-install-git">Copy</button>
       <figure><pre id="terminus-plugin-install-git"><code class="command bash" data-lang="bash">cd $HOME/.terminus/plugins
       git clone https://github.com/pantheon-systems/terminus-plugin-example.git</code></pre></figure>
     </div>
   </div>
 </div>
</div>


## Update Plugins
Delete the plugin from the `$HOME/.terminus/plugins` directory. Download the latest version of the plugin and move the plugin directory into the `$HOME/.terminus/plugins` directory.
## Uninstall Plugins
Delete the plugin from the `$HOME/.terminus/plugins` directory.
