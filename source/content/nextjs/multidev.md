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

These environments are created automatically per pull request by Pantheon's GitHub Application.

<!--- This image is pulled from this deck: https://docs.google.com/presentation/d/17k15auDrnpq2LdRC4P35dN5yJ4pOkPY62M7drBDkTCc/edit?slide=id.g39e43c7cf0e_0_15#slide=id.g39e43c7cf0e_0_15 --->
![architecture diagram](../../images/nextjs/github-app--nextjs-version.png)

Additionally, if you want a longer lived environment, or one not tied to a pull request, you can prefix a branch name with `multi-` to have Pantheon create a Multidev environment for that branch.

Unlike Dev and Multidev environments for WordPress and Drupal sites on Pantheon, Multidev environments for Next.js do not have an "SFTP mode" that allows for directly changing files.
All code changes must be made through Git and deployed through Pantheon's GitHub Application.
