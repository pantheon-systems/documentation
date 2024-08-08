---
title: Pantheon Secrets Guide
subtitle: Basic Concepts
description: Gaining familiarity with some concepts about Pantheon Secrets will help you make the most of this feature.
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/basic-concepts
reviewed: "2024-07-30"
showtoc: true
---

<p>A <dfn id="secret">secret</dfn> is a key-value pair that should not be exposed to the general public, typically something like a password, API key, or other sensitive information that should not be added to version control.</p>

Each secret's value can be no larger than 16k (16384 Bytes)

## Secret Type

This represents how the secret is used.  A secret can only have one type.

Current types are:

  * `runtime`: This secret type can be retreived directly from your application code using the `pantheon_get_secret()` function.  This is the recommended type if you want your application to be able to use the secret while it's operating.

  * `env`: This type is used to set environment variables. Environment variables are currently only supported for Integrated Composer builds; setting environment variables on the application server is unsupported.

  * `composer`: This secret type is specifically used for authentication when pulling Composer packages from private repositories.  This is the recommended method for installing private composer packages.

  <Alert title="Note" type="info" >

  You can only set one type per secret and this cannot be changed later (unless you delete and recreate the secret).

  </Alert>


## Secret Scope

<p>A <dfn id="secret-scope">secret's scope</dfn> is the answer to the question "Where is the secret's value available?". Once set, a secret's scope cannot be changed. The secret must be deleted and recreated to change its scope.</p>

  * `ic`: This secret will be readable during Integrated Composer builds. You should use this scope to get access to your private repositories.

  * `web`: this secret will be readable by the application runtime.

  * `user`: this secret will be readable by the user. This scope should be set if you want to see the value of your secret displayed when listing site secrets with Terminus. The value for secrets without the the user scope is redacted in the Terminus secrets list.

## Owning Entity
<p>Secrets are either owned by a site or an organization. Within that <dfn id="secret-owning-entity">owning entity</dfn>, the secret may have zero or more environment overrides.</p>

### Organization-owned secrets
Organization-owned secrets are available to every site and environment that are associated with the owning organization. A common use-cases is for a CI system and infrastructure that's shared among all sites in an organization. Note that secrets from "Supporting" Organizations are explicitly ***not shared*** with the sites they support. Sites receive secret key/value pairs from their Primary Organization only.

### Site-owned secrets
Site-owned secrets are available to the site and all of its environments. A common use-case is Github tokens that a site's composer build can use to access private repos referenced in the composer file.

### Environment override
Environment overrides provide overrides to a secret value for a specific environment. A common use case for this are API keys that are different in production and non-production environments.

## Value Resolution

1. Organization values have the lowest priority. They form the base value that is used when there is no more specific value provided for the site or environment.

3. Site values will replace the organization values when present. To return the secret to it's organization value, simply delete the site value.

4. Environmental overrides have the highest priority. If the override exists, it will become the value provided to the calling function.

![Secrets Relationships](../../../images/guides/secrets/secrets-relationships.png)
