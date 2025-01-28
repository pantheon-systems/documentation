---
title: Build Tools
subtitle: Create a New Project
description: In step two of the Build Tools guide, learn how to create a new Build Tools project.
tags: [composer, terminus, webops, workflow, D8, D9, wordpress]
type: guide
permalink: docs/guides/build-tools/create-project/
editpath: build-tools/02-create-project.md
reviewed: "2024-10-15"
contenttype: [guide]
innav: [false]
categories: [dependencies]
cms: [--]
audience: [development]
product: [--]
integration: [--]
image: buildToolsGuide-thumb.png
---

In this section, we will use the Terminus Build Tools Plugin to create a new project consisting of a Git repository, [Composer](https://getcomposer.org), a Continuous Integration (CI) service, and a Pantheon site with Automated Testing. This guide will get you started, but you will need to customize and maintain the CI/testing set up for your projects.

<Alert title="Note" type="info">

These instructions are written with GitHub as the Git provider repository, CircleCI as the CI, and a Pantheon site.

Substitute your chosen Git Provider and CI service in these instructions with the options of your choice. Refer to [A Build Tools Project's Components](/guides/build-tools#a-build-tools-projects-components) for the supported combinations.

</Alert>

## Requirements

* [Composer](/guides/integrated-composer)
* [Terminus](/terminus/)
* [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin)
* [PHP version](https://docs.pantheon.io/guides/php/php-versions#verify-current-php-versions) 7.2 or greater
* [An SSH key](/ssh-keys) in your Personal Workspace.
* [A Pantheon machine token](https://dashboard.pantheon.io/machine-token/create), to authenticate Terminus.

### Access Tokens (Optional)

The Build Tools plugin will prompt you to create access tokens for the services you use as an alternative to a password. Access tokens are stored as environment variables. Access token requirements vary by service. Read below for specific access token requirements.

- [GitHub](https://github.com/settings/tokens): The GitHub token checks for the following scopes:

  - `repo` (required)

  - `delete-repo` (optional)

  - `workflow` (required if using Github Actions)

- [CircleCI](https://circleci.com/account/api): No scopes are configurable for this token.

- [Gitlab](https://gitlab.com/-/profile/personal_access_tokens): The Gitlab token requires the following scopes:

  - `api`

  - `read_repository`

  - `write_repository`

- [Bitbucket](https://bitbucket.org/account/settings/app-passwords/): A Bitbucket app password requires the following scopes:

  - `Projects` (read)

  - `Repositories` (read and write)

  - `Pull Requests` (read and write)

  - `Pipelines` (edit variables)

Optionally, you can generate your tokens ahead of time and manually export them to the local variables. Note that Bitbucket requires a user name and password instead of a token. Review the local variable export examples below:

- `GITHUB_TOKEN`
- `CIRCLE_TOKEN`
- `GITLAB_TOKEN`
- `BITBUCKET_USER` and `BITBUCKET_PASS`

The examples below vary depending on what services you use. Replace `exampleToken` (or `exampleUserName` and `exampleUserPassword` if you use Bitbucket) with your token or Bitbucket user name and password.

```bash{promptUser: user}
export GITHUB_TOKEN=exampleToken
export CIRCLE_TOKEN=exampleToken
export GITLAB_TOKEN=exampleToken
export BITBUCKET_USER=exampleUserName
export BITBUCKET_PASS=exampleUserPassword
```

Navigate to your [project settings page in CircleCI](https://circleci.com/docs/2.0/env-vars/#adding-environment-variables-in-the-app) if you need to replace a token.

## Create a Build Tools Project

Scaffold a new project from a template repository and perform a one-time setup to connect an external Git provider and CI service with Pantheon. This setup also configures SSH keys and environment variables. To use your own template repository, refer to [Customization](https://github.com/pantheon-systems/terminus-build-tools-plugin/blob/3.x/README.md#customization) in the Build Tools Plugin documentation.

Modify the commands in the following examples to match your project's needs.

- Start a GitHub project with WordPress:

  ```bash{promptUser: user}
  terminus build:project:create --git=github --team='My Agency Name' wp my-site
  ```

<Alert title="Note" type="info">

Pantheon has a [WordPress (Composer Managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. You can use this upstream to create a Composer-managed WordPress site with **Bedrock**. **Terminus Build Tools** does not currently support the Bedrock-based WordPress (Composer Managed) upstream.

</Alert>

- Start a GitHub project with Drupal:

  ```bash{promptUser: user}
  terminus build:project:create --git=github --team='My Agency Name' d9 my-site
  ```
  
<Alert title="Note" type="info">

Support has not yet been added for Drupal versions past 9, however you can still update to the latest Drupal version after creating the project.

</Alert>

The script will ask for additional information such as tokens/credentials for GitHub and the associated CI.

For a list of all available command options, see the [Build Tools Project README](https://github.com/pantheon-systems/terminus-build-tools-plugin/blob/3.x/README.md#buildprojectcreate)

## Review Important Directories and Update File Paths

### `/web` Directory

Your site is stored and served from the `/web` subdirectory located next to the `pantheon.yml` file. You must store your website in this subdirectory for a Composer-based workflow. Placing your website in the subdirectory also allows you  to store tests, scripts, and other files related to your project in your repo without affecting your web document root. It also provides additional security by preventing web access to files outside of the document root through Pantheon.
Your files may still be accessible from your version control project if it is public. See the [`pantheon.yml` documentation](/pantheon-yml#nested-docroot) for details.

1. Verify that your website is stored in the `/web` subdirectory.

### `composer.json` File

This project uses Composer to manage third-party PHP dependencies. Some files, such as core CMS packages inside the `/web` directory, may not be visible in the repository. This is because the CMS (Drupal or WordPress) and its plugins/modules are installed via Composer and ignored in the `.gitignore` file.

Third-party dependencies, such as modules, plugins and themes, are added to the project via `composer.json` file. The `composer.lock` file keeps track of the exact dependency version. For WordPress, Composer installer-paths are used to ensure the dependencies are downloaded into the appropriate directory.

1. Place all dependencies in the **require** section of your `composer.json` file.

    - This includes dependencies that are only used in non-Live environments. All dependencies in the **require** section are pushed to Pantheon.

1. Place all dependencies that are not a part of the web application but are necessary to build or test the project in the **require-dev** section.

    - Example dependencies are `php_codesniffer` and `phpunit`. Dev dependencies are deployed to Dev and Multidev environments, but not to Test and Live environments.

## Continuous Integration

The scripts that run on Continuous Integration are stored in the `.ci` directory. Provider-specific configuration files, such as `.circle/config.yml` and `.gitlab-ci.yml` use these scripts.

The scripts are organized into subdirectories according to their function:

- Build
- Deploy
- Test

### Build Scripts .ci/build

- `.ci/build` script builds an artifact suitable for deployment.

- `.ci/build/php` installs PHP dependencies with Composer.

### Build Scripts `.ci/deploy`

All scripts stored in the `.ci/deploy` directory facilitate code deployment to Pantheon.

 - `.ci/deploy/pantheon/create-multidev` creates a new [Pantheon Multidev environment](/guides/multidev) for branches other than the default Git branch. Note that not all users have Multidev access. Please consult the [Multidev FAQ doc](/guides/multidev/multidev-faq) for details.

- `.ci/deploy/pantheon/dev-multidev` deploys the built artifact to either the Pantheon Dev or a Multidev environment, depending on the Git branch.

## Automated Test Scripts `.ci/tests`

The `.ci/tests` scripts run automated tests. You can add or remove scripts depending on your testing needs.

### Static Testing

- `.ci/test/static` and `tests/unit` are static tests that analyze code without executing it. These tests are good at detecting syntax errors but not functionality errors.

- `.ci/test/static/run` runs [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) with [WordPress coding standards](https://github.com/WordPress/WordPress-Coding-Standards) (for WordPress sites), [PHP Unit](https://phpunit.de/), and [PHP syntax checking](https://phpcodechecker.com/).

- `tests/unit/bootstrap.php` bootstraps the Composer autoloader.

- `tests/unit/TestAssert.php` provides an example Unit test.

1. Create all project-specific test files in the `tests/unit` directory.

### Visual Regression Testing

The scripts stored in the `.ci/test/visual-regression` directory run visual regression testing through a headless browser to take screenshots of web pages and compare them for visual differences.

- `.ci/test/visual-regression/run` runs [BackstopJS](https://github.com/garris/BackstopJS) visual regression testing.

- `.ci/test/visual-regression/backstopConfig.js` is the [BackstopJS](https://github.com/garris/BackstopJS) configuration file.

1. Update the settings in `.ci/test/visual-regression/backstopConfig.js` file for your project.

    - For example, the `pathsToTest` variable determines the URLs to test.

## GitHub Actions

This section provides information enabling GitHub Actions for your site.

The Build Tools Site will configure GitHub Actions automatically if it was passed as the selected CI when creating the site. You will need to consult advanced external resources if you're working with an existing non-Build Tools site and want to add Github Actions.

The steps to enable GitHub Actions for an existing Build Tools site created with another CI (for example, CircleCI) shown below might work for you.

1. Copy `.ci/.github` to `.github`.

1. Add the following secrets to the Github Actions configuration:

    - `ADMIN_EMAIL`

    - `ADMIN_PASSWORD`

    - `ADMIN_USERNAME`

    - `TERMINUS_TOKEN`

    - `TERMINUS_SITE`

    - `SSH_PRIVATE_KEY`

    - `GH_TOKEN`


## Working Locally with Lando

Complete the one-time steps below to get started using [Lando](https://docs.devwithlando.io/) for local development. Please note than Lando is an independent product and is not supported by Pantheon. Refer to the [Lando documentation](https://docs.devwithlando.io/) for more information.

1. [Install Lando](https://docs.lando.dev/getting-started/installation.html) if it is not already installed.

1. Clone your project repository from GitHub to your local.

1. Manually create a `.lando.yml` file with your preferred configuration, based on the WordPress recipe.

1. Run `lando start` to start Lando.

1. Save the local site URL.

    - The local site URL should look similar to: `https://<PROJECT_NAME>.lndo.site.`

1. Run the command below to download dependencies.

    ```bash
    `lando composer install --no-ansi --no-interaction --optimize-autoloader --no-progress`
    ```

1. Run the command below to download the media files and database from Pantheon.

    ```bash
    `lando pull --code=none`
    ```

1. Visit the local site URL saved in the preceding steps.

    - You should now be able to edit your site locally. The steps above do not need to be completed on subsequent starts. You can stop Lando with `lando stop` and start it again with `lando start`.

1. Run all Composer, Terminus and wp-cli commands in Lando instead of the host machine.

    - This is done by prefixing the desired command with `lando`. For example, after a change to `composer.json` run `lando composer update` rather than `composer update`.

<Alert title="Warning" type="danger" >

Do NOT push/pull code between Lando and Pantheon directly. All code should be pushed to GitHub and deployed to Pantheon through a continuous integration service, such as CircleCI.

</Alert>

### Troubleshooting

<Accordion title="Troubleshooting" id="troubleshoot-install" icon="wrench">

As packages pulled by Composer are updated (along with their dependencies), version compatibility issues can pop up. Sometimes you may need to manually alter the version constraints on a given package within the `require` or `require-dev` section of `composer.json` in order to update packages. See the [updating dependencies](https://getcomposer.org/doc/01-basic-usage.md#updating-dependencies-to-their-latest-versions) section of Composer's documentation for more information.

As a first troubleshooting step, try running `composer update` to bring `composer.lock` up to date with the latest available packages (as constrained by the version requirements in `composer.json`).

### Host a Static Site on Pantheon

Use Build Tools to help [host a static site or files on Pantheon](/static-site-empty-upstream).

### Composer Content-Length Mismatch and/or Degraded Mode

If you encounter an issue such as:

```php
The "https://packagist.org/packages.json" file could not be downloaded: failed to open stream: Operation timed out
Retrying with degraded mode, check https://getcomposer.org/doc/articles/troubleshooting.md#degraded-mode for more info
The "https://packagist.org/packages.json" file could not be downloaded: failed to open stream: Operation timed out
https://packagist.org could not be fully loaded, package information was loaded from the local cache and may be out of date

[Composer\Downloader\TransportException]
Content-Length mismatch

create-project [-s|--stability STABILITY] [--prefer-source] [--prefer-dist] [--repository REPOSITORY] [--repository-url REPOSITORY-URL] [--dev] [--no-dev] [--no-custom-installers] [--no-scripts] [--no-progress] [--no-secure-http] [--keep-vcs] [--no-install] [--ignore-platform-reqs] [--] [<package>] [<directory>] [<version>]

[error]  Command `composer create-project --working-dir=/private/var/folders/lp/7_1gh83s5mn9lwfjvqqlf1lm0000gn/T/local-sitevPumRP pantheon-systems/example-wordpress-composer pantheon-wp-composer-project -n --stability dev` failed with exit code 1
```

This indicates a network-level issue. We recommend contacting your Internet Service Provider (ISP) for support. One way to reduce connection woes is to use a non-standard channel with less activity/noise on wireless modems.

### Your requirements could not be resolved to an installable set of packages

Check the output for the recommended fix. For example, PHP `7.0` is required for WordPress. Once you have resolved the issues as suggested by Composer try the command again.

### The site name is already taken on Pantheon

The following error occurs when running `terminus build:project-create` before authenticating your session with Terminus:

```bash
BuildToolsCommand.php line 166:
    The site name exampleuniquesitename is already taken on Pantheon.
```

To resolve, [generate a Machine Token](https://dashboard.pantheon.io/machine-token/create), then authenticate Terminus and try the build command again:

```bash{promptUser: user}
terminus auth:login --machine-token=<machine-token>
```

### Additional Support

Pantheon's Composer-based example repositories are maintained and supported on GitHub. After browsing existing issues, report errors in the appropriate repository's issue queue:

- [Drupal](https://github.com/pantheon-upstreams/drupal-composer-managed/issues)
- [WordPress](https://github.com/pantheon-systems/example-wordpress-composer/issues)

</Accordion>

## View Your New Project Repo

Once your site is ready, the URL to your project page will be printed in the terminal. Copy this address and paste it into a browser to visit your new project on Github:

![Initial Project Page shows title of project in GitHub](../../../images/pr-workflow/initial-project-page.png)
