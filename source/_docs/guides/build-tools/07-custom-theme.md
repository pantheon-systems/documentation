---
title: Build Tools
subtitle: Create a Custom Theme
buildtools: true
anchorid: custom-theme
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/custom-theme/
nexturl: guides/build-tools/custom-block/
previousurl: guides/build-tools/extend/
editpath: build-tools/07-custom-theme.md
---
This page demonstrates how to create a custom theme from the default [Bartik](https://www.drupal.org/project/bartik){.external} theme using Drush Console. For comprehensive documentation on how to create themes for Drupal 8, see [Theming Drupal 8](https://www.drupal.org/docs/8/theming){.external} on drupal.org.

1. Use the `generate:theme` command as shown below to start the process of creating a subtheme:

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

2. Run the following command to open an SFTP session from the command line:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-sftp-connect">Copy</button>
      <figure><pre id="terminus-sftp-connect"><code class="command bash" data-lang="bash">`terminus connection:info $SITE.$ENV --fields='SFTP Command' --format=string`</code></pre></figure>
    </div>

    Download your new custom theme, then close the SFTP session using the `bye` command:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-sftp-get-custom-info">Copy</button>
      <figure><pre id="terminus-sftp-get-custom-info"><code class="sftp-command bash" data-lang="bash">get -r code/web/themes/custom/ web/themes/custom/</code></pre></figure>
    </div>

    ![download custom theme directory](/source/docs/assets/images/pr-workflow/download-custom-themes-dir.png)

3. Run the following to copy the `regions:` section of Bartik's default info file to your new custom theme's info file:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#regions-copy">Copy</button>
      <figure><pre id="regions-copy"><code class="command bash" data-lang="bash">cat web/core/themes/bartik/bartik.info.yml | sed -n -e '/regions:/,$p' >> web/themes/custom/amazing_theme/amazing_theme.info.yml</code></pre></figure>
    </div>

4. Open an SFTP session from the command line again:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-sftp-connect2">Copy</button>
      <figure><pre id="terminus-sftp-connect2"><code class="command bash" data-lang="bash">`terminus connection:info $SITE.$ENV --fields='SFTP Command' --format=string`</code></pre></figure>
    </div>

    Upload your modified `amazing_theme.info.yml` file:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#put-amazing-theme-info">Copy</button>
      <figure><pre id="put-amazing-theme-info"><code class="sftp-command bash" data-lang="bash">put web/themes/custom/amazing_theme/amazing_theme.info.yml code/web/themes/custom/amazing_theme/amazing_theme.info.yml</code></pre></figure>
    </div>

    Copy the logo over from bartik to your custom theme, then close the SFTP session using the `bye` command:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#put-logo">Copy</button>
      <figure><pre id="put-logo"><code class="sftp-command bash" data-lang="bash">put web/core/themes/bartik/logo.svg code/web/themes/custom/amazing_theme/logo.svg</code></pre></figure>
    </div>

5. Create a file named `amazing_theme.libraries.yml` and add the provided content by running the following command:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#create-library">Copy</button>
      <figure><pre id="create-library"><code class="command bash" data-lang="bash">echo "global-styling:
        version: VERSION
        css:
          theme:
            css/main.css: {}" > web/themes/custom/amazing_theme/amazing_theme.libraries.yml</code></pre></figure>
    </div>

    Open an SFTP session from the command line again:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-sftp-connect3">Copy</button>
      <figure><pre id="terminus-sftp-connect3"><code class="command bash" data-lang="bash">`terminus connection:info $SITE.$ENV --fields='SFTP Command' --format=string`</code></pre></figure>
    </div>

    Upload your modified `amazing_theme.libraries.yml` file, then close the SFTP session using the `bye` command:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#put-amazing-library">Copy</button>
      <figure><pre id="put-amazing-library"><code class="sftp-command bash" data-lang="bash">put web/themes/custom/amazing_theme/amazing_theme.libraries.yml code/web/themes/custom/amazing_theme/amazing_theme.libraries.yml</code></pre></figure>
    </div>

6. Create a new `css` directory for your custom theme along with a new file named `main.css` inside it. To test that your theme is working, add some very obvious styling such as an orange border around the content region, shown in the example below:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#create-css-file">Copy</button>
      <figure><pre id="create-css-file"><code class="command bash" data-lang="bash">mkdir web/themes/custom/amazing_theme/css && echo "#content {
        border: 4px solid orange;
      }" > web/themes/custom/amazing_theme/css/main.css</code></pre></figure>
    </div>

    Open an SFTP session from the command line again:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-sftp-connect4">Copy</button>
      <figure><pre id="terminus-sftp-connect4"><code class="command bash" data-lang="bash">`terminus connection:info $SITE.$ENV --fields='SFTP Command' --format=string`</code></pre></figure>
    </div>

    Upload your modified `amazing_theme.libraries.yml` file, then close the SFTP session using the `bye` command:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#put-css-dir">Copy</button>
      <figure><pre id="put-css-dir"><code class="sftp-command bash" data-lang="bash">put -r web/themes/custom/amazing_theme/css/ code/web/themes/custom/amazing_theme/css/</code></pre></figure>
    </div>


7. Use Terminus with Drupal Console and Drush to active your new theme and rebuild the cache:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-drupal-theme-install">Copy</button>
      <figure><pre id="terminus-drupal-theme-install"><code class="command bash" data-lang="bash">terminus drupal $SITE.$ENV -- theme:install --set-default amazing_theme</code></pre></figure>
    </div>

    Visit the site in the web browser, it should reflect the change provided by the custom theme:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#env-view">Copy</button>
      <figure><pre id="env-view"><code class="command bash" data-lang="bash">temrinus env:view $SITE.$ENV</code></pre></figure>
    </div>

    ![Modified css](/source/docs/assets/images/pr-workflow/modified-css.png)

8. You can use the [method described in an earlier lesson](/docs/guides/build-tools/configure/) to export configuration changes made in the last step or you can do it from the command line using Terminus and Drush:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#pathauto-export-config">Copy</button>
      <figure><pre id="pathauto-export-config"><code class="command bash" data-lang="bash">terminus drush $SITE.$ENV -- config-export --yes</code></pre></figure>
    </div>


9. Commit your changes in Pantheon from the command line with Terminus to sync with GitHub:

    <div class="copy-snippet">
      <button class="btn btn-default btn-clippy" data-clipboard-target="#pathauto-export-config-commit">Copy</button>
      <figure><pre id="pathauto-export-config-commit"><code class="command bash" data-lang="bash">terminus env:commit $SITE.$ENV --message="Install and activate custom theme"</code></pre></figure>
    </div>
