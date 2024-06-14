---
title: Generate and Add SSH Keys
description: Understand how to generate SSH keys to configure Git, SFTP, or Drupal Drush.
tags: [security, dashboard, ssh]
reviewed: "2022-03-04"
contenttype: [doc]
innav: [true]
categories: [security, git, config]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [ssh, drush, sftp]
---

SSH keys are a best practice for authentication and offer more security than a simple password.  SSH keys allow you to stay secure and compliant with security regulations, provided that you follow recommended guidelines to generate, store, manage, and remove your SSH keys.

You can take full advantage of Pantheon by loading your public SSH key into your account.
You must add your SSH key once for each work environment (laptop, desktop, etc.), no matter how many sites you work on.

<Alert title="Note" type="info">

Pantheon does not provide access to a shell environment over SSH. These directions allow you to have passwordless access if you configure Git, SFTP, or Drush to use SSH keys.

</Alert>

## Generate an SSH Key

Use the steps in this section to generate your SSH key.

<Alert title="Note"  type="info" >

Pantheon supports ECDSA and RSA SSH keys. Currently, we do not support `ed25519` keys.

</Alert>

<Accordion title="Watch: Generate a SSH Key and Add it to Your Dashboard" id="ssh-video" icon="facetime-video">

<Youtube src="U8sfuvrjroY" title="Generate a SSH Key and Add it to Your Dashboard" />

</Accordion>

### MacOS/Linux

1. Open your terminal and enter the following command to generate a key:

   ```bash{promptUser: user}
   ssh-keygen -t rsa
   ```

  Do not edit the default location of `~/.ssh/id_rsa` unless you have a reason to change it. If the command says the key already exists, you can either overwrite it, or continue to the next step with your existing key.

1. Set a passphrase for better security.

   We recommend using a passphrase, but it can conflict with some tools.

1. Copy the contents of `~/.ssh/id_rsa.pub` to your clipboard after the files are created.

   MacOS users can `cat`the file to the terminal and copy the output:

   ```bash{promptUser: user}
   cat ~/.ssh/id_rsa.pub
   ```

1. Run `eval` to start the SSH agent. The `Agent pid` output confirms that the agent started:

      ```bash{outputLines: 2}
      eval `ssh-agent`
      Agent pid 86810
      ```

1. Add the newly created key to the ssh-agent:

   ```bash{promptUser: user}
   ssh-add ~/.ssh/id_rsa
   ```

### Windows

1. Open your terminal and enter the following command to generate a key. This command works for Windows 10:

   ```bash{promptUser: winshell}
   ssh-keygen -t rsa
   ```

  Do not edit the default location of `~/.ssh/id_rsa` unless you have a reason to change it. If the command says the key already exists, you can either overwrite it, or continue to the next step with your existing key.

1. Set a passphrase for better security.

   We recommend using a passphrase, but it can conflict with some tools.

1. Copy the contents of `~/.ssh/id_rsa.pub` to your clipboard after the files are created.

   ```bash{promptUser: winshell}
   type .ssh\id_rsa.pub
   ```

1.  Run `start-ssh-agent` to start the SSH agent. The output confirms the agent has started. Enter the passphrase, if it was previously set.

      ```bash{promptUser: winshell}{outputLines: 2,3,5}
      start-ssh-agent
      Removing old ssh-agent sockets
      Starting ssh-agent:  done
      Enter passphrase for /c/Users/[user]/.ssh/id_rsa:
      Identity added: /c/Users/[user]/.ssh/id_rsa ([user@machine_name])
      ```

## Add Your SSH Key to Pantheon

### Add SSH Key - New Dashboard

1. Log in to your Pantheon Dashboard.

