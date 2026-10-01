---
title: Troubleshooting Next.js performance on Pantheon
description: How to troubleshoot Next.js performance on Pantheon
reviewed: "2026-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/performance-troubleshooting

---

## Evidence to collect

Include the following in a support request or engineering escalation:

- Site name and affected environment (`dev`, `test`, `live`, or a Multidev name).
    
- Exact URL paths, request method, approximate client location, and timestamps in UTC.
    
- Whether the request was anonymous, authenticated, using cookies, or carrying an `Authorization` header.
    
- Response status and relevant headers, including `cache-control`, `vary`, `x-nextjs-cache`, `x-nextjs-prerender`, and any CDN cache header returned by the request such as `cf-cache-status` or `x-cache`.
    
- The latest successful build, the first failing or slow build, the deployed commit, and the complete build/deployment log entry.
    
- Runtime log entries covering the first observed failure or latency spike. Include repeated patterns, not only one isolated line.
    
- Next.js, React, and Node.js versions; package manager and lockfile; router model; cache-handler package version and configuration; and any recent changes to `revalidate`, `cacheLife`, `cacheTag`, `revalidatePath`, or `revalidateTag`.
    
- For CMS-backed sites, the CMS environment, publish time, webhook/revalidation result, and the configured revalidation secret status. Do not send secret values.
    
- For memory or image symptoms, the affected image URL, source-image dimensions and file size, requested output size/format, concurrency or load pattern, and the corresponding runtime errors.
    

