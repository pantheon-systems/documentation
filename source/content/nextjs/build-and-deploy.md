---
title: Understanding the Build and Deployment Process
description: TKTK
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/build-and-deploy

---

<Partial file="nextjs-pre-ga.md" />

Over the course of a few minutes, you will see the status of your build move through a few phases.

BUILD_QUEUED: This state should last briefly in between GitHub triggering a build and Pantheon beginning to build the Next.js site.

BUILD_WORKING: This phase builds your Next.js application. Primarily, it executes `npm clean-install` and `npm run build`. (We also support pnpm and yarn). If these commands complete successfully, you will next see a status of BUILD_SUCESS or BUILD_FAILURE.

As the build runs, and after it completes, you can inspect the build logs via `terminus node:logs:build:get site-name.env  build_id`. The logs shown here can help you troubleshoot build failures.

Assuming your build completes successfully, the files needed to run your Next.js site will be deployed from the build environment to a runtime container which will serve HTTP traffic via `npm run start`. These deployment steps will also surface in `terminus node:logs:build:list` as DEPLOYMENT_QUEUED, DEPLOYMENT_WORKING, DEPLOYMENT_FAILURE or DEPLOYMENT_SUCCESS.

For as small of a change as we made in this pull request, some "Hello World" text, we should soon see DEPLOYMENT_SUCCESS as the status. Once that status is reached, you should be able to see your change in your browser by opening a Multidev environment from your dashboard.
