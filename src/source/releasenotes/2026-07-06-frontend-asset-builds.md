---
title: Frontend asset builds are now supported via pantheon.yml
published_date: "2026-07-06"
published_at: "2026-07-06T17:00:00Z"
categories: [new-feature, drupal, wordpress]
description: "Sites can now compile frontend assets (themes, design systems, and other Node.js-based tooling) automatically as part of the build process."
---

Sites can now compile frontend assets (themes, design systems, and other Node.js-based tooling) automatically as part of the build process. 

When enabled, Pantheon installs your Node.js dependencies and runs your build script for each configured path on every code push, so compiled assets no longer need to be committed to your repository. Frontend builds work on any site, whether or not you use Integrated Composer.

## Enable frontend builds

Add a `frontend_build` block to your [`pantheon.yml` file](/pantheon-yml#frontend-asset-builds):

```yaml
frontend_build:
  enabled: true
  paths:
    - path: web/themes/custom/mytheme
      node_version: 26
      build_command: build
```

Pantheon selects a package manager automatically based on the lock file present in each build path. Supported package manages include `bun`, `pnpm`, `yarn`, and `npm`. 

For full configuration details and examples, see the [frontend asset builds documentation](/frontend-builds).

<Alert type="info" title="Still using Build Tools?">

Pantheon [recently released the final update to the `build-tools-ci` Docker image](/release-notes/2026/06/build-tools-ci-deprecated). No further updates, bug fixes, or security patches will be provided for [Build Tools](/guides/build-tools). 

Site(s) still using Build Tools today should move to our newer platform capabilities: 

* [External Repositories](/guides/external-repositories)
* [Push to Pantheon](/github-actions)
* [Scheduled cron jobs](/customer-scheduled-cron-jobs)
* [Integrated Composer](/guides/integrated-composer)
* [Frontend Asset Builds](/frontend-builds)

</Alert>