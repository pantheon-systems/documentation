---
title: Parsing NGINX Access Logs with GoAccess
description: Learn how to parse the nginx-access.log file with GoAccess to gather information on your visitors and referral traffic.
tags: [logs]
categories: [performance]
goaccess: true
contributors: [albertcausing]
---
Pantheon runs NGINX web servers for optimal performance. Your site's NGINX access logs record web server events and activities that can help you identify potential issues and gather information about users.

<Alert title="Note" type="info">

Requests served by the [Pantheon Global CDN](/global-cdn) will not hit the NGINX webserver and will not be logged in `nginx-access.log`.

</Alert>

[GoAccess](https://goaccess.io/) is a free, open source utility that creates reports by parsing `nginx-access.log` files. Use it to quickly identify the most used browsers and operating systems, visitor IPs, or most frequent 404s — all from the command line.

## Before You Begin

Be sure that you have:

* [Terminus](/terminus)
* [GoAccess](https://goaccess.io/download)
  * **Mac OS X**: Install via [Homebrew](https://brew.sh/) (`brew install goaccess`)
  * **Windows**: Use [Cygwin](https://cygwin.com/install.html)
  
This guide is written for the latest stable release of GoAccess as of this writing, which is 1.3 ([release notes](https://goaccess.io/release-notes#release-1.3)).

## Edit GoAccess Configuration

To parse your `nginx-access.log` files with GoAccess, you'll need to configure GoAccess to read Pantheon's log formats.

The configuration file is located under `~/.goaccessrc` or `%sysconfdir%/goaccess.conf` where `%sysconfdir%` is either `/etc/`, `/usr/etc/` or `/usr/local/etc/` [read more](https://goaccess.io/faq#configuration).

Add the following lines to the `goaccess.conf` file, located in either `/etc/`, `/usr/etc/` or `/usr/local/etc/` depending on your installation method. You can also read from a `goaccess.conf` file in your home directory.

```
time-format %T
date-format %d/%b/%Y
log-format %h - %^ [%d:%t %^]  "%r" %s %b "%R" "%u" %T "%^"
```

## Create a report

1. [Download your NGINX log files](/logs) from Pantheon via SFTP.
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

Then view that report in your browser:

```bash
open report.html
```

## Automate GoAccess Reports

Copy the following script to quickly pull a site's nginx log file and create an HTML report using GoAccess. You can use <i class="fa fa-code"> View Raw</i> to open the file in a new window or tab:

<Download file="access_getlogs.sh" />

GITHUB-EMBED https://github.com/pantheon-systems/documentation/tree/master/source/scripts/access_getlogs.sh.txt bash GITHUB-EMBED

Make the script executable:

```bash
chmod +x ~/Downloads/access_getlogs.sh
```

Move the script to `/usr/local/bin/`:

```bash
sudo mv ~/Downloads/access_getlogs.sh /usr/local/bin/access_getlogs
```

Generate a report for a given site and environment:

```bash
access_getlogs --site=<site> --env=<env>
```



## See Also
- [Log Files on Pantheon](/logs)
- [MySQL Slow Log](/mysql-slow-log/)
- [PHP Slow Log](/php-slow-log/)
- [PHP Errors and Exceptions](/php-errors/)
- [Bots and Indexing](/bots-and-indexing/)
