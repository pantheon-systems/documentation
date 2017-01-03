---
title: Terminus Install
terminusinstall: true
terminuspage: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/:basename/
---
<!-- Tab Nav -->
<ul class="nav nav-tabs" role="tablist">
  <li id="mactab" role="presentation" class="active"><a href="#mac-linux" aria-controls="mac" role="tab" data-toggle="tab">Linux & Mac OS X </a></li>
  <li id="wintab" role="presentation"><a href="#win" aria-controls="win" role="tab" data-toggle="tab">Windows 10</a></li>
</ul>

<!-- Tab Panes -->
<div class="tab-content">
  <!-- Unix: Mac Instructions -->
  <div role="tabpanel" class="tab-pane active" id="mac-linux">
    <h3>Requirements</h3>
    <ul>
      <li>PHP Version 5.5.9 or later</li>
      <li><a href="http://www.php-cli.com/">PHP-CLI</a></li>
      <li><a href="http://php.net/manual/en/curl.setup.php">PHP-CURL</a></li>
      <li><a href="https://getcomposer.org/download">Composer</a></li>
    </ul>
  </div>
  <!-- Windows Instructions -->
  <div role="tabpanel" class="tab-pane" id="win">
    <h3>Requirements</h3>
    <ul>
      <li><a href="https://msdn.microsoft.com/en-us/commandline/wsl/install_guide">Bash on Ubuntu on Windows</a></li>
      <li>PHP Version 5.5.9 or later</li>
      <li><a href="http://www.php-cli.com/">PHP-CLI</a></li>
      <li><a href="http://php.net/manual/en/curl.setup.php">PHP-CURL</a></li>
      <li>Composer (<a href="https://getcomposer.org/Composer-Setup.exe">Direct Download</a>)</li>
    </ul>
  </div>
</div>

## Install
<p class="instruction">Install the most recent release of Terminus with the following command:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-installer"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
  <figure><pre id="terminus-installer"><code class="bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
</div>

## Authenticate
Once Terminus is installed, login with a machine token, which is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see [Machine Tokens](/docs/machine-tokens).

First, [generate a Machine Token](https://dashboard.pantheon.io/machine-token/create) from **User Dashboard** > **Account** > **Machine Tokens**.

<p class="instruction">Once the token has been created, use it to authenticate Terminus by running the following command:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-auth"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
  <figure><pre id="mac-mt-auth"><code class="bash" data-lang="bash">terminus auth:login --machine-token=&lsaquo;machine-token&rsaquo;</code></pre></figure>
</div>
<p class="instruction">After a token has been used, future sessions can be established by email:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-login"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
  <figure><pre id="mac-mt-login"><code class="bash" data-lang="bash">terminus auth:login --email=dev@example.com</code></pre></figure>
</div>
## Troubleshooting
### Permission Denied
If you run into permission problems such as:
```
file installer.phar: Permission denied
  0 3150k    0  1928    0     0   1474      0  0:36:28  0:00:01  0:36:27  7330
curl: (23) Failed writing body (0 != 1928)
```

<p class="instruction">Run the installation command with <code>sudo</code>:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-installer-sudo"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
  <figure><pre id="terminus-installer-sudo"><code class="bash" data-lang="bash">sudo curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
</div>

<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus"><span class="terminus-pager-lsaquo">&lsaquo;</span>Getting Started</a>
  <a style="float:right;" href="/docs/terminus/examples"><span class="terminus-pager-rsaquo">&rsaquo;</span>Example Usage</a>
</div>
