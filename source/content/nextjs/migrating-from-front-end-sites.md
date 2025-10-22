---
title: How to migrate from Front-End Sites
description: Move your existing Next.js site from Pantheon's Front-End Sites to updated Next.js infrastructure.
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/migrating-from-front-end-sites

---

<Partial file="nextjs-pre-ga.md" />

## Befor you begin

* Do you have admin access to your GitHub repository?
* Do you have access to create new Next.js sites on Pantheon?
* Do you have access to your DNS provider to update DNS records?


## Connect the GitHub application to your repository

```bash{promptUser: user}
terminus site:create my-site-name my-site-label nextjs15 \
--org="My Pantheon Org name" \
--vcs-provider=github \
--vcs-org=my-github-org-name \
--repository-name=name-of-the-existing-repo
--no-create-repo
```

(Even if your codebase is not spefic to Next.js 15, use the `nextjs15` option to create the site.)


## Replicate environment variables as Pantheon secrets

https://github.com/pantheon-systems/terminus-secrets-manager-plugin
