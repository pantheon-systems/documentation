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

To download the environment's MySQL slow log, use the [method outlined here](/docs/logs/#database-log-files).

```sql
$ sftp -o Port=2222 live.91fd3bea-d11b-401a09iamd9-85e0-07ca0f4ce7bf@dbserver.live.91fd3bea-d11b-401a09iamd9-85e0-07ca0f4ce7bf.drush.in  
live.91fd3bea-d11b-401a-85e0-0@dbserver.live.91fd3bea-d11b-401a09iamd9-85e0-07ca0f4ce7bf.drush.in's password:
Connected to dbserver.live.91fd3bea-d11b-401a09iamd9-85e0-07ca0f4ce7bf.drush.in.  
sftp> cd logs  
sftp> ls -l  
get-rw-rw---- 1 16373 16373 16384 Dec 15 16:55 aria_log.00000001  
-rw-rw---- 1 16373 16373 52 Dec 15 16:55 aria_log_control  
-rw-rw---- 1 16373 16373 274308583 Dec 16 00:24 endpointas90kkud28a236-slow.log  
-rw-rw---- 1 16373 16373 14090210 Dec 09 03:19 endpointas90kkud28a236-slow.log-20141209.gz  
-rw-rw---- 1 16373 16373 15363540 Dec 10 04:05 endpointas90kkud28a236-slow.log-20141210.gz  
-rw-rw---- 1 16373 16373 24578172 Dec 11 03:49 endpointas90kkud28a236-slow.log-20141211.gz  
-rw-rw---- 1 16373 16373 41522551 Dec 12 04:08 endpointas90kkud28a236-slow.log-20141212.gz  
-rw-rw---- 1 16373 16373 27318331 Dec 13 04:09 endpointas90kkud28a236-slow.log-20141213.gz  
-rw-rw---- 1 16373 16373 9611117 Dec 14 04:09 endpointas90kkud28a236-slow.log-20141214.gz  
-rw-rw---- 1 16373 16373 29412295 Dec 15 04:08 endpointas90kkud28a236-slow.log-20141215.gz  
-rw-rw---- 1 16373 16373 5242880 Dec 16 00:24 ib_logfile0  
-rw-rw---- 1 16373 16373 5242880 Dec 16 00:24 ib_logfile1  
-rw-rw---- 1 16373 16373 127926272 Dec 16 00:24 ibdata1  
drwx------ 2 16373 16373 4096 Nov 17 22:10 mysql  
-rw-rw---- 1 16373 16373 1199417182 Dec 15 22:24 mysql-bin.001307  
-rw-rw---- 1 16373 16373 1073911597 Dec 15 22:38 mysql-bin.001308  
-rw-rw---- 1 16373 16373 1073742734 Dec 15 22:51 mysql-bin.001309  
-rw-rw---- 1 16373 16373 1076132500 Dec 15 23:22 mysql-bin.001310  
-rw-rw---- 1 16373 16373 1073867553 Dec 15 23:23 mysql-bin.001311  
-rw-rw---- 1 16373 16373 1073823426 Dec 15 23:39 mysql-bin.001312  
-rw-rw---- 1 16373 16373 1078972711 Dec 15 23:53 mysql-bin.001313  
-rw-rw---- 1 16373 16373 1073845201 Dec 16 00:20 mysql-bin.001314  
-rw-rw---- 1 16373 16373 150462472 Dec 16 00:24 mysql-bin.001315  
-rw-rw---- 1 16373 16373 171 Dec 16 00:20 mysql-bin.index  
srwxrwxrwx 1 16373 16373 0 Dec 05 23:53 mysql.sock  
-rw-rw---- 1 16373 16373 264 Nov 17 22:24 mysqld-relay-bin.000001  
-rw-rw---- 1 16373 16373 26 Nov 17 22:24 mysqld-relay-bin.index  
drwx------ 2 16373 16373 139264 Dec 15 09:40 pantheon  
drwx------ 2 16373 16373 4096 Nov 17 22:10 performance_schema  
sftp> get endpointas90kkud28a236-slow.log  
Fetching /srv/bindings/d85c97af3dae43069bc4b6c2d9f839be/data/endpointas90kkud28a236-slow.log to endpointas90kkud28a236-slow.log  
/srv/bindings/d85c97af3dae43069bc4b6c2d9f839be/data/endpointas90kkud28a236-slow.log 100% 262MB 712.5KB/s 06:16
sftp> exit  
$  
```

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>The names may vary depending on the zone the server is located. Look for the file ending with the matching -slow.log pattern.</p></div>

## Analyze The Mysql Slow Log

There are several different tools you can use to analyze a MySQL slow log:

- <a href="https://www.percona.com/doc/percona-toolkit/2.2/index.html">Percona Toolkit</a> (Recommended. Actively maintained. Includes slow query log analyzer: <a href="https://www.percona.com/doc/percona-toolkit/2.1/pt-query-digest.html">pt-query-digest</a>.)   
- <a href="http://www.hackmysql.com/mysqlsla">Mysqlsla</a> (No longer maintained by the author. <a href="https://github.com/daniel-nichter/hackmysql.com/tree/master/mysqlsla">Legacy GitHub repo</a>.)  
- <a href="https://code.google.com/p/mysql-log-filter/">Mysql Log Filter</a> (Not updated since 2007.)

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

For an in-depth look at finding serious MySQL performance issues using New Relic Pro and MySQL slow logs, see [MySQL Troubleshooting with New Relic Pro](/docs/debug-mysql-new-relic/).

## See Also
- [Identify and Kill Queries with MySQL Command-Line Tool](/docs/kill-mysql-queries)
