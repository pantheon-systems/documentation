---
title: "Limitations and considerations for Next.js Beta"
description: Learn about current limitations of Next.js Beta functionality on Pantheon, and how to weigh in to inform feature development.
reviewed: "2025-11-17"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/considerations
---

<Partial file="nextjs-pre-ga.md" />

While in the Beta phase, some aspects of Next.js on Pantheon are still under active development. This page tracks known limitations worthy of consideration for early adopters.

<Alert title="Input wanted" type="code" >

We want your input! Help inform when, how, and if we build any given feature.

See instructions for submitting your input below, provided in context of the given topic. Otherwise, [open a new issue](https://github.com/pantheon-systems/documentation/issues/new?title=Known%20issues%20and%20considerations%20for%20Next.js%20Beta%20Feedback&body=Re%3A%20%5BKnown%20issues%20and%20considerations%20for%20Next.js%20Beta%5D(https%3A%2F%2Fdocs.pantheon.io%2Fnextjs/considerations)%0A%0APriority%3A%20Low%2FMedium%2FHigh%20(choose%20one%2C%20remove%20the%20other%20options)%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution&labels=Topic%3A%20Next.js) for discussions not covered below.

</Alert>

## Parity with CMS infrastructure

### Site dashboard
Certain dashboard functionality is not currently supported for Next.js sites:
* Status reports
* Errors <Popover title="Note" content="Instead, refer to the Build tab on the given environment - checking build logs for errors related to Next.js deployments." />
* Domains & HTTPS, Upgrading site plan <Popover title="Note" content="Launch is not currently self-serve, for details see <a href='/nextjs/connecting-custom-domain-name'>Connecting a custom domain to Next.js on Pantheon</a>." />

### Core Terminus commands

Many of [the core Terminus commands](/terminus/commands) will return an error if run against a Next.js site.

For instance, the `backup:create` command creates a backup consisting of 3 separate archives (database, files, and code) when used with WordPress or Drupal. This command returns an error for Next.js on Pantheon. Since Next.js sites are maintained in an external version control source like GitHub there is nothing to backup on Pantheon.

However commands like `env:clear-cache` will clear caches (like the CDN) for sites of all frameworks (WordPress, Drupal, Next.js)

If you encounter a command that does not work as you expect for Next.js, or have other feedback or questions, please use [the Terminus issue queue](https://github.com/pantheon-systems/terminus/issues).

### New Relic

Pantheon supplies [automatic integration with New Relic](/guides/new-relic) for WordPress and Drupal for all sites except those on the Basic plan. We do not yet have any such integration for Next.js. If you have input on how monitoring and telemetry should work, [please join this discussion](https://github.com/pantheon-systems/documentation/issues/9768).

### Redis
All WordPress and Drupal sites (except those on the Basic plan) can access their own Redis cache. While some teams do choose to use Redis as a cache handler with Next.js, we want more [input and testing of a baseline cache handler](https://github.com/pantheon-systems/documentation/issues/9727) first before providing multiple cache handler options.

See also [this related caching section](#package-for-shared-persistent-cache) below.

### Autopilot

Autopilot currently functions only with sites that use the Pantheon-supplied Git repository. Autopilot support for sites using Pantheon's GitHub Application (all Next.js sites and some WordPress/Drupal sites) will be added in a future release.

### Custom Upstreams

We do not yet support the creation of [Custom Upstreams](/guides/custom-upstream) for Next.js sites. If your team would benefit from something like Custom Upstreams for Next.js, please tell us more [when you fill out the form to request access to the Beta program](https://pantheon.io/nextjs-beta).

### Advanced site configurations

* The [`pantheon.yml` configuration file](/pantheon-yml) is not currently supported on Next.js sites, and is ignored if present.
* [Quicksilver](/guides/quicksilver) hooks are not currently supported on Next.js sites.

## CDN and caching

Pantheon has differentiated itself in the WordPress and Drupal ecosystem with a number of performance optimizations especially around the interaction between CMS and CDN.

In the current Beta phase for our Next.js support, Next.js runs behind our Global CDN but we have not yet replicated all of that functionality for Next.js. Here are our current limitations with links to further discussions of how we intend to close these gaps.

###  Package for shared, persistent cache

Next.js provides [many layers of caching](https://nextjs.org/docs/app/guides/caching#overview). The "Full Route Cache" and "Data Cache" are meant to be persistent caches. Those caches hold information generated in the build process and can be changed over time by the behavior of [Incremental Static Regeneration](https://nextjs.org/docs/pages/guides/incremental-static-regeneration).

Pantheon will be providing guidance on how sites can implement a cache handler to share these persistent caches across the horizontally scaled containers which hold the runtime code. Let us know if you have thoughts on whether this functionality should go in a [deployment adapter,](https://github.com/pantheon-systems/documentation/issues/9732) a [stand-alone package, or something else](https://github.com/pantheon-systems/documentation/issues/9727).

### Clearing CDN caches by tag

Content Delivery Networks cache webpages so that responses reach visitors faster and with resilience to traffic spikes. That benefit can come with the downside of serving old, outdated content. Mitigating the risk of outdated content by clearing all caches in response to content changes then defeats the benefit of caching in the first place.

Pantheon, and most other modern providers, can balance the competing needs for fast and fresh web pages by "tagging" web pages with the relevant data that produced them. When a given piece of content changes, only the web pages that used that piece of content are cleared from the CDN cache. Our ["Pantheon Advanced Page Cache" plugin for WordPress](https://wordpress.org/plugins/pantheon-advanced-page-cache/) and a [module for Drupal](https://www.drupal.org/project/pantheon_advanced_page_cache) enable this functionality by passing tags from the origin CMS to the CDN. When CRUD operations (create, read, update, delete) fire within the CMS, these packages can then reach out from origin infrastructure to the CDN to purge the appropriate caches.

We will create the same capacity for Next.js to clear CDN caches itself in response to appropriate events like [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag). If you have thoughts or feedback please share it here in [this thread specific to the question of tag-based clearing](https://github.com/pantheon-systems/documentation/issues/9762) or [the general question of deployment adapters](https://github.com/pantheon-systems/documentation/issues/9732).

### HTTP streaming

Layers of our CDN and load balancing currently prevent HTTP Streaming for WordPress, Drupal, and Next.js. We introduced that limitation many years ago because we wanted to encourage teams to use full page caching in combination with Surrogate Keys for fine-grained purging. In WordPress and Drupal, that approach to CDN caching is accommodated by our [Pantheon Advance Page cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/) and [module](https://www.drupal.org/project/pantheon_advanced_page_cache).

For many teams this restriction is counterproductive. That is especially true in the Next.js ecosystem which is investing further in usage of  [`<Suspense>`](https://react.dev/reference/react/Suspense) components as a performance optimization.

While we intend to remove the limitation on streaming for Next.js sites, [join the discussion in this GitHub issue](https://github.com/pantheon-systems/documentation/issues/9767) if you have thoughts on how to provide guidance around situations where full page caching in the CDN. is still preferable to streaming.

## General

### Compatibility and Requirements
See the following page for Next.js compatibility and requirements on Pantheon:
* [Next.js Overview](/nextjs#compatibility--requirements)

### **Bun, Deno, and other runtimes beyond Node.js**

Node.js is the most common run time for Next.js. Bun and Deno both have compelling performance and security advantages that may make them preferable for some teams. If you want Pantheon to offer Bun, Deno, or any other runtime for JavaScript/TypeScript, please let us know [when you fill out the Beta request form](https://pantheon.io/nextjs-beta).

### **Yarn**

Pantheon infrastructure supports [Yarn](https://yarnpkg.com/) but as of now, that requires using a separate build target in `package.json`: `gcp-build`. We expect to unify this in regular `build` script in the near future but as of now, please add `gcp-build` as a new script so your codebase can be built in Pantheon Next.js infrastructure.

### **Astro, Remix, and other frameworks beyond Next.js**

Pantheon began many years ago as a Drupal-only platform. But the nature of our free trial allowed many customers to try other LAMP stack frameworks, many of which worked. In 2014 we made our support for WordPress official. We made that policy change because our ecosystem has so much overlapping usage between WordPress and Drupal and because we value the success of web teams, and the web as a whole over the success of any given framework.

Similarly, the technology we now use to run Next.js is capable of serving many other frameworks. However, to increase the likelihood of success for teams in our Beta period, we are focusing our attention on Next.js specifically. If you have a strong need to run a non-Next.js framework on Pantheon, [please request access to our Beta program](https://pantheon.io/nextjs-beta) and tell us more about your projects.

### Webhooks and build triggers

[Pantheon's previous Front-End Sites product](/guides/decoupled/overview/manage-settings/#build-hooks), and many other providers, offer a way to directly retrigger a CI build from within a content management system. We have not yet replicated this functionality and would like input on how we might do it differently.

The normal use case for build hooks is to give them to a Content Management System so that any change in content can set off a full execution of the build and deployment process which will read in the changed content. This overall approach is extremely inefficient and unsatisfying for content editors accustomed to seeing content changes live within a single second. Waiting one (or many more) *minutes* for a full continuous integration process is often unacceptable. That tension propelled the development of the Incremental Static Regeneration functionality in Next.js.

Since we are sunsetting support for static-first systems like Gatsby we'd like input on whether we should recreate the functionality directly in our platform, document how to retrigger builds through GitHub or something else. [If you have opinions, please share them here](https://github.com/pantheon-systems/documentation/issues/9769).

### Environment variables
[Pantheon's previous Front-End Sites product](/guides/decoupled/overview/manage-settings/#site-environment-variables) provided a dashboard interface for setting environment variables. The new Next.js support on Pantheon uses [Secrets Manager](/guides/secrets) to set environment variables. For steps to switch, see our related [migration guide](/nextjs/migrating-from-front-end-sites#replicate-environment-variables-as-pantheon-secrets).

### Drupal and WordPress reference implementations

As Pantheon developed our now-sunsetting [Front-End Sites](/guides/decoupled/overview) offering, we also created a number of packages and reference implementations for WordPress and Drupal with Next.js. These packages made under the name "[Decoupled Kit](https://github.com/pantheon-systems/decoupled-kit-js)" have not been actively maintained recently and have largely been surpassed by newer packages in the community.

If you have thoughts on which of the many starters and packages we should test and document for use on Pantheon, [please share your thoughts in this thread](https://github.com/pantheon-systems/documentation/issues/9770).
