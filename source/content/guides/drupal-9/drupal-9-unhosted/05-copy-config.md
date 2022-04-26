---
title: Migrate a Drupal 9 Site from Another Platform
subtitle: Copy Existing Configuration
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-unhosted/copy-config
anchorid: copy-config
editpath: drupal-9/drupal-9-unhosted/05-copy-config.md
---
Copy any existing configuration from the source site and update the source path as needed to match your configuration folder:

<TabList>

<Tab title="With Nested Docroot" id="code-docroot" active={true}>

This is a common location for the config file; if this isn't where your config file is located, replace 'config' with the full path, such as `web/sites/default/config`.

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

It is possible that the Drupal site might have moved the configuration path to a different location. You can find out where your config yaml files are via:

```bash{promptUser:user}
drush status --fields=config-sync
```

In some cases no files are copied through this step. This is not cause for concern.