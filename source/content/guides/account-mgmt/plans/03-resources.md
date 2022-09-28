---
title: Plans
subtitle: Plan Resources
description: Learn about the resources provided with each of Pantheon's site plans.
categories: [account-mgmt]
tags: [plans]
contributors: []
layout: guide
permalink: docs/guides/account-mgmt/plans/resources
anchorid: resources
editpath: docs/guides/account-mgmt/plans/03-resources.md
reviewed: "2022-09-19"
---

The platform resources provided to your website depend on your current plan. Pantheon can scale instantly, so changing your service level will immediately change your resources to the values for the new plan, as shown in the table below.

## Current Plan Resources

|                                                                                                                                                | Basic                                     | Performance Small                         | Performance Medium                        | Performance Large                         | Performance Extra Large                   | Elite                                     |
|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|
| Application Containers                                                                                                                         | 1                                         | 1                                         | 2                                         | 3                                         | 4                                         | 4+                                        |
| PHP Workers                                                                                                                                    | 4                                         | 8                                         | 16                                        | 24                                        | 32                                        | Managed<br />Scaling                      |
| PHP Memory Limit                                                                                                                               | 256MB                                     | 256MB                                     | 512MB                                     | 512MB                                     | 512MB                                     | 512MB                                     |
| Storage                                                                                                                                        | 20GB                                      | 30GB                                      | 50GB                                      | 100GB                                     | 200GB                                     | 200GB+                                    |
| Custom Domain Limit (per site) <Popover   content = "For details, see <a href='/docs/guides/domains/'>Domains and Redirects</a>."  />  | 5                                         | 10                                        | 15                                        | 35                                        | 70                                        | 270                                       |
| Free and managed HTTPS <Popover   content = "For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."  />                  | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| New Relic <Popover   content = "For details, see <a href='/guides/new-relic/'>New Relic APM Pro</a>."  />                                        | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Object Cache <Popover   content = "For details, see <a href='/docs/object-cache/'>Object Cache (formerly Redis) for Drupal or WordPress</a>."  />     | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Pantheon Search (Solr) <Popover   content = "For details, see <a href='/docs/solr/'>Pantheon Search (formerly Pantheon Solr)</a>."  />                                            | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |

<Alert title="Note" type="info">

If the number of custom domains on a site exceeds that allowed by the new site plan, the site will be migrated to the next largest site plan that matches the number of custom domains used.

</Alert>

## Legacy Platform Resources

<Alert title="Legacy Site Plans Only" type="info">

This section reflects resources for legacy site plans. Sites that have been upgraded or launched to our new plans should refer to [the previous section](#current-plan-resources) for current information.

</Alert>


|                                | Personal                                               | Professional                                           | Business                                               | Elite                                                  |
|--------------------------------|--------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------------|
| Application Containers         | 1                                                      | 1                                                      | 2                                                      | 4+                                                     |
| PHP Concurrency                | 4                                                      | 8                                                      | 8                                                      | 8                                                      |
| PHP Memory Limit               | 256MB                                                  | 256MB                                                  | 512MB                                                  | 512MB <Popover   content = "Up to 1024MB is available for certain Elite plans.[Learn more about Pantheon Elite Plans](https://pantheon.io/pantheon-elite-plans) and contact Sales for information about plans with custom resources." />                                                                                       |
| MySQL Buffer Pool              | 128MB                                                  | 512MB           | 1024MB                                                 | 2014MB+                                                |
| Storage                        | 5GB                                                    | 20GB                                                   | 30GB                                                   | 100GB+                                                 |
| Custom Domain Limit (per site) <Popover content="For details, see <a href='/docs/guides/domains'>Domains and Redirects</a>." /> | 5                                                      | 25                                                     | 100                                                    | 200                                                    |
| Free and managed HTTPS <Popover content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>." />        | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span>| <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| New Relic <Popover content="For details, see <a href='/guides/new-relic/'>New Relic APM Pro</a>." />                     | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Object Cache  <Popover content="For details, see <a href='/docs/object-cache/'>Object Cache (formerly Redis) for Drupal or WordPress</a>." />                 |                                                        | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Multidev <Popover content="All sites associated with a Professional Workspace have access to <a href='/docs/multidev/>Multidev</a> regardless of plan." />                      |                                                        |                                                        |<span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
