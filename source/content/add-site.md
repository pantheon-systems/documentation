---
title: Adding a Site to Pantheon
description: Create or migrate a site on Pantheon.
contributors: [wordsmither]
contenttype: [doc]
innav: [true]
categories: [migrate, create]
cms: [drupal, wordpress]
audience: [agency, development]
product: [--]
integration: [--]
showtoc: false
reviewed: 2023-04-06
---

There are many ways you can add a site to Pantheon.  To help you choose the best method for you, answer the questions below.

<Alert title="Note" type="info" >

This list does not include scenarios involving Front-End sites.  For those, see [Front-End Sites on Pantheon](/guides/decoupled).

</Alert>

## Find Your Path

**How do you want to add a site?**  You have the following options:
- *Create* from scratch
- Create a site from a *Custom Upstream*
- *Migrate* a site that's hosted elsewhere

<TabList>

<Tab title="Create" id="add" active={true}>

**Would you like to create your site using the dashboard (which will guide you through the process), or use the command line?**  

- [I want to use the Dashboard](/add-site-dashboard)
- I want to use the command line, and my CMS is:
  - [Drupal](/guides/terminus-drupal-site-management)
  - [WordPress](/guides/create-wp-site)

</Tab>

<Tab title="Custom Upstream" id="cu">

If you are a part of a Professional that has [Custom Upstreams](/guides/custom-upstream), you can build a site from an existing Upstream.

Refer to [Create a Site Using a Custom Upstream](/add-site-custom-upstream)

</Tab>

<Tab title="Migrate" id="migrate">

**Is your site archive greater than 500MB, or only exist on your local machine?**

- If so, [manually migrate your site to Pantheon](/migrate-manual).

- If not...

  **Which CMS are you using?**

  <Accordion title="Drupal" id="drupal">

  **Do you want to upgrade your Drupal version during migration?**

  - [No, remain at my current version](/guides/guided)

  - Yes, upgrade my site to the latest version of Drupal:
    - [My site is Composer-managed, *and* I'm using Drush](/guides/drush/drush-import)
    - [My site is Composer-managedm, and I'm *not* using Drush](/guides/drupal-unhosted-composer)
    - [My site is *not* Composer-managed](/guides/drupal-unhosted)
  
  </Accordion>

  <Accordion title="WordPress" id="wordpress">

  **Do you want to use a Custom Upstream?**

  - If so, [use the Pantheon Migrations plugin with a custom WordPress upstream](/migrate-wp-upstream).
  - If not...

    **Are you using multisite, or do you want to avoid installing a plugin?**

    - If so, [manually migrate your site to Pantheon](/migrate-manual).
    - If not, [use our guided migration](/guides/guided)

  </Accordion>

</Tab>



</TabList>