Customers can collect build and runtime logs in the Pantheon Dashboard. Terminus can list recent builds and runtime logs for scripting or cross-environment comparison; see [Next.js command-line tools](https://docs.pantheon.io/nextjs/cli-tools).

## Symptom-based troubleshooting

### The first request is slow, but later requests are fast

**What you observe:** A route is slow after a deploy, restart, or long idle period, then becomes faster after one or more requests.

**Collect:**

- Timings for the first request and at least two repeated requests.
    
- Cache and CDN response headers for each request.
    
- The route’s rendering strategy and any `revalidate`, `cacheLife`, or uncached data fetches.
    
- Runtime logs for the first request, especially outbound calls to WordPress, Drupal, Content Publisher, or another API.
    
- Whether the slowdown occurs after every deployment or only for rarely visited routes.
    

**Likely causes:** A cold CDN or Next.js route/data cache, a cache miss that triggers server rendering, slow upstream content/API calls, or a route that is intentionally dynamic. A cache miss can require Next.js to render the page and fetch external data before storing a response for later requests.

**Next action:** Verify that the route is intended to be cacheable. Confirm that the [Pantheon Next.js cache handler](https://github.com/pantheon-systems/nextjs-cache-handler) is installed and configured when the application needs shared persistent caching. Reduce the work done on the first render, cache safe upstream data, and test the route again after the cache is populated.

**Escalate when:** A route that should be cacheable consistently misses across repeated anonymous requests, the cache handler reports platform or object-store errors, or the same pattern appears across unrelated sites.

### Requests are inconsistently slow or vary sharply by user or region

**What you observe:** Some requests are fast and others are slow for the same route, or only certain visitors see the problem.

**Collect:**

- The complete response headers for fast and slow requests.
    
- Differences in cookies, authentication, `Authorization`, `Vary`, query strings, and request headers.
    
- Client region, timestamp, route, and whether the request was a navigation, RSC request, prefetch, image request, or API request.
    
- Runtime logs and upstream timing for the slow samples.
    

**Likely causes:** Requests are not equivalent; authentication or cookies may make a response private, a route may contain a dynamic section, or the request may be a cache miss that reaches the Node.js runtime. A single route can also combine cached and uncached work.

**Next action:** Reproduce with a clean anonymous request and compare it with the slow request. Separate public page delivery from personalized or authenticated data. Review `cache-control` and `Vary` behavior in the application before changing platform settings.

**Escalate when:** Equivalent anonymous requests show unexplained edge/origin divergence, CDN headers indicate every request is origin-served when caching is expected, or the issue is reproducible only on one platform environment after application differences are ruled out.

### Content is stale, or publishing updates only some pages

**Collect:**

- The page URL, content publish time, and time the new content became visible.
    
- The latest build and deployment status.
    
- Whether the application includes `@pantheon-systems/nextjs-cache-handler`.
    
- The configured rendering mode and time-based revalidation interval.
    
- For WordPress or Drupal, whether the Pantheon Advanced Page Cache plugin/module is active on the CMS site.
    
- For webhook-driven revalidation, whether the request reached the application and whether the revalidation secret is identical on both sides. Never include the secret itself.
    

**Likely causes and actions:**

|   |   |   |   |
|---|---|---|---|
|Symptom|Likely cause|Next action|Ownership|
|Some pages update after a cache clear, but others do not|The Next.js application cache is not connected to the purge path|Install and configure the Pantheon cache handler, then retest the affected routes|Customer application|
|WordPress or Drupal content remains stale|CMS-side cache invalidation is not active|Confirm the Pantheon Advanced Page Cache plugin/module is installed and active on the backend|Customer CMS configuration|
|Cache handler and CMS integration are present, but publish events do not update content|Revalidation webhook or secret mismatch|Verify delivery and make the application/CMS secrets identical without exposing values|Customer integration|
|Content updates only after a delay|Time-based revalidation is being used without on-demand revalidation|Treat the delay as expected; reduce the interval or implement a supported revalidation path if freshness requires it|Customer application|

Escalate when the build succeeded, the application configuration is correct, and the platform reports cache or edge invalidation errors—or when the same invalidation failure is reproduced across environments or sites.

### Builds are slow, fail, or deploy inconsistently

**Collect:** The build ID, status, full build log, dependency-install section, `npm run build` output, package manager and lockfile, Node.js version, `package.json` scripts, and the commit that triggered the build.

**Check:** Pantheon prepares Next.js by installing dependencies and running the application build, then deploys the resulting assets and runtime code. Confirm that:

- `package.json` defines both `build` and `start` commands.
    
- The `engines` field selects a Node.js version supported by Pantheon.
    
- Only one package-manager lockfile is present.
    
- Yarn projects include the required `gcp-build` script as described in [Next.js compatibility and requirements](https://docs.pantheon.io/nextjs#compatibility--requirements).
    
- The failure occurs in customer code/dependency installation, during `npm run build`, or after a successful build during deployment.
    

**Next action:** Fix invalid dependencies, lockfile drift, build-time data work, or application build errors in the repository. Use a Multidev or Dev environment to test the change before promoting it.

**Escalate when:** The same repository and configuration succeed locally and the failure is in a Pantheon build/deployment step, the platform reports a deployment failure without a customer-code error, or builds fail across unrelated sites.

### The site returns 5xx responses or runtime errors

**Collect:** Exact failing route, status code, timestamp, deployed commit, environment, Runtime Logs, and whether the failure begins before or after `next start` begins executing application code.

**Likely causes:** Application exceptions, failed data/API calls, invalid runtime configuration, cache-handler/object-store errors, or a platform/runtime failure.

**Next action:** Reproduce the request in the affected environment, inspect repeated log patterns, and compare the failing route with a known-good route. Confirm that required runtime secrets and environment variables exist without printing their values.

**Ownership:** A stack trace or failed application API call usually requires a customer code/configuration change. A platform error, missing service, or repeated failure across unrelated routes/sites should be escalated to Pantheon Support with the evidence bundle.

### CPU or memory usage spikes, or the process is killed

**What you observe:** Runtime logs contain `OOM`, `heap limit`, `Allocation failed`, process restarts, 5xx responses, or latency increases that correlate with resource usage.

**Collect:** The exact error, route, request volume and concurrency, CPU/memory metrics if available, deployed revision, image/API activity, and whether the behavior reproduces in Test or only Live.

**Likely causes:** Large server-rendered responses, expensive data processing, unbounded in-process caches, bursts of concurrent requests, or on-demand image optimization. Image transforms can require memory for decoded source pixels, output pixels, and working buffers; several large transforms in parallel can exhaust a container even when the same route appears healthy at low traffic.

**Next action:**

- Reproduce with production-like traffic in a safe environment.
    
- Identify the route or image request that precedes the spike.
    
- Reduce source-image dimensions and avoid sending unnecessarily large originals to the optimizer.
    
- Bound application-level caches and avoid retaining request data in process memory.
    
- Ensure generated image responses can be cached appropriately so the same transform is not repeated for every request.
    
- Review the site’s resource sizing with Pantheon Support rather than assuming a larger container alone is a permanent fix.
    

**Escalate immediately when:** Live is unavailable, the process repeatedly OOMs, increasing resources does not remove the failure, or the issue is Live-only and cannot be reproduced with a controlled request. Include the affected image or route and the evidence above. Do not describe edge-backed image optimization as a guaranteed Pantheon behavior unless Pantheon confirms it for the site and current delivery path.

### Image optimization is slow or returns 5xx responses

Treat `/_next/image` or equivalent optimizer failures as runtime performance issues first. Do not assume that an image request is static just because the output is cacheable after it is generated.

**Collect:** Source URL, source dimensions and bytes, requested width/quality/format, response headers, concurrency, and runtime logs at the same timestamp.

**Next action:** Validate `remotePatterns` or equivalent remote-image configuration, use appropriately sized source assets, test one image at a time, then test the real page’s parallel image load. Confirm that the resulting image response is cacheable for the intended freshness window.

**Escalate when:** Large or concurrent transforms cause OOM/502/503 responses, the behavior is only present on Live, or the response headers show an unexpected edge/origin path. The customer can optimize source assets and application behavior; Pantheon must investigate suspected runtime, resource-provisioning, CDN, or image-adapter defects.

### Live is slow or fails, but Test works

A Live-only symptom is evidence about traffic, configuration, cache state, or platform routing—not proof of a platform bug.

**Compare:**

- Deployed commit and build/deployment status.
    
- Node.js, Next.js, package, and cache-handler versions.
    
- Secrets and runtime environment variables, without exposing values.
    
- Custom domain versus `pantheonsite.io` domain behavior.
    
- Anonymous/authenticated request shape, traffic volume, concurrency, and route mix.
    
- Cache state and response headers before and after a controlled request.
    
- Runtime logs and resource usage during the same time window.
    

**Next action:** Reproduce the Live request against a safe Test or Multidev environment with production-like data and concurrency. If the issue is memory-related, test the specific image or route rather than warming the whole site. If it is cache-related, verify the cache handler and invalidation path before clearing caches repeatedly.

**Escalate when:** The same commit and request are reproducibly different after configuration and traffic differences are controlled, Live shows platform/cache errors, or multiple Next.js sites show the same pattern. Include both Test and Live evidence so Pantheon can distinguish site configuration from a platform incident.

## Customer-resolvable versus Pantheon-owned work

|   |   |   |
|---|---|---|
|Finding|Usually resolved by|What to do next|
|Invalid route, fetch, rendering, API, or authentication logic|Customer development team|Fix the application and validate in Multidev/Dev|
|Missing or incorrect cache-handler configuration|Customer development team|Update the repository configuration and redeploy|
|CMS plugin/module, webhook, secret, or revalidation configuration|Customer/CMS team|Correct the integration and retest publishing|
|Dependency, lockfile, Node.js engine, or build-script error|Customer development team|Fix `package.json`, lockfiles, or code and rerun the build|
|Large image inputs, excessive image concurrency, or unbounded app memory use|Customer development team, with Support guidance|Reduce work and test under representative load|
|Build/deployment service failure after customer configuration is ruled out|Pantheon Support → Engineering as needed|Provide build ID, status, full logs, commit, and reproduction|
|Runtime/cache/object-store/CDN error or cross-site incident pattern|Pantheon Support → Engineering|Provide timestamps, environment, headers, logs, and cross-site evidence|
|Live-only OOM or image-transform outage|Customer and Pantheon jointly|Stabilize traffic if possible, preserve logs, and escalate urgently|

Pantheon Support can help locate evidence and distinguish application, CMS, and platform symptoms. The customer’s development team remains responsible for changing application code and application-level configuration.

## Escalation checklist

Before escalating, attach:

- Site and environment.
    
- Exact reproduction steps and affected URLs.
    
- UTC timestamps and client/request context.
    
- Fast-versus-slow or Test-versus-Live comparison.
    
- Build/deployment IDs and complete relevant logs.
    
- Runtime logs and resource/error evidence.
    
- Response headers from representative requests.
    
- Recent commit, dependency/runtime versions, cache-handler configuration, and relevant rendering/revalidation settings.
    
- What you changed, what you tested, and the result.
    

Use the [Next.js build and runtime architecture](https://docs.pantheon.io/nextjs/architecture) page for the platform request path, [Next.js overview](https://docs.pantheon.io/nextjs) for compatibility requirements, and [Test and Live environments for Next.js](https://docs.pantheon.io/nextjs/test-and-live-env) for deployment differences.

## Sources and review notes

- [Next.js Overview](https://docs.pantheon.io/nextjs)
    
- [Next.js Build and Runtime Architecture on Pantheon](https://docs.pantheon.io/nextjs/architecture)
    
- [Command Line Tools to use with Next.js on Pantheon](https://docs.pantheon.io/nextjs/cli-tools)
    
- [Next.js Cache Handler package release notes](https://docs.pantheon.io/release-notes/2026/02/nextjs-cache-handler)
    
- [Pantheon Next.js Cache Handler repository](https://github.com/pantheon-systems/nextjs-cache-handler)