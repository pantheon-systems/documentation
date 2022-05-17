---
title: WordPress with Integrated Composer on Pantheon
subtitle: Use Integrated Composer with WordPress 
description: Learn how to use Integrated Composer with WordPress on Pantheon.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/wordpress-ic
anchorid: wordpress-ic
---

Integrated Composer lets you deploy your site on Pantheon with one-click updates for both upstream commits and Composer dependencies, while still receiving upstream updates.

## WordPress with Integrated Composer

Follow the steps below to create a new WordPress site using Integrated Composer.

1. Fork the [Pantheon-maintained repository](https://github.com/pantheon-upstreams/wordpress-project).

1. Add a new **Custom Upstream** on the Pantheon dashboard.

1. Create a new WordPress site from the Upstream.

    - Do not customize the upstream yet.

1. Navigate to the **Dev** environment > click **Visit Development Site** > follow the prompts to complete the CMS installation.

1. [Clone the site locally](/local-development#get-the-code) and run `composer install`.