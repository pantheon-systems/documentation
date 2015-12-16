---
title: Site Configurations by Plan
description: Get detailed information about site configurations per plan.
keywords: site, RAM, pantheon, backup, plan
---

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
    <td class="tg-yw4l">Worker processes: 2<br></td>
    <td class="tg-yw4l">Worker processes: 2<br></td>
    <td class="tg-yw4l">Worker processes: <br></td>
    <td class="tg-yw4l">Worker processes: <br></td>
  </tr>
  <tr>
    <td class="tg-7ojv">MySQL<br></td>
    <td class="tg-yw4l">Query cache size: 32<br>Innodb buffer pool size: 128<br>Memory limit: 256<br></td>
    <td class="tg-yw4l">Query cache size: 64<br>Innodb buffer pool size: 512<br>Memory limit: 1024<br></td>
    <td class="tg-yw4l">Query cache size: 64<br>Innodb buffer pool size: 1024<br>Memory limit: 1536<br></td>
    <td class="tg-yw4l">Query cache size: 512<br>Innodb buffer pool size: 8192<br>Memory limit: 10240 <br></td>
  </tr>
  <tr>
    <td class="tg-7ojv">PHP</td>
    <td class="tg-yw4l">Memory limit: 512<br>APC SHM size: 128<br>FPM max children: 4<br></td>
    <td class="tg-yw4l">Memory limit: 768<br>APC SHM size: 256<br>FPM max children: 8<br>PHP memory limit: 256</td>
    <td class="tg-yw4l">Memory limit: 768<br>APC SHM size: 256</td>
    <td class="tg-yw4l">Memory limit: 1024</td>
  </tr>
  <tr>
    <td class="tg-7ojv">Redis</td>
    <td class="tg-yw4l">Memory limit: 64<br>Max memory: 51200</td>
    <td class="tg-yw4l">Memory limit: 256<br>Max memory: 235520<br></td>
    <td class="tg-yw4l">Memory limit: 512<br>Max memory: 471040</td>
    <td class="tg-yw4l">Memory limit: 2024<br>Max memory: 16777216<br></td>
  </tr>

</table>
<tr> * All sizes shown in MB
