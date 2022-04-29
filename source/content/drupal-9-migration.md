---
title: Drupal 9 Migration Guides
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
reviewed: "2021-03-31"
---

Drupal 9 includes many of the familiar features and layout introduced in Drupal 8, and removes deprecated code to help improve future Drupal development.

## Choose Your Upgrade Path

Answer the following questions to determine your upgrade path.

**Is the site currently hosted on Pantheon?**

- **Yes**

  How did you create your Drupal site?

  <TabList>

  <Tab title="Build Tools" id="build-tools" active={true}>

  See [Migrate a Site That Was Created with Build Tools to Drupal 9](/guides/drupal-9-hosted-createbt)

  </Tab>

  <Tab title="Custom Upstream" id="custom-upstream">

  See [Migrate a Custom Upstream to Drupal 9](/guides/drupal-9-hosted-createcustom)

  </Tab>

  <Tab title="Empty Upstream" id="empty-upstream">

  Do you have access to the Multidev?
  - Yes: See [Migrate a Site That Was Created with an Empty Upstream to Drupal 9](/guides/drupal-9-hosted-createempty-md)
  - No: See [Migrate a Drupal 8 Site to Drupal 9](/guides/drupal-9-hosted)
    
  </Tab>

  <Tab title="Dashboard" id="dashboard">

  What version of Drupal are you on?

  - Version 8: 

    Do you have access to the Multidev?
    - Yes: See [Migrate a Site with Multidev to Drupal 9](/guides/drupal-9-hosted-md)
    - No: See [Migrate a Drupal 8 Site to Drupal 9](/guides/drupal-9-hosted)

  - Version 9: 

    Did you create the site prior to November 2021?
    - Yes: See [Migrate a Site That Was Created Before November 2011 to Drupal 9](/guides/drupal-9-hosted-pre112021) 
    - No: 

      Did you set Drupal version to 8?
      - Yes: See [Migrate a Site Created With the Pantheon Dashboard to Drupal 9](/guides/drupal-9-hosted-createdashboard-set8)
      - No: 

        Do you need a Build Tools workflow? (*if you are not sure what this is, answer "No"*)
        - Yes: See [Migrate a Site That Needs a Build Tools Workflow to Drupal 9 + Build Tools](/guides/drupal-9-hosted-btworkflow)
        - No: No additional work required.
  
  </Tab>

  </TabList>

- **No**

  Is your site Composer-managed?

  - Yes: [Migrate a Composer Managed Drupal 9 Site from Another Platform](/guides/drupal-9-unhosted-composer)
  - No: [Migrate a Drupal 9 Site from Another Platform](/guides/drupal-9-unhosted)


## Related Documents

- [Composer Fundamentals and Workflows](/guides/composer)
- [Integrated Composer Overview](/guides/integrated-composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Composer Conversion Guide](/guides/composer-convert)