---
title: Quick Start
subtitle: Site Dashboard
description: In part four of our Quick Start guide, learn about the Pantheon Site Dashboard.
quickstart: true
anchorid: site-dashboard
generator: pagination
layout: guide
categories: [get-started]
tags: [dashboard, site, workflow]
type: guide
pagination:
  provider: data.quickstartpages
use:
  - quickstartpages
permalink: docs/guides/quickstart/site-dashboard/
nexturl: guides/quickstart/create-test-live/
nextpage: Create Test & Live
previousurl: guides/quickstart/create-new-site/
previouspage: Create New Site
editpath: quickstart/04-site-dashboard.md
image: launchGuide-twitterLarge
---

In this lesson, we learn about the Dev, Test, Live workflow and explore a Pantheon Site Dashboard.

To begin, navigate back to the Pantheon **Site Dashboard**.

Every Pantheon site comes with 3 separate environments— Dev, Test, Live—which are represented by tabs on your dashboard.

<Alert title={"Note"} type={"info"}>
  Agencies have access to additional development environments under the{" "}
  <Icon icon={"cloud"} text={"Multidev"} /> tab.
</Alert>

## <span class="glyphicons glyphicons-wrench"></span> Dev
By default, you’ll find yourself on this tab. This is your development environment. It provides access to a stand-alone copy of your site, with its own codebase, database, and files.

Within the safety of this isolated environment, you can edit code and make updates to your site. In fact, all development on your Pantheon sites starts here.

## <span class="glyphicons glyphicons-equalizer"></span> Test
This environment is for reviewing the changes made in your Dev environment with the most recent content from your live site.

To use the Test environment for this purpose, you first push new code “up” from your Dev environment and clone recent content “down” from your Live environment.

![Pantheon Workflow](../../../images/workflow.png)

## <span class="glyphicons glyphicons-cardio"> </span> Live
This environment is for your live site, where content creators actively post and upload media files.

After passing review, you push your new code “up” from the Test environment to this Live environment.

**Watch the video:**

<Youtube src="CZaog5_Sxmg" title="Site Dashboard Overview" />

<Accordion id={"site-dashboard-tour"} title={"Site Dashboard Glossary (Optional)"} icon={"lightbulb"}>

- **Workflows:** View workflows that are active or recently completed.

- <Icon icon={"group"} text={"Team:"}/> Add or remove Team Members, as well as Supporting Organizations.

- <Icon icon={"cogwheel"} text={"Settings:"}/> Select or modify a plan. Invite a business owner to pay for this plan. Add billing information. Enable or disable add-ons, including Solr and Redis. Delete your site, or view basic information about site, including PHP version.

- <Icon icon={"cloud"} text={"Multidev:"}/> Access unlimited cloud development environments.

- <Icon icon={"wrench"} text={"Dev:"}/> Access the codebase, database, and files for your Dev environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches.

- <Icon icon={"equalizer"} text={"Test:"}/> Access the codebase, database, and files for your Test environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches.

- <Icon icon={"cardio"} text={"Live:"}/> Access the codebase, database, and files for your Live environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches.

- <Icon icon={"flag"} text={"Support:"}/>  View details of an open support request or create a new support request. Our chat-based support is available 24-hours a day.

<hr />

The following links are located within your Dev, Test, and Live environment tabs:

- <Icon icon={"embed-close"} text={"Code:"}/> Switch between SFTP Connection Mode and Git Connection Mode. Obtain SFTP Connection Info, and commit changes to your Dev environment. (This link is only accessible within your Dev environment.)

- **Commit Log:** See a list of all code changes by viewing the commits. Click an individual commit to see the log message and list of changes.

- <Icon icon={"refresh"} text={"Deploys:"}/> View a deploy log for the environment. (This link is only accessible within your Test and Live environments.)

- <Icon icon={"git-branch"} text={"Merge:"}/> If you have a Multidev environment, use this tab to merge branches into your master branch. (This tab is only accessible within your Dev environment.)

- <Icon icon={"info-sign"} text={"Status:"}/> Check this page on a regular basis (especially before you go live the first time) to catch common problems and follow best-practice recommendations for site configuration.

- <Icon icon={"server"} text={"Database / Files:"}/> Workflow tools are provided to clone your database and files between environments with the click of a button.

  - **Clone:** Clone the database and/or files from one environment to another.

  - **Import:** Replace your current database and files with an archive.

  - **Export:** Package and download your database and files in an archive.

  - **Wipe:** Reset the database and files, and start fresh with your codebase.

- <Icon icon={"warning-sign"} text={"Errors:"}/> Check this page to see if there are any critical PHP errors on your site. You can find more error logs by connecting via SFTP.

- <Icon icon={"home"} text={"Domains:"}/> Add custom domains to your site. (This feature is only available on paid plans.)

- <Icon icon={"lock"} text={"HTTPS:"}/> Enable SSL and manage a certificate. (This feature is only available on paid plans.)

- <Icon icon={"cloud-upload"} text={"Backups:"}/> Create a backup of the environment.

  - **Backup Log:** View existing backups of the environment. Click the <Icon icon={"download-alt"} text={"download"}/> icon to download individual archives within a backup.

  - **Backup Schedule:** Schedule daily or weekly automatic backups of the environment. (This feature is only available on paid plans.)

- **New Relic:** Use this server-side performance monitoring tool to identify bottlenecks and optimize your site.

</Accordion>

You should now understand the Dev, Test, Live workflow and know that it's fundamental to the Pantheon Site Dashboard.
