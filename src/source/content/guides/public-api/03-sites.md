---
title: Pantheon Public API v1
subtitle: Get site information
description: Learn how to look up a Pantheon site by its UUID or name using the Pantheon Public API.
reviewed: "2026-09-29"
contenttype: [doc]
innav: [true]
permalink: docs/guides/public-api/sites
---

Most site operations in the Pantheon Public API identify the site by its UUID. This page shows how to get information about a site, and how to find a site's UUID from its name.

The examples on this page assume your Personal Access Token is stored in the `PANTHEON_TOKEN` environment variable. See [Authenticate with the Public API](/guides/public-api/authentication).

## Get site information

Request a site by its UUID, replacing `<site_uuid>`:

```bash{promptUser: user}
SITE_ID=<site_uuid>
curl -s "https://api.pantheon.io/v1/sites/$SITE_ID" \
  -H "Authorization: Bearer $PANTHEON_TOKEN"
```

The response includes the site's machine name, label, region, upstream, settings, and multidev environments. For example, to show a few of those fields with [jq](https://jqlang.org/):

```bash{promptUser: user}
curl -s "https://api.pantheon.io/v1/sites/$SITE_ID" \
  -H "Authorization: Bearer $PANTHEON_TOKEN" \
  | jq '{id, machineName, label, regionLabel, multidevEnvironmentNames}'
```

```json
{
  "id": "99f1ccb6-4827-4787-ba84-c2af3ed45cf7",
  "machineName": "my-site",
  "label": "My Site",
  "regionLabel": "United States",
  "multidevEnvironmentNames": [
    "feature-a"
  ]
}
```

You can only request sites that your Pantheon account has access to. If you request a site that doesn't exist or that you can't access, the API returns an HTTP 403 error.
If a site has no multidev environments, `multidevEnvironmentNames` can be an empty array or `null`. Handle both in your scripts.

## Find a site's UUID

If you know the site's machine name but not its UUID, look it up by name, replacing `<site_name>`:

```bash{promptUser: user}
curl -s "https://api.pantheon.io/v1/sites/by-name/<site_name>" \
  -H "Authorization: Bearer $PANTHEON_TOKEN"
```

The response is the site's UUID as a quoted JSON string, which you can use in other requests. Use `jq -r` to remove the quotes.

You can also find a site's UUID in the Site Dashboard URL: `https://dashboard.pantheon.io/sites/<site_uuid>`.

## Next steps

[Start a workflow](/guides/public-api/workflows) to create a multidev environment on your site.
