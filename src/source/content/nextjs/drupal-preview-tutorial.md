---
title: Drupal draft preview for Next.js
description: Preview unpublished Drupal content in a Next.js site on Pantheon using draft mode and Simple OAuth
reviewed: "2026-09-18"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/drupal-preview-tutorial
---

This tutorial shows you how to let Drupal editors preview unpublished content in a decoupled Next.js site on Pantheon. An editor clicks **Preview** in Drupal, lands on the Next.js site, and sees the draft revision rendered by the real front end.

## Learning objectives

This tutorial walks you through:

* Creating a Simple OAuth consumer so Next.js can read unpublished content
* Adding the `/api/draft` and `/api/disable-draft` routes
* Fetching the working-copy revision with `resourceVersion`
* Configuring the Drupal `next_site` preview URL and entity types

## Requirements

* A Next.js 16 site and a Drupal 11 backend on Pantheon — see the [Drupal + Next.js Quick Start](/nextjs/drupal-quickstart)
* `drupal/next` 2.x and `drupal/simple_oauth` 6.x on the Drupal site
* `next-drupal` 2.x in the Next.js project
* [Terminus](/terminus/install), logged in

<Alert title="next-drupal 2.x is required" type="danger">

The `next-drupal/draft` entry point — `enableDraftMode`, `disableDraftMode`, and `getDraftData` — only exists in `next-drupal` 2.x. Version 1.6 predates the App Router and does not export it. Check your version before you start:

```bash{promptUser: user}
npm ls next-drupal
```

</Alert>

## How it works

1. An editor clicks **Preview** on an unpublished node. Drupal builds a signed preview URL pointing at your site's `/api/draft` route, carrying `path`, `timestamp`, `secret`, `plugin`, `resourceVersion`, and locale parameters.

1. Your `/api/draft` route hands the request to `enableDraftMode()`, which POSTs those parameters back to Drupal's `/next/draft-url` endpoint for validation. Drupal recomputes the signature and confirms it. The signature uses Drupal's own private key and hash salt, so there is no preview secret to share with Next.js.

1. If validation passes, Next.js enables draft mode by setting cookies, stores the draft data, and redirects to the content's real path.

1. Your page reads the draft data, sees a `resourceVersion`, and fetches that revision from JSON:API with an OAuth bearer token instead of the published one.

The secret is time-limited and computed from the timestamp, path, and resource version, so a preview link cannot be replayed indefinitely or edited to expose a different node.

<Alert title="Using the demo upstream?" type="info">

