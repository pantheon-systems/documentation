---
title: MySQL Troubleshooting with New Relic Pro
description: Understanding integrated reporting services for MySQL troubleshooting.
category:
  - developing

---

While going through MySQL and PHP slow logs is a great way to find issues, modern reporting services that are integrated with your site help speed the process up tremendously. There are a few different systems to choose from, but at Pantheon we use New Relic. It comes integrated with the majority of our service plans. This presentation will show you how, in conjunction with more traditional system logs, to use New Relic Pro. For the sake of this article, I will be walking through a real life scenario to help illustrate the techniques.

## Open New Relic

From within Pantheon, go to the Dashboard for whatever website you suspect is having problems with MySQL query performance. Select the environment: Dev, Test, or Live. Then click the **New Relic** tab on the left, and again on the **Open New Relic** link.  

![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333260)  



Once New Relic is open, make sure you are on the Applications tab. Choose the application the issue has been reported on (Dev/Test/Live) and click on it.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333262)  

## Investigate Activity

Using the graph, locate the time period the issue occurred in. This is usually visually apparent via large spikes in the graph. If not, use the New Relic time period selection tool to broaden your search (30 min, 60 min, 3 hours, etc...) until you find the problem.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333263)  



Select the spike in activity you wish to investigate. This is done by left clicking at starting point of the activity, and dragging your mouse to the end of the activity, highlighting it. New Relic will reload the page with the time frame you've selected.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333265)  



Click on **Transactions**. The default sort is "Most Time Consuming" but this can be a false positive, as it measures a sum of time loading specific transactions, not the time per individual transaction. If a particular item is called 10x more than another, but loads quickly, it's **sum** will send it to the top of the list even if it's behaving well. Choose "Slowest average result time" instead. This will resort the order, bringing the biggest speed (or lack thereof) offenders to the fore.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333266)  

## Review Log Entries

Now we're getting somewhere! At times things like Drupal's Watchdog will appear at the top. Generally speaking, that's an indication of a MySQL database under duress. Look for complex entities, such as Panels and Views, or custom functionality that's specific to the site in question.  Click on the most likely subject. New Relic will refresh and load a detail of that transaction. Scroll down, and note the Transaction traces.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333267)  



Click on the worst transaction trace, and New Relic will load a complete stack trace of that particular transaction. In this specific example, 1,790,000ms is definitely something to be looked at.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333268)  



Click on **SQL statements** to get a more detailed breakdown. Scroll down until you find something suspicious.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333269)  



Just to confirm where and how this is happening, on the very bottom of the page will be the path that's calling the transaction. In this case, it's /forum.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333271)  



The New Relic Pro trace does not, however, give the full query. It only shows the query with the Drupal placeholders, which cannot be executed against MySQL as is. To do that, we now need to go hunting in the MySQL Slow log. Go back to the site's panel on the dashboard and get the SFTP connection information. Modify it per [this article](/docs/articles/local/accessing-mysql-databases#frequently-asked-questions) to connect to MySQL via SFTP via your terminal or a FTP program that supports the SFTP protocol.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333273)  



The slow log will be titled something along the lines of "endpointf123f456-slow.log" within the `/data` directory. Download that file to search locally so we can search for the query within the log. If not it isn’t, we can download and unzip the applicable archived slow logs (ex. endpointf123f456-slow.log-20140812.gz) and search there, if they are available. The archived slow logs are created by date and time, so look for the one that corresponds with the trace you are working with.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333275)  



Using the information gleaned from the New Relic trace, let's find the full query in the slow log. First, choose a distinctive part of the query. In this case I used `grep -c users\_comment.uis AS users\_comment\_uid` to get a count of the number of times that field has been included in the slow log. If the log is small enough (or if you have enough RAM), you can load it into your favorite textpad or IDE to do this instead.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333284)​  



Now it's time to see what's going on. Close out the SFTP session and get the MySQL CLI information for the Test MySQL server. If the Test server has major differences from your Live server, you can either connect to Live (NOT RECOMMENDED!) or clone your Live database to your Dev or Test environment via your Pantheon Dashboard. Once this is done, connect to the MySQL server of your choice and run the query.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333278)  



If the result bears out your suspicions, as this one does, you can delve in deeper to find out just why the query is behaving so badly. Type [`EXPLAIN`](http://dev.mysql.com/doc/refman/5.0/en/explain.html) and then re-paste the query. MySQL will print out an extended information on how it’s [executing the query](http://dev.mysql.com/doc/refman/5.0/en/using-explain.html). Look for really odd things. For example, in this one, it really doesn't look that bad at all. Except the users table is referenced twice via alias and there isn't a single key index being used to search them. Even though the field (UID) is always a primary key in any Drupal install.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333283)  



Let's take a look at that table with a MySQL describe command. The results are telling: there is no primary key set on the UID field.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333280)  



Now that the problem has been found, it can be addressed. In this case, simply adding in the primary key and re-running the query gets a much improved query performance of 0.10 seconds.  


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/333281)  




**To recap:**

1. Use New Relic Pro to narrow identify periods of time that have high load and/or slow response times.
2. In New Relic, narrow down the scope to one of those time periods, and find the worst performing transactions.
3. Within those transactions, go into the SQL trace to discover long running queries.
4. Using SFTP, download the appropriate MySQL Slow Log to retrieve the query in it's entirety.
5. Connect to a safe MySQL server via CLI. Run the query to test the performance.
6. If the query result is poor, use the `EXPLAIN` and `EXPLAIN EXTENDED` MySQL command to get additional information. You can also examine the MySQL tables for structural issues using `DESCRIBE` and `ANALYZE` commands.
7. Once identified, fix the issue as appropriate. This can be within the MySQL server itself if that's where the problem is, or it can be within the CMS (Drupal or WordPress) by redoing code or configurations that are creating the errant query.

 


This article should give you some of the tools and techniques required to use New Relic's Pro level account to properly dig deep down into your CMS for poor performing MySQL queries. Good luck, and have fun!  

 
