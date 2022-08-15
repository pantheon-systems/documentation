---
title: Integrated Composer
subtitle: Add a Package from a Private Repository
description: Learn how to add a package from a private repository.
type: guide
permalink: docs/guides/:basename
tags: [composer, workflow]
categories: [get-started]
contributors: [ari, edwardangert]
reviewed: "2022-04-28"
layout: guide
showtoc: true
permalink: docs/guides/integrated-composer/private-repo-package
anchorid: private-repo-package
---

This section provides information on how to add a package from a private repository using Integrated Composer.

## Add a Package from a Private Repository

The following steps outline a method for adding a package from a private GitHub repository. For additional information on handling private packages, refer to the official [Composer documentation](https://getcomposer.org/doc/articles/handling-private-packages.md).

For this procedure, a GitHub token will be added to your code repository. It allows anyone with the token to read and write to any private repositories associated with the issuing account. To limit the scope of the GitHub token access, you can create a new GitHub user and give that user permission to only the private repositories needed for your Composer packages and ensure your site repository code is not published publicly. 

1. Go to GitHub's [Personal Access Tokens](https://github.com/settings/tokens) page and generate a new token. Ensure the `repo` scope is selected.

1. Add the private GitHub repository to `composer.json`, replacing `<token>` with your newly generated token.
   ```json:title=composer.json
   "repositories": [
        {
            "type": "vcs",
            "url": "https://<token>@github.com/mycompany/my-private-repo"
        }
    ],
    ```

1. Require the package and specify the branch, prefixed with `dev-`
   ```json:title=composer.json
    "require": {
        "mycompany/my-private-repo": "dev-branch-name"
    },
   ```

1. Run `composer update` to install the new package.

1. If the above command update works locally, commit the updated composer files and add them to your environment
   ```bash{promptUser: user
   git add composer.json composer.lock
   git commit -m "Adding private package <your-package>"
   git push
   ```
