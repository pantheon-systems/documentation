---
title: Using Atom on Pantheon
description: Detailed information about the Pantheon SFTP connection using Atom IDE.
tags: [sftpfiles]
categories: []
---
[Atom](https://atom.io/) is an open source cross platform text editor which has a vast plugin/package system including some FTP clients that lets you edit files directly from the editor, one of the most popular is the [Remote-FTP](https://atom.io/packages/remote-ftp).

## Getting Started

Make sure you have the Pantheon SFTP connection information for your site ready. If you need to locate the connection information, see the documentation on [how to find the SFTP credentials](/docs/sftp#sftp-connection-information) for your site.

## Download Atom and Remote-FTP

If you do not have Atom installed, [download and install the latest version](https://atom.io/). You need to install the latest [remote-ftp](https://atom.io/packages/remote-ftp) package to be able to connect via SFTP.

## Start the Atom Client

Start the Atom application and enter the connection information. Be sure to take note of the port as Pantheon uses a **non-standard port** for SFTP.

## Ways to Connect Using Atom

1) Using SFTP & Pantheon Login credentials
Sample connection config:
```
{
    "protocol": "sftp",
    "host": "appserver.dev.xxxxxxxxx.drush.in", // string - Hostname or IP address of the server. 
    "port": 2222, // integer - Port number of the server. Default for Pantheon: 2222
    "user": "dev.xxxxxxxxxx", // string - Username for authentication. Default: 
    "pass": "yourpantheonpassword", // string - Password for password-based user authentication. Default: (none)
    "promptForPass": false, // boolean - Set to true for enable password/passphrase dialog. This will prevent from using cleartext password/passphrase in this config. Default: false
    "remote": "/", // try to use absolute paths starting with /
    "agent": "", // string - Path to ssh-agent's UNIX socket for ssh-agent-based user authentication. Linux/Mac users can set "env" as a value to use env SSH_AUTH_SOCK variable. Windows users: set to 'pageant' for authenticating with Pageant or (actual) path to a cygwin "UNIX socket." Default: (none)
    "privatekey": "", // string - Absolute path to the private key file (in OpenSSH format). Default: (none)
    "passphrase": "", // string - For an encrypted private key, this is the passphrase used to decrypt it. Default: (none)
    "hosthash": "", // string - 'md5' or 'sha1'. The host's key is hashed using this method and passed to the hostVerifier function. Default: (none)
    "ignorehost": true,
    "connTimeout": 10000, // integer - How long (in milliseconds) to wait for the SSH handshake to complete. Default: 10000
    "keepalive": 10000, // integer - How often (in milliseconds) to send SSH-level keepalive packets to the server (in a similar way as OpenSSH's ServerAliveInterval config option). Set to 0 to disable. Default: 10000
    "watchTimeout":500, // integer - The duration ( in milliseconds ) from when the file was last changed for the upload to begin.
}
```

2) Using SFTP & SSH Keys

2.1) Make sure you have your [ssh keys setuped](https://pantheon.io/docs/ssh-keys/).

2.2) Setup your connection string, see sample config:
```
{
    "protocol": "sftp",
    "host": "appserver.dev.xxxxxxxxx.drush.in", // string - Hostname or IP address of the server. 
    "port": 2222, // integer - Port number of the server. Default for Pantheon: 2222
    "user": "dev.xxxxxxxxxx", // string - Username for authentication. Default: 
    "pass": "", // string - Password for password-based user authentication. Default: (none)
    "promptForPass": false, // boolean - Set to true for enable password/passphrase dialog. This will prevent from using cleartext password/passphrase in this config. Default: false
    "remote": "/", // try to use absolute paths starting with /
    "agent": "", // string - Path to ssh-agent's UNIX socket for ssh-agent-based user authentication. Linux/Mac users can set "env" as a value to use env SSH_AUTH_SOCK variable. Windows users: set to 'pageant' for authenticating with Pageant or (actual) path to a cygwin "UNIX socket." Default: (none)
    "privatekey": "your/path/to/your/private/key", // string - normally in the ssh folder
    "passphrase": "", // string - For an encrypted private key, this is the passphrase used to decrypt it. Default: (none)
    "hosthash": "", // string - 'md5' or 'sha1'. The host's key is hashed using this method and passed to the hostVerifier function. Default: (none)
    "ignorehost": true,
    "connTimeout": 10000, // integer - How long (in milliseconds) to wait for the SSH handshake to complete. Default: 10000
    "keepalive": 10000, // integer - How often (in milliseconds) to send SSH-level keepalive packets to the server (in a similar way as OpenSSH's ServerAliveInterval config option). Set to 0 to disable. Default: 10000
    "watchTimeout":500, // integer - The duration ( in milliseconds ) from when the file was last changed for the upload to begin.
}
```

## Manage Files

Once you are logged in, you are directed to the root directory of your appserver. On the left side you will see your local computer, and on the right you will see your site's appserver. To get to the Drupal or WordPress root, navigate to the `code` directory and manage your files.
