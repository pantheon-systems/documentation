---
title: MySQL Slow Log
description: Use a Drupal or WordPress site's MySQL Slow Log to troubleshoot MySQL and identify serious performance issues.
tags: [debugdb]
categories: []
---
Analyzing the MySQL slow log is an important part of troubleshooting client issues before and after launch. Below are various methods for retrieving and examining them.

## Requirements

- SFTP command line interface (CLI)
- MySQL command line interface
- A working knowledge of SQL queries and MySQL

## Download the MySQL Slow Log via SFTP

To download the environment's MySQL slow log, use the [method outlined here](/logs/#database-log-files).

```nohighlight
$ sftp -o Port=2222 live.8883e341-e49d-4c84-958b-8685f263e5fb@dbserver.live.8883e341-e49d-4c84-958b-8685f263e5fb.drush.in
Connected to live.8883e341-e49d-4c84-958b-8685f263e5fb@dbserver.live.8883e341-e49d-4c84-958b-8685f263e5fb.drush.in.
sftp> cd logs
sftp> ls -l
-rw-rw----    1 0f59c6e86b6b4889a413835b20fcddf3 support    586912 Apr 18 19:31 mysqld-slow-query.log
-rw-rw----    1 0f59c6e86b6b4889a413835b20fcddf3 support    628455 Apr 18 19:31 mysqld.log
-rw-rw----    1 0f59c6e86b6b4889a413835b20fcddf3 support   1048713 Jan  2 11:34 mysqld.log-20190102
sftp> get mysqld-slow-query.log
Fetching /srv/bindings/0f59c6e86b6b4889a413835b20fcddf3/logs/mysqld-slow-query.log to mysqld-slow-query.log
/srv/bindings/0f59c6e86b6b4889a413835b20fcddf3/logs/mysqld-slow-query.log                                            100%  573KB 780.7KB/s   00:00
sftp> exit
```

## Analyze The Mysql Slow Log

There are several different tools you can use to analyze a MySQL slow log:

- <a href="https://www.percona.com/doc/percona-toolkit/2.2/index.html">Percona Toolkit</a> (Recommended. Actively maintained. Includes slow query log analyzer: <a href="https://www.percona.com/doc/percona-toolkit/2.1/pt-query-digest.html">pt-query-digest</a>.)   
- <a href="https://code.google.com/p/mysql-log-filter/">MySQL Slow Query Log Filter</a> (Not updated since 2007. Still useful, but will throw warnings with newer versions of PHP.)

These tools allow you to see summaries of the most commonly called, poor performing, SQL queries called by your website without manually going through the MySQL slow log. Refer to the documentation for the particulars of each of these programs. Here is an example usage of MySQL log filter, with a minimum execution time of 1 second, sorted by execution count and a no duplicates flag:

```php
$ php mysql-log-filter-1.9/mysql_filter_slow_log.php -T=1 --sort-execution-count --no-duplicates endpointas90kkud28a236-slow.log > site_name_slow_1s_noDupes.txt  
$ vi site_name_slow_1s_noDupes.txt
# Execution count: 11 times on 1970-01-01 01:00:00.  
# Column       :     avg |     max |       sum  
# Query time   :       1 |       1 |        11  
# Lock time    :       0 |       0 |         0  
# Rows examined: 132,363 | 132,363 | 1,455,993  
# Rows sent    :       5 |       5 |        55
# User@Host: pantheon[pantheon] @  [10.223.176.175]  
# User@Host: pantheon[pantheon] @  [10.223.177.102]  
# User@Host: pantheon[pantheon] @  [10.223.192.119]  
# User@Host: pantheon[pantheon] @  [10.223.192.139]  
# User@Host: pantheon[pantheon] @  [10.223.192.68]  
# User@Host: pantheon[pantheon] @  [10.223.192.87]  
SET timestamp=1418627746;SELECT node.title AS node_title, node.nid AS nid, node_counter.totalcount AS node_counter_totalcount, ga_stats_count_pageviews_today.count AS ga_stats_count_pageviews_today_countFROM node nodeLEFT JOIN node_counter node_counter ON node.nid = node_counter.nidLEFT OUTER JOIN ga_stats_count ga_stats_count_pageviews_today ON node.nid = ga_stats_count_pageviews_today.nid AND (ga_stats_count_pageviews_today.metric='pageviews' AND ga_stats_count_pageviews_today.timeframe='today') WHERE (( (node.status = '1') AND (node.type IN  ('story')) )) ORDER BY ga_stats_count_pageviews_today_count DESC LIMIT 5 OFFSET 0;  
```
This particular query is, at it's worst, examining 132,363 records to return 5, while taking a full second to do so. That would make it a fairly good candidate for refactoring, since most sites prefer queries to execute in milliseconds.

## Look at the slow queries by hour

Another method is to look at slow queries by the hour to see if there are spikes in slow queries that correspond to site traffic patterns.

    grep Time  endpointas90kkud28a236-slow.log | cut -d: -f1,2 | sort | uniq -c  

    70 # Time: 140708 10  
    71 # Time: 140708 11  
    49 # Time: 140708 12  
    77 # Time: 140708 13  
    77 # Time: 140708 14  
    35 # Time: 140708 15  
    76 # Time: 140708 16  

This means there were 70 slow queries between 10 and 11AM. That is roughly even distribution, which probably means there are a few slow queries that keep repeating.

For an in-depth look at finding serious MySQL performance issues using New Relic Pro and MySQL slow logs, see [MySQL Troubleshooting with New Relic Pro](/debug-mysql-new-relic/).

## See Also
- [Identify and Kill Queries with MySQL Command-Line Tool](/kill-mysql-queries)
