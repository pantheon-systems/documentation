---
title: Upstreams on Pantheon
subtitle: Edit an Existing Upstream
description: Learn how to edit your upstream settings.
tags: [upstreams, workflow, webops, D8, D9, D10]
showtoc: true
permalink: docs/guides/upstream/edit-upstream
contenttype: [guide]
innav: [false]
categories: [custom-upstreams]
cms: [drupal, wordpress]
audience: [development]
product: [custom-upstreams]
integration: [--]
reviewed: "2026-11-20"
---

This section provides information on editing an existing upstream.

## Update Name or Description

Follow the steps below if you want to change the name or description of your upstream.

1. Navigate to your [workspace dashboard](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), then select the **Upstreams** tab.

1. Next to the existing upstream requiring an update, click the dropdown icon and then click **Edit settings**.

1. Make desired changes, then click **Save**.

## Update Repository Credentials

You can update the access token used to authenticate to your private repository — a GitHub personal access token or a Bitbucket repository access token — directly from the Dashboard:

1. Navigate to your [workspace dashboard](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), then select the **Upstreams** tab.

1. Next to the existing upstream requiring an update, click the dropdown icon and then click **Edit settings**.

1. In the **Repository credentials** section, click **Update credentials** (or **Add credentials** if none are set yet), enter the new credentials, then click **Save**.

## Update Repository URL

You cannot modify the repository URL on an existing upstream. We recommend creating a new upstream if there is a new URL you need to use.

<Alert title="Warning" type="warning">

To switch existing sites to the new upstream, it must **share Git history** with the one they currently use (for example, forked from or based on the original repository). 

A site cannot switch to an upstream with an unrelated commit history. 

Review [Switch Your Upstream](/guides/upstream/switch-upstream) before switching.

</Alert>

You will need to switch each site to the new upstream individually with [Terminus](/terminus):

```bash{promptUser: user}
terminus site:upstream:set my-site "My New Custom Upstream"
```

You must merge changes as a one-click update after a site's upstream is changed. Review [Example Usage](/terminus/examples/#switch-upstreams) for more details.

You can safely delete the old upstream after all sites have been updated to track the new upstream. Review [Delete an Upstream](/guides/upstream/delete-upstream) for more information.

## More Resources

- [Best Practices for Maintaining Upstreams](/guides/upstream/maintain-upstream)

- [Switch an Existing Site to Upstream](/guides/upstream/switch-upstream)

- [Troubleshoot an Upstream](/guides/upstream/troubleshooting)
