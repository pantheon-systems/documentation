---
title: Frontend Asset Builds
description: Learn how to compile frontend assets on Pantheon.
reviewed: "2026-07-06"
contenttype: [doc]
innav: [true]
showtoc: true
---

Pantheon allows you to compile frontend assets (themes, design systems, and other Node.js-based tooling) automatically on the platform as a build step. This build step runs on every code push, so compiled assets no longer need to be committed to your site repository. 

## Compatibility & Requirements

* Supported for both WordPress and Drupal sites, with or without [Integrated Composer](/guides/integrated-composer/) 
* **Node Versions**: 
  * Frontend builds support Node.js 22, 24, and 26 (default)
* **Package manager**: 
  * Selected based on the lock file present in each configured build path. The platform checks for lock files in the following order and uses the first match:
    1. **bun** — `bun.lock` or `bun.lockb`
    1. **pnpm** — `pnpm-lock.yaml`
    1. **yarn** — `yarn.lock`
    1. **npm** — `package-lock.json`

    <Alert type="info" title="Note">

    A lock file is **required**. If no lock file is found in a build path, the build fails. Commit the lock file for your chosen package manager to enable reproducible installs.

    </Alert>


## Usage

Add a `frontend_build` block to your `pantheon.yml`:

```yaml:title=pantheon.yml
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

After configuring your site's `pantheon.yml` file as described above, you must also update your `.gitignore` file so that you ignore all the artifacts that the build process will produce.