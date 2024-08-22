---
title: Pantheon Secrets Guide
subtitle: Secrets Overview
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
permalink: docs/guides/secrets/overview
reviewed: "2024-08-22"
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

<Alert title="Note" type="info" >

Due to platform design, the "environment" for Integrated Composer will always be either `dev` or a multidev. It will never be `test` or `live`. Therefore we do not recommend using environment overrides for Composer access. The primary use-case for environment overrides is for the CMS key-values and environment variables that need to be different between your live and non-live environments.

</Alert>


## Value Resolution

1. Organization values have the lowest priority. They form the base value that is used when there is no more specific value provided for the site or environment.

3. Site values will replace the organization values when present. To return the secret to it's organization value, simply delete the site value.

4. Environmental overrides have the highest priority. If the override exists, it will become the value provided to the calling function.

### The life of a secret

When a given runtime (e.g. Integrated Composer or an environment PHP runtime) fetches secrets for a given site (and environment), the process will be as follows:

- Fetch secrets for site (of the given type and scopes).

- Apply environment overrides (if any) based on the requesting site environment.

- If the site is owned by an organization:

    - Fetch the organization secrets.

    - Apply environment overrides (if any) based on the requesting site environment.

    - Merge the organization secrets with the site secrets (the following example will describe this process in more detail).

### Example Value Resolution
Given you have an integrated composer site named `my-org-site` which belongs to an organization `my-org`, and you also have another integrated composer site named `my-personal-site` which belongs to your personal Pantheon account.

When Integrated Composer attempts to get secrets for `my-personal-site` it will work like this:
- Get the secrets of scope `ic` for `my-personal-site`.
- Apply environment overrides for the current environment.
- Look at `my-personal-site` owner. In this case, it is NOT an organization so there are no organization secrets to merge.
- Process the resulting secrets to make them available to Composer.

On the other hand, when Integrated Composer attempts to get secrets for `my-org-site`, it will work like this:
- Fetch the secrets in the scope of `ic` for `my-org-site`.
- Apply environment overrides for the current environment.
- Look at the site owner. The organization `my-org` is identified.
- Fetch the secrets for the organization `my-org` with scope `ic`.
- Apply the environment overrides to those secrets for the current environment.
- Merge the resulting organization secrets with the site secrets with the following caveats:
    - Site secrets take precedence over organization secrets. This means that the value for site-owned secret named `foo` will be used instead of the value for an org-owned secret with the same name `foo`.
    - Only the secrets for the OWNER organization are being merged. If the site has a Supporting Organization, it will be ignored.
- Process the resulting secrets to make them available to Composer.
