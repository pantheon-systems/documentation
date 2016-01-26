---
title: Site Configurations by Plan
description: Get detailed information about site configurations per plan.
keywords: site, RAM, pantheon, backup, plan
---

## Glossary

**ngnix Worker Processes**: Handle network connections, read and write content to disk, and communicate with upstream servers
<hr>   
**MySQL Query Cache Size**: Cache allocated to hold query results
<hr>
**MySQL Innodb Buffer Pool Size**: InnoDB data is stored in pages (blocks), either on disk or in memory. The buffer pool is a cache for these pages and when a page’s content is requested by a query, the page is cached in the buffer pool.  
<hr>
**PHP Memory Limit**: The maximum amount of memory a PHP process can use
<hr>
**PHP APC SHM Size**: The size of each shared memory segment   
<hr>
**PHP Max Children**: Number of allowed child processes
<hr>
**Redis Memory Limit**:  
<hr>
**Redis Max Memory**: Max amount of RAM allocated to Redis  

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#999;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#444;background-color:#F7FDFA;}
.tg th{font-family:Arial, sans-serif;font-size:16px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#fff;background-color:#26ADE4;}

.tg .tg-xlfc{font-size:100%;font-family:serif !important;;background-color:#ecf4ff;vertical-align:top}
.tg .tg-0eef{font-weight:bold;background-color:#ecf4ff;color:#444444;vertical-align:top}
.tg .tg-eyl8{font-weight:bold;background-color:#ecf4ff}
.tg .tg-yw4l{vertical-align:top}
.tg .tg-7ojv{font-weight:bold;background-color:#ecf4ff;vertical-align:top}
</style>
<table class="tg" style="undefined;table-layout: fixed; width: 835px">
<colgroup>
<col style="width: 59px">
<col style="width: 194px">
<col style="width: 191px">
<col style="width: 193px">
<col style="width: 198px">
</colgroup>
  <tr>
    <th class="tg-xlfc"></th>
    <th class="tg-0eef">Personal</th>
    <th class="tg-0eef">Professional<br></th>
    <th class="tg-0eef">Business</th>
    <th class="tg-0eef">Enterprise</th>
  </tr>
  <tr>
    <td class="tg-eyl8">ngnix<br></td>
    <td class="tg-yw4l">Worker Processes: 2<br></td>
    <td class="tg-yw4l">Worker Processes: 4<br></td>
    <td class="tg-yw4l">Worker Processes: <br></td>
    <td class="tg-yw4l">Worker Processes: <br></td>
  </tr>
  <tr>
    <td class="tg-7ojv">MySQL<br></td>
    <td class="tg-yw4l">Query Cache Size: 32<br>Innodb Buffer Pool Size: 128<br>Memory Limit: 256<br></td>
    <td class="tg-yw4l">Query Cache Size: 64<br>Innodb Buffer Pool Size: 512<br>Memory Limit: 1024<br></td>
    <td class="tg-yw4l">Query Cache Size: 64<br>Innodb Buffer Pool Size: 1024<br>Memory Limit: 1536<br></td>
    <td class="tg-yw4l">Query Cache Size: 512<br>Innodb Buffer Pool Size: 8192<br>Memory Limit: 10240 <br></td>
  </tr>
  <tr>
    <td class="tg-7ojv">PHP</td>
    <td class="tg-yw4l">Memory Limit: 512<br>APC SHM Size: 128<br>FPM Max Children: 4<br></td>
    <td class="tg-yw4l">Memory Limit: 768<br>APC SHM Size: 256<br>FPM Max Children: 8<br></td>
    <td class="tg-yw4l">Memory Limit: 768<br>APC SHM Size: 256</td>
    <td class="tg-yw4l">Memory Limit: 1024</td>
  </tr>
  <tr>
    <td class="tg-7ojv">Redis</td>
    <td class="tg-yw4l">Memory Limit: 64<br>Max Memory: 51</td>
    <td class="tg-yw4l">Memory Limit: 256<br>Max Memory: 235<br></td>
    <td class="tg-yw4l">Memory Limit: 512<br>Max Memory: 471</td>
    <td class="tg-yw4l">Memory Limit: 2024<br>Max Memory: 16777<br></td>
  </tr>

</table>
<tr> <p style="font-size:12px"> * All sizes shown in MB </p style>

## View Your Site's Specific Configurations

### MySQL Configuration
For a comprehensive list of MySQL settings, [access your database](https://pantheon.io/docs/articles/local/accessing-mysql-databases/) and issue the [SHOW VARIABLES;](http://dev.mysql.com/doc/refman/5.0/en/show-variables.html) query.

### Redis Configuration
Get your Redis connection string by going to the **Site Dashboard > Environment (e.g. Dev) > Connection Info** and then run the following command: `<your redis string> config get *memory*`

### PHP Configuration
 See [Securely Working with phpinfo](https://pantheon.io/docs/articles/sites/secure-phpinfo/#method-1-(drupal)) for ways to view your specific PHP configuration.

## Frequently Asked Questions (FAQs)

#### Why don't backups and the database factor into the RAM being used?

#### What is the difference between Dev/Test/Live, starting at the Business service level?
