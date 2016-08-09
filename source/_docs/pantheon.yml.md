---
title: The pantheon.yml Configuration File
description: Developers can set site configuration in a pantheon.yml file stored in the root of their code repository.  
categories: [developing]
tags: [code, platform]
---

Hook into platform workflows and add advanced site configuration via the `pantheon.yml` file. To get started, copy [`example.pantheon.yml`](https://github.com/pantheon-systems/quicksilver-examples/blob/master/example.pantheon.yml) to `pantheon.yml`, in the root of your site's code repository.


## Use pantheon.yml for:
* [Advanced Site Configuration](#advanced-site-configuration)
  - [Nested Docroot](#nested-docroot)
  - [PHP Version](#php-version)
  - [Protected paths](#protected-paths)
* [Quicksilver Platform Integration Hooks](#quicksilver-platform-integration-hooks)

## Advanced Site configuration

### Protected Web Paths

If you have files or directories inside of your DOCROOT that you'd like to protect from public web access, use `protected_web_paths`. For example, if you add the following `pantheon.yml` to the root of your site's codebase:

```yaml
api_version: 1

protected_web_paths:
  - /example.txt
  - /example_directory
```

Then if someone visits `https://example.com/example.txt` or `https://example.com/example_directory/any_nested_file.txt` then both will return a 403 instead of being displayed.

* Specify the exact path; no regex or wildcards allowed
* Paths begin with a leading `/` and are relative to your DOCROOT
* Limited to 24 protected paths
* You may not be able to protect files or paths with special characters
* Wait a few seconds for changes to take effect

### Nested DOCROOT

If you'd like to nest your DOCROOT one level beneath your code repository in a directory named `web`, you may do so with the following `pantheon.yml`:

```yaml
api_version: 1

web_root: true
```

The name of the nested directory is not configurable.

For more information, please see (/docs/DOCROOT-article)

### PHP Version

Include `php_version` in your `pantheon.yml` to set PHP version. Your PHP version will be managed in version control and deployed along with the rest of your site's code. This encourages a good best practice of testing before making a change on your Live site.

```yaml
php_version: 7.0
```

For more information, please see [PHP Version](/docs/php-ARTICLE)


## Quicksilver Platform Integration Hooks

Quicksilver lets you hook into platform workflows to automate your Pantheon workflow. Tell us which script you want to run, and we'll run it automatically every time you or another team member triggers the workflow operation. Find (and contribute!) to a [growing set of example scripts](https://github.com/pantheon-systems/quicksilver-examples/). Find examples to enable functionality like chat-ops, database sanitization, deployment logging, and automated testing operations with a CI server.

For more information see [Automate your Workflow with Quicksilver Platform Integration Hooks](/docs/quicksilver).



## Troubleshooting

We will reject a commit that includes a `pantheon.yml` error, with a message like:
```
remote: PANTHEON ERROR:
remote:
remote: Changes to `pantheon.yml` detected, but there was an error while processing it:
remote:
remote:
remote: Version '2' is not a valid pantheon.yml version!
remote: Valid versions are: 1
```

Also note that while our parser will reject `pantheon.yml` that is invalid, it won't necessarily give you the exact reason the file is invalid. Please refer to examples above for exact syntax.

### See Also
[Automate your Workflow with Quicksilver Platform Integration Hooks](/docs/quicksilver)
[PHP Version](/docs/PHP)
[Nested docroot](/docs/nested-docroot)
