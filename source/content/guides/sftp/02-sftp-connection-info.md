---
title: SFTP on Pantheon
subtitle: SFTP Access and Authentication
description: Access your SFTP Connection Info and authenticate your SFTP client.
tags: [files, sftp, code]
reviewed: "2020-02-18"
innav: [false]
categories: [sftp]
cms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [--]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/sftp/sftp-connection-info
---

This section provides information on how to access the SFTP Connection Info in your dashboard, and how to authenticate your SFTP client.

## SFTP Connection Info

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).

1. Click **Connect with SFTP**. Your connection credentials will be displayed along with a button to connect directly with your preferred client.

 ![SFTP Connection Data](../../../images/dashboard/sftp-mode-connection-info.png)

The connection information may differ from what you've used in the past. The information is based on your unique Site ID (the long string at the end of your Dashboard URL).

Example Connection Info:

**host:** `appserver.dev.site-id.drush.in`

**user:** `dev.site-id`

**port:** `2222`

<Alert title="Note" type="info">

Remember to specify the SFTP protocol and connect to your environment using port `2222` when you set up your SFTP client.

</Alert>

## Connect to an Environment Over SFTP

You can connect to an environment over SFTP with your terminal. The command to do this can be copied from the **Connect with SFTP** widget.

1. Ensure that you have configured your preferred editor, including a folder for your site, and an SFTP extension if necessary.

1. Run `SFTP: config` or a similar command depending on your editor.

1. Open the config file and update it with your Pantheon SFTP credentials.

    Example credentials:

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

There is also a one-click option to connect with a GUI client. The main directory listing includes Pantheon, logs, environment data, and configuration. Your website is in the `code` directory. For instance, in Cyberduck on MacOS :

![Cyberduck Example](../../../images/cyberduck-example.png)

## SFTP File Uploads to Test and Live Environments

You can use SFTP to upload files to your site's files directory in the Test and Live environments. Note that SFTP mode does **NOT** allow you to upload files to the Code directory in the **Test** or **Live** environment.

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).

1. Select the **Test** or **Live** environment and click **Connection Info**.

1. Click the **Open in SFTP client** link under **Client**. You may need to copy your Host and Port information to connect to your client if you have not already configured the connection.

Refer to [Large File Transfers with rsync and SFTP](/guides/sftp/rsync-and-sftp) if you need to transfer large files to your environments.

<Partial file="auth.md" />

## More Resources

- [Creating and Revoking Machine Tokens](/machine-tokens)
- [Single Sign-On for Pantheon Organizations](/guides/sso/sso-organizations)
