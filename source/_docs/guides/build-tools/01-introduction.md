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
image: buildToolsGuide-thumb
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

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
   <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-pr"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Pull Requests</h3></a>
 </div>
 <div id="understand-pr" class="collapse">
   <div class="panel-inner" markdown="1">
    One advantage of managing code this way is that it keeps the change sets (differences) for pull requests as small as possible. If a pull request upgrades several dependencies, only the dependency metadata file will change; the actual code changes in the upgraded dependencies themselves are not shown.

    GitHub pull requests (PRs) are a formalized way of reviewing and merging a proposed set of changes to the source repository. When one member of a development team makes changes to a project, all of the files modified to produce the feature are committed to a separate branch, and that branch becomes the basis for the pull request. GitHub allows other team members to review all of the differences between the new files and their original versions, before merging the PR to accept changes.
    </div>
  </div>
</div>

## Before You Begin

1. Install [Composer](https://getcomposer.org){.external}.
2. Install the most recent release of [Terminus](/docs/terminus/):

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-installer">Copy</button>
      <figure><pre id="terminus-installer"><code class="command bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
    </div>
    
3. [Add an SSH key](/docs/ssh-keys/) within your User Dashboard to enable passwordless access and avoid authentication prompts. Otherwise, provide your Pantheon Dashboard credentials when prompted.

4. [Generate a Machine Token](https://dashboard.pantheon.io/machine-token/create){.external}, then authenticate Terminus:

      <div class="copy-snippet">
        <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-auth">Copy</button>
        <figure><pre id="mac-mt-auth"><code class="command bash" data-lang="bash">terminus auth:login --machine-token=&lsaquo;machine-token&rsaquo;</code></pre></figure>
      </div>

5. Create the `$HOME/.terminus/plugins` directory if it does not already exist:

      <div class="copy-snippet">
        <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-plugin-install-mkdir">Copy</button>
        <figure><pre id="terminus-plugin-install-mkdir"><code class="command bash" data-lang="bash">mkdir -p $HOME/.terminus/plugins</code></pre></figure>
      </div>

6. Install the [Terminus Composer Plugin](https://github.com/pantheon-systems/terminus-composer-plugin){.external}:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#composer-plugin">Copy</button>
      <figure><pre id="composer-plugin"><code class="command bash" data-lang="bash">composer create-project -n -d $HOME/.terminus/plugins pantheon-systems/terminus-composer-plugin:~1</code></pre></figure>
    </div>

7. Install the [Terminus Drupal Console Plugin](https://github.com/pantheon-systems/terminus-drupal-console-plugin){.external}:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#console-plugin">Copy</button>
      <figure><pre id="console-plugin"><code class="command bash" data-lang="bash">composer create-project -n -d $HOME/.terminus/plugins pantheon-systems/terminus-drupal-console-plugin:~1</code></pre></figure>
    </div>

8. Install the [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin){.external}:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#build-tools-plugin">Copy</button>
      <figure><pre id="build-tools-plugin"><code class="command bash" data-lang="bash">composer create-project -n -d $HOME/.terminus/plugins pantheon-systems/terminus-build-tools-plugin:~1</code></pre></figure>
    </div>

9. [Authorize CircleCI on Github](https://github.com/login/oauth/authorize?client_id=78a2ba87f071c28e65bb){.external}.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p markdow="1">If you are redirected to the CircleCI homepage, you have already authorized the service for your GitHub account. Nice! Way to be ahead of the game.</p>
    </div>
