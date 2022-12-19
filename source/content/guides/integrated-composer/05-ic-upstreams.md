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

1. [Clone the Git repository](/guides/git/git-config#clone-your-site-codebase) from the Site Dashboard.

1. Change into the Upstream's configuration directory:

   - Drupal:

    ```bash{promptUser: user}
    cd upstream-configuration
    ```

   - WordPress:

    ```bash{promptUser: user}
    cd upstream-config 
    ```

1. Run the `composer require` command for each dependency:

    ```bash{promptUser: user}
    composer require drupal/pkg-name --no-update
    ```

     - `--no-update` tells Composer to disable automatic updates of the dependency. This makes Composer faster when adding dependencies to the Upstream as shown here.
     - `--no-update` should not be included when adding dependencies to a site.

1. _Optional_ . Set or increment the current configuration version. This step can be skipped initially. Only perform this step if you are prompted to update the Composer config version.

     - Confirm the version:

        ```bash{outputLines:2}
        composer config version
        ```

     - Increment the config version number when you update dependencies. If you don't increment the version number, Composer will ignore updated dependencies.
     - Replace `1.0.1` in this example with the latest version number:

       ```bash{promptUser: user}
       composer config version 1.0.1
       ```

1. Commit and push your changes.

## More Resources

- [Custom Upstreams](/guides/custom-upstream)

- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)

- [Migrate a Custom Upstream to image.png](/guides/drupal-hosted-createcustom)

- [Pantheon YAML Configuration Files](/pantheon-yml)
