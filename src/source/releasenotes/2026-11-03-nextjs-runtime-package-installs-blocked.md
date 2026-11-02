---
title: Runtime package installs are now blocked for Next.js sites
published_date: "2026-11-03"
published_at: "2026-11-03T15:00:00Z"
categories: [nextjs, infrastructure]
description: Starting November 9, 2026, Pantheon blocks package installs while Next.js applications are running, so a missing build-time dependency fails fast instead of causing repeated slow restarts.
---

Starting Monday, November 9, 2026, Pantheon is rolling out a change that blocks package installs while a Next.js application is running. Dependencies are still installed during the build as usual. If your application tries to install a package after it starts, the install now fails within seconds, rather than downloading packages inside the running container.

## Why we're making this change

During the build, Pantheon installs all of your dependencies, runs your `build` script, and then removes `devDependencies` before creating the runtime image.

Next.js versions 15.4 through 16.1 load `next.config.ts` with the `typescript` package. If `typescript` is listed only in `devDependencies`, it isn't present at runtime, and Next.js tries to install it with your project's package manager each time the application starts. That install can take a minute or more and can exhaust the container's memory. Then the application exits and restarts, and the cycle repeats.

With this change, the runtime install fails immediately. Affected sites still need the fix below to start, but they no longer spend time and memory reinstalling packages on every restart.

## Who is affected

Most sites are not affected and need no changes. Your site is affected only if either of these applies:

* It uses Next.js 15.4 through 16.1 and has a `next.config.ts` file, with `typescript` listed only in `devDependencies`.
* It installs packages at runtime in some other way, for example a `start` script that calls `npx` for a package that isn't in your `dependencies`.

Next.js 16.2 and later do not need `typescript` at runtime to load `next.config.ts`.

## Action required for affected sites

If your application logs `Installing TypeScript as it was not found while loading "next.config.ts"` during startup, choose one of the following:

* Move `typescript` from `devDependencies` to `dependencies`, and regenerate your lock file by running your package manager's install command (for example, `npm install`). Commit both `package.json` and the lock file, because editing the lock file by hand can leave `typescript` marked as a development dependency.
* Rename `next.config.ts` to `next.config.js` (or `next.config.mjs`) and remove the TypeScript-specific syntax.
* Upgrade to Next.js 16.2 or later.

If your application installs other packages at runtime, add them to `dependencies` so they are installed during the build.

## Rollout timeline

The change begins rolling out on Monday, November 9, 2026. Each environment picks up the change on its next deployment after the rollout reaches your site.

After the change is applied, Pantheon sets the following environment variables in your application container: `npm_config_offline`, `pnpm_config_offline`, `YARN_ENABLE_NETWORK`, and `YARN_REGISTRY`. These variables do not affect builds.

For more details about how Pantheon builds and runs Next.js sites, see our [Next.js documentation](/nextjs) and [build and runtime architecture](/nextjs/architecture).

Should you have any questions or concerns, please reach out to our customer support team via chat or email us at the [Pantheon Helpdesk](https://pantheon.io/docs/guides/support/contact-support/).
