---
title: SFTP on Pantheon
subtitle: SFTP Connection Info and Authentication
description: Learn about SFTP Connection Info and how to authenticate your SFTP.
categories: [develop]
tags: [files, sftp, code]
reviewed: "2020-02-18"
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/sftp/sftp-connection-info
anchorid: sftp-connection-info
---

## SFTP Connection Information

To get your SFTP login credentials, click **Connect with SFTP**. You will see your connection credentials and a button to connect directly with your preferred client.

 ![SFTP Connection Data](../../../images/dashboard/sftp-connection-info.png)

The connection information is a bit different than what you might be used to. It's based on your unique "Site ID". This is the long string at the end of your Dashboard URL.

Your connection data is as follows:

**host:** `appserver.dev.site-id.drush.in`

**user:** `dev.site-id`

**port:** `2222`

<Alert title="Note" type="info">

When you set up your SFTP client, remember to specify the SFTP protocol and connect to your environment using port 2222.

</Alert>

You can connect to an environment over SFTP using the terminal. The command is easily accessible from the Connection Information widget.

There is also a one-click option so you can connect with a GUI client. The main directory listing includes Pantheon, logs, environment data and configuration. Your website is in the `code` directory. For instance, in Cyberduck on MacOS :

![Cyberduck Example](../../../images/cyberduck-example.png)

For instructions for other client, jump down to [SFTP clients](#sftp-clients).

<Partial file="auth.md" />