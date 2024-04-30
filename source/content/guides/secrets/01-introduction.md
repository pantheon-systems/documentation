---
title: Terminus Plugins: 
subtitle: Terminus Secrets Manager Plugin
description: Securely store secrets in the Pantheon Platform.
terminuspage: true
type: terminuspage
layout: terminuspage
contributors: [whitneymeredith]
contenttype: [guide]
innav: [true]
categories: [cli]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus
reviewed: "2024-05-01"
---

# Pantheon Secrets

## Introduction

Pantheon Secrets is key to maintaining industry best practices for secure builds and application implementation. This feature provides a convenient mechanism for you to manage your secrets and API keys directly on the Pantheon platform.
This guide covers features and use cases of the Pantheon Secrets feature; it could also be referred as Secrets Manager because that is the Terminus plugin name.
Features

* Secure: secrets are encrypted at rest.
* Easy to use: create and update secrets via Terminus.
* Governability: secrets could be set at organization level and shared to all the sites owned by that organization.
* Overridable: secrets could be overridden at environment level when needed.
  Support

Community submitted bugs and feature requests can be found in the plugin, SDK or Drupal module issue queues. You can create an issue in the corresponding component if you don't see your bug or feedback listed.

[Contact Support](https://dashboard.pantheon.io/#support/support/all) if you have questions or need help with Terminus.

### Contribute to Pantheon Secrets

The plugin, sdk or Drupal module are open source. You can view the projects and contribute, file issues and submit feature requests.

### More Resources

* [Terminus Plugin GitHub Repository](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)
* [PHP SDK GitHub repository](https://github.com/pantheon-systems/customer-secrets-php-sdk)
* [Drupal module GitHub repository](https://github.com/pantheon-systems/pantheon_secrets)
* [Drupal module](https://www.drupal.org/project/pantheon_secrets)

## 







Terminus Plugin
Introduction
Installation
Refer to https://docs.pantheon.io/terminus/plugins[e] ?
Site Secrets Commands
Organization Secrets Commands[f][g]
Help
`terminus list secret`
Github issue queue
Community slack?


Use Case: Using secrets with Integrated Composer
Introduction
Mechanism 1: Oauth composer authentication (recommended)
GitHub
GitLab
Bitbucket
Mechanism 2: HTTP Basic Authentication
TEST THAT WHAT IS IN THE PLUGIN STILL WORKS!
Use Case: Using secrets with Drupal Key module[h]
https://github.com/pantheon-systems/pantheon_secrets/blob/1.0.x/docs/example.md


Also short version in README: https://github.com/pantheon-systems/pantheon_secrets/blob/1.0.x/README.md#usage


Use Case: Accessing secrets from your codebase
Introduction
Include this note: "Note: Only get has been implemented so far. You should handle your secrets through terminus using Terminus Secrets Manager." Do not present this as something we "may" do in the future!


Also: https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#restrictions


Note: this also applies to quicksilver scripts
Mechanism 1: get_pantheon_secrets
Mechanism 2: OOP (get a better name here!!![i][j])
https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#usage


Resources
See our detailed Drupal or WordPress examples for more detailed end to end examples.


Pantheon Secrets and local development environments
Introduction
Your local dev env won't ever be able to talk directly to secrets service so you need workarounds!! (THIS IS NOT REAL DOCS TEXT)


Document this: https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#local-environment-usage


Troubleshooting
Integrated Composer Build fails on private packages
Start with https://getpantheon.atlassian.net/wiki/spaces/CS/pages/2703294468/IC+Build+fails+on+private+packages and make it user friendly


Errors setting or deleting secrets
https://getpantheon.atlassian.net/wiki/spaces/CS/pages/2703163413/Errors+setting+or+deleting+secrets




Rate limiting
https://github.com/pantheon-systems/terminus-secrets-manager-plugin?tab=readme-ov-file#rate-limiting


Still having issues?
Contact support
What about open source projects? I (Kevin) still think it's better to go through support but unsure…


[a]Page ready for review
[b]Not sure of better wording for this but agree with this as a page
[c]Yeah, happy to rename it if anyone has suggestions
[d]just a note that we should be careful to qualify what works here.  we've had people ask for methods that aren't supported... iirc one was "a single secret for all multidevs, but different from dev"
1 total reaction
Kevin Porras reacted with 👍 at 2024-04-19 10:57 AM
[e]since the actual plugin installation is a single command, i'd list the first step as being on the latest version of terminus and link to terminus install doc there.. then i'd put the literal `terminus plugin:install` command in a code box for quick copy/paste.  can still link to plugins docu if desired.
[f]Also need a section for env overrides (for both site secrets and org secrets)
[g]I added env overrides as a concept in the previous page and will of course mention them in both site and org secrets.


Env overrides are not a command by themselves but options in the commands
[h]My intuition is that this should come after the "Accessing secrets from your codebase".  I think the latter will probably be the more common use case, and isn't CMS-specific.


But I don't feel strongly about it
[i]POOP
[j]j/k.  This is the composer package, right? `get_pantheon_secrets` isn't the composer package?  If that's right, then I'd say "composer package" or "composer library"?