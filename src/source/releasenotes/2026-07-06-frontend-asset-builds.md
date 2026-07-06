---
title: "Frontend asset builds"
published_date: "2026-07-06"
published_at: "2026-07-06T17:00:00Z"
categories: [new-feature, drupal, wordpress]
description: "Sites can now compile frontend assets (themes, design systems, and other Node.js-based tooling) automatically during the build, with support for bun, pnpm, yarn, and npm."
---

Pantheon sites can now compile frontend assets as part of the build process. When enabled, Pantheon installs your Node.js dependencies and runs your build script for each configured path on every code push, so compiled assets no longer need to be committed to your repository. Frontend builds work on any site, whether or not you use Integrated Composer.

## Enable frontend builds

Add a `frontend_build` block to your `pantheon.yml`:

```yaml
frontend_build:
  enabled: true
  paths:
    - path: web/themes/custom/mytheme
      node_version: 26
      build_command: build
```

Each entry under `paths` describes one directory to build:

- **`path`** — the directory containing the `package.json` and lock file, relative to your repository root.
- **`node_version`** — the Node.js major version to build with. Defaults to **26**.
- **`build_command`** — the script to run (executed as `<package-manager> run <build_command>`). Defaults to **`build`**.

You can list multiple paths to build several themes or packages in a single deploy.

## Package manager detection

Pantheon selects a package manager automatically based on the lock file present in each build path. It checks for lock files in the following order and uses the first match:

1. **bun** — `bun.lock` or `bun.lockb`
2. **pnpm** — `pnpm-lock.yaml`
3. **yarn** — `yarn.lock`
4. **npm** — `package-lock.json`

A lock file is **required**. If no lock file is found in a build path, the build fails. Commit the lock file for your chosen package manager to enable reproducible installs.

## Supported Node.js versions

Frontend builds support Node.js **22**, **24**, and **26**. Pantheon is committed to supporting the three most recent Node.js LTS releases, updating this set as new LTS versions are released and older ones reach end of life. If you do not set `node_version`, builds use the default of **26**.

## Learn more

For full configuration details and examples, see the [frontend asset builds documentation](/guides/integrated-composer/frontend-asset-builds).