Sites installed from [`demo-nextjs-drupal-backend`](https://github.com/pantheon-upstreams/demo-nextjs-drupal-backend) with version 1.1.0 or later of the `pantheon_nextjs_demo` recipe already have the role, scope, consumer, and per-content-type preview configured below. Skip to [Add the draft routes](#add-the-draft-routes).

</Alert>

## Create the OAuth consumer

Next.js needs authenticated access to read unpublished content. Simple OAuth uses roles as scopes.

### Create a role

1. Go to `/admin/people/roles` and click **+ Add role**.
1. Name it `Next.js preview`, with the machine name `nextjs_preview`, and save.
1. Assign it these permissions at `/admin/people/permissions`:

    - View published content
    - Bypass content access control

<Alert title="Why bypass content access control" type="info">

This permission lets Next.js read unpublished nodes and revisions. It applies only to authenticated requests made with this consumer's token, not to anonymous traffic. Keep the client secret in Pantheon Secrets and never expose it to the browser.

</Alert>

### Create a user and generate keys

1. Add a user at `/admin/people/create` and assign it the `Next.js preview` role.

1. Go to `/admin/config/people/simple_oauth` and click **Generate keys**. Store them outside the docroot — on Pantheon, use the [private files path](/guides/secure-development/private-paths#private-path-for-files).

### Create the scope and consumer

1. At `/admin/config/people/simple_oauth/oauth2_scope/dynamic/add`, create a scope:

    - **Machine-readable Name**: `nextjs_preview`
    - **Grant Types**: `Client Credentials`
    - **Granularity**: `Role`
    - **Role**: `Next.js preview`

1. At `/admin/config/services/consumer/add`, create a consumer:

    - **Label**: `Next.js site`
    - **Client ID**: `default_consumer`
    - **Secret**: a strong random value
    - **Grant Types**: `Client Credentials`
    - **Scopes**: `nextjs_preview`
    - **User**: the user you created

1. Note the client ID and secret — the secret is hashed on save and cannot be read back.

## Configure the Drupal site

### Set the preview URL

1. Go to `/admin/config/services/next` and click **Edit** next to your site.
1. Set **Preview URL** to `https://dev-my-nextjs-site.pantheonsite.io/api/draft`.
1. Click **Save**.

The **Preview secret** field on this form is not used for draft mode with `next-drupal` 2.x; you can leave it as it is.

### Enable preview for entity types

1. Go to `/admin/config/services/next/entity-types`.
1. Click **Configure entity type** and select the content type, for example **Article**.
1. On the **Draft Mode** tab, select **Site selector** as the **Plugin**.
1. Select your site under **Next.js sites**.
1. Click **Save**.

Repeat for every content type editors preview.

## Add the draft routes

Create the two routes `next-drupal` provides. Both are `GET`.

```typescript:title=app/api/draft/route.ts
import { drupal } from '@/lib/drupal';
import { enableDraftMode } from 'next-drupal/draft';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<Response | never> {
  return enableDraftMode(request, drupal);
}
```

```typescript:title=app/api/disable-draft/route.ts
import { disableDraftMode } from 'next-drupal/draft';

export async function GET() {
  return disableDraftMode();
}
```

`enableDraftMode()` validates the request against Drupal, sets the draft cookies, and redirects. You do not need to check the secret yourself — Drupal does it.

## Configure the Drupal client

The client needs OAuth credentials to read unpublished content:

```typescript:title=lib/drupal.ts
import { NextDrupal } from 'next-drupal';

const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string;
const clientId = process.env.DRUPAL_CLIENT_ID as string;
const clientSecret = process.env.DRUPAL_CLIENT_SECRET as string;

export const drupal = new NextDrupal(baseUrl, {
  auth: {
    clientId,
    clientSecret,
  },
  withAuth: false,
});
```

Leave `withAuth` off by default and turn it on per request for draft reads, as the page below does. The consumer's role can read unpublished content, so authenticating every request would let unpublished content into responses that get cached and served to visitors.

## Render the draft revision

In draft mode, fetch the working copy rather than the published default. `getDraftData()` returns the `path` and `resourceVersion` Drupal sent:

```typescript:title=app/posts/[slug]/page.tsx
import { draftMode } from 'next/headers';
import { getDraftData } from 'next-drupal/draft';
import { notFound } from 'next/navigation';
import { drupal } from '@/lib/drupal';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();

  // In draft mode, Drupal tells us which revision to render.
  const draftData = isDraft ? await getDraftData() : {};

  const article = await drupal.getResourceByPath(`/posts/${slug}`, {
    params: {
      include: 'field_image,field_tags',
      // rel:working-copy is the latest revision, published or not.
      resourceVersion: draftData.resourceVersion,
    },
    // Authenticated reads are required for unpublished content.
    withAuth: isDraft,
    // Never cache a draft.
    cache: isDraft ? 'no-store' : 'force-cache',
    next: isDraft ? undefined : { tags: ['node_list:article'] },
  });

  if (!article) {
    notFound();
  }

  return (
    <main>
      {isDraft && (
        <aside>
          Previewing a draft. <a href="/api/disable-draft">Exit preview</a>
        </aside>
      )}
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body?.processed }} />
    </main>
  );
}
```

<Alert title="Never cache draft responses" type="danger">

Draft content must use `cache: 'no-store'` and carry no cache tags. Caching a draft would store unpublished content in shared storage and risk serving it from the edge CDN to anonymous visitors.

</Alert>

Give editors a visible way out of draft mode. The banner above links to `/api/disable-draft`, which clears the cookies and returns the site to published content.

## Set the secrets

Set the OAuth credentials and the preview secret on the Next.js site, replacing `my-nextjs-site`:

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site DRUPAL_CLIENT_ID "default_consumer" --type=env --scope=web,ic --no-interaction
```

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site DRUPAL_CLIENT_SECRET "your-consumer-secret" --type=env --scope=web,ic --no-interaction
```

Push a commit afterward so a new build picks up the values.

## Test draft preview

1. In Drupal, create an Article and save it as **Unpublished**.

1. Click **Preview**. Drupal redirects you to the Next.js site.

1. Confirm the draft renders and the preview banner appears.

1. Click **Exit preview** and confirm the unpublished article is no longer reachable.

If preview fails, check the following:

* **Redirected to the live URL instead of the draft.** Drupal falls back to the live URL for anonymous users and for users with no role beyond **Authenticated user**. Confirm the editor has a role such as **Content editor**.
* **422 "The provided secret is invalid."** The preview link was altered, or Drupal's hash salt or private key changed after the link was made. Click **Preview** in Drupal again for a fresh link.
* **Every draft read fails with 401, and token requests return "Check the `scope` parameter".** The consumer has no scope. Attach the `nextjs_preview` scope to it.
* **"The provided secret has expired."** Preview links are short-lived by design. Raise **Secret expiration** at `/admin/config/services/next/settings` if your editors need longer, but keep it short.
* **Draft renders the published version.** `resourceVersion` is not reaching the JSON:API request, or `withAuth` is not set for the draft request.
* **403 from JSON:API.** The consumer's user is missing the `Next.js preview` role, or the role lacks *Bypass content access control*.

Check the runtime logs for detail:

```bash{promptUser: user}
terminus node:logs:runtime:get my-nextjs-site.dev
```

## Conclusion

Drupal editors can now preview unpublished content in the real Next.js front end, with access controlled by short-lived signed URLs and an OAuth consumer.

To continue:

* [Drupal cache revalidation for Next.js](/nextjs/drupal-revalidation-tutorial)
* [Set environment variables](/nextjs/environment-variables)
* [Multidev environments](/nextjs/multidev)
