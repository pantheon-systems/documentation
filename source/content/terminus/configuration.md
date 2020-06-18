---
title: Terminus Manual
subtitle: Configuration File
description: Learn how to configure your local Terminus configuration file.
terminuspage: true
type: terminuspage
layout: terminuspage
categories: [develop]
tags: [cli, local, terminus, workflow]
nexturl: terminus/updates/
previousurl: terminus/plugins/create/
permalink: docs/terminus/:basename/
image: terminus-thumbLarge
searchboost: 100
---

If you find yourself passing the same options to Terminus repeatedly, consider creating a configuration file to provide default values for common options. The Terminus configuration file lives at `$HOME/.terminus/config.yml`.

## Available Configurations

Any command variable normally passed in the form of `--option=VALUE` is configurable. Values stored will be available regardless of which alias you use to run the command. Default values stored this way will be overridden by those supplied on the command line.

You can see all the available options for a given command (e.g., available `--fields` or `--format` options) by running it with the `--help` option in your terminal:

![Terminus Help Command Example](../../images/terminus-help-example.png)

### Example

The `$HOME/.terminus/config.yml` file uses YAML formatting, which relies on indentation in the form of two spaces per indent:

```yml
command:
  auth:
    login:
      options:
        email: anita@example.com
  site:
    pancakes:
      options:
        app: sequelpro
```

The example above does two things:

- When the command `terminus auth:login` is run, it will automatically provide the correct email address. This is useful if you find yourself logging in to multiple accounts frequently, and want to use your regular account by default.

- The Terminus Plugin [Pancakes](https://github.com/terminus-plugin-project/terminus-pancakes-plugin) lets you open your Pantheon site database with a SQL GUI client. Rather than define the app every time, this configuration will always use Sequel Pro, unless otherwise specified.
