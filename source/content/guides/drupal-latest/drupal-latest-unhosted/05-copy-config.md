---
title: Migrate a Drupal:latest Site from Another Platform
subtitle: Copy Existing Configuration
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-unhosted/copy-config
anchorid: copy-config
editpath: drupal-latest/drupal-latest-unhosted/05-copy-config.md
contenttype: [guide]
categories: [migrate]
newcms: [drupal9]
audience: [development]
product: [--]
integration: [--]
reviewed: "2021-05-13"
---

Now that you've prepared your site, you need to collect configuration information from the source site.

1. Copy any existing configuration from the source site.

1. Update the source path as needed to match your configuration folder:

<TabList>

<Tab title="With Nested Docroot" id="code-docroot" active={true}>

The example below shows a common location for the config file. If your config file isn't located here, replace `config` with the full path, such as `web/sites/default/config`.

```bash{promptUser:user}
cp -r $SOURCE/web/sites/default/files/config/sync/* $DESTINATION/config/
cd $DESTINATION
git add config
git commit -m "Pull in configuration from source site"
```

</Tab>

<Tab title="Without Nested Docroot" id="code-nodocroot">

```bash{promptUser:user}
cp -r $SOURCE/sites/default/files/config/sync/* $DESTINATION/config/
cd $DESTINATION
git add config
git commit -m "Pull in configuration from source site"
```

</Tab>

</TabList>

It is possible that the Drupal site might have moved the configuration path to a different location. You can find the location of your configuration files by running the following command:

```bash{promptUser:user}
drush status --fields=config-sync
```

In some cases no files are copied through this step. This is not cause for concern.
