---
title: SSH Tunnels for Secure Connections to Pantheon Services
description: Securely connect to your database and caching service over an encrypted connection using secure shell tunneling.
category:
  - advanced
---

## Overview
For additional security, Pantheon provides the ability to securely connect to your database and caching service over an encrypted connection using  [secure shell tunneling](http://en.wikipedia.org/wiki/Tunneling_protocol#Secure_shell_tunneling). This will increase the security of your remote connection, especially in a public or untrusted environment.  

This technique configures an SSH client to forward a local port to a port on Pantheon. Once the tunnel is established, you can connect to the local port to access the remote service using the encrypted connection.  

Currently, there are two services on Pantheon that support SSH tunneling:

- [MySQL database](/docs/articles/local/accessing-mysql-databases/) (dbserver)
- [Redis cache](/docs/articles/sites/redis-as-a-caching-backend/) (cacheserver)

## Requirements to Create an SSH Tunnel

1. An SSH client, such as OpenSSH (ssh command already installed on Mac and Linux) or PuTTY (Windows)
2. Target site UUID (found in the dashboard URL)
3. Target environment name (Dev, Test, or Live)
4. The service you want to connect to (dbserver or cacheserver)
5. Target port for the service ("Connection Info" tab in the site environment dashboard)

## Manually Create an SSH Tunnel to Connect to a MySQL Database

These instructions require the use of the SSH command-line client.

    # Site UUID from Dashboard URL
    SITE=SITE_UUID
    # dev, test or live
    ENV=ENVIRONMENT_NAME
    # Port from Connection Info in Dashboard
    PORT=CONNECTION_INFO_MYSQL_PORT


    # Create tunnel.
    ssh -f -N -L $PORT:localhost:$PORT -p 2222 $ENV.$SITE@dbserver.$ENV.$SITE.drush.in


    # Connect to Pantheon database with local MySQL client.
    mysql -u pantheon -h 127.0.0.1 -p -P $PORT pantheon


    # Destroy tunnel.
    ps -fU $USER | grep "ssh -f" | grep "$PORT:" | awk '{print $2}' | xargs kill

## Use Sequel Pro to SSH tunnel to a MySQL Database

[Sequel Pro](http://www.sequelpro.com/) is an open-source MySQL database client that supports SSH tunneling on Mac. Other MySQL clients can be configured in a similar manner.  

## Manually Create an SSH tunnel to a Redis Cache Server

These instructions require using the redis command-line client; see the [main redis article](/docs/articles/sites/redis-as-a-caching-backend/#redis-cli) for details.  

From the site environment, get the one-line connection string. It will be in the following format:

    redis-cli -h HOSTNAME -p PORT -a PASSWORD

From the command-line:

    # Site UUID from Dashboard URL
    SITE=SITE_UUID
    # dev, test or live
    ENV=ENVIRONMENT_NAME
    # Port from Connection Info in Dashboard
    PORT=CONNECTION_INFO_REDIS_PORT
    # Password from Redis Connection Info
    PASS=CONNECTION_INFO_REDIS_PASSWORD


    # Create tunnel.
    ssh -f -N -L $PORT:localhost:$PORT -p 2222 $ENV.$SITE@cacheserver.$ENV.$SITE.drush.in


    # Connect to Pantheon redis with local client.
    redis-cli -h 127.0.0.1 -p $PORT -a $PASS


    # Destroy tunnel.
    ps -fU $USER | grep "ssh -f" | grep "$PORT:" | awk '{print $2}' | xargs kill
