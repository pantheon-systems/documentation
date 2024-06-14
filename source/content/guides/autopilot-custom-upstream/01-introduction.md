---
title: Autopilot for Custom Upstreams
subtitle: Introduction
description: Learn more using Autopilot with your Custom Upstream.
tags: [autopilot, upstreams, D8, D9, D10]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/autopilot-custom-upstream
contenttype: [guide]
innav: [true]
categories: [automate]
cms: [--]
audience: [development]
product: [autopilot]
integration: [--]
reviewed: "2022-12-13"
---

Combining [Autopilot](/guides/autopilot) with [Custom Upstreams](/guides/custom-upstream) is an excellent way to reduce time spent on maintaining multiple sites. Pantheon allows eligible customers (see [Get Autopilot](#get-autopilot) and [Autopilot Site Compatibility](#autopilot-site-compatibility) for details) to use Autopilot and Custom Upstreams to automate routine maintenance for upstream and downstream sites.

## Autopilot

Pantheon Autopilot automatically detects, performs, and deploys updates for WordPress and Drupal. Autopilot also features automated visual regression testing (VRT) to ensure that your site's user experience (UX) is consistent while securing your site and implementing new features.

Pantheon's Autopilot:

- Automatically detects when new updates are available

- Performs the updates in an isolated [Multidev](/guides/multidev) environment

- Tests the updates with automated VRT

- Optionally deploys the updates

### Get Autopilot

Autopilot is available for the following accounts:

 - Gold
 - Platinum
 - Diamond
 - Agency partners

Check out our [pricing page](https://pantheon.io/plans/pricing?docs) and contact [Sales](https://pantheon.io/contact-sales?docs) to discuss which plan is best for your needs.

### Autopilot Site Compatibility

<Partial file="autopilot/autopilot-compatibility.md" />

## Custom Upstream

<Alert title="Note: Drupal Compatibility"  type="info" >

Drupal users should note that there are technical limitations when using Autopilot with Custom Upstream. Review [Autopilot Enabled on Downstream Sites Only](/guides/autopilot-custom-upstream/autopilot-custom-upstream-config#autopilot-enabled-on-downstream-sites-only) for more details.

</Alert>



Custom Upstreams act as a scaffold for new sites, allowing developers and site owners of any skill level to kickoff projects quickly.
Instead of repeating the same technical work on each individual site, you can build and maintain a common user interface with unified branding and functionality once, in a single source.

The Custom Upstream workflow frees up developer time, and establishes a sustainable and scalable process for handling updates across massive site portfolios.

New features and functionality can be continuously developed in the Custom Upstream repository, then distributed to each site, where they can be applied with a single click by site owners.

### Custom Upstreams for Digital Agencies and Pantheon Resellers

Download the [Partner Program guide](https://pantheon.io/resources/pantheon-partner-program-guide?docs) to learn more about getting Custom Upstreams and other benefits of becoming a Pantheon Partner. Digital agencies that serve clients and resellers of Pantheon are qualified to join the Partner program.

### Custom Upstreams for Corporate and Higher Education Customers

Custom Upstreams are included for [Pantheon Enterprise](https://pantheon.io/plans/elite) Gold Accounts and higher, and all [Pantheon EDU](https://pantheon.io/edu) accounts. You can learn more by reaching out to our accounts team using the forms on the pages linked here.

<Alert title="Note" type="info">

Support for Custom Upstreams requires that the externally hosted upstream repository is connected to the platform correctly. For details, see [Get Support](/guides/support/#custom-upstreams). Refer to [Composer Fundamentals and Workflows](/guides/composer) if you are considering a Composer-based workflow.

</Alert>

## More Resources

- [Autopilot Product Page](https://pantheon.io/autopilot?docs)

- [Autopilot Guide](/guides/autopilot/)

- [Custom Upstreams Product Page](https://pantheon.io/upstreams)

- [Custom Upstreams Guide](/guides/custom-upstream)

- [Multidev](/guides/multidev)
