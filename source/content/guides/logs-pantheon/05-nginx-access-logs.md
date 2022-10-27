---
title: Log Files on Pantheon
subtitle: Parse Nginx Access Logs with GoAccess
description: Learn how to parse the nginx-access.log file with GoAccess.
categories: [performance]
tags: [logs, measure]
contributors: [albertcausing, sarahg]
layout: guide
showtoc: true
permalink: docs/guides/logs-pantheon/nginx-access-logs
anchorid: nginx-access-logs
---

This section provides information on how to parse the nginx-access.log file with GoAccess to gather information on your visitors and referral traffic.

Pantheon runs nginx web servers for optimal performance. Your site's nginx access logs record web server events and activities that can help you identify potential issues and gather information about users.

<Alert title="Note" type="info">

Requests served by the [Pantheon Global CDN](/guides/global-cdn) will not hit the nginx web server and will not be logged in `nginx-access.log`.

</Alert>

[GoAccess](https://goaccess.io/) is a free, open source utility that creates reports by parsing `nginx-access.log` files. You can use the `nginx-access.log` files to identify the most used browsers and operating systems, visitor IPs, and the most frequent 404s from the command line.

## Before You Begin

Be sure that you have:

- [Terminus](/terminus)
- [GoAccess](https://goaccess.io/download)
  - **Mac OS X**: Install via [Homebrew](https://brew.sh/) (`brew install goaccess`)
  - **Windows**: Use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

The process below uses GoAccess version 1.5. This is the latest stable release of GoAccess at the creation of this document. You can review the GoAccess [release notes](https://goaccess.io/release-notes) for more information.

## Edit GoAccess Configuration

You must configure GoAccess to read Pantheon's log formats to parse your `nginx-access.log` files with GoAccess.

1. Run the `goaccess --dcf` command to find the location of your configuration file.

1. Copy the configuration file to your home directory. For example, if you installed GoAccess with Homebrew, your command might look like this:

  ```bash{promptUser: user}
  cp /opt/homebrew/Cellar/goaccess/1.5.4/etc/goaccess/goaccess.conf ~/.goaccessrc
  ```

1. Add the following lines to the configuration file:

  ```none:title=.goaccessrc
  time-format %H:%M:%S
  date-format %d/%b/%Y
  log-format %^ - %^ [%d:%t %^]  "%r" %s %b "%R" "%u" %T "%h,%^"
  ```
1. Name the file appropriately:

    - The file must be named `.goaccessrc` if you are providing the configuration file from your home directory.

    - If you're storing the file somewhere other than your home directory, it must be named `goaccess.conf`. [Read more about the configuration file](https://goaccess.io/faq#configuration).

## Create a report

1. [Download your nginx log files](/guides/logs-pantheon/download-logs) from Pantheon via SFTP.

1. Navigate to the directory containing your `nginx-access.log` file, and then run GoAccess:

  ```bash{promptUser: user}
  goaccess nginx-access.log
  ```

  You can use the arrow keys on your keyboard to scroll down to view more of the report, or hit `q` to exit.

  Alternatively, you can run the command below to generate an HTML report:

  ```bash{promptUser: user}
  goaccess nginx-access.log > report.html
  ```

1. Open `report.html` to access the report in your browser.

  For MacOS:

  ```bash{promptUser: user}
  open report.html
  ```

  For Linux:

  ```bash{promptUser: user}
  xdg-open report.html
  ```

### Troubleshooting "goaccess.conf Not Found"

In certain MacOS [Homebrew](https://brew.sh/) installations of GoAccess versions 1.3 and earlier, `goaccess.conf` is not found by the binary.

To resolve this issue, [update your local packages](https://docs.brew.sh/FAQ#how-do-i-update-my-local-packages), or you can update the GoAccess package specifically:

```bash{promptUser: user}
brew upgrade goaccess
```

## Automate GoAccess Reports

1. Copy the general log retrieval script from [Automate Downloading Logs](/guides/logs-pantheon/automate-log-downloads), and use this to download logs from all application containers in the desired environment.

1. Add the code below to either `collect-logs.sh` or a separate file:

  ```bash
  # Unpack archived log files (optional).
  gunzip */nginx-access.log-*

  # Create a GoAccess report and open it in a browser.
  goaccess */nginx-access.log* > goaccess.html && open goaccess.html # Or xdg-open for Linux
  ```

## Alternatives to GoAccess

You can navigate the `nginx-access.log` file using the CLI without GoAccess. The following commands are a starting point for navigating the `nginx-access.log` file:

- Locate the most frequent client IP addresses:

  ```cat nginx-access.log | awk -F '\"' '{ print $8 }' | awk -F ',' '{print $1}' | sort | uniq -c | sort -frn | head -n 25```

- Locate the most frequent URLs:

  ```cat nginx-access.log | awk -F '\"' '{print $2}' | sort | uniq -c | sort -nr | head```

- Identify the most frequent User Agents:

  ```cat nginx-access.log | awk -F '\"' '{print $6}' | sort | uniq -c | sort -nr | head```


## More Resources

- [Bots and Indexing](/bots-and-indexing)
- [Traffic Limits and Overages](/guides/account-mgmt/traffic)
- [Application Containers](/application-containers)