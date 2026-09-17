---
title: Frontend asset builds are now supported via pantheon.yml
published_date: "2026-07-09"
published_at: "2026-07-09T14:57:15Z"
categories: [new-feature, drupal, wordpress]
description: "Sites can now compile frontend assets (themes, design systems, and other Node.js-based tooling) automatically as part of the build process."
---

Sites can now compile frontend assets (themes, design systems, and other Node.js-based tooling) automatically as part of the build process. 

When enabled, Pantheon installs your Node.js dependencies and runs your build script for each configured path on every code push, so compiled assets no longer need to be committed to your repository. Frontend builds work on any site, whether or not you use Integrated Composer.

## Enable frontend builds

Add a `frontend_build` block to your [`pantheon.yml` file](/pantheon-yml#frontend-asset-builds):

```yaml:title=pantheon.yml
frontend_build:
  enabled: true
  paths:
    - path: web/themes/custom/mytheme
      node_version: 26
      build_command: build
```

Pantheon selects a package manager automatically based on the lock file present in each build path. Supported package managers include `bun`, `pnpm`, `yarn`, and `npm`. 

For full configuration details and examples, see the [frontend asset builds documentation](/frontend-builds).

<Partial file="build-tools-cta.md" />
