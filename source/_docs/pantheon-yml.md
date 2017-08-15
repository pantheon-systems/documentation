---
title: Pantheon YAML Configuration Files
description: Learn how to manage advanced site configuration
tags: [pantheonyml, infrastructure]
categories: []
---
Hook into platform workflows and manage advanced site configuration via the `pantheon.yml` file. Add it to the root of your site's codebase, and deploy it along with the rest of your code, so you can test before deploying live.

<div class="enablement">
  <h4 class="info" markdown="1">[Quicksilver Cloud Hooks Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Set up existing scripts and write your own with help from our experts. Pantheon delivers custom workshops to help development teams master our platform and improve their internal DevOps.</p>
</div>

For reference implementations see  [example.pantheon.yml](https://github.com/pantheon-systems/quicksilver-examples/blob/master/example.pantheon.yml) and [Quicksilver Example Scripts](https://github.com/pantheon-systems/quicksilver-examples).

## Advanced Site Configuration

### Include api_version
Define the `api_version` property in order for pantheon.yml to be valid:
```yaml
api_version: 1
```


### Protected Web Paths

Protect files and directories inside of your docroot from public web access with `protected_web_paths`. For example, the following ensures that a visitor to [https://example.com/example.txt](https://example.com/example.txt) or [https://example.com/example_directory/any_nested_file](https://example.com/example_directory/any_nested_file) receives Access Denied (403):

```yaml
protected_web_paths:
  - /example.txt
  - /example_directory
```

**Considerations:**

* Specify the exact path; no regex or wildcards allowed
* Paths begin with a leading `/` and are relative to your docroot
* Limited to 24 protected paths
* You may not be able to protect files or paths with special characters
* Wait a few seconds for changes to take effect

### Nested Docroot

Nest your docroot one level beneath your code repository in a directory named `web`:

```yaml
web_docroot: true
```

The name of the nested directory is not configurable.

For more information, see [Serving Sites from the Web Subdirectory](/docs/nested-docroot).


### PHP Version

Override the upstreams default PHP version with the `php_version` property. PHP version is managed in version control and deployed along with the rest of your site's code to encourages a good best practice of testing before making a change on your Live site.

For example, to override the upstream default value at the site level to PHP 7:

```yaml
php_version: 7.0
```

**Considerations**

* [Upgrading PHP Versions](/docs/php-versions) may require you to resolve compatibility issues with your site's codebase.
* Drupal and PHP 7 require [Drush 7 or greater](https://pantheon.io/docs/drush-versions/#configure-drush-version).
* From time to time, we will roll out a new default version of PHP, which will be available to apply as 1-click upstream update. If you are overriding the default set in the upstream, make sure to remove php_version from pantheon.yml as soon as possible to ensure you don't miss the latest recommended PHP version.
* You'll always be able to test new default PHP version in Dev and Test before deployihng Live.

### Drush Version
Add `drush_version` to the top level of the `pantheon.yml` file to configure the Drush version used when making calls remotely on Pantheon:

```yaml
drush_version: 8
```
For more information, see [Managing Drush Versions on Pantheon](/docs/drush-versions).


### Custom Upstreams and pantheon.upstream.yml
Add a `pantheon.upstream.yml` file to your organization's custom upstream to set default settings for all downstream sites. Downstream sites can override the defaults at the site-level with pantheon.yml. Quicksilver workflows are not supported in pantheon.upstream.yml.

Create the `pantheon.upstream.yml` in the root of the custom upstream's codebase. Help avoid merge conflicts by adding pantheon.upstream.yml to the upstream's .gitignore. Example: [Adding pantheon.upstream.yml to Drops-7](https://github.com/pantheon-systems/WordPress/pull/123/files)

Because pantheon.upstream.yml is in the .gitignore use git force-add to commit:

```bash
$ git add -f pantheon.upstream.yml
$ git commit -n "Change the default php version for this upstream to 7.0.x"
```

#### Nested docroot
Set the `web_docroot` property in  upstream's `pantheon.upstream.yml` file.



## Quicksilver Platform Integration Hooks

Quicksilver lets you hook into platform workflows to automate your Pantheon workflow. Tell us which script you want to run, and we'll run it automatically every time you or another team member triggers the workflow operation. View (and contribute) to a [growing set of example scripts](https://github.com/pantheon-systems/quicksilver-examples/). Find examples to enable functionality like chat-ops, database sanitization, deployment logging, and automated testing operations with a CI server.

For more information, see [Automate your Workflow with Quicksilver Platform Integration Hooks](/docs/quicksilver).


## Troubleshooting

We will reject a commit that includes a `pantheon.yml` error, with a message like:
```nohighlight
remote: PANTHEON ERROR:
remote:
remote: Changes to `pantheon.yml` detected, but there was an error while processing it:
remote:
remote:
remote: Version '2' is not a valid pantheon.yml version!
remote: Valid versions are: 1
```

While our parser will reject a `pantheon.yml` that is invalid, it won't necessarily give you the exact reason the file is invalid. Please refer to the examples above for exact syntax.

### Deploying Configuration Changes to Multidev
Changes made to pantheon.yml file on a branch **are not** detected when creating the Multidev environment for that branch. As a workaround, make some modification to `pantheon.yml` file and re-commit to the Multidev environment. You will then receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

```nohighlight
remote:
remote: PANTHEON NOTICE:
remote:
remote: Changes to `pantheon.yml` detected.
remote:
remote: Successfully applied `pantheon.yml` to the 'new-feature' environment.
remote:
remote:
```

## See Also
- [Automating and Integrating your Pantheon Workflow with Quicksilver Platform Hooks](/docs/quicksilver)  
- [Upgrade PHP Versions](/docs/php-versions)
