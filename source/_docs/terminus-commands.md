---
title: Configure
description: How to create configuration files to provide default values for the commandline options.
draft: true
---

## Configuration files

While this isnt necessary, it can be convenient to create configuration files to provide default values for the commandline options for any Terminus command.   

When launched, Terminus will load a configuration file if it exists in the current working directory. Therefore, if you want to supply default options you create a file `$HOME/.terminus/config.yml` and populate it with default settings for your various Terminus commands. You must store your configuration under the primary command name; it will be available regardless of which alias you use to run the command, though.

For example, to supply values to the `site:pancakes` command, you would add:

``` markdown
command:
  auth:
    login:
      options:
        machine-token: YOUR_MACHINE_TOKEN_HERE
  site:
    pancakes:
      options:
        app: sequelpro
```
These default options can be overidden, if necessary, by supplying the option on the command line.

