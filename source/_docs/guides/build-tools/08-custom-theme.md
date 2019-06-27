---
title: Build Tools
subtitle: Create a Custom Theme
description: In step eight of the Build Tools guide, learn how to create a custom theme as part of the build tooks workflow.
buildtools: true
anchorid: custom-theme
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/custom-theme/
nexturl: guides/build-tools/update/
previousurl: guides/build-tools/merge/
editpath: build-tools/08-custom-theme.md
image: buildToolsGuide-thumb
---
This lesson demonstrates how to create a custom theme from the default [Bartik](https://www.drupal.org/project/bartik){.external} theme using the Terminus Drush Console plugin. For comprehensive documentation on how to create themes for Drupal 8, see [Theming Drupal 8](https://www.drupal.org/docs/8/theming){.external} on drupal.org.

1. Start by creating a new branch based off the tip of master, then push it up to GitHub:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-branch">Copy</button>
      <figure><pre id="git-branch"><code class="command bash" data-lang="bash">git checkout -b custom-theme master
      git push origin custom-theme</code></pre></figure>
    </div>

2. Export local environment variables to define your site name and Multidev environment to easily copy and paste example commands in the next sections (replace `pantheon-d8-composer-project`):

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#export-var1">Copy</button>
      <figure><pre id="export-var1"><code class="command bash" data-lang="bash">export SITE=pantheon-d8-composer-project
      export ENV=pr-custom-t</code></pre></figure>
    </div>


3. Wait for CircleCI to build a new Pantheon Multidev environment (`pr-custom-t`), then use the `generate:theme` command as shown below to start the process of creating a subtheme:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#drush-generate-theme">Copy</button>
      <figure><pre id="drush-generate-theme"><code class="command bash" data-lang="bash">terminus drupal $SITE.$ENV -- generate:theme</code></pre></figure>
    </div>

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
         <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-drupal-console"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Drupal Console Generate Theme</h3></a>
       </div>
       <div id="understand-drupal-console" class="collapse">
         <div class="panel-inner" markdown="1">
        Drupal Console will ask a series of questions about your theme. For many of them you can use the default value by just hitting **Enter**. Provide additional information as prompted, such as:

          * Theme: Amazing Theme
          * Base theme: bartik
          * Enter `no` to generate theme regions and theme breakpoints
          * Type `yes` when asked to confirm generation of the theme

        ![Drupal console generate theme](/source/docs/assets/images/pr-workflow/drupal-console-generate-theme.png)

        Once you do this, the files for your new theme will be written to the directory `code/web/themes/custom/amazing_theme` on the Pantheon Multidev environment. If you gave your theme a different name, replace `amazing_theme` with the appropriate name for your theme.
        </div>
        </div>
      </div>

4. Commit theme files generated in the last command to the Multidev environment, either from the Site Dashboard or from the command line. We don't _need_ this particular commit to be built by CircleCI, so we'll add `[ci skip]` to the commit message to skip:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-commit-template">Copy</button>
      <figure><pre id="terminus-commit-template"><code class="command bash" data-lang="bash">terminus env:commit $SITE.$ENV --message="Generate subtheme files [ci skip]"</code></pre></figure>
    </div>

5. Pull down your last commit from GitHub to your local:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#git-pull">Copy</button>
      <figure><pre id="git-pull"><code class="command bash" data-lang="bash">git pull origin custom-theme</code></pre></figure>
    </div>


6. Run the following command to copy the `regions:` section of Bartik's default info file to your new custom theme's info file:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#regions-copy">Copy</button>
      <figure><pre id="regions-copy"><code class="command bash" data-lang="bash">cat web/core/themes/bartik/bartik.info.yml | sed -n -e '/regions:/,$p' >> web/themes/custom/amazing_theme/amazing_theme.info.yml</code></pre></figure>
    </div>

7. Copy the logo over from Bartik to your custom theme:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#put-logo">Copy</button>
      <figure><pre id="put-logo"><code class="command bash" data-lang="bash">cp web/core/themes/bartik/logo.svg web/themes/custom/amazing_theme/logo.svg</code></pre></figure>
    </div>

8. Create a file named `amazing_theme.libraries.yml` and add the provided content:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#create-library">Copy</button>
      <figure><pre id="create-library"><code class="command bash" data-lang="bash">echo "global-styling:
        version: VERSION
        css:
          theme:
            css/main.css: {}" > web/themes/custom/amazing_theme/amazing_theme.libraries.yml</code></pre></figure>
    </div>

9. Create a new `css` directory for your custom theme along with a new file named `main.css` inside it. To test that your theme is working, add some very obvious styling such as an orange border around the content region:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#create-css-file">Copy</button>
      <figure><pre id="create-css-file"><code class="command bash" data-lang="bash">mkdir web/themes/custom/amazing_theme/css && echo "#content {
        border: 4px solid orange;
      }" > web/themes/custom/amazing_theme/css/main.css</code></pre></figure>
    </div>


10. Commit changes to your custom theme and push up to GitHub:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#commit-all-custom-theme">Copy</button>
      <figure><pre id="commit-all-custom-theme"><code class="command bash" data-lang="bash">git commit -m="Create amazing theme css and library files"
      git push origin custom-theme</code></pre></figure>
    </div>

11. Once the build finishes from the last step, active your new theme and rebuild the cache:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-drupal-theme-install">Copy</button>
      <figure><pre id="terminus-drupal-theme-install"><code class="command bash" data-lang="bash">terminus drupal $SITE.$ENV -- theme:install --set-default amazing_theme</code></pre></figure>
    </div>

    Visit the site in the web browser, it should reflect the change provided by the custom theme:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#env-view">Copy</button>
      <figure><pre id="env-view"><code class="command bash" data-lang="bash">terminus env:view $SITE.$ENV</code></pre></figure>
    </div>

    ![Modified css](/source/docs/assets/images/pr-workflow/modified-css.png)

12. You can use the [method described in an earlier lesson](/docs/guides/build-tools/configure/) to export configuration changes made in the last step or you can do it from the command line using Terminus and Drush:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#pathauto-export-config">Copy</button>
      <figure><pre id="pathauto-export-config"><code class="command bash" data-lang="bash">terminus drush $SITE.$ENV -- config-export --yes</code></pre></figure>
    </div>


13. Commit your changes in Pantheon from the command line with Terminus to sync with GitHub:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#pathauto-export-config-commit">Copy</button>
      <figure><pre id="pathauto-export-config-commit"><code class="command bash" data-lang="bash">terminus env:commit $SITE.$ENV --message="Activate new custom theme"</code></pre></figure>
    </div>

14. Return to GitHub and compare the `custom-theme` branch against `master`. You should see a few commits that are able to be merged. Click **Create Pull Request** and go through your team's standard peer review process.
