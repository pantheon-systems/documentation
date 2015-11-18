---
title: Site Configurations by Plan
description: Get detailed information about site configurations per plan.
keywords: site, RAM, pantheon, backup, plan
---

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#999;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#444;background-color:#F7FDFA;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#fff;background-color:#26ADE4;}
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
    <td class="tg-yw4l">Worker Processes: 2<br></td>
    <td class="tg-yw4l">Worker Processes: <br></td>
    <td class="tg-yw4l">Worker Processes: <br></td>
  </tr>
  <tr>
    <td class="tg-7ojv">MySQL<br></td>
    <td class="tg-yw4l">query cache size: 32<br>innodb buffer pool size: 128<br>Memory Limit: 256<br></td>
    <td class="tg-yw4l">query cache size: 64<br>innodb buffer pool size: 512<br>Memory Limit: 1024<br></td>
    <td class="tg-yw4l">query cache size: 64<br>innodb buffer pool size: 1024<br>Memory Limit: 1536<br></td>
    <td class="tg-yw4l">query cache size: 512<br>innodb buffer pool size: 8192<br>Memory Limit: 10240 <br></td>
  </tr>
  <tr>
    <td class="tg-7ojv">PHP</td>
    <td class="tg-yw4l">Memory Limit: 512<br>apc shm size: 128<br>fpm max children: 4<br></td>
    <td class="tg-yw4l">Memory Limit: 768<br>apc shm size: 256<br>pm max children: 8<br>php memory limit: 256</td>
    <td class="tg-yw4l">Memory Limit: 768<br>apc shm size: 256</td>
    <td class="tg-yw4l">Memory limit: 1024</td>
  </tr>
  <tr>
    <td class="tg-7ojv">Redis</td>
    <td class="tg-yw4l">Memory Limit: 64<br>max memory: 51200MB</td>
    <td class="tg-yw4l">Memory Limit: 256<br>max memory: 235520MB<br></td>
    <td class="tg-yw4l">Memory Limit: 512<br>max memory: 471040MB</td>
    <td class="tg-yw4l">Memory Limit: 2024max memory: 17179869184</td>
  </tr>
</table>
