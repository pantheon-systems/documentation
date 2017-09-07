---
title: Build Tools
subtitle: Update Your Project
buildtools: true
anchorid: update
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/update/
nexturl: guides/build-tools/extend/
previousurl: guides/build-tools/configure/
editpath: build-tools/05-update.md
---
In this lesson, we'll take a closer look at how to manage code in a Composer workflow.

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
     <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-composer"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Composer</h3></a>
   </div>
   <div id="understand-composer" class="collapse">
     <div class="panel-inner" markdown="1">
    ### Composer Fundamentals
    Composer is a PHP dependency manager that provides an alternative, more modern way to manage the external code used by a WordPress or Drupal site. At it's primary level, Composer needs:

    - A list of dependencies
    - A place to put the dependencies

    Understanding how Composer can be used independent of Drupal or WordPress is a good place to learn more about the general concepts. For a summary of basic usage, see [Composer's own documentation](https://getcomposer.org/doc/01-basic-usage.md){.external}.

    <div class="enablement">
      <h4 class="info" markdown="1">[Automation Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
      <p>Master Composer concepts with help from our experts. Pantheon delivers custom workshops to help development teams master the platform and improve internal DevOps.</p>
    </div>

    ### Dependencies
    Composer encourages a mental model where code not written specifically for a given project is a dependency. Only files unique to the project are tracked as part of the project's main source repository, also referred to as the canonical site repository. Dependencies for WordPress and Drupal include core, plugins, contrib modules, themes, and libraries. A single dependency, such as a theme, is referred to as a package.

    By default, Composer can only see packages listed on The PHP Package Repository which do not include Drupal or WordPress packages. Additional repositories must be configured for Composer to use packages not found in the default repository. Each framework provides it's own respective package repository so dependencies can be managed with Composer:

    - WordPress: [https://wpackagist.org](https://wpackagist.org){.external}
    - Drupal 8: [https://packages.drupal.org/8](https://packages.drupal.org/8){.external}
    - Drupal 7: [https://packages.drupal.org/7](https://packages.drupal.org/7){.external}

    Site's created from Pantheon's example repositories already include the appropriate package repository within the `composer.json` file.
    </div>
  </div>
</div>

## Local Setup
The next section will be done from the command line, to prepare your local:

1. Navigate to the **Code** tab of the GitHub repository, then click **Clone or download** and copy the repository URL:

  ![Clone repository](/source/docs/assets/images/pr-workflow/clone.png)

2. Open a terminal application and clone the GitHub repository (replace `<github-url>`):

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-clone">Copy</button>
      <figure><pre id="git-clone"><code class="command bash" data-lang="bash">git clone &lsaquo;github-url&rsaquo;</code></pre></figure>
    </div>

3. Navigate to the repository's root and export the following environment variables so you can copy the commands used in the next section (replace `pantheon-d8-composer-project`):

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#cd-project">Copy</button>
      <figure><pre id="cd-project"><code class="command bash" data-lang="bash">cd pantheon-d8-composer-project
      export SITE=pantheon-d8-composer-project
      export ENV=pr-slogan</code></pre></figure>
    </div>

4. Install dependencies with Composer:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#composer-install">Copy</button>
      <figure><pre id="composer-install"><code class="command bash" data-lang="bash">composer install</code></pre></figure>
    </div>

## Composer Update
Adopting a Composer workflow means forgoing all other update techniques. The site should *never* receive Pantheon's One-click updates in the Pantheon Site Dashboard and you should no longer use the Drupal Admin interface to update modules, themes, or libraries (or any other method not mentioned). These type of code updates will be done using Composer exclusively going forward.

1. Update Drupal core with Composer:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#composer-update-cmd">Copy</button>
      <figure><pre id="composer-update-cmd"><code class="command bash" data-lang="bash">composer update drupal/core</code></pre></figure>
    </div>
2. Run `git diff composer.lock` to see the updated dependency details:

  ![composer diff core](/source/docs/assets/images/pr-workflow/composer-lock-diff.png)

3. Commit the updated `composer.lock` file and push a new branch up to GitHub, for example:

  ![Stage commit and push new branch](/source/docs/assets/images/pr-workflow/update-drupal-core.png)

4. Create a Pull Request on GitHub, and merge it once you are done testing:

  ![Composer update pr](/source/docs/assets/images/pr-workflow/composer-update-pr.png)

Use this process to update any dependency required by your project's `composer.json` file.
