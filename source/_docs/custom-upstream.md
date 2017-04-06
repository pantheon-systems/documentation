---
title: Create a Custom Upstream
description: Add and test a custom distribution of WordPress or Drupal on the Pantheon website management platform.
tags: [tools, workflow]
categories: []
---
Create a custom distribution of WordPress or Drupal and add it to the Pantheon platform. This will enable users of the affiliated organization to create sites using a specialized codebase as a starting point.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Custom Upstreams are available to EDUs, Enterprises, and agencies that sign up for <a href="https://pantheon.io/agencies/pantheon-for-agencies">Pantheon for Agencies</a>.</p></div>

## Create a Remote Repository

Create a remote repository and clone it locally, then pull the applicable Pantheon compatible upstream:
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li id="d8tab" role="presentation" class="active"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li id="d7tab" role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li id="d6tab" role="presentation"><a href="#d6" aria-controls="d6" role="tab" data-toggle="tab">Drupal 6</a></li>
  <li id="wptab" role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <li id="distributiontab" role="presentation"><a href="#distribution" aria-controls="distribution" role="tab" data-toggle="tab">Public Drupal Distributions</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">

  <!-- Drupal Content -->
  <div role="tabpanel" class="tab-pane active" id="d8">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-drops-8">Copy</button>
      <figure><pre id="git-pull-drops-8"><code class="command nohighlight" data-lang="bash">git pull git://github.com/pantheon-systems/drops-8.git master</code></pre></figure>
    </div>
  </div>

  <div role="tabpanel" class="tab-pane" id="d7">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-drops-7">Copy</button>
      <figure><pre id="git-pull-drops-7"><code class="command nohighlight" data-lang="bash">git pull git://github.com/pantheon-systems/drops-7.git master</code></pre></figure>
    </div>
  </div>

  <div role="tabpanel" class="tab-pane" id="d6">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-drops-6">Copy</button>
      <figure><pre id="git-pull-drops-6"><code class="command nohighlight" data-lang="bash">git pull git://github.com/pantheon-systems/drops-6.git master</code></pre></figure>
    </div>
  </div>

  <div role="tabpanel" class="tab-pane" id="wp">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-wp">Copy</button>
      <figure><pre id="git-pull-wp"><code class="command nohighlight" data-lang="bash">git pull git://github.com/pantheon-systems/WordPress.git master</code></pre></figure>
    </div>
  </div>

  <div role="tabpanel" class="tab-pane" id="distribution">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-distribution-openatrium">Copy</button>
      <figure><pre id="git-pull-distribution-openatrium"><code class="command nohighlight" data-lang="bash">git pull git://github.com/phase2/openatrium-drops-7.git master</code></pre></figure>
    </div>
    <p>Or:</p>
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-distribution-panopoly">Copy</button>
      <figure><pre id="git-pull-distribution-panopoly"><code class="command nohighlight" data-lang="bash">git pull git://github.com/populist/panopoly-drops-7.git master</code></pre></figure>
    </div>
  </div>
<!-- end tab-content -->
</div>

## Add Your Code

Follow conventions for using the `/profiles` directory in Drupal. With WordPress, you can add plugins and themes to their normal locations.

<div class="alert alert-danger"><h4 class="info">Warning</h4><p>Your Upstream must not contain the tags <code>pantheon_test_n</code> or <code>pantheon_live_n</code>. Pantheon site repositories add these tags when you deploy code to Test and Live environments, and the platform will recognize and automatically deploy code at the tagged commit to those environments immediately, every time you create a site with the upstream.</p></div>

Push the repository to your upstream's remote location.

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#push-upstream-origin-master">Copy</button>
  <figure><pre id="push-upstream-origin-master"><code class="command nohighlight" data-lang="bash">git push origin master</code></pre></figure>
</div>

## Test Your Upstream

### Create the Testing Site

Create a vanilla Drupal or WordPress site using a unique site name that is associated with your partner organization so you can test the upstream using [Terminus](/docs/terminus/):


<ul class="nav nav-tabs" role="tablist">
  <li id="drupal8tab" role="presentation" class="active"><a href="#drupal8" aria-controls="drupal8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li id="drupal7tab" role="presentation"><a href="#drupal7" aria-controls="drupal7" role="tab" data-toggle="tab">Drupal 7</a></li>    
  <li id="wp-newtab" role="presentation"><a href="#wp-new" aria-controls="wp-new" role="tab" data-toggle="tab">WordPress</a></li>
