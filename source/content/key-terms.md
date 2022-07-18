---
title: Key Terms
description: Learn the language of Pantheon.
categories: [get-started]
tags: [agencies, billing, dashboard]
contributors: [edwardangert]
---

When first starting with Pantheon, it might feel like you've landed in a country where you don't know the language!  Review these terms to begin learning the Pantheon language. 

<dl>

<dt>CMS (Content Management System)</dt>
<dd>CMS is a software application that allows users to collaborate in the creation, editing, and production of digital content, such as web pages, blog posts, etc. Pantheon supports both Drupal and WordPress.</dd>

<dt>Containers</dt>
<dd>At their simplest, containers package code and it's dependencies together. We serve our customers by provisioning isolated Linux containers with an optimized PHP stack in place. Each container includes its own Nginx, [APCu cache](/apcu), and PHP worker agent. They are deployed with a checkout of your codebase and service-bindings to use a dedicated MySQL container, networked file filesystem, and optionally Object Cache and Apache Solr search indexing. See our [interactive diagram](https://pantheon.io/features/elastic-hosting) and [All About Application Containers](/application-containers) for more information.</dd>

<dt>Custom Upstreams</dt>
<dd>Pantheon Custom Upstreams are a self-serve feature available to anyone with access to the Organization Dashboard with an eligible plan. Organization members will be able to create new sites from a set common codebase after an Organization Administrator creates a Custom Upstream. Learn more at [Introduction to Custom Upstreams](/guides/custom-upstream).</dd>

<dt>Dashboard</dt>
<dd>Dashboard is the term we use for the web-based tool we offer to manage your site.  There are three different dashboards: [Site Dashboard](/sites), [User Dashboard](/guides/quickstart/user-dashboard/), and [Organization Dashboard](/organization-dashboard). See our [Git Guide](/guides/git) to understand and use Git with Pantheon.</dd>

<dt>Git</dt>
<dd>Pantheon provides industry standard version control with Git. It’s fast, secure, and reliable, and supports both simple versioning or complex, distributed, non-linear workflows for hundreds of contributors. Pantheon uses Git to make sure all code is stored, versioned, and deployed both safely and predictably. We also give you the power of feature branching through Multidev. Git is an open source version control system. </dd>

<dt>Multidev</dt>
<dd>[Multidevs](/multidev) are development environments for teams. They allow a developer to fork the entire stack (code and content), work independently, then merge the code changes back into the main master site. Each forked branch will have its own separate development environment, including database and files.</dd>

<dt>Organizations</dt>
<dd>Pantheon [Organizations](/organizations) bring together users, sites, Custom Upstreams, Multidev, and support to provide administrators with the tools needed to effectively manage a large number of sites.</dd>

<dt>Role-based Permissions</dt>
<dd>Pantheon supports [role-based permissions](/change-management) for users in the organization. Users added to the organization can access all sites associated with the organization, with access restricted based on the user's role in that organization. These roles exist to restrict who can deploy code on sites, and manage other users in the organization or sites it works on.</dd>


<dt>SFTP</dt>
<dd>SFTP mode allows you to develop directly on Pantheon. If you want to use the WordPress or Drupal Dashboard (e.g. the apps.module in Drupal, or the plugin/theme manager in WordPress), [enable SFTP mode first](/sftp).

<dt>Terminus</dt>
<dd>The [Terminus](/terminus) command line interface provides advanced interaction with Pantheon. Terminus enables you to do almost everything in a terminal that you can do in the Dashboard, and much more.</dd>

<dt>WebOps</dt>
<dd>WebOps is a set of practices that facilitates collaboration and automates processes to improve the productivity of the whole web team from developers and designers to content editors, stakeholders, and more. The result is cross-functional web teams empowered to develop, test, and release website changes faster and more reliably. Learn how to [use the Pantheon WebOps Workflow](https://pantheon.io/docs/pantheon-workflow) to manage your development processes.</dd>

</dl>


## See Also

- [Glossary](/glossary)