---
title: Getting Started
subtitle: Site Dashboard
guidepage: true
anchorid: site-dashboard
generator: pagination
layout: guide
pagination:
    provider: data.gettingstartedpages
use:
    - gettingstartedpages
permalink: docs/guides/getting-started/site-dashboard/
nexturl: getting-started/create-test-live/
nextpage: Create Test & Live
previousurl: getting-started/create-new-site/
previouspage: Create New Site
editpath: 04-site-dashboard.md
---

In this lesson, you’ll explore the Site Dashboard and learn about the Dev, Test, Live workflow.

1. Navigate to the **Site Dashboard**.

  Every Pantheon site comes with 3 separate environments—Dev, Test, Live—which are represented by tabs on your dashboard.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>Agencies have access to additional Dev environments under the Multidev tab.
    </p></div>

  By default, you’ll find yourself on the **Dev** tab. This is your development environment. It provides access to a stand-alone copy of your site, with its own codebase, database, and files.

  Within the safety of this isolated environment, you can edit code and make updates to your site. In fact, all development on your Pantheon sites starts here.

2. Navigate to the **Test** tab. This environment is for reviewing the changes made in your Dev environment with the most recent content from your live site.

To use the Test environment for this purpose, you first push new code “up” from your Dev environment and clone recent content “down” from your Live environment. 

![Pantheon Workflow](/source/docs/assets/images/workflow.png)

3. Navigate to the **Live** tab. This environment is for your live site, where content creators actively post and upload media files.

After passing review, you push your new code “up” from the Test environment to this Live environment.

4. Take a few minutes to familiarize yourself with the other tabs and links on the Site Dashboard, or click below for a guided tour:

    <div class="panel panel-video" id="accordion">
      <div class="panel-heading panel-video-heading">
        <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#user-dashboard-tour"><h3 class="panel-title panel-video-title" style="cursor:pointer;">Tour: Site Dashboard</h3></a>
      </div>
    <div id="user-dashboard-tour" class="collapse" style="padding:10px;">
    <hr><div markdown="1">- 
    **Workflows:** View workflows that are active or recently completed. 

    **Teams:** Add or remove Team Members, as well as Supporting Organizations.

    **Settings:** Select or modify a plan. Invite a business owner to pay for this plan. Add billing information. Enable or disable add-ons, including Solr and Redis. Delete your site, or view basic information about site, including PHP version.

    **Multidev:** Access unlimited Dev environments.

    **Dev:** Access the codebase, database, and files for your Dev environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches. 

    **Test:** Access the codebase, database, and files for your Test environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches. 

    **Live:** Access the codebase, database, and files for your Live environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches. 

    **Support:**  View details of an open support request or create a new support request. Our chat-based support is available 24-hours a day.

    The following links are located within your Dev, Test, and Live environment tabs: 

    **Code:** Switch between SFTP Connection Mode and Git Connection Mode. Obtain SFTP Connection Info, and commit changes to your Dev environment. 

    **Commit Log:** See a list of all code changes by viewing the commits. Click an individual commit to see the log message and list of changes.

    **Deploys:** View a deploy log for the environment.

    **Merge:** If you have a Multidev environment, use this tab to merge branches into your master branch. (This tab is only accessible within your Dev environment.)

    **Status:** Check this page on a regular basis (especially before you go live the first time) to catch common problems and follow best-practice recommendations for site configuration.

    **Database / Files:** Workflow tools are provided to clone your database and files between environments with the click of a button.

    **Clone:** Clone the database and/or files from one environment to another.
    **Import:** Replace your current database and files with an archive.
    **Export:** Package and download your database and files in an archive. 
    **Wipe:** Reset the database and files, and start fresh with your codebase.

    **Errors:** Check this page to see if there are any critical PHP errors on your site. You can find more error logs by connecting via SFTP.

    **Domains:** Add custom domains to your site. (This feature is only available on paid plans.)

    **HTTPS:** Enable SSL and manage a certificate. (This feature is only available on paid plans.)

    **Backups:** Create a back of the environment.
    </div>
    </div>
</div>
