---
title: "Build Tools CI Docker image deprecated"
published_date: "2026-06-15"
published_at: 2026-06-15T16:28:34.000Z
categories: [deprecation, tools-apis]
---

We've released the final update to the `build-tools-ci` Docker image. We will not publish any further updates, bug fixes, or security patches to the following tags:

- `pantheonpublic/build-tools-ci:9.x-php8.2`
- `pantheonpublic/build-tools-ci:9.x-php8.3`
- `pantheonpublic/build-tools-ci:9.x-php8.4`
- `quay.io/pantheon-public/build-tools-ci:9.x-php8.2`
- `quay.io/pantheon-public/build-tools-ci:9.x-php8.3`
- `quay.io/pantheon-public/build-tools-ci:9.x-php8.4`

## Background

These base images were created at a time when CI providers recommend using customized Docker images to speed up execution and reduce the need for replicating boilerplate configration. It has since become more common to run CI jobs on standard base images for speed and the reduction in boilerplate code comes from reusable GitHub Actions or CircleCI Orbs.
## Recommended migration

Use a standard base image from your CI provider and install the Pantheon tools you need during the CI run. Standard images are better cached by CI runners, so your pipelines will perform better overall than with a custom image.

Learn more about Pantheon's reusable [GitHub Actions](/github-actions) and [CircleCI Orb](https://github.com/pantheon-systems/circleci-orb).




## Action required

If you use any of the `build-tools-ci` image tags listed above, migrate to a standard base image before the included dependencies become outdated.
