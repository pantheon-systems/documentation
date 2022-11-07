---
title: Terminus Guide
subtitle: Create Terminus Plugins
description: Learn how to create your own Terminus plugins.
layout: guide
showtoc: true
categories: [develop]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/terminus/create
anchorid: create
---

This section provides information on how to create Terminus plugins.

Creating a plugin allows you to add custom commands to Terminus. The sections below provide instructions on how to create Pantheon's [example plugin](https://github.com/pantheon-systems/terminus-plugin-example) and add new commands.

## Create the Example Plugin with Terminus 3

Terminus 3 has a plugin manager that includes a command for scaffolding a new, empty plugin.

1. Run the command below to create a new plugin:

  ```bash
  terminus self:plugin:create hello-world --project-name=terminus-plugin-project/hello-world
  ```

  This commands creates a directory called `hello-world` and populates it with an example plugin template, renamed to match the provided project name. The project name is only required if you plan to publish and distribute your plugin (e.g. on Packagist).

  The `self:plugin:create` command also installs your new plugin so that you can start using it immediately.

1. Review the two files in the example plugin's `Commands` directory, each of which contains an example command.

1. Open the `src/Commands/HelloCommand.php` file, and modify the output as shown below:

  ```php
  namespace Pantheon\TerminusHello\Commands;

  use Pantheon\Terminus\Commands\TerminusCommand;

  class HelloCommand extends TerminusCommand
  {
      /**
       * Print the classic message to the log.
       *
       * @command hello
       * @param string $name Who to say "hello" to.
       * @option $first This is the first time we've said hello.
       */
      public function sayHello($name = 'World', $options = ['first' => false])
      {
          $this->log()->notice("Hello, {user}! THIS IS MY MODIFICATION TO THE PLUGIN.", ['user' => $name]);
          if ($options['first']) {
              $this->log()->notice("Pleased to meet you.");
          }
      }
  }

  ```

  The command should now be recognized and loaded by Terminus:

  ```bash
  terminus hello
  ```

  The provided example command should display the following when run:

  ```bash
  [notice] Hello, World! THIS IS MY MODIFICATION TO THE PLUGIN.
  ```

1. Modify the `@command` line to change the name of your command. You can rename the source file in which the command is stored, as long as it ends in `Command.php`.

## Create the Example Plugin with Terminus 2

This example provides the structural requirements for plugins to be recognized and loaded by Terminus.

1. Create a directory for your new plugin (e.g. `hello-world`):

    ```bash
    mkdir $HOME/.terminus/plugins/hello-world
    ```

    A plugin is a specific set of files bundled together in a directory. It does not matter what you name your plugin’s directory but it makes sense to give it the same name as your plugin. Plugins must be stored within `$HOME/.terminus/plugins`. You may need to create the `$HOME/.terminus/plugins` directory if it does not already exist.

1. Download the `composer.json` file below and move it to your plugin's root directory (e.g. `$HOME/.terminus/plugins/hello-world`). Your plugin directory must contain a valid `composer.json` file for Terminus to recognize the directory as a plugin. 

  <Download file="composer.json" /> 

  ```json
  {
    "name": "my-username/terminus-hello-world",
    "description": "An Hello, World Terminus command",
    "type": "terminus-plugin",
    "extra": {
      "terminus": {
        "compatible-version": "^3"
      }
    }
  }
  ```

  <Alert title={"Note"} type={"info"}>

  The `name` attribute is only required if you plan to publish and distribute your plugin (e.g. on Packagist).

  </Alert>

1. Create a `src` directory within your plugin directory to add commands:

  ```bash
  mkdir $HOME/.terminus/plugins/hello-world/src
  ```

1. Download the following file and move it to your plugin's `src` directory (e.g. `$HOME/.terminus/plugins/hello-world/src/HelloCommand.php`):

  <Download file="HelloCommand.php" />

  Each command in Terminus is defined by its own class which contains a function that is run when the command is run. The class name must end with `Command` and the file that contains the class must be named similarly (e.g. `HelloCommand` class within `HelloCommand.php`).

  ```php
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
  }

  ```

  You can name the command function anything you like, but it must be a public method. The comment above the command is also required. The first line is the help text that will be displayed when you run `terminus list`. The `@command hello` line tells Terminus that this function is a command and that its name is `hello`.

  The command should now be recognized and loaded by Terminus:

  ```bash
  terminus hello
  ```

  The provided example command should display the following when run:

  ```bash
  [notice] Hello, World!
  ```

### Debug

A debug notice is logged if Terminus has trouble loading your plugin. You can also get more information by looking in your PHP error logs.

Run the command with the verbose option if it does not work as expected:

```bash
terminus hello -vvv
```

## Distribute Plugin

You must complete the steps below if you want to share your plugin with others.

1. Add a vendor name to the plugin name within the `composer.json` file. This makes your plugin distinguishable from other plugins that might share the same name. Most people use their GitHub user or organization name for the vendor. The name field for a plugin distributed by Pantheon (GitHub organization: `pantheon-systems`) would be:

  ```json
  {
    "name": "pantheon-systems\terminus-hello-world"
  }
  ```

1. Add a PSR-4 compatible namespace to your plugin command class name to avoid conflict with internal or third-party commands. This should contain your vendor name and the plugin name. Add a `namespace` declaration to the top of your PHP file (e.g. `\$HOME/.terminus/plugins/hello-world/src/HelloCommand.php`):

  ```bash
  namespace Pantheon\TerminusHelloWorld\Commands;
  ```

  The `Commands` part of the namespace is not necessary but it can help keep things organized if you need to add supporting classes to your plugin.

