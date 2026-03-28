---
title: "Comparison to CMS Hosting and other Considerations"
description: Learn about the differences between how Pantheon supports Next.js compared to how it runs WordPress and Drupal.
reviewed: "2026-03-28"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/comparison-to-cms-hosting
---

This page highlights differences between how Pantheon Next.js and how it run WordPress or Drupal, along with other considerations.

<Alert title="Input wanted" type="code" >

We want your input! Help inform when, how, and if we build any given feature.

See instructions for submitting your input below, provided in context of the given topic. Otherwise, [open a new issue](https://github.com/pantheon-systems/documentation/issues/new?title=Known%20issues%20and%20considerations%20for%20Next.js%20&body=Re%3A%20%5BKnown%20issues%20and%20considerations%20for%20Next.js%5D(https%3A%2F%2Fdocs.pantheon.io%2Fnextjs/considerations)%0A%0APriority%3A%20Low%2FMedium%2FHigh%20(choose%20one%2C%20remove%20the%20other%20options)%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution&labels=Topic%3A%20Next.js) for discussions not covered below.

</Alert>

## Parity with CMS infrastructure

### Core Terminus commands

Many of [the core Terminus commands](/terminus/commands) will return an error if run against a Next.js site.

For instance, the `backup:create` command creates a backup consisting of 3 separate archives (database, files, and code) when used with WordPress or Drupal. This command returns an error for Next.js on Pantheon. Since Next.js sites are maintained in an external version control source like GitHub there is nothing to backup on Pantheon.

However commands like `env:clear-cache` will clear caches (like the CDN) for sites of all frameworks (WordPress, Drupal, Next.js)

If you encounter a command that does not work as you expect for Next.js, or have other feedback or questions, please use [the Terminus issue queue](https://github.com/pantheon-systems/terminus/issues).

### New Relic

Pantheon supplies [automatic integration with New Relic](/guides/new-relic) for WordPress and Drupal for all sites except those on the Basic plan. We do not yet have any such integration for Next.js. If you have input on how monitoring and telemetry should work, [please join this discussion](https://github.com/pantheon-systems/documentation/issues/9768).

### Redis
All WordPress and Drupal sites (except those on the Basic plan) can access their own Redis cache. For Next.js [we provide a cache handler](https://github.com/pantheon-systems/nextjs-cache-handler) to coordinate a shared persistent cache between containers and our CDN in front of the containers.


### Autopilot

Autopilot currently functions only with sites that use the Pantheon-supplied Git repository. Autopilot support for sites using Pantheon's GitHub Application (all Next.js sites and some WordPress/Drupal sites) will be added in a future release.

### Advanced site configurations

* The [`pantheon.yml` configuration file](/pantheon-yml) is not currently supported on Next.js sites, and is ignored if present.
* [Quicksilver](/guides/quicksilver) hooks are not currently supported on Next.js sites.

### HTTP streaming

Layers of our CDN and load balancing currently prevent HTTP Streaming for WordPress, Drupal, and Next.js. We introduced that limitation many years ago because we wanted to encourage teams to use full page caching in combination with Surrogate Keys for fine-grained purging. In WordPress and Drupal, that approach to CDN caching is accommodated by our [Pantheon Advance Page cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/) and [module](https://www.drupal.org/project/pantheon_advanced_page_cache).

For many teams this restriction is counterproductive. That is especially true in the Next.js ecosystem which is investing further in usage of  [`<Suspense>`](https://react.dev/reference/react/Suspense) components as a performance optimization.

While we intend to remove the limitation on streaming for Next.js sites, [join the discussion in this GitHub issue](https://github.com/pantheon-systems/documentation/issues/9767) if you have thoughts on how to provide guidance around situations where full page caching in the CDN. is still preferable to streaming.

## GitHub App installation requirements

The Pantheon GitHub Application must be installed by a user who is both:

- A **GitHub organization admin**
- A **member** of the corresponding Pantheon workspace

Other workspace members cannot install the app themselves. The GitHub organization admin must complete the installation first, and then any workspace member can create Next.js sites using repositories the app has access to.

### Options for the GitHub organization admin

The GitHub organization admin does not need to create a site to install the app. They can choose one of the following approaches:

#### Option 1: Install the app without creating a site

Run the following Terminus command to install the GitHub App on the organization without creating a site:

```bash{promptUser: user}
terminus vcs:connection:add <workspace>
```

Replace `<workspace>` with the Pantheon workspace name, label, or ID. This installs the app and connects it to the GitHub organization. The GitHub organization admin can stop here — no site creation is required.

#### Option 2: Start site creation and stop after app installation

The GitHub organization admin can begin the site creation process through the Pantheon dashboard. During this process, the GitHub App installation is triggered. The GitHub organization admin can cancel the site creation after the app is installed, without completing the full workflow.

### After the app is installed

Once the GitHub App is installed on the organization, any member of the Pantheon workspace can create a Next.js site — through the dashboard or Terminus — using any repository the app has access to.

## General

### Compatibility and Requirements
See the following page for Next.js compatibility and requirements on Pantheon:
* [Next.js Overview](/nextjs#compatibility--requirements)

### GitHub Enterprise Server

The GitHub Application **cannot** be used with GitHub Enterprise Server. If your team uses GitHub Enterprise Server and you want to use the GitHub Application, please let your Customer Success Manager know.

### **Bun, Deno, and other runtimes beyond Node.js**

Node.js is the most common run time for Next.js. Bun and Deno both have compelling performance and security advantages that may make them preferable for some teams. If you want Pantheon to offer Bun, Deno, or any other runtime for JavaScript/TypeScript, [please submit an idea via our roadmap](https://roadmap.pantheon.io/tabs/73-under-consideration).

### **Yarn**

Pantheon infrastructure supports [Yarn](https://yarnpkg.com/) but as of now, that requires using a separate build target in `package.json`: `gcp-build`. We expect to unify this in regular `build` script in the near future but as of now, please add `gcp-build` as a new script so your codebase can be built in Pantheon Next.js infrastructure.

### **Astro, Remix, and other frameworks beyond Next.js**

Pantheon began many years ago as a Drupal-only platform. But the nature of our free trial allowed many customers to try other LAMP stack frameworks, many of which worked. In 2014 we made our support for WordPress official. We made that policy change because our ecosystem has so much overlapping usage between WordPress and Drupal and because we value the success of web teams, and the web as a whole over the success of any given framework.

Similarly, the technology we now use to run Next.js is capable of serving many other frameworks. However, to increase the likelihood of success for teams using Pantheon we are focusing on the most used. If you think we should add another framework [please submit an idea through our roadmap](https://roadmap.pantheon.io/tabs/73-under-consideration).

### Webhooks and build triggers

[Pantheon's previous Front-End Sites product](/guides/decoupled/overview/manage-settings/#build-hooks), and many other providers, offer a way to directly retrigger a CI build from within a content management system. We have not yet replicated this functionality and would like input on how we might do it differently.

The normal use case for build hooks is to give them to a Content Management System so that any change in content can set off a full execution of the build and deployment process which will read in the changed content. This overall approach is extremely inefficient and unsatisfying for content editors accustomed to seeing content changes live within a single second. Waiting one (or many more) *minutes* for a full continuous integration process is often unacceptable. That tension propelled the development of the Incremental Static Regeneration functionality in Next.js.

Since we are sunsetting support for static-first systems like Gatsby we'd like input on whether we should recreate the functionality directly in our platform, document how to retrigger builds through GitHub or something else. [If you have opinions, please share them here](https://github.com/pantheon-systems/documentation/issues/9769).

### Environment variables
[Pantheon's previous Front-End Sites product](/guides/decoupled/overview/manage-settings/#site-environment-variables) provided a dashboard interface for setting environment variables. The new Next.js support on Pantheon uses [Secrets Manager](/guides/secrets) to set environment variables. For steps to switch, see our related [migration guide](/nextjs/migrating-from-front-end-sites#replicate-environment-variables-as-pantheon-secrets).

### Drupal and WordPress reference implementations

As Pantheon developed our now-sunsetting [Front-End Sites](/guides/decoupled/overview) offering, we also created a number of packages and reference implementations for WordPress and Drupal with Next.js. These packages made under the name "[Decoupled Kit](https://github.com/pantheon-systems/decoupled-kit-js)" have not been actively maintained recently and have largely been surpassed by newer packages in the community.

If you have thoughts on which of the many starters and packages we should test and document for use on Pantheon, [please share your thoughts in this thread](https://github.com/pantheon-systems/documentation/issues/9770).
