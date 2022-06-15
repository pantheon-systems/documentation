---
title: Switch an Existing Site to a Custom Upstream
subtitle: Switch an Existing Site to a Custom Upstream
description: Learn how to switch your existing site to a custom upstream. 
categories: [develop]
tags: [upstreams, workflow, webops]
layout: guide
showtoc: true
permalink: docs/guides/custom-upstream/switch-to-custom-upstream
anchorid: switch-to-custom-upstream
---

This section provides steps to switch an existing Pantheon site to a Custom Upstream.

<Alert title="Warning" type="danger">

Switching the upstream of an existing site is risky. It is safer to create a new site from your Custom Upstream and migrate the contents. If you must switch upstreams, [back up](/backups) your site first, and consider our documentation on [upstream merge conflicts](/core-updates/#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts).

</Alert>

## Switch Your Site to a Custom Upstream

Follow the steps using [Terminus](/terminus) below to switch your existing site to a Custom Upstream.

1. Run the command below to locate your Custom Upstream's machine name, replacing `$org` with your organization name  
    
    ```bash
    terminus org:upstream:list $org
    ```

1. Run the command below  to change the upstream, setting or replacing the variables `$site` and `$upstream_id` with your site name and upstream machine name, respectively.

    ```bash{promptUser: user}
    terminus site:upstream:set $site $upstream_id
    ```

## More Resources

- [Switching an Existing site to a Custom Upstream with Terminus](/terminus/examples/#switch-upstreams)