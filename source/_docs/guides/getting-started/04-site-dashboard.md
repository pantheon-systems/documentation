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

1. Navigate back to the Pantheon **Site Dashboard**.

  Every Pantheon site comes with 3 separate environments— Dev, Test, Live—which are represented by tabs on your dashboard.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>Agencies have access to additional development environments under the <strong><a href="/docs/multidev"><span class="glyphicons glyphicons-cloud" aria-hidden="true"></span> Multidev</a></strong> tab.
    </p></div>

  By default, you’ll find yourself on the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** tab. This is your development environment. It provides access to a stand-alone copy of your site, with its own codebase, database, and files.

  Within the safety of this isolated environment, you can edit code and make updates to your site. In fact, all development on your Pantheon sites starts here.

2. Navigate to the **<span class="glyphicons glyphicons-equalizer" aria-hidden="true"></span> Test** tab. This environment is for reviewing the changes made in your Dev environment with the most recent content from your live site.

  To use the Test environment for this purpose, you first push new code “up” from your Dev environment and clone recent content “down” from your Live environment.

    <p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/workflow.png" style="max-width:650px;" alt="Pantheon Workflow">
    </p>

3. Navigate to the **<span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live** tab. This environment is for your live site, where content creators actively post and upload media files.

  After passing review, you push your new code “up” from the Test environment to this Live environment.

4. Take a few minutes to familiarize yourself with the other tabs and links on the Site Dashboard, or click below for a guided tour:

    <div class="panel panel-video panel-guide" id="accordion">
      <div class="panel-heading panel-video-heading">
        <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#site-dashboard-tour"><h3 class="panel-title panel-video-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-facetime-video"></span> Watch: Site Dashboard</h3></a>
      </div>
      <div id="site-dashboard-tour" class="collapse" style="padding:10px;">
        <script src="//fast.wistia.com/embed/medias/pb8s59wuij.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_pb8s59wuij videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
      <hr>
      <div markdown="1">- **Workflows:** View workflows that are active or recently completed.

      - **<span class="glyphicons glyphicons-group" aria-hidden="true"></span> Team:** Add or remove Team Members, as well as Supporting Organizations.

      - **<span class="glyphicons glyphicons-cogwheel" aria-hidden="true"></span> Settings:** Select or modify a plan. Invite a business owner to pay for this plan. Add billing information. Enable or disable add-ons, including Solr and Redis. Delete your site, or view basic information about site, including PHP version.

      - **<span class="glyphicons glyphicons-cloud" aria-hidden="true"></span> Multidev:** Access unlimited cloud development environments.

      - **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev:** Access the codebase, database, and files for your Dev environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches.

      - **<span class="glyphicons glyphicons-equalizer" aria-hidden="true"></span> Test:** Access the codebase, database, and files for your Test environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches.

      - **<span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live:** Access the codebase, database, and files for your Live environment. Link to the site or site admin dashboard. Modify security settings, access connection information, or clear caches.

      - **<span class="glyphicons glyphicons-flag" aria-hidden="true"></span> Support:**  View details of an open support request or create a new support request. Our chat-based support is available 24-hours a day.
    <hr>
     The following links are located within your Dev, Test, and Live environment tabs:

      - **<span class="glyphicons glyphicons-embed-close" aria-hidden="true"></span> Code:** Switch between SFTP Connection Mode and Git Connection Mode. Obtain SFTP Connection Info, and commit changes to your Dev environment. (This link is only accessible within your Dev environment.)

      - **Commit Log:** See a list of all code changes by viewing the commits. Click an individual commit to see the log message and list of changes.

      - **<span class="glyphicons glyphicons-refresh" aria-hidden="true"></span> Deploys:** View a deploy log for the environment. (This link is only accessible within your Test and Live environments.)

      - **<span class="glyphicons glyphicons-git-branch" aria-hidden="true"></span> Merge:** If you have a Multidev environment, use this tab to merge branches into your master branch. (This tab is only accessible within your Dev environment.)

      - **<span class="glyphicons glyphicons-info-sign" aria-hidden="true"></span> Status:** Check this page on a regular basis (especially before you go live the first time) to catch common problems and follow best-practice recommendations for site configuration.

      - **<span class="glyphicons glyphicons-server" aria-hidden="true"></span> Database / Files:** Workflow tools are provided to clone your database and files between environments with the click of a button.

        - **Clone:** Clone the database and/or files from one environment to another.

        - **Import:** Replace your current database and files with an archive.

        - **Export:** Package and download your database and files in an archive.

        - **Wipe:** Reset the database and files, and start fresh with your codebase.

      - **<span class="glyphicons glyphicons-warning-sign" aria-hidden="true"></span> Errors:** Check this page to see if there are any critical PHP errors on your site. You can find more error logs by connecting via SFTP.

      - **<span class="glyphicons glyphicons-home" aria-hidden="true"></span> Domains:** Add custom domains to your site. (This feature is only available on paid plans.)

      - **<span class="glyphicons glyphicons-lock" aria-hidden="true"></span> HTTPS:** Enable SSL and manage a certificate. (This feature is only available on paid plans.)

      - **<span class="glyphicons glyphicons-cloud-upload" aria-hidden="true"></span> Backups:** Create a backup of the environment.

        - **Backup Log:** View existing backups of the environment. Click the <span class="glyphicons glyphicons-download-alt" aria-hidden="true"></span> download icon to download individual archives within a backup.

        - **Backup Schedule:** Schedule daily or weekly automatic backups of the environment. (This feature is only available on paid plans.)
      </div>
    </div>
  </div>
