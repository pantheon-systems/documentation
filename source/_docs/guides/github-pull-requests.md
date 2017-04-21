---
title: Using GitHub Pull Requests with Composer on Pantheon
description: Use GitHub and Composer to manage modules and other dependencies for Drupal 8 sites on Pantheon.
tags: [workflow]
categories: [drupal8]
contributors:
  - greg-1-anderson
  - stevector
---

This guide describes how to use GitHub and Circle CI with Composer to implement a collaborative team-based Continuous Integration workflow using pull requests for a Drupal 8 site on Pantheon.

<div class="row">
  <div style="margin-bottom:30px;" class="col-md-4">
    <div class="plugin-dir">
      <div class="pantheon-official">
        <div class="main-topic-info__plugin-image" style="background-image:url(/source/docs/assets/images/github-logo.svg)"></div>
        <p>GitHub</p>
      </div>
      <div class="terminus-plugin">
        <h3 class="plugin-title">GitHub</h3>
          <p class="topic-info__description"><a href="https://github.org">GitHub</a> is an online service that provides cloud storage Git repositories that may be cloned and used locally or edited directly through their web-based management interface. These features are very useful to teams collaborating on a project together.</p>
      </div>
    </div>
  </div>
  <div style="margin-bottom:30px;" class="col-md-4">
    <div class="plugin-dir">
      <div class="pantheon-official">
        <div class="main-topic-info__plugin-image" style="background-image:url(/source/docs/assets/images/circleci-logo.svg)"></div>
        <p>Circle CI</p>
      </div>
      <div class="terminus-plugin">
        <h3 class="plugin-title">Circle CI</h3>
        <p class="topic-info__description"><a href="https://circleci.com">Circle CI</a> provides hosted services to run automated tests for a project, and GitHub provides an integration to run these tests to whenever a change is submitted. The process of testing each set of changed files prior to merging them into the main branch is called continuous integration.</p>
      </div>
    </div>
  </div>
  <div style="margin-bottom:30px;" class="col-md-4">
  <div class="plugin-dir">
      <div class="pantheon-official">
        <div class="main-topic-info__plugin-image" style="background-image:url(/source/docs/assets/images/composer-logo.svg)"></div>
        <p>Composer</p>
      </div>
      <div class="terminus-plugin">
          <h3 class="plugin-title">Composer</h3>
          <p class="topic-info__description"><a href="https://getcomposer.org">Composer</a> is a PHP dependency manager that provides an alternative, more modern way to manage the external code used by a project. For example, Composer may be used to install the modules and themes used by a Drupal site.</p>
      </div>
    </div>
  </div>
</div>

*Pull requests* are a formalized way of reviewing and merging a proposed set of changes to a codebase. When one member of a development team makes changes to a project, all of the files modified to produce the feature are committed to a separate branch, and that branch becomes the basis for the pull request. GitHub allows other team members to review all of the differences between the new files and their original versions, before *merging* the pull request.

It is also common to set up automated tests to confirm that the project is working as expected; when tests are available, GitHub will run them and display the results of the tests with the pull request. Working on projects with comprehensive tests increases the development team's confidence that submitted pull requests will work correctly when they are integrated into the main build.

When using GitHub and Composer to manage a Drupal site, only those files unique to the project are part of the project's main repository. Composer is used to fetch the external code needed by the project; a process running on Circle CI executes Composer, and ensures that the final composed build results are installed on Pantheon:

![Artifact Deployment](/source/docs/assets/images/artifact-deployment.png)

One advantage of managing code this way is that it keeps the change sets (differences) for pull requests as small as possible. If a pull request upgrades several external projects, only the external dependency metadata file will change; the actual code changes in the upgraded projects themselves are not shown.

Generally, use of Composer is optional; however, some Drupal modules, such as the Address module require the use of Composer. And if a site needs just one module that requires Composer, then it should manage all of its modules with Composer.

## Before You Begin

