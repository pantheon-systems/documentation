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
<button class="btn btn-default btn-clippy" data-clipboard-target="#create-plugin-dir">Copy</button>
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
<h4 class="info">Note</h4>
<p>The <code>name</code> attribute is only required if you plan to publish and distribute your plugin (e.g. on Packagist). </p></div>
### 3. Add Commands
Each command in Terminus is defined by it’s own class which contains a function that is run when the command is run. The class name must end with `Command` and the file that contains the class must be named similarly (e.g. `HelloCommand` class within `HelloCommand.php`).

<p class="instruction">Create a <code>src</code> directory within your plugin directory:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#create-src-dir">Copy</button>
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
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-hello">Copy</button>
<figure><pre id="terminus-hello"><code class="command bash" data-lang="bash">terminus hello</code></pre></figure>
</div>

The provided example command should display the following when run:
```bash
[notice] Hello, World!
```

## Debug
<p class="instruction">Run the command with the verbose option if it does not work as expected:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-hello-vvv">Copy</button>
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
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-namespace">Copy</button>
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

### External Dependencies
Starting with Terminus version 1.1.0, it is possible for plugins to depend on external libraries. This is done by adding your plugin requirements to the `require` section of your `composer.json` file, as usual. You should also update your plugin's Terminus `compatible-version` entry to `^1.1`, so that older versions of Terminus will not attempt to use it. If your plugin can still function without its external classes, then you may keep the `compatible-version` at `^1`.

Update the `composer.json` file with a `require` section that lists all of the external projects you need, along with their version constraints. Your composer file should now look like this:

```
{
    "name": "my-username/terminus-hello-world",
    "description": "A Hello, World Terminus command",
    "type": "terminus-plugin",
    "autoload": {
        "psr-4": { "Pantheon\\TerminusHello\\": "src" }
    },
    "require": {
        "organization/project-name": "^1"
    },
    "extra": {
        "terminus": {
            "compatible-version": "^1.1"
        }
    }
}
```
<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>In order to avoid conflicts between the dependencies of different plugins, Terminus does not load a plugin's external libraries until immediately before one of its commands is executed. That means that you cannot use any external classes in your plugin's constructor.</p>
</div>

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

## Testing Plugins
Adding automated testing is an important step to take before distributing plugins. Automated tests give prospective new users the assurance that the plugin works, and provides a basis for evaluating changes to the plugin.

