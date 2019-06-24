---
title: Build Tools
subtitle: Write a New Test
description: In step six of the Build Tools guide, learn how to use the pre-conifgured site tests, or customize your own.
buildtools: true
anchorid: behat
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/tests/
previousurl: guides/build-tools/extend/
nexturl: guides/build-tools/merge/
editpath: build-tools/06-tests.md
image: buildToolsGuide-thumb
---
The Pantheon example projects include some basic tests to validate basic capabilities of the given framework. You can customize these tests and add more to fit your project needs. Drupal 8 uses  [Behat](http://behat.org/en/latest/) and the WordPress example uses [WordHat](https://wordhat.info/).

The [`behat-pantheon.yml`](https://github.com/pantheon-systems/example-drops-8-composer/blob/master/tests/behat-pantheon.yml) file sets the path for a project's collection of Behat tests. Any file with a `.feature` suffix in a listed directory will be executed as part of the standard test run on CircleCI.

## Extending the Example Test Suite
The following is an example of how to increase test coverage for your project by validating site configuration. This test will confirm the [site slogan implemented in a previous lesson](/docs/guides/build-tools/new-pr/) has been applied to the associated Multidev environment:

1. Pull down commits added to the `slogan` branch from the previous lesson:

    ```bash
    git pull origin slogan
    ```

2.  Create the directory `tests/site-features` and add a new file called `slogan.feature` containing:

    ```bash
    Feature: Confirm that configuration was applied
      In order to know that the Drupal configuration was correctly applied for the tests
      As a website developer
      I need to be able to confirm that the site slogan is correct

      @api
      Scenario: Add a basic page
        Given I am on "/"
        Then I should see "Making the world amazing"
    ```

    It's a relatively simple task to add new tests that exercise your site through its interface. For example, the figure below demonstrates testing that an administrator can create a new page on the site.

2.  Create a new file called `content-ui.feature` within the `tests/site-features` directory containing:

    ```bash
    Feature: Create Content through Drupal Content UI
      In order to know that the Drupal content UI is working
      As a website administrator
      I need to be able to add a basic page

      @api
      Scenario: Add a basic page
        Given I am logged in as a user with the "administrator" role
        And I am on "/node/add/page"
        And I enter "Test Page" for "Title"
        And I press "Save"
        Then I should see "Basic page Test Page has been created."
    ```
    By following this pattern, you can add similar tests to confirm that the most important features of your site remain functional. To save time on test runs, remove the example tests that cover basic Drupal features, and only run tests on your core functionality.

3.  Commit your new files to the `slogan` branch and push to GitHub for peer review:

    ```bash
    git add .
      git commit -m "Add tests/site-features for content UI and slogan"
      git push origin slogan
    ```

### Behat Test Artifacts

If you create content through a Behat `And I press` phrase, it usually will not be automatically deleted when your test run is complete. Tests that execute custom or non-standard forms may create content that Behat does not know how to remove automatically, and tests that are validated by the existence of this content may show false positives on multiple runs, since the content was created previously.

If you write these sorts of tests, consider writing tests to delete the content they create, to avoid many copies of the same test content from piling up in your Multidev environment.
