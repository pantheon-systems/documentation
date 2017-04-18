---
title: Terminus Manual
subtitle: Install
terminusinstall: true
terminuspage: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/:basename/
---
Terminus is available for Mac OS X, Linux, and Windows 7 and 10.
## Requirements

* PHP Version 5.5.9 or later (must include the [php-xml extension](http://php.net/manual/en/dom.setup.php))
* [PHP-CLI](http://www.php-cli.com/)
* [PHP-CURL](http://php.net/manual/en/curl.setup.php)
* [Composer](https://getcomposer.org/download/)
* Windows Only: A command line emulator such as [Git Bash](https://git-for-windows.github.io/) or [Bash on Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide) (Windows 10 only).

## Install
<p class="instruction">Install the most recent release of Terminus with the following command within a directory where you have permission to write files. If in doubt, you can create a <code>terminus</code> directory in your <code>$HOME</code> and install there:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-installer">Copy</button>
  <figure><pre id="terminus-installer"><code class="command bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
</div>

## Authenticate
Once Terminus is installed, login with a machine token, which is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see [Machine Tokens](/docs/machine-tokens).

First, [generate a Machine Token](https://dashboard.pantheon.io/machine-token/create) from **User Dashboard** > **Account** > **Machine Tokens**.

<p class="instruction">Once the token has been created, use it to authenticate Terminus by running the following command:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-auth">Copy</button>
  <figure><pre id="mac-mt-auth"><code class="command bash" data-lang="bash">terminus auth:login --machine-token=&lsaquo;machine-token&rsaquo;</code></pre></figure>
</div>
<p class="instruction">After a token has been used, future sessions can be established by email:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-login">Copy</button>
  <figure><pre id="mac-mt-login"><code class="command bash" data-lang="bash">terminus auth:login --email=dev@example.com</code></pre></figure>
</div>
## Troubleshooting
### Permission Denied
If the installer throws an IOException at the end:

```
  [Symfony\Component\Filesystem\Exception\IOException]
  Failed to create symbolic link from "/path/to/current/dir/vendor/bin/terminus" to "/usr/local/bin/terminus".
```
You may need to remove an old installation from terminus from `/usr/local/bin/terminus`.

If you run into permission problems such as:
```
file installer.phar: Permission denied
  0 3150k    0  1928    0     0   1474      0  0:36:28  0:00:01  0:36:27  7330
curl: (23) Failed writing body (0 != 1928)
```

<p markdown="1" class="instruction">You should relocate your installation to a directory where you have permission to write files. If in doubt, you can create a `terminus` diretory in your `$HOME` and go there:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-installer-sudo">Copy</button>
  <figure><pre id="terminus-installer-sudo"><code class="bash command" data-lang="bash">mkdir $HOME/terminus
  cd $HOME/terminus
  curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
</div>
### PHP Fatal error: Uncaught exception 'ReflectionException'
The `php-xml` extension is typically included and enabled by default when installing PHP. However, the following error indicates that the `php-xml` extension is missing:

```php
PHP Fatal error: Uncaught exception 'ReflectionException' with message 'Class DOMDocument does not exist' in /root/vendor/consolidation/output-formatters/src/Transformations/DomToArraySimplifier.php:24
```

To resolve this error, install the [`php-xml` extension](http://php.net/manual/en/dom.setup.php).
### curl: (60) SSL certificate problem
The following error occurs when curl is unable to verify the local issuer certificate:

```
curl: (60) SSL certificate problem: unable to get local issuer certificate
```

To resolve, save a copy of the [latest CA certificate](https://curl.haxx.se/docs/caextract.html) to a new file named `cacert.perm` then add `curl.cainfo = "[path_to_file]\cacert.pem"` to your `php.ini` file. If you're running XAMPP, you can add the `cacert.pem` file within the `xampp\php\extras\ssl` directory.


<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus"><span class="terminus-pager-lsaquo">&lsaquo;</span>Getting Started</a>
  <a style="float:right;" href="/docs/terminus/examples"><span class="terminus-pager-rsaquo">&rsaquo;</span>Example Usage</a>
</div>
