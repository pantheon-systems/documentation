---
title: Integrated Composer
subtitle: Manage Dependencies
description: Learn how to add or remove an individual site dependency.
tags: [composer, workflow]
contributors: [ari, edwardangert]
showtoc: true
permalink: docs/guides/integrated-composer/dependencies
contenttype: [guide]
innav: [false]
categories: [dependencies]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
reviewed: "2024-10-15"
---

This sections provides information on dependency requirements and how to add or remove individual site dependencies.

## Composer `require` and `require dev` Sections

It's important to understand how `require` and `require dev` are used on the Pantheon platform.

### Composer `require` Section

Drupal modules / themes and WordPress plugins / themes should always be in the `require` section, not the `require-dev` section. Dependencies in the `require` section are pushed to all Pantheon environments.

### Composer `require dev` Section

You should use the `require-dev` section for dependencies that are not a part of the web application but are necessary to build or test your project. Some examples are `php_codesniffer` and `phpunit`. Dev dependencies are deployed to Pantheon Dev and Multidev environments, but not to Test and Live environments.

Third-party dependencies, such as modules / plugins and themes, are added to the project via `composer.json`. The `composer.lock` file keeps track of the exact version of dependency. [Composer `installer-paths`](https://getcomposer.org/doc/faqs/how-do-i-install-a-package-to-a-custom-path-for-my-framework.md#how-do-i-install-a-package-to-a-custom-path-for-my-framework-) are used to ensure the dependencies are downloaded into the appropriate directory.

### Select Dependencies Locally

When running `composer install` on a local clone of your Pantheon site's repository, you can use the `--no-dev` option to install the dependencies that will be installed on the Pantheon Test and Live environments. Do not include this option to install the dependencies that will be installed on Dev and Multidev environments on Pantheon. The `--no-dev` option has no effect on what is written to the `composer.lock` file, and therefore does not change the behavior of your site on Pantheon. This option is only relevant to local testing.

## Add a Module, Plugin, or Theme

<TabList>

<Tab title="Drupal" id="drupal" active={true}>

1. [Clone the Git repository](/guides/git/git-config#clone-your-site-codebase) from the Pantheon site's dashboard.

1. Run `composer install`:

   ```bash{promptUser: user}
   composer install
   ```

1. Add a new dependency locally:

   ```bash{promptUser: user}
   composer require drupal/pkg-name
   ```

1. Commit `composer.json` and `composer.lock` and push the changes.

   ```bash{promptUser: user}
   git add composer.json composer.lock && git commit -m "added composer.json and composer.lock" && git push
   ```

   - Pantheon will run Composer, build artifacts, and deploy the changes to your Dev or Multidev environment. You can now deploy the changes from the updated Dev environment to the Test and Live environments.

1. Complete the steps to [commit Dev changes to Test and Live](/pantheon-workflow#combine-code-from-dev-and-content-from-live-in-test) through your Pantheon dashboard or with [Terminus env:deploy](/terminus/commands/env-deploy).


</Tab>


<Tab title="WordPress" id="wp">

#### Using Composer to manage plugins and themes

[Packagist](https://packagist.org) is a repository of Composer packages that are available by default to projects managed by Composer. Packagist libraries receive updates from their source GitHub repositories automatically.

[WPackagist](https://wpackagist.org) is a Packagist-like mirror of the WordPress.org [plugin](https://wordpress.org/plugins) and [theme](https://wordpress.org/themes) repositories and is included with Bedrock out of the box.

You can install packages from Packagist or WPackagist without any additional configuration using `composer require`.

##### Require a Package from Packagist

Some WordPress developers push their packages to Packagist in addition to the WordPress plugin and theme repositories. In this way, it may be beneficial to pull those packages directly from Packagist to get the latest code directly from the source.


```bash{promptUser: user}
composer require yoast/wordpress-seo
```

Packages that are flagged as `wordpress-plugin`, `wordpress-theme` or `wordpress-muplugin` in their `composer.json` files will be installed automatically in the appropriate `web/app/` directory by Composer.

##### Requiring a package from WPackagist

For all other plugins and themes that are not managed on Packagist, you can use `composer require` as well, using `wpackagist-plugin` or `wpackagist-theme` as the vendor and the plugin or theme slug as the package name.


```bash{promptUser: user}
composer require wpackagist-theme/twentytwentytwo
```

```bash{promptUser: user}
composer require wpackagist-plugin/advanced-custom-fields
```

##### Check first
It's generally a good idea when using either Packagist or WPackagist to check the repository before `require`ing the package. If you search Packagist for a WordPress plugin or theme and don't see it, you can be sure that if it exists in the WordPress plugin or theme repository, it will be available on WPackagist. Checking WPackagist for the package can be beneficial if you want to check what versions are available.

</Tab>



</TabList>

## Add a Package from a Private Repository

<Alert title="Note" type="info">

Pantheons Secrets Manager is currently in Early Access (EA). You can also use the [Terminus plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) to manage your secrets for private repositories in Integrated Composer builds without committing your credentials to the repository. If you use it, follow the instructions in the Terminus plugin README instead of the steps presented on this page.

</Alert >

The steps below outline a method for adding a package from a private GitHub, GitLab, or Bitbucket repository. Refer to the official [Composer documentation](https://getcomposer.org/doc/articles/handling-private-packages.md) for additional information on handling private packages.

A token will be added to your code repository for this procedure. This allows anyone with the token to read and write to private repositories associated with the issuing account. You can explore workarounds to limit the scope of the token access. For example, you can create a new GitHub user and restrict that user's permission to only the private repositories needed for your Composer packages. This ensures your site repository code is not published publicly.

Your repository should contain a `composer.json` file that declares a package name in its name field. If it is a WordPress plugin or a Drupal module, it should specify a type of `wordpress-plugin` or `drupal-module` respectively. For these instructions, we will assume your package name is `mycompany/my-private-repo`.

<TabList>

<Tab title="GitHub" id="github-example" active={true}>

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

1. Run the command below to require the package (you may specify any needed version constraint in this step):

   ```bash{promptUser: user
   composer require mycompany/my-private-repo
   ```

1. Run the commands below to commit the updated Composer files and add them to your environment only if the above command update works locally.

   ```bash{promptUser: user
   git add composer.json composer.lock
   git commit -m "Adding private package <your-package>"
   git push
   ```

</Tab>

<Tab title="GitLab" id="gitlab-example">

1. [Generate a GitLab token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that `read_repository` scope is selected for the token.

1. Add the private repository to `composer.json`, replacing `<token>` with your newly generated token.
 
    ```json:title=composer.json
    "repositories": [
        {
            "type": "vcs",
            "url": "https://oauth2:<token>@gitlab.com/mycompany/my-private-repo.git"
        }
    ],
    ```

1. Run the command below to require the package (you may specify any needed version constraint in this step):

   ```bash{promptUser: user
   composer require mycompany/my-private-repo
   ```

1. Run the commands below to commit the updated Composer files and add them to your environment only if the above command update works locally.

   ```bash{promptUser: user
   git add composer.json composer.lock
   git commit -m "Adding private package <your-package>"
   git push
   ```

</Tab>

<Tab title="Bitbucket" id="bitbucket-example">

1. [Generate a Bitbucket oauth consumer](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/). Ensure that Read repositories permission is selected for the consumer. Also, set the consumer as private and put a (dummy) callback URL.

1. Use the consumer key and consumer secret to create an `auth.json` file in your repo root like this:

    ```bash{promptUser: user}
    composer config bitbucket-oauth.bitbucket.org consumer-key consumer-secret
    ```

1. Add your private repository to the `repositories` section of `composer.json`:

    ```json:title=composer.json
    "repositories": [
        {
            "type": "vcs",
            "url": "https://bitbucket.org/vendor/package-name.git"
        }
    ],
    ```

1. Run the command below to require the package (you may specify any needed version constraint in this step):

   ```bash{promptUser: user
   composer require mycompany/my-private-repo
   ```

1. Run the commands below to commit the updated Composer files and add them to your environment only if the above command update works locally.

   ```bash{promptUser: user
   git add auth.json composer.json composer.lock
   git commit -m "Adding private package <your-package>"
   git push
   ```

</Tab>

</TabList>


## Remove Individual Site Dependencies

You can remove site dependencies if they are no longer needed. You should use caution when removing individual site dependencies. You can cause problems with your site if you decide you no longer need a module but leave it installed, and then remove site dependencies.

1. [Clone the database from Live](/pantheon-workflow#combine-code-from-dev-and-content-from-live-in-test) to all other environments before continuing.

1. Ensure that all modules in the package have been uninstalled. You can uninstall modules in the Drupal admin dashboard, or from the command line with Terminus:

    ```bash{promptUser: user}
    terminus drush site.live -- pm:uninstall module1 module2
   ```

1. Remove the dependency locally:

   ```bash{promptUser: user}
   composer remove drupal/pkg-name
   ```

1. Commit `composer.json` and `composer.lock` and push the changes.

   - Pantheon will run Composer, generate build artifacts, etc.


## Updating Dependencies

Integrated Composer on Pantheon runs Composer operations on the server level. Which operations are run depends on what you are doing with your code.

### Pushing Code to Pantheon

When you push code to Pantheon, a `composer install` operation is run. This operation installs the dependencies listed in the `composer.lock` file. This ensures that the same versions of dependencies are installed on all environments.

### Update all dependencies

When you check for an upstream update, the `composer update` operation is run. This operation updates all Composer-managed packages according to the version constraints in your `composer.json` file. This ensures that your site is up-to-date with the latest versions of all Composer-managed packages. Refer to the [Composer Versions](https://getcomposer.org/doc/articles/versions.md) documentation for more information on version constraints.

When you click to _apply_ these upstream updates, the `composer update` operation is run on the Pantheon server. This updates the `composer.lock` file with the new versions of the packages. The `composer.lock` file is then committed to the repository and pushed to Pantheon.


#### Site Dashboard

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard), **Dev** tab, and click **Code**.

1. Click **Check Now**.

1. Switch your **Development Mode** from SFTP to **Git** if you have not done so already.

1. Click **Apply Updates** if updates are available.

#### Terminus

Run the command below to apply available updates to your site development environment:

```bash{promptUser: user}
terminus upstream:updates:apply --updatedb --accept-upstream -- <site>.<env>
```

### Update a specfic package

To update a specific package, run:

```bash{promptUser: user}
composer update vendor/package
```

Replace `vendor/package` with the package name you want to update. This will update only the named package to the latest version that matches the version constraints in your `composer.json` file.

## More Resources

- [Composer Dependencies - Basic Usage](https://getcomposer.org/doc/01-basic-usage.md#installing-dependencies)
- [Composer Versions](https://getcomposer.org/doc/articles/versions.md)
