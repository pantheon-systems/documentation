---
title: Generate and Add SSH Keys
description: Understand how to generate SSH keys to configure Git, SFTP, or Drupal Drush.
tags: [security, dashboard]
categories: []
---
To take full advantage of Pantheon, you should load your public SSH key into your account. SSH keys are a best practice for authentication, allowing you more security than a simple password. You will only need to do this once, no matter how many sites you work on.

<Accordion title="Watch: Generate a SSH Key and Add it to Your Dashboard" id="ssh-video" icon="facetime-video">

`youtube: https://youtu.be/U8sfuvrjroY`

</Accordion>


Pantheon does not support the SSH protocol. These directions allow you to have passwordless access if you configure Git, SFTP, or Drush to use SSH keys.

## Generate SSH Key

1. Open your terminal and enter the following command to generate a key:

   ```bash
   ssh-keygen
   ```
  This command works on Linux, MacOS, and Windows 10.

1. Unless you have reason to change it, leave the default location of `~/.ssh/id_rsa`. If the command says the key already exists, you can either overwrite it or continue onto the next step with your existing key.

1. A passphrase is recommended to provide greater security, but can conflict with tools that cannot handle them.

1. Once the files are created, copy the contents of `~/.ssh/id_rsa.pub` to your clipboard.

   Linux and Mac users can `cat`the file to the terminal and copy the output:

   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

   Windows users can achieve the same result with `type`:

   ```bash
   type .ssh\id_rsa.pub
   ```

## Add Your SSH Key to Pantheon

1. Log in to Pantheon and go to the **Account** page.
2. Click **SSH Keys**.
3. Paste the copied public key into the box, and click **Add Key**.  
![Adding SSH Keys](../images/dashboard/add-ssh-key-dashboard.png)
  Your computer is now set up to securely connect to the Pantheon Git server. You can view a list of available keys on your Pantheon Account page.
4. Open the Git bash client, and put in the command to clone your Pantheon site. This is found in the Dev environment of your site above the Git code log.
5. If prompted, enter the password.

<Alert title="Note" type="info">

Generating SSH keys may add your username or the computer's hostname as a comment at the end of the file, making the key invalid on Pantheon. If you have any trouble using your SSH key take a look at the [Troubleshooting](#troubleshooting) at the end of the document.

</Alert>

## Delete a Key from Pantheon
To delete a key, go to the **Account** page and click **SSH Keys**. Simply click the **Remove** button next to the key you want to delete.
![Delete SSH Key](../images/dashboard/remove-ssh-key.png)

If you have no keys remaining but still have active sites, you will still have access to them and can make edits via SFTP and Git using your account password to authenticate.

## Troubleshooting

#### Invalid SSH Keys
Spaces or non-standard alphanumeric characters in the SSH key's comments (such as your user or system hostname) may cause the SSH key to not be accepted on Pantheon. To fix this, simply edit the user or hostname and remove spaces and any non-standard characters. This will not affect the key itself as the user and hostname are simply appended as a comment for reference.

#### Control Path Error

You may receive the following error:
```
ControlPath too long fatal: Could not read from remote repository.
```
Check your SSH config files (by default, `$HOME/.ssh/config and /etc/ssh/ssh_config`) for a declaration like this:
```bash
Host *
ControlMaster auto
ControlPath ~/.ssh/control-%l.%r@%h:%p
```

There are two ways to fix this. First, try adjusting the `Controlpath` line as shown below:
```bash
Host *
ControlMaster auto
ControlPath ~/.ssh/control-%r
```

If this doesn't fix the issue try creating an entry in your SSH configuration for your site specifically by its hostname.  Also, don't use the `ControlMaster` option but do use the `ControlPath` line as shown below, replacing `SITE_UUID` with your [site's UUID](/sites/#site-uuid):

```bash
Host *.SITE_UUID.drush.in
ControlPath ~/.ssh/control-%r
```
#### Server Refused to Allocate pty

This error occurs when a user is attempting to make a direct connection to Pantheon via SSH. Pantheon does not support [direct SSH connections](/faq/#does-pantheon-have-ftp-or-shell-access?).

#### Authentication Prompts

Password requests may still occur after adding an SSH key to your Pantheon account if the corresponding key is not found by your local ssh-agent. To resolve, add your SSH key to the ssh-agent using the following command, replacing `id_rsa` with the name of your private key, if different:

```bash
ssh-add ~/.ssh/id_rsa
```
