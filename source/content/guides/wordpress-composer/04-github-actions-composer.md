---
title: WordPress with Composer on Pantheon
subtitle: Use GitHub Actions with Your Composer-based WordPress Site 
description: Learn how to use GitHub Actions with your Composer-based WordPress site. 
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/github-actions-composer
anchorid: github-actions-composer
---

This section provides information on how to enable GitHub Actions for your Composer-based WordPress site. 

The Build Tools Site will configure GitHub Actions automatically if it was passed as the selected CI when creating the site. You will need to consult advanced external resources if you're working with an existing non-Build Tools site and want to add Github Actions.

The steps to enable GitHub Actions for an existing Build Tools site created with another CI (for example, CircleCI) shown below might work for you.  

1. Copy `.ci/.github` to `.github`. 

1. Add the following secrets to the Github Actions configuration:

    - `ADMIN_EMAIL`

    - `ADMIN_PASSWORD`

    - `ADMIN_USERNAME`

    - `TERMINUS_TOKEN`

    - `TERMINUS_SITE`

    - `SSH_PRIVATE_KEY`

    - `GH_TOKEN`

## More Resources

- [Using Git with SFTP & WordPress](/guides/wordpress-git/)

- [Git on Pantheon Guide](/guides/git)