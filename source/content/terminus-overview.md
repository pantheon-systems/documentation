---
title: Terminus
description: A command line interface for advanced interaction with the Pantheon platform.
contributors: [wordsmither]
contenttype: [doc]
innav: [true]
categories: [overview, cli]
cms: [--]
audience: [development, sysadmin]
product: [dashboard]
integration: [--]
tags: [--]
showtoc: false
reviewd: 2023-06-26
---

<TabList>

<Tab title="Overview" id="overview" active={true}>

Terminus is a command line interface that provides advanced interaction with Pantheon. Terminus enables you to do almost everything in a terminal that you can do in the Dashboard, as well as scripting and much more.

```bash{outputLines:2-7}
terminus site:list
+--------------------------+-----------+---------------+--------------------------+
| Site                     | Framework | Service Level | UUID                     |
+--------------------------+-----------+---------------+--------------------------+
| terminus-create          | drupal9   | free          | terminus-create          |
| git-import-example       | drupal    | free          | git-import-example       |
+--------------------------+-----------+---------------+--------------------------+
```


</Tab>

<Tab title="Features" id="features">

- Create a new site
- Create and delete Multidev environments
- Clone one environment to another
- Check for and apply upstream updates
- Deploy code from one environment to another
- Run [Drush](/guides/drush/) and [WP-CLI](/guides/wp-cli/) commands

*Create a New Site*

 ```bash{outputLines:2}
 terminus site:create terminus-cli-create "Terminus CLI Create" 21e1fada-199c-492b-97bd-0b36b53a9da0
 [notice] Creating a new site...
 ```

*Deploy Code*

  ```bash{promptUser: user}
  terminus env:deploy my-site.test --sync-content --note="Deploy core and contrib updates"
  ```



</Tab>

<Tab title="Requirements" id="requirements">

Terminus has been tested on the following platforms:

- MacOS
- Windows 10 – WSL 2 Ubuntu 20.0
- Ubuntu 20.0 – this would include Ubuntu under Docker or VirtualBox

Terminus does not work with the following platforms:

- Windows 10 – Command Line
- Windows 10 – Git Bash (MingW)
- Ubuntu 18.0 and earlier versions
- Linux system with coreutils equal to or less than 8.28

</Tab>

<Tab title="Resources" id="resources">

## Documentation

* [Terminus Guide](/terminus)

## Learning

* [Command Line Interface with Terminus](https://learning.pantheon.io/command-line-interface-with-terminus-quick-start)

## Support

* [Account holders](https://dashboard.pantheon.io/workspace/ee3995c4-652e-44a0-b00b-0085e92d78da/support)

</Tab>

</TabList>
