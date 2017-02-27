---
title: Generating and Adding SSH Keys
description: Understand how to generate SSH keys to configure Git, SFTP, or Drupal Drush.
tags: [getstarted, sftp, git, local]
categories: [getstarted]
---
To take full advantage of Pantheon, you should load your public SSH key into your account. SSH keys are a best practice for authentication, allowing you more security than a simple password. You will only need to do this once, no matter how many sites you work on.

Pantheon does not support the SSH protocol. These directions allow you to have passwordless access if you configure Git, SFTP, or Drush to use SSH keys.

<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3>
<p>
Generating SSH keys may add your username or the computer's hostname as a comment at the end of the file. If you have any trouble using your SSH key take a look at the <a href="#troubleshooting">Troubleshooting</a> tips at the end of the document.
</p>
</div>

## Generate an SSH Key

Instructions for generating SSH keys are different for every platform. Select your platform:

 - [Mac OS and Linux](/docs/ssh-keys#mac-os-and-linux)  
 - [Windows / Git GUI and OpenSSH](/docs/ssh-keys#windows-%2F-openssh)

### Mac OS and Linux

1. Open your favorite terminal and enter the command to generate a key:

 ```nohighlight
 ssh-keygen
 ```
2. Unless you're an advanced user, just press **enter** for every question. If the command says the key already exists, you can either overwrite it or continue onto the next step with your existing key.
3. Copy the content from `~/.ssh/id_rsa.pub` to your clipboard.

 Linux users must output the SSH key to a file:
 ```nohighlight
 cat ~/.ssh/id_rsa.pub > ~/Desktop/key_for_pantheon.txt
 ```

 Then open the `key_for_pantheon.txt` file on your desktop, select all and copy.

 Mac users can execute the following to copy the SSH key in a single step:

 ```nohighlight
 pbcopy < ~/.ssh/id_rsa.pub
 ```

### Windows / OpenSSH

Before you can generate an SSH key, you'll need to [download](http://git-scm.com/downloads) and install Git. Follow these instructions once that is complete.

1. Open the Git Gui.
2. From the Help menu, click **Show SSH Key**. 
3. Click **Generate Key**.
4. Enter a passphrase (optional, but recommended). It doesn't have to be the same as your Pantheon password, and it will help protect your key.
5. Ensure the whole key is selected and click **Copy to Clipboard**.  

## Add Your SSH Key to Pantheon

1. Log in to Pantheon and go to the **Account** page.
2. Click **SSH Keys**.
3. Paste the copied public key into the box, and click **Add Key**.  
![Adding SSH Keys](/source/docs/assets/images/dashboard/add-ssh-key-dashboard.png)
  Your computer is now set up to securely connect to the Pantheon Git server. You can view a list of available keys on your Pantheon Account page.
4. Open the Git bash client, and put in the command to clone your Pantheon site. This is found in the Dev environment of your site above the Git code log.
5. If prompted, enter the password.

## Delete a Key
To delete a key, go to the **Account** page and click **SSH Keys**. Simply click the **Remove** button next to the key you want to delete.
![Delete SSH Key](/source/docs/assets/images/dashboard/remove-ssh-key.png)

If you have no keys remaining but still have active sites, you will still have access to them and can make edits via SFTP and Git using your account password to authenticate.

## Troubleshooting

#### Invalid SSH Keys
Spaces or non-standard alphanumeric characters in the SSH key's comments (such as your user or system hostname) may cause the SSH key to not be accepted on Pantheon. To fix this, simply edit the user or hostname and remove spaces and any non-standard characters. This will not affect the key itself as the user and hostname are simply appended as a comment for reference.

#### Control Path Error

You may receive the following error:
```nohighlight
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

If this doesn't fix the issue try creating an entry in your SSH configuration for your site specifically by its hostname.  Also, don't use the `ControlMaster` option but do use the `ControlPath` line as shown below, replacing `SITE_UUID` with your [site's UUID](/docs/sites/#site-uuid):

```bash
Host *.SITE_UUID.drush.in
ControlPath ~/.ssh/control-%r
```
#### Server Refused to Allocate pty

This error occurs when a user is attempting to make a direct connection to Pantheon via SSH. Pantheon does not support <a href="/docs/faq/#does-pantheon-have-ftp-or-shell-access?" data-proofer-ignore> direct SSH connections</a>.

#### Authentication Propmts

Password requests will occur after adding an SSH key to your Pantheon account if the corresponding key is not found within your local ssh-agent. Resolve by adding your existing SSH key to the ssh-agent using the following command (replace `YOUR_PRIVATE_KEY` with the path to your existing SSH key):

```bash
$ ssh-add -K ~/.ssh/YOUR_PRIVATE_KEY
```

