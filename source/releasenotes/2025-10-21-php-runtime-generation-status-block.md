---
title: "Environment PHP Runtime Generation now viewable on Pantheon Dashboard"
published_date: "2025-10-21"
categories: [user-interface, infrastructure]
---

We've enhanced the **Software Versions** block on the Environment>Status dashboard screen to now display the environment's **PHP Runtime Generation**.

![Software Versions block on the Status screen](../images/release-notes/pantheon-status-software-version-php-runtime-generation.png)

This new data point provides immediate, at-a-glance confirmation of your site's underlying PHP configuration, making it simpler to track your stack and prepare for platform updates.

Alternatively, you may use the `terminus env:info <site>.<env>` command using [Terminus](/terminus) 4.0.2+ to see the current PHP Runtime Generation.

To understand what PHP Runtime Generation means for your site, please consult our documentation on [PHP Runtime Generation 2](https://docs.pantheon.io/php-runtime-generation-2). We are actively rolling out the new runtime to all environments on the platform that have not opted out.