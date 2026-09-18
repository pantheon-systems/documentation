---
title: Drupal + Next.js Quick Start
description: Stand up a decoupled Drupal 11 backend and a Next.js 16 front end on Pantheon using the demo upstreams
reviewed: "2026-09-18"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/drupal-quickstart
---

This guide gets a decoupled Drupal 11 backend and a Next.js 16 front end running on Pantheon. Drupal serves content over JSON:API, the Next.js App Router renders it, and the [Next.js for Drupal](https://www.drupal.org/project/next) (`next`) module handles draft preview and on-demand revalidation.

## Learning objectives

This guide walks you through:

* Creating a Drupal backend from the `demo-nextjs-drupal-backend` Custom Upstream
* Creating a Next.js site from the `demo-nextjs-drupal-frontend` repository
* Connecting the two with the Drupal `next_site` entity and Pantheon Secrets
* Verifying that content flows from Drupal to Next.js

## Requirements

* A Pantheon workspace on a Gold, Platinum, or Diamond plan — Next.js sites require [Multidev](/guides/multidev)
* A GitHub or GitLab account, for the front-end repository
* Install the following:
  - [Git](https://git-scm.com/)
  - [Terminus](/terminus/install)\*

\* Requires logging in after installation.

## Architecture

The two halves deploy through **different** Pantheon models. Keep them straight:

| Part | Repository | Pantheon model | Deploys by |
|---|---|---|---|
| Drupal 11 backend | [`pantheon-upstreams/demo-nextjs-drupal-backend`](https://github.com/pantheon-upstreams/demo-nextjs-drupal-backend) | Custom Upstream (Integrated Composer) | `terminus upstream:updates:apply` |
| Next.js 16 front end | [`pantheon-upstreams/demo-nextjs-drupal-frontend`](https://github.com/pantheon-upstreams/demo-nextjs-drupal-frontend) | Next.js site | Git push to the connected repository |

Content flows one direction — Drupal to Next.js — over three channels:

* **Content:** JSON:API (`/jsonapi/node/article`, `/jsonapi/node/page`, and so on)
* **Navigation:** the Decoupled Menus linkset endpoint (`/system/menu/nextjs/linkset`)
* **Change notifications:** Drupal calls the front end's `/api/revalidate` when content changes, and the front end's `/api/draft` when an editor previews unpublished content

<Alert title="Front-End Sites is the legacy offering" type="info">

If you are following an older Drupal + Next.js guide under [Front-End Sites](/guides/decoupled), that offering is deprecated. This guide targets Pantheon's current [Next.js hosting](/nextjs/overview). See [How to migrate from Front-End Sites](/nextjs/migrating-from-front-end-sites) if you have an existing Front-End Site.

</Alert>

## Create the Drupal backend

The backend ships as a Pantheon Custom Upstream following the [`drupal-composer-managed`](/drupal-composer-managed) pattern. Its content model and demo content install from two Drupal recipes:

| Recipe | Type | Provides |
|---|---|---|
| `pantheon-systems-ps/pantheon_nextjs_demo` | Site | JSON:API, OAuth, the `next` / `decoupled_router` / `consumers` / `simple_oauth` / `pathauto` modules, the Page / Article / Event content types, the `nextjs` menu, and the `next_site` connection |
| `pantheon-systems-ps/pantheon_nextjs_demo_content` | Content | Demo Articles, Events, Pages, Tags, images, and menu links |

1. Add the repository as a Custom Upstream in your Pantheon workspace. See [Custom Upstream Usage](/guides/integrated-composer/ic-upstreams).

1. Create a site from that upstream. See [Create a Composer-managed CMS site](/guides/integrated-composer/create). Integrated Composer installs Drupal core, the contrib modules, and the recipe packages.

1. Install the site through the browser. The upstream ships a recipe-driven install profile that applies both recipes and provisions the OAuth pieces for draft preview.

1. On the installer's **Configure front end** step, copy the `.env` block it displays. It contains the values your Next.js site needs:

    ```env
    NEXT_PUBLIC_DRUPAL_BASE_URL=<this Drupal site's URL>
    NEXT_IMAGE_DOMAIN=<this Drupal host>
    DRUPAL_CLIENT_ID=default_consumer
    DRUPAL_CLIENT_SECRET=<generated here — shown only once>
    DRUPAL_REVALIDATE_SECRET=<your revalidate secret>
    DRUPAL_PREVIEW_SECRET=<your preview secret>
    ```

<Alert title="Copy the client secret now" type="danger">

`DRUPAL_CLIENT_SECRET` is generated during install and displayed only on that screen — it is hashed once stored on the OAuth consumer. If you lose it, reset the secret on the `default_consumer` consumer at `/admin/config/services/consumer` and update the matching Pantheon Secret.

</Alert>

## Create the Next.js site

1. Fork or clone [`demo-nextjs-drupal-frontend`](https://github.com/pantheon-upstreams/demo-nextjs-drupal-frontend) into your own GitHub or GitLab account.

1. Create a Next.js site on Pantheon connected to that repository. See the [Next.js Hello World Tutorial](/nextjs/hello-world-tutorial) for the site creation flow.

1. Confirm `package.json` pins a Node version Pantheon provides:

    ```json:title=package.json
    {
      "engines": {
        "node": "22.x"
      }
    }
    ```

Pantheon builds the site on every push. Pushing `main` deploys to Dev; opening a pull request creates a [Multidev environment](/nextjs/multidev).

## Set the environment variables

Next.js sites read environment variables from [Pantheon Secrets](/guides/secrets). Set the values from the installer's `.env` block, replacing `my-nextjs-site` with your site name:

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site NEXT_PUBLIC_DRUPAL_BASE_URL "https://dev-my-drupal-site.pantheonsite.io" --type=env --scope=web,ic --no-interaction
```

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site NEXT_IMAGE_DOMAIN "dev-my-drupal-site.pantheonsite.io" --type=env --scope=web,ic --no-interaction
```

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site DRUPAL_CLIENT_ID "default_consumer" --type=env --scope=web,ic --no-interaction
```

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site DRUPAL_CLIENT_SECRET "<one-time-secret>" --type=env --scope=web,ic --no-interaction
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_DRUPAL_BASE_URL` | Drupal backend URL, used in the browser and for server-side fetches |
| `NEXT_IMAGE_DOMAIN` | Drupal host allowed for `next/image` (host only, no scheme) |
| `DRUPAL_CLIENT_ID` | Simple OAuth consumer client ID |
| `DRUPAL_CLIENT_SECRET` | Consumer secret, used for authenticated calls and draft preview |
| `DRUPAL_REVALIDATE_SECRET` | Shared secret for on-demand revalidation — see [Drupal cache revalidation](/nextjs/drupal-revalidation-tutorial) |
| `DRUPAL_PREVIEW_SECRET` | Shared secret for draft mode — see [Drupal draft preview](/nextjs/drupal-preview-tutorial) |

To override a value for a single environment, target `<site>.<env>`:

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site.dev NEXT_PUBLIC_DRUPAL_BASE_URL "https://dev-my-drupal-site.pantheonsite.io" --type=env --rebuild
```

Secrets are picked up at build time, so push a commit or pass `--rebuild` to trigger a new build after changing them.

## Point Drupal at the front end

Drupal tracks each front end as a `next_site` entity holding its base, preview, and revalidate URLs.

1. On your Drupal site, go to **Configuration → Web services → Next.js** (`/admin/config/services/next`).

1. Edit the `nextjs` site and set:

    - **Base URL**: `https://dev-my-nextjs-site.pantheonsite.io`
    - **Preview URL**: `https://dev-my-nextjs-site.pantheonsite.io/api/draft`
    - **Revalidate URL**: `https://dev-my-nextjs-site.pantheonsite.io/api/revalidate`

1. Click **Save**.

<Alert title="One next_site per environment" type="info">

Dev, Test, Live, and each Multidev have distinct URLs. Either create a `next_site` per environment on the matching Drupal environment, or set these URLs per Drupal environment through configuration overrides in `settings.php`.

</Alert>

## Verify the connection

1. Confirm Drupal is serving JSON:API:

    ```bash{promptUser: user}
    curl -s -H "Accept: application/vnd.api+json" https://dev-my-drupal-site.pantheonsite.io/jsonapi/node/article | head -c 400
    ```

1. Confirm the linkset endpoint returns the `nextjs` menu:

    ```bash{promptUser: user}
    curl -s https://dev-my-drupal-site.pantheonsite.io/system/menu/nextjs/linkset
    ```

1. Open your Next.js site. The home page, `/posts`, `/events`, and `/tags` should render Drupal content, with navigation built from the `nextjs` menu.

If pages are empty, check that `NEXT_PUBLIC_DRUPAL_BASE_URL` points at a reachable Drupal environment and review the build and runtime logs:

```bash{promptUser: user}
terminus node:logs:runtime:get my-nextjs-site.dev
```

<Alert title="Dev environment interstitial" type="info">

Requests to a Dev environment may return a sandbox interstitial page rather than content. See [bypassing the interstitial page with an HTTP header](/guides/account-mgmt/plans/site-plans#bypassing-the-interstitial-page-with-an-http-header-during-automated-testing) when testing with `curl`.

</Alert>

## Next steps

* [Drupal cache revalidation for Next.js](/nextjs/drupal-revalidation-tutorial) — keep the front end in sync when Drupal content changes
* [Drupal draft preview for Next.js](/nextjs/drupal-preview-tutorial) — preview unpublished content from the Drupal editor
* [Deploy to Test and Live environments](/nextjs/test-and-live-env)
* [Multidev environments](/nextjs/multidev)
