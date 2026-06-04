---
title: "Build Tools CI Docker image deprecated"
published_date: "2026-06-04"
categories: [deprecation, tools-apis]
---

We've released the final update to the `build-tools-ci` Docker image. We will not publish any further updates, bug fixes, or security patches to the following tags:

- `pantheonpublic/build-tools-ci:9.x-php8.2`
- `pantheonpublic/build-tools-ci:9.x-php8.3`
- `pantheonpublic/build-tools-ci:9.x-php8.4`
- `quay.io/pantheon-public/build-tools-ci:9.x-php8.2`
- `quay.io/pantheon-public/build-tools-ci:9.x-php8.3`
- `quay.io/pantheon-public/build-tools-ci:9.x-php8.4`

## Recommended migration

Use a standard base image from your CI provider and install the Pantheon tools you need during the CI run. Standard images are better cached by CI runners, so your pipelines will perform better overall than with a custom image.

To install Terminus in a CI job, use the [Terminus GitHub Action](https://github.com/marketplace/actions/setup-terminus) or download the phar directly:

```bash
curl -L https://github.com/pantheon-systems/terminus/releases/latest/download/terminus.phar -o /usr/local/bin/terminus
chmod +x /usr/local/bin/terminus
```

## Action required

If you use any of the `build-tools-ci` image tags listed above, migrate to a standard base image before the included dependencies become outdated.