</ul>
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="drupal8">
    <!-- Drupal Content -->
    <p class="instruction">Create a Drupal 8 site associated with your organization:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#vanilla-site-drupal-8">Copy</button>
    <figure><pre id="vanilla-site-drupal-8"><code class="command nohighlight" data-lang="bash">terminus site:create &lt;unique-site-name&gt; "Unique Site Label" "Drupal 8" --org="Org Name or UUID"</code></pre></figure>
    </div>
  </div>
  <div role="tabpanel" class="tab-pane" id="drupal7">
    <!-- Drupal Content -->
    <p class="instruction">Create a Drupal 7 site associated with your organization:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#vanilla-site-drupal-7">Copy</button>
    <figure><pre id="vanilla-site-drupal-7"><code class="command nohighlight" data-lang="bash">terminus site:create &lt;unique-site-name&gt; "Unique Site Label" "Drupal 7" --org="Org Name or UUID"</code></pre></figure>
    </div>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp-new">
    <!-- WordPress Content -->
    <p class="instruction">Create a WordPress site associated with your organization:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#vanilla-site-wordpress">Copy</button>
    <figure><pre id="vanilla-site-wordpress"><code class="command nohighlight" data-lang="bash">terminus site:create unique-site-name "site label" WordPress --org="org name or UUID"</code></pre></figure>
    </div>
  </div>
</div>

[Clone the Pantheon repository](/docs/git/#clone-your-site-codebase):

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#clone-pantheon-repository">Copy</button>
  <figure><pre id="clone-pantheon-repository"><code class="command nohighlight" data-lang="bash">`terminus connection:info &lt;site&gt;.dev --fields='Git Command' --format=string`</code></pre></figure>
</div>

Add code from your remote upstream repository:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#pull-upstream">Copy</button>
  <figure><pre id="pull-upstream"><code class="command nohighlight" data-lang="bash">git pull git://github.com/organization/upstream.git master</code></pre></figure>
</div>

Push back to Pantheon:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#push-origin-master">Copy</button>
  <figure><pre id="push-origin-master"><code class="command nohighlight" data-lang="bash">git push origin master</code></pre></figure>
</div>

### Testing

#### Complete Site Installation

Visit the Development site URL and complete the site installation process to make sure your distribution installs cleanly.

Testers might find it helpful to use the wipe functionality in the Database / Files tab to easily run through the install process multiple times:

<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-env-wipe">Copy</button>
  <figure><pre id="terminus-env-wipe"><code class="command nohighlight" data-lang="bash">terminus env:wipe &lt;site&gt;.&lt;env&gt;</code></pre></figure>
</div>

#### Acceptance Tests

Run your automated acceptance tests, using behat, casper.js, or by manually executing user stories.

## Update and Provide Pantheon with Read Access

When testing is complete, merge any outstanding pull requests into the master branch or push to the branch you want Pantheon to clone and pull updates from. Upstreams can be public or private repositories, but this cannot change after sites are created from it.
<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
  <ul>
    <li>For private repositories, create a dedicated user with read-only access to the repository. The password should only contain alphanumeric characters.</li>
    <li>For private GitLab repositories, please ensure the user has the <a href="https://docs.gitlab.com/ce/user/permissions.html#permissions">"reporter" permissions level</a>.</li>
  </ul>
</div>

## Submit Product Information

After you have a distribution that works on Pantheon, [contact support](/docs/getting-support) with the subject: "Product submission for [organization]" and include the following information about the distribution:

- **Upstream Name**
- **Description** <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Optional" data-content="If provided, this will display in the upstream listing when creating a site. Less than 200 characters, basic HTML allowed."><em class="fa fa-info-circle"></em></a> (optional)
- **URL of Logo** <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Optional" data-content="If provided, this will display in the upstream listing when creating a site. Recommended size is 70x80"><em class="fa fa-info-circle"></em></a> (optional)
- **URL of Upstream Repository**
- **Repository Authentication** <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Private Repositories Only" data-content="Create a dedicated user with read-only access and provide username:password or a token if supported by your repository hosting provider."><em class="fa fa-info-circle"></em></a>
- **Repository Branch** (usually master)
- **Visibility**: Public <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-content="Allow this upstream to be used by any Pantheon user."><em class="fa fa-info-circle"></em></a> or Private <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-content="Restrict access to members of your organization for this upstream."><em class="fa fa-info-circle"></em></a>
- **Connection Mode**  <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-content="Initial connection mode for a new site using this upstream."><em class="fa fa-info-circle"></em></a>: Git or SFTP
- **Framework**: Drupal 6, Drupal 7, Drupal 8, Drupal 8 Backdrop, WordPress, WordPress Multisite

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>You are not able to switch upstreams after creating a site. You will need to export your files, create a new site, and select a new upstream.</p></div>
