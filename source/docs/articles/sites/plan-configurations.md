---
title: Site Configurations by Plan
description: Get detailed information about site configurations per plan.
keywords: site, RAM, pantheon, backup, plan
---

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#999;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#444;background-color:#F7FDFA;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#fff;background-color:#26ADE4;}
.tg .tg-c57o{background-color:#ecf4ff;vertical-align:top}
.tg .tg-0eef{font-weight:bold;background-color:#ecf4ff;color:#444444;vertical-align:top}
.tg .tg-eyl8{font-weight:bold;background-color:#ecf4ff}
.tg .tg-yw4l{vertical-align:top}
.tg .tg-7ojv{font-weight:bold;background-color:#ecf4ff;vertical-align:top}
</style>
<table class="tg" style="undefined;table-layout: fixed; width: 834px">
<colgroup>
<col style="width: 59px">
<col style="width: 194px">
<col style="width: 191px">
<col style="width: 193px">
<col style="width: 197px">
</colgroup>
  <tr>
    <th class="tg-c57o"></th>
    <th class="tg-0eef">Personal</th>
    <th class="tg-0eef">Professional<br></th>
    <th class="tg-0eef">Business</th>
    <th class="tg-0eef">Enterprise</th>
  </tr>
  <tr>
    <td class="tg-eyl8">ngnix<br></td>
    <td class="tg-yw4l">Worker Processes: 2<br></td>
    <td class="tg-yw4l">Worker Processes: 2<br></td>
    <td class="tg-yw4l">Worker Processes: <br></td>
    <td class="tg-yw4l">Worker Processes: <br></td>
  </tr>
  <tr>
    <td class="tg-7ojv">MySQL<br></td>
    <td class="tg-yw4l">query cache size: 32<br>innodb buffer pool size: 128<br>CPU Shares: 250<br>Memory Limit: 256<br>Block IO Weight: 400</td>
    <td class="tg-yw4l">query cache size: 64<br>innodb buffer pool size: 512<br>CPU Shares: 750<br>Memory Limit: 1024<br>Block IO Weight: 500</td>
    <td class="tg-yw4l">query cache size: 64<br>innodb buffer pool size: 1024<br>CPU Shares: 1000<br>MemoryLimit: 1536<br>Block IO Weight: 600</td>
    <td class="tg-yw4l">query cache size: 512<br>innodb buffer pool size: 8192<br>CPU Shares: 6000<br>Memory Limit: 10240 Block IO Weight: 800</td>
  </tr>
  <tr>
    <td class="tg-7ojv">PHP</td>
    <td class="tg-yw4l">CPU Shares: 250<br>Memory Limit: 512<br>Block IO Weight: 100<br>apc shm size: 128<br>fpm max children: 4<br>memory limit: 256</td>
    <td class="tg-yw4l">CPU Shares: 750<br>Memory Limit: 768<br>Block IO Weight: 300 <br>apc shm size: 256<br>pm max children: 8<br>php memory limit: 256</td>
    <td class="tg-yw4l">CPU Shares: 1000 Memory Limit: 768<br>Block IO Weight: 400<br>apc shm size: 256</td>
    <td class="tg-yw4l">php memory limit: 1024</td>
  </tr>
  <tr>
    <td class="tg-7ojv">Redis</td>
    <td class="tg-yw4l">CPU Shares: 8<br>Memory Limit: 64<br>Block IO Weight: 50<br>max memory: 52428800</td>
    <td class="tg-yw4l">CPU Shares: 32<br>Memory Limit: 256<br>Block IO Weight: 100<br>max memory: 241172480</td>
    <td class="tg-yw4l">CPU Shares: 32<br>Memory Limit: 512<br>Block IO Weight: 100<br>max memory: 482344960</td>
    <td class="tg-yw4l">max memory: 17179869184 Memory Limit: 2024</td>
  </tr>
</table>
