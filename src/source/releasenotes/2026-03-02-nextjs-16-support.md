---
title: Next.js 16 Support Now Available
published_date: "2026-03-02"
categories: [nextjs, new-feature]
---

Pantheon now supports Next.js 16, the latest version of the leading React framework for building web applications.

## What's New

Next.js 16 introduces [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components), moving the framework further in the direction of "dynamic by default" architecture. Pantheon's horizontally scalable container infrastructure with shared caches is well-suited to support this direction.

## Creating New Sites

To create a new Next.js 16 site, use the `nextjs-16` upstream when creating your site via Terminus:

```bash
terminus site:create my-site-name my-site-label nextjs-16 \
  --org="My Pantheon Org name" \
  --vcs-provider=github \
  --vcs-org=my-github-org-name \
  --repository-name=my-repository-name
```

You can also create Next.js 16 sites through the [Pantheon Dashboard](/nextjs/hello-world-tutorial).

## Additional Information

For more details about Next.js on Pantheon, see our [Next.js documentation](/nextjs).
