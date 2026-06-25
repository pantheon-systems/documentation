---
title: "GitLab support for external repositories"
published_date: "2026-06-24"
published_at: "2026-06-24T22:14:13Z"
categories: [new-feature, tools-apis]
description: "Pantheon's external repository integration now supports GitLab repositories, including self-hosted GitLab instances, via Terminus."
---

Pantheon's external repository integration now supports GitLab in addition to GitHub. You can connect a GitLab repository to a Pantheon site via Terminus using `--vcs-provider=gitlab`, with support for both GitLab.com and self-hosted GitLab instances.

## What's new

- **GitLab repository support** — Create Pantheon sites connected to GitLab repositories using `terminus site:create --vcs-provider=gitlab`
- **Self-hosted GitLab** — Connect sites to self-hosted GitLab instances using the `--vcs-host=<your-gitlab-domain>` flag
- **Token-based authentication** — GitLab uses legacy personal access tokens or group access tokens rather than OAuth. Tokens require `api` and `write_repository` scopes

For full setup instructions, see the [external repositories documentation](/guides/external-repositories).
