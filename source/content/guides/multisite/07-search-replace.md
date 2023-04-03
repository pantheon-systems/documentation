---
title: WordPress Multisite
subtitle: Search & Replace
description: Additional handing required for running search & replace on WordPress Multisites.
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

WordPress Multisite (WPMS) search & replace is available for [Early Access](/oss-support-levels#early-access) participants. Features for WPMS search & replace are in active development. Pantheon's development team is rolling out new functionality often while this product is in Early Access. Visit [#wordpress in our community Slack](https://pantheon-community.slack.com/archives/CT8MC5Y0K) (you can sign up for the [Pantheon Slack channel here](https://slackin.pantheon.io/) if you don't already have an account) to learn how you can enroll in our Early Access program. Please review Pantheon's [Software Evaluation Licensing Terms](https://legal.pantheon.io/#contract-hkqlbwpxo) for more information about access to our software.

</Alert>

This section provides information on how to configure automatic platform search-replace of URLs for both subdirectory and subdomain WordPress Multisites.

## Requirements
A [WordPress Multisite](/guides/multisite)

## Opting In
To enable search replace between environments on a WPMS site, add 
```yaml:title=pantheon.yml
search_replace: true
```
to [pantheon.yml](/pantheon-yml).

Note, if `pantheon.yml` is different between environments, the search_replace value in the source environment’s `pantheon.yml` will determine if the job will be run or not.

Search & replace runs on the platform as part of creating an environment, deploying to test or live, and when cloning content between environments.

### Subdomain WPMS
For subdomain Multisites, environments to be replaced are defined and paired in the `sites.yml` file. Currently, the file must be committed at `private/sites.yml` in the site’s git repository.

See [this gist](https://gist.github.com/scottbuscemi/b051ad6510ef8494aff80d0f43afeeb2) for an example of how `sites.yml` might look.

Search-replace will run for each domain listed in the source environment that has a matching key in the target environment.

If search-replace is enabled for an environment, but `sites.yml` does not exist, nothing will be updated. if `sites.yml` is different between environments, the domain_maps in the target environment’s `sites.yml` will be used to determine what to replace.

There is currently a limit of 25 sites that can be configured for search-replace. We expect this number to increase before general availability.

### Subdirectory WPMS
For subdirectory Multisites, there is no configuration beyond adding the value to `pantheon.yml`. Search-replace will match the behavior of the platform’s search-replace for non-WPMS sites.
