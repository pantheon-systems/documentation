---
title: Managing Custom Code with Composer
description: Understand how to manage custom plugins and themes for WordPress sites using Composer.
tags: [workflow]
categories: []
---
Extending WordPress or Drupal with custom code is a common part of the development lifecycle. In order to optimize workflows, it's essential that custom plugins, modules, and themes are maintained independently from your sites and projects so they're easily reused.

We recommend managing custom code as plugins or modules within individual repositories and hosting each one remotely on a service such as [GitHub](https://github.com/), [Bitbucket](https://bitbucket.org), or [GitLab](https://about.gitlab.com/). You can then use Composer to manage and organize the software needed for your project to run, including custom plugins or modules.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>Pantheon does not support Git submodules (placing a Git repository within a subdirectory of your site’s repository).</p>
</div>
## Before You Begin
1. Install [Composer](https://getcomposer.org/doc/00-intro.md).
2. Move custom code to individual repositories, and host them on [GitHub](https://github.com/), [Bitbucket](https://bitbucket.org), or [GitLab](https://about.gitlab.com/).
3. Set the Dev environment's connection mode to Git from within the Site Dashboard or via [Terminus](/docs/terminus):

 ```nohighlight
 $ terminus connection:set <site>.<env> git
 ```

4. [Clone the site's codebase](/docs/git/#clone-your-site-codebase), if you haven't already.

## Initialize Composer
Run `composer init` from within the root directory of your site's codebase and use the interactive setup guide to initiate Composer. Enter `dev` when prompted for `Minimum Stability []:` and `yes` when asked if you would like to add the vendor directory to your `.gitignore` file.

### Define Composer Packages
Run `git status` after initializing your project with Composer, to verify your working state. You should have one modified file (`.gitignore`) and one untracked file (`composer.json`). For additional details, see [Creating your very own Composer Package](http://knpuniversity.com/screencast/question-answer-day/create-composer-package).

**WordPress**: Open `composer.json` using your preferred text editor and define a new package to require your custom code:  

```json
"repositories": {
  "my-custom-plugin": {
    "type": "package",
    "package": {
      "name": "rachelwhitton/my-custom-plugin",
      "type": "wordpress-plugin",
      "version": "dev-master",
      "source": {
        "type": "git",
        "url": "https://github.com/rachelwhitton/my-custom-plugin.git",
        "reference": "master"
      }
    }
  }
}
```

**Drupal**: Open `composer.json` using your preferred text editor and define a new package to require your custom code:  

```json
"repositories": {
  "my-custom-module": {
    "type": "package",
    "package": {
      "name": "rachelwhitton/my-custom-module",
      "type": "drupal-module",
      "version": "dev-master",
      "source": {
        "type": "git",
        "url": "https://github.com/rachelwhitton/my-custom-module",
        "reference": "master"
      }
    }
  }
}
```

Next, add the [packagist.org](https://packagist.org/) repository and require [`composer/installers`](https://github.com/composer/installers) along with your custom plugin/module:

```json
"repositories": {
  "my-custom-plugin": {
    "type": "package",
    "package": {
      "name": "gh-user/my-custom-plugin",
      "type": "wordpress-plugin",
      "version": "dev-master",
      "source": {
        "type": "git",
        "url": "https://github.com/gh-user/my-custom-plugin.git",
        "reference": "master"
      }
    }
  },
  "packagist": {
    "type": "composer",
    "url": "https://packagist.org/"
  }
},
"require-dev": {
  "gh-user/my-custom-plugin": "dev-master"
},
"require": {
  "composer/installers": "^1.0.21"
}
```
`composer/installers` allows you to define installation paths for package types, such as plugins for WordPress:
```json
"extra": {
  "installer-paths": {
    "wp-content/plugins/{$name}/": ["type:wordpress-plugin"],
    "wp-content/mu-plugins/{$name}/": ["type:wordpress-muplugin"],
    "wp-content/themes/{$name}/": ["type:wordpress-theme"]
  }
```

Or modules for Drupal:

```json
"extra": {
  "installer-paths": {
    "sites/all/themes/{$name}/": ["type:drupal-theme"],
    "sites/all/modules/{$name}/": ["type:drupal-module"]
  }
}
```
Run `composer install` to install your custom code into the appropriate directory. Use `git status` to verify your local state, then commit and push your code to Pantheon:
```
git status
git commit -Am "Initiate composer, require custom code"
git push origin master
```

## Remote Composer Operations

Using [Terminus](/docs/terminus) and the [Terminus Composer Plugin](https://github.com/pantheon-systems/terminus-composer-plugin), it is possible to run Composer commands on your Pantheon sites directly.

1. Install the [Terminus Composer Plugin](https://github.com/pantheon-systems/terminus-composer-plugin).
2. Set the Dev environment's connection mode to SFTP from within the Site Dashboard or via [Terminus](/docs/terminus):

 ```nohighlight
 $ terminus connection:set <site>.<env> sftp
 ```
3. Run Composer commands through Terminus:

 ```nohighlight
 $ terminus composer <site>.<env> -- update
 ```
 
## Drupal Resources

- [packages.drupal.org](https://www.drupal.org/docs/develop/using-composer/using-packagesdrupalorg), a Composer repository for Drupal. It provides all projects from Drupal.org as packages for Composer.
- [Using Composer with a Relocated Document Root](https://pantheon.io/blog/using-composer-relocated-document-root-pantheon)
- [Example drops-8 Composer site](https://github.com/pantheon-systems/example-drops-8-composer), the Pantheon version of [drupal-composer/drupal-project](https://github.com/drupal-composer/drupal-project).
- [Composer Tools & Frameworks for Drupal](http://www.slideshare.net/GetPantheon/composer-tools-and-frameworks-for-drupal-20-may)
- Manage patches with [cweagans/composer-patches](https://github.com/cweagans/composer-patches)

## WordPress Resources
- [WordPress Packagist](https://wpackagist.org), mirrors the WordPress plugin and theme directories as a Composer repository.
-  Manage drop-ins with [koodimonni/composer-dropin-installer](https://github.com/Koodimonni/Composer-Dropin-Installer)

 ```json
 "require": {
   "composer/installers": "^1.0.21",
   "koodimonni/composer-dropin-installer": "*",
   "wpackagist-plugin/wp-cfm": "1.*",
   "wpackagist-plugin/wp-redis": "0.4.0"
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
 ```
