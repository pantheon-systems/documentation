---
title: Converting a Standard Drupal 8 Site to a Composer Managed Site
description: Drupal 8 sites often require the usage of Composer to manage site dependencies. The need to begin using Composer for a site build can often surface after a site is in development, necessitating a divergance from the Pantheon managed upstream.
draft: true
contributors: dustinleblanc
---
<div class="alert alert-info">
  <h4 class="info">Note</h4><p markdown="1">Converting to a Composer managed site *removes* the ability to [apply updates via the site dashboard](/docs/upstream-updates/). This is for advanced users who are comfortable taking complete responsibility for the management of site updates. 
</p>
</div>

## Before You Begin

 - Make sure to review our documentation on [Git](/docs/git) and have `git` installed.
 - Make sure to review our documentation on [Composer](/docs/composer) and have `composer` installed.
 - Make sure to clone your _current_ Pantheon site repository to a working directory on your workstation.

## Create a New Project with Composer

On your local workstation, execute the following command:

```command
composer create-project pantheon-systems/example-drops-8-composer --stability=alpha my-site-new
```

This will create a new directory based on the example project [pantheon-systems/example-drops-8-composer](https://github.com/pantheon-system/example-drops-8-composer) in the `my-site-new` directory. The directory structure should now look like this;
```sh
Sites
|-pantheon-site
|-my-site-new
```
