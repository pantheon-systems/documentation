---
title: Next.js sites with standalone output now start with the standalone server
published_date: "2026-11-16"
published_at: "2026-11-16T15:00:00Z"
categories: [nextjs, infrastructure]
description: Starting November 16, 2026, Pantheon starts Next.js applications that build standalone output with node server.js instead of npm run start.
---

<!-- DRAFT: tentative date. Confirm against the SITE-6334 (internal-provisioner) and SITE-6338 (buildpack-slicer) rollout before publishing. -->

Starting Monday, November 16, 2026, Pantheon is changing how it starts Next.js applications that use [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output). If your build produces a standalone server, Pantheon runs that server directly instead of running `npm run start`. Your build is unchanged.

## Why we're making this change

Standalone output is the deployment format Next.js recommends for containers. It contains only the files and dependencies your application needs at runtime. Running the standalone server directly starts your application faster.

## Who is affected

Your site is affected only if `next.config` sets `output: 'standalone'`. Sites without standalone output continue to start with `npm run start` and need no changes.

Most affected sites also need no changes. Review your site if it does any of the following:

* Runs setup in its `start`, `prestart`, or `poststart` script, such as preloading APM or OpenTelemetry, setting `NODE_OPTIONS`, running migrations, or starting a custom server. These scripts no longer run.
* Reads files at runtime that Next.js build tracing doesn't detect, such as content directories, JSON data, or native binaries.
* Builds file paths from `process.cwd()`. The standalone server runs from `.next/standalone`.
* Reads server-side values from a committed `.env` file at runtime.

An affected site can start successfully but return errors when a page loads, so test your site after it next deploys.

## Action required for affected sites

See [Next.js Standalone Output on Pantheon](/nextjs/standalone-output) for a fix for each case and steps to test standalone mode locally.

If you need more time, remove `output: 'standalone'` from `next.config` and Pantheon will continue to start your site with `npm run start`.

## Rollout timeline

The change begins rolling out on Monday, November 16, 2026. Each environment picks up the change on its next deployment after the rollout reaches your site. Your runtime logs show `Found Next.js standalone server at ...` when the standalone server is in use.

For more details about how Pantheon builds and runs Next.js sites, see our [build and runtime architecture](/nextjs/architecture).

Should you have any questions or concerns, please reach out to our customer support team via chat or email us at the [Pantheon Helpdesk](https://pantheon.io/docs/guides/support/contact-support/).
