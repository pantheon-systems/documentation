---
title: MySQL Slow Log
description: Use a Drupal or WordPress site's MySQL Slow Log to troubleshoot MySQL and identify serious performance issues.
categories: [troubleshoot]
tags: [cli, database]
---
Analyzing the MySQL slow log is an important part of troubleshooting client issues before and after launch. Below are various methods for retrieving and examining them.

## Requirements

- SFTP command line interface (CLI)
- MySQL command line interface
- A working knowledge of SQL queries and MySQL

## Download the MySQL Slow Log via SFTP

To download the environment's MySQL slow log, use the [method outlined here](/logs/#database-log-files).

```bash{outputLines: 2-11}
sftp -o Port=2222 live.8883e341-e49d-4c84-958b-8685f263e5fb@dbserver.live.8883e341-e49d-4c84-958b-8685f263e5fb.drush.in
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

## Analyze the MySQL Slow Log

There are several different tools you can use to analyze a MySQL slow log:

- [Percona Toolkit](https://www.percona.com/doc/percona-toolkit/3.0/index.html)

  Recommended. Actively maintained and includes a number of database utilities, including a slow query log analyzer, [pt-query-digest](https://www.percona.com/doc/percona-toolkit/3.0/pt-query-digest.html). 

- [MySQL Slow Query Log Filter](https://code.google.com/p/mysql-log-filter/)

  Not updated since 2007. Still useful, but this will throw warnings with newer versions of PHP.

These tools provide summaries of the most commonly called, poor performing, SQL queries called by your website without manually going through the MySQL slow log. Refer to the documentation for the particulars of each of these programs. 

### Percona Toolkit's pt-query-digest

In the example below, we generate a report using `pt-query-digest` from a MySQL slow log file. In this example, we have one query that meets the threshold for reporting as slow: a `SELECT COUNT` query on the node table that returns a total of results from a nested `SELECT` query on the node table. 

```bash{promptUser: user}
pt-query-digest mysqld-slow-query.log
```

```sql
# 530ms user time, 50ms system time, 41.72M rss, 147.91M vsz
# Current date: Tue Apr 30 17:17:32 2019
# Hostname: dbserver-9dcedaed.c.pantheon-dmz.internal
# Files: mysqld-slow-query.log
# Overall: 543 total, 5 unique, 0.01 QPS, 2.23x concurrency ______________
# Time range: 2019-04-29 15:05:24 to 2019-04-30 17:16:55
# Attribute          total     min     max     avg     95%  stddev  median
# ============     ======= ======= ======= ======= ======= ======= =======
# Exec time        209994s      1s   7431s    387s   1649s    986s     84s
# Lock time          153ms    56us     4ms   281us   568us   282us   194us
# Rows sent          2.16k       0      30    4.07   16.81    6.40    0.99
# Rows examine     243.74G       0   3.68G 459.64M   1.95G 675.94M 173.70M
# Query size       1004.36k      64   2.26k   1.85k   2.16k  409.57   1.53k

# Profile
# Rank Query ID           Response time     Calls R/Call   V/M   Item
# ==== ================== ================= ===== ======== ===== =========
#    1 0xFA7FBE1532364377 180389.0902 85.9%   280 644.2468 26... SELECT node field_data_field_director node taxonomy_term_data taxonomy_vocabulary taxonomy_index field_data_field_term field_data_field_parent_course field_data_field_section_number
#    2 0xF65556406AC174D4  29585.0274 14.1%   250 118.3401 59... SELECT node field_data_field_director node taxonomy_term_data taxonomy_vocabulary taxonomy_index field_data_field_term field_data_field_parent_course field_data_field_section_number
# MISC 0xMISC                 20.3315  0.0%    13   1.5640   0.0 <3 ITEMS>

