---
title: Build Tools
subtitle: Create a New Project
anchorid: create-project
layout: guide
buildtools: true
generator: pagination
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/create-project/
nexturl: guides/build-tools/create-pr/
previousurl: guides/build-tools/
editpath: build-tools/02-create-project.md
---
In this section we'll use the Terminus Build Tools Plugin to create a new Pantheon Site, a corresponding GitHub repository, and configure CircleCI to run tests.

1. Create a [CircleCI personal API token](https://circleci.com/account/api){.external} and export the value to the `CIRCLE_TOKEN` environment variable (replace `[REDACTED]`):

    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#circle-token">Copy</button>
    <figure><pre id="circle-token"><code class="command bash" data-lang="bash">export CIRCLE_TOKEN=[REDACTED]</code></pre></figure>
    </div>

2. Create a [GitHub personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/){.external} and export the value to the `CIRCLE_TOKEN` environment variable (replace `[REDACTED]`):

    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#github-token">Copy</button>
    <figure><pre id="github-token"><code class="command bash" data-lang="bash">export GITHUB_TOKEN=[REDACTED]</code></pre></figure>
    </div>

3. Create a new project:

    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7 <span class="label label-info">Alpha</span></a></li>
      <li role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress <span class="label label-info">Alpha</span></a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div markdown="1" role="tabpanel" class="tab-pane active" id="d8">
        <p class="instruction" markdown="1">Replace `pantheon-d8-composer-project` with the name of your new site.</p>
        <div class="copy-snippet">
          <button class="btn btn-default btn-clippy" data-clipboard-target="#d8-create">Copy</button>
          <figure><pre id="d8-create"><code class="command bash" data-lang="bash">terminus build:project:create d8 pantheon-d8-composer-project</code></pre></figure>
        </div>
      </div>
      <div markdown="1" role="tabpanel" class="tab-pane" id="d7">
        <p class="instruction" markdown="1">Replace `pantheon-d7-composer-project` with the name of your new site:</p>
        <div class="copy-snippet">
          <button class="btn btn-default btn-clippy" data-clipboard-target="#d7-create">Copy</button>
          <figure><pre id="d7-create"><code class="command bash" data-lang="bash">terminus build:project:create d7 pantheon-d7-composer-project --stability=alpha</code></pre></figure>
        </div>
      </div>
      <div markdown="1" role="tabpanel" class="tab-pane" id="wp">
        <p class="instruction" markdown="1">Replace `pantheon-wp-composer-project` with the name of your new site:</p>
        <div class="copy-snippet">
          <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-create">Copy</button>
          <figure><pre id="wp-create"><code class="command bash" data-lang="bash">terminus build:project:create wp pantheon-wp-composer-project --stability=alpha</code></pre></figure>
        </div>
      </div>
    </div>

    Provide additional information as prompted, such as:

    ![Create Project Prompts](/source/docs/assets/images/pr-workflow/build-env-create-project-prompts.png)

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <div markdown="1">
    Pantheon's composer based example repositories are maintained and supported on GitHub. After browsing existing issues, report errors in the appropriate repository's issue queue:

      * [Drupal 8](https://github.com/pantheon-systems/example-drops-8-composer/issues){.external}
      * [Drupal 7 (Alpha)](https://github.com/pantheon-systems/example-drops-7-composer/issues){.external}
      * [WordPress (Alpha)](https://github.com/pantheon-systems/example-wordpress-composer/issues){.external}
    </div>
    </div>

4. Once your site is ready, the URL to your project page will be printed to your terminal window. Copy this address and paste it into a browser to visit your new project on GitHub:

  ![Initial Project Page](/source/docs/assets/images/pr-workflow/initial-project-page.png)

  The badges on your project page provide quick access to the different components used to manage your site:

    - The CircleCI page for your project
    - Your Pantheon dashboard
    - Your test site

  If you click on the CircleCI badge, you can watch your project's initial test run. Once your tests successfully complete, the orange CircleCI "no builds" badge will become a green "passing" badge:

  ![Passing Project Page](/source/docs/assets/images/pr-workflow/passing-project-page.png)
