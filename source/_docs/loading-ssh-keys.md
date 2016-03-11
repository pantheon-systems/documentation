---
title: Loading SSH Keys
description: Learn how to load your public SSH key into your Pantheon Website Management Platform account.
categories:
  - getting-started
keywords: ssh keys, load ssh keys, add ssh key, delete ssh key
---
To take full advantage of Pantheon, you should load your public SSH key into your account. SSH keys are a best-practice for authentication, allowing you more security than a simple password. You will only need to do this once, no matter how many sites you work on.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
For detailed help generating SSH keys, see <a href="/docs/generating-ssh-keys">Generate SSH Keys</a></div>


### Copy Your Public Key
Load the public portion of your key. Typically, this is the file ending in `.pub`. The text of a public key contains three components: the type, the key, and the comment. For instance:

<textarea cols="80" readonly rows='8"' style="font-family: monospace">ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAuDVDG43S7yt/lG+CkFA462VCAYk3/h6B01x3QMFl4OGC0zppp4MDkQ5Li3rka3qWLmDbMFJyDBvb+ST+6ncJmzqcm7sEkWFqu6iLUhzzldKasRe3QARAE4Jn0zjqBucfqG86tA0UMxvR0dYFjGBHJmdHxiNe9i3+xFF1t1nvnyMaYWblC/OllWO7tZhrVTQRonKsIcCdw0fxFVUpjAYffX8Jha6azoJt6MOWVwWQWKFqZzUH94hp2tO9VmTS5wAq8PxnTMYVQT4YC1NiTHjEnrEFDcmZCmQn/taJxLwpomtbWIme17sPryIDa0t/0DR1MKHNzZraor98eyNfCEFGfw== joshk@mithras</textarea>

In the above example the key type is "ssh-rsa", though you may also generate ssh-dsa or ssh-dss keys depending on your local settings. The long character string is the key, and the `user@machine` at the end is the comment, which is helpful in identifying where a key came from and who it is for.

### Add Your Key

1. Log in to Pantheon and visit the Account page.
2. Click **SSH Keys**, and paste the copied key into the box.
3. Click **Add Key**.
![Adding SSH Keys](/source/assets/images/add-ssh-key-dashboard.png)
Once the key has been successfully added, it will appear under the list of available keys on your Pantheon Account page.
![Show SSH Keys](/source/assets/images/remove-ssh-key.png)

### Delete a Key
To delete a key, go to the Account page and click **SSH Keys**. Simply click the **Remove** button next to the key you want to delete.
![Delete SSH Key](/source/assets/images/remove-ssh-key.png)

If you have no keys remaining but still have active sites, you will still have access to them and can make edits via SFTP and Git using your account password to authenticate.
