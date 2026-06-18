---
title: Custom Upstreams on Pantheon
subtitle: Edit an Existing Custom Upstream
description: Learn how to edit your Custom Upstream settings.
tags: [upstreams, workflow, webops, D8, D9, D10]
showtoc: true
permalink: docs/guides/custom-upstream/edit-custom-upstream
contenttype: [guide]
innav: [false]
categories: [custom-upstreams]
cms: [drupal, wordpress]
audience: [development]
product: [custom-upstreams]
integration: [--]
reviewed: "2022-12-13"
---

This section provides information on editing an existing Custom Upstream.

## Change Custom Upstream Name or Description

Follow the steps below if you want to change the name or description of your Custom Upstream.

1. Navigate to the **[<Icon icon="users" />Organizations](https://dashboard.pantheon.io/#organizations")** tab within the Pantheon Dashboard and select your organization.

1. Select the **<span class="upstreams-regular"></span> Upstreams** tab.

1. Click **Settings** next to the existing upstream requiring an update.

1. Make desired changes > click **Update**.

## Change Custom Upstream Repository URL or Password

You cannot modify the repository details on an existing Custom Upstream. we recommend creating a new Custom Upstream if there is a new URL or password you need to use. You will need to switch each site to the new upstream individually with [Terminus](/terminus):

```bash{promptUser: user}
terminus site:upstream:set my-site "My New Custom Upstream"
```

You must merge changes as a one-click update after a site's upstream is changed. Review [Example Usage](/terminus/examples/#switch-upstreams) for more details.

You can safely delete the old Custom Upstream after all sites have been updated to track the new Custom Upstream. Review [Delete a Custom Upstream](/guides/custom-upstream/delete-custom-upstream) for more information.

## More Resources

- [Best Practices for Maintaining Custom Upstreams](/guides/custom-upstream/maintain-custom-upstream)

- [Switch an Existing Site to Custom Upstream](/guides/custom-upstream/switch-custom-upstream)

- [Troubleshoot a Custom Upstream](/guides/custom-upstream/troubleshooting)
