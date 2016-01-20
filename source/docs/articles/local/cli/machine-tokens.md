---
title: Creating and Revoking Machine Tokens
description: Learn how to create a machine token in order to use Terminus.
---

Machine tokens are used to uniquely identify your machine and securely authenticate via Terminus (as of the 0.11.0 release).

Machine tokens:    

- Provide the same access as your username and password
- Can only be viewed when you’re creating it
- Should be revoked when no longer used to help keep your account safe

## Create a Machine Token

1. From your User Dashboard, click **Account**, and select [Machine Tokens](https://dashboard.pantheon.io/users/#account/tokens/).
2. Click **Create Token**.
3. Enter a token name, and click **Generate Token**.
4. Copy and save your machine token now, as you will not be able to view or edit it later.
5. Click **I understand** to continue.

## Authenticate into Terminus
Use your token to authenticate into Terminus by running the following command:  
`terminus auth login --machine-token=<machine token>`

## Revoke a Machine Token

For security purposes, we recommend removing tokens from your account when they are no longer used.   

1. From your User Dashboard, click **Account**, and select [Machine Tokens](https://dashboard.pantheon.io/users/#account/tokens/).
2. Locate the token you want to delete, and click **Revoke Token**.
3. Type **Revoke**, and click **I understand the consequences. Revoke this token.**

## Benefits of Using Machine Tokens

### Continuous Integration (CI)
Create a bot user, add a machine token, and save that machine token in an environment variable on Circle CI. Include bash scripts in your repository at `~/code/private/scripts/` that authenticate to the site with Terminus to automate repetitive procedures.

### Terminus Authentication for SAML/Single-Sign On (SSO)
Users in Organizations with SSO can now authenticate via Terminus. You’ll no longer be redirected to the single-sign on page.


## See Also
- [The Ins and Outs of Token-Based Authentication](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)
- [Heroku CLI Authentication](https://devcenter.heroku.com/articles/authentication)
