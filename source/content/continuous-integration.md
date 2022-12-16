---
title: Continuous Integration Solutions on Pantheon
description: Run automated unit and integration tests with Terminus and Drupal SimpleTest.
tags: [continuous-integration, workflow, D8, D9, D10]
contributors: [ccjjmartin]
contenttype: [doc]
categories: [automate]
newcms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2022-12-13"
---
[<dfn id="ci">Continuous Integration</dfn>](https://pantheon.io/integrations/continuous-integration) (CI) is a method of running automated unit and integration tests to apply quality control. Pantheon doesn't provide or host tools for continuous integration, but many tools and techniques are compatible with Pantheon. If you have a particular use case or technique that you'd like to highlight, let us know by [contacting support](/guides/support/contact-support/).

See our [Build Tools](/guides/build-tools) guide for a more detailed look at a workflow using build tools like GitHub and CircleCI with Composer for Drupal and WordPress sites.

## Terminus Command-Line Interface

[Terminus](/terminus) is a Symfony/Console-based command-line interface (CLI) in the Pantheon core API. Most operations available through the Pantheon Dashboard can be performed with Terminus, including:

- Site creation
- [Multidev environment](/guides/multidev) creation and removal
- Content cloning
- Code pushes

You can use Terminus for scripting many operations. For example, a post-commit hook can trigger Jenkins to create a Multidev environment with the latest code on master and the content from Live, then run automated browser tests using [Selenium](https://github.com/SeleniumHQ/selenium).

## Autopilot Testing

The best way to test your site on pantheon is using [Autopilot](/guides/autopilot).

## PHPUnit Testing

[PHPUnit](https://github.com/sebastianbergmann/phpunit/) is the standard method of testing on Drupal sites.

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

## Read More

- [Build Tools](/guides/build-tools)
- [Local Development](/guides/local-development)
- [Pantheon Multidev](/guides/multidev)
