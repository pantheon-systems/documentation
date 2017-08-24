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

A custom theme is the most convenient way to add css styles or alter the markup produced by modules. Most Drupal sites will have a custom theme to differentiate the appearance of the site. For comprehensive documentation on how to create themes for Drupal 8, see [Theming Drupal 8](https://www.drupal.org/docs/8/theming) on drupal.org.

A simple theme may be created quite easily using Drupal Console. The example below creates a subtheme of [Bartik](https://www.drupal.org/project/bartik) to allow for simple css changes for demonstration purposes. Note that usually, themes will subclass either `classy` or `stable`, which provide a blank slate to start from.

1.  Run the `generate:theme` command as shown below to start the process of creating a subtheme.

    ```
    terminus drupal $SITE.$ENV -- generate:theme
    ```
    Drupal Console will ask a series of questions about your theme. For many of them you can use the default value by just hitting **Enter**. Answer these quesions as follows:

    - Theme: Amazing Theme
    - Base theme: bartik
    - Enter 'no' to generate theme regions and theme breakpoints

    Type `yes` when asked to confirm generation of the theme. Once you do this, the files for your new theme will be written to the directory `code/web/themes/custom/amazing_theme`. If you gave your theme a different name, replace `amazing_theme` with the appropriate name for your theme.

2.  Use an SFTP client to access the generated theme files in [Pantheon's on-server development mode](https://pantheon.io/docs/sftp/). Find the file `code/web/core/theme/bartik/bartik.info.yml`, and open it in an editor. Copy the `regions:` section, and paste it into the file `code/web/themes/custom/amazing_theme/amazing_theme.info.yml`. Optionally, you might also want to copy the file `code/web/core/theme/bartik/logo.svg` into your theme folder.

3.  In your new theme's directory, create a file named `amazing_theme.libraries.yml`, and put the following contents in it:

    ```
    global-styling:
      version: VERSION
      css:
        theme:
          css/main.css: {}
    ```
4.  Create a folder named `css` in your theme directory and create a file named `main.css` inside it. To test that your theme is working, add some very obvious styling such as the red border around the content region shown in the example below:

    ```
    #content {
      border: 4px solid red;
    }
    ```

    Remember to upload your updated files back to the server over SFTP.

5.  Use Terminus with Drupal Console and Drush to active your new theme and rebuild the cache:

    ```
    terminus drupal $SITE.$ENV -- theme:install --set-default amazing_theme
    ```

    When you view your site in the web browser, it should reflect the change provided by the custom theme.

    ![Modified css](/source/docs/assets/images/pr-workflow/modified-css.png)

6.  Export your configuration, and visit your multidev Site dashboard and commit your changes.
