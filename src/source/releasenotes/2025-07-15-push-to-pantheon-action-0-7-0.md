---
title: "0.7.0 Release of the 'Push to Pantheon' GitHub Action"
published_date: "2025-07-15"
categories: [tools-apis]
---

We have released [version 0.7.0](https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.7.0) of the ['Push to Pantheon' GitHub Action](https://github.com/pantheon-systems/push-to-pantheon). This version adds a new input to skip the Terminus install if your workflow is already installing Terminus. Documentation in the `readme.md` has been updated to include definitions for both the [`skip_terminus_install`](https://github.com/pantheon-systems/push-to-pantheon/tree/0.x?tab=readme-ov-file#skip_terminus_install) and [`relative_site_root`](https://github.com/pantheon-systems/push-to-pantheon/tree/0.x?tab=readme-ov-file#relative_site_root) (which was previously undocumented) inputs. Additionally, documentation guidance has been added for [using the action with robots](https://github.com/pantheon-systems/push-to-pantheon/tree/0.x?tab=readme-ov-file#using-this-action-with-robots-like-dependabot) (like [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide)) to ensure robot-created workflows don't fail due to lack of permissions.

For more details and a full list of changes in this release, please refer to the [0.7.0 release notes](https://github.com/pantheon-systems/push-to-pantheon/releases/tag/0.7.0). To update to the latest version, modify your workflow file to use `0.7.0`:

```yaml
uses: pantheon-systems/push-to-pantheon@0.7.0
```
