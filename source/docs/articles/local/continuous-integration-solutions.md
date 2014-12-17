---
title: Continuous Integration Solutions on Pantheon
description: Run automated unit and integration tests.
category:
  - going-live
  - advanced

---

## Overview
Continuous Integration is a method of running automated unit and integration tests to apply quality control. Pantheon doesn't provide or host tools for continuous integration, but many tools and techniques are compatible with Pantheon. If you have a particular use case or technique that you'd like to highlight, let us know by opening a support ticket.

## Terminus Command-Line Interface

[Terminus](/docs/articles/local/terminus-the-pantheon-command-line-interface/) is a Drush-based command-line interface (CLI) in the Pantheon core API. Most operations available through the Pantheon dashboard can be performed with Terminus, including:

- Site creation
- [Multidev environment](/docs/articles/sites/multidev) creation and removal
- Content cloning
- Code pushes

Terminus can be used for scripting many operations. For example, a post-commit hook can trigger Jenkins to create a Multidev environment with the latest code on master and the content from Live, then run automated browser tests using [Selenium](http://www.seleniumhq.org/).

## Drupal SimpleTest

[SimpleTest](https://drupal.org/project/simpletest) is a testing framework based on the [SimpleTest PHP library](http://simpletest.sourceforge.net/) that is included with Drupal core. If you are creating a custom web application, you should consider including SimpleTests of your module functionality.

After enabling the SimpleTest module, you can use Drush to remotely execute SimpleTest on your Pantheon site. For example, if you wanted to execute the UserSaveTestCase test and generate XML output into a writeable directory, use the following command:

    SITE_NAME=yoursitename
    ENV=dev
    drush @pantheon.$SITE_NAME.$ENV test-run -l http://$ENV-$SITE_NAME.gotpantheon.com/ UserSaveTestCase --xml='sites/default/files'

The end results would be written to http://dev-yoursitename.gotpantheon.com/sites/default/files/UserSaveTestCase.xml

## Known Limitations

At this time, Pantheon does not provide or support:

- [Webhooks](http://en.wikipedia.org/wiki/Webhook)
- [Git hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks)
- [Jenkins](http://jenkins-ci.org/) or other Continuous Integration software (consider a hosted CI solution such as [Travis CI](https://travis-ci.com/), [CircleCi](https://circleci.com/), or [Drone](https://drone.io/)).
- Shell access
- [PHPUnit](https://github.com/sebastianbergmann/phpunit/) Unit Testing PHP Framework: You can still write tests and include them in your code, but you won't be able to run the tests on Pantheon.
