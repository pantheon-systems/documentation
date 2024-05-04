---
title: Pantheon Secrets Guide
subtitle: Terminus Secrets Manager Plugin
description: Securely store secrets in the Pantheon Platform.
terminuspage: true
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
reviewed: "2024-05-01"
---
# Troubleshooting

## Integrated Composer Build fails on private packages

This is the most common error when sites are using secrets and Integrated Composer. This may manifest in different ways and may be caused by different problems. This playbook tries to cover them.

**Error getting a private package during the IC build**

This is the most common error; an example message associated to this error is:

- Failed to download vendor/package from dist (where vendor/package may be any private package)

Some possible causes for this error:

<dl>
<dt>
**Problem:** Secrets are not correctly set for the site. Secrets for IC should be of scope ic and type composer. See instructions in the plugin README: [https://github.com/pantheon-systems/terminus-secrets-manager-plugin#mechanism-1-oauth-composer-authentication](https://github.com/pantheon-systems/terminus-secrets-manager-plugin#mechanism-1-oauth-composer-authentication)
</dt>
<dd>
**Solution:** ask the client to delete and recreate the secret if scope and type do not match for the given secret name
</dd>
</dl>

<dt>
**Problem:** Secret value/token may be expired
</dt>
<dd>
**Solution:** ask the client to set the secret again to an updated value
</dd>

<dt>
Problem: Site may be running on a PHP version < 8. If this is the case, there will be a message in the job output: “Skipping setting up secrets as it is not supported in PHP < 8”
</dt>
<dd>
Solution: ask the client to upgrade to PHP 8.1 or greater
</dd>

<dt>
**Problem:** Errors with paid WordPress plugins. 

Example error message associated to this:

- Could not find a license key for ACF PRO. No valid license key could be found

Possible causes for this error:

- This error happens when [https://packagist.org/packages/pivvenit/acf-pro-installer](https://packagist.org/packages/pivvenit/acf-pro-installer) is used and the ACF_PRO_KEY is not available
- Please note that the plugin is no longer supported by the developer as ACF now has built-in composer support. It’s a good idea to recommend customers to switch to it.
</dt>
<dd>
**Solution:** 

If the plugin is still in use:
- Look for the secret with name ACF_PRO_KEY, it should be of type env and scope ic. Delete and recreate if type or scope doesn’t match.

- Make sure the site is running PHP >= 8

</dd>
<dt>
**Problem:** Error cloning private package via SSH. IC builds + secrets management is intended to clone over https and not over ssh as that would require a ssh key and the process to set things up is way more complex than http auth.

An example error message associated to this error is:

- Failed to execute git clone --mirror -- 'git@github.com:biltmoreco/advanced-custom-fields-pro.git' '/home/pantheon-app/.cache/composer/vcs/git-github.com-biltmoreco-advanced-custom-fields-pro.git/'

</dt>
<dd>
**Solution:** Change the repository definition (in composer.json) to use https instead of ssh. In this example, the repository would be https://github.com/biltmoreco/advanced-custom-fields-pro.git
</dd>
<dt>
**Problem:** Errors setting or deleting secrets
</dt>

[https://getpantheon.atlassian.net/wiki/spaces/CS/pages/2703163413/Errors+setting+or+deleting+secrets](https://getpantheon.atlassian.net/wiki/spaces/CS/pages/2703163413/Errors+setting+or+deleting+secrets)

## Rate limiting

[https://github.com/pantheon-systems/terminus-secrets-manager-plugin?tab=readme-ov-file#rate-limiting](https://github.com/pantheon-systems/terminus-secrets-manager-plugin?tab=readme-ov-file#rate-limiting)

## Still having issues?

Contact support

What about open source projects? I (Kevin) still think it's better to go through support but unsure…

**