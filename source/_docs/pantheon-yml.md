---
title: The pantheon.yml Configuration File
description: Set site configuration in a pantheon.yml file stored in the root of their code repository.  
tags: [pantheonyml, infrastructure]
categories: []
---

Hook into platform workflows and add advanced site configuration via the `pantheon.yml` file. To get started, create a new file named `pantheon.yml` in the root of your site's code repository. Refer to [example.pantheon.yml](https://github.com/pantheon-systems/quicksilver-examples/blob/master/example.pantheon.yml) for example configurations. Refer to the [Pantheon Cloud Integration Examples](https://github.com/pantheon-systems/quicksilver-examples) repository for example scripts for use with Quicksilver Platform Hooks.


## Advanced Site Configuration
### Required Properties
You must define the `api_version` property for the `pantheon.yml` configuration file to be valid:
```yaml
api_version: 1
```

### Protected Web Paths

If you have files or directories inside of your docroot that you'd like to protect from public web access, use `protected_web_paths`. For example, if you add the following `pantheon.yml` to the root of your site's codebase:

```yaml
protected_web_paths:
  - /example.txt
  - /example_directory
```

That will ensure that if someone visits `https://example.com/example.txt` or `https://example.com/example_directory/any_nested_file.txt`, both will return a 403 error instead of being displayed.

**Considerations:**

* Specify the exact path; no regex or wildcards allowed
* Paths begin with a leading `/` and are relative to your docroot
* Limited to 24 protected paths
* You may not be able to protect files or paths with special characters
* Wait a few seconds for changes to take effect

### Nested Docroot

If you'd like to nest your docroot one level beneath your code repository in a directory named `web`, you may do so with the following `pantheon.yml`:

```yaml
web_docroot: true
```

The name of the nested directory is not configurable.

For more information, see [Serving Sites from the Web Subdirectory](/docs/nested-docroot).


### PHP Version

Add `php_version` to the top level of the `pantheon.yml` file to configure the PHP version. Your PHP version will be managed in version control and deployed along with the rest of your site's code. This encourages a good best practice of testing before making a change on your Live site.

```yaml
php_version: 7.0
```
If you are upgrading to PHP 7, you may need to make changes to your site's codebase for compatibility. If you use Drupal, you need to [switch to Drush version 7 or higher](https://pantheon.io/docs/drush-versions/#configure-drush-version). For more information, see [Upgrade PHP Versions](/docs/php-versions).

### Drush Version
Add `drush_version` to the top level of the `pantheon.yml` file to configure the Drush version used when making calls remotely on Pantheon:

```yaml
drush_version: 8
```
For more information, see [Managing Drush Versions on Pantheon](/docs/drush-versions).
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
Changes made to the `pantheon.yml` file on a branch **are not** detected when creating the Multidev environment for that branch. It is necessary to create the multidev first, and then modify pantheon.yml. As a workaround, make some modification the `pantheon.yml` file and re-commit to the Multidev environment. You will then receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

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