1.  To prepare your system for local development, install:

    - [Composer](https://getcomposer.org).
    - [Terminus](/docs/terminus/install/).
    - The [Terminus Composer Plugin](https://github.com/pantheon-systems/terminus-composer-plugin#installation).
    - The [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin#installation).

<br>
2.  Generate a [machine token](/docs/machine-tokens/) and [log in with Terminus](/docs/terminus/install/#authenticate).

## Set Up a New Project

Setting up multiple distributed services can be complicated, and, at the moment, this can only be done from the command line. Fortunately, the Terminus Build Tools Plugin makes this setup relatively simple.

In this section we'll create a new Pantheon Site, a corresponding GitHub repository, and configure CircleCI to run tests.

1.  To begin, create a new project:

    ```bash
    terminus build-env:create-project my-pantheon-project
    ```
Replace `my-pantheon-project` with the name of your new site.

2.  The `create-project` command will prompt for any additional information it may need to set up the build workflow. The required information needed includes:

    - GitHub [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
    - Circle CI [personal API token](https://circleci.com/account/api).
    - Password for the CMS admin account, used to log in to your test environments.
    - The Pantheon team the site should be associated with (recommended).

    Answer the questions when prompted, as shown below:

    ![Create Project Prompts](/source/docs/assets/images/pr-workflow/build-env-create-project-prompts.png)

    You can avoid prompting by providing the necessary information either via [environment variables](https://github.com/pantheon-systems/terminus-build-tools-plugin#credentials) or command line options. Run `terminus help build-env:create-project`, or see the [Terminus Build Tools Plugin project page](https://github.com/pantheon-systems/terminus-build-tools-plugin) for more information.

    Once you have provided the required information, the rest of the process is automatic. Once your site is ready, the URL to your project page on GitHub will be printed to your terminal window. Copy this address and paste it into a browser to visit your new project.

## Your Project Page

Your project page will start off with a README file that is initially blank, save for the project title and three badges:

![Initial Project Page](/source/docs/assets/images/pr-workflow/initial-project-page.png)

The badges on your project page are linked to locations you will frequently visit while working on your site.

- The Circle CI page for your project
- Your Pantheon dashboard
- Your test site

Click on these badges to quickly navigate to the different components used to manage your site. If you click on the Circle CI badge, you can watch your project's initial test run. Once your tests successfully complete, the orange Circle CI "no tests" badge will become a green "passing" badge.

## Create a Pull Request

When using the Composer pull request workflow, you should never modify your dev environment. Always begin by creating a new pull request to work in. This can be done easily from GitHub, as described below. Presently, there is no way to create a pull request from the Pantheon dashboard.

1.  From your GitHub project page, click on the 'config' directory. Find the file named `system.site.yml`, click on it, and use the edit pencil to open an editor:

    ![system.site.yml Configuration](/source/docs/assets/images/pr-workflow/system-site-config.png)

2.  change the `slogan` to something inspiring:

    ![Edit slogan](/source/docs/assets/images/pr-workflow/edit-slogan.png)

3.  Once you are finished editing the configuration file, describe the change you made in the "Commit Changes" area. Then, click on the radio button to create a new branch and give it a short name, like `slogan`. Click on `Commit Changes`:

    ![Create slogan branch](/source/docs/assets/images/pr-workflow/create-slogan-branch.png)

4.  On the pull request page, click on `Create pull request`.

    ![Slogan pull request](/source/docs/assets/images/pr-workflow/slogan-pull-request.png)

    As soon as you commited your change to a new branch, Circle CI built a new multidev environment and began installing a site that you can use to preview the change. Once the multidev environment has been created, the build script will add a comment to the commit with links to the dashboard panel for the environment, and to the test site created on Pantheon. The pull request page conveniently shows the messages from each commit on the branch:

    ![Passed pull request](/source/docs/assets/images/pr-workflow/slogan-pr-starting.png)

5.  Click on the **Visit Site** button and you will be brought to the test site. You can log on to the admin account for this site using the password you provided to the `build-env:create-project` command.

    ![Site initial login](/source/docs/assets/images/pr-workflow/pr-slogan-site.png)

    This site will persist for as long as the branch exists.

## Configure Your Site Through Drupal's Admin Interface

While it is possible to configure your site by editing the exported configuration files, doing so is only convenient for properties whose location and format are already known. For most users, using the Drupal admin interface to set up the site's configuration is much more convenient.

1.  As an illustrative example, we will set the block placements for our example site. As a site administrator, navigate to **Structure** -> **Block layout**. Disable the **Tools** block and move the **Search** block to the header. Save your changes with the **Save blocks** button.

    ![Block placements](/source/docs/assets/images/pr-workflow/block-placements.png)

2.  Once you have made these changes, the configuration settings will be updated in the database; we would like to commit them to our GitHub repository. To do this, it is first necessary to update the configuration yaml files on the filesystem.

    Go to **Configuration** -> **Development** -> **Configuration Synchronization**. Note the warning displayed on this page about modified configuration. This means that your recent configuration changes would be erased if you synchronized your configuration at this time. We want to go the other direction, which we can do by clicking on the **Update** tab. The update function is provided by the `config_direct_save` module, which is installed and enabled by default in the Drupal 8 template project used by the `build-env:create-project` command. From this panel, select the `sync` source and click **Update configuration**:

    ![Update configuration](/source/docs/assets/images/pr-workflow/update-configuration.png)

    Visit your site's Pantheon dashboard, and go to the `pr-slogan` multidev page. Note that there are a handful of modified files here ready to be committed now. Type in a brief description of what you changed, and click **Commit**.

Once the Pantheon dashboard finishes committing the code, visit your project page on GitHub. Go to your `slogan` pull request. Note that your commit has been added to this pull request, and the Circle CI status indicates that your tests are running. Whenever you commit files from the Pantheon dashboard, the commit will be reduced to contain only those files that belong in the GitHub repository, and this commit will be pushed back to the canonical repository. GitHub will then start a new Circle CI build, and the build results will once again be pushed to the existing multidev environment that was created for this branch. You may continue working in this environment, making multiple changes, and committing updates whenever you would like your tests to run again.

## Update your Project

When using the Composer workflow, you should *never* use the Pantheon dashboard to update changes from your upstream, nor should you ever merge code from one environment to another. All code updates will be done using Composer. Composer commands (e.g. `composer update`) may be run directly against your Pantheon multidev environments using the Terminus Composer plugin.

1.  Use the following command, replacing `my-pantheon-project` with your site name, and `pr-slogan` with the branch name (if different):

    ```bash
    terminus composer my-pantheon-project.pr-slogan --update
    ```

    The example below shows a site that was installed with Drupal 8.3.0, and updated to Drupal 8.3.1 after that version was released using Composer.

    ![Update configuration](/source/docs/assets/images/pr-workflow/composer-update.png)

2.  Visit your Pantheon dashboard and commit your changes:

    ![Commit updated files](/source/docs/assets/images/pr-workflow/commit-composer-update.png)

## Add a New Module

In this workflow, Composer should also always be used to install new modules and themes on your site. Never use the Drupal **Extend** -> **Install new module** feature, nor should you use `drush pm-download`, as neither of these techniques modify the `composer.json` file, which means that modules added this way will disappear the next time the build artifacts are pushed to your Pantheon multidev environment.

1.  In this example, we'll install [Pathauto](https://www.drupal.org/project/pathauto) on a Pantheon multidev environment using the Terminus Composer Plugin.

    ```bash
    terminus composer my-pantheon-project.pr-slogan -- require drupal/pathauto
    ```

    Note that the dependencies of pathauto, token and ctools, are also installed:

    ![Composer require pathauto](/source/docs/assets/images/pr-workflow/composer-require-pathauto.png)

2.  You can now visit the **Extend** page in the Drupal admin interface to enable pathauto. This operation may also be done on the command line using Drush:

    ```bash
    terminus drush my-pantheon-project.pr-slogan -- pm-enable pathauto --yes
    ```

3.  In Drupal 8, the set of enabled modules is also part of the exportable configuration set. That means we can track enabled modules in Composer with the  **Update** tab in the **Configuration Synchronization** section of the Drupal admin interface, as we did in step 2 of the [Configure Your Site Through Drupal's Admin Interface](#configure-your-site-through-drupal%27s-admin-interface) section. Alternately, this same operation may be done from the command line using Terminus and Drush:

    ```bash
    terminus drush my-pantheon-project.pr-slogan -- config-export --yes
    ```

4.  You can also commit your changes from the command line with Terminus:

    ```bash
    terminus env:commit my-pantheon-project.pr-slogan --message="Install and enable pathauto"
    ```

    The information needed to install and enable pathauto and its dependencies is now committed to your GitHub repository. The modules sources themselves, however, will not be part of this commit.

## Create a Custom Theme

Most Drupal sites will have a custom theme. This is how the appearance of a Drupal site is customized.

Use Drupal Console to create a new theme.
```
terminus drupal my-pantheon-project.pr-slogan -- generate:theme
```
Answer a bunch of questions.

Open up a generated .css file using SFTP mode.

Make a minor change.
```
terminus drush my-pantheon-project.pr-slogan -- cache-rebuild
```
See the change on your test site.

Visit your Pantheon dashboard and commit your change.

Maybe link to another page on LESS / SASS here?

## Behat Tests

As you have already seen, the template project used to create your site included some basic Behat tests that cover some of Drupal's basic capabilities. You can customize these tests or add more to suit your purposes. The file `tests/behat-pantheon.yml` controls where tests files may be stored. By default, `tests/features` and `tests/site-features` are the defined search location, but you may add more directories if you would like to organize your tests. Any file with a `.feature` suffix will be executed as part of the standard test run.

To confirm that your site's configuration has been applied to the test site, you could add a test to check that the site slogan is correct. Create the directory `tests/site-features` and create a new file inside it called `slogan.feature`. Give it the following contents:
```
Feature: Confirm that configuration was applied
  In order to know that the Drupal configuration was correctly applied for the tests
  As a website developer
  I need to be able to confirm that the site slogan is correct

  @api
  Scenario: Add a basic page
    Given I am on "/"
    Then I should see "Making the world amazing"
```
It is a relatively simple tasks to add new tests that exercise your site through its interface. For example, the figure below demonstrates testing that an administrator can create a new page on the site. Create a new file called “content-ui.feature”, and save it in the tests/site-features folder. Give it the following contents:
```
Feature: Create Content through Drupal Content UI
  In order to know that the Drupal content UI is working
  As a website administrator
  I need to be able to add a basic page

  @api
  Scenario: Add a basic page
    Given I am logged in as a user with the "administrator" role
    And I am on "/node/add/page"
    And I enter "Test Page" for "Title"
    And I press "Save and publish"
    Then I should see "Basic page Test Page has been created."
```
By following this pattern, you can add similar tests to confirm that the most important features of your site remain functional. To save time on test runs, remove the example tests that cover basic Drupal features, and only run tests on your core functionality.

Note, however, that if you create content through a Behat `and I press` phrase, it will not automatically be deleted when your test run is complete. If you write these sorts of tests, you might want to also consider writing tests that delete that content you created, to avoid many copies of the same test content from piling up in your multidev environment. If you do not do this, though, this test content will disappear after your pull request is closed or merged.

## Merge your Pull Request

Once you have done enough work on your pull request, eventually it will be complete and will be ready to merge back in to the master branch. Go to your GitHub project page, click on the `Pull Request` tab and open your pull request. Note that your tests have completed, and the test results are green.

![Passed pull request](/source/docs/assets/images/pr-workflow/slogan-pr-passed.png)

Once your tests have passed, and there is nothing else that you wish to add to this particular feature, you should merge the pull request. Click on the `Merge` button to do this.

When your pull request is merged, one more test run will be started to test the result of combining the code and configuration from your pull request with the master branch. Once this test also passes, the configuration for your site will be applied to the dev environment, your PR multidev environment will be deleted. Note that database content is not merged; make sure that you have exported your configuration before merging your pull request to ensure that configuration changes are not lost.

You may now use the [Pantheon dev / test / live workflow](https://pantheon.io/docs/pantheon-workflow/) to deploy your site as usual.
