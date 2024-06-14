---
title: WordPress Multisite
subtitle: Search and Replace
description: Learn about configuration requirements for search and replace on WordPress Multisites.
type: guide
contenttype: [guide]
innav: [false]
categories: [cms, troubleshooting]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [multisite]
permalink: docs/guides/multisite/search-replace/
editpath: multisite/07-search-replace.md
---

This section provides information on how to configure automatic platform Search and Replace for URLs. This feature can be used with both subdirectory and subdomain WordPress Multisites.

## Requirements

You must have the following to enable Search and Replace:

- A [WordPress Multisite](/guides/multisite).
- A PHP version of 7.4 or later.
- The site is *not* using [Integrated Composer](/guides/integrated-composer).

<Alert title="Note"  type="info" >

If your `pantheon.yml` file is different between environments, the `search_replace` value in your source environment’s `pantheon.yml` file will determine if the job runs or not. When you create a Multidev, the source environment is where you clone the database and files from.

</Alert>

## Defaults
See the following Search and Replace defaults for new and existing WordPress Multisites on Pantheon:

| WP Multisite Configuration      | Default `search_replace` value |
| ------------- | -------------------------------------- |
| Existing Multisite - Subdirectory <Popover content="Created before August 1, 2023"/> | `false` |
| New Multisite - Subdirectory | `true` |
| Existing Multisite - Subdomain <Popover content="Created before August 1, 2023"/> | `false` |
| New Multisite - Subdomain | `false` |


## Subdirectory WordPress Multisite Search and Replace Configuration

### For sites created _before_ August 1, 2023

Enabling Search and Replace for Subdirectory Multisites requires a `true` value for the `search_replace` parameter in your `pantheon.yml`.

```yaml:title=pantheon.yml
search_replace: true
```

### For sites created _after_ August 1, 2023

No additional configuration is needed for Subdirectory Multisite Search and Replace. Search and Replace will match the behavior of the platform’s Search and Replace for non-Multisite sites.

If you wish to disable Multisite Search and Replace, alter your `pantheon.yml` file to include a `false` value for the `search_replace` parameter.


```yaml:title=pantheon.yml
search_replace: false
```

## Subdomain WordPress Multisite Search and Replace Configuration
Search and Replace runs on the platform as part of creating an environment, deploying to Test or Live, and when cloning content between environments. There is currently a limit of 75 sites that can be configured for Search and Replace via domain mapping.

<Alert title="We are collecting feedback"  type="info" >

