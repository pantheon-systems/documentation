---
title: Automate Downloading Logs from the Live Environment
description: Learn how to automate downloading logs from the Live environment of your site for debugging.
keywords: debug, debugging sites, debug sites, debugging site, debugging mysql, debug sql, troubleshoot mysql, troubleshoot sql, database logs, db logs, where are db logs stored, where are database logs, live logs, download logs, download log, access logs, get logs
---

Logs help you find, debug, and isolate current or potential problems on your live site. You can automate the process of accessing and maintaining these logs with a simple script.

## Enable Passwordless Access
Logs are stored within application container(s) which house your site's codebase and files. [Add an SSH key](/docs/articles/users/generating-ssh-keys/) within your User Dashboard to enable passwordless access and avoid authentication prompts. Otherwise, provide your Pantheon Dashboard credentials when prompted.

## Create Script
Open terminal and run the following commands to create and access a new local directory:
```
mkdir $HOME/site-logs
cd $HOME/site-logs
```
Using your favorite text editor, create a file within the `site-logs` directory called `collect-logs.sh` and save the following:
```
# Replace SITE with value from Dashboard URL
SITE=xxxxxxxxxxx
ENV=live
for app_server in `dig +short appserver.$ENV.$SITE.drush.in`;
do
  rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:logs $app_server
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
