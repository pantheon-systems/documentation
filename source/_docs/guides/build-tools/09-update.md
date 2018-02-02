---
title: Build Tools
subtitle: Update Your Project
buildtools: true
anchorid: update
generator: pagination
survey: true
layout: guide
type: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/update/
previousurl: guides/build-tools/custom-theme/
editpath: build-tools/09-update.md
image: buildToolsGuide-thumb
---
In this lesson, we'll take a closer look at how to update dependencies in a Composer workflow.

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
   <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-composer"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Composer</h3></a>
 </div>
 <div id="understand-composer" class="collapse">
   <div class="panel-inner" markdown="1">
   ## Composer Fundamentals
    {% include("content/composer-fundamentals.html")%}
    <p>Site's created from Pantheon's example repositories already include the appropriate package repository within the <code>composer.json</code> file, such as <a href="https://github.com/pantheon-systems/example-drops-8-composer/blob/master/composer.json#L6-L11" class="external">Drupal 8</a>:<br>
    <pre><code class="hljs json">"repositories": [
        {
          "type": "composer",
          "url": "https://packages.drupal.org/8"
        }
      ],</code></pre>
    </p>
   </div>
 </div>
</div>   


## Update Core
1. Start by creating a new branch based off the tip of master (replace `drupal-8.3.7` according to your current task):

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-branch-update">Copy</button>
      <figure><pre id="git-branch-update"><code class="command bash" data-lang="bash">git checkout -b drupal-8.3.7 master</code></pre></figure>
    </div>


2. Update your project to the current Drupal 8 stable version of core released on drupal.org with Composer:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#composer-update-cmd">Copy</button>
      <figure><pre id="composer-update-cmd"><code class="command bash" data-lang="bash">composer update drupal/core</code></pre></figure>
    </div>

3. Run `git diff composer.lock` to see the updated dependency details:

  ![composer diff core](/source/docs/assets/images/pr-workflow/composer-lock-diff.png)

4. Commit the updated `composer.lock` file and push a new branch up to GitHub, for example (replace `drupal-8.3.7` according to your current task):

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#update-core-commit">Copy</button>
      <figure><pre id="update-core-commit"><code class="command bash" data-lang="bash">git commit -m="Update to Drupal 8.3.7"
      git push origin drupal-8.3.7</code></pre></figure>
    </div>


5. Return to GitHub and compare your feature branch against `master`. You should see all commits made locally here in GitHub. Click **Create Pull Request** and go through your team's standard peer review process.

  ![Composer update pr](/source/docs/assets/images/pr-workflow/composer-update-pr.png)

Use this process to update any dependency required by your project's `composer.json` file. The site should *never* receive Pantheon's One-click updates in the Pantheon Site Dashboard, Drupal's Admin interface, or Drush to update core, as none of these techniques modify the `composer.json` file. You must update core using Composer exclusively.
