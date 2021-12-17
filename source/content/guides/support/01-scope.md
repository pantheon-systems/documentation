---
title: Get Support
subtitle: Scope of Support
description: Learn how to access Pantheon's expert team and what your Account tier includes.
categories: [develop]
tags: [collaborate, composer, continuous-integration, webops, workflow]
type: guide
showtoc: true
anchorid: support
permalink: docs/guides/support/
editpath: support/01-scope.md
reviewed: "2020-12-16"
---

![Screenshot of the Support Tab](../../images/dashboard/support-tab.png)

## Support Features and Response Times

Pantheon offers a range of Account options that include the features required for mission critical sites, such as 24x7x365 emergency on-call, debugging assistance, and even bundled [Professional Services](/guides/professional-services) with our Diamond Accounts.

| Account Tier                                           | Silver                            | Gold                              | Platinum               | Diamond            |
|-----------------------------------------------------------|-----------------------------------|-----------------------------------|------------------------|--------------------|
| **Scope**                                                 | Platform <Popover title="Scope of Support" content="<ul><li>Dashboard</li><li>Dev/Test/Live Workflow</li><li>Git/SFTP Mode</li><li>Self-service documentation</li></ul>" /> | Technical <Popover title="Scope of Support" content="<ul><li>Autopilot</li><li>Drupal & WordPress</li><li>Identifying problematic modules and plugins</li><li>Identifying application or site issues</li><li>DNS</li><li>Multidev</li><li>Basic CDN</li><li>Basic Terminus</li><li>Basic Localdev</li><li>Basic Custom Upstreams</li></ul>" /> | Performance <Popover title="Scope of Support" content="<ul><li>New Relic</li><li>Caching</li><li>Cloud Integrations</li><li>Custom Upstreams</li><li>Advanced Workflows</li><li>Advanced CDN</li><li>Advanced Terminus" /> | Dedicated <Popover title="Scope of Support" content="Bespoke site debugging" /> |
| [**Chat**](#real-time-chat-support)                       | 24x5                              | 24x7                              | 24x7: Priority         | 24x7: Top Priority |
| [**Tickets**](#ticket-support)                            | ❌ | 24x5: 8 Hours                     | 24x7: 2 Hours          | 24x7: 1 Hour       |
| [**Emergency On-Call**](#pantheon-on-call)                | ❌ | ❌ | 24x7: 1 Hour           | 24x7: 15 Minutes   |
| [**Professional Services**](/guides/professional-services) | ❌ | Available for Purchase            | Available for Purchase | Available for Purchase    |

Pantheon's [Sales](https://pantheon.io/contact-sales?docs) and Billing teams are generally available on business days, Monday through Friday, 9AM to 5PM PST.

### Scope Explanations

- **Platform**: Support helps:
   - Identify and remedy Platform, Dashboard, Dev/Test/Live workflow, and connection mode issues
   - Find appropriate documentation
- **Technical**: Adds support for:
   - Autopilot
   - Drupal and WordPress application-level and site support
   - Identifying problematic modules and plugins
   - Multidev
   - Assistance with basic caching issues, Terminus, Localdev, and Custom Upstreams
- **Performance**:
   - New Relic
   - Caching
   - Cloud Integrations
   - Custom Upstreams
   - Advanced Workflows
   - Complex Caching Use Cases
   - Terminus
- **Dedicated**: 
   - Bespoke site debugging

## Range of Support

We love helping developers succeed!

Our Account packages feature a range of support features including basic platform support to more comprehensive support and a dedicated Customer Success Manager.

While we have limits to the scope of support we can provide, our [Professional Services](/guides/professional-services) team can be contracted to help unblock you in areas that fall outside of support scope.

[Contact Sales](https://pantheon.io/contact-us?docs) if your requirements fall outside the scope outlined below.

### Code

Your site code belongs to you, and our support team does not change customer code.

Pantheon provides updates to the Upstream for the site, which only affect core files and Pantheon-specific additions. It is your responsibility to ensure the upstream is not overwritten. If it is, updates initiated from the Dashboard will cause conflicts that you must [resolve manually](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) using Git.

We can offer Diamond Account customers advice on best practices and debugging assistance, but our support team does not change customer code.

### Outdated Core

Outdated versions of core are not supported on the platform. This includes importing a site, then manually downgrading to an older version of core. Sites utilizing a [Custom Upstream must be updated](/maintain-custom-upstream) by the upstream maintainer each time the project releases a new version.

### Custom Upstreams

If you choose to use a Custom Upstream, please be aware that the scope of support is limited to verification that the externally hosted upstream repository is properly connected to the platform.

We are unable to debug issues with the content or structure of the Custom Upstream. While we encourage you to explore this great way to unify multiple sites, please be aware that the responsibility of testing, [properly maintaining the Custom Upstream](/maintain-custom-upstream), and fixing any issues related to the upstream falls outside of the scope of support.

### Public Distributions

If you choose to use a [public distribution](/start-state/#public-distributions) (a.k.a. installation profile or distribution) in lieu of a [Pantheon provided upstream](/start-state/#pantheon-upstreams) (i.e. WordPress, Drupal 9, Drupal 8, Drupal 7), it is your responsibility to ensure it is not behind on core releases or any of its included modules, and, if it is behind, to contact the maintainer through [Drupal.org](https://www.drupal.org) or the distribution's GitHub issue queue.

### Security

We don’t maintain the integrity of your site. We provide the platform on which any code can be deployed. We fully stand behind the platform and support that, but we aren't responsible for the code and configuration that gets deployed or any files uploaded to the site. We strongly encourage all developers and site owners to follow best security practices and keep core code and contributed modules and plugins up-to-date, especially with security-related releases.

### Debugging

Code-level debugging and site architecture recommendations are available to Diamond Accounts. New Relic is also included for most site plans and will help you get to the bottom of most issues. We also have a [comprehensive list of docs](/troubleshoot) to get you started.

### Performance

If your site is slow or modules aren't working, please see our [performance articles](/code/#performance). Issues with the platform are posted on our [status page](https://status.pantheon.io). If there are no platform events, the solution is probably within the site's code.

### Intermittent Issues

Pantheon can only assist if we can replicate the problem. Intermittent issues and server errors are rarely random, rather, they are issues with a yet undefined trigger. Please try to replicate and debug [site errors](/errors-and-server-responses) in your Development environment. If you [contact support](/support), include your findings and attach screenshots whenever possible.

### Isolated Issues

Pantheon Support can quickly determine if an issue is platform related. We take full responsibility for our services and performance, but if something is affecting your site only, or a single environment only, we will most likely refer you to our debugging tutorials or offer to connect you with an [agency partner](https://directory.pantheon.io/agencies?docs) to help you with the resolution.

If problems with your site become severe and overload resources, we will contact you and ask you to take immediate action. If unresponsive, we may need to put the site into maintenance mode.

### Local Development

We recommend development on the platform, rather than on a local environment. Unexpected behavior, not apparent on local instances such as MAMP or shared hosting, can be due to different versions of PHP, different levels of error reporting, Apache vs NGINX, or server configuration. Pantheon is not responsible for resolving such issues.

### Platform Support

We provide technical support for all user interfaces of the Pantheon product, as well as compatibility with the Drupal and WordPress CMSs. While we cannot guarantee that every Drupal module or WordPress plugin will work, we take responsibility for the availability and proper functionality of the platform. If there's something wrong there, we will fix it.

We are also happy to help developers learn the ins and outs of making their sites work great on Pantheon, and we have a large number of tutorials for common development scenarios. We also do our best to answer most questions about development practices or techniques.

### Dedicated Support

Diamond Account customers get an extra level of assistance for their dev teams. Pantheon's team can investigate misbehavior, slowness, or error logs to help identify a root cause. This includes everything from database queries to front end performance.

Our team is experienced with using New Relic to diagnose whether an issue is platform or site related, and has access to internal logging and monitoring.

Diamond Accounts are intended to help developers succeed on Pantheon, not to provide development services. If you need a professional to provide development services for your site, start by [getting a personalized quote](https://directory.pantheon.io/agencies?docs) from Pantheon’s network of trusted partners.

### Professional Services

The Pantheon Professional Services (PS) team works closely with partners to provide customized solutions for the most complex technical challenges and ensure your success on Pantheon. The PS team can provide more information on, and assist with:

- [Additional Domains](/domains)
- [Advanced Global CDN](/guides/professional-services/advanced-global-cdn)
- [Custom SSL Certificate](/custom-certificates)
- [Decoupled CMS](/decoupled-sites)
- Dedicated Database
- [Managed Updates](/guides/professional-services/managed-updates)
- [Multizone Failover](/multizone-failover)
- [Site Migrations](/guides/professional-services/website-migration-service)

For more information, refer to the [Professional Services guide](/guides/professional-services).