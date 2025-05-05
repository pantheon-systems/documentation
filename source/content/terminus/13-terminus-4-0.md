---
title: Terminus Guide
subtitle: Terminus 4
description: Learn what's new with the latest Terminus major version upgrade.
terminuspage: true
type: terminuspage
layout: terminuspage
contributors: [kporras07]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/terminus-4-0
contenttype: [guide]
innav: [false]
categories: [cli]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
---

This section provides information about Terminus 4.0. Terminus 4.0 is the most recent major version of Terminus and is recommended in place of Terminus 3.x.

<Alert title="Note" type="info" >

We suggest you read from the beginning of the [Terminus Guide](/terminus) if you're not already familiar with Terminus. This section is specifically geared at existing Terminus users who need to update existing implementations.

</Alert>

These commands or their output have changed in a significant way that may affect your existing scripting of Terminus.

## Removed Commands
The following commands were removed from Terminus 4.0:
- `service-level:set`: Replaced with `plan:set` since Terminus 2.x

## New Commands
- No new commands have been added in Terminus 4.0.

## Additional Changes
- Removed `getOrgMemberships` function from `OrganizationsTrait`: `getOrganizationMemberships` should be used instead.
- Removed `checkProgress` function from `Workflow` model: `WorkflowProcessingTrait` should be used instead.
- Removed `operations` function from `Workflow` model: `getOperations()->all()` should be used instead.
- Removed `getSite(string $site_id)` function from `SiteAwareTrait`: `getSiteById` should be used instead.
- Removed `getOptionalSiteEnv` function from `SiteAwareTrait`: `getOptionalEnv` should be used instead.
- Removed `getUnfrozenSiteEnv` function from `SiteAwareTrait`: `requireSiteIsNotFrozen` should be used instead.
- When in interactive mode, if a command is missing a required argument, it will be interactively prompted.
- Support for some EOL versions of PHP have been removed from Terminus 4. PHP 8.0 or later is required.

## More Resources

- [Terminus on GitHub](https://github.com/pantheon-systems/terminus)
- [Terminus Guide](/terminus)
- [Terminus PHP Compatibility](/terminus/supported-terminus#php-version-compatibility-matrix)