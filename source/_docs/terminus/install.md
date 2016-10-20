---
title:  Terminus Manual: Installation
terminuspage: true
terminusinstall: true
type: terminuspage
tags: [terminus]
categories: [managing]
---
<!-- Tab Nav -->
<ul class="nav nav-tabs" role="tablist">
  <li id="unixtab" role="presentation" class="active"><a href="#unix" aria-controls="unix" role="tab" data-toggle="tab">Linux / Mac OSX</a></li>
  <li id="wintab" role="presentation"><a href="#win" aria-controls="win" role="tab" data-toggle="tab">Windows</a></li>
</ul>

<!-- Tab Panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="unix">
    <!-- Unix: Mac or Linux Instructions -->
    <h2>Install Terminus for Linux / Mac OSX</h2>
    <h3>Requirements</h3>
    <ul>
      <li>PHP Version 5.5.9 or later</li>
      <li><a href="http://www.php-cli.com/">PHP-CLI</a></li>
      <li><a href="https://getcomposer.org/download">Composer</a></li>
    </ul>
    <p>Run the following command to install Terminus Alpha (<code>terminus1x</code>) with <a href="https://getcomposer.org/doc/00-intro.md">Composer</a>:</p>
    <div>
      <button class="btn btn-default btn-clippy" data-clipboard-target="#install-composer"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="install-composer"><code class="bash" data-lang="bash">cd $HOME ; echo '{"minimum-stability": "dev", "prefer-stable": true}' > composer.json ; composer require pantheon-systems/terminus dev-master ; echo 'alias terminus1x=$HOME/vendor/bin/terminus'>>$HOME/.bash_profile ; source $HOME/.bash_profile</code></pre></figure>
    </div>
    <h2>Authenticate</h2>
    <p>Once Terminus is installed, login with a machine token, which is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see <a href="/docs/machine-tokens">Machine Tokens</a>.</p>
    <p>First, <a href="https://dashboard.pantheon.io/machine-token/create">generate a Machine Token</a> from <strong>User Dashboard</strong> &rsaquo; <strong>Account</strong> &rsaquo; <strong>Machine Tokens</strong>.</p>
    <p>Once the token has been created, use it to authenticate Terminus by running the following command:</p>
    <div>
      <button class="btn btn-default btn-clippy" data-clipboard-target="#mt-auth"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="mt-auth"><code class="bash" data-lang="bash">terminus1x auth:login --machine-token=&lsaquo;machine-token&rsaquo;</code></pre></figure>
    </div>
    <p>After a token has been used, future sessions can be established by email:</p>
    <div>
      <button class="btn btn-default btn-clippy" data-clipboard-target="#mt-login"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="mt-login"><code class="bash" data-lang="bash">terminus1x auth:login  dev@example.com</code></pre></figure>
    </div>
  </div>

  <!-- Windows Instructions -->
  <div role="tabpanel" class="tab-pane" id="win">
  <h2>Install Terminus for Windows</h2>
  <h3>Requirements</h3>
  <ul>
    <li><a href="https://msdn.microsoft.com/en-us/commandline/wsl/install_guide">Bash on Ubuntu on Windows</a></li>
    <li>PHP Version 5.5.9 or later</li>
    <li><a href="http://www.php-cli.com/">PHP-CLI</a></li>
    <li>Composer (<a href="https://getcomposer.org/Composer-Setup.exe">Direct Download</a>)</li>

  </ul>
  <p>Run the following command to install Terminus Alpha (<code>terminus1x</code>) with <a href="https://getcomposer.org/doc/00-intro.md">Composer</a>:</p>
  <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#win-install-composer"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="win-install-composer"><code class="bash" data-lang="bash">cd $HOME ; echo '{"minimum-stability": "dev", "prefer-stable": true}' > composer.json ; php composer.phar require pantheon-systems/terminus dev-master ; echo 'alias terminus1x=$HOME/vendor/bin/terminus'>>$HOME/.bash_profile ; source $HOME/.bash_profile</code></pre></figure>
  </div>

  <h2>Authenticate</h2>
  <p>Once Terminus is installed, login with a machine token, which is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see <a href="/docs/machine-tokens">Machine Tokens</a>.</p>
  <p>First, <a href="https://dashboard.pantheon.io/machine-token/create">generate a Machine Token</a> from <strong>User Dashboard</strong> &rsaquo; <strong>Account</strong> &rsaquo; <strong>Machine Tokens</strong>.</p>
  <p>Once the token has been created, use it to authenticate Terminus by running the following command:</p>
  <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#win-mt-auth"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="win-mt-auth"><code class="bash" data-lang="bash">terminus1x auth:login --machine-token=&lsaquo;machine-token&rsaquo;</code></pre></figure>
  </div>
  <p>After a token has been used, future sessions can be established by email:</p>
  <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#win-mt-login"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="win-mt-login"><code class="bash" data-lang="bash">terminus1x auth:login dev@example.com</code></pre></figure>
  </div>
  </div>
</div>

<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus"><span class="terminus-pager-lsaquo">&lsaquo;</span>Getting Started</a>
  <a style="float:right;" href="/docs/terminus/examples"><span class="terminus-pager-rsaquo">&rsaquo;</span>Example Usage</a>
</div>
