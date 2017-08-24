---
title: Build Tools
subtitle: Configure Site via the Admin Interface
buildtools: true
anchorid: configure
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/configure/
nexturl: guides/build-tools/update/
previousurl: guides/build-tools/create-pr/
editpath: build-tools/04-create-pr.md
---
While it is possible to configure your site by editing the exported configuration files, doing so is only convenient for properties whose location and format are already known. For most users, using the Drupal admin interface to set up the site's configuration is much more convenient.

1.  As an illustrative example, we will set the block placements for our example site. As a site administrator, navigate to **Structure** -> **Block layout**. Disable the **Tools** block and move the **Search** block to the header. Save your changes with the **Save blocks** button.

    ![Block placements](/source/docs/assets/images/pr-workflow/block-placements.png)

2.  Once you have made these changes, the configuration settings will be updated in the database; we would like to commit them to our GitHub repository. To do this, it is first necessary to update the configuration yaml files on the filesystem.

    Go to **Configuration** -> **Development** -> **Configuration Synchronization**. Note the warning displayed on this page about modified configuration. This means that your recent configuration changes would be erased if you synchronized your configuration at this time. We want to go the other direction, which we can do by clicking on the **Update** tab. The update function is provided by the `config_direct_save` module, which is installed and enabled by default in the Drupal 8 template project used by the `build-env:create-project` command. From this panel, select the `sync` source and click **Update configuration**:

    ![Update configuration](/source/docs/assets/images/pr-workflow/update-configuration.png)

    Visit your site's Pantheon dashboard, and go to the `pr-slogan` multidev page. Note that there are a handful of modified files here ready to be committed now. Type in a brief description of what you changed, and click **Commit**.

Once the Pantheon dashboard finishes committing the code, visit your project page on GitHub. Go to your `slogan` pull request. Note that your commit has been added to this pull request, and the CircleCI status indicates that your tests are running. Whenever you commit files from the Pantheon dashboard, the commit will be reduced to contain only those files that belong in the GitHub repository, and this commit will be pushed back to the canonical repository. GitHub will then start a new CircleCI build, and the build results will once again be pushed to the existing multidev environment that was created for this branch. You may continue working in this environment, making multiple changes, and committing updates whenever you would like your tests to run again.
