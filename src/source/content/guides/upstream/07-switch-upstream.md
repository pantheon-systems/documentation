---
title: Upstreams on Pantheon
subtitle: Switch Your Upstream
description: Learn how to switch your upstream.
tags: [upstreams, workflow, webops, D8, D9, D10 ]
showtoc: true
permalink: docs/guides/upstream/switch-upstream
contenttype: [guide]
innav: [false]
categories: [custom-upstreams]
cms: [drupal, wordpress]
audience: [development]
product: [custom-upstreams]
integration: [--]
reviewed: "2026-11-20"
---

This section provides steps to switch an existing site's upstream to a different upstream.

<Alert title="Warning" type="danger">

Switching the upstream of an existing site is risky. It is safer to create a new site from your upstream and migrate the contents. [Back up](/guides/backups) your site first and consider our documentation on [upstream merge conflicts](/core-updates/#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) if you must switch upstreams.

The destination upstream must **share Git history** with the one the site currently uses (for example, forked from or based on the same repository). A site cannot switch to an upstream with an unrelated commit history.

</Alert>

## Switch your upstream

Review the [Terminus Switch Upstream example](/terminus/examples#switch-upstreams) before following the steps below to switch your upstream.

1. Run the command below to locate your upstream's machine name, replacing `$org` with your organization name.
    
    ```bash
    terminus org:upstream:list $org
    ```

1. Run the command below to change the upstream, setting or replacing the variables `$site` and `$upstream_id` with your site name and upstream machine name, respectively.

    ```bash{promptUser: user}
    terminus site:upstream:set $site $upstream_id
    ```

## More resources

- [Terminus Set Upstream Steps](/terminus/commands/site-upstream-set#terminus-error-permission-to-change-the-upstream-of-this-site) 