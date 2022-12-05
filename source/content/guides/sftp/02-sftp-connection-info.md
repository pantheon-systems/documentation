---
title: SFTP on Pantheon
subtitle: SFTP Connection Info and Authentication
description: Learn how to access your SFTP Connection Info, and how to authenticate your SFTP.
tags: [files, sftp, code]
reviewed: "2020-02-18"
categories: [sftp]
newcms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [--]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/sftp/sftp-connection-info
anchorid: sftp-connection-info
---

This section provides information on how to access your SFTP Connection Info in your dashboard, and how to authenticate your SFTP.

## SFTP Connection Info

1. Navigate to your Site dashboard.

1. Click **Connect with SFTP**. You will see your connection credentials and a button to connect directly with your preferred client.

 ![SFTP Connection Data](../../../images/dashboard/sftp-connection-info.png)

The connection information may be different from what you're used to. The information is based on your unique "Site ID". This is the long string at the end of your Dashboard URL.

Your connection data is as follows:

**host:** `appserver.dev.site-id.drush.in`

**user:** `dev.site-id`

**port:** `2222`

<Alert title="Note" type="info">

When you set up your SFTP client, remember to specify the SFTP protocol and connect to your environment using port 2222.

</Alert>

## Connect to an Environment Over SFTP

You can connect to an environment over SFTP using the terminal. The command is easily accessible from the Connect with SFTP widget.

1. Ensure that you have configured your preferred editor, including folder for your site, and an SFTP extension if necessary.

1. Run `SFTP: config` or a similar command depending on your editor in your terminal.

1. Open the config file and update it with your Pantheon SFTP credentials.

    ```bash{promptUser: user}
    name: Anita Server Name
    host: appserver.dev.***-*****-***-****
    protocol: sftp
    port: 2222
    username: anita-username 
    remotePath: /code/
    uploadOnSave: true
    ```

1. Verify that the `remotePath` value is set to `/code/` and that `uploadOnSave` is set to `true`. Saved changes will now be pushed automatically to Pantheon.

There is also a one-click option to connect with a GUI client. The main directory listing includes Pantheon, logs, environment data and configuration. Your website is in the `code` directory. For instance, in Cyberduck on MacOS :

![Cyberduck Example](../../../images/cyberduck-example.png)


<Partial file="auth.md" />