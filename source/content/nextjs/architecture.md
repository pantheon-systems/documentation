---
title: Next.js Runtime Architecture on Pantheon
description: Next.js runs in Node.js containers on Pantheon behind a CDN with static assets served from an object storage service.
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/architecture

---

<Partial file="nextjs-pre-ga.md" />


Pantheon hosts Next.js in containers running Node.js behind a global CDN. Those containers can read and write static assets to a persistance cache that are shared across all containers in an environment for a given site.

<!-- This diagram comes from https://docs.google.com/presentation/d/1NesMYwF82xFEymuH3Mmi5oClZ3cXSnb9SAwwyPT1lBY/edit?slide=id.g39b80743bea_0_702#slide=id.g39b80743bea_0_702 -->

![Runtime diagram](../../images/nextjs/runtime-diagram.png)
