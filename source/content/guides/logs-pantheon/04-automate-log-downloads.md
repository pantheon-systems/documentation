---
title: Environment Log Files on Pantheon
subtitle: Automate Log Downloads
description: Learn how to automate your log downloads.
contenttype: [guide]
innav: [false]
categories: [logs]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [logs, measure]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/logs-pantheon/automate-log-downloads
---

This section provides information on how to automate the process of accessing and maintaining your logs with a script.

### Create a Script

1. Run the command below to create and access a new local directory:

    ```bash{promptUser: user}
    mkdir $HOME/site-logs
    cd $HOME/site-logs
    ```

1. Choose your preferred method from the Rsync version and SFTP version tabs at the end of this section, and then click the **Download** button to download the script. 

1. Move the downloaded script to the `site-logs` directory you created.

1. Use your preferred text editor to edit `collect-logs.sh` and replace the `xxxxxxx` with the appropriate site UUID and environment.

    - Please note that the resulting log file might be large.

<Alert title="Note"  type="info" >

The script provides several modifiable variables described in the comments.
Read the comments in the scripts carefully to ensure that you modify variables correctly.

</Alert>

  <TabList>

  <Tab title="Rsync version" id="rsync-ver" active={true}>

  <Download file="collect-logs-rsync.sh" />

  ```bash
  #!/bin/bash
  # Site UUID is REQUIRED: Site UUID from Dashboard URL, e.g. 12345678-1234-1234-abcd-0123456789ab
  SITE_UUID=xxxxxxx
  # Environment is REQUIRED: dev/test/live/or a Multidev
  ENV=xxxxxxx

  ########### Additional settings you don't have to change unless you want to ###########
  # OPTIONAL: Set AGGREGATE_NGINX to true if you want to aggregate nginx logs.
  #  WARNING: If set to true, this will potentially create a large file
  AGGREGATE_NGINX=false
  # if you just want to aggregate the files already collected, set COLLECT_LOGS to FALSE
  COLLECT_LOGS=true
  # CLEANUP_AGGREGATE_DIR removes all logs except combined.logs from aggregate-logs directory.
  CLEANUP_AGGREGATE_DIR=false


  if [ $COLLECT_LOGS == true ]; then
  echo "COLLECT_LOGS set to $COLLECT_LOGS. Beginning the process..."
  for app_server in $(dig +short -4 appserver.$ENV.$SITE_UUID.drush.in);
  do
      rsync -rlvz --size-only --ipv4 --progress -e "ssh -p 2222" "$ENV.$SITE_UUID@$app_server:logs" "app_server_$app_server"
  done

  # Include MySQL logs
  for db_server in $(dig +short -4 dbserver.$ENV.$SITE_UUID.drush.in);
  do
      rsync -rlvz --size-only --ipv4 --progress -e "ssh -p 2222" "$ENV.$SITE_UUID@$db_server:logs" "db_server_$db_server"
  done
  else
  echo 'skipping the collection of logs..'
  fi

  if [ $AGGREGATE_NGINX == true ]; then
  echo "AGGREGATE_NGINX set to $AGGREGATE_NGINX. Starting the process of combining nginx-access logs..."
  mkdir aggregate-logs

  for d in $(ls -d app*/logs/nginx); do
      for f in $(ls -f "$d"); do
      if [[ $f == "nginx-access.log" ]]; then
          cat "$d/$f" >> aggregate-logs/nginx-access.log
          cat "" >> aggregate-logs/nginx-access.log
      fi
      if [[ $f =~ \.gz ]]; then
          cp -v "$d/$f" aggregate-logs/
      fi
      done
  done

  echo "unzipping nginx-access logs in aggregate-logs directory..."
  for f in $(ls -f aggregate-logs); do
      if [[ $f =~ \.gz ]]; then
      gunzip aggregate-logs/"$f"
      fi
  done

  echo "combining all nginx access logs..."
  for f in $(ls -f aggregate-logs); do
      cat aggregate-logs/"$f" >> aggregate-logs/combined.logs
  done
  echo 'the combined logs file can be found in aggregate-logs/combined.logs'
  else
  echo "AGGREGATE_NGINX set to $AGGREGATE_NGINX. So we're done."
  fi

  if [ $CLEANUP_AGGREGATE_DIR == true ]; then
  echo "CLEANUP_AGGREGATE_DIR set to $CLEANUP_AGGREGATE_DIR. Cleaning up the aggregate-logs directory"
  find ./aggregate-logs/ -name 'nginx-access*' -print -exec rm {} \;
  fi  
  ```

  </Tab>

  <Tab title="SFTP version" id="sftp-ver">
  
  <Download file="collect-logs-sftp.sh" />

  ```bash
  #!/bin/bash
  # Site UUID is REQUIRED: Site UUID from Dashboard URL, e.g. 12345678-1234-1234-abcd-0123456789ab
  SITE_UUID=xxxxxxx
  # Environment is REQUIRED: dev/test/live/or a Multidev
  ENV=xxxxxxx

  ########### Additional settings you don't have to change unless you want to ###########
  # OPTIONAL: Set AGGREGATE_NGINX to true if you want to aggregate nginx logs.
  #  WARNING: If set to true, this will potentially create a large file
  AGGREGATE_NGINX=false
  # if you just want to aggregate the files already collected, set COLLECT_LOGS to FALSE
  COLLECT_LOGS=true
  # CLEANUP_AGGREGATE_DIR removes all logs except combined.logs from aggregate-logs directory.
  CLEANUP_AGGREGATE_DIR=false


  if [ $COLLECT_LOGS == true ]; then
  echo 'COLLECT_LOGS set to $COLLECT_LOGS. Beginning the process...'
  for app_server in $(dig +short -4 appserver.$ENV.$SITE_UUID.drush.in);
  do
      echo "get -R logs \"app_server_$app_server\"" | sftp -o StrictHostKeyChecking=no -o Port=2222 "$ENV.$SITE_UUID@$app_server"
  done

  # Include MySQL logs
  for db_server in $(dig +short -4 dbserver.$ENV.$SITE_UUID.drush.in);
  do
      echo "get -R logs \"db_server_$db_server\"" | sftp -o StrictHostKeyChecking=no -o Port=2222 "$ENV.$SITE_UUID@$db_server"
  done
  else
  echo 'skipping the collection of logs..'
  fi

  if [ $AGGREGATE_NGINX == true ]; then
  echo 'AGGREGATE_NGINX set to $AGGREGATE_NGINX. Starting the process of combining nginx-access logs...'
  mkdir aggregate-logs

  for d in $(ls -d app*/nginx); do
      for f in $(ls -f "$d"); do
      if [[ $f == "nginx-access.log" ]]; then
          cat "$d/$f" >> aggregate-logs/nginx-access.log
          cat "" >> aggregate-logs/nginx-access.log
      fi
      if [[ $f =~ \.gz ]]; then
          cp -v "$d/$f" aggregate-logs/
      fi
      done
  done

  echo "unzipping nginx-access logs in aggregate-logs directory..."
  for f in $(ls -f aggregate-logs); do
      if [[ $f =~ \.gz ]]; then
      gunzip aggregate-logs/"$f"
      fi
  done

  echo "combining all nginx access logs..."
  for f in $(ls -f aggregate-logs); do
      cat aggregate-logs/"$f" >> aggregate-logs/combined.logs
  done
  echo 'the combined logs file can be found in aggregate-logs/combined.logs'
  else
  echo "AGGREGATE_NGINX set to $AGGREGATE_NGINX. So we're done."
  fi

  if [ $CLEANUP_AGGREGATE_DIR == true ]; then
  echo 'CLEANUP_AGGREGATE_DIR set to $CLEANUP_AGGREGATE_DIR. Cleaning up the aggregate-logs directory'
  find ./aggregate-logs/ -name 'nginx-access*' -print -exec rm {} \;
  fi
  ```

  </Tab>

  </TabList>

