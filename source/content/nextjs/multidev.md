---
title: Multidev environments
description: Pantheon builds a complete Next.js environment for each pull request and specially named Git branches.
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/multidev

---

<Partial file="nextjs-pre-ga.md" />

To support teams who are developing multiple features and bug fixes simultaneously, Pantheon creates environments per Git branch.

These environments are created automatically per pull request by Pantheon's GitHub application.

_add digram_

Additionally, if you want a longer lived environment, or one not tied to a pull request, you can prefix a branch name with `multi-` to have Pantheon create a Multidev environment for that branch.

