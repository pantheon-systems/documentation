---
title: Front-End Build Site Caching
published_date: "2023-10-31"
---

Pantheon introduced a new build pipeline for Front End Sites to significantly improve build times. Beginning on November 13th, 2023, newly created sites are automatically using the new pipeline and cannot opt back to the old pipeline. Sites made prior to that date can opt-in to the new pipeline to take advantage of the new features. All pre-existing sites that do not opt-in will be switched over for new builds on or around January 15th.

Additionally, we are adding support for Node 18 (for dynamic sites) and 20 (for both static and dynamic sites). To select a specific version, Pantheon is [moving away from using .nvmrc](/guides/decoupled/overview/manage-settings#nodejs-version) and will instead look to the [“engines” field](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#engines) in your project’s `package.json` file.