The instructions in this section demonstrate how to set up simple functional tests for Terminus plugins using Bats, the [Bash Automated Testing System](https://github.com/sstephenson/bats). Bats allows tests to be written with simple Bash statements.

1. Copy the `require-dev` and `scripts` sections from the composer.json file below into the `composer.json` of your Terminus plugin:

    ```
    {
        "name": "my-username/terminus-hello-world",
        "description": "A Hello, World Terminus command",
        "type": "terminus-plugin",
        "autoload": {
            "psr-4": { "Pantheon\\TerminusHello\\": "src" }
        },
        "require": {
            "organization/project-name": "^1"
        },
        "extra": {
            "terminus": {
                "compatible-version": "^1.1"
            }
        }
        "require-dev": {
            "squizlabs/php_codesniffer": "^2.7"
        },
        "scripts": {
            "install-bats": "if [ ! -f bin/bats ] ; then git clone https://github.com/sstephenson/bats.git; mkdir -p bin; bats/install.sh .; fi",
            "bats": "TERMINUS_PLUGINS_DIR=.. bin/bats tests",
            "cs": "phpcs --standard=PSR2 -n src",
            "cbf": "phpcbf --standard=PSR2 -n src",
            "test": [
                "@install-bats",
                "@bats",
                "@cs"
            ]
        }
    }
    ```

2. Install the PHP Code Sniffer:

        composer install

3. Check the coding standards of your plugin for PSR-2 compliance:

        composer cs

4. `cbf` can fix most PRS-2 compliance errors in your plugin:

        composer cbf

5. Because of the additional files created by these tests, we **strongly** recommend adding the following lines to the `.gitignore`file:

    ```bash
    vendor
    bats
    bin
    libexec
    share
    ```

6. Define some Bats tests to run. Create a folder named `tests`, and create a file named `confirm-install.bats`. Put the contents below in your Bats test file:

    ```
    #!/usr/bin/env bats

    #
    # confirm-install.bats
    #
    # Ensure that Terminus and the Composer plugin have been installed correctly
    #

    @test "confirm terminus version" {
      terminus --version
    }

    @test "get help on plugin command" {
      run terminus help MY:PLUGIN-COMMAND
      [[ $output == *"SOME OUTPUT FROM MY PLUGIN HELP"* ]]
      [ "$status" -eq 0 ]
    }
    ```

    Replace `MY:PLUGIN-COMMAND` with the name of one of your plugin's commands, and replace `SOME OUTPUT FROM MY PLUGIN HELP` in the test.

7. Run your test:

    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-hello">Copy</button>
    <figure><pre id="run-bats-tests"><code class="command bash" data-lang="bash">composer test</code></pre></figure>
    </div>

To add more tests, create more files with `.bats` extensions, and populate them with `@test` blocks as shown above. Tests consist of simple bash expressions; any command that returns a non-zero result code signifies failure. See the [documentation on writing BATS tests](https://github.com/sstephenson/bats#writing-tests) for more information.

### Automating Tests

At this point, it would be a good idea to [configure your project tests to run automatically on Circle CI](https://circleci.com/docs/1.0/getting-started/). You'll need to keep a sandbox site online to run the tests against.

1. Copy the contents below into a file named `circle.yml` in your plugin project:

    ```bash
    #
    # Test the Terminus Composer Plugin
    #
    machine:
      timezone:
        America/Chicago
      php:
        version: 7.0.11
      environment:
        PATH: $PATH:~/.composer/vendor/bin:~/.config/composer/vendor/bin:$HOME/bin

    dependencies:
      cache_directories:
        - ~/.composer/cache
      override:
        - composer install --prefer-dist -n
        - composer install-bats
        - composer global require -n "consolidation/cgr"
        - cgr "pantheon-systems/terminus:^1.1"
      post:
        - terminus auth:login --machine-token=$TERMINUS_TOKEN
    test:
      override:
        - composer test
    ```

    Using another testing service can also be done by adapting the contents above; most popular services should be fairly easy to set up.

2. In the Circle CI settings, set up the following environment variables:

    - `TERMINUS_SITE`: The name of a sandbox Pantheon site to run tests against.
    - `TERMINUS_TOKEN`: A [Pantheon machine token](/docs/machine-tokens/) that has access to the test site.

3. Create an ssh key pair, [add the public key to your account on Pantheon](/docs/ssh-keys/), and [add the private key to Circle CI](https://circleci.com/docs/1.0/permissions-and-access-during-deployment/) (leave the "Hostname" field empty).

At this point, your tests should run successfully on Circle CI. Add an [embeddable status badge](https://circleci.com/docs/1.0/status-badges/) to the top of your plugin's README.md file to show off your passing build status.

## More Resources
There is no published Plugin API documentation yet, so the best way to learn how to write commands is to look through the internal commands in the Terminus source code: [https://github.com/pantheon-systems/terminus](https://github.com/pantheon-systems/terminus)

A slightly more complete version of the plugin created in this guide can be found at:
[https://github.com/pantheon-systems/terminus-plugin-example](https://github.com/pantheon-systems/terminus-plugin-example
)


<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus/plugins/directory"><span class="terminus-pager-lsaquo">&lsaquo;</span>Plugin Directory</a>

  <a style="float:right;" href="/docs/terminus/updates"><span class="terminus-pager-rsaquo">&rsaquo;</span>Version Updates</a>
</div>
