---
title: Decoupled WordPress Backend Starter for Front-End Sites
subtitle: Create a New Project
description: Learn how to create a new decoupled WordPress backend project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-backend-starters/create
anchorid: create
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to create a new WordPress backend project with Pantheon's starter kit.

### Install with an Upstream

Create from Decoupled WordPress Composer Managed upstream:

  - Via the Pantheon Dashboard at this link:

    - [Decoupled WordPress Composer Managed](https://dashboard.pantheon.io/sites/create?upstream_id=c9f5e5c0-248f-4205-b63a-d2729572dd1f)

  - Or via Terminus:

    ```bash{promptUser: user}
    terminus site:create my-new-site "Describe Site" --org='My Team Name' c9f5e5c0-248f-4205-b63a-d2729572dd1f
    ```

  <Alert title="Note"  type="info" >

    - Replace `'{My Team Name}'` with your team name - for example `My Agency`.
      This can also be omitted.
    - `c9f5e5c0-248f-4205-b63a-d2729572dd1f` is upstream_id for Decoupled
      WordPress Composer Managed.

  </Alert>

## Install WordPress

1. Click the **Visit Development Site** button.

1. Select the profile. This can also be done via
[`terminus remote:wp`](/terminus/commands/remote-wp).
