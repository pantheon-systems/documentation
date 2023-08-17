---
title: Chapter 3 - Creating Your First Site on Pantheon
subtitle:
description:
certificationpage: true
contributors: [todo]
showtoc: true
type: certificationpage
layout: certificationpage
tags: []
permalink: docs/certification/study-guide/chapter-3
contenttype: [guide]
innav: [false]
categories: []
cms: [drupal, wordpress]
audience: []
product: []
integration: [--]
---

<Alert title="By the end of this chapter, you will be able to:"  type="info" >

* Create a new site on Pantheon through the Pantheon Dashboard.
* Create a new site on Pantheon programmatically using Terminus.
* List and Describe the different starting states from which you are able to spin up a new site on Pantheon.
* Describe the WebOps Workflow on Pantheon as it relates to Code, Files, and Databases.

</Alert>

In making a new site on Pantheon, you have a few options:
Selecting the CMS (Drupal or WordPress) you will be using
Backend (CMS) site vs. Front End Site
Starting with a fresh CMS install or starting from a Custom Upstream
At the end of this section, you will be able to create a new CMS Site through the Pantheon Dashboard.


### Create a Site

<Alert title="Tutorial Activity #2: Create a Site in the Pantheon Dashboard"  type="info" >

This section will walk you through the steps of creating a new site on Pantheon through the dashboard. By the end of this activity, you will have a working installation of Drupal or WordPress to start your WebOps development. Creating sites in the Pantheon Dashboard is one of two ways to create a new site on Pantheon. You will learn how to create a site the other way, on the command line through Terminus, in a later section.

</Alert>


A Pantheon CMS site contains three components: code, files, and a database containing the content and configurations of your CMS (Content Management System). When you create a site, you are creating each of these components in the Dev environment. Then, when you are ready, you will create your Test and Live environments.





<Partial file="dashboard-site-creation-1.md" />



### Enable New Relic




