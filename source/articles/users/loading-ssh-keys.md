---
title: Loading SSH Keys
description: Learn how to load your public SSH key into your Pantheon account.
category:
  - getting-started

---

To take full advantage of Pantheon, you should load your public SSH key into your account. SSH keys are a best-practice for authentication, allowing you more security than a simple password. You will only need to do this once, no matter how many sites you work on.

**Note: For detailed help generating SSH keys, see [the HOWTO on key generation](/documentation/howto/generating-ssh-keys/-generate-ssh-keys).**

###Copy your public key
You should load the public portion of your key. Typically this is the file ending in `.pub`. The text of a public key contains three components: the type, the key, and the comment. For instance:

<textarea cols="80" readonly rows='8"' style="font-family: monospace">ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAuDVDG43S7yt/lG+CkFA462VCAYk3/h6B01x3QMFl4OGC0zppp4MDkQ5Li3rka3qWLmDbMFJyDBvb+ST+6ncJmzqcm7sEkWFqu6iLUhzzldKasRe3QARAE4Jn0zjqBucfqG86tA0UMxvR0dYFjGBHJmdHxiNe9i3+xFF1t1nvnyMaYWblC/OllWO7tZhrVTQRonKsIcCdw0fxFVUpjAYffX8Jha6azoJt6MOWVwWQWKFqZzUH94hp2tO9VmTS5wAq8PxnTMYVQT4YC1NiTHjEnrEFDcmZCmQn/taJxLwpomtbWIme17sPryIDa0t/0DR1MKHNzZraor98eyNfCEFGfw== joshk@mithras</textarea>

In the above example the key type is "ssh-rsa", though you may also generate ssh-dsa or ssh-dss keys depending on your local settings. The long random string is the key, and the `user@machine` at the end is the comment, which is helpful in identifying where a key came from and who it is for.

###Add your key
To add your key, navigate to **Your Sites and Account** and use the "Add Key" button.

![](https://pantheon-systems.desk.com/customer/portal/attachments/87730)

You need to copy the key text completely, and paste it into the form in the modal window. See below. 

![](https://pantheon-systems.desk.com/customer/portal/attachments/87731)

Once the key has been successfully added it will appear under the list of available keys on your Pantheon Account page.

![](https://pantheon-systems.desk.com/customer/portal/attachments/87835)

With that, you're set to make a git clone of your site codebase!

###Deleting a key
To delete a your key, navigate to **Your Sites and Account** and click the "Delete Key" link. Don't worry a modal will appear to asking you if you are sure you want to delete that key.

![](https://pantheon-systems.desk.com/customer/portal/attachments/87732)

If you are sure that you want to delete a key, then you can go ahead and click on the button in the modal in order to remove it from your account.

![](https://pantheon-systems.desk.com/customer/portal/attachments/87733)

If you have no keys remaining but still have active sites, you will still have access to them and can make edits via SFTP using your account password to authenticate. However, there will be no git access as you need a valid key uploaded to your account.
