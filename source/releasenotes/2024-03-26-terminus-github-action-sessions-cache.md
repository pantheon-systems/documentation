---
title: Terminus Github Action Session Caching
published_date: "2024-03-26"
categories: [new-feature, tools-apis]
---
We've updated our [Terminus GitHub Action](https://github.com/marketplace/actions/setup-terminus) with the ability to share sessions across jobs to simplify and reduce the authentication overhead including any associated rate limiting when authenticating their machine token. These sessions are encrypted prior to being cached using industry standard AES-256 encryption, PBKDF2 (Password-Based Key Derivation Function 2) algorithm, and increased iterations when deriving the encryption key. We've also updated to the latest versions of `actions/checkout` and `actions/cache`.

Some technical details:

- The session data is encrypted using OpenSSL with AES-256 and PBKDF2 before being cached.

- The session information is scoped to a workflow run, meaning re-running the same workflow will use existing cache (in case of a failure, etc) while new workflows create a new session.