We are collecting feedback about use cases that require more than 75 URLs to be replaced. Please [fill out this form](https://forms.gle/TYvuHYSNrVmptVBW9) if this is the case. Alternatively, check out the [Subdomain to Subdirectory Multisite Conversion](#subdomain-to-subdirectory-multisite-conversion) option below which does not have any limits.

</Alert>

By default, Subdomain Multisites do not run any Search and Replace. Enabling Search and Replace for Subdomain Multisites requires setting the `search_replace` value to `custom` in `pantheon.yml` and creating a `sites.yml`. Environments that need to be replaced are defined and paired in the `sites.yml` file for subdomain Multisites. Search and replace runs for each domain listed in the source environment that has a matching key in the target environment. If Search and Replace is enabled for an environment, but the `sites.yml` file does not exist, nothing will be updated. If the `sites.yml` file is different between environments, the `domain_maps` in the target environment’s `sites.yml` file will be used to determine what is replaced.

1. Open your `pantheon.yml` file and set the `search_replace` value to `custom`.

  ```yaml:title=pantheon.yml
  search_replace: custom
  ```

1. Create a `sites.yml` file inside the `private/` folder.

1. Define and pair the environments to be replaced like the sample code below.

    ```yaml:title=private/sites.yml
    ---
    api_version: 1 # Currently only one api version.
    # file should be placed in the /private folder
    # "domain_maps" is a collection of blog URLs for each environment used to
    # facilitate search-replace of a WordPress Multisite (WPMS) across pantheon
    # environments. Each key of "domain_maps" must be a valid environment name.
    domain_maps:
      # environment: <collection of domains to be used on this environment>
      # i.e. dev, test, live, feat-branch, &c.
      dev:
        # each environment collection maps the blog ID to its URL. A url must be
        # set in both the target and source environments for search-replace to be
        # run.
        # i.e. 2: blog1-mysite.com
        1: dev-example.pantheonsite.io
        2: dev.about.example.com
        3: dev.employee.example.com
        4: dev.staff-portal.example.com
        5: dev.customers.example.com
        6: dev.hr-department.example.com
      test:
        1: test-example.pantheonsite.io
        2: test.about.example.com
        6: test.hr-department.example.com
      live:
        1: www.example.com
        2: about.example.com
        3: employee.example.com
        4: staff-portal.example.com
        5: dcustomers.example.com
        6: hr-department.example.com
      multidev1:
        1: multidev1-example.pantheonsite.io
        2: multidev1.about.example.com
        3: multidev1.employee.example.com

     # Anything else in the file will be ignored, but not rejected.

    ```

1. Validate the `sites.yml` file (recommended) with Pantheon's `sites-yml-validator` utility available [on GitHub](https://github.com/pantheon-systems/sites-yml-validator). The project's `README` file includes details on how to install and use the utility.

1. Commit the  `sites.yml` file in the `private/sites.yml` in the site’s Git repository.

## Subdomain to Subdirectory Multisite Conversion

Sites can also be configured to use Subdomain Multisite in the Live environment, and Subdirectory in all other environments.

To configure this:

1. Open your `pantheon.yml` file and set the `search_replace` value to `convert`.

  ```yaml:title=pantheon.yml
  search_replace: convert
  ```

1. Open your `wp-config.php` file and locate the `SUBDOMAIN_INSTALL` key.

1. Set the `SUBDOMAIN_INSTALL` value to conditional:

    ```php:title=wp-config.php
    if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) && $_ENV['PANTHEON_ENVIRONMENT'] ==  'live' ) {
      define( 'SUBDOMAIN_INSTALL', true );
    }
    ```

    - This step is not required, but ensures that you can create new sites as subdomain sites in the Live environment while your other environments create the new sites as subdirectory sites.

The domain map in the `sites.yml` file is not necessary when converting from subdomain to subdirectory structure. When cloned, subdomains, domains, and subdirectories on the Live site will convert with the following pattern:

* `site.com`           => `test-site.pantheonsite.io`
* `blog.site.com`      => `test-site.pantheonsite.io/blog/`
* `blog.site.com/dir/` => `test-site.pantheonsite.io/blog-dir/`
* `blog.com`           => `test-site.pantheonsite.io/blog-com/`
* `blog.com/dir/`      => `test-site.pantheonsite.io/blog-com-dir/`

Sites configured for subdomain conversion will _only_ run the conversion step from Live to a non-live environment. All other workflows assume a subdirectory-to-subdirectory search and replace. There is no limit on domains when using the conversion step.

## `search_replace` Parameter Reference

* `_null_`: No `search_replace` value. Defaults to `false`. Sites created after July 31, 2023 will default to `true`.
* `true`: Runs a Search and Replace for a Subdirectory multisite.
* `false`: Do not run Search and Replace at all.
* `custom`: Run Search and Replace based on the domain map in `sites.yml`. Requires a valid `sites.yml` to exist.
* `convert`: Run Subdomain to Subdirectory conversion when cloning from the Pantheon Live environment, and Subdirectory to Subdirectory in all other cases.



## Known Issues

* WordPress Multisites that are using [Integrated Composer](/guides/integrated-composer), such as the WordPress (Composer Managed) upstream, are currently unable to use Multisite Search and Replace. For those sites, we recommend setting the `search_replace` value to `false` and using WP-CLI via Terminus to perform the Search and Replace. See [Run WP-CLI `search-replace` Manually](/guides/multisite/workflows/#run-wp-cli-search-replace-manually) for more information.

* When using the default Subdirectory search and replace, creating a new multidev with database and files pulled from the live environment will only search and replace the platform domain, i.e. `live-{site}.pantheonsite.io`. To search and replace the correct domain on your live site, immediately follow multidev creation with a database clone either through the dashboard or with Terminus, and select the correct domain as the "from" URL. We are working on handling this seamlessly in the future.

* When WordPress Multisite Search and Replace runs, your application filesystem is never mounted. This means that if you have files in the filesystem that are required for some operations to run (e.g. to load secrets from the filesystem), these Search and Replace operations will fail. If you are looking for ways to solve the issue with requiring secrets, you can express interest in the [Secrets Management Early Access Program](https://docs.google.com/forms/d/e/1FAIpQLSdMqVKts_5607LFIX9Oyq-2El04kN40vFYefuzFJoy-byZwfw/viewform) and use the new [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin).

## More Resources

- [Pantheon YAML Configuration Files](/pantheon-yml)
