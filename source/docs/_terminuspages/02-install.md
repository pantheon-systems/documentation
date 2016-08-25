---
title: Install & Setup
permalink: /docs/terminus/install/
---
## 1. Install Terminus
Mac OS: Install with [Composer](https://getcomposer.org/) by running this in your terminal:
<div class="zero-clipboard">
<span class="btn-clipboard">Copy</span>
<figure class="highlight"><pre><code class="bash" data-lang="bash">composer require pantheon-systems/terminus</code></pre></figure>
</div>
Or visit the [GitHub repo](https://github.com/pantheon-systems/terminus) for other installation options.


<span class="glyphicon glyphicon-check" aria-hidden="true"></span> Resolve dependencies during installation

Terminus Requirements:
PHP version 5.5.9 or later
PHP-CLI
PHP-CURL


## 2. Authenticate
Authenticate Terminus with a [machine token (view doc)](/docs/machine-tokens), which is used to securely authenticate your machine for Terminus. Machine tokens provide the same access as your username and password, and do not expire.

You can generate a machine token here. (You can manage this later through your **User Dashboard** > **Account** > **Machine Tokens**)

<a href="https://dashboard.pantheon.io/machine-token/create" class="btn-primary btn">Create Token</a>

<div class="zero-clipboard">
<span class="btn-clipboard">Copy</span>
<figure class="highlight"><pre><code class="bash" data-lang="bash">terminus auth login --machine-token<machine-token></code></pre></figure>
</div>
