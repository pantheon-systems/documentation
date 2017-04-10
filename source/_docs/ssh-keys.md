---
title: Generate and Add SSH Keys
description: Understand how to generate SSH keys to configure Git, SFTP, or Drupal Drush.
tags: [security, dashboard]
categories: []
---
To take full advantage of Pantheon, you should load your public SSH key into your account. SSH keys are a best practice for authentication, allowing you more security than a simple password. You will only need to do this once, no matter how many sites you work on.
<div class="panel panel-video" id="accordion">
  <div class="panel-heading panel-video-heading">
    <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#ssh-video"><h3 class="panel-title panel-video-title" style="cursor:pointer;">Show me how </h3></a>
  </div>
  <div id="ssh-video" class="collapse">
    <script src="//fast.wistia.com/embed/medias/mnuxft90ya.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_mnuxft90ya videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
  </div>
</div>


Pantheon does not support the SSH protocol. These directions allow you to have passwordless access if you configure Git, SFTP, or Drush to use SSH keys.

## Generate SSH Key

1. Open your terminal and enter the following command to generate a key:

   ```nohighlight
   ssh-keygen
   ```
     <div class="alert alert-info">
        <h4 class="info">Note</h4>
        <p markdown="1">
          Windows users can use a command line emulator such as [Git Bash](https://git-for-windows.github.io/) or [Bash on Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide) (Windows 10 only) to generate SSH keys. This also sets you up to manage code locally with Git and interact with the Site Dashboard using [Terminus](/docs/terminus).
        </p>
      </div>

2. Unless you're an advanced user, just press **enter** for every question. If the command says the key already exists, you can either overwrite it or continue onto the next step with your existing key.
3. Copy the content from `~/.ssh/id_rsa.pub` to your clipboard.

 Windows (emulator required) and Linux users must output the SSH key to a file:
 ```nohighlight
 cat ~/.ssh/id_rsa.pub > ~/Desktop/key_for_pantheon.txt
 ```

 Then open the `key_for_pantheon.txt` file on your desktop, select all and copy.

 Mac users can execute the following to copy the SSH key in a single step:

 ```nohighlight
 pbcopy < ~/.ssh/id_rsa.pub
 ```


## Add Your SSH Key to Pantheon

1. Log in to Pantheon and go to the **Account** page.
2. Click **SSH Keys**.
3. Paste the copied public key into the box, and click **Add Key**.  
![Adding SSH Keys](/source/docs/assets/images/dashboard/add-ssh-key-dashboard.png)
  Your computer is now set up to securely connect to the Pantheon Git server. You can view a list of available keys on your Pantheon Account page.
4. Open the Git bash client, and put in the command to clone your Pantheon site. This is found in the Dev environment of your site above the Git code log.
5. If prompted, enter the password.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>
Generating SSH keys may add your username or the computer's hostname as a comment at the end of the file, making the key invalid on Pantheon. If you have any trouble using your SSH key take a look at the <a href="#troubleshooting">Troubleshooting</a> at the end of the document.
</p>
</div>

## Delete a Key from Pantheon
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

#### Authentication Prompts

Password requests may still occur after adding an SSH key to your Pantheon account if the corresponding key is not found by your local ssh-agent. To resolve, add your SSH key to the ssh-agent using the following command, replacing `id_rsa` with the name of your private key, if different:

```bash
ssh-add -K ~/.ssh/id_rsa
```
