---
contenttype: [partial]
categories: [dependencies]
cms: [--]
product: [custom-upstreams]
integration: [--]
tags: [--]
reviewed: ""
---

### How to Add Dependencies to Your Upstream

1. Clone the Git repository for your upstream.

1. Require the upstream management package if you have not already:

    ```bash{promptUser: user}
    composer require pantheon-systems/upstream-management
    ```

1. Run the `composer upstream:require` command for each dependency:

    ```bash{promptUser: user}
    composer upstream-require drupal/pkg-name [--no-update]
    ```

1. Commit and push your changes.

### How to Update Dependencies in Your Upstream

You may need to pin specific versions of your dependencies in your upstream. This is normally done with the `composer.lock` file. However, including the `composer.lock` file in the root of the upstream causes merge conflicts with your downstream sites. You can use the `upstream:update-dependencies` composer command to solve this problem.

1. Run `composer update-upstream-dependencies` in your custom upstream repository. The `upstream:update-dependencies` command will:

    - Create or update a `upstream-configuration/composer.lock` file.

    - Create or update a `upstream-configuration/locked/composer.json` file with all packages from `composer.lock` and their pinned versions.

    - Update the top-level `composer.json` repositories section for `upstream-configuration` to use `upstream-configuration/locked` instead of just `upstream-configuration` (if not done previously).

1. Commit the changes so that you can start using pinned versions in your downstream sites. This allows you to make sure that you use specific versions for the packages in your upstream.