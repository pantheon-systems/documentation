---
title: "Plans"
subtitle: Plan Resources
description: Learn about the resources provided with each of Pantheon's site plans.
tags: [plans]
contributors: [wordsmither]
permalink: docs/guides/account-mgmt/plans/resources
editpath: docs/guides/account-mgmt/plans/03-resources.md
reviewed: "2022-09-19"
contenttype: [guide]
innav: [false]
categories: [plans]
cms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---

The platform resources provided to your website depend on your current plan. Pantheon can scale instantly, so changing your service level will immediately change your resources to the values for the new plan, as shown in the table below.

## Current Plan Resources

|                                                                                                                                                | Sandbox | Basic                                     | Performance Small                         | Performance Medium                        | Performance Large                         | Performance Extra Large                   | Elite                                     |
|------------------------------------------------------------------------------------------------------------------------------------------------|---|----------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|
| Application Containers                                                                                                                         | 1 | 1                                         | 1                                         | 2                                         | 3                                         | 4                                         | 4+                                        |
| PHP Workers                                                                                                                                    | 4 | 4                                        | 6                                         | 12                                        | 24                                        | 32                                        | Managed<br />Scaling                      |
| PHP Memory Limit                                                                                                                               | 256MB | 256MB                                      | 512MB                                     | 1024MB                                     | 1024MB                                     | 1024MB                                     | 1024MB                                     |
| Storage                                                                                                                                        | 20GB  | 20GB                                     | 30GB                                      | 50GB                                      | 100GB                                     | 200GB                                     | 200GB+                                    |
| Custom Domain Limit (per site) <Popover   content = "For details, see <a href='/guides/domains/'>Domains and Redirects</a>."  />  | 0 | 5                                         | 10                                        | 15                                        | 35                                        | 70                                        | 270                                       |
| Free and managed HTTPS <Popover   content = "For details, see <a href='/https/'>HTTPS on Pantheon's Global CDN</a>."  />                  | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| New Relic <Popover   content = "For details, see <a href='/guides/new-relic/'>New Relic APM Pro</a>."  />                                        | <span  style= " color:green " > ✔ </span> | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Object Cache <Popover   content = "For details, see <a href='/object-cache/'>Object Cache Overview</a>."  />     | <span  style= " color:green " > ✔ </span> | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Pantheon Search (Solr) <Popover   content = "For details, see <a href='/solr/'>Pantheon Search (formerly Pantheon Solr)</a>."  />                                            | <span  style= " color:green " > ✔ </span> | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |

<Alert title="Note" type="info">

If the number of custom domains on a site exceeds that allowed by the new site plan, the site will be migrated to the next largest site plan that matches the number of custom domains used.

</Alert>
