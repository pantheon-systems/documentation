---
title: Site Configurations by Plan
description: Get detailed information about site configurations per plan.
keywords: site, RAM, pantheon, backup, plan
---
Your site configurations depend on your current plan. The Pantheon platform scales instantly, so changing your service level will immediately change your resources to the values for the new plan, as shown in the table below.

## Site Configurations

<table class="table table-condensed table-bordered">
    <thead class="thead-inverse">
      <tr>
        <th scope="row" class="thead-inverse"></th>
        <th>Personal</th>
        <th>Professional</th>
        <th>Business</th>
        <th>Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="thead-inverse">App Servers</th>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>4-8</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">ngnix</th>
        <td>Worker Processes: 2</td>
        <td>Worker Processes: 4</td>
        <td>Worker Processes: 8</td>
        <td>Worker Processes: Varies</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">MySQL</th>
        <td>Query Cache Size: 32<br>Innodb Buffer Pool Size: 128<br>Memory Limit: 256<br></td>
        <td>Query Cache Size: 64<br>Innodb Buffer Pool Size: 512<br>Memory Limit: 1024</td>
        <td>Query Cache Size: 64<br>Innodb Buffer Pool Size: 1024<br>Memory Limit: 1536</td>
        <td>Query Cache Size: 512<br>Innodb Buffer Pool Size: 8192-16384<br>Memory Limit: 10240</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">PHP</th>
        <td>Memory Limit: 512<br>APC SHM Size: 128<br>FPM Max Children: 4</td>
        <td>Memory Limit: 768<br>APC SHM Size: 256<br>FPM Max Children: 8</td>
        <td>Memory Limit: 768<br>APC SHM Size: 256</td>
        <td>Memory Limit: 1024</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Redis</th>
        <td>Memory Limit: 64<br>Max Memory: 51</td>
        <td>Memory Limit: 256<br>Max Memory: 235</td>
        <td>Memory Limit: 512<br>Max Memory: 471</td>
        <td>Memory Limit: 1024 - 17124<br>Max Memory: 16777</td>
      </tr>
    </tbody>
  </table>
  <tr> <p style="font-size:12px"> * All sizes shown in MB </p style>

## Glossary

**ngnix Worker Processes**: Handle network connections, read and write content to disk, and communicate with upstream servers
<hr>   
**MySQL Query Cache Size**: Cache allocated to hold query results
<hr>
**MySQL Innodb Buffer Pool Size**: InnoDB data is stored in pages (blocks), either on disk or in memory. The buffer pool is a cache for these pages and when a page’s content is requested by a query, the page is cached in the buffer pool.  
<hr>
**PHP Memory Limit**: Maximum amount of memory a PHP process can use
<hr>
**PHP APC SHM Size**: Size of each shared memory segment   
<hr>
**PHP Max Children**: Number of allowed child processes
<hr>
**Redis Memory Limit**: Recommended amount of memory for Redis
<hr>
**Redis Max Memory**: Max amount of RAM allocated to Redis  

## View Your Site's Configurations

### MySQL Configuration
For a comprehensive list of MySQL settings, [access your database](https://pantheon.io/docs/articles/local/accessing-mysql-databases/) and issue the [SHOW VARIABLES;](http://dev.mysql.com/doc/refman/5.0/en/show-variables.html) query.

### Redis Configuration
Get your Redis connection string by going to the **Site Dashboard > Environment (e.g. Dev) > Connection Info**, and then run: `<your redis string> config get *memory*`

### PHP Configuration
 See [Securely Working with phpinfo](https://pantheon.io/docs/articles/sites/secure-phpinfo/#method-1-(drupal)) for ways to view your specific PHP configuration.

## Frequently Asked Questions (FAQs)

#### Are these the complete specs and memory for my site?   
No, your database and app server resources are not shared and are on their own application container with their own memory.

#### Are the specs the same for all three environments (Dev/Test/Live)?  
Yes they have the same infrastructure; however, it depends on your plan. Business plans and above have multiple web heads, which may lead unexpected results if code is not optimized for multiple app servers.
