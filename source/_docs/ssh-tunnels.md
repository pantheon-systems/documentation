---
title: Secure Connections to Pantheon Services via TLS or SSH Tunnels
description: Detailed information on securely connecting to your database and caching service using SSH tunnels.
categories: [developing]
tags: [local]
keywords: ssh, ssh tunnel, security, database, encryption, mysql database, redis cache server
---
For additional security, Pantheon provides the ability to securely connect to your database and caching service over an encrypted connection using [secure shell tunneling](http://en.wikipedia.org/wiki/Tunneling_protocol#Secure_shell_tunneling). This will increase the security of your remote connection, especially in a public or untrusted environment.  

This technique configures an SSH client to forward a local port to a port on Pantheon. Once the tunnel is established, you can connect to the local port to access the remote service using the encrypted connection.  

Currently, there are two services on Pantheon that support SSH tunneling:

- [MySQL database](/docs/mysql-access/) (dbserver)
- [Redis cache](/docs/redis/) (cacheserver)

## Prerequisites

- Local installation of a MySQL client
- [Redis command-line client](/docs/redis/#use-the-redis-command-line-client)
- Add an [SSH key](/docs/ssh-keys) to your Pantheon User Dashboard

## Simplest option for securing MySQL client connections: use --ssl

Later versions of the mysql client support the `--ssl` option.  Simply using this commandline option will encrypt your connection to the database server with TLS.  To determin if your mysql client supports TLS type `man mysql` and search for the `--ssl` option. If you add the `--ssl` option to your command there is no need to setup an SSH tunnel as described below. 

### Bash function for opening mysql connections using --ssl
```
terminus-sql-cli() {
  SITE=$1
  if [ x$SITE = x ]; then
    echo "USAGE:

terminus-sql-cli site-shortname environment

Open a mysql connection to a site.

  site-shortname: REQUIRED: If your site is dev-example.pantheon.io
                  this would be \"example\" .

  environment:    Defaults to \"dev\".
"
    return
  fi

  ENV=$2
  if [ -z "$ENV" ]; then
    ENV="dev"
  fi 

  if [ "$ENV" != "live" ]; then
    terminus site wake --site=$SITE --env=$ENV
  fi

  $(terminus site connection-info --site=$SITE --env=$ENV --field=mysql_command) -A --ssl
}
alias tsqlc=terminus-sql-cli
```
## Manually Create an SSH Tunnel to Connect to a MySQL Database

From the Site Dashboard, access the environment you want to connect with, and click **Connection Info**. This will give you the required environment specific values for the command example below.

![Connection info](/source/docs/assets/images/connection-info.png)

Use the required values from the **Connection Info** tab, the desired environment (Dev, Test, or Live), and the  [site uuid](//docs/sites/#site-uuid) found in the Dashboard URL within the following command:
```
ssh -f -N -L PORT:localhost:PORT -p 2222 ENV.SITE_UUID@dbserver.ENV.SITE_UUID.drush.in
```
Replace `PORT` with the database port specified in the **Connection Info** tab. Do the same for `PASSWORD`, then execute the following:
```bash
mysql -u pantheon -h 127.0.0.1 -p -P PORT pantheon -pPASSWORD
```
<div class="alert alert-info" role="alert">
<h4>Note</h4>
Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check the Dashboard periodically or when you can’t connect.</div>
You can destroy the tunnel by using the port value found within the **Connection Info** tab and your computer's USERNAME in the following command:
```bash
ps -fU USERNAME | grep "ssh -f" | grep "PORT:" | awk '{print $2}' | xargs kill
```

## Use Sequel Pro to SSH Tunnel to a MySQL Database

[Sequel Pro](http://www.sequelpro.com/) is an open-source MySQL database client that supports SSH tunneling on Mac. You can configure other MySQL clients in a similar manner.  

## Manually Create an SSH Tunnel to a Redis Cache Server

From the site environment, get the one-line connection string. It will be in the following format:
```bash
redis-cli -h HOSTNAME -p PORT -a PASSWORD
```
Use the port value from the above one-line connection string, the desired environment (Dev, Test, or Live), and the [site uuid](//docs/sites/#site-uuid) found in the Dashboard URL within the following command:
```bash
ssh -f -N -L PORT:localhost:PORT -p 2222 ENV.SITE_UUID@cacheserver.ENV.SITE_UUID.drush.in
```
`PORT` is the database port specified in the **Connection Info** tab. Using the password and port found in the one-line connection string, run the following command:
```bash
redis-cli -h 127.0.0.1 -p PORT -a PASSWORD
```

You can destroy the tunnel by using the port value found within the **Connection Info** tab and your computer's USERNAME in the following command:
```bash
ps -fU USERNAME | grep "ssh -f" | grep "PORT:" | awk '{print $2}' | xargs kill
```

## Troubleshooting
To find solutions for MySQL connection errors, see [Accessing MySQL Databases](/docs/mysql-access/#troubleshooting-mysql-connections).

If port 2222 is blocked on your network you will see an error similar to the following:
```
SSH: connect to host codeserver.dev.<site UUID>.drush.in port 2222: No route to host
Fatal: Could not read from remote repository.
```
See [Port 2222 Blocked Workaround](/docs/port-2222/) for more information.