# Query 1: 0.00 QPS, 1.91x concurrency, ID 0xFA7FBE1532364377 at byte 201003
# This item is included in the report because it matches --limit.
# Scores: V/M = 2622.28
# Time range: 2019-04-29 15:05:24 to 2019-04-30 17:16:48
# Attribute    pct   total     min     max     avg     95%  stddev  median
# ============ === ======= ======= ======= ======= ======= ======= =======
# Count         51     280
# Exec time     85 180389s      6s   7431s    644s   3110s   1300s    213s
# Lock time     65   100ms   154us     4ms   355us   799us   370us   236us
# Rows sent     12     273       0       1    0.97    0.99    0.15    0.99
# Rows examine  76 186.16G  18.10M   3.68G 680.80M   2.87G 790.80M 460.88M
# Query size    43 438.41k   1.57k   1.57k   1.57k   1.53k       0   1.53k
# String:
# Databases    pantheon
# Hosts        10.128.0.130 (150/53%), 10.128.0.120 (130/46%)
# Users        pantheon
# Query_time distribution
#   1us
#  10us
# 100us
#   1ms
#  10ms
# 100ms
#    1s  #
#  10s+  ################################################################
# Tables
#    SHOW TABLE STATUS FROM `pantheon` LIKE 'node'\G
#    SHOW CREATE TABLE `pantheon`.`node`\G
#    SHOW TABLE STATUS FROM `pantheon` LIKE 'field_data_field_director'\G
#    SHOW CREATE TABLE `pantheon`.`field_data_field_director`\G
#    SHOW TABLE STATUS FROM `pantheon` LIKE 'taxonomy_term_data'\G
#    SHOW CREATE TABLE `pantheon`.`taxonomy_term_data`\G
#    SHOW TABLE STATUS FROM `pantheon` LIKE 'taxonomy_vocabulary'\G
#    SHOW CREATE TABLE `pantheon`.`taxonomy_vocabulary`\G
#    SHOW TABLE STATUS FROM `pantheon` LIKE 'taxonomy_index'\G
#    SHOW CREATE TABLE `pantheon`.`taxonomy_index`\G
#    SHOW TABLE STATUS FROM `pantheon` LIKE 'field_data_field_term'\G
#    SHOW CREATE TABLE `pantheon`.`field_data_field_term`\G
#    SHOW TABLE STATUS FROM `pantheon` LIKE 'field_data_field_parent_course'\G
#    SHOW CREATE TABLE `pantheon`.`field_data_field_parent_course`\G
#    SHOW TABLE STATUS FROM `pantheon` LIKE 'field_data_field_section_number'\G
#    SHOW CREATE TABLE `pantheon`.`field_data_field_section_number`\G
# EXPLAIN /*!50100 PARTITIONS*/
SELECT COUNT(*) AS expression
FROM
(SELECT 1 AS expression
FROM
node node
LEFT JOIN field_data_field_director field_data_field_director ON node.nid = field_data_field_director.entity_id AND (field_data_field_director.entity_type = 'node' AND field_data_field_director.deleted = '0')
LEFT JOIN node node_field_data_field_director ON field_data_field_director.field_director_target_id = node_field_data_field_director.nid
LEFT JOIN (SELECT td.*, tn.nid AS nid
FROM
taxonomy_term_data td
LEFT JOIN taxonomy_vocabulary tv ON td.vid = tv.vid
LEFT JOIN taxonomy_index tn ON tn.tid = td.tid
WHERE  (tv.machine_name IN  ('term')) ) taxonomy_term_data_node ON node.nid = taxonomy_term_data_node.nid
INNER JOIN field_data_field_term field_data_field_term ON node.nid = field_data_field_term.entity_id AND (field_data_field_term.entity_type = 'node' AND field_data_field_term.deleted = '0')
LEFT JOIN field_data_field_parent_course field_data_field_parent_course ON node.nid = field_data_field_parent_course.entity_id AND (field_data_field_parent_course.entity_type = 'node' AND field_data_field_parent_course.deleted = '0')
LEFT JOIN field_data_field_section_number field_data_field_section_number ON node.nid = field_data_field_section_number.entity_id AND (field_data_field_section_number.entity_type = 'node' AND field_data_field_section_number.deleted = '0')
WHERE (( (field_data_field_parent_course.field_parent_course_target_id = '7996' ) )AND(( (node.status = '1') AND (node.type IN  ('section')) AND (field_data_field_term.field_term_tid IN  ('141', '131', '126', '96')) )))) subquery\G
```

With this output, you can copy the offending query and run it through `EXPLAIN` on the MySQL server to find out why the query runs slowly. In this case, `EXPLAIN` shows that the table is missing an index, so adding an index could improve performance.

### MySQL Slow Query Log Filter
Here is an example usage of MySQL Slow Query Log Filter, with a minimum execution time of 1 second, sorted by execution count and a no duplicates flag:

```php
php mysql-log-filter-1.9/mysql_filter_slow_log.php -T=1 --sort-execution-count --no-duplicates mysqld-slow-query.log > site_name_slow_1s_noDupes.txt
```

Here is the contents of `site_name_slow-1s_noDupes.txt`:

```sql
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

This particular query is, at its worst, examining 132,363 records to return 5, while taking a full second to do so. That would make it a fairly good candidate for refactoring, since most sites prefer queries to execute in milliseconds.

## Look at the slow queries by hour

Another method is to look at slow queries by the hour to see if there are spikes in slow queries that correspond to site traffic patterns:

```bash
grep Time mysqld-slow.log | cut -d: -f1,2 | sort | uniq -c

70 # Time: 140708 10  
71 # Time: 140708 11  
49 # Time: 140708 12  
77 # Time: 140708 13  
77 # Time: 140708 14  
35 # Time: 140708 15  
76 # Time: 140708 16  
```

This means there were 70 slow queries between 10 and 11AM (UTC). That is roughly even distribution, which probably means there are a few slow queries that keep repeating.

For an in-depth look at finding serious MySQL performance issues using New Relic Pro and MySQL slow logs, see [MySQL Troubleshooting with New Relic Pro](/debug-mysql-new-relic).

## See Also
- [Identify and Kill Queries with MySQL Command-Line Tool](/kill-mysql-queries)