### Parameterize the Script

You can run the script with parameters for reusability.

1. Edit the 'collect-logs-rsync.sh' (you can choose to disable the AGGREGATE_NGINX):
  
  ```bash
  # Site UUID is REQUIRED: Site UUID from Dashboard URL, e.g. 12345678-1234-1234-abcd-0123456789ab
  SITE_UUID=$2
  # Environment is REQUIRED: dev/test/live/or a Multidev
  ENV=$1

  ########### Additional settings you don't have to change unless you want to ###########
  # OPTIONAL: Set AGGREGATE_NGINX to true if you want to aggregate nginx logs.
  #  WARNING: If set to true, this will potentially create a large file
  AGGREGATE_NGINX=true
  ```
  
1. Modify the script access level:
  
  ```bash{promptUser:user}
  chmod 775 collect-logs-rsync.sh
  ```
  
1. Run the script with parameters. For example:
  
  ```bash{promptUser:user}
  # sample command for live
  ./collect-logs-rsync.sh live 12345678-1234-1234-abcd-0123456789ab
  
  # sample command for dev
  ./collect-logs-rsync.sh dev 12345678-1234-1234-abcd-0123456789ab
  ```

### Collect Logs

You can collect your logs after you [create your script](/guides/logs-pantheon/automate-log-downloads#create-a-script).

1. Navigate to the `site-logs` directory and then execute the script below to download the logs.

  ```bash{promptUser:user}
  bash collect-logs.sh
  ```

1. Open the `site-logs` directory to access the logs.

    - More than one directory is generated for sites that use [multiple application containers](/application-containers#multiple-application-containers).

## More Resources

- [Fastly on Pantheon](/guides/fastly-pantheon)
- [Develop on Pantheon Directly with SFTP Mode](/guides/sftp)
- [Using Git with SFTP & WordPress](/guides/wordpress-git/)
- [Terminus Manual](/terminus)
