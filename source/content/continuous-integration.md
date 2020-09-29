---
title: Continuous Integration Solutions on Pantheon
description: Run automated unit and integration tests with Terminus and Drupal SimpleTest.
tags: [platformintegrations]
categories: []
contributors: [ccjjmartin]
---
Continuous Integration (CI) is a method of running automated unit and integration tests to apply quality control. Pantheon doesn't provide or host tools for continuous integration, but many tools and techniques are compatible with Pantheon. If you have a particular use case or technique that you'd like to highlight, let us know by [contacting support](/support).

See our [Build Tools](/guides/build-tools) guide for a more detailed look at a workflow using build tools like GitHub and CircleCI with Composer for Drupal and WordPress sites.

## Terminus Command-Line Interface

[Terminus](/terminus) is a Symfony/Console-based command-line interface (CLI) in the Pantheon core API. Most operations available through the Pantheon Dashboard can be performed with Terminus, including:

- Site creation
- [Multidev environment](/multidev) creation and removal
- Content cloning
- Code pushes

You can use Terminus for scripting many operations. For example, a post-commit hook can trigger Jenkins to create a Multidev environment with the latest code on master and the content from Live, then run automated browser tests using [Selenium](https://github.com/SeleniumHQ/selenium).

## Drupal SimpleTest

[SimpleTest](https://drupal.org/project/simpletest) is a testing framework based on the [SimpleTest PHP library](https://github.com/simpletest/simpletest) that is included with Drupal core. If you are creating a custom web application, you should consider including SimpleTests of your module functionality.

[SiteTest](https://www.drupal.org/project/site_test) is a contrib module for Drupal 7 designed to allow running tests directly against your sites code instead of a base Drupal clone of your site.  This module is recommended for use of SimpleTest on Pantheon.

<Alert title="Note" type="info">

The drush test-run command was dropped in Drush 7 and 8. See [this GitHub issue](https://github.com/drush-ops/drush/issues/1362) for more details.

</Alert>

To run tests on Pantheon:

1. Enable `site_test`:

   ```bash{promptUser: user}
   terminus drush $SITE_NAME.$ENV_NAME -- en site_test -y
   ```

  This command will also enable `simpletest` as a dependency of `site_test`.

1. Clear the cache immediately before running tests to avoid strange failures:

   ```bash{promptUser: user}
   terminus drush $SITE_NAME.$ENV_NAME -- cc all
   ```

  This step should be repeated each time tests are to be run moving forward.

1. Get the absolute path before you can run the script:

   ```bash{promptUser: user}
   terminus drush $SITE_NAME.$ENV_NAME -- eval "echo DRUPAL_ROOT"
   ```

  In the command above, you may need to strip out warnings by ending the command with `2>/dev/null`.

The full command will look something like this:

```bash{promptUser: user}
export TERMINUS_HIDE_UPDATE_MESSAGE=1
terminus drush $SITE_NAME.$ENV_NAME -- exec php `terminus drush $SITE_NAME.$ENV_NAME -- eval "echo DRUPAL_ROOT" 2>/dev/null`/scripts/run-tests.sh --url http://$ENV_NAME-$SITE_NAME.pantheonsite.io OptionalTestGroup
```

In the above command the `--url` option is required to be passed as multidevs do not respond to `localhost`.

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

We recommend creating a bot user account that will handle the tasks or jobs by an external continuous integration service rather a standard user account.

- Add the bot to select projects
- Manage separate SSH Keys for CI

## Known Limitations

At this time, Pantheon does not provide or support:

- [Webhooks](https://en.wikipedia.org/wiki/Webhook)
- [Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- Running [Jenkins](https://jenkins.io/index.html) or other Continuous Integration software on our servers. You'll need to self-host or use a hosted CI solution. [Compare solutions here](https://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software).
- Shell access
- [PHPUnit](https://github.com/sebastianbergmann/phpunit/) Unit Testing PHP Framework: You can still write tests and include them in your code, but you'll need to run them on a CI server, not Pantheon.
