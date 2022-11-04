---
title: Integrated Composer
subtitle: Add a Package from a Private Repository
description: Learn how to add a package from a private repository.
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

The steps below outline a method for adding a package from a private GitHub, GitLab, or Bitbucket repository. Refer to the official [Composer documentation](https://getcomposer.org/doc/articles/handling-private-packages.md) for additional information on handling private packages.

A token will be added to your code repository for this procedure. This allows anyone with the token to read and write to private repositories associated with the issuing account. You can explore workarounds to limit the scope of the token access. For example, you can create a new GitHub user and restrict that user's permission to only the private repositories needed for your Composer packages. This ensures your site repository code is not published publicly.

<TabList>

<Tab title="GitHuB" id="github-example" active={true}>

1. Generate a GitHub [Personal Access Tokens](https://github.com/settings/tokens) page. The Github token must have all `repo` permissions selected.

1. Add the private repository to `composer.json`, replacing `<token>` with your newly generated token.

   ```json:title=composer.json
   "repositories": [
        {
            "type": "vcs",
            "url": "https://<token>@github.com/mycompany/my-private-repo"
        }
    ],
    ```

1. Run the command below to require the package and specify the branch, prefixed with `dev-`:

   ```bash{promptUser: user
   composer require mycompany/my-private-repo:dev-branch-name
   ```

1. Run the `composer update` command to install the new package.

1. Run the commands below to commit the updated Composer files and add them to your environment only if the above command update works locally.

   ```bash{promptUser: user
   git add composer.json composer.lock
   git commit -m "Adding private package <your-package>"
   git push
   ```

</Tab>

<Tab title="GitLab" id="gitlab-example">

1. [Generate a GitLab token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that all repository scopes are selected for the token.

1. Add the private repository to `composer.json`, replacing `<token>` with your newly generated token.
 
    ```json:title=composer.json
    "repositories": [
        {
            "type": "vcs",
            "url": "https://oauth2:<token>@gitlab.com/mycompany/my-private-repo.git"
        }
    ],
    ```

1. Run the command below to require the package and specify the branch, prefixed with `dev-`:

   ```bash{promptUser: user
   composer require mycompany/my-private-repo:dev-branch-name
   ```

1. Run the `composer update` command to install the new package.

1. Run the commands below to commit the updated Composer files and add them to your environment only if the above command update works locally.

   ```bash{promptUser: user
   git add composer.json composer.lock
   git commit -m "Adding private package <your-package>"
   git push
   ```

</Tab>

<Tab title="Bitbucket" id="bitbucket-example">

1. [Generate a Bitbucket token](https://confluence.atlassian.com/bitbucketserver072/personal-access-tokens-1005335924.html). Ensure that all repository scopes are selected for the token.

1. Add your private repository to the `repositories` section of `composer.json`:

    ```json:title=composer.json
    "repositories": [
        {
            "name": "vendor/package-name",
            "type": "vcs",
            "url": "https://username@bitbucket.org/vendor/package-name.git"
        }
    ],
    ```

1. Run the command below to require the package and specify the branch, prefixed with `dev-`:

   ```bash{promptUser: user
   composer require mycompany/my-private-repo:dev-branch-name
   ```

1. Run the `composer update` command to install the new package.

1. Run the commands below to commit the updated Composer files and add them to your environment only if the above command update works locally.

   ```bash{promptUser: user
   git add composer.json composer.lock
   git commit -m "Adding private package <your-package>"
   git push
   ```

</Tab>

</TabList>

## More Resources

- [Git on Pantheon Guide](/guides/git)