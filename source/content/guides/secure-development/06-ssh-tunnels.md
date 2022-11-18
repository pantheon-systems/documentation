---
title: Secure Development on Pantheon
subtitle: Secure Connections to Pantheon Services via TLS or SSH Tunnels
description: Detailed information on securely connecting to your database and caching service using SSH tunnels.
categories: [develop]
tags: [database, local, ssh, redis, webops]
contributors: [bwood]
layout: guide
showtoc: true
permalink: docs/guides/secure-development/ssh-tunnels
anchorid: ssh-tunnels
reviewed: "2022-07-21"
---

This section provides information on how to use SSH tunnels to keep your sites secure.

Pantheon provides the ability to securely connect to your database and caching service over an encrypted connection using [secure shell tunneling](https://en.wikipedia.org/wiki/Tunneling_protocol#Secure_shell_tunneling) for additional security. This increases your remote connection security, especially in a public or untrusted environment.

This technique configures an SSH client to forward a local port to a port on Pantheon. You can connect to the local port to access the remote service using the encrypted connection after the SSH tunnel is established.

There are currently two services on Pantheon that support SSH tunneling:

- [MySQL database](/guides/mariadb-mysql/mysql-access) (dbserver)

- [Redis cache](/guides/object-cache)

You should consider [Secure Runtime Access](/guides/secure-development/secure-runtime-access) if you want to allow only SSH tunnels to access the dbserver.

## Prerequisites

- Local installation of a MySQL client

- [Redis command-line client](/guides/object-cache/redis-command-line)

- Add an [SSH key](/ssh-keys) to your Pantheon User Dashboard

## Create Secure Connection to MySQL using TLS

Later versions of the MySQL client support the `--ssl` option. Using this command line option will encrypt your connection to the database server with TLS.

First, determine if your MySQL client supports TLS.

1. Run `man mysql`

1. Search for the `--ssl` option. If you add the `--ssl` option to your command there is no need to setup an SSH tunnel as described below.

Set up your SSH tunnel in Terminus:

1. Use the following Bash script to establish secure MySQL connections via TLS using the `—ssl` option and [Terminus](/terminus):

  ```bash:title=sql-tls.sh
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
      terminus env:wake $SITE.$ENV
    fi
  
    $(terminus connection:info $SITE.$ENV --fields=mysql_command --format=string) -A --ssl
  }
  alias tsqlc=terminus-sql-cli
  ```

## Manually Create an SSH Tunnel to Connect to a MySQL Database

To manually create an SSH tunnel within your Pantheon Site Dashboard:

1. Navigate to your Site Dashboard and access the environment you want to connect with.

1. Click **Connection Info**. This will give you the required environment specific values for the command example below.

  ![Connection info](../../../images/dashboard/connection-info.png)

1. Use the required values from the **Connection Info** tab, the desired environment (Dev, Test, or Live), and the  [site uuid](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuis) found in the Dashboard URL within the following command:

    ```bash{promptUser: user}
    ssh -f -N -L LOCAL_PORT:localhost:SERVER_PORT -p 2222 ENV.SITE_UUID@dbserver.ENV.SITE_UUID.drush.in
    ```

     - Replace `<LOCAL_PORT>` with an available port on your device.

     - Replace `<SERVER_PORT>` with the designated port found on your Site Dashboard.

     - Often, the same input can be used for the `<LOCAL_PORT>` and `<SERVER_PORT>`.

    The command must include the port you are entering the tunnel from. You can replace `<LOCAL_PORT>` with the database port specified in the **Connection Info** tab. Do the same for `<PASSWORD>`

1. Run the following command:

  ```bash{promptUser: user}
  mysql -u pantheon -h 127.0.0.1 -P LOCAL_PORT pantheon -pPASSWORD
  ```

  Assuming the specified port is the `<LOCAL_PORT>`, you can determine if the port is listening by entering the following command:

  ```bash{promptUser: user}
  lsof -i :LOCAL_PORT
  ```

1. Run the following to test the connection to the database:

  ```bash{promptUser: user}
  echo 'SELECT 1' | mysql -u pantheon -pPASSWORD -h 127.0.0.1 -P LOCAL_PORT pantheon`
  ```

   - It should return the output `1`.

   - A common output error if you use the wrong port resembles the following:

  ```bash{promptUser: user}
  ssh: Could not resolve hostname dbserver.<ENV>.<SITE_ID>: nodename nor servname provided, or not known
  zsh: command not found: 5Drush.in
  ```

<Alert title="Note" type="info">

Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. Check the Dashboard periodically or when you can’t connect.

</Alert>

You can destroy the tunnel by using the port value found within the **Connection Info** tab and your computer's `<USERNAME>` to run the following command:

```bash{promptUser: user}
ps -fU USERNAME | grep "ssh -f" | grep "PORT:" | awk '{print $2}' | xargs kill
```

## Use Sequel Ace to SSH Tunnel to a MySQL Database

[Sequel Ace (formerly Sequel Pro)](https://sequel-ace.com/) is an open-source MySQL database client that supports SSH tunneling on Mac. You can configure other MySQL clients in a similar manner.

## Manually Create an SSH Tunnel to a Redis Cache Server

1. Navigate to your Site Dashboard and select the environment you want to connect with.

1. Get the one-line connection string. It will be in the following format:

  ```bash{promptUser: user}
  redis-cli -h HOSTNAME -p PORT -a PASSWORD
  ```

1. Use the port value from the above one-line connection string, the desired environment (Dev, Test, or Live), and the [site UUID](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuis) found in the Dashboard URL within the following command:

  ```bash{promptUser: user}
  ssh -f -N -L PORT:localhost:PORT -p 2222 ENV.SITE_UUID@cacheserver.ENV.SITE_UUID.drush.in
  ```

1. Use the password and port found in the one-line connection string to run the command below. `PORT` is the database port specified in the **Connection Info** tab.

  ```bash{promptUser: user}
  redis-cli -h 127.0.0.1 -p PORT -a PASSWORD
  ```

You can destroy the tunnel by using the port value found within the **Connection Info** tab and your computer's username to run the following command:

```bash{promptUser: user}
ps -fU USERNAME | grep "ssh -f" | grep "PORT:" | awk '{print $2}' | xargs kill
```

## Troubleshooting

To find solutions for MySQL connection errors, see [Accessing MySQL Databases](/guides/mariadb-mysql/mysql-access/#troubleshooting-mysql-connections).

If port 2222 is blocked on your network you will see an error similar to the following:

```none
SSH: connect to host codeserver.dev.<site UUID>.drush.in port 2222: No route to host
Fatal: Could not read from remote repository.
```

Review [Port 2222 Blocked Workaround](/port-2222) for more information.

## More Resources

- [MySQL database](/guides/mariadb-mysql/mysql-access) (dbserver)

- [Redis cache](/guides/object-cache)

- [Secure Runtime Access](/guides/secure-development/secure-runtime-access)