1. Make sure your `src` directory and composer file reflect the new namespace. Move the `HelloCommand.php` file from `src/` to the `src/Commands` directory to mirror the last part of the namespace. If you have a lot of commands in your plugin, you can organize them into command groups by adding another layer to the namespace and directory structure.

1. Update the `composer.json` file with an autoload section to indicate how to load your namespace. Change `my-username` and `Pantheon` in the example to your vendor name. Your composer file should now look like:

  ```json
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


1. Update the `composer.json` file with a `require` section that lists all of the external projects you need, along with their version constraints. 

  Starting with Terminus version 1.1.0, it is possible for plugins to depend on external libraries. This is done by adding your plugin requirements to the `require` section of your `composer.json` file, as usual. You should also update your plugin's Terminus `compatible-version` entry to `^1.1`, so that older versions of Terminus will not attempt to use it. If your plugin can still function without its external classes, then you may keep the `compatible-version` at `^1`.

  Your composer file should now look like this:

  ```json
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

<Alert title="Note"  type="info" >

Terminus 1 and 2 do not load a plugin's external libraries until immediately before one of its commands is executed to avoid conflicts between the dependencies of different plugins. That means that you cannot use any external classes in your plugin's constructor. Terminus 3 does not have this restriction.

</Alert>

## Coding Standards

Pantheon recommends adopting Terminus core standards if you plan to distribute your plugin and/or add it to an open source license and encourage contributions. Some basic principles to follow are:

- Ensure compatibility with PHP 5.5, 5.6 and 7
- Follow [PSR-2 code style](http://www.php-fig.org/psr/psr-2/)
- Review more Terminus standards at:
[https://github.com/pantheon-systems/terminus/blob/master/CONTRIBUTING.md](https://github.com/pantheon-systems/terminus/blob/master/CONTRIBUTING.md)

## Plugin Versioning

We recommend following [semantic versioning](http://semver.org/) when versioning your plugins, just as Terminus does.

You can specify this in the `compatible-version` section of your `composer.json` file if your plugin has a minimum required version of Terminus.

1. Use the [standard composer version constraints syntax](https://getcomposer.org/doc/articles/versions.md).

1. Make sure that your constraint expression does not accidentally include the next major version of Terminus if you change `compatible-version`. For example, `>=1.3 <2.0.0` is fine, but `>=1.3` is not.

## Test Plugins

Automated plugin testing is an important step to complete before you distribute your plugins. Automated tests give prospective new users the assurance that the plugin works, and provides a basis for evaluating changes to the plugin.

The instructions in this section demonstrate how to set up simple functional tests for Terminus plugins using Bats, the [Bash Automated Testing System](https://github.com/sstephenson/bats). Bats allows tests to be written with simple Bash statements.

1.  Copy the `require-dev` and `scripts` sections from the `composer.json` file below into the `composer.json` of your Terminus plugin:

    ```json
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

1.  Install the PHP Code Sniffer:

    ```bash{promptUser: user}
          composer install
    ```

1.  Check the coding standards of your plugin for PSR-2 compliance:

      ```bash{promptUser: user}
        composer cs
      ```

1.  Use `cbf` to fix (most) PRS-2 compliance errors in your plugin:

      ```bash{promptUser: user}
        composer cbf
      ```

1. Add the following lines to the `.gitignore`file. This is **strongly** recommended because of the additional files created by these tests.

    ```bash{promptUser: user}
      vendor
      bats
      bin
      libexec
      share
    ```

1.  Define your Bats tests. Create a folder named `tests`, and create a file named `confirm-install.bats`. Place the content below in your Bats test file:

    ``````bash{promptUser: user}
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

1. Replace `MY:PLUGIN-COMMAND` with the name of one of your plugin's commands, and replace `SOME OUTPUT FROM MY PLUGIN HELP` in the test.

1.  Run your test:

    ```bash{promptUser: user}
     composer test
    ```

You can create more files with `.bats` extensions to add more tests. You must populate these files with `@test` blocks as shown above. Tests consist of simple bash expressions. A command that returns a non-zero result code signifies failure. Refer the [documentation on writing BATS tests](https://github.com/sstephenson/bats#writing-tests) for more information.

### Automate Tests

You can [configure your project tests to run automatically on Circle CI](https://circleci.com/docs/1.0/getting-started/). You must keep a Sandbox site online to run the tests against.

1. Copy the contents below into a file named `circle.yml` in your plugin project:

   ```bash{promptUser: user}
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

   You can use another testing service by adapting the contents above. Most popular services should be easy to set up.

1. Open the Circle CI settings to set up the following environment variables:

   - `TERMINUS_SITE`: The name of a Sandbox Pantheon site to run tests against.
   - `TERMINUS_TOKEN`: A [Pantheon machine token](/machine-tokens) that has access to the test site.

3. Create an ssh key pair, [add the public key to your account on Pantheon](/ssh-keys), and [add the private key to Circle CI](https://circleci.com/docs/1.0/permissions-and-access-during-deployment/). Leave the `Hostname` field empty.

  Your tests should run successfully on Circle CI.

1. Add an [embeddable status badge](https://circleci.com/docs/1.0/status-badges/) to the top of your plugin's `README.md` file to show your passing build status.

A more complete version of the plugin created above can be found at:
[https://github.com/pantheon-systems/terminus-plugin-example](https://github.com/pantheon-systems/terminus-plugin-example)

## Plugin Commands

There is currently no published Plugin API documentation. The best way to learn how to write commands is to look through the internal commands in the Terminus source code: [https://github.com/pantheon-systems/terminus](https://github.com/pantheon-systems/terminus)

## More Resources

- [Extend Terminus with Plugins](/guides/terminus/plugins)
- [Terminus Command Reference](/guides/terminus/commands)