---
title: Local Development on Pantheon
subtitle: Continuous Integration Solutions
description: Run automated unit and integration tests with Terminus and Drupal SimpleTest.
tags: [continuous-integration, workflow]
contributors: [ccjjmartin]
newtype: guide
contenttype: [guide]
innav: [false]
categories: [automate]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: []
showtoc: true
permalink: docs/guides/local-development/continuous-integration
---

This section provides information on how to use Terminus and Drupal SimpleTest to run automated integration tests.

[Continuous Integration](https://pantheon.io/integrations/continuous-integration) (CI) is a method of running automated unit and integration tests to apply quality control. Pantheon doesn't provide or host tools for continuous integration, but many tools and techniques are compatible with Pantheon. [Contact support](/guides/support/contact-support/) if you have a particular use case or technique that you'd like to highlight.

Refer to our [Build Tools](/guides/build-tools) guide for more information on the workflow for using build tools like GitHub and CircleCI with Composer for Drupal and WordPress sites.

## Terminus Command-Line Interface

[Terminus](/terminus) is a Symfony/Console-based command-line interface (CLI) in the Pantheon core API. Most operations available through the Pantheon Dashboard can be performed with Terminus, including:

- Site creation
- [Multidev environment](/guides/multidev) creation and removal
- Content cloning
- Code pushes


## Drupal SimpleTest

[SimpleTest](https://drupal.org/project/simpletest) is a testing framework based on the [SimpleTest PHP library](https://github.com/simpletest/simpletest) that is included with Drupal core. You should consider including SimpleTests of your module functionality if you are creating a custom web application.

[SiteTest](https://www.drupal.org/project/site_test) is a contrib module for Drupal that runs tests directly against your sites code instead of a base Drupal clone of your site. This module is recommended for use on SimpleTest on Pantheon.

<Alert title="Note" type="info">

The Drush test-run command was dropped in Drush 7 and 8. Refer to [this GitHub issue](https://github.com/drush-ops/drush/issues/1362) for more information.

</Alert>

## Run Tests on Pantheon

Replace `$SITE_NAME` and `$ENV_NAME` in the examples below with the your site and environment information.

1. Enable `site_test`:

   ```bash{promptUser: user}
   terminus drush $SITE_NAME.$ENV_NAME -- en site_test -y
   ```

    This command also enables `simpletest` as a dependency of `site_test`.

1. Clear the cache immediately before running tests to avoid failures. Repeat this step each time you run tests.

    ```bash{promptUser: user}
    terminus drush $SITE_NAME.$ENV_NAME -- cc all
    ```

1. Get the absolute path before you run the script. You may need to strip out warnings by ending the command with `2>/dev/null`.

   ```bash{promptUser: user}
   terminus drush $SITE_NAME.$ENV_NAME -- eval "echo DRUPAL_ROOT"
   ```

  The full command should look similar to this:

  ```bash{promptUser: user}
  export TERMINUS_HIDE_UPDATE_MESSAGE=1
  terminus drush $SITE_NAME.$ENV_NAME -- exec php `terminus drush $SITE_NAME.$ENV_NAME -- eval "echo DRUPAL_ROOT" 2>/dev/null`/scripts/run-tests.sh --url http://$ENV_NAME-$SITE_NAME.pantheonsite.io OptionalTestGroup
  ```

  In the above command the `--url` option is required to be passed as Multidevs do not respond to `localhost`.

  A full CircleCI command might look similar to this:

  ```yml
        - run:
            name: Test simpletest
            command: |
              if [ "${CIRCLE_BRANCH}" != "master" ]; then

                export TERMINUS_HIDE_UPDATE_MESSAGE=1
                terminus drush $SITE_NAME.$ENV_NAME -- en site_test -y

                # If you don't clear the cache immediately before running tests
                # we get the html gibberish instead of a passing test.
                terminus drush $SITE_NAME.$ENV_NAME -- cc all

                # NOTE: Use the latest version of Terminus to avoid warning messages in the output, which will break the test.
                # in order to exclude the notice in shell output of the
                # embedded command to find the absolute path.
                terminus drush $SITE_NAME.$ENV_NAME -- exec php `terminus drush $SITE_NAME.$ENV_NAME -- eval "echo DRUPAL_ROOT" 2>/dev/null`/scripts/run-tests.sh --url http://$ENV_NAME-$SITE_NAME.pantheonsite.io OptionalTestGroup

              fi
  ```

## Integration Bot

We recommend creating a bot user account to handle the tasks or jobs by an external continuous integration service rather a standard user account.

- Add the bot to select projects
- Manage separate SSH Keys for CI

## Known Limitations

Pantheon does not provide or offer customer support for:

- [Webhooks](https://en.wikipedia.org/wiki/Webhook)
- [Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- Running [Jenkins](https://jenkins.io/index.html) or other Continuous Integration software on our servers. You'll need to self-host or use a hosted CI solution. [Compare solutions here](https://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software).
- Shell access
- [PHPUnit](https://github.com/sebastianbergmann/phpunit/) Unit Testing PHP Framework: You can still write tests and include them in your code, but you'll need to run them on a CI server, not Pantheon.

## More Resources

- [Build Tools](/guides/build-tools)
- [Pantheon Multidev](/guides/multidev)