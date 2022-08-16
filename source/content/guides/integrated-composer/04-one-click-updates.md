---
title: Integrated Composer
subtitle: Apply One-click Updates
description: Learn how to apply One-click updates with Integrated Composer.
tags: [composer, workflow]
categories: [get-started]
contributors: [ari, edwardangert]
reviewed: "2022-04-28"
layout: guide
showtoc: true
permalink: docs/guides/integrated-composer/one-click-updates
anchorid: one-click-updates
---

This section provides information on how to apply One-click updates with Integrated Composer. 

You can apply one-click updates in the Site Dashboard or with Terminus.

## Site Dashboard

1. Navigate to the **Dev** tab of the Site Dashboard, and click **Code**.

1. Click **Check Now**.

1. Switch your **Development Mode** from SFTP to **Git** if you have not done so already.

1. Click **Apply Updates** if updates are available.


## Terminus

Run the command below to apply available updates to your site development environment:

```bash{promptUser: user}
terminus upstream:updates:apply --updatedb --accept-upstream -- <site>.<env>
```

## More Resources

- [WordPress and Drupal Core Updates](/core-updates)

- [Upstream Updates with Terminus](/terminus/commands/upstream-updates-apply)
