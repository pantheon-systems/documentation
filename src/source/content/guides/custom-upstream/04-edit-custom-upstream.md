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
reviewed: "2026-08-05"
---

This section provides information on editing an existing Custom Upstream.

## Update Name or Description

Follow the steps below if you want to change the name or description of your Custom Upstream.

1. Navigate to your [workspace dashboard](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), then select the **Upstreams** tab.

1. Next to the existing upstream requiring an update, click the dropdown icon and then click **Edit settings**.

1. Make desired changes, then click **Save**.

## Update Repository Credentials

You can update the access token used to authenticate to your private repository — a GitHub personal access token or a Bitbucket repository access token — directly from the Dashboard:

1. Navigate to your [workspace dashboard](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), then select the **Upstreams** tab.

1. Next to the existing upstream requiring an update, click the dropdown icon and then click **Edit settings**.

1. In the **Repository credentials** section, click **Update credentials** (or **Add credentials** if none are set yet), enter the new credentials, then click **Save**.

## Update Repository URL

You cannot modify the repository URL on an existing Custom Upstream. We recommend creating a new Custom Upstream if there is a new URL you need to use.

<Alert title="Warning" type="warning">

To switch existing sites to the new Custom Upstream, it must **share Git history** with the one they currently use (for example, forked from or based on the original repository). 

A site cannot switch to an upstream with an unrelated commit history. 

Review [Switch Your Custom Upstream](/guides/custom-upstream/switch-custom-upstream) before switching.

</Alert>

You will need to switch each site to the new upstream individually with [Terminus](/terminus):

```bash{promptUser: user}
terminus site:upstream:set my-site "My New Custom Upstream"
```

You must merge changes as a one-click update after a site's upstream is changed. Review [Example Usage](/terminus/examples/#switch-upstreams) for more details.

You can safely delete the old Custom Upstream after all sites have been updated to track the new Custom Upstream. Review [Delete a Custom Upstream](/guides/custom-upstream/delete-custom-upstream) for more information.

## More Resources

- [Best Practices for Maintaining Custom Upstreams](/guides/custom-upstream/maintain-custom-upstream)

- [Switch an Existing Site to Custom Upstream](/guides/custom-upstream/switch-custom-upstream)

- [Troubleshoot a Custom Upstream](/guides/custom-upstream/troubleshooting)
