---
title: Using Pantheon as a Training Platform for WordPress and Drupal
description: Best practices for training a group of students using Pantheon
layout: doc
permalink: docs/guides/:basename
categories: [platform]
tags: [collaborate, sandbox, upstreams, webops]
contributors: [stevector, dwayne, davidneedham, tessak22]
date: 3/26/2018
---

Pantheon makes it easy for educators training students on Drupal and WordPress to spin up and manage free sandbox sites for their students. Using Pantheon allows you and your students to focus on the CMS rather than setting up local sites or remote infrastructure. [Please contact us if you need assistance using Pantheon to conduct your trainings.](https://pantheon.io/trainers)

## Initial Setup

Before preparing sites to use Pantheon for a specific class, test out the platform and make a Pantheon organization.

 1. Each trainer should [create a Pantheon account](https://pantheon.io/register) for themselves.

 2. Test that Pantheon is suitable for your training topic. Please read our [Platform Considerations](/platform-considerations) to ensure that your curriculum will work with our [opinionated platform](https://stackoverflow.com/questions/802050/what-is-opinionated-software) decisions. For instance, Pantheon does not support Drupal multisite and Node.js is not available on our containers.

 3. [Please contact us](https://pantheon.io/trainers) and let us know you want to use the platform as a trainer. This will ensure you have full access to all the available tools as they are developed and maintain access to enough free sandboxes for your students. We can also help guide you through the processes to ensure you have the best experience and find success.

 4. [Create an Agency here](https://dashboard.pantheon.io/organizations/create-agency). This Agency organization will give you a dashboard overview of all of your students' sites. Creating an organization account will require a unique homepage URL. Choose a URL related to your training. You can read more about using the Organization Dashboard [here](/organizations).

    <Alert title="Note" type="info">

    You are limited to creating one organization per unique email. If you have already created a Pantheon Agency in the past you will need to create a brand new Pantheon user account with a different email address.

    </Alert>

 5. **Optional:** Make a new *start-state* site. If you want your students to all start with a set of certain themes, modules/plugins, and content in the database, you can create a sample site on Pantheon. This site can later be copied for each of your students. Alternatively, if you want your students to start with stock Drupal or WordPress core, you can simply spin up sites from one of our [standard upstreams](/start-state).

    <Alert title="Note" type="info">

    Trainers with a great deal of Pantheon experience may want to use our [Custom Upstreams](/custom-upstream) to supply a common set of code to their students. We **do not** recommend trainers new to Pantheon take on that additional complexity.

    </Alert>

## Make Sites for All Students

If you need to create many sites before a training, [contact us](https://pantheon.io/trainers) and we can assist with this process.

Otherwise, please ask each student to [create their own Pantheon account](https://pantheon.io/register) and then create a new sandbox site.  Once created, students can add your organization as a [Supporting Organization](/organization-dashboard) which will give you access to the site.

## Communicating with Students

 The key to any successful training is proper preparation. We find that successful trainers will email all students well in advance of the class and again closer to the day of the training.

 Aside from prerequisites specific to your training program, please inform students that they will get notifications from Pantheon after the setup process. Letting them know upfront saves everyone some questions and surprises.

## See Also

 Providing links to key documents in your follow up materials will help your students long after class ends as they start to explore Pantheon on their own. We recommend the following:

 - [Quick Start Guide](/guides/quickstart)
 - [Going live](/guides/launch)
 - [How to delete account](/delete-account)