1. [Go to your Personal Settings](/personal-settings), then go to the **[SSH Keys](https://dashboard.pantheon.io/personal-settings/ssh-keys)** tab.

1. Click **Add New Key**.

1. Paste the copied public key into the box, and click **Save**.

  Your computer is now set up to securely connect to the Pantheon Git server. You can view a list of available keys on the same page.

### Add SSH Key - Classic Dashboard

1. Log in to your Pantheon site.

1. Click your username in the top right, then select **My Dashboard**.

1. Open the **<Icon icon="gear" /> Account** tab in your User Dashboard.

1. Click **SSH Keys**.

1. Paste the copied public key into the **Add Key** box.

1. Click the **Add Key** button.

  ![Adding SSH Keys](../images/dashboard/add-ssh-key-dashboard.png)

  Your computer is now set up to securely connect to the Pantheon Git server. You can view a list of available keys on the same page.

### Clone Your Site Code

You can use your Dev environment to clone your site code to your workstation:

1. Use Terminal to copy the **SSH clone URL** from the site's **Connection Info**.

1. Enter the passphrase you set above, if prompted.

## Remove SSH Key from Pantheon

### Revoke SSH Key from Pantheon - New Dashboard

1. Log in to your Pantheon Dashboard.

1. [Go to your Personal Settings](/personal-settings), then go to the **[SSH Keys](https://dashboard.pantheon.io/personal-settings/ssh-keys)** tab.

1. Click the **Revoke** button next to the key you want to remove:

### Remove SSH Key from Pantheon - Classic Dashboard

1. Navigate to the **<Icon icon="gear" /> Account** tab of your User Dashboard and click **SSH Keys**.

1. Click the **Remove** button next to the key you want to delete:

![Delete SSH Key](../images/dashboard/remove-ssh-key.png)

### Site Access After Removing Keys
After removing SSH Keys from your user account, you will not be able to interact with the application and codeservers directly through command line interfaces like Git, SFTP, WP-CLI, and Drush. However removing SSH keys is separate from revoking the machine tokens used by Terminus to perform actions (e.g., creating Multidev environments) that can otherwise be done in the Pantheon Site Dashboard.

## Troubleshooting

<Partial file="host-keys.md" />

### Control Path Error

You may receive the following error:

```none
ControlPath too long fatal: Could not read from remote repository.
```

Check your SSH config files (by default, `$HOME/.ssh/config and /etc/ssh/ssh_config`) for a declaration like this:

```none:title=ssh_config
Host *
ControlMaster auto
ControlPath ~/.ssh/control-%l.%r@%h:%p
```

There are two ways to fix this. First, try adjusting the `Controlpath` line as shown below:

```none:title=ssh_config
Host *
ControlMaster auto
ControlPath ~/.ssh/control-%r
```

If this doesn't fix the issue, try creating an entry in your SSH configuration for your site specifically by its hostname. Don't use the `ControlMaster` option, instead use the `ControlPath` line as shown below, replacing `SITE_UUID` with your [site's UUID](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuis):

```none:title=ssh_config
Host *.SITE_UUID.drush.in
ControlPath ~/.ssh/control-%r
```

### Server Refused to Allocate pty

This error occurs when a user is attempting to make a direct connection to Pantheon via SSH. Pantheon does not support [direct SSH connections](/faq/#does-pantheon-have-ftp-or-shell-access?).

### Authentication Prompts

Password requests may still occur after adding an SSH key to your Pantheon account if the corresponding key is not found by your local ssh-agent. Verify by listing the SSH fingerprints already loaded in your device's ssh-agent:

```bash{promptUser: user}
ssh-add -L | ssh-keygen -l -E md5 -f - | awk '{print substr($2,5)}'
```

The resulting string should match one of the keys [listed in your Personal Settings](https://dashboard.pantheon.io/users/#account/ssh-keys).

To resolve, add your SSH key to the ssh-agent using the following command, replacing `id_rsa` with the name of your private key, if different:

```bash{promptUser: user}
ssh-add ~/.ssh/id_rsa
```

If you are using a Linux distribution such as Fedora 33 or later, make sure RSA keys are enabled in `~/.ssh/config`:
```
Host *.drush.in
  PubkeyAcceptedKeyTypes=ssh-rsa
```

<Alert title="Note"  type="info" >

 Pantheon does not have access to keys that only exist on the host machine. You must ensure that your keys and, if applicable, your key agent are made available to the application running in the container, if you're using Lando, Docksal, or DDEV.

</Alert>
