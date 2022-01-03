---
title: Parsing Nginx Access Logs with GoAccess
description: Learn how to parse the nginx-access.log file with GoAccess to gather information on your visitors and referral traffic.
categories: [performance]
tags: [logs, measure]
contributors: [albertcausing, sarahg]
reviewed: "2022-01-02"
---
Pantheon runs nginx web servers for optimal performance. Your site's nginx access logs record web server events and activities that can help you identify potential issues and gather information about users.

<Alert title="Note" type="info">

Requests served by the [Pantheon Global CDN](/global-cdn) will not hit the nginx web server and will not be logged in `nginx-access.log`.

</Alert>

[GoAccess](https://goaccess.io/) is a free, open source utility that creates reports by parsing `nginx-access.log` files. Use it to quickly identify the most used browsers and operating systems, visitor IPs, or most frequent 404s — all from the command line.

## Before You Begin

Be sure that you have:

* [Terminus](/terminus)
* [GoAccess](https://goaccess.io/download)
  * **Mac OS X**: Install via [Homebrew](https://brew.sh/) (`brew install goaccess`)
  * **Windows**: Use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

This guide is written for the latest stable release of GoAccess as of this writing, which is version 1.5 ([release notes](https://goaccess.io/release-notes)).

## Edit GoAccess Configuration

To parse your `nginx-access.log` files with GoAccess, you'll need to configure GoAccess to read Pantheon's log formats.

1. Use the command `goaccess --dcf` to check where your configuration file is located.
2. Copy this configuration file to your home directory. For example, if you installed GoAccess with Homebrew, your command might look like this: `cp /opt/homebrew/Cellar/goaccess/1.5.4/etc/goaccess/goaccess.conf ~/.goaccessrc`
3. Add the following lines to the configuration file:

```none:title=.goaccessrc
time-format %H:%M:%S
date-format %d/%b/%Y
log-format %^ - %^ [%d:%t %^]  "%r" %s %b "%R" "%u" %T "%h,%^"
```

Note that when providing configuration from your home directory, the file needs to be named `.goaccessrc`. If you're storing this file elsewhere, it should be named `goaccess.conf`. [Read more about the configuration file](https://goaccess.io/faq#configuration).

## Create a report

1. [Download your nginx log files](/logs) from Pantheon via SFTP.
1. From the directory containing your `nginx-access.log` file, run GoAccess:

  ```bash{promptUser: user}
  goaccess nginx-access.log
  ```

  You can use the arrow keys on your keyboard to scroll down to view more of the report, or hit `q` to exit.

  Alternatively, you can generate an HTML report:

  ```bash{promptUser: user}
  goaccess nginx-access.log > report.html
  ```

1. View the report in your browser by opening `report.html`. For MacOS:

  ```bash{promptUser: user}
  open report.html
  ```

  For Linux:

  ```bash{promptUser: user}
  xdg-open report.html
  ```

### Troubleshooting "goaccess.conf Not Found"

In certain MacOS [Homebrew](https://brew.sh/) installations of GoAccess versions 1.3 and earlier, `goaccess.conf` is not found by the binary.

To resolve, [update your local packages](https://docs.brew.sh/FAQ#how-do-i-update-my-local-packages), or to update the GoAccess package specifically:

```bash{promptUser: user}
brew upgrade goaccess
```

## Automate GoAccess Reports

1. Copy the general log retrieval script from [Automate Downloading Logs](/logs#automate-downloading-logs), and use this to download logs from all application containers on the desired environment.

2. Add the following to either `collect-logs.sh` or a separate file:

  ```bash
  # Unpack archived log files (optional).
  gunzip */nginx-access.log-*

  # Create a GoAccess report and open it in a browser.
  goaccess */nginx-access.log* > goaccess.html && open goaccess.html # Or xdg-open for Linux
  ```

## Alternatives to GoAccess

You can navigate the `nginx-access.log` file using the CLI, without GoAccess. The following commands are a great starting point for navigatiing the `nginx-access.log` file:

* Locate the most frequent client IP addresses

  ```cat nginx-access.log | awk -F '\"' '{ print $8 }' | awk -F ',' '{print $1}' | sort | uniq -c | sort -frn | head -n 25```

* Locate the most frequent URLs

  ```cat nginx-access.log | awk -F '\"' '{print $2}' | sort | uniq -c | sort -nr | head```

* Identify the most frequent User Agents

  ```cat nginx-access.log | awk -F '\"' '{print $6}' | sort | uniq -c | sort -nr | head```


## See Also

* [Log Files on Pantheon](/logs)
* [Bots and Indexing](/bots-and-indexing)
* [Traffic Limits and Overages](/traffic-limits)
