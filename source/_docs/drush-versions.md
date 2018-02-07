---
title: Managing Drush Versions on Pantheon
description: Learn about Pantheon's default Drush version and how to implement site-local usage.
tags: [devdrush, services, pantheonyml]
categories: [drupal]
---
By default, Pantheon runs Drush 8 on newly created Drupal sites.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">
When running Drush locally, we highly recommend running Drush version 8.1.15 or higher.
</p></div>

## Terminus Drush and Local Drush
[Terminus](/docs/terminus/) makes remote Drush calls on sites without using a local installation, eliminating compatibility issues between local and remote installs. For more information, see our guide on [Managing Drupal Sites with Terminus and Drush](/docs/guides/terminus-drupal-site-management/).

## Verify Current Drush Version
Verify the current version of Drush running remotely on Pantheon using [Terminus](/docs/terminus):
```bash
terminus drush <site>.<env> -- status | grep "Drush version"
```

## Configure Drush Version
You can change a site's Drush version via the [pantheon.yml file](/docs/pantheon-yml):
```yaml
api_version: 1

drush_version: 8
```
Now your site’s Drush version is managed via `pantheon.yml`, so it’s in version control and deployed along with the rest of your code.

### Available Drush Versions
Pantheon currently supports Drush 8. While Drush 5 and 7 are available if needed, they are listed as [unsupported](http://docs.drush.org/en/master/install/#drupal-compatibility){.external} by the Drush maintainers, and should be avoided unless absolutely necessary.

#### PHP Requirements

<table class="table  table-bordered table-responsive">
    <thead>
      <tr>
        <th>Drush Version</th>
        <th>Minimum PHP Version</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Drush 5</td>
        <td>PHP 5.2.0+</td>
      </tr>
      <tr>
        <td>Drush 7</td>
        <td>PHP 5.3.0+</td>
      </tr>
      <tr>
        <td>Drush 8</td>
        <td>PHP 5.4.5+</td>
      </tr>
    </tbody>
</table>

See our guide on [Upgrading PHP Versions](/docs/php-versions/).

## Troubleshooting

Sometimes even after updating the drush version in `pantheon.yml`, the correct version of drush is not called. This is usually caused by an outdated configuration file, `policy.drush.inc`, in your local `~/.drush` directory, overriding `pantheon.yml`. Remove the file, or comment out its contents, to resolve.

### Site-local Drush Usage
If you need to specify a minor version or a version not available on the platform (such as Drush 9), you can add a site-local installation of Drush to your repository. This will redispatch Pantheon's platform Drush to the site-local installation. Do not select any major version of Drush lower than 8.

For more information, see [Avoiding “Dependency Hell” with Site-Local Drush](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush){.external}.

## See Also
- [Avoiding “Dependency Hell” with Site-Local Drush (Blog)](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush)
- [Fix Up Drush Site Aliases with a Policy File (Blog)](https://pantheon.io/blog/fix-drush-site-aliases-policy-file)
- [Expand Your Use of Drush on Pantheon with More Commands (Blog)](https://pantheon.io/blog/expand-use-drush-pantheon-more-commands)
- [Drupal Drush Command-Line Utility](/docs/drush)
- [The pantheon.yml Configuration File](/docs/pantheon-yml)
