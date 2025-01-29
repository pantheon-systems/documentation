---
title: "Preventing filesystem overload to ensure site stability"
published_date: "2024-08-21"
categories: [performance, infrastructure]
---
Writing more than 100,000 files in the same directory can push the Pantheon filesystem beyond its intended design. Starting **September 21, 2024**, our platform will automatically reject file writes if the directory is at capacity. This precaution helps avoid catastrophic failures to ensure the site remains online and operational.

When excessive files are written into a directory due to an owner or developer error, the site may lose access to the filesystem, resulting in a critical failure. Recovery from this issue is complex and often requires manual intervention from the Pantheon Support team. The recovery process can be time-consuming, sometimes taking hours or even days, and full restoration is not always guaranteed.

However, this situation is entirely preventable. By automatically rejecting file writes that exceed the 100,000 limit, the system prevents catastrophic failures and keeps the site stable.

Currently, Pantheon provides multiple alerts to customers when the directory size reaches various tolerance levels. Learn more about these alerts and how to optimize in our [documentation for highly populated directories](/guides/filesystem/large-files#highly-populated-directories).

## Upcoming changes

**Before:** Users could continue writing files to a directory indefinitely, though exceeding 100,000 files limit in a single directory would reduce performance and put the site at risk of complete and irreparable volume corruption.

**After:** If the file count in a directory exceeds 100,000 files substantially, additional writes will be blocked to maintain system stability.

**Unchanged**: When a directory reaches 50,000 files due to export or backup activities, a warning will be displayed on the dashboard, and an email notification will be sent to the site owner (limited to one per seven days). The warning system functionality remains unchanged.
