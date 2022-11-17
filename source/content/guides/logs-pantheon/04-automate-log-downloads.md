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

This section provides information on how to automate the process of accessing and maintaining your logs with a script.

### Create a Script

1. Run the command below to create and access a new local directory:

    ```bash{promptUser: user}
    mkdir $HOME/site-logs
    cd $HOME/site-logs
    ```

1. Choose your preferred method from the Rsync version and SFTP version tabs at the end of this section, and then click the **Download** button to download the script. 

1. Move the downloaded script to the `site-logs` directory you created.

1. Use your preferred text editor to edit `collect-logs.sh` and replace the `xxxxxxx` with the appropriate site UUID and environment.

    - Please note that the resulting log file might be large.

<Alert title="Note"  type="info" >

The script provides several modifiable variables described in the comments.
Read the comments in the scripts carefully to ensure that you modify variables correctly.

</Alert>

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

You can collect your logs after you [create your script](/guides/logs-pantheon/automate-log-downloads#create-a-script).

1. Navigate to the `site-logs` directory and then execute the script below to download the logs.

  ```bash{promptUser:user}
  bash collect-logs.sh
  ```

1. Open the `site-logs` directory to access the logs.

    - More than one directory is generated for sites that use [multiple application containers](/application-containers#multiple-application-containers).

## More Resources

- [Fastly on Pantheon](/guides/fastly-pantheon)
- [Develop on Pantheon Directly with SFTP Mode](/sftp)
- [Using Git with SFTP & WordPress](/guides/wordpress-git/)
- [Terminus Manual](/terminus)