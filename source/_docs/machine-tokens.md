---
title: Creating and Revoking Machine Tokens
description: Learn how to create a machine token in order to use Terminus on your Drupal or WordPress site.
tags: [siteintegrations, security]
categories: []
---

Machine tokens are used to uniquely identify your machine and securely authenticate via [Terminus](https://github.com/pantheon-systems/cli#installation), as of the 0.10.2 release.

Machine tokens:  

* Provide the same access as your username and password  
* Do not expire   
* Can only be viewed when you’re creating it  
* Should be revoked when no longer used to help keep your account safe  

## Create a Machine Token

1. From your User Dashboard, click **Account**, and select [Machine Tokens](https://dashboard.pantheon.io/users/#account/tokens/).
2. Click **Create Token**.
3. Enter a token name, and click **Generate Token**.
4. Copy and save your machine token now, as you will not be able to view or edit it later.
5. Click **I understand** to continue.

![Machine token ready modal](/source/docs/assets/images/dashboard/machine-token-ready.png)
## Authenticate into Terminus

Use your token to authenticate into Terminus by running the following command:  
`terminus auth:login --email=<email> --machine-token=<machine_token>`

Machine tokens are keyed to the email address associated with your Pantheon user account. Once a token has been used to authenticate Terminus, future sessions are authenticated with your email address:
`terminus auth:login --email <email@example.com>`

## Switch Between Multiple Pantheon User Accounts

Machine tokens are paired with the email address associated with your Pantheon user account, so you can easily switch between users:

1. Log out of an account by running: `terminus auth:logout`  
2. Log in to another account by running: `terminus auth:login --email <email@example.com>`

## Revoke a Machine Token

For security purposes, we recommend removing tokens from your account when they are no longer used.   

1. From your User Dashboard, click **Account**, and select [Machine Tokens](https://dashboard.pantheon.io/users/#account/tokens/).
2. Locate the token you want to delete, and click **Revoke Token**.
3. Type **Revoke**, and click **I understand the consequences. Revoke this token.**

## Benefits of Using Machine Tokens

- Bot users with machine tokens can use Terminus to authenticate to and operate on Pantheon from a continuous integration (CI) server.
- Users in organizations with SAML Single-Sign On (SSO) can authenticate with Terminus.

## See Also
[The Ins and Outs of Token-Based Authentication](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)
