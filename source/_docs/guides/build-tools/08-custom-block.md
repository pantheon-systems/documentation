---
title: Build Tools
subtitle: Create a Custom Block
buildtools: true
anchorid: custom-block
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/custom-block/
nexturl: guides/build-tools/behat/
previousurl: guides/build-tools/custom-theme/
editpath: build-tools/08-custom-block.md
---
When building a site in Drupal 8, it is more convenient if configuration chages, such as block placement, are made in a development environment, and pushed to test and live along with code. Content changes, on the other hand, are best done in the live site, and pulled down to development as needed for testing.

The Drupal 8 core [custom block module](https://www.drupal.org/docs/user_guide/en/block-create-custom.html) (the `block_content` module) is inconvenient for this workflow, as making a custom block in this way creates both content (the text and images in the block) and configuration (the block placement) in the same operation. If the configuration for one of these blocks is deployed without its corresponding content, the resulting block will be broken.

A more convenient contrib module called [Simple block](https://www.drupal.org/project/simple_block) may be used in place of the core custom blocks module to correct this problem. When Simple block is enabled, new custom blocks may be created via the simple blocks tab in the Structure > Blocks admin interface.

![Simple blocks](/source/docs/assets/images/pr-workflow/simple-blocks.png)

The Simple block creation editor is identical to the custom block editor; however, blocks created with the simple block editor have both their content and configuration stored in the Drupal configuration system. It is therefore very easy to create custom blocks in a development environment, and then deploy them to test and live.

Sites created from the [Example Drops-8 Composer](https://github.com/pantheon-systems/example-drops-8-composer) project disable the core Custom Block module by default, and enable the contrib Simple Block module in its place.

Another alternative would be to [create the block in code](https://www.drupal.org/docs/8/creating-custom-modules/create-a-custom-block). This is appropriate when the block content comes from an API used by the site. For static content, it is better to store the block in the site configuration.
