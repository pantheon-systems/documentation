---
title: Going Live
subtitle: Final Launch Checks
golive: true
anchorid: launch-check
generator: pagination
layout: guide
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/launch-check/
previousurl: guides/going-live/redirects/
previouspage: Redirect to a Primary Domain
nexturl: guides/going-live/next-steps/
nextpage: Next Steps
editpath: going-live/05-launch-check.md
---
Pantheon provides best practice tools to ensure that you have the best experience launching and maintaining your site.  Upon every launch make sure to review each of these items.  

1. Pantheon embeds a ‘Status’ tab on every site.  

  * This displays information on many tests and checks that the platform performs on each environment.  Ideally you would have all green (passing) statuses and have resolved all errors before deploying.  We hope you will review warnings before you launch your site live.  

2. Set Live Backup Schedule:

  * Automatic (daily/weekly) backups are, by default, enabled on Live environments.
  * Nightly backups are stored for a week.  Once a week the platform will choose one of these backups to store as a weekly backup for a month. You can choose which day works best for your site.  
    * In your site dashboard, in the Dev environment click Backups.
    * Select “Backup Schedule “ and look for “Backup Schedule for the Live Environment”
    * Select the day of the week that you want to archive your weekly backup.

3. Enable automatic backups on Dev & Test

  * While the Live environment is automatically enables, this is not true for the other environments.  You can activate automatic backups on the Multidev, Dev and Test environments in a few simple steps.
    * In your site dashboard, in the Dev environment click Backups.
    * Select “Backup Schedule “ click “Enabled” to ensure a backup is taken daily.
    * Nightly backups are stored for one week, weekly backups are stored for one month.
    * Select the day of the week you would like weekly backup to be created on, which is stored for one month
    * Repeat these steps for the Test and any Multidev environments you want to back up.
  * You can read more about this (( Link out to logs doc (one updated to reflect updated process) for more information on retention and access (Ask @Rachel) ))
