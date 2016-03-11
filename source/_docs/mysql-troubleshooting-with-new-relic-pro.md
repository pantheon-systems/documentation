---
title: MySQL Troubleshooting with New Relic Pro
description: Learn how to use integrated reporting services with New Relic to isolate MySQL performance issues on your Drupal or WordPress sites.
categories:
  - developing
keywords: mysql, mysql troubleshooting, new relic, new relic pro, system logs, logs, performance, mysql performance, mysql help, troubleshoot mysql, performance, slow queries, sql performance, mysql error log
---
While going through MySQL and PHP slow logs is a great way to find issues, modern reporting services that are integrated with your site help speed the process up tremendously. There are a few different systems to choose from, but at Pantheon we use New Relic. It comes integrated with the majority of our service plans. This article explains how, in conjunction with more traditional system logs, to use New Relic Pro. This article uses a Drupal installation to help illustrate the techniques, but you can also use this with WordPress sites.

## Open New Relic

From within Pantheon, go to the Dashboard for the site you suspect is having problems with MySQL query performance. Select the environment: Dev, Test, or Live. Click the **New Relic** tab, and select **Open New Relic**.

Once New Relic is open, go to the Applications tab. Select the application the issue has been reported on (Dev/Test/Live).  
 ![Applications tab of New Relic](/source/assets/images/desk_images/333262.png)  

## Investigate Activity

Using the graph, locate the time period the issue occurred in. This is usually visually apparent via large spikes in the graph. If not, use the New Relic time period selection tool to broaden your search (30 min, 60 min, 3 hours, etc...) until you find the problem.  
 ![New Relic overview](/source/assets/images/desk_images/333263.png)  
Highlight the spike in activity you want to investigate. New Relic will reload the page with the time frame you've selected.  
 ![Select time frame in New Relic overview](/source/assets/images/desk_images/333265.png)  
Click **Transactions**. The default sort is "Most Time Consuming" but this can be a false positive, as it measures a sum of time loading specific transactions, not the time per individual transaction. If a particular item is called 10x more than another, but loads quickly, it's **sum** will send it to the top of the list even if it's behaving well. Choose "Slowest average result time" instead. This will resort the order, bringing the biggest speed (or lack thereof) offenders to the fore.
 ![New Relic Transactions](/source/assets/images/desk_images/333266.png)  

### Drupal Sites
At times, systems like Drupal's Watchdog appear at the top. In general, that's an indication of a MySQL database under duress. Look for complex entities, such as Panels and Views, or custom functionality that's specific to the site in question. 

## Review Log Entries
Click on the most likely subject to see the details of that transaction. Scroll down, and note the transaction traces.  
 ![New Relic transaction traces](/source/assets/images/desk_images/333267.png)  
Click on the worst transaction trace to see a complete stack trace of that particular transaction. In this example, 1,790,000ms is definitely something to look at.  
 ![Example slow query](/source/assets/images/desk_images/333268.png)  
Get a more detailed breakdown by clicking on **SQL statements**. Scroll down until you find something suspicious.
 ![Investigate SQL statement](/source/assets/images/desk_images/333269.png)  
To see where and how this is happening, look for the path near the bottom of the page. In this case, it's /forum.  
 ![Investigate path](/source/assets/images/desk_images/333271.png)  
The New Relic Pro trace does not give the full query; it only shows the query with placeholders, which cannot be executed against MySQL as is. To do that, you'll need to look in the MySQL slow log. Go back to the site's panel on the Dashboard and get the SFTP connection information. Modify it per [this article](/docs/accessing-mysql-databases#frequently-asked-questions) to connect to MySQL via SFTP through your terminal or an FTP program that supports the SFTP protocol.

The slow log will be titled something like "endpointf123f456-slow.log" within the /data directory. Download that file to search locally to search for the query within the log. If it isn't there, we can download and unzip the applicable archived slow logs (ex. endpointf123f456-slow.log-20140812.gz) and search there if they are available. The archived slow logs are created by date and time, so look for the one that corresponds with the trace you are working with.  
 ![Download slow log from application server on Pantheon](/source/assets/images/desk_images/333275.png)  
Using the information from the New Relic trace, find the full query in the slow log. First, choose a distinctive part of the query. In this case I used "grep -c users\_comment.uis AS users\_comment\_uid" to get a count of the number of times that field has been included in the slow log. If the log is small enough (or if you have enough RAM), you can load it into your favorite text editor or IDE instead.  
 ![Review slow low](/source/assets/images/desk_images/333284.png)​  
Close out the SFTP session and get the MySQL CLI information for the Test MySQL server. If the Test server has major differences from your Live server, you can either connect to Live (NOT RECOMMENDED) or clone your Live database to your Dev or Test environment via your Pantheon Dashboard. Once this is done, connect to the MySQL server of your choice and run the query.  
 ![Execute the query](/source/assets/images/desk_images/333278.png)  
If the result confirm your suspicions, as this one does, delve in deeper to find out why the query is behaving so badly. Type [EXPLAIN](http://dev.mysql.com/doc/refman/5.0/en/explain.html) and then re-paste the query. MySQL will display extended information on how it’s [executing the query](http://dev.mysql.com/doc/refman/5.0/en/using-explain.html). Look for really odd things. For example, this one really doesn't look that bad, except the users table is referenced twice via alias and there isn't a single key index being used to search them.
 ![Extended information example](/source/assets/images/desk_images/333283.png)  
Looking at that table with a MySQL describe command shows that there is no primary key set on the UID field.  
 ![MySQL table describe users](/source/assets/images/desk_images/333280.png)  
Now that the problem has been found, it can be addressed. In this case, simply adding in the primary key and re-running the query gets a much improved query performance of 0.10 seconds.  
 ![Improved query preformance](/source/assets/images/desk_images/333281.png)  
**To recap:**

1. Use New Relic Pro to narrow and identify periods of time that have high load and/or slow response times.
2. In New Relic, narrow down the scope to one of those time periods, and find the worst performing transactions.
3. Within those transactions, go into the SQL trace to discover long running queries.
4. Using SFTP, download the appropriate MySQL Slow Log to retrieve the query in its entirety.
5. Connect to a safe MySQL server via CLI. Run the query to test the performance.
6. If the query result is poor, use the `EXPLAIN` and `EXPLAIN EXTENDED` MySQL command to get additional information. You can also examine the MySQL tables for structural issues using `DESCRIBE` and `ANALYZE` commands.
7. Once identified, fix the issue. This can be within the MySQL server itself if that's where the problem is, or it can be within the application by redoing code or configurations that are creating the errant query.
 
