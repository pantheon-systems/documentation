---
title: How to install terminus on Windows 7
subtitle: Windows 7
terminusexample: true
terminuspage: true
terminustoc: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/:basename/
---

Terminus is available for Mac OS X, Linux, and Windows 7 and 10.

## How to install Terminus on Windows 7

![Terminus on Windows 7](/source/docs/assets/images/terminus-windows7.png)

## 1. Download and Install Cygwin

Download and Install Cygwin (If your machine is 64bit you can select setup-x86_64.exe) from https://cygwin.com/install.html

![Download Cygwin](/source/docs/assets/images/terminus-cygwin1.png)

## 2. Install and make sure you have an admin permission

![Install Cygwin](/source/docs/assets/images/terminus-cygwin2.png)

![Install Cygwin](/source/docs/assets/images/terminus-cygwin3.png)


## 3. Leave it as default and hit the next button

![Install Cygwin](/source/docs/assets/images/terminus-cygwin4.png)


## 4. Specify your package directory or you may leave this as default

![Install Cygwin](/source/docs/assets/images/terminus-cygwin5.png)


## 5. Leave this as default and hit the next button

![Install Cygwin](/source/docs/assets/images/terminus-cygwin6.png)


## 6. Select Packages, set the View from Pending to Category

![Cygwin Packages](/source/docs/assets/images/terminus-cygwin6-packages1.png)


## 7. Search and set the specified packages

Search “php-curl” package and make sure it is set in the “install” mode by clicking the icon

![Cygwin Packages](/source/docs/assets/images/terminus-cygwin6-packages2.png)


Search “php-mbstring” package and make sure it is set in the “install” mode by clicking  the icon

![Cygwin Packages](/source/docs/assets/images/terminus-cygwin6-packages3.png)


Search “php-xml” package and make sure it is set in the “install” mode by clicking the icon

![Cygwin Packages](/source/docs/assets/images/terminus-cygwin6-packages4.png)


Search “php-gd” package and make sure it is set in the “install” mode by clicking  the icon

![Cygwin Packages](/source/docs/assets/images/terminus-cygwin6-packages5.png)


## 8. Then hit next to install the selected packages

![Cygwin Packages](/source/docs/assets/images/terminus-cygwin6-packages6.png)


## 9. Open the cygwin terminal

Once cygwin installation has completed you can now open the cygwin terminal(You can find it on your desktop)

![Cygwin Packages](/source/docs/assets/images/terminus-cygwin6-complete.png)


## 10. Run a curl command

Then you may now run curl command specified from this document - https://pantheon.io/docs/terminus/install/

![Terminus Installation](/source/docs/assets/images/terminus-install.png)

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-installer">Copy</button>
  <figure><pre id="terminus-installer"><code class="command bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
</div>

## 11. Check if terminus is working properly

Once terminus installation has completed and to make sure that terminus is properly working you can run the command: terminus -v

![Terminus installation](/source/docs/assets/images/terminus-install-complete.png)
