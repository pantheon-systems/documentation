---
title: Pantheon Secrets Guide
subtitle: Troubleshooting
description: Securely store secrets in the Pantheon Platform.
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/troubleshooting
reviewed: "2024-08-22"
showtoc: true
---

## Default secret value does not exist
Setting an environmental override when no site or organization secret has been set, results in an error like this:

```
terminus secret:site:set site.dev mysecretnonexist foobar
[error]  An error happened when trying to set the secret.
[error]  Secret 'mysecretnonexist' does not exist. You should create the default secret value first.
```

A site-level or organization-level secret must be set first before you can set an environmental override.

## Invalid key name
There are some validations in place for the key name based on the key type. As an example, a secret name of type env must match the following regex: `^[a-zA-Z_][a-zA-Z0-9_]*$`. Failure to comply with those validations results in errors like this:

```
terminus secret:site:set site 1nvalid value --type=env
 [error]  An error happened when trying to set the secret.
 [error]  Invalid key name '1nvalid': Environment variable names must start with a letter or underscore, and can only contain letters, numbers, and underscores.
```

Either make your secret name match the expected pattern or change the type if that’s an option.

## Integrated Composer Build fails on private packages

This is the most common error when sites are using secrets and Integrated Composer. This may manifest in different ways and may be caused by different problems. This playbook tries to cover them.

### Error getting a private package during the IC build

This is the most common error; an example message associated to this error is:

```
Failed to download vendor/package from dist
```
(where vendor/package may be any private package)

Some possible causes for this error:

- **Problem:** Secrets are not correctly set for the site. Secrets for Integrated Composer to use need to be type `composer` and have scope `ic`. Secret types and scopes are covered in the [Basic Concepts](/guides/secrets/02-basic-concepts) documentation.

  **Solution:** ask the client to delete and recreate the secret if scope and type do not match for the given secret name

- **Problem:** Secret value/token may be expired

  **Solution:** ask the client to set the secret again to an updated value

- **Problem**: Site may be running on a PHP version below 8.0. If this is the case, there will be a message in the job output: “Skipping setting up secrets as it is not supported in PHP below 8.0”

  **Solution**: Upgrade the client to a supported PHP version.

- **Problem:** Errors with paid WordPress plugins.

  Example error message associated to this:
  "Could not find a license key for ACF PRO. No valid license key could be found"

  Possible causes for this error:

  - This error happens when [https://packagist.org/packages/pivvenit/acf-pro-installer](https://packagist.org/packages/pivvenit/acf-pro-installer) is used and the ACF_PRO_KEY is not available
  - Please note that the plugin is no longer supported by the developer as ACF now has built-in composer support. It’s a good idea to switch to the composer-based version.

  **Solution:**

  If the plugin is still in use:
  - Look for the secret with name ACF_PRO_KEY, it should be of type env and scope ic. Delete and recreate if type or scope doesn’t match.
  - Make sure the site is running PHP >= 8

- **Problem:** Error cloning private package via SSH. IC builds + secrets management is intended to clone over https and not over ssh as that would require a ssh key and the process to set things up is way more complex than http auth.

  An example error message associated to this error is:

  ```
  Failed to execute git clone --mirror -- 'git@github.com:biltmoreco/advanced-custom-fields-pro.git' '/home/pantheon-app/.cache/composer/vcs/git-github.com-biltmoreco-advanced-custom-fields-pro.git/'
  ```

  **Solution:** Change the repository definition (in composer.json) to use https instead of ssh. In this example, the repository would be https://github.com/biltmoreco/advanced-custom-fields-pro.git


## Rate limiting
The service supports up to 3 requests per second per user through Terminus. If you hit that limit, the API will return a `429` error code and the plugin will throw an error.

The PHP SDK and `pantheon_get_secret()` function are not affected by this rate limiting.

## Still having issues?

[Contact support](/guides/support/contact-support/)
