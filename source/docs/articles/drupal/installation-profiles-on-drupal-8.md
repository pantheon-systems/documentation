---
title: Installation Profiles on Drupal 8
description: Learn how to write a Drupal 8 installation profile.
category:
  - developing
  - drupal
keywords: drupal 8, installation profile drupal 8, installation profile, install profile, info.yml, profile, install
---
Installation profiles give developers the power to sprinkle in extra installation steps for use-specific sites, such as complex module configs or content types. Writing installation profiles for Drupal 8 requires <code><em>profilename</em>.info.yml</code> and <code><em>profilename</em>.profile</code> to be placed within the `/profiles` directory. An optional <code><em>profilename</em>.install</code> file can be created in the same directory to implement `hook_install()`. Check out the [standard profile on pantheon-systems/drops-8](https://github.com/pantheon-systems/drops-8/tree/master/core/profiles/standard) as an example.

## Pantheon Installation Profile


## Creating an Installation Profile on Pantheon
