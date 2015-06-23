---
title: SSH Tunnels for Secure Connections to Pantheon Services
description: Detailed information on securely connecting to your database and caching service using SSH tunnels.
category:
  - developing
keywords: ssh, ssh tunnel, security, database, encryption, mysql database, redis cache server
---
For additional security, Pantheon provides the ability to securely connect to your database and caching service over an encrypted connection using  [secure shell tunneling](http://en.wikipedia.org/wiki/Tunneling_protocol#Secure_shell_tunneling). This will increase the security of your remote connection, especially in a public or untrusted environment.  

This technique configures an SSH client to forward a local port to a port on Pantheon. Once the tunnel is established, you can connect to the local port to access the remote service using the encrypted connection.  

Currently, there are two services on Pantheon that support SSH tunneling:

- [MySQL database](/docs/articles/local/accessing-mysql-databases/) (dbserver)
- [Redis cache](/docs/articles/sites/redis-as-a-caching-backend/) (cacheserver)

## Prerequisites

- Local installation of a MySQL client.
- [Redis command-line client](/docs/articles/sites/redis-as-a-caching-backend/#using-the-redis-command-line-client)
- Add an [SSH Key](/docs/articles/users/generating-ssh-keys) to your Pantheon user Dashboard.

## Manually Create an SSH Tunnel to Connect to a MySQL Database

From the site Dashboard, access the environment you wish to connect with and click on the **Connection Info** button.


![Connection info](/source/docs/assets/images/desk_images/168060.png)


Take the port found within the Database section and substitute the value for `$PORT` in the following command. Substitute the [site uuid](/docs/articles/sites/#site-uuid) (located within the Dashboard URL) for `$SITE` and the desired environment (dev, test, or live) for `$ENV`:
```
ssh -f -N -L $PORT:localhost:$PORT -p 2222 $ENV.$SITE@dbserver.$ENV.$SITE.drush.in
```
Run the following command using the same port number found above and substitute your database password found in **Connection Info**:
```bash
mysql -u pantheon -h 127.0.0.1 -p -P $PORT pantheon -p$PASSWORD
```
<div class="alert alert-info" role="alert">
<strong>Note</strong>: Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check the Dashboard periodically or when you can’t connect.</div>
You can destroy the tunnel by substituting your computer's username and running the following command:
```bash
ps -fU $USER | grep "ssh -f" | grep "$PORT:" | awk '{print $2}' | xargs kill
```

## Use Sequel Pro to SSH tunnel to a MySQL Database

[Sequel Pro](http://www.sequelpro.com/) is an open-source MySQL database client that supports SSH tunneling on Mac. Other MySQL clients can be configured in a similar manner.  

## Manually Create an SSH tunnel to a Redis Cache Server

From the site environment, get the one-line connection string. It will be in the following format:
```bash
redis-cli -h HOSTNAME -p PORT -a PASSWORD
```
Take the port found within the one-line connection string and substitute the value for `$PORT` in the following command. Substitute the [site uuid](/docs/articles/sites/#site-uuid) (located within the Dashboard URL) for `$SITE` and the desired environment (dev, test, or live) for `$ENV`:
```bash
ssh -f -N -L $PORT:localhost:$PORT -p 2222 $ENV.$SITE@cacheserver.$ENV.$SITE.drush.in
```
Substitute the password and port found in the one-line connection string and run the following command:
```bash
redis-cli -h 127.0.0.1 -p $PORT -a $PASS
```

You can destroy the tunnel by substituting your computer's username and running the following command:
```bash
ps -fU $USER | grep "ssh -f" | grep "$PORT:" | awk '{print $2}' | xargs kill
```
