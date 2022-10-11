---
title: Log Files on Pantheon
subtitle: Automate Log Downloads
description: Learn how to automate your log downloads.
categories: [logs]
tags: [logs, measure]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/logs-pantheon/automate-log-downloads
anchorid: automate-log-downloads
---

## Automate Downloading Logs

Automate the process of accessing and maintaining these logs with a script.

### Create a Script

1. Open your local terminal to create and access a new local directory:

    ```bash{promptUser: user}
    mkdir $HOME/site-logs
    cd $HOME/site-logs
    ```

1. Choose your preferred method from the following tabs > Click the **Download** button to download the script. 

1. Move the downloaded script to the `site-logs` directory you created > Use your favorite text editor to edit `collect-logs.sh` and replace the `xxxxxxx` with the appropriate site UUID and environment.

  - Please note that the resulting log file might be large.

The script provides several modifiable variables described in its comments:

  <TabList>

  <Tab title="Rsync version" id="rsync-ver" active={true}>

  <Download file="collect-logs-rsync.sh" />

  GITHUB-EMBED https://github.com/pantheon-systems/documentation/blob/main/source/scripts/collect-logs-rsync.sh.txt shell:title=collect-logs-rsync.sh GITHUB-EMBED

  [View on GitHub](https://github.com/pantheon-systems/documentation/blob/main/source/scripts/collect-logs-rsync.sh.txt)

  </Tab>

  <Tab title="SFTP version" id="sftp-ver">
  
  <Download file="collect-logs-sftp.sh" />

  GITHUB-EMBED https://github.com/pantheon-systems/documentation/blob/main/source/scripts/collect-logs-sftp.sh.txt shell:title=collect-logs-sftp.sh GITHUB-EMBED

  [View on GitHub](https://github.com/pantheon-systems/documentation/blob/main/source/scripts/collect-logs-sftp.sh.txt)

  </Tab>

  </TabList>

### Collect Logs

1. Download logs by executing the script from within the `site-logs` directory:

  ```bash{promptUser:user}
  bash collect-logs.sh
  ```

1. Open the `site-logs` directory to access the logs.
  
  - More than one directory is generated for sites that use multiple application containers.