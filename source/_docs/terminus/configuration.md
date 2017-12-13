---
title: Terminus Manual
subtitle: Configuration File
terminusconfiguration: true
terminuspage: true
terminustoc: true
type: terminuspage
layout: terminuspage
nexturl: terminus/examples/
previousurl: terminus/plugins/create/
permalink: docs/terminus/:basename/
image: terminus-thumbLarge
---

If you find yourself passing the same options to Terminus repeatedly, consider creating a configuration file to provide default values for common options. The Terminus configuration file lives at `$HOME/.terminus/config.yml`.

## What Can I Configure?

Any command variable normally passed in the form of `--option=VALUE`. You can see all the available options for a command using the `terminus help COMMAND`:

![Terminus Help Command Example](/source/docs/assets/images/terminus-help-example.png)

## Examples

```yml
command:
  auth:
    login:
      options:
        email: anita@example.org
  site:
    pancakes:
      options:
        app: sequelpro
```

The example above does two things:

 - When the command `terminus auth:login` is run, it will automaticaly provide the correct email address. This is useful if you find yourself logging in to multiple accounts frequently, and want to use your regular account by default.

 - The Terminus Plugin [Pancakes](https://github.com/terminus-plugin-project/terminus-pancakes-plugin) lets you open your Pantheon site database with a SQL GUI client. Rather than define the app every time, this configuration will always use Sequel Pro, unless otherwise specified.

 ## Formatting

 `config.yml` uses YAML formatting, which relies on indentation in the form of two spaces per indent.
