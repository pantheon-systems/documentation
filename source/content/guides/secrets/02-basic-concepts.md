---
title: Pantheon Secrets Guide
subtitle: Basic Concepts
description: This section outlines some concepts that are worth knowing about Pantheon Secrets. Gaining familiarity with them will help you to make better use of this feature.
terminuspage: true
type: terminuspage
layout: terminuspage
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
reviewed: "2024-05-01"
---
<dl>  
<dt>Secret</dt>
<dd>A key-value pair that should not be exposed to the general public, typically something like a password, API key, or other sensitive information that you should probably not add to version control.</dd>

<dt>Secret type [^1]</dt>
<dd>
  This is a field on the secret record. It defines the usage for this secret and how it is consumed. Current types are:

  * runtime: this secret will be used to retrieve it in application runtime using API calls to the secret service. This is the recommended type to set if you want your secret to be exposed to the application runtime.

  * env: this secret will be used to set environment variables in the application runtime. This type is currently only supported for Integrated Composer builds and not being exposed as environment variables to the application runtime.

  * composer: this secret type is used for composer authentication to private packages and it is the recommended method for doing so.
</dd>

<dt>Secret Scope</dt>
<dd>
A secret's scope is the answer to the question "Where is the secret's value available?"

  * `runtime`: this secret will be used to retrieve it in application runtime using API calls to the secret service. This is the recommended type to set if you want your secret to be exposed to the application runtime.

  * `env`: this secret will be used to set environment variables in the application runtime. This type is currently only supported for Integrated Composer builds and not being exposed as environment variables to the application runtime.

  * `composer`: this secret type is used for composer  authentication to private packages and it is the recommended method for doing so.
</dd>

<dt>Owning Entity</dt>
<dd>
* **Organization-owned secrets** -  Organization-owned secrets are available to every site and environment that are associated with the owning organization. A common use-cases is for a CI system and infrastructure that's shared among all sites in an organization.

* **Site-owned secrets** -  Site-owned secrets are available to the site and all of it's environments. A common use-case is Github tokens that a site's composer build can use to access private repos referenced in the composer file.

* **Environment override**[^d]  - Environment overrides provide overrides to a secret value for a specific environment. A common use case for this are API keys that are different in production and non-production environments.
</dd>

<dt>Value Resolution</dt>
<dd>
1. Organization values are resolved first. They form the base value for the key-pair's value resolution.
2. Site values are resolved second and secret values set on the site level will override secret values set for the organization. To return the secret to it's organization value, simply delete the site value.
3. Environmental overrides are resolved finally and if the override exists, it will become the value provided to the calling function.
</dd>
</dl>

[^1]: Note that you can only set one type per secret and this cannot be changed later (unless you delete and recreate the secret).
