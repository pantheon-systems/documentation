---
title: Build Tools
subtitle: Introduction
description: Create a site that manages its files using Composer, and uses a GitHub PR workflow with Behat tests run via Circle CI.
tags: [automate]
contributors:
  - greg-1-anderson
  - stevector
  - ataylorme
  - rachelwhitton
layout: guide
type: guide
anchorid: build-tools
buildtools: true
generator: pagination
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/
nexturl: guides/build-tools/create-project/
editpath: build-tools/01-introduction.md
---
This guide describes how to use build tools such as GitHub and CircleCI with Composer to implement a collaborative, team-based Continuous Integration workflow using Pull Requests for Drupal 8 sites on Pantheon. While this guide demonstrates [Drupal 8](https://github.com/pantheon-systems/example-drops-8-composer){.external}, the same workflow can be applied to [WordPress](https://github.com/pantheon-systems/example-wordpress-composer){.external} and [Drupal 7](https://github.com/pantheon-systems/example-drops-7-composer){.external} sites.

<div class="flex-panel-group">
  <div class="flex-panel-item">
    <div class="flex-panel-body">
      <div class="flex-panel-title">
        <h4 class="info" style="margin-top:10px;font-size:larger">GitHub</h3>
        <div class="pantheon-official">
          <img alt="GitHub Logo" src="/source/docs/assets/images/github-logo.svg" class="main-topic-info__plugin-image" style="max-width:40px;margin-bottom:10px!important;">
          <p class="pantheon-official"></p>
        </div>
      </div>
      <p class="topic-info__description" markdown="1">[GitHub](https://github.com){.external} is an online service that provides cloud storage Git repositories that may be cloned and used locally, or edited directly through their web-based management interface. These features are very useful to teams collaborating on a project together.</p>
    </div>
  </div>
  <div class="flex-panel-item">
    <div class="flex-panel-body">
      <div class="flex-panel-title">
        <h4 class="info" style="margin-top:10px;font-size:larger">CircleCI</h3>
        <div class="pantheon-official">
          <img alt="CircleCI Logo" src="/source/docs/assets/images/circleci-logo.svg" class="main-topic-info__plugin-image" style="max-width:40px;margin-bottom:10px!important;">
          <p class="pantheon-official"></p>
        </div>
      </div>
      <p class="topic-info__description" markdown="1">[CircleCI](https://circleci.com){.external} provides hosted services to run automated tests for a project, and GitHub provides an integration to run these tests to whenever a change is submitted. The process of testing each set of changed files prior to merging them into the main branch is called continuous integration.</p>
    </div>
  </div>
  <div class="flex-panel-item">
    <div class="flex-panel-body">
      <div class="flex-panel-title">
        <h4 class="info" style="margin-top:10px;font-size:larger">Composer</h3>
        <div class="pantheon-official">
          <img alt="Composer Logo" src="/source/docs/assets/images/composer-logo.svg" class="main-topic-info__plugin-image" style="max-width:40px;margin-bottom:10px!important;">
          <p class="pantheon-official"></p>
        </div>
      </div>
      <p class="topic-info__description"><a href="/docs/composer/">Composer</a> is a PHP dependency manager that provides an alternative, more modern way to manage the external code used by a project. For example, Composer may be used to install the plugins, modules and themes used by a Drupal or WordPress site.</p>
    </div>
  </div>
</div>

<div class="enablement" markdown="1">
  <h4 class="info" markdown="1">[Automation Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  Master Composer concepts with help from our experts. Pantheon delivers custom workshops to help development teams master the platform and improve internal DevOps.
</div>

## Artifact Deployment
Only files unique to the project are tracked as part of the project's main "source" repository on GitHub, which requires an abstraction layer to compile dependencies and deploy an entire "artifact" to the site repository on Pantheon. The abstraction layer is facilitated by CirlceCI in the Pantheon maintained examples, but the principles are the same for other continuous integration service providers.

Composer is used to fetch dependencies declared by the project as part of a CircleCI build step. This ensures that the final composed build results are installed on Pantheon:

<p class="text-center" markdown="1">![Artifact Deployment](/source/docs/assets/images/artifact-deployment.png)</p>

GitHub's master branch is automatically built and deployed to the Dev environment. Feature branches are automatically built and deployed to individual Multidev environments:

<p class="text-center" markdown="1">![Continuous delivery diagram](/source/docs/assets/images/pr-workflow/github-circle-pantheon.png)</p>

Whenever you commit changes from the Pantheon dashboard, the commit will be reduced to contain only those files that belong in the source repository, and this commit will be pushed back to the canonical repository on GitHub:

<p class="text-center" markdown="1">![Sync commit from Pantheon to GitHub](/source/docs/assets/images/pr-workflow/pantheon-circle-github.png)</p>

GitHub will then start a new CircleCI build, and the build results will once again be pushed to the existing Multidev environment that was created for this branch:

<p class="text-center" markdown="1">![Sync commit from GitHub to Pantheon Multidev](/source/docs/assets/images/pr-workflow/github-circle-multidev.png)</p>

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
     <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-cd"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Continuous Delivery</h3></a>
   </div>
   <div id="understand-cd" class="collapse">
     <div class="panel-inner" markdown="1">
     Continuous delivery requires a consistently clear deployment pipeline from development to production. That is to say, an application must be able to deploy code to production at any given time regardless of current work in progress. Anything that keeps your application from deploying code to production is considered a blocker.

     Production code is tracked by the master branch on GitHub and it is assumed to be production ready. Development work is done on a feature branch first, then proposed to master in the form of a Pull Request so it can be tested and reviewed before it's accepted.
    </div>
   </div>
 </div>


## Before You Begin

1. Install [Composer](https://getcomposer.org){.external}
2. Install the most recent release of [Terminus](/docs/terminus/):

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-installer">Copy</button>
      <figure><pre id="terminus-installer"><code class="command bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
    </div>

3. [Generate a Machine Token](https://dashboard.pantheon.io/machine-token/create){.external}, then authenticate Terminus:

      <div class="copy-snippet">
        <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-auth">Copy</button>
        <figure><pre id="mac-mt-auth"><code class="command bash" data-lang="bash">terminus auth:login --machine-token=&lsaquo;machine-token&rsaquo;</code></pre></figure>
      </div>

4. Install the [Terminus Composer Plugin](https://github.com/pantheon-systems/terminus-composer-plugin){.external}:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#composer-plugin">Copy</button>
      <figure><pre id="composer-plugin"><code class="command bash" data-lang="bash">curl https://github.com/pantheon-systems/terminus-composer-plugin/archive/1.0.0.tar.gz -L | tar -C ~/.terminus/plugins -xvz</code></pre></figure>
    </div>

5. Install the [Terminus Drupal Console Plugin](https://github.com/pantheon-systems/terminus-drupal-console-plugin){.external}:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#console-plugin">Copy</button>
      <figure><pre id="console-plugin"><code class="command bash" data-lang="bash">curl https://github.com/pantheon-systems/terminus-drupal-console-plugin/archive/1.0.2.tar.gz -L | tar -C ~/.terminus/plugins -xvz</code></pre></figure>
    </div>

6. Install the [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin){.external}:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#build-tools-plugin">Copy</button>
      <figure><pre id="build-tools-plugin"><code class="command bash" data-lang="bash">curl https://github.com/pantheon-systems/terminus-build-tools-plugin/archive/1.3.9.tar.gz -L | tar -C ~/.terminus/plugins -xvz</code></pre></figure>
    </div>

7. [Authorize CircleCI on Github](https://github.com/login/oauth/authorize?client_id=78a2ba87f071c28e65bb){.external}.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p markdow="1">If you are redirected to the CircleCI homepage, you have already authorized the service for your GitHub account. Nice! Way to be ahead of the game.</p>
    </div>
