---
title: Integrated Composer
subtitle: Use Upstream with Integrated Composer
description: Learn how to use Upstream with Integrated Composer.
tags: [composer, workflow]
contributors: [ari, edwardangert]
reviewed: "2022-12-13"
layout: guide
showtoc: true
permalink: docs/guides/integrated-composer/ic-upstreams
anchorid: ic-upstreams
contenttype: [guide]
categories: [overview]
newcms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
---

This section provides information on how to use Upstream with Integrated Composer, including steps to add dependencies to your Upstream.

## Upstream

Upstream refers to the source code that is hosted in the Pantheon code repository and includes the core code for [Drupal](https://github.com/pantheon-upstreams/drupal-composer-managed), [WordPress](https://github.com/pantheon-upstreams/wordpress-project), and some customizations for the Pantheon platform.

### Upstream and Site Structure

<Partial file="ic-upstream-structure.md" />

### How to Add Dependencies to Your Upstream

1. Clone the Git repository for your upstream.

1. Run the `composer upstream-require` command for each dependency:

    ```bash{promptUser: user}
    composer upstream-require drupal/pkg-name [--no-update]
    ```

1. Commit and push your changes.

### How to Update Dependencies in Your Upstream

You may have the need to pin specific versions of your dependencies in your upstream. This is normally done with the composer.lock file but including this file in the root of the upstream will cause merge conflicts with your downstream sites. To solve this problem, you could use the `update-upstream-dependencies` composer command.

This command will:

1. Create or update a `upstream-configuration/composer.lock` file.
1. Create or update a `upstream-configuration/locked/composer.json` file with all of the packages from composer.lock and their pinned versions.
1. Update top-level `composer.json` repositories section for `upstream-configuration` to use `upstream-configuration/locked` instead of just `upstream-configuration` (if not done previously).

This will allow you to make sure that you use specific versions for the packages in your upstream.

Once you run this command (`composer update-upstream-dependencies`) in your custom upstream repository, commit the changes it did so that you can start using pinned versions in your downstream sites.

## More Resources

- [Custom Upstreams](/guides/custom-upstream)

- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)

- [Migrate a Custom Upstream to Drupal](/guides/drupal-hosted-createcustom)

- [Pantheon YAML Configuration Files](/pantheon-yml)
