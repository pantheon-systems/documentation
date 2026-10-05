---
title: Pantheon Public API V1
subtitle: Authentication
description: Learn how to authenticate with the Pantheon Public API using a Personal Access Token.
reviewed: "2026-09-29"
contenttype: [doc]
innav: [true]
permalink: docs/guides/public-api/authentication
---

The Pantheon Public API authenticates every request with a Personal Access Token (PAT). Your token identifies you and grants the same access as your Pantheon account.

<Partial file="public-api-pat-only.md" />

## Create a Personal Access Token

Follow the steps in [Creating and Revoking Personal Access Tokens](/personal-access-tokens) to create a token in your Personal Settings. Copy the token when it's shown, because you can't view it again.

<Alert title="Note" type="info">

Personal Access Tokens expire 90 days after creation. If you use a token in an automated system, such as a CI/CD pipeline, plan to rotate it before it expires.

</Alert>

## Store your token

Keep your token out of your scripts and source code. The examples in this guide read the token from the `PANTHEON_TOKEN` environment variable:

```bash{promptUser: user}
export PANTHEON_TOKEN=<personal_access_token>
```

In CI/CD systems, store the token as a secret and expose it to your job as an environment variable.

## Send the token with each request

Include your token in the `Authorization` header of every request, using the `Bearer` scheme:

```none
Authorization: Bearer <personal_access_token>
```

Requests with a missing, expired, or revoked token are rejected.

## Make your first request

Confirm that your token works by requesting the current user. This "who am I" request returns the Pantheon account that the token belongs to:

```bash{promptUser: user}
curl -s https://api.pantheon.io/v1/current-user \
  -H "Authorization: Bearer $PANTHEON_TOKEN"
```

The response describes your user account, including your user ID, name, email address and more. This response is large and contains SSH key fingerprints. To show only the ID, name and email address fields with [jq](https://jqlang.org/), structure your request like this:

```bash{promptUser: user}
curl -s https://api.pantheon.io/v1/current-user \
  -H "Authorization: Bearer $PANTHEON_TOKEN" \
  | jq '{id, name, email}'
```

```json
{
  "id": "17f91e87-3807-4c93-837a-78f388bfbb5c",
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

## Next steps

Now that you're authenticated, [get information about a site](/guides/public-api/sites).
