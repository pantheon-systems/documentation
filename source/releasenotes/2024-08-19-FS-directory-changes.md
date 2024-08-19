---
title: "Preventing Filesystem Overload to Ensure Site Stability"
published_date: "2024-09-19"
---
Starting 19th September 2024 the Pantheon Platform will automatically reject file writes (beyond the 100k limit) that could push the filesystem beyond its capacity, catastrophic failures can be avoided, ensuring the site remains online and operational.<img width="999" alt="Screenshot 2024-08-19 at 3 32 29 PM" src="https://github.com/user-attachments/assets/f8d3c57f-d46e-44e3-83c1-6689037d0a4e">



When excessive files are written into a directory due to an owner or developer error, the site may eventually lose access to the filesystem, resulting in a critical failure. Recovery from this issue is complex and often requires manual intervention from the Pantheon Support team. The recovery process can be time-consuming, sometimes taking hours or even days, and full restoration is not always guaranteed.

However, this situation is entirely preventable. By allowing the system to automatically reject file writes (beyond the 100k limit) that could push the filesystem beyond its capacity, catastrophic failures can be avoided, ensuring the site remains online and operational
Currently, Pantheon does give multiple alerts to our customers when the directory size reaches different tolerance levels. Here is the recommendation captured in the [Pantheon docs](https://docs.pantheon.io/guides/filesystem/large-files#highly-populated-directories). 

Upcoming changes: 

**Before:** Users could continue writing files to a directory indefinitely, although exceeding 100k files in a single directory would reduce performance and put the site at risk of complete & irreparable volume corruption.

**After:** Sites are permitted to store up to 100k files per directory. When a directory reaches 50k files due to export or backup activities, a warning will be displayed on the dashboard and an email notification will be sent to the site owner (limited to one per seven days). The warning system functionality remains unchanged. If the file count in a directory exceeds 100k substantially, additional writes will be blocked to avoid system instability.
