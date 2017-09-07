---
title: Build Tools
subtitle: Behat Tests
buildtools: true
anchorid: behat
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/test/
previousurl: guides/build-tools/custom-block/
nexturl: guides/build-tools/merge/
editpath: build-tools/08-test.md
---

As you have already seen, the template project used to create your site included some basic [Behat](http://behat.org/en/latest/) tests that cover some of Drupal's basic capabilities. You can customize these tests or add more to suit your purposes. The file `code/tests/behat-pantheon.yml` controls where tests files are stored. By default, `code/tests/features` and `code/tests/site-features` are the defined search location, but you may add more directories if you would like to organize your tests. Any file with a `.feature` suffix in a listed directory will be executed as part of the standard test run.

To confirm that your site's configuration has been applied to the test site, add a test to check that the site slogan is correct.

1.  Create the directory `code/tests/site-features` and create a new file inside it called `slogan.feature`. Add the following contents:

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
It's a relatively simple tasks to add new tests that exercise your site through its interface. For example, the figure below demonstrates testing that an administrator can create a new page on the site.

2.  Create a new file called `content-ui.feature`, and save it in the `code/tests/site-features` folder. Give it the following contents:

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
        And I press "Save and publish"
        Then I should see "Basic page Test Page has been created."
    ```
    By following this pattern, you can add similar tests to confirm that the most important features of your site remain functional. To save time on test runs, remove the example tests that cover basic Drupal features, and only run tests on your core functionality.

3.  Upload your new tests over SFTP, and commit them on the multidev Site Dashboard.

### Behat Test Artifacts

If you create content through a Behat `And I press` phrase, it usually will not be automatically deleted when your test run is complete. Tests that execute custom or non-standard forms may create content that Behat does not know how to remove automatically, and tests that are validated by the existence of this content may show false positives on multiple runs, since the content was created previously.

If you write these sorts of tests, consider writing tests to delete the content they create, to avoid many copies of the same test content from piling up in your multidev environment.
