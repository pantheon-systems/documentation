---
title: Next.js Build and Runtime Architecture on Pantheon
description: Information about Next.js 15 EOL and upgrading to Next.js 16
reviewed: "2026-11-24"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/nextjs-15-EOL
---

Next.js 15 will stop receiving security releases on January 31, 2027. The Next.js team extended its Maintenance LTS period beyond the original end date to give teams more time to upgrade. After the deadline, Next.js 15 will no longer receive upstream security fixes. See the [Next.js Support Policy]() for details.

We recommend upgrading applications running Next.js 15 or earlier to Next.js 16 or later before January 31, 2027.

## What’s changing in Next.js 16

- The App Router is the recommended choice for new applications and supports newer React capabilities such as Server Components. The Pages Router remains supported, and upgrading to Next.js 16 does not require migrating your routes. You can adopt the App Router separately and incrementally. See the [App Router](https://nextjs.org/docs/app) and [Pages Router](https://nextjs.org/docs/pages) documentation.
- Turbopack becomes the default bundler. Review the [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) for configuration changes and compatibility considerations.
- The deprecated middleware convention is replaced by proxy, and the next lint command is removed. The upgrade codemod can help with these changes; see more below.
- Request APIs that had temporary synchronous compatibility in Next.js 15 must be accessed asynchronously in Next.js 16. Check for synchronous uses of params, searchParams, cookies(), headers(), and draftMode() during migration.

## Upgrade to Next.js 16

Check your app's runtime and toolchain requirements. Next.js 16 requires Node.js 20.9 or later and TypeScript 5.1 or later if your project uses TypeScript. Review the [Next.js 16 upgrade guide]() for the complete requirements and breaking changes.

From your project directory, run the official upgrade codemod:

```bash
npx @next/codemod upgrade 16
```

The upgrade tool updates Next.js and its React dependencies and can apply available codemods. Review the proposed changes and resolve any remaining migration steps. See the [Next.js codemod guide]() for options and details.

Test the upgraded application in a non-production environment. Run your build, tests, and any checks for routes, data fetching, caching, and CMS integrations before deploying.

The codemod does not perform every migration. For example, if your app still accesses `params`, `searchParams`, `cookies()`, `headers()`, or `draftMode()` **synchronously**, follow the async Request APIs migration steps in the [upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16).

Upgrade well before the deadline so you have time to resolve compatibility issues and verify the application in your deployment workflow.