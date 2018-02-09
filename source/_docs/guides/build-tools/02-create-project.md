---
title: Build Tools
subtitle: Create a New Project
anchorid: create-project
layout: guide
type: guide
buildtools: true
generator: pagination
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/create-project/
nexturl: guides/build-tools/new-pr/
previousurl: guides/build-tools/
editpath: build-tools/02-create-project.md
image: buildToolsGuide-thumb
---
In this section we'll use the Terminus Build Tools Plugin to create a new Pantheon Site, a corresponding GitHub repository, and configure CircleCI to run tests.

1. Create a [CircleCI personal API token](https://circleci.com/account/api){.external} and export the value to the `CIRCLE_TOKEN` environment variable (replace `[REDACTED]`):

    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#circle-token">Copy</button>
    <figure><pre id="circle-token"><code class="command bash" data-lang="bash">export CIRCLE_TOKEN=[REDACTED]</code></pre></figure>
    </div>

2. Create a [GitHub personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/){.external} and export the value to the `GITHUB_TOKEN` environment variable (replace `[REDACTED]`):

    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#github-token">Copy</button>
    <figure><pre id="github-token"><code class="command bash" data-lang="bash">export GITHUB_TOKEN=[REDACTED]</code></pre></figure>
    </div>

3. Create a new project (replace `pantheon-d8-composer-project` with the name of your new site):

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#d8-create">Copy</button>
      <figure><pre id="d8-create"><code class="command bash" data-lang="bash">terminus build:project:create d8 pantheon-d8-composer-project</code></pre></figure>
    </div>

    <div class="alert alert-info">
      <h4 class="info">Note</h4>
      <p markdown="1">Pantheon also maintains Composer based examples for [WordPress](https://github.com/pantheon-systems/example-wordpress-composer){.external} and [Drupal 7](https://github.com/pantheon-systems/example-drops-7-composer){.external} that are currently in alpha, requiring `--stability=alpha` in the command line options. While this guide demonstrates Drupal 8, the same workflow can be achieved on all frameworks.</p>
    </div>

    Provide additional information as prompted, such as:

    ![Create Project Prompts](/source/docs/assets/images/pr-workflow/build-env-create-project-prompts.png)

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
        <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#troubleshoot-install"><h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> Troubleshooting</h3></a>
      </div>
      <div id="troubleshoot-install" class="collapse" markdown="1" style="padding:10px;">
      ### Composer Content-Length Mismatch and/or Degraded Mode
      If you encounter an issue such as:

      ```php
      The "https://packagist.org/packages.json" file could not be downloaded: failed to open stream: Operation timed out
      Retrying with degraded mode, check https://getcomposer.org/doc/articles/troubleshooting.md#degraded-mode for more info
      The "https://packagist.org/packages.json" file could not be downloaded: failed to open stream: Operation timed out
      https://packagist.org could not be fully loaded, package information was loaded from the local cache and may be out of date


      [Composer\Downloader\TransportException]
      Content-Length mismatch


      create-project [-s|--stability STABILITY] [--prefer-source] [--prefer-dist] [--repository REPOSITORY] [--repository-url REPOSITORY-URL] [--dev] [--no-dev] [--no-custom-installers] [--no-scripts] [--no-progress] [--no-secure-http] [--keep-vcs] [--no-install] [--ignore-platform-reqs] [--] [<package>] [<directory>] [<version>]

      [error]  Command `composer create-project --working-dir=/private/var/folders/lp/7_1gh83s5mn9lwfjvqqlf1lm0000gn/T/local-sitevPumRP pantheon-systems/example-wordpress-composer pantheon-wp-composer-project -n --stability dev` failed with exit code 1
      ```

     This indicates a network level issue. We recommend contacting your Internet Service Provider (ISP) for support. One way to reduce connection woes is to use a non-standard channel with less activity/noise on wireless modems.

     ### Your requirements could not be resolved to an installable set of packages
     Check the output for the recommended fix. For example, PHP 7.0 is required for WordPress. Once you have resolved the issues as suggested by Composer try the command again.

     ### The site name is already taken on Pantheon
     The following error occurs when running `terminus build:project-create` before authenticating your session with Terminus:

     ```
     BuildToolsCommand.php line 166:  
         The site name exampleuniquesitename is already taken on Pantheon.
     ```

     To resolve, [generate a Machine Token](https://dashboard.pantheon.io/machine-token/create){.external}, then authenticate Terminus and try the build command again:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#mac-mt-auth">Copy</button>
      <figure><pre id="mac-mt-auth"><code class="command bash" data-lang="bash">terminus auth:login --machine-token=&lsaquo;machine-token&rsaquo;</code></pre></figure>
    </div>

     ### Additional Support
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
