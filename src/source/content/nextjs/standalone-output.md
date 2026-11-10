---
title: Next.js Standalone Output on Pantheon
description: How Pantheon starts Next.js applications built with standalone output, and how to fix applications that depend on behavior standalone mode skips.
reviewed: "2026-11-10"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/standalone-output
---

<!-- DRAFT (SITE-6334 / SITE-6338): confirm rollout date before publishing. -->

When a Next.js build produces [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output), Pantheon starts your application with the standalone server (`node .next/standalone/server.js`) instead of `npm run start`. Your build is unchanged. Only the command that starts the container is different.

Standalone output is created when `next.config` sets `output: 'standalone'`. Applications without standalone output continue to start with `npm run start`.

## How Pantheon starts your application

When a container starts, Pantheon:

1. Looks for a standalone server at `.next/standalone/server.js`.
1. Makes sure `.next/static` and `public/` are available to the standalone server. Next.js does not copy these into standalone output, so Pantheon links them from your application directory if they are missing.
1. Exports your [environment variables](/nextjs/environment-variables) from Secrets Manager.
1. Starts the standalone server on port `3000`, listening on all interfaces. Pantheon unsets `HOSTNAME` so the server is reachable inside the container.

If no standalone server is found, Pantheon runs `npm run start`, as before.

You can confirm which mode your application uses in its runtime logs. Look for `Found Next.js standalone server at ...` or `No Next.js standalone output found; using npm run start`.

## Known differences in standalone mode

Most applications run in standalone mode without changes. Because the startup check only confirms that the server is listening, an affected application can start and still fail when a page loads. Review the following cases before your next deployment.

### Your `start` script no longer runs

The standalone server does not run the `start`, `prestart`, or `poststart` scripts in `package.json`. Anything those scripts did is skipped.

| If your `start` script... | Do this instead |
|---|---|
| Preloads APM or OpenTelemetry (for example, `node -r dd-trace/init` or `--require ./otel.js`) | Move the setup into the `register()` function in [`instrumentation.ts`](https://nextjs.org/docs/app/guides/instrumentation), which the standalone server runs. Alternatively, set a `NODE_OPTIONS` environment variable such as `--require /workspace/otel.js`. Use an absolute path, because the working directory changes. |
| Sets `NODE_OPTIONS` (for example, `--max-old-space-size`) | Set `NODE_OPTIONS` as an [environment variable](/nextjs/environment-variables). |
| Passes `--keepAliveTimeout` to `next start` | Set a `KEEP_ALIVE_TIMEOUT` environment variable, which the standalone server reads. You don't need `-p` or `-H`. |
| Runs migrations or setup (for example, `prisma migrate deploy && next start`) | Run them outside container startup, such as in your `build` script or as a separate step. Running them in `instrumentation.ts` works, but it runs once per container, so migrations can run concurrently. |
| Starts a custom server (for example, `node server.mjs`) | Remove `output: 'standalone'` from `next.config`. Next.js custom servers are not designed to be combined with standalone output. |

### Files read at runtime may be missing

Standalone output includes only the files that Next.js detects during build tracing. Files your code reads with computed paths at runtime may not be included, such as content or Markdown directories, JSON data, templates, translation files, and native binaries like Prisma engines.

To fix this, do one or more of the following:

* Add the files to `outputFileTracingIncludes` in `next.config`. Next.js copies them into the standalone output with the same relative paths.

  ```javascript:title=next.config.mjs
  const nextConfig = {
    output: 'standalone',
    outputFileTracingIncludes: {
      '/*': ['./content/**/*', './data/*.json'],
    },
  };
  ```

* Import data statically where possible (for example, `import data from './data.json'`), so build tracing detects it.
* Add native packages to `serverExternalPackages`, and also to `outputFileTracingIncludes` if their binaries are still missing.

### The working directory is `.next/standalone`

The standalone server changes its working directory to `/workspace/.next/standalone` before it starts. Code such as `path.join(process.cwd(), 'content')` then looks inside the standalone directory instead of your project root.

To fix this, do one of the following:

* Include the files with `outputFileTracingIncludes`, as described above. The files keep their relative layout, so paths relative to `process.cwd()` resolve again.
* Read the location from an environment variable that holds an absolute path, such as `CONTENT_DIR=/workspace/content`.

### Committed `.env` files may not be available at runtime

Next.js copies some `.env*` files into standalone output, but which files it copies can vary between Next.js versions. If your application reads server-side values from a committed file such as `.env.production` at runtime, those values may be missing.

Set server-side runtime values as [environment variables](/nextjs/environment-variables) instead. Pantheon exports them before the server starts, so they work in either mode. `NEXT_PUBLIC_*` values are not affected, because Next.js inlines them at build time.

To check your application, build it locally and look at which `.env*` files are in `.next/standalone`.

## Test standalone mode locally

Run the following from your project root to start your application the way Pantheon does:

```bash{promptUser: user}
npx next build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cd /tmp && env -u HOSTNAME PORT=3000 node "$OLDPWD/.next/standalone/server.js"
```

Starting the server from a different directory exposes code that depends on `process.cwd()`. Visit pages that read files, use native modules, or rely on monitoring, and confirm they work.

## Opt out of standalone mode

If your application can't run in standalone mode yet, remove `output: 'standalone'` from `next.config`. Without standalone output, Pantheon starts your application with `npm run start`.

## More resources

* [Next.js Build and Runtime Architecture on Pantheon](/nextjs/architecture)
* [Set environment variables for Next.js](/nextjs/environment-variables)
* [Next.js `output` configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
