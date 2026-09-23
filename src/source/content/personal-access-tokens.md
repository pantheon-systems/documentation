---
title: Creating and Revoking Personal Access Tokens
description: Learn how to create a Personal Access Token (PAT) in order to use Terminus on your Drupal or WordPress site.
tags: [sso, security, terminus]
reviewed: "2026-09-21"
contenttype: [doc]
innav: [true]
categories: [security]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

Personal Access Tokens (PATs) are used to uniquely identify you and securely authenticate via [Terminus](/terminus).

Personal Access Tokens:

- Provide the same access as your username and password
- Expire automatically 90 days after creation
- Can only be viewed when you’re creating them
- Should be revoked when no longer used to help keep your account safe

<Alert title="Note" type="info">

Already have a Machine Token? It continues to work and does not expire — see [Legacy: Machine Tokens](#legacy-machine-tokens) below.

</Alert>

## Create a Personal Access Token

1. [Go to your Personal Settings](/personal-settings) and select **Personal Access Tokens**.

1. Click **Add token**.

1. Enter a token name, and click **Save**.

1. Copy and save your Personal Access Token now, as you will not be able to view it again.

5. Click **"I've saved my token"** to continue.

  ![New Personal Access Token successfully created](../../../images/dashboard/token-ready.png)

## Authenticate into Terminus

Use your token to authenticate into Terminus, replacing `<email@example.com>` and `<personal_access_token>`:

```bash{promptUser: user}
terminus auth:login --email=<email@example.com> --machine-token=<personal_access_token>
```

<Alert title="Note" type="info">

The `--machine-token` flag accepts both Machine Tokens and Personal Access Tokens.

</Alert>

Personal Access Tokens are keyed to the email address associated with your Pantheon user account. Once a token has been used to authenticate Terminus, future sessions are authenticated with your email address:

```bash{promptUser: user}
terminus auth:login --email <email@example.com>
```

## Switch Between Multiple Pantheon User Accounts

Personal Access Tokens are paired with the email address associated with your Pantheon user account, so you can easily switch between users.

Log in to another account by running:

```bash{promptUser: user}
terminus auth:login --email <email@example.com>
```

## Renew an Expired Personal Access Token

Personal Access Tokens expire 90 days after creation. Once a token expires, `terminus auth:login` fails and you must generate a new token to continue.

1. [Go to your Personal Settings](/personal-settings) and select **Personal Access Tokens**.

1. Click **Add token** to generate a new token, then authenticate Terminus with it as described above.

## Revoke a Personal Access Token

For security purposes, we recommend removing tokens from your account when they are no longer used.

1. [Go to your Personal Settings](/personal-settings) and select **Personal Access Tokens**.

1. Locate the token you want to delete, and click **Revoke Token**.

1. Type **Revoke**, and click **I understand the consequences. Revoke this token.**

## Benefits of Using Personal Access Tokens

- Bot users with Personal Access Tokens can use Terminus to authenticate to and operate on Pantheon from a continuous integration (CI) server
- Users in organizations with SAML Single-Sign On (SSO) can authenticate with Terminus

<Alert title="Note" type="info">

Because Personal Access Tokens expire after 90 days, a CI/CD pipeline authenticated with one will need its stored secret rotated periodically. See [Authenticate Terminus for Continuous Integration](/terminus/scripting#authenticate-terminus-for-continuous-integration).

</Alert>

## Legacy: Machine Tokens

<Alert title="Warning" type="warning">

Machine Tokens are a legacy authentication method. New tokens can only be created as Personal Access Tokens, but existing Machine Tokens are not deprecated and continue to work — they appear alongside your Personal Access Tokens in the same list in Personal Settings.

</Alert>

If you created a Machine Token before Personal Access Tokens were introduced, it:

- Provides the same access as your username and password
- Does not expire
- Could only be viewed when it was created
- Should be revoked when no longer used to help keep your account safe

### Revoke a Machine Token

1. [Go to your Personal Settings](/personal-settings) and select **Personal Access Tokens**.

1. Locate the Machine Token you want to delete — it's labeled accordingly in the list — and click **Revoke Token**.

1. Type **Revoke**, and click **I understand the consequences. Revoke this token.**

## Troubleshooting

### Microsoft Edge

Currently, Personal Access Tokens cannot be generated using Microsoft Edge browser. As a workaround, generate the token using Mozilla Firefox or Google Chrome, which has been tested as working on Windows 10.

### Invalid Token Names

The following token names are not allowed, and will be automatically renamed to "Generic Feature Phone":

- pantheon hud
- pantheonHud
- pantheon-hud
