---
title: Create a Custom Upstream
description: Add and test a custom distribution of WordPress or Drupal on the Pantheon website management platform.
tags: [manage]
categories: [manage]
---
Create a custom distribution of WordPress or Drupal and add it to the Pantheon platform. This will enable users of the affiliated organization to create sites using a specialized codebase as a starting point.

<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3>
<p>Custom upstreams are available to the "Partner" and "Strategic Partner" tiers in Pantheon's Partner program. <a href="/docs/organizations/#create-an-organization">Create your agency organization</a> to get started and see our <a href="https://pantheon.io/sites/default/files/Partner_Program_Guide_2015.pdf">Partner Program Guide</a> for information on how to advance to Partner tiers.</p></div>

## Create a Remote Repository

Create a remote repository and clone it locally, then pull the applicable Pantheon compatible upstream:
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li id="d8tab" role="presentation" class="active"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li id="d7tab" role="presentation" class="active"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li id="d6tab" role="presentation" class="active"><a href="#d6" aria-controls="d6" role="tab" data-toggle="tab">Drupal 6</a></li>
  <li id="wptab" role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <li id="distributiontab" role="presentation"><a href="#distribution" aria-controls="distribution" role="tab" data-toggle="tab">Public Drupal Distribution Examples</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">

  <!-- Drupal Content -->
  <div role="tabpanel" class="tab-pane active" id="d8">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-drops-8"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="git-pull-drops-8"><code class="command nohighlight" data-lang="bash">git pull git://github.com/pantheon-systems/drops-8.git master</code></pre></figure>
    </div>
  </div>
  
  <div role="tabpanel" class="tab-pane active" id="d7">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-drops-7"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="git-pull-drops-7"><code class="command nohighlight" data-lang="bash">git pull git://github.com/pantheon-systems/drops-7.git master</code></pre></figure>
    </div>
  </div>
  
  <div role="tabpanel" class="tab-pane active" id="d6">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-drops-6"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="git-pull-drops-6"><code class="command nohighlight" data-lang="bash">git pull git://github.com/pantheon-systems/drops-6.git master</code></pre></figure>
    </div>
  </div>

  <div role="tabpanel" class="tab-pane active" id="wp">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-wp"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="git-pull-wp"><code class="command nohighlight" data-lang="bash">git pull git://github.com/pantheon-systems/WordPress.git master</code></pre></figure>
    </div>
  </div>
  
  <div role="tabpanel" class="tab-pane active" id="distribution">
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-distribution-openatrium"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="git-pull-distribution-openatrium"><code class="command nohighlight" data-lang="bash">git pull git://github.com/phase2/openatrium-drops-7.git master</code></pre></figure>
    </div>
    <p>Or:</p>
    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull-distribution-panopoly"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
      <figure><pre id="git-pull-distribution-panopoly"><code class="command nohighlight" data-lang="bash">git pull git://github.com/populist/panopoly-drops-7.git master</code></pre></figure>
    </div>
  </div>
<!-- end tab-content -->
</div>

## Add Your Code

Follow conventions for using the `/profiles` directory in Drupal. With WordPress, you can add plugins and themes to their normal locations.

<div class="alert alert-danger"><h3 class="info">Warning</h3><p>Your Upstream must not contain the tags <code>pantheon_test_n</code> or <code>pantheon_live_n</code>. Pantheon site repositories add these tags when you deploy code to Test and Live environments, and the platform will recognize and automatically deploy code at the tagged commit to those environments immediately, every time you create a site with the upstream.</p></div>

Push the repository to your upstream's remote location.

```bash
git push origin master
```

## Test Your Upstream

### Create the Testing Site

Create a vanilla Drupal or WordPress site associated with your partner organization so you can test the upstream using [Terminus](/docs/terminus/):

```bash
terminus site:create <site> <label> <upstream> --org=<org>
```

[Clone the Pantheon repository](/docs/git/#clone-your-site-codebase):

```bash
git clone ssh://codeserver.dev.$PUUID@codeserver.dev.$PUUID.drush.in:2222/~/repository.git machine-name
```

Add code from your remote upstream repository:

```bash
git pull git://github.com/organization/upstream.git master
```

Push back to Pantheon:

```bash
git push origin master
```

### Testing

#### Complete Site Installation

Visit the Development site URL and complete the site installation process to make sure your distribution installs cleanly.

Testers might find it helpful to use the wipe functionality in the Database / Files tab to easily run through the install process multiple times:
```bash
terminus env:wipe <site>.<env>
```


#### Acceptance Tests

Run your automated acceptance tests, using behat, casper.js, or by manually executing user stories.

## Update and Provide Pantheon with Read Access

When testing is complete, merge any outstanding pull requests into the master branch or push to the branch you want Pantheon to clone and pull updates from. Upstreams can be public or private repositories, but this cannot change after sites are created from it.
<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3>
  <ul>
    <li>For private repositories, create a dedicated user with read-only access to the repository. The password should only contain alphanumeric characters.</li>
    <li>For private GitLab repositories, please ensure the user has the "reporter" permissions level.</li>
  </ul>
</div>

## Submit Product Information

After you have a distribution that works on Pantheon, [contact support](/docs/getting-support) with the subject: "Product submission for [organization]" and include the following information about the distribution:

- Name
- Upstream URL:
 - Private repository URLs must follow the pattern `https://username:password@host.tld/organization/repository-name.git` (Do not use an email address in place of the username). Tokens may be used instead of a username and password if supported by your repository hosting provider. For example, private repositories hosted with GitHub can use [personal access tokens](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) to replace `username:password@github.com` with `personal_access_token@github.com`.
 - Public repository URLs do not require the `username:password@` portion of the above example URL.
- Upstream Branch (usually master)
- If the upstream repository is public or private
- Description (< 200 characters, basic HTML allowed)
- Logo (70x80)
- Default connection mode (SFTP or Git)
- Product author name and URL
- Supporting information (< 200 characters, basic HTML allowed) i.e. drupal.org issue queue, support contacts, website
- Links to evidence of testing on Pantheon. This should include the testing site, test files within the repository, and test reports.

<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3>
<p>You are not able to switch upstreams after creating a site. You will need to export your files, create a new site, and select a new upstream.</p></div>

Public and Organizational distributions must also provide a promotional screenshot for the public installation page.

As part of a unified workflow, new Pantheon users will create an account, name their site, and then go to the installation page of the distribution.
