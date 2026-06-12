---
title: Bun package manager and Node.js 26 support for Next.js sites
published_date: "2026-06-22"
categories: [nextjs, new-feature]
---

Pantheon now supports [Bun](https://bun.sh) as a package manager for Next.js sites, alongside npm, yarn, and pnpm. Pantheon also adds support for Node.js 26 (LTS).

## Bun support

To use Bun, add a `bun.lock` file to your repository. Pantheon automatically detects the lock file and uses Bun to install your dependencies during the build process.

You can specify a Bun version in the `engines.bun` or `packageManager` field of your `package.json`. If no version is specified, Pantheon defaults to the latest stable release.

## Node.js 26 support

Node.js 26 is now available as an LTS runtime for Next.js sites. Set the `engines.node` field in your `package.json` to use it:

```json
{
  "engines": {
    "node": "26"
  }
}
```

## Node.js 20 removed

Node.js 20 has reached end of life and is no longer available as a runtime. Sites using Node.js 20 must upgrade to Node.js 22 or later.

For more details about Next.js on Pantheon, see our [Next.js documentation](/nextjs).
