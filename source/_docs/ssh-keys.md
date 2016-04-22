---
title: Generating and Adding SSH Keys
description: Understand how to generate SSH keys to configure Git, SFTP, or Drupal Drush.
categories: [managing]
tags: [platform, getting-started, local]
keywords: ssh keys, ssh, generate keys
---
To take full advantage of Pantheon, you should load your public SSH key into your account. SSH keys are a best-practice for authentication, allowing you more security than a simple password. You will only need to do this once, no matter how many sites you work on.

Pantheon does not support the SSH protocol. These directions allow you to have passwordless access if you configure Git, SFTP, or Drush to use SSH keys.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
SSH keys include the user and hostname of the account/computer that it was generated on as a comment (in the form of "==user@usercomputer") at the end of the file. If you experience errors, see the troubleshooting section at the end of the document.</div>

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
![Adding SSH Keys](/source/docs/assets/images/add-ssh-key-dashboard.png)
  Your computer is now set up to securely connect to the Pantheon Git server. You can view a list of available keys on your Pantheon Account page.
  ![Show SSH Keys](/source/docs/assets/images/remove-ssh-key.png)
4. Open the Git bash client, and put in the command to clone your Pantheon site. This is found in the Dev environment of your site above the Git code log.
5. If prompted, enter the password.

## Troubleshooting

#### Invalid SSH Keys
Spaces and non-standard alphanumeric characters in the user or hostname can cause an SSH key to appear invalid to Pantheon. To fix this, edit the user or hostname and remove spaces and/or odd characters. This will not affect the key itself, as the user/hostname are simply appended as a comment for reference.

#### Control Path Error

You may receive the following error:
```nohighlight
ControlPath too long fatal: Could not read from remote repository.
```
Check your SSH config files (by default, `$HOME/.ssh/config and /etc/ssh/ssh\_config`) for a declaration like this:
```bash
Host *
ControlMaster auto
ControlPath ~/.ssh/control-%l.%r@%h:%p
```

There are two steps to take to fix this error. First, enter the following command:
```bash
Host *
ControlMaster auto
ControlPath ~/.ssh/control-%r
```
If this does not fix the problem, go a step further and add individual hosts entries, remove ControlMaster auto, and simplify the switches:
```bash
Host myapp-myname.blahblah.com
ControlPath ~/.ssh/control-%r
```
#### Server Refused to Allocate pty

This error occurs when a user is attempting to make a direct connection to Pantheon via SSH. Pantheon does not support <a href="/docs/faq/#does-pantheon-have-ftp-or-shell-access?" data-proofer-ignore> direct SSH connections</a>.
