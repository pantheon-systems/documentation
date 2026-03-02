---
title: Next.js 16 Now Default for New Sites
published_date: "2026-03-02"
categories: [nextjs, new-feature]
---

Next.js 16 is now the default version for new site creation on Pantheon. When creating a new Next.js site, you will automatically get Next.js 16, the latest version of the leading React framework for building web applications.

## What's New

Next.js 16 introduces [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components), moving the framework further in the direction of "dynamic by default" architecture. Pantheon's horizontally scalable container infrastructure with shared caches is well-suited to support this direction.

## Creating New Sites

When you create a new Next.js site, it will default to Next.js 16. You can create sites via Terminus:

```bash
terminus site:create my-site-name my-site-label nextjs-16 \
  --org="My Pantheon Org name" \
  --vcs-provider=github \
  --vcs-org=my-github-org-name \
  --repository-name=my-repository-name
```

You can also create Next.js sites through the [Pantheon Dashboard](/nextjs/hello-world-tutorial), which will automatically use Next.js 16.

## Additional Information

For more details about Next.js on Pantheon, see our [Next.js documentation](/nextjs).
