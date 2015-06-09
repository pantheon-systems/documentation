---
title: Automate Downloading Logs from the Live Environment
description: Learn how to automate downloading logs from the Live environment of your site for debugging.
keywords: debug, debugging sites, debug sites, debugging site, debugging mysql, debug sql, troubleshoot mysql, troubleshoot sql, database logs, db logs, where are db logs stored, where are database logs, live logs, download logs, download log, access logs, get logs
---
## Prerequisites
Add an SSH Key
```
mkdir $HOME/site-logs
cd $HOME/site-logs
```
Using your favorite text editor, create a file within the `site-logs` directory called `collect-logs.sh` and paste the following:
```
SITE_UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
for app_server in `dig +short appserver.live.$SITE_UUID.drush.in`;
do
mkdir $app_server
sftp -o Port=2222 live.$SITE_UUID@$app_server << !
  cd logs
  lcd $app_server
  mget *.log
!
done
```
<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Replace <code>xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code> with your Site UUID (found in the Dashboard URL).</div>
Next, execute the script:
```
sh collect-logs.sh
```
Run `ls` to view access logs downloaded by the script and open using your editor of choice. More than one directory could have been generated if your site uses multiple application containers.
