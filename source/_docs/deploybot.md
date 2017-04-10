---
title:  Deploy to Pantheon from an External Repository using DeployBot
description: Learn how to set up and use DeployBot to deploy from repositories hosted with a third party provider, like GitHub, to Pantheon.
category:
  - developing
tags: [siteintegrations, workflow]
contributors: [ataylorme, rachelwhitton]
---

DeployBot is a continuous integration service with a friendly user interface. Instead of managing options with `yml` files, DeployBot offers an easy web GUI. For sites that already use external Git hosting, DeployBot can be integrated into your workflow to test and deploy sites that require additional build steps.

Continuous integration solutions make sure that each step in your deployment process gets executed with machine precision. Avoiding human error, especially in a repeatable process such as manage dependencies or compiling JavaScript and CSS files, helps free up resources while preserving the sanity of developers.

## Before You Begin
- If you don't already have a DeployBot account, [create one now](https://signup.deploybot.com/account/new).
- Manage and store your site's code repository on a third party hosting service, such as [GitHub](/docs/guides/collaborative-development/).
- Your workflow and build steps should already be known and established before attempting to add continuous integration.

  For example, if you would like to use DeployBot to send compiled CSS and JavaScript files to Pantheon you should already have a task runner, such as [Grunt](https://gruntjs.com/), within your site's codebase that can be used to compile assets.

  It's **imperative** to have a step by step workflow defined before you start adding continuous integration to the mix.

### Considerations
There are a few known limitations to consider before proceeding:

- DeployBot does not support installing third party software on server environments at this time. This limits the amount of automation you can achieve with regards to Pantheon's workflow. Being unable to install [Terminus](/docs/terminus), for example, means you can't automatically commit changes from DeployBot after a deployment. You also won't be able to manage Multidev environments automatically when working on feature branches.
- The example workflow may result in committing compiled asset files or code on Pantheon that you might not commit in the source repositories on hosts such as GitHub. The primary use case for this example is to keep a lean repo with fewer source files in GitHub and use DeployBot to compile and ship to Pantheon.

### Example Workflow
Let's say I use [Composer](/docs/composer/) to manage my WordPress site's plugin and theme requirements, and only track core and custom code in version control. I could host the lean source code repository on GitHub, then use DeployBot to run build commands that install my dependencies and deploy the full application to Pantheon's Dev environment. Here's what my `composer.json` file might look like for my site:

```
{
  "minimum-stability": "dev",
  "config"      : {
    "vendor-dir": "wp-content/vendor"
  },
  "repositories": {
    "wpackagist": {
      "type": "composer",
      "url": "https://wpackagist.org"
    },
    "packagist": {
      "type": "composer",
      "url": "https://packagist.org/"
    }
  },
  "require-dev": {
    "wpackagist-plugin/debug-bar": "dev-trunk"
  },
  "require": {
    "composer/installers": "^1.0.21",
    "koodimonni/composer-dropin-installer": "*",
    "wpackagist-plugin/wp-cfm": "1.*",
    "wpackagist-plugin/debug-bar": "dev-trunk",
    "wpackagist-plugin/lh-hsts": "1.*",
    "wpackagist-plugin/solr-power": "*",
    "wpackagist-plugin/pantheon-hud": "0.1.*",
    "wpackagist-plugin/wp-native-php-sessions": "0.6",
    "wpackagist-plugin/wp-redis": "*",
    "wpackagist-plugin/wordpress-seo": "4.*",
    "wpackagist-plugin/sendgrid-email-delivery-simplified": "1.*",
    "wpackagist-plugin/google-analytics-for-wordpress": "6.1.6",
    "wpackagist-theme/twentyseventeen": "1.*"
  },
  "extra": {
    "installer-paths": {
      "wp-content/plugins/{$name}/": ["type:wordpress-plugin"],
      "wp-content/mu-plugins/{$name}/": ["type:wordpress-muplugin"],
      "wp-content/themes/{$name}/": ["type:wordpress-theme"]
    },
    "dropin-paths": {
      "wp-content": [
        "package:wpackagist-plugin/wp-redis:object-cache.php"
      ]
    }
  }
}
```

## Deploy GitHub to Pantheon with DeployBot
### Connect Your GitHub Repository
1. After creating a new DeployBot account or logging in to your existing DeployBot account, click **Connect a repository**.
2. Select the desired repository using the the drop-down menu. If this is your first time connecting, you'll need to authorize access to your repositories.
3. Enter a title for this repository and apply a color label, then click **Connect**.

### Connect Your Pantheon Repository
1. Click **Create an environment** and enter an environment name, such as Dev.
2. Select a Deployment Mode: Manual or Automatic. We suggest deploying automatically to Pantheon's Dev environment.
3. Choose the master branch from the drop-down menu, and click **Save**.
4. Select the **SFTP** deployment option within the Files section.
5. Name the destination for these deployments, such as Pantheon Dev Environment.
6. Retrieve the target environment's SFTP details within the Site Dashboard on Pantheon by clicking **Connection Info**:

 ![Connection info dev dashboard](/source/docs/assets/images/dashboard/connection-info.png)

7. Use the SFTP values gathered in the previous step to enter the host, port, and login (username). The destination path should use `~/code`.

    <div class="alert alert-danger">
    <h4 class="info">Warning</h4>
    <p markdown="1">
      Due to the nature of our platform architecture, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. Update values here with information from Pantheon's Site Dashboard periodically or when you are unable to connect.

      In order to deploy to Pantheon using DeployBot, the Dev environment's connection mode must be set to SFTP.
    </p>
    </div>

    We recommend using an SSH Key for the authentication method. Click **Show the commands to add our public key to your server.** then **download the public key itself** and [upload the key to your Pantheon account](/docs/ssh-keys/#add-your-ssh-key-to-pantheon).

8. For the WordPress example above, click **Compile, compress, or minimize your code** to define build steps, like:

        composer install

9. Click **Save**. Once a connection can be made successfully using the information provided, DeployBot confirms that everything is ready to go.

### Deploy to Pantheon
1. DeployBot will automatically deploy to Pantheon after pushing to GitHub if you setup automatic deployments. Otherwise, use the **Deploy** button to manually trigger a build.
2. Access the Dev environment of your Site Dashboard and review the uncomitted SFTP changes:

3. Commit, then deploy changes up to the Test and Live environments using the [standard Pantheon workflow](/docs/pantheon-workflow).

This process does not fully automate an entire deployment workflow but it's a great intermediate step if you're looking to get your feet wet with continuous integration. As a next step, consider [building assets with Grunt or Gulp during deployment](https://deploybot.com/guides/building-assets-with-grunt-or-gulp-during-deployment).
