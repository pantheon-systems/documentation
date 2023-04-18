---
title: WordPress Multisite
subtitle: Search and Replace
description: Learn about configuration requirements for search and replace on WordPress Multisites.
type: guide
getfeedbackform: default
contenttype: [guide]
innav: [false]
categories: [cms, troubleshooting]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [multisite]
permalink: docs/guides/multisite/search-replace/
editpath: multisite/07-search-replace.md
---

<Alert title="Early Access" type="info" icon="leaf">

WordPress Multisite (WPMS) search and replace is available for [Early Access](/oss-support-levels#early-access) participants. Features for platform search and replace on WPMS sites are in active development. Pantheon's development team is rolling out new functionality often while this product is in Early Access. Visit [#wordpress in our community Slack](https://pantheon-community.slack.com/archives/CT8MC5Y0K) (you can sign up for the [Pantheon Slack channel here](https://slackin.pantheon.io/) if you don't already have an account) to learn how you can enroll in our Early Access program. Please review Pantheon's [Software Evaluation Licensing Terms](https://legal.pantheon.io/#contract-hkqlbwpxo) for more information about access to our software.

</Alert>

This section provides information on how to configure automatic platform search and replace for URLs. This feature can be used with both subdirectory and subdomain WordPress Multisites.

Search and replace runs on the platform as part of creating an environment, deploying to Test or Live, and when cloning content between environments. There is currently a limit of 25 sites that can be configured for search and replace. We expect this number to increase before General Availability.

## Requirements

You must have the following to enable search and replace.

- A [WordPress Multisite](/guides/multisite)

## Enable Search and Replace

You can enable search and replace between environments on a WPMS site.

1. Navigate to your [pantheon.yml](/pantheon-yml) file.

1. Add the code below:

    ```yaml:title=pantheon.yml
    search_replace: true
    ```

Note, if `pantheon.yml` is different between environments, the `search_replace` value in the source environment’s `pantheon.yml` will determine if the job will be run or not. The source environment is where you clone the database and files from when you create a Multidev.

### Subdomain WPMS

For subdomain Multisites, environments to be replaced are defined and paired in the `sites.yml` file. Search and replace will run for each domain listed in the source environment that has a matching key in the target environment. If search and replace is enabled for an environment, but `sites.yml` does not exist, nothing will be updated. If `sites.yml` is different between environments, the `domain_maps` in the target environment’s `sites.yml` will be used to determine what to replace.

1. Define and pair the environments to be replaced. 



Refer to [this gist](https://gist.github.com/scottbuscemi/b051ad6510ef8494aff80d0f43afeeb2) for an example of how `sites.yml` might look.

1. Commit the  `sites.yml` file in the `private/sites.yml` in the site’s Git repository.

### Subdirectory WPMS

No additional configuration is needed if you already completed the steps in [Enable Search and Replace](/guides/multisite/search-replace/#enable-search-and-replace). Search and replace will match the behavior of the platform’s search and replace for non-WPMS sites.

## More Resources

- [Pantheon YAML Configuration Files](/pantheon-yml)
