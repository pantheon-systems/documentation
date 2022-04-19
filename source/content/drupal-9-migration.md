---
title: Drupal 9 Migration
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
showtoc: false
reviewed: "2021-03-31"

---
Drupal 9 includes many of the features and layout that Drupal 8 users are familiar with, and it removes deprecated code to help improve future Drupal development.

Drupal 9 updates Drupal’s underlying dependencies like [Symfony 4.4](https://symfony.com/releases/4.4) and [Twig 2](https://twig.symfony.com/doc/2.x/index.html), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal 9 and beyond.

<Alert title="Note" type="info" >

This upgrade migrates your existing site to a new site.  The new site will not maintain your site’s commit history.

</Alert>

Answer the following questions to determine your upgrade path.

Is the site currently hosted on Pantheon?

<TabList>

<Tab title="Yes" id="hosted-yes" active={true}>

How did you create your Drupal site?

- Using Build Tools: [Migrate a Site That Was Created with Build Tools to Drupal 9](/guides/drupal-9-hosted-createbt)
- Using a Custom Upstream: [Migrate a Site That Was Created with a Custom Upstream to Drupal 9](/guides/drupal-9-hosted-createcustom)
- Using an Empty Upstream:

  Do you have access to the Multidev?
  - Yes: [Migrate a Site That Was Created with an Empty Upstream to Drupal 9](/guides/drupal-9-hosted-createempty-md)
  - No: [Migrate a Drupal 8 Site to Drupal 9](/guides/drupal-9-hosted)

- From the dashboard on Drupal 8

  Do you have access to the Multidev?
  - Yes: [Migrate a Site with Multidev to Drupal 9](/guides/drupal-9-hosted-md)
  - No: [Migrate a Drupal 8 Site to Drupal 9](/guides/drupal-9-hosted)
- From the dashboard on Drupal 9

  Did you create the site prior to November 2021?
  - Yes: [Migrate a Site That Was Created Before November 2011 to Drupal 9](/guides/drupal-9-hosted-pre112021) (temp note: the following version 8 set flow will be added to the deploy page of this guide)
  - No: 

    Did you set Drupal version to 8?
    - Yes: [Migrate a Site Created With the Pantheon Dashboard to Drupal 9](/guides/drupal-9-hosted-createdashboard-set8) (temp note: the following build tools flow will be added to the deploy page of this guide)
    - No: 

      Do you need a Build Tools workflow? (*if you are not sure what this is, answer "No"*)
      - Yes: [Migrate a Site That Needs a Build Tools Workflow to Drupal 9 + Build Tools](/guides/drupal-9-hosted-btworkflow)
      - No: No additional work required.


</Tab>

<Tab title="No" id="hosted-no">

Is your site Composer-managed?

- Yes: [Migrate a Composer Managed Drupal 9 Site from Another Platform](/guides/drupal-9-unhosted-composer)
- No: [Migrate a Drupal 9 Site from Another Platform](/guides/drupal-9-unhosted)

</Tab>
</TabList>


