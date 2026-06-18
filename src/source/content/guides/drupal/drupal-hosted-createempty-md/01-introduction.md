---
title: Upgrade a Site That Was Created With an Empty Upstream to the Latest Version of Drupal
subtitle: Introduction
description:
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-hosted-createempty-md
editpath: drupal/drupal-hosted-createempty-md/01-introduction.md
reviewed: "2022-12-13"
contenttype: [guide]
innav: [true]
categories: [overview, migrate]
cms: [drupal8, drupal9, drupal10]
audience: [agency, development]
product: [--]
integration: [--]
---

This guide will show you how to migrate a site that meets the following criteria to the latest version of Drupal:

|  Current Host | How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> |  Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
| :-------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                   Pantheon                    |                                                                Empty Upstream                                                                |                                                                                          Multidev                                                                                          |

<Partial file="drupal/see-landing.md" />

<Partial file="drupal/commit-history.md" />

<Alert title="Exports" type="export">

This doc uses [Terminus](/terminus) commands. Before you begin, set the variables `$site` and `$env` in your terminal session to match your site name and the correct environment:

```bash{promptUser: user}
export site=yoursitename
export env=dev
```

The following aliases are used as examples:

- **Alias:** `D8_SITE`
  - **Site Name:** `best-drupal8-site-ever`
- **Alias:** `DRUPAL_SITE`
  - **Site Name:** `best-drupal-site-ever`

</Alert>

## Requirements

Confirm that your site meets the following requirements before you continue:

- Ensure your site has the [Pantheon empty repository](https://github.com/pantheon-systems/empty) in its upstream.

  - Use Terminus to confirm the `empty` Upstream

    Run the command `terminus site:info $SITE` to display the site's basic information and properties.

    The following is an abridged example of the output for a site upstream set to `empty`:

    ```bash{outputLines:2-13}
    terminus site:info $SITE
    ------------------ -------------------------------------------------------------------------------------
    ID                 abdc3ea1-fe0b-1234-9c9f-3cxeAA123f88
    Name               anita-drupal
    Label              AnitaDrupal
    Created            2019-12-02 18:28:14
    Framework          drupal8
    ...
    //highlight-start
    Upstream           4c7176de-e079-eed1-154d-44d5a9945b65: https://github.com/pantheon-systems/empty.git
    //highlight-end
    ...
    ------------------ -------------------------------------------------------------------------------------
    ```

  The following values indicate that a site is using an `empty` upstream:

  - The `Framework` is `drupal8`

  - The `Upstream` includes `https://github.com/pantheon-systems/empty.git`

- The site does not use another package and library manager, such as [Ludwig](https://www.drupal.org/project/ludwig).

- You have not set up Continuous Integration or you no longer need it.

- The trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/guides/php/settings-php#trusted-host-setting) documentation for more information.
