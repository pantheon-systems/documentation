---
title: Integrated Composer
subtitle: Custom Upstream Usage
description: Learn how to use an Upstream with Integrated Composer.
tags: [composer, workflow]
contributors: [ari, edwardangert, jazzsequence]
reviewed: "2026-09-03"
showtoc: true
permalink: docs/guides/integrated-composer/ic-upstreams
contenttype: [guide]
innav: [false]
categories: [dependencies]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
---

This section provides usage and maintenance information for composer-managed [Custom Upstreams](/guides/custom-upstream) on Pantheon, including steps to add upstream dependencies.


## Custom Upstreams

An Upstream refers to the source code in Git that shares a Git history with "downstream" individual sites made from it. Upstreams includes the core code for [Drupal](https://github.com/pantheon-upstreams/drupal-composer-managed), [WordPress](https://github.com/pantheon-upstreams/wordpress-composer-managed), and some customizations for the Pantheon platform.

### Create Your Integrated Composer Custom Upstream

Follow the steps to [Create a Custom Upstream](/guides/custom-upstream/create-custom-upstream/) to create and connect a new integrated composer custom upstream. 

### Custom Upstream and Site Structure

<Partial file="ic-upstream-structure.md" />

<Partial file="upstream-management-dependencies.md" />

## Add a Composer Plugin to Your Upstream

Composer loads plugin code once, when Composer starts, from the `vendor` directory that is on disk at that moment. A plugin that arrives in the same upstream update that first needs it is not installed yet, so it does not run.

Deploy the plugin to your sites in one upstream commit, then push the change that depends on it in a second commit. The example below uses [`mglaman/composer-drupal-lenient`](https://github.com/mglaman/composer-drupal-lenient), which relaxes a contributed module's published `drupal/core` constraint so that the module can install on a newer version of Drupal core.

<Alert title="Note" type="info">

`config` and `repositories` are root-only properties. Composer reads them from the root `composer.json` and nowhere else, so a plugin added to `upstream-configuration/composer.json` has no effect.

</Alert>

1. In the root `composer.json` of your Custom Upstream, require the plugin and add it to the `allow-plugins` list:

    ```json:title=composer.json
    "require": {
        "mglaman/composer-drupal-lenient": "^1.0"
    },
    "config": {
        "allow-plugins": {
            "mglaman/composer-drupal-lenient": true
        }
    }
    ```

1. Commit and push the change to your Custom Upstream, then [apply the upstream update](/core-updates) to each site and let the build finish.

1. Confirm that the plugin is installed before you rely on it. Connect to an environment over [SFTP](/guides/sftp) and list the vendor directory:

    ```bash{promptUser: user}
    ls code/vendor/mglaman
    ```

1. Push the change that depends on the plugin as a separate upstream commit. For `composer-drupal-lenient`, that is the module in `upstream-configuration/composer.json` and an `extra.drupal-lenient.allowed-list` entry in the root `composer.json` that names it:

    ```json:title=composer.json
    "extra": {
        "drupal-lenient": {
            "allowed-list": ["drupal/module-name"]
        }
    }
    ```

1. Apply the upstream update to your sites again. Composer now loads the plugin from `vendor` and resolves the module.

<Alert title="Warning" type="danger">

A change to the root `composer.json` in your Custom Upstream replaces edits that individual sites have made to their own root `composer.json`. This happens without a merge conflict and without failing the build. Review your sites for local changes before you push. For more information, see [Changes Lost During Upstream Updates](/guides/integrated-composer/ic-troubleshooting#changes-lost-during-upstream-updates).

</Alert>

## Maintain Your Integrated Composer Custom Upstream

 There are some special considerations to keep in mind if you intend to make modifications to your upstream based on this repository.

1. Increase the version number listed in the `upstream-configuration/composer.json` file each time you make edits.
    - Composer checks the contents of the root `/composer.json` file for changes that should be pushed to your upstream configuration.

1. Verify your changes to the `upstream-configuration/composer.json` file by running `composer install` or `composer update` in the `upstream-configuration` directory.
    - Be careful not to rely on ["root-only" properties of composer.json](https://getcomposer.org/doc/04-schema.md).

## More Resources

- [Custom Upstreams](/guides/custom-upstream)
- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)
- [Migrate a Custom Upstream to Drupal](/guides/drupal-hosted-createcustom)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Best Practices for Maintaining Custom Upstreams](/guides/custom-upstream/maintain-custom-upstream)
- [Composer Fundamentals and WebOps Workflows](/guides/composer)
- [Integrated Composer Troubleshooting](/guides/integrated-composer/ic-troubleshooting)
- [Create a Composer-managed WordPress Site with Bedrock](/guides/wordpress-composer/wordpress-composer-managed)
