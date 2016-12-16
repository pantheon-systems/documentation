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
  <li id="mactab" role="presentation" class="active"><a href="#mac" aria-controls="mac" role="tab" data-toggle="tab">Mac OS X</a></li>
  <li id="linuxtab" role="presentation"><a href="#linux" aria-controls="linux" role="tab" data-toggle="tab">Linux</a></li>
  <li id="wintab" role="presentation"><a href="#win" aria-controls="win" role="tab" data-toggle="tab">Windows</a></li>
</ul>

<!-- Tab Panes -->
<div class="tab-content">
  <!-- Unix: Mac Instructions -->
  <div role="tabpanel" class="tab-pane active" id="mac">
    <h2 class="tab-content-heading">Install Terminus for Mac OS X</h2>
    <h3>Requirements</h3>
    <ul>
      <li>PHP Version 5.5.9 or later</li>
      <li><a href="http://www.php-cli.com/">PHP-CLI</a></li>
      <li><a href="https://getcomposer.org/download">Composer</a></li>
    </ul>
    <p class="instruction">Run the following command to install Terminus Alpha (<code>terminus1x</code>) with <a href="https://getcomposer.org/doc/00-intro.md">Composer</a>:</p>
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-install-composer"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="mac-install-composer"><code class="bash" data-lang="bash">cd $HOME ; mkdir terminus1x ; cd terminus1x ; composer init -n ; composer config minimum-stability dev ; composer require pantheon-systems/terminus dev-master ; echo 'alias terminus1x=$HOME/terminus1x/vendor/bin/terminus'>>$HOME/.bash_profile ; source $HOME/.bash_profile</code></pre></figure>
    </div>
  </div>
  <!-- Unix: Linux Instructions -->
  <div role="tabpanel" class="tab-pane" id="linux">
    <h2 class="tab-content-heading">Install Terminus for Linux</h2>
    <h3>Requirements</h3>
    <ul>
      <li>PHP Version 5.5.9 or later</li>
      <li><a href="http://www.php-cli.com/">PHP-CLI</a></li>
      <li><a href="https://getcomposer.org/download">Composer</a></li>
    </ul>
    <p class="instruction">Run the following command to install Terminus Alpha (<code>terminus1x</code>) with <a href="https://getcomposer.org/doc/00-intro.md">Composer</a>:</p>
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#linux-install-composer"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="linux-install-composer"><code class="bash" data-lang="bash">cd $HOME ; mkdir terminus1x ; cd terminus1x ; composer init -n ; composer config minimum-stability dev ; composer require pantheon-systems/terminus dev-master ; echo 'alias terminus1x=$HOME/terminus1x/vendor/bin/terminus'>>$HOME/.bashrc ; source $HOME/.bashrc</code></pre></figure>
    </div>
  </div>
  <!-- Windows Instructions -->
    <div role="tabpanel" class="tab-pane" id="win">
    <h2 class="tab-content-heading">Install Terminus for Windows</h2>
    <h3>Requirements</h3>
    <ul>
      <li><a href="https://msdn.microsoft.com/en-us/commandline/wsl/install_guide">Bash on Ubuntu on Windows</a></li>
      <li>PHP Version 5.5.9 or later</li>
      <li><a href="http://www.php-cli.com/">PHP-CLI</a></li>
      <li>Composer (<a href="https://getcomposer.org/Composer-Setup.exe">Direct Download</a>)</li>
    </ul>
    <p class="instruction">Run the following command to install Terminus Alpha (<code>terminus1x</code>) with <a href="https://getcomposer.org/doc/00-intro.md">Composer</a>:</p>
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#win-install-composer"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="win-install-composer"><code class="bash" data-lang="bash">cd $HOME ; mkdir terminus1x ; cd terminus1x ; composer init -n ; composer config minimum-stability dev ; php composer.phar require pantheon-systems/terminus dev-master ; echo 'alias terminus1x=$HOME/terminus1x/vendor/bin/terminus'>>$HOME/.bash_profile ; source $HOME/.bash_profile</code></pre></figure>
    </div>
    </div>
</div>

<h2>Authenticate</h2>
<p>Once Terminus is installed, login with a machine token, which is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see <a href="/docs/machine-tokens">Machine Tokens</a>.</p>
<p>First, <a href="https://dashboard.pantheon.io/machine-token/create">generate a Machine Token</a> from <strong>User Dashboard</strong> &rsaquo; <strong>Account</strong> &rsaquo; <strong>Machine Tokens</strong>.</p>
<p class="instruction">Once the token has been created, use it to authenticate Terminus by running the following command:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-auth"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
  <figure><pre id="mac-mt-auth"><code class="bash" data-lang="bash">terminus1x auth:login --machine-token=&lsaquo;machine-token&rsaquo;</code></pre></figure>
</div>
<p class="instruction">After a token has been used, future sessions can be established by email:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-login"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
  <figure><pre id="mac-mt-login"><code class="bash" data-lang="bash">terminus1x auth:login  --email=dev@example.com</code></pre></figure>
</div>

<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus"><span class="terminus-pager-lsaquo">&lsaquo;</span>Getting Started</a>
  <a style="float:right;" href="/docs/terminus/examples"><span class="terminus-pager-rsaquo">&rsaquo;</span>Example Usage</a>
</div>
