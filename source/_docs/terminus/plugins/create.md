---
title:  Terminus Manual
subtitle: Create Plugins
terminuspage: true
terminuscreate: true
terminustoc: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/plugins/:basename/
---
Add new commands to Terminus by creating a plugin. The following explains how to create our [example plugin](https://github.com/pantheon-systems/terminus-plugin-example) to demonstrate how to add new commands.

## Create the Example Plugin
This example provides the structural requirements for plugins to be recognized and loaded by Terminus.
### 1. Create Plugin Directory
A plugin is a specific set of files bundled together in a directory. The first step in creating a new plugin is to create that directory. It does not matter what you name your plugin’s directory but it makes sense to give it the same name as your plugin. Plugins must live within `$HOME/.terminus/plugins`. You may need to create the `$HOME/.terminus/plugins` directory if it does not already exist.

<p class="instruction">Create a directory for your new plugin (e.g. <code>hello-world</code>):</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#create-plugin-dir"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="create-plugin-dir"><code class="command bash" data-lang="bash">mkdir $HOME/.terminus/plugins/hello-world</code></pre></figure>
</div>

### 2. Create composer.json
In order for Terminus to recognize the directory as a plugin, the directory must contain a valid `composer.json` file. Download the following file and move it to your plugin's root directory (e.g. `$HOME/.terminus/plugins/hello-world`):
<div class="script-file-header">
composer.json
<a id="downloadLink"><button class="btn btn-default btn-download"><i class="fa fa-download" aria-hidden="true"></i>   Download File
</button></a>
</div>
<pre><code id="composer">{
    "name": "my-username/terminus-hello-world",
    "description": "An Hello, World Terminus command",
    "type": "terminus-plugin",
    "extra": {
        "terminus": {
            "compatible-version": "1.*"
        }
    }
}</code></pre>

<div class="alert alert-info">
<h3 class="info">Note</h3>
<p>The <code>name</code> attribute is only required if you plan to publish and distribute your plugin (e.g. on Packagist). </p></div>
### 3. Add Commands
Each command in Terminus is defined by it’s own class which contains a function that is run when the command is run. The class name must end with `Command` and the file that contains the class must be named similarly (e.g. `HelloCommand` class within `HelloCommand.php`).

<p class="instruction">Create a <code>src</code> directory within your plugin directory:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#create-src-dir"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="create-src-dir"><code class="command bash" data-lang="bash">mkdir $HOME/.terminus/plugins/hello-world/src</code></pre></figure>
</div>

Download the following file and move it to your plugin's `src` directory (e.g. `$HOME/.terminus/plugins/hello-world/src/HelloCommand.php`):
<div class="script-file-header">
HelloCommand.php
<a id="downloadLinkb"><button class="btn btn-default btn-download"><i class="fa fa-download" aria-hidden="true"></i>   Download File
</button></a>
</div>
<pre class="hljs php"><code id="HelloCommand">&lt;?php

use Pantheon\Terminus\Commands\TerminusCommand;

class HelloCommand extends TerminusCommand
{
    /**
     * Print the classic message to the log.
     *
     * @command hello
     */
    public function sayHello()
    {
        $this->log()->notice("Hello, World!");
    }
}</code></pre>

You can name the command function anything you like, but it must be a public method. The comment above the command is also required. The first line is the help text that will be displayed when you run `terminus list`. The `@command hello` line tells Terminus that this function is a command and that it’s name is `hello`.

<p class="instruction">The command should now be recognized and loaded by Terminus:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-hello"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="terminus-hello"><code class="command bash" data-lang="bash">terminus hello</code></pre></figure>
</div>

The provided example command should display the following when run:
```bash
[notice] Hello, World!
```

## Debug
<p class="instruction">Run the command with the verbose option if it does not work as expected:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-hello-vvv"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="terminus-hello-vvv"><code class="command bash" data-lang="bash">terminus hello -vvv</code></pre></figure>
</div>
If Terminus had trouble loading your plugin then there should be a debug notice logged. You may also be able to get more info by looking in your PHP error logs.

## Distribute Plugin
While the plugin you’ve created is good enough for local development, if you create something that you’re proud of, share it with the world! There are a few more things you’ll need to do to make your plugin distributable:

### Vendor Name
Add a vendor name to the plugin name within `composer.json` so that your plugin may be distinguished from other plugins that might share the same name. Most people use their GitHub user or organization name for the vendor. For a plugin distributed by Pantheon (GitHub organization: `pantheon-systems`) we would change the name field to:
```
{
    "name": "pantheon-systems\terminus-hello-world",
}
```
### PSR-4 Namespacing
<p class="instruction">Your plugin command class name may eventually conflict with internal or third-party commands. To avoid this you will need to add a PSR-4 compatible namespace. This should contain your vendor name and the plugin name. Add a <code>namespace</code> declaration to the top of your php file (e.g. <code>$HOME/.terminus/plugins/hello-world/src/HelloCommand.php</code>):</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-namespace"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="terminus-plugin-namespace"><code class="command bash" data-lang="bash">namespace Pantheon\TerminusHelloWorld\Commands;</code></pre></figure>
</div>
The `Commands` part of the namespace is not strictly necessary but it can help keep things organized if you need to add supporting classes to your plugin.

You will also need to make sure your src directory and composer file reflect the new namespace. Move the `HelloCommand.php` file  from `src/` to the `src/Commands` directory to mirror the last part of the namespace. If you have a lot of commands in your plugin, you can group them into command groups by adding another layer to the namespace and directory structure.

<p class="instruction">Update the <code>composer.json</code> file with an autoload section to indicate how to load your namespace. Your composer file should now look like:</p>
```
{
    "name": "my-username/terminus-hello-world",
    "description": "An Hello, World Terminus command",
    "type": "terminus-plugin",
    "autoload": {
        "psr-4": { "Pantheon\\TerminusHello\\": "src" }
    },
    "extra": {
        "terminus": {
            "compatible-version": "^1"
        }
    }
}
```
Remember to change `my-username` and `Pantheon` in the above to your vendor name.

## Coding Standards
While not strictly necessary, if you plan to distribute your plugin, and especially if you plan to add an open source licence and encourage contributions, it may be a good idea to adopt the Terminus core standards. Some basics to follow are:

* Ensure for compatibility with PHP 5.5, 5.6 and 7.
* Follow [PSR-2 code style](http://www.php-fig.org/psr/psr-2/).

More information on Terminus standards can be found at:
[https://github.com/pantheon-systems/terminus/blob/master/CONTRIBUTING.md](https://github.com/pantheon-systems/terminus/blob/master/CONTRIBUTING.md)

## Plugin Versioning
Terminus follows [semantic versioning](http://semver.org/). We recommend adopting TERMINUS.MAJOR.MINOR for plugin versioning.

Given a version number TERMINUS.MAJOR.MINOR, increment the:

- TERMINUS version when the plugin is compatible with a new MAJOR version of Terminus,
- MAJOR version when you break functionality in a backwards-compatible manner, and
- MINOR version when you make backwards-compatible bug fixes.

The first digit of a plugin version should always the Terminus MAJOR version the plugin is compatible with.

If your plugin has a minimum required version of Terminus, you can specify that in the `compatible-version` section of `composer.json`. You can use the [standard composer version constraints syntax](https://getcomposer.org/doc/articles/versions.md). If you do change `compatible-version`, please make sure that your constraint expression does not accidentally include the next major version of Terminus. In other words, `>=1.3 <2.0.0` is fine but `>=1.3` is not.

## More Resources
There is no published Plugin API documentation yet, so the best way to learn how to write commands is to look through the internal commands in the Terminus source code: [https://github.com/pantheon-systems/terminus](https://github.com/pantheon-systems/terminus)

A slightly more complete version of the plugin created in this guide can be found at:
[https://github.com/pantheon-systems/terminus-plugin-example](https://github.com/pantheon-systems/terminus-plugin-example
)


<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus/plugins/directory"><span class="terminus-pager-lsaquo">&lsaquo;</span>Plugin Directory</a>

</div>
