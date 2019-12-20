---
title: Parsing Nginx Access Logs with GoAccess
description: Learn how to parse the nginx-access.log file with GoAccess to gather information on your visitors and referral traffic.
tags: [logs]
categories: [performance]
contributors: [albertcausing, sarahg]
---
Pantheon runs nginx web servers for optimal performance. Your site's nginx access logs record web server events and activities that can help you identify potential issues and gather information about users.

<Alert title="Note" type="info">

Requests served by the [Pantheon Global CDN](/global-cdn) will not hit the nginx webserver and will not be logged in `nginx-access.log`.

</Alert>

[GoAccess](https://goaccess.io/) is a free, open source utility that creates reports by parsing `nginx-access.log` files. Use it to quickly identify the most used browsers and operating systems, visitor IPs, or most frequent 404s — all from the command line.

## Before You Begin

Be sure that you have:

* [Terminus](/terminus)
* [GoAccess](https://goaccess.io/download)
  * **Mac OS X**: Install via [Homebrew](https://brew.sh/) (`brew install goaccess`)
  * **Windows**: Use [Cygwin](https://cygwin.com/install.html)
  
This guide is written for the latest stable release of GoAccess as of this writing, which is version 1.3 ([release notes](https://goaccess.io/release-notes#release-1.3)).

## Edit GoAccess Configuration

To parse your `nginx-access.log` files with GoAccess, you'll need to configure GoAccess to read Pantheon's log formats.

The configuration file is located under `~/.goaccessrc` or `%sysconfdir%/goaccess.conf` where `%sysconfdir%` is either `/etc/`, `/usr/etc/` or `/usr/local/etc/` ([read more](https://goaccess.io/faq#configuration)).

Add the following lines to the `goaccess.conf` file, located in either `/etc/`, `/usr/etc/` or `/usr/local/etc/` depending on your installation method. You can also read from a `goaccess.conf` file in your home directory.

```
time-format %T
date-format %d/%b/%Y
log-format %h - %^ [%d:%t %^]  "%r" %s %b "%R" "%u" %T "%^"
```

## Create a report

1. [Download your nginx log files](/logs) from Pantheon via SFTP.
2. From the directory containing your `nginx-access.log` file, run GoAccess:

```bash
goaccess nginx-access.log
```

This should return a report that looks something like this:

(insert screenshot)

You can use the arrow keys on your keyboard to scroll down to view more of the report, or hit `q` to exit.

Alternatively, you can generate an HTML report with this command:

```bash
goaccess nginx-access.log > report.html
```

View that report in your browser:

```bash
open report.html
```

## Automate GoAccess Reports

1. Copy the general log retrieval script from [Automate Downloading Logs](logs#automate-downloading-logs), and use this to download logs from all application containers on the desired environment.

2. Add the following to either `collect-logs.sh` or a separate file:

```bash
# Unpack archived log files (optional).
gunzip */nginx-access.log-*

# Create a GoAccess report and open it in a browser.
goaccess */nginx-access.log* > goaccess.html && open goaccess.html
```


## See Also
- [Log Files on Pantheon](/logs)
- [MySQL Slow Log](/mysql-slow-log/)
- [PHP Slow Log](/php-slow-log/)
- [PHP Errors and Exceptions](/php-errors/)
- [Bots and Indexing](/bots-and-indexing/)
- [Traffic Limits and Overages](/traffic-limits/)
