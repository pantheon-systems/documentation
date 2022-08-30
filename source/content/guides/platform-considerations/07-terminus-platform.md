---
title: Platform Considerations
subtitle: Terminus Platform Support
description: Learn more about Pantheon platform Terminus support.
categories: [platform]
tags: [files, libraries, security, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/platform-considerations/terminus-platform
anchorid: terminus-platform
---



## Terminus Support

[Terminus](/terminus), our command-line tool for power users, is designed for 'nix-type operating systems like MacOS and Linux. While some people have installed Terminus on Windows using the [Git BASH on Git for Windows](https://git-for-windows.github.io) or [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) shells, this is not officially supported.

If you're a Windows user, consider using a virtualization tool like [VirtualBox](https://www.virtualbox.org/) to run a virtualized 'nix-type environment for tools like Terminus.

## Terminus Can't Delete a Site or Multidev

You might encounter the following error when a site is created and then quickly deleted, or is deleted before the site creation process has completed:

```shell
[error] The environment '1234567' was not found.
```

[Contact Support](/guides/support/contact-support/) and ask to have the environment deleted.
