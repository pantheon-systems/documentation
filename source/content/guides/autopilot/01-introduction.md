---
title: Pantheon Autopilot
subtitle: Introduction
description: Visual regression testing (VRT) for your WordPress or Drupal site.
tags: [iterate, autopilot, testing, webops, D8, D9, D10]
contributors: [nathantyler, alexfornuto, edwardangert]
productpage: https://pantheon.io/autopilot?docs
type: guide
layout: guide
showtoc: true
anchorid: autopilot
permalink: docs/guides/autopilot
editpath: autopilot/01-introduction.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [automate]
newcms: [--]
audience: [development]
product: [autopilot]
integration: [--]
---

[Autopilot](https://pantheon.io/autopilot?docs) is part of Pantheon's [New Dashboard](/guides/new-dashboard) experience. Pantheon Autopilot automatically detects, performs, and deploys updates for WordPress and Drupal. Autopilot also features automated virtual regression testing (VRT) to ensure that your site's user experience (UX) is consistent while securing your site and implementing new features.

## What Autopilot Does

Pantheon's Autopilot:

- Automatically detects when new updates are available
- Performs the updates in an isolated [Multidev](/guides/multidev) environment
- Tests the updates with automated visual regression testing (VRT)
- Optionally deploys the updates

![A gif showing Autopilot visual regression testing](../../../images/dashboard/vrt.gif)

## Get Autopilot

Autopilot is available for the following accounts:

 - Gold
 - Platinum
 - Diamond
 - Agency partners

Check out our [pricing page](https://pantheon.io/pricing?docs) and contact [Sales](https://pantheon.io/earlyaccess/autopilot?docs) to discuss which plan is best for your needs.

## Who is Autopilot For?

Autopilot is for you if you build or maintain WordPress and Drupal sites.

Site upkeep can be tedious with constant monitoring, building, maintaining websites, and working cross-functionally to deliver digital experiences for customers. Autopilot relieves you of the continual maintenance work it takes to keep sites updated.

Autopilot requires [Multidev](/guides/multidev), and is available to Pantheon Gold Accounts or higher.

Autopilot is enabled for Pantheon sites at the organization level.

## Autopilot Requirements

Autopilot requires the following:

- A Gold, Platinum, or Diamond account
- [Multidev](/guides/multidev)
- A compatible version of Drush (if you are not using Integrated Composer)

### Autopilot Site Compatibility

Your site must be on Pantheon and meet the criteria below to be eligible for Autopilot. 

| Do You Use Build Tools? |Drupal                                                                 | WordPress                                                             |
-----------------------------------------------|------------------------------------------------------------------------|-----------------------------------------------------------------------|
| Yes = <span style = "color :red " > ❌  </span > not compatible | Drupal 8 (with Integrated Composer or Drush 8) =  <span style = "color:green" > ✔ </span > compatible | Any version without WordPress Multisite Network = <span style = "color:green" > ✔ </span > compatible|
| No =  <span style = "color:green" > ✔  </span > compatible | drupal:latest (with Integrated Composer) = <span style = "color:green" > ✔ </span > compatible                     | Any version with WordPress Multisite Network = <span style = "color:green" > ❌  </span > not compatible | 
                                                                                    
## Autopilot For Agencies

Agency users can navigate to the Agency Workspace to see sites that have been granted agency access. The Agency Workspace also shows client sites for which the agency is a supporting or owning organization. 

Agency users can only access Autopilot through the Agency Workspace.

## More Resources

- [Autopilot Pre-Configuration Checklist](/guides/autopilot/autopilot-preconfiguration/)

- [Autopilot Custom Upstream Guide](/guides/autopilot-custom-upstream)

- [Autopilot Product Page](https://pantheon.io/autopilot?docs)

- [Webinar: Put CMS Updates on Cruise Control with Autopilot](https://pantheon.io/put-cms-updates-on-cruise-control-with-autopilot-webinar)

- [Autopilot Makes Open Source CMS a Reality at Scale](https://pantheon.io/blog/open-source-cms-scale-autopilot)

- [Robots, Autopilot, and The Holy Grail of WebOps](https://pantheon.io/blog/robots-autopilot-and-holy-grail-webops)
