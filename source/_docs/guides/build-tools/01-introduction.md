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
This guide describes how to use build tools such as GitHub and CircleCI with Composer to implement a collaborative, team-based Continuous Integration workflow using pull requests for WordPress, Drupal 8, and Drupal 7 sites on Pantheon.

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

<div class="enablement">
  <a href="https://pantheon.io/agencies/learn-pantheon?docs"><h4 class="info">Get DevOps Training</h4></a>
  <p>Optimize your dev team and streamline internal workflows. Pantheon delivers custom workshops to help development teams master our platform and improve their internal DevOps.</p>
</div>

## Source and Artifact Workflow
Only files unique to the project are tracked as part of the project's main "source" repository on GitHub, which requires an abstraction layer to compile dependencies and deploy an entire "artifact" to the site repository on Pantheon. The abstraction layer is facilitated by CirlceCI in the Pantheon maintained examples, but the principles are the same for other continuous integration service providers.

Composer is used to fetch dependencies declared by the project as part of a CircleCI build step. This ensures that the final composed build results are installed on Pantheon:

![Artifact Deployment](/source/docs/assets/images/artifact-deployment.png)

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
