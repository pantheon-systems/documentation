---
title: Parsing nginx Access Logs with GoAccess
description: Learn how to parse the nginx-access.log file with GoAccess to gather information on your visitors and referral traffic.
tags: [logs]
categories: []
goaccess: true
contributors: [albertcausing,]
---
Pantheon uses nginx web servers for optimal performance. Log files record the web server events and activities and can help you identify potential issues and gather information about users.

<Alert title="Note" type="info">

Requests served by the [Pantheon Global CDN](/global-cdn) will not hit the nginx webserver and will not be logged in `nginx-access.log`.

</Alert>

[GoAccess](https://goaccess.io/) is a free, open source utility that creates on the fly server reports by parsing the `nginx-access.log` file. Use it to quickly identify the most used browsers and operating systems, or to debug failed requests—all from the command line.

## Before You Begin

Be sure that you have:

- [Terminus](/terminus)
- [GoAccess](https://goaccess.io/download)
 - **Mac OS X**: Install via [Homebrew](https://brew.sh/)
 - **Windows**: Use [Cygwin](https://cygwin.com/install.html)

## Edit GoAccess Configuration

To parse the Pantheon `nginx-access.log` file with GoAccess, you'll need to specify the unique log formats.

Add the following lines to the `goaccess.conf` file, located in either `/etc/`, `/usr/etc/` or `/usr/local/etc/` depending on your installation method:

```
time-format %H:%M:%S
date-format %d/%b/%Y
log-format %^ - %^ [%d:%t %^]  "%r" %s %b "%R" "%u" %T ~h{," }
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

## Alternatives to GoAccess

The `nginx-access.log` file can also be navigated from via CLI, without GoAccess. The following commands are a great starting point for navigation of the `nginx-access.log` file: 

Locate the most frequent IP addresses:

```cat nginx-access.log | awk -F\" '{ print $8 }' | sort | uniq -c | sort -frn | head -n 25```

Locate the most frequent URLs:

```cat nginx-access.log | awk -F\" '{print $2}' nginx-access.log| sort | uniq -c | sort -nr | head```


Identify the most frequent User Agents:

```cat nginx-access.log | awk -F\" '{print $6}' nginx-access.log | sort | uniq -c | sort -nr | head```



## See Also
- [Log Files on Pantheon](/logs)
- [MySQL Slow Log](/mysql-slow-log/)
- [PHP Slow Log](/php-slow-log/)
- [PHP Errors and Exceptions](/php-errors/)
- [Bots and Indexing](/bots-and-indexing/)
