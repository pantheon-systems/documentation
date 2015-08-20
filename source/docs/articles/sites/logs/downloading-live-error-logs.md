---
title: Automate Downloading Logs from the Live Environment
description: Learn how to automate downloading logs from the Live environment of your site for debugging.
keywords: debug, debugging sites, debug sites, debugging site, debugging mysql, debug sql, troubleshoot mysql, troubleshoot sql, database logs, db logs, where are db logs stored, where are database logs, live logs, download logs, download log, access logs, get logs
---

Logs help you find, debug, and isolate current or potential problems on your live site. You can automate the process of accessing and maintaining these logs with a simple script.

## Password/SSH Key
The script requires access to your codebase, which means you will be interactively prompted for your password. To avoid this, add an SSH key to your Pantheon user account. See [Generating SSH Keys](/docs/articles/users/generating-ssh-keys/) for more information.

## Create Script
Open terminal and run the following commands to create and access a new local directory:
```
mkdir $HOME/site-logs
cd $HOME/site-logs
```
Using your favorite text editor, create a file within the `site-logs` directory called `collect-logs.sh` and save the following:
```
# Replace SITE_UUID with value from Dashboard URL
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
## Collect Logs
Download logs by executing the script from within the `site-logs` directory:
```
sh collect-logs.sh
```
You can now access the logs from within the `site-log` directory. More than one directory is generated for sites that use multiple application containers.

## See Also
- [Debugging Sites with Log Files](/docs/articles/sites/logs/debugging-sites-with-log-files/)
