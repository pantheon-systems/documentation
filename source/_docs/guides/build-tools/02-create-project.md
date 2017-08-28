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
Setting up multiple distributed services can be complicated, and, at the moment, this can only be done from the command line. Fortunately, the Terminus Build Tools Plugin makes this setup relatively simple.

In this section we'll create a new Pantheon Site, a corresponding GitHub repository, and configure CircleCI to run tests.

1. Create a [GitHub personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) and save the string generated for the next steps.
2. Create a [CircleCI personal API token](https://circleci.com/account/api) and save the string generated for the next steps.
3. Create a new project:

    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#wp" aria-controls="gh" role="tab" data-toggle="tab">WordPress</a></li>
      <li role="presentation"><a href="#d8" aria-controls="bb" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li role="presentation"><a href="#d7" aria-controls="bb" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div markdown="1" role="tabpanel" class="tab-pane active" id="wp">
        <p class="instruction" markdown="1">Replace `my-pantheon-project` with the name of your new site.</p>
        <div class="copy-snippet">
          <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-create">Copy</button>
          <figure><pre id="wp-create"><code class="command bash" data-lang="bash">terminus build-env:create-project wp my-pantheon-project</code></pre></figure>
        </div>
      </div>
      <div markdown="1" role="tabpanel" class="tab-pane" id="d8">
        <p class="instruction" markdown="1">Replace `my-pantheon-project` with the name of your new site.</p>
        <div class="copy-snippet">
          <button class="btn btn-default btn-clippy" data-clipboard-target="#d8-create">Copy</button>
          <figure><pre id="d8-create"><code class="command bash" data-lang="bash">terminus build-env:create-project d8 my-pantheon-project</code></pre></figure>
        </div>
      </div>
      <div markdown="1" role="tabpanel" class="tab-pane" id="d7">
        <p class="instruction" markdown="1">Replace `my-pantheon-project` with the name of your new site.</p>
        <div class="copy-snippet">
          <button class="btn btn-default btn-clippy" data-clipboard-target="#d7-create">Copy</button>
          <figure><pre id="d7-create"><code class="command bash" data-lang="bash">terminus build-env:create-project d7 my-pantheon-project</code></pre></figure>
        </div>
      </div>
    </div>

    The `create-project` command will prompt for any additional information it may need to set up the build workflow, such as:

      - GitHub [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
      - CircleCI [personal API token](https://circleci.com/account/api).
      - Password for the CMS admin account, used to log in to your test environments.
      - The Pantheon team the site should be associated with (recommended).

    Answer the questions when prompted, as shown below:

    ![Create Project Prompts](/source/docs/assets/images/pr-workflow/build-env-create-project-prompts.png)

    You can avoid prompting by providing the necessary information either via [environment variables](https://github.com/pantheon-systems/terminus-build-tools-plugin#credentials) or command line options. Run `terminus help build-env:create-project`, or see the [Terminus Build Tools Plugin project page](https://github.com/pantheon-systems/terminus-build-tools-plugin) for more information.

4. Once the command is finished, use the provided URL to visit your project on GitHub. This page will start off with a README file that is initially blank, save for the project title and three badges:

  ![Initial Project Page](/source/docs/assets/images/pr-workflow/initial-project-page.png)

  The badges on your project page are linked locations you will frequently visit while working on your site:

    - The CircleCI page for your project
    - Your Pantheon dashboard
    - Your test site

  Click on these badges to quickly navigate to the different components used to manage your site. If you click on the CircleCI badge, you can watch your project's initial test run. Once your tests successfully complete, the orange CircleCI "no builds" badge will become a green "passing" badge.
