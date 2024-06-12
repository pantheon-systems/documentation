---
title: "Dashboard Credentials deprecated as an authentication method for site connections starting April 30, 2024"
published_date: "2024-04-17"
categories: [action-required, deprecated]
---

Pantheon is updating our platform access control, requiring the use of SSH keys starting <strong>April 30, 2024</strong>. Connecting to and interacting with remote Pantheon environments via your Pantheon dashboard credentials will be disabled.

You'll still login to the Pantheon dashboard in the browser with your username/password or Single Sign-On, but connecting to and interacting with a given Pantheon site environment will require an [SSH key](/ssh-keys).

This applies when connecting to Pantheon containers from the terminal (Git, SFTP, rsync, Drush, WP-CLI) as well as local applications like SFTP clients (Filezilla and Cyberduck).

We are making this change to maintain a secure and reliable platform. Learn how to configure your SFTP client with SSH keys in our [documentation](/guides/sftp/sftp-connection-info#authenticating).
